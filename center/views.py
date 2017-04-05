from django.shortcuts import render
import misago.users.views.auth
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required
from misago.acl import get_user_acl
from center.forms import passageForm, blogPassageForm
from center.models import passage, blogPassage, showingPassage
import center.functions as functions
from django.utils import timezone
from misago.core.decorators import require_POST
from django.http import Http404
import datetime


# Create your views here.
def indexPage(request):
    return render(request, 'index.html')


@login_required
@require_POST
def postBlog(request):
    postResult = 'failed'
    if request.method == 'POST':
        Passage = blogPassageForm(request.POST)
        if Passage.is_valid():
            _title = request.POST.get('title')
            _body = request.POST.get('body')
            _date = request.POST.get('date')
            _label = request.POST.get('label')
            blogPassage.objects.create(title=_title, body=_body, date=_date, label=_label)
            postResult = 'success'
            return render(request, 'postResult.html', {'postResult': postResult})
    return render(request, 'postResult.html', {'postResult': postResult})


def postPassagePage(request):
    return render(request, 'postPassages.html')


def postBlogPage(request):
    return render(request, 'postBlog.html')


def blogPage(request):
    return render(request, 'blogPage.html')


def blogDetail(request, title):
    return render(request, 'blogDetail.html')


@login_required
@require_POST
def postPassage(request):
    gettingRank = request.user.rank.order
    postResult = 'failed'
    if gettingRank <= 0:
        if request.method == 'POST':
            Passage = passageForm(request.POST)
            if Passage.is_valid():
                _passageLink = request.POST.get('passageLink')
                _passageTitle = request.POST.get('passageTitle')
                _passageBody = request.POST.get('passageBody')
                _passageDate = request.POST.get('passageDate')
                _passageSource = request.POST.get('passageSource')
                _passageLabel = request.POST.get('passageLabel')
                if _passageTitle == "":
                    _passageTitle = functions.getURLTitle(_passageLink)
                passage.objects.create(passageLink=_passageLink, passageTitle=_passageTitle, passageBody=_passageBody,
                                       passageDate=_passageDate, passageSource=_passageSource,
                                       passageLabel=_passageLabel)
                postResult = 'success'
            return render(request, 'postResult.html', {'postResult': postResult})
    else:
        return render(request, 'postResult.html', {'postResult': postResult})


def searchTag(request, tag):
    return render(request, 'tags.html')


def searchBlog(request, name):
    return render(request, 'archives.html')
