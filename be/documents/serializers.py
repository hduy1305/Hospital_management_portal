from rest_framework import serializers
from .models import Document

class DocumentSerializer(serializers.ModelSerializer):
    uploaded_by = serializers.StringRelatedField(read_only=True)  # Hiển thị tên người upload
    file = serializers.FileField(required=False) 

    class Meta:
        model = Document
        fields = ['id', 'title', 'description', 'uploaded_at', 'uploaded_by', 'file']
        read_only_fields = ['id', 'uploaded_at', 'uploaded_by']
