from django.http import JsonResponse
from .validators.account_validator import validate_credentials

def login_view(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        
        result = validate_credentials(username, password)
        
        if result['status'] == 'success':
            # Return JSON data to the client
            return JsonResponse(result)
        else:
            # Return error JSON
            return JsonResponse({"status": "error", "message": result['message']})