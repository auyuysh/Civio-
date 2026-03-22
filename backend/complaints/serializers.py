from rest_framework import serializers
from .models import Complaint, MunicipalCommittee

class ComplaintSerializer(serializers.ModelSerializer):

    committee_name = serializers.CharField(source='committee.name', read_only=True)
    committee_address = serializers.CharField(source='committee.address', read_only=True)
    class Meta:
        model = Complaint
        fields = '__all__'
        read_only_fields = ['user', 'status', 'committee', 'estimated_time']

    def create(self, validated_data):
        city = validated_data.get('city').strip()

        # find matching committee (case-insensitive)
        committee = MunicipalCommittee.objects.filter(city__iexact=city).first()

        # assign estimated time
        if committee:
            estimated_time = "1-2 days"
        else:
            estimated_time = "3-5 days"

        complaint = Complaint.objects.create(
            committee=committee,
            estimated_time=estimated_time,
            **validated_data
        )

        return complaint