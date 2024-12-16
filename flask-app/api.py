from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import requests
from data_access import DataAccess

app = Flask(__name__)
CORS(app)
data_access = DataAccess()


@app.route('/client-configs', methods=['GET'])
def get_client_configs():
  """
  Fetches client configurations from Litmus API and returns them as JSON.
  """
  url = "https://instant-api.litmus.com/v1/clients/configurations"

  # Make the GET request to the Litmus API
  try:
    response = requests.get(url)
    response.raise_for_status()  # Raise an exception for non-200 status codes
  except requests.exceptions.RequestException as e:
    return jsonify({"error": f"Error fetching configurations: {e}"}), 500

  # Parse the JSON response
  data = response.json()

  return jsonify(data)


@app.route('/default-configs', methods=['GET'])
def get_default_configs():
    """
    Returns the default configurations that are hard-coded.
    """
    default_ids = ["OL365", "APPMAIL16", "CHROMEYAHOO", "CHROMEGMAILNEW","IPHONE16", "ANDROID11GMAILAPP"];  # Default selected IDs
    return jsonify(default_ids)

@app.route('/user-configs', methods=['GET'])
def get_user_configs():
    """
    Returns the user configurations from the database.  If none are found, returns the default configurations.
    """
    user_id = request.args.get('user_id', "00000000-0000-0000-0000-000000000000")
    user_configs = data_access.get_user_configs(user_id)

    if user_configs:
        return jsonify(user_configs)    
    return get_default_configs()

@app.route('/update-user-configs', methods=['POST'])
def update_user_configs():
    """
    Updates the user configurations in the database.
    """
    user_id = request.json.get('user_id', "00000000-0000-0000-0000-000000000000")
    configs = request.json.get('configs', [])
    if not configs:
        return jsonify({"error": "Configs cannot be empty."}), 400
    data_access.update_user_configs(configs, user_id)
    return jsonify({"message": "User configs updated successfully."})

@app.route('/create-litmus-email', methods=['POST'])
def create_litmus_email():
     """
     Creates a new email in Litmus using the Litmus API.
     """
     url = "https://instant-api.litmus.com/v1/emails"
     data = request.json
     try:
        response = requests.post(url,auth=(os.environ['LITMUS_API_KEY'],''), json=data)
        response.raise_for_status()
     except requests.exceptions.RequestException as e:
        print(e)
        return jsonify({"error": f"Error creating email: {e}"}), 500
     print(response.json())
     return jsonify(response.json())


if __name__ == "__main__":
    app.run(debug=True)
