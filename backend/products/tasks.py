from celery import shared_task
from django.utils import timezone
from .models import Product, RecoveryLink
from django.core.mail import send_mail
from django.contrib.auth.models import User
from datetime import timedelta
from django.conf import settings


@shared_task
def deactivate_product(product_id):
    try:
        product = Product.objects.get(id=product_id)
        product.is_active = False
        product.save()
        return f"Product with ID {product_id} has been deactivated successfully."
    except Product.DoesNotExist:
        return f"Product with ID {product_id} does not exist."



@shared_task
def send_recovery_link(product_id, user_id):
    try:
        product = Product.objects.get(id=product_id)
        user = User.objects.get(id=user_id)
        recovery_link = RecoveryLink.objects.create(product=product, user=user)
        send_mail(
            'Product Recovery Link',
            f'Here is your recovery link: {settings.BASE_URL}/recover/{recovery_link.recovery_link}',
            settings.EMAIL_HOST_USER,
            [user.email],
            fail_silently=False,
        )
    except (Product.DoesNotExist, User.DoesNotExist):
        pass



