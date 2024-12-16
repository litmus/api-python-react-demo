# Litmus Instant API Demo

This project demonstrates the use of the [Litmus Instant API](https://docs.litmus.com/instant) with a full-stack application. The backend Flask app wraps the Litmus API calls, while the React frontend provides a user interface for testing an email with the Litmus API.

![api-demo-preview](https://github.com/user-attachments/assets/daceb353-b71e-436e-a8a7-3370d4ca2978)


## Project Structure

```
root/
├── flask-app/      # Backend implementation with Flask
├── react-app/      # Frontend implementation with React
├── .gitignore
└── ReadMe.md
```

### Flask Backend
The Flask project serves as an intermediary between the React frontend and the Litmus API, handling API calls and any necessary data processing.

### React Frontend
The React project provides a user interface for uploading or entering email content and testing it with the Litmus API.

## Prerequisites

- [Python](https://www.python.org/) (3.8 or higher)
- [Node.js](https://nodejs.org/) (16.x or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- Litmus Instant API key

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <repository-folder>
```

### 2. Set Up the Flask Backend

1. Navigate to the `flask-app` directory:
   ```bash
   cd flask-app
   ```
2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Create a `.flaskenv` file for environment variables:
   ```bash
   cp .flaskenv.example .flaskenv
   ```
   Add your Litmus Instant API key to the `.env` file:
   ```
   LITMUS_API_KEY=<your-litmus-api-key>
   ```
5. Run the Flask development server:
   ```bash
   flask run
   ```
   The server will run on `http://127.0.0.1:5000` by default.

### 3. Set Up the React Frontend

1. Navigate to the `react-app` directory:
   ```bash
   cd ../react-app
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the React development server:
   ```bash
   npm start
   ```
   The server will run on `http://localhost:3000` by default.

### 4. Access the Application

1. Open the React app in your browser:
   ```
   http://localhost:3000
   ```
2. Use the interface to upload or enter email content and test it using the Litmus API.

## Additional Notes

- For detailed API documentation, visit [Litmus Instant API Docs](https://docs.litmus.com/instant).
- Ensure both the Flask backend and React frontend are running simultaneously for the application to function properly.
- The backend Flask app uses [littletable](https://github.com/ptmcg/littletable) as an in-memory data store to demonstrate saving and retrieving email client preferences.

## License

This project is for demonstration purposes only and is not intended for production use.

