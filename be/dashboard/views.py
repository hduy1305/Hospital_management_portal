import datetime
from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions

from schedules.models import Schedule
from staff_requests.models import Request  # điều chỉnh nếu model tên khác

User = get_user_model()  # chỉ cần nếu có dùng User

class IsAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        return (
            request.user
            and request.user.is_authenticated
            and request.user.role == 'admin'
        )

class DashboardSummaryView(APIView):
    permission_classes = [permissions.IsAuthenticated, IsAdmin]

    def get(self, request, format=None):
        today = datetime.date.today()

        doctors_on_duty = (
            Schedule.objects
            .filter(date=today)
            .values('doctor')
            .distinct()
            .count()
        )
        pending_requests = Request.objects.filter(status='pending').count()

        return Response({
            'doctors_on_duty': doctors_on_duty,
            'pending_requests': pending_requests,
        })
