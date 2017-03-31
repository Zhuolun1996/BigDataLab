import requests
from bs4 import BeautifulSoup
from os import path
from chinese_cloud.chinese_cloud import ChineseCloud
from testForum1.settings import STATIC_ROOT


def getURLTitle(url):
    htmlText = requests.get(url).text
    soup = BeautifulSoup(htmlText,"html5lib")
    return soup.title.string


def createWordCloud(text):
    PATH = path.join(STATIC_ROOT, 'wordcloud')
    ChineseCloud(width=200, height=200, max_font=20, min_font=5).generate(text).to_image(
        path.join(PATH, "wordcloud.png"))
