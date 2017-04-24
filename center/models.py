from django.db import models


# Create your models here.
class passage(models.Model):
    PASSAGE_SOURCE_CHOICES = {('friendCicle', '朋友圈'), ('message', '短信'), ('email', '邮件')}
    PASSAGE_LABEL_CHOICES = {('Food', '食品安全'), ('health', '健康养生'), ('newTech', '新科技')}
    passageLink = models.CharField(max_length=1000, null=False, primary_key=True)
    passageTitle = models.CharField(max_length=100, blank=True, default='无标题')
    passageBody = models.TextField()
    passageDate = models.DateField(auto_now=True)
    passageSource = models.CharField(max_length=20, choices=PASSAGE_SOURCE_CHOICES, null=False)
    passageLabel = models.CharField(max_length=20, choices=PASSAGE_LABEL_CHOICES, null=False)
    passagePhone = models.CharField(max_length=20, blank=True)
    passageAppendix = models.CharField(max_length=200,blank=True)

    def __str__(self):
        return self.passageTitle

    class Meta:
        ordering = ['-passageDate']


class showingPassage(models.Model):
    passageTitle = models.CharField(max_length=100, primary_key=True)
    passageBody = models.TextField(blank=True, default='无内容', null=True)

    def __str__(self):
        return self.passageTitle


class blogPassage(models.Model):
    LABEL_CHOICES = {('Food', '食品安全'), ('health', '健康养生'), ('newTech', '新科技')}
    title = models.CharField(max_length=100, null=False, primary_key=True)
    body = models.TextField(null=False)
    date = models.DateField(auto_now=True)
    label = models.CharField(max_length=20, choices=LABEL_CHOICES, null=False)
    image = models.ImageField(upload_to='blogImages/', default='blogImages/no-img.jpeg')
    author = models.CharField(max_length=20,blank=True,default='匿名用户')
    def __str__(self):
        return self.title

    class Meta:
        ordering = ['-date']
