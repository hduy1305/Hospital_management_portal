# accounts/urls.py

from django.urls import path
from .views import (
    LoginView, LogoutView, TokenRefreshView,
    ProfileView,
    UserListCreateView, UserDetailView,
    # RegisterView  # nếu bạn vẫn duy trì tạo tài khoản qua register
)

urlpatterns = [
    # Authentication
    path('login/', LoginView.as_view(), name='login'),                   # POST /api/login/
    path('logout/', LogoutView.as_view(), name='logout'),                # POST /api/logout/
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Profile
    path('profile/', ProfileView.as_view(), name='profile'),             # GET/PUT /api/profile/

    # User CRUD (Admin only)
    path('users/', UserListCreateView.as_view(), name='user-list-create'),        # GET/POST /api/users/
    path('users/<int:pk>/', UserDetailView.as_view(), name='user-detail'),        # GET/PUT/DELETE /api/users/<id>/

    # # (nếu cần) Signup mở: chỉ AllowAny
    # path('register/', RegisterView.as_view(), name='register'),
]
