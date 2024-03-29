# routing.py

from django.urls import re_path
from .consumers import CommentConsumer

websocket_urlpatterns = [
    re_path(r'ws/product/(?P<product_id>\d+)/comments/$', CommentConsumer.as_asgi()),
]


