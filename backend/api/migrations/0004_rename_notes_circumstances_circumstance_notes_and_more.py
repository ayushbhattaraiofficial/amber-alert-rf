# Generated by Django 5.0.3 on 2024-03-20 06:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_alter_circumstances_aggravating_factors_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='circumstances',
            old_name='notes',
            new_name='circumstance_notes',
        ),
        migrations.RenameField(
            model_name='transportation',
            old_name='notes',
            new_name='transport_notes',
        ),
        migrations.AlterField(
            model_name='classificationresult',
            name='is_solved',
            field=models.BooleanField(default=False, help_text='Is the report solved?'),
        ),
        migrations.AlterField(
            model_name='physicaldescription',
            name='paralysis',
            field=models.BooleanField(default=False, help_text='Is there any paralysis?'),
        ),
    ]
