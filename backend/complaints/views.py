from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .serializers import ComplaintSerializer
from .models import Complaint

@api_view(['GET'])
def test_endpoint(request):
    from rest_framework_simplejwt.authentication import JWTAuthentication
    from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
    
    auth_header = request.headers.get('Authorization', 'No header')
    
    auth = JWTAuthentication()
    
    try:
        header = auth.get_header(request)
        raw_token = auth.get_raw_token(header)
        validated_token = auth.get_validated_token(raw_token)
        user = auth.get_user(validated_token)
        return Response({
            'message': 'Test endpoint works',
            'auth_header': auth_header,
            'user_id': user.id,
            'username': user.username
        })
    except (InvalidToken, TokenError) as e:
        return Response({
            'message': 'Token error',
            'auth_header': auth_header,
            'error': str(e)
        }, status=401)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_complaint(request):
    serializer = ComplaintSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save(user=request.user)
        return Response(serializer.data, status=201)

    return Response(serializer.errors, status=400)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def my_complaints(request):
    complaints = Complaint.objects.filter(user=request.user).order_by('-created_at')
    serializer = ComplaintSerializer(complaints, many=True)
    return Response(serializer.data)