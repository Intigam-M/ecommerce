from rest_framework import serializers
from .models import Product, Comment

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id', 'product', 'user', 'text', 'created_at']
        read_only_fields = ['user']

class ProductSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True, read_only=True)
    
    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'image', 'price', 'created_by', 'comments']
        read_only_fields = ['created_by']
