from django.db import models
from django.contrib.auth.models import User
class MunicipalCommittee(models.Model):
    name = models.CharField(max_length=255)

    state = models.CharField(max_length=100)
    city = models.CharField(max_length=100)

    address = models.TextField()

    def __str__(self):
        return f"{self.name} ({self.city})"


class Complaint(models.Model):

    STATUS_CHOICES = [
        ('submitted', 'Submitted'),
        ('approved', 'Approved'),
        ('in_progress', 'In Progress'),
        ('resolved', 'Resolved'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)

    # User Input
    title = models.CharField(max_length=255)
    description = models.TextField()
    image = models.ImageField(upload_to='complaints/', null=True, blank=True)

    # Location
    state = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    pincode = models.CharField(max_length=10)
    address = models.TextField()

    # System Assigned
    committee = models.ForeignKey(
        MunicipalCommittee,
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='submitted'
    )

    estimated_time = models.CharField(max_length=50, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
    
    
class ComplaintUpdate(models.Model):
    complaint = models.ForeignKey(Complaint, on_delete=models.CASCADE)
    status = models.CharField(max_length=50)
    updated_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return f"{self.complaint.title} - {self.status}"