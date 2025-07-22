from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from django.http import FileResponse, Http404

from .models import Document
from .serializers import DocumentSerializer
from accounts.permissions import IsAdmin, IsAdminOrReadOnly

# Danh sách & tạo mới tài liệu
class DocumentListCreateView(generics.ListCreateAPIView):
    queryset = Document.objects.all().order_by('-uploaded_at')
    serializer_class = DocumentSerializer
    permission_classes = [IsAdminOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(uploaded_by=self.request.user)

# Chi tiết, sửa, xoá tài liệu
class DocumentDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer
    permission_classes = [IsAdminOrReadOnly]

# Tải file tài liệu
class DocumentDownloadView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, pk):
        try:
            document = Document.objects.get(pk=pk)
            return FileResponse(document.file.open(), as_attachment=True, filename=document.file.name)
        except Document.DoesNotExist:
            raise Http404("Tài liệu không tồn tại.")
