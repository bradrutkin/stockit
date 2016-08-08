from django.conf.urls import include, url
from .views import *

urlpatterns = [
	# url(r'^apps', Apps.as_view(), name='apps'),
	url(r'^search', Search.as_view(), name='search'),
    url(r'^', Home.as_view(), name='home'),
    ]