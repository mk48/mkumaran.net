---
title: Getting started Django
date: '2021-04-10'
---

## Install

Ensure that python is already installed.
![](CheckPythonVersion.png)

### install virtual environment

```
pip install virtualenvwrapper-win
```

![](InstallVirtualEnvWarpper.png)

### Create virtual environment

```
mkvirtualenv djangoprj
```

![](CreatingVirtualEnv.png)

### Install Django

ensure that you are inside the virtual environment

```
pip install django
```

![](InstallDjango.png)

Run below command to check django is installed

```
django-admin --version
```

![](EnsureDjangoInstalled.png)

## Create project

```
django-admin startproject djsample
```

![](CreateDjangoProject.png)

![](NewFolderCreatedForProject.png)

## Run project

```
cd djsample
```

![](GoToInsideTheProjectToRun.png)

```
py manage.py runserver
```

![](RunDjangoProjectsServer.png)
Do not close the above window.

open `http://localhost:8000` in browser.

![](RunningNewDjangoPage.png)

stop the running server and move to next step.

### Enter to virtual environment

from command prompt to enter into virtual environment

```
workon djangoprj
```

![](EntertoVirtualEnv.png)

## Admin panel

### create simple app

```
python manage.py startapp app
```

![](CreateDjangoApp.png)

a new folder `app` has been created
![](NewAppFolderCreated.png)

### Database

Install posgreSQL library

```
pip install psycopg2
```

![](InstallPsycopg2.png)

update below database config at `settings.py`

```
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'mydatabase',
        'USER': 'mydatabaseuser',
        'PASSWORD': 'mypassword',
        'HOST': '127.0.0.1',
        'PORT': '5432',
    }
}

```

### Create model from existing database

Run below command to auto generate models. This will overwrite the exisitng `models.py` file.

```
python manage.py inspectdb > .\app\models.py
```

![](AutogenerateModelsForDjango.png)

### migration

```
python manage.py migrate
```

![](RunMigrate.png)

by running the above command, few tables are created automatically.
![](NewMigrationTablesCreated.png)

### Create super user

```
python manage.py createsuperuser
```

![](CreateSuperUser.png)

### Run and check

Start the server

```
py manage.py runserver
```

Go to `http://localhost:8000/admin`

![](DjangoAdminLoginScreen.png)

stop the running server and move to next step.

### Config

add `app.apps.AppConfig` inside `INSTALLED_APPS` section in `settings.py` file

![](AddAppintoSettings.png)

Type below code `admin.py` file

```python
from django.contrib import admin
from .models import Company, Medicine

# Register your models here.
admin.site.register(Company)
admin.site.register(Medicine)
```

![](RegisterModelForAdmin.png)
