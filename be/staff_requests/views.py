# staff_requests/views.py
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError

from .models import Request
from .serializers import RequestSerializer

class RequestListCreateView(generics.ListCreateAPIView):
    queryset = Request.objects.all().order_by('-created_at')
    serializer_class = RequestSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        qs = super().get_queryset()
        # lọc theo query params ?request_type=…&status=…
        rt = self.request.query_params.get('request_type')
        st = self.request.query_params.get('status')
        if rt:
            qs = qs.filter(request_type=rt)
        if st:
            qs = qs.filter(status=st)
        return qs

    def perform_create(self, serializer):
        serializer.save(requester=self.request.user)


class RequestDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Request.objects.all()
    serializer_class = RequestSerializer
    permission_classes = [IsAdminUser]
    
    def perform_update(self, serializer):
        # Nếu có cố gắng đổi status
        if 'status' in serializer.validated_data:
            raise ValidationError({"detail": "Không thể cập nhật trực tiếp trường status."})
        super().perform_update(serializer)


class RequestApproveView(generics.UpdateAPIView):
    queryset = Request.objects.all()
    serializer_class = RequestSerializer
    permission_classes = [IsAdminUser]

    def update(self, request, *args, **kwargs):
        req = self.get_object()
        if req.status != 'pending':
            raise ValidationError({"detail": "Chỉ có đơn đang ở trạng thái Pending mới có thể duyệt."})
        req.status = 'approved'
        req.save()
        return Response(RequestSerializer(req).data, status=status.HTTP_200_OK)


class RequestRejectView(generics.UpdateAPIView):
    queryset = Request.objects.all()
    serializer_class = RequestSerializer
    permission_classes = [IsAdminUser]

    def update(self, request, *args, **kwargs):
        req = self.get_object()
        if req.status != 'pending':
            raise ValidationError({"detail": "Chỉ có đơn đang ở trạng thái Pending mới có thể từ chối."})
        req.status = 'rejected'
        req.save()
        return Response(RequestSerializer(req).data, status=status.HTTP_200_OK)
