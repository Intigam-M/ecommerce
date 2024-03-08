from django.urls import path
from .views import ProductListCreateAPIView, ProductDetailAPIView, CommentCreateAPIView

urlpatterns = [
    path('products/', ProductListCreateAPIView.as_view(), name='product-list-create'),
    path('products/<int:pk>/', ProductDetailAPIView.as_view(), name='product-detail'),
    path('comments/', CommentCreateAPIView.as_view(), name='comment-create'),
]
