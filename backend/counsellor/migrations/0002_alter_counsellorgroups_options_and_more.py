# Generated by Django 4.2.6 on 2023-11-26 08:47

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('counsellor', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='counsellorgroups',
            options={'verbose_name_plural': 'Counsellor-Groups'},
        ),
        migrations.RemoveField(
            model_name='counsellorgroups',
            name='counsellor',
        ),
        migrations.AddField(
            model_name='counsellorgroups',
            name='counsellor_id',
            field=models.OneToOneField(db_column='counsellor_id', default=1122112211, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='counsellorgroups',
            name='counsellor_name',
            field=models.CharField(default='vg', max_length=75),
            preserve_default=False,
        ),
    ]