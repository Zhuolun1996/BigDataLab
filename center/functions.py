import requests
from bs4 import BeautifulSoup
from os import path
from chinese_cloud.chinese_cloud import ChineseCloud
from testForum1.settings import STATIC_ROOT
from center.models import passage
import datetime


def getURLTitle(url):
    headers = {"Accept": "text/html,application/xhtml+xml,application/xml;",
               "Accept-Encoding": "gzip",
               "Accept-Language": "zh-CN,zh;q=0.8",
               "User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.90 Safari/537.36"
               }
    htmlText = requests.get(url,headers=headers).text
    print(htmlText)
    soup = BeautifulSoup(htmlText,"html5lib")
    title=soup.title.string
    images=soup.find_all("img")
    postUser=soup.find(id="post-user").string
    postDate=soup.find(id="post-date").string
    return title,len(images),postUser,postDate


def createWordCloud():
    passages=passage.objects.filter(passageDate=datetime.date.today())
    _cloudString = ""
    for item in passages:
        _cloudString += item.passageTitle + item.passageBody
    PATH = path.join(STATIC_ROOT, 'wordcloud')
    ChineseCloud(width=200, height=200, max_font=20, min_font=5).generate(text).to_image(
        path.join(PATH, "wordcloud.png"))
