from rest_framework import serializers
from .models import Product, Comment, RecoveryLink
from users.serializers import UserInfoSerializer

class CommentSerializer(serializers.ModelSerializer):
    user = UserInfoSerializer(read_only=True)
    class Meta:
        model = Comment
        fields = ['id', 'product', 'user', 'text', 'created_at']
        read_only_fields = ['user']

class ProductSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True, read_only=True)
    
    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'image', 'price', 'created_by', 'comments', 'is_active']
        read_only_fields = ['created_by']


class RecoveryLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecoveryLink
        fields = ['recovery_link']
