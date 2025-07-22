from django.urls import path
from .views import (
    DocumentListCreateView,
    DocumentDetailView,
    DocumentDownloadView
)

urlpatterns = [
    path('', DocumentListCreateView.as_view(), name='document-list-create'),
    path('<int:pk>/', DocumentDetailView.as_view(), name='document-detail'),
    path('download/<int:pk>/', DocumentDownloadView.as_view(), name='document-download'),
]
