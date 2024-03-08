from .serializers import ProductSerializer, CommentSerializer, RecoveryLinkSerializer
from .models import Product, Comment, RecoveryLink
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

class ProductListCreateAPIView(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

class ProductDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]

class CommentCreateAPIView(generics.CreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)




class ProductRecoverAPIView(generics.UpdateAPIView):
    queryset = RecoveryLink.objects.all()
    serializer_class = RecoveryLinkSerializer
    lookup_field = 'recovery_link'

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance.is_recovered:
            return Response({"error": "This product has already been recovered."}, status=status.HTTP_400_BAD_REQUEST)
        product = instance.product
        product.is_active = True
        product.save()
        instance.is_recovered = True
        instance.save()
        return Response({"message": "Product has been successfully recovered."}, status=status.HTTP_200_OK)
