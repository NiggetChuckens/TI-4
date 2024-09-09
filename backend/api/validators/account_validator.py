from django.contrib.auth import authenticate
from django.contrib.auth.models import User

def validate_credentials(username, password):
    user = authenticate(username=username, password=password)
    
    if user is not None:
        # Get the user's group memberships
        groups = user.groups.all()
        
        # Determine the user type based on the first group membership
        user_type = next((group.name for group in groups), 'Unknown')
        
        return {
            "status": "success",
            "message": f"Welcome, {username}!",
            "user_type": user_type
        }
    else:
        return {
            "status": "error",
            "message": "Invalid username or password"
        }