from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Document(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)
    uploaded_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='uploaded_documents')
    file = models.FileField(upload_to='documents/')  # => sẽ lưu vào MEDIA_ROOT/documents/

    def __str__(self):
        return self.title