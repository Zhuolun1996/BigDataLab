import requests
from bs4 import BeautifulSoup
from os import path
from chinese_cloud.chinese_cloud import ChineseCloud
from testForum1.settings import STATIC_ROOT
from center.models import passage


def getURLTitle(url):
    htmlText = requests.get(url).text
    soup = BeautifulSoup(htmlText,"html5lib")
    return soup.title.string


def createWordCloud():
    passages=passage.objects.all()
    _cloudString = ""
    for i in range(-1,-8,-1):
        _cloudString += passages[i].passageTitle + passages[i].passageBody
    PATH = path.join(STATIC_ROOT, 'wordcloud')
    ChineseCloud(width=200, height=200, max_font=20, min_font=5).generate(text).to_image(
        path.join(PATH, "wordcloud.png"))
