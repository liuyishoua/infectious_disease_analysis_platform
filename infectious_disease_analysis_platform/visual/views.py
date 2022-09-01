from django.shortcuts import render,HttpResponse

# Create your views here.
def index(request):
    # return HttpResponse("hhaha")
    return render(request,'index.html')

def graph_show(request):
    return render(request,'graph_show.html')

def home(request):
    return render(request,'home.html')

def third(request):
    return render(request,'third.html')