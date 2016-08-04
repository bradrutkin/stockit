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
			for i in l1:
				x = i[0]
				a = x[:4]
				ar = x[5:]
				ar2 = ar[:2]
				if ar2 == '01':
					month = 'Jan'
				elif ar2 == '02':
					month = 'Feb'
				elif ar2 == '03':
					month = 'Mar'
				elif ar2 == '04':
					month = 'Apr'
				elif ar2 == '05':
					month = 'May'
				elif ar2 == '06':
					month = 'Jun'
				elif ar2 == '07':
					month = 'Jul'
				elif ar2 == '08':
					month = 'Aug'
				elif ar2 == '09':
					month = 'Sep'
				elif ar2 == '10':
					month = 'Oct'
				elif ar2 == '11':
					month = 'Nov'
				else:
					month = 'Dec'
				year = a[2:]
				day = x[8:]
				date = day + " " + month + " " + year
				i[0] = date

			context['prices'] = l1
			print(context)
			return JsonResponse(context)
		else:
			print("Error")
			return HttpResponse("Error")



# def search(request):
# 	resp = requests.get('http://marketdata.websol.barchart.com/getHistory.json?key=ebd0dee49a9208352b390e6452f7405b&symbol=aapl&type=daily&startDate=20150801&endDate=20160801')
# 	response = resp.json()
# 	dicts = response["results"]
# 	l1 = []
# 	temp_list_1 = []

# 	for i in dicts:
# 		temp_list_1.append(i["tradingDay"])
# 		temp_list_1.append(i["close"])
# 		l1.append(temp_list_1)
# 		temp_list_1 = []
# 	print (l1)

	
# 	if request.method == "POST":
# 		bitch = request.POST
# 		print(bitch)
# 		return HttpResponse("fuck")
# 	else:
# 		print("shit")
# 		return HttpResponse("fuck")
