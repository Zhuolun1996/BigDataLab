# -*- coding: utf-8 -*-
# Generated by Django 1.10.6 on 2017-04-17 09:59
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('center', '0012_auto_20170417_1752'),
    ]

    operations = [
        migrations.AlterField(
            model_name='blogpassage',
            name='author',
            field=models.CharField(default='匿名用户', max_length=20),
        ),
        migrations.AlterField(
            model_name='passage',
            name='passageSource',
            field=models.CharField(choices=[('email', '邮件'), ('message', '短信'), ('friendCicle', '朋友圈')], max_length=20),
        ),
    ]
