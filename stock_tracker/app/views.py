from django.shortcuts import render, render_to_response, get_object_or_404
from django.template import RequestContext
from django.views.generic import View
from django.contrib.auth import authenticate, login
from django.http import HttpResponseRedirect, HttpResponse, JsonResponse
from django.contrib.auth import logout
from django.contrib.auth.decorators import login_required
from django.views.generic import CreateView, ListView, DetailView
import requests 
import json
from app.wrapper import *


class Home(View):
	template = "app/search.html"

	def get(self, request):
		return render(request, self.template, {})

class Search(View):
	ticker = None 

	def post(self, request):
		if request.method == "POST":
			ticker = request.POST['tick']
			string1 = "http://marketdata.websol.barchart.com/getHistory.json?key=ebd0dee49a9208352b390e6452f7405b&symbol="
			string2 = "&type=daily&startDate=20150801&endDate=20160801"
			endpoint = string1+ticker+string2
			resp = requests.get(endpoint)
			response = resp.json()
			dicts = response["results"]
			l1 = []
			temp_list_1 = []

			for i in dicts:
				temp_list_1.append(i["tradingDay"])
				temp_list_1.append(i["close"])
				l1.append(temp_list_1)
				temp_list_1 = []
			context = {}

			context['prices'] = l1
			return JsonResponse(context)
		else:
			print("Error")
			return HttpResponse("Error")

class Lprice(View):
	
	ticker = None

	# def __init__():
	# 	self.post()

	def post(self, request):
		print("++++++++++++++++++++++++++++++++++++++++++++++++++")
		if request.method == "POST":
			ticker = request.POST['tick']
			xyprice = get_price(ticker)
			print(xyprice, "hello")
		else:
			print('shit')

class Hello(View):

	def post(self, request):
		if request.method == "POST":
			ticker = request.POST['x']
			l1 = get_price(ticker)
			xyprice = l1[0]
			xyopen = l1[1]
			# print(xyprice, "hello")
			context = {"current" : xyprice, "open": xyopen}
			return JsonResponse(context)
		else:
			print('shit')
			return JsonResponse("error")

class Stories(View):

	def post(self, request):
		if request.method == "POST":
			search_req = request.POST['search']
			search_req = search_req.replace(" ", "+")
			
			x = get_articles(search_req)
			context = {"stories":x}
			print(context)
			return JsonResponse(context)
		else:
			print("bye bye ")
			return HttpResponse("fuck off mate")


