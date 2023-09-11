# Generated by Django 4.2.4 on 2023-08-29 13:18

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Event',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.CharField(max_length=50)),
                ('title', models.CharField(max_length=100)),
                ('description', models.CharField(max_length=10000)),
                ('start', models.CharField(max_length=8)),
                ('end', models.CharField(max_length=8)),
            ],
        ),
    ]