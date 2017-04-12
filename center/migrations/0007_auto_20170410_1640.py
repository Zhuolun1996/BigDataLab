# -*- coding: utf-8 -*-
# Generated by Django 1.10.6 on 2017-04-10 08:40
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('center', '0006_auto_20170405_2043'),
    ]

    operations = [
        migrations.AddField(
            model_name='blogpassage',
            name='image',
            field=models.ImageField(default='blogImages/no-img.jpeg', upload_to='blogImages/'),
        ),
        migrations.AlterField(
            model_name='blogpassage',
            name='label',
            field=models.CharField(choices=[('health', '健康养生'), ('Food', '食品安全'), ('newTech', '新科技')], max_length=20),
        ),
        migrations.AlterField(
            model_name='passage',
            name='passageLabel',
            field=models.CharField(choices=[('health', '健康养生'), ('Food', '食品安全'), ('newTech', '新科技')], max_length=20),
        ),
        migrations.AlterField(
            model_name='passage',
            name='passageSource',
            field=models.CharField(choices=[('friendCicle', '朋友圈'), ('message', '短信'), ('email', '邮件')], max_length=20),
        ),
    ]