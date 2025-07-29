
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('accounts.urls')),
    path('api/announcements/', include('announcements.urls')),
    path('api/documents/', include('documents.urls')),
    path('api/schedules/', include('schedules.urls')),
    path('api/requests/', include('staff_requests.urls')),
    # path('api/directory/', include('directory.urls')),
    path('api/dashboard/', include('dashboard.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
