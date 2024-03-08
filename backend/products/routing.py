# routing.py

from django.urls import re_path
from .consumers import CommentConsumer

websocket_urlpatterns = [
    re_path(r'ws/file/(?P<file_id>\d+)/comments/$', CommentConsumer.as_asgi()),
]


