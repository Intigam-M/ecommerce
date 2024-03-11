from django.urls import path
from .views import ProductListCreateAPIView, ProductDetailAPIView, DeleteCommentView

urlpatterns = [
    path('products/', ProductListCreateAPIView.as_view(), name='product-list-create'),
    path('products/<int:pk>/', ProductDetailAPIView.as_view(), name='product-detail'),
    path('comment/<int:pk>/', DeleteCommentView.as_view(), name='delete-comment'),       
]

