from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Schedule
from .serializers import ScheduleSerializer

class IsAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.is_staff

class ScheduleViewSet(viewsets.ModelViewSet):
    queryset = Schedule.objects.all()
    serializer_class = ScheduleSerializer

    def get_permissions(self):
        if self.action == 'list':
            return [permissions.AllowAny()]
        elif self.action == 'create':
            return [permissions.IsAuthenticated(), IsAdmin()]
        elif self.action == 'retrieve':
            return [permissions.IsAuthenticated(), IsAdmin()]
        elif self.action in ['update', 'partial_update', 'destroy']:
            return [permissions.IsAuthenticated(), IsAdmin()]
        elif self.action == 'my_schedules':
            return [permissions.IsAuthenticated()]
        return super().get_permissions()

    @action(detail=False, methods=['get'], url_path='my-schedules')
    def my_schedules(self, request):
        user = request.user
        schedules = Schedule.objects.filter(doctor=user)
        serializer = self.get_serializer(schedules, many=True)
        return Response(serializer.data)
