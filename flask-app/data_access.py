from littletable import Table
import json

class DataAccess:
    def __init__(self):
        self.user_configs_table = Table('user_configs')
        self.user_configs_table.create_index('user_id')

    def get_user_configs(self, user_id="00000000-0000-0000-0000-000000000000"):
        users = list(self.user_configs_table.where(user_id=user_id))
        user = users[0] if users else None
        return json.loads(user.configs) if user else None

    def update_user_configs(self, configs, user_id="00000000-0000-0000-0000-000000000000"):
        # Ensure configs is a list of strings
        if not isinstance(configs, list) or not all(isinstance(item, str) for item in configs):
            raise TypeError("configs must be a list of strings")

        # Check if the record exists
        users = list(self.user_configs_table.where(user_id=user_id))

        # limitation of littletable - you need to remove the record and insert a new one to update
        if users:
            user = users[0]
            # remove the existing record
            self.user_configs_table.remove(user)            
       
        # Insert a new record
        self.user_configs_table.insert({'user_id': user_id, 'configs': json.dumps(configs)})