# schedules/permissions.py
from rest_framework import permissions

class IsAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'admin'

class IsDoctorScheduleOwner(permissions.BasePermission):
    """
    Cho phép bác sĩ xem schedule của chính họ, hoặc admin truy cập.
    """
    def has_object_permission(self, request, view, obj):
        if request.user.role == 'admin':
            return True
        return request.user.is_authenticated and request.user.role == 'doctor' and obj.doctor == request.user
