from .serializers import ProductSerializer, CommentSerializer, RecoveryLinkSerializer
from .models import Product, Comment, RecoveryLink
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from rest_framework import pagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.viewsets import ModelViewSet



class CustomPagination(pagination.PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100



class ProductListCreateAPIView(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticatedOrReadOnly] 
    pagination_class = CustomPagination

    def get_paginated_response(self, data):
        return self.paginator.get_paginated_response(data)

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)



class ProductDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer



class DeleteCommentView(generics.DestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = (IsAuthenticated,)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if request.user == instance.user:
            self.perform_destroy(instance)
            return Response({'detail': 'Comment deleted successfully.'}, status=status.HTTP_204_NO_CONTENT)
        else:
            return Response({'detail': 'You are not allowed to delete this comment.'}, status=status.HTTP_403_FORBIDDEN)




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
