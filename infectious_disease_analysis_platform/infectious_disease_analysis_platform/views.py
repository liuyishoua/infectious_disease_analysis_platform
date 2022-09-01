from django.shortcuts import render
from django.http import HttpResponse

def index(request):
    # return HttpResponse("hahah")
    return render(request, 'index.html')
