from django.shortcuts import render
import misago.users.views.auth
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required
from misago.acl import get_user_acl
from center.forms import passageForm,blogPassageForm
from center.models import passage,blogPassage,showingPassage
import center.functions as functions
from django.utils import timezone
from misago.core.decorators import require_POST
from django.http import Http404
import datetime


# Create your views here.
def indexPage(request):
    #展示谣言
    try:
        showPassages = showingPassage.objects.all()
    except showingPassage.DoesNotExist:
        showPassages = '无展示谣言'
    #今日谣言
    try:
        passages = passage.objects.filter(passageDate=datetime.date.today())
    except passage.DoesNotExist:
        passages = '今日无新增举报'
    #今日谣言个数
    passagesCounts=[]
    for i in range(7):
        try:
            passagesCounts.append(passage.objects.filter(passageDate=datetime.date.today() - datetime.timedelta(days=i)).count())
        except passage.DoesNotExist:
            passagesCounts.append(0)
    #词云
    _cloudString=""
    for item in passages:
        _cloudString+=item.passageTitle+item.passageBody
    #functions.createWordCloud(_cloudString)
    return render(request, 'index.html', {'passages': passages,'passagesCounts':passagesCounts,'showingPassages':showPassages})

@login_required
@require_POST
def postBlog(request):
    postResult='failed'
    if request.method == 'POST':
        Passage=blogPassageForm(request.POST)
        if Passage.is_valid():
            _title=request.POST.get('title')
            _body=request.POST.get('body')
            _date=request.POST.get('date')
            _label=request.POST.get('label')
            blogPassage.objects.create(title=_title,body=_body,date=_date,label=_label)
            postResult='success'
            return render(request,'postResult.html',{'postResult':postResult})
    return render(request, 'postResult.html', {'postResult':postResult})

def postPassagePage(request):
    return render(request,'postPassages.html',{})

def postBlogPage(request):
    return render(request,'postBlog.html',{})

def blogPage(request):
    try:
        blogs=blogPassage.objects.all()
    except blogPassage.DoesNotExist:
        raise Http404
    return render(request,'blogPage.html',{'blogs':blogs})

def blogDetail(request,title):
    try:
        blog=blogPassage.objects.get(title=title)
    except blogPassage.DoesNotExist:
        raise Http404
    return render(request,'blogDetail.html',{'blog':blog})

@login_required
@require_POST
def postPassage(request):
    gettingRank = request.user.rank.order
    postResult = 'failed'
    if gettingRank <=0:
        if request.method == 'POST':
            Passage = passageForm(request.POST)
            if Passage.is_valid():
                _passageLink = request.POST.get('passageLink')
                _passageTitle = request.POST.get('passageTitle')
                _passageBody = request.POST.get('passageBody')
                _passageDate = request.POST.get('passageDate')
                _passageSource = request.POST.get('passageSource')
                _passageLabel = request.POST.get('passageLabel')
                if _passageTitle=="":
                    _passageTitle=functions.getURLTitle(_passageLink)
                passage.objects.create(passageLink=_passageLink, passageTitle=_passageTitle, passageBody=_passageBody,
                                   passageDate=_passageDate, passageSource=_passageSource, passageLabel=_passageLabel)
                postResult = 'success'
            return render(request, 'postResult.html', {'postResult': postResult})
    else:
        return render(request,'postResult.html',{'postResult':postResult})


def searchTag(request,tag):
    try:
        passages = blogPassage.objects.filter(label__iexact=tag)
    except blogPassage.DoesNotExist:
        raise Http404
    return render(request, 'tags.html', {'passages': passages})


def searchBlog(request,name):
    try:
        passages = blogPassage.objects.filter(title__icontains=name)
    except blogPassage.DoesNotExist:
        raise Http404
    return render(request,'archives.html',{'passages':passages})