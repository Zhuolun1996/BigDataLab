# -*- coding: utf-8 -*-
# Generated by Django 1.10.6 on 2017-04-10 09:22
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('center', '0006_auto_20170405_2043'),
    ]

    operations = [
        migrations.AlterField(
            model_name='blogpassage',
            name='label',
            field=models.CharField(choices=[('health', '健康养生'), ('newTech', '新科技'), ('Food', '食品安全')], max_length=20),
        ),
        migrations.AlterField(
            model_name='passage',
            name='passageLabel',
            field=models.CharField(choices=[('health', '健康养生'), ('newTech', '新科技'), ('Food', '食品安全')], max_length=20),
        ),
    ]