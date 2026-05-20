from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('news/', views.news_list, name='news_list'),
    path('news/<int:pk>/', views.news_detail, name='news_detail'),
    path('dictionary/', views.dictionary, name='dictionary'),
    path('nir/', views.research_projects, name='research_projects'),
    path('appeal/', views.appeal, name='appeal'),
]
