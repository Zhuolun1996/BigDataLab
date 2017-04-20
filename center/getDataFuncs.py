from center.models import blogPassage, showingPassage, passage
from django.core import serializers
from django_ajax.decorators import ajax
from django.http import JsonResponse, Http404
import datetime


@ajax
def getAllBlogPassages(request):
    try:
        blogs = blogPassage.objects.all()
    except blogPassage.DoesNotExist:
        return JsonResponse({'status': 404})
    data = serializers.serialize('json', blogs)
    return data


@ajax
def getAllShowingPassage(request):
    try:
        showPassages = showingPassage.objects.all()
    except showingPassage.DoesNotExist:
        return JsonResponse({'status': 404})
    data = serializers.serialize('json', showPassages)
    return data


@ajax
def getTodayPassages(request):
    try:
        passages = passage.objects.filter(passageDate=datetime.date.today())
    except:
        return JsonResponse({'status': 404})
    data = serializers.serialize('json', passages)
    return data


@ajax
def getPassageCounts(request):
    passagesCounts = []
    for i in range(7):
        try:
            passagesCounts.append(
                passage.objects.filter(passageDate=datetime.date.today() - datetime.timedelta(days=i)).count())
        except passage.DoesNotExist:
            passagesCounts.append(0)
    return JsonResponse(passagesCounts, safe=False)


@ajax
def getBlogDetail(request, title):
    try:
        blog = blogPassage.objects.get(title=title)
    except blogPassage.DoesNotExist:
        return JsonResponse({'status': 404})
    data = serializers.serialize('json', [blog])
    return data


@ajax
def getSearchingTag(request, tag):
    try:
        passages = blogPassage.objects.filter(label__iexact=tag)
    except blogPassage.DoesNotExist:
        return JsonResponse({'status': 404})
    data = serializers.serialize('json', passages)
    return data


@ajax
def getSearchingBlog(request, name):
    try:
        passages = blogPassage.objects.filter(title__icontains=name)
    except blogPassage.DoesNotExist:
        return JsonResponse({'status': 404})
    data = serializers.serialize('json', passages)
    return data
