from django.contrib import admin
from . import models


@admin.register(models.Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'created_by', 'created_at')
    search_fields = ('name', 'price', 'created_by', 'created_at')
    list_filter = ('created_at', 'price')


@admin.register(models.Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ('product', 'user', 'created_at')
    search_fields = ('product', 'user', 'created_at')
    list_filter = ('created_at', 'user')


@admin.register(models.RecoveryLink)
class RecoveryLinkAdmin(admin.ModelAdmin):
    list_display = ('user', 'product', 'is_recovered', 'created_at')
    search_fields = ('user', 'product', 'is_recovered', 'created_at')
    list_filter = ('created_at', 'is_recovered')




