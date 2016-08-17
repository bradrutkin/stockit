from django.conf.urls import include, url
from .views import *

urlpatterns = [
	# url(r'^apps', Apps.as_view(), name='apps'),
	url(r'^search', Search.as_view(), name='search'),
	url(r'^hello', Hello.as_view(), name='hello'),
	url(r'^stories', Stories.as_view(), name='stories'),
	url(r'^lrprice', Lprice.as_view(), name = 'search'),
    url(r'^', Home.as_view(), name='home'),
    ]