from django.urls import path
from .views import create_complaint, my_complaints, test_endpoint

urlpatterns = [
    path('create/', create_complaint),
    path('my/', my_complaints),
    path('test/', test_endpoint),
]