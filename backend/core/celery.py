import os
from celery import Celery
from dotenv import load_dotenv
from celery.schedules import crontab

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "core.settings")
load_dotenv()
app = Celery("core")
app.config_from_object("django.conf:settings", namespace="CELERY")
app.autodiscover_tasks()

app.conf.beat_schedule = {
    'deactivate_product_30_days_after_creation': {
        'task': 'products.tasks.deactivate_product',
        'schedule': crontab(minute=0, hour=0),
    },
    'send_recovery_link': {
        'task': 'products.tasks.send_recovery_link',
        'schedule': crontab(minute=0, hour=0),

    }
}