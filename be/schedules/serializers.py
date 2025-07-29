# schedules/serializers.py
from rest_framework import serializers
from .models import Schedule
from django.contrib.auth import get_user_model
User = get_user_model()

class ScheduleSerializer(serializers.ModelSerializer):
    doctor = serializers.StringRelatedField(read_only=True)
    doctor_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.filter(role='doctor'),
        source='doctor',
        write_only=True
    )

    class Meta:
        model = Schedule
        fields = ['id', 'doctor', 'doctor_id', 'date', 'start_time', 'end_time', 'notes']
