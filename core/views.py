from django.shortcuts import render, get_object_or_404, redirect
from django.contrib import messages
from django.db.models import Q

from .models import News, DictionaryEntry, ResearchProject, Appeal
from .forms import AppealForm, DictionarySearchForm


def index(request):
    featured_news = News.objects.filter(is_published=True, is_featured=True).first()
    latest_news = News.objects.filter(is_published=True, is_featured=False)[:3]
    nir_projects = ResearchProject.objects.all()[:5]
    popular_terms = DictionaryEntry.objects.all()[:5]
    context = {
        'featured_news': featured_news,
        'latest_news': latest_news,
        'nir_projects': nir_projects,
        'popular_terms': popular_terms,
    }
    return render(request, 'core/index.html', context)


def news_list(request):
    news_qs = News.objects.filter(is_published=True)
    category = request.GET.get('category', '')
    if category:
        news_qs = news_qs.filter(category=category)
    context = {
        'news_list': news_qs,
        'categories': News.CATEGORY_CHOICES,
        'current_category': category,
    }
    return render(request, 'core/news_list.html', context)


def news_detail(request, pk):
    news = get_object_or_404(News, pk=pk, is_published=True)
    related = News.objects.filter(is_published=True, category=news.category).exclude(pk=pk)[:3]
    return render(request, 'core/news_detail.html', {'news': news, 'related': related})


def dictionary(request):
    form = DictionarySearchForm(request.GET or None)
    entries = DictionaryEntry.objects.none()
    query = ''
    if form.is_valid():
        query = form.cleaned_data.get('query', '').strip()
        if query:
            entries = DictionaryEntry.objects.filter(
                Q(term__icontains=query) | Q(definition__icontains=query)
            )
        else:
            entries = DictionaryEntry.objects.all()
    else:
        entries = DictionaryEntry.objects.all()

    popular = DictionaryEntry.objects.all()[:8]
    context = {
        'form': form,
        'entries': entries,
        'query': query,
        'popular': popular,
    }
    return render(request, 'core/dictionary.html', context)


def research_projects(request):
    status = request.GET.get('status', '')
    projects = ResearchProject.objects.all()
    if status:
        projects = projects.filter(status=status)
    context = {
        'projects': projects,
        'statuses': ResearchProject.STATUS_CHOICES,
        'current_status': status,
    }
    return render(request, 'core/research_projects.html', context)


def appeal(request):
    if request.method == 'POST':
        form = AppealForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, 'Ваше обращение принято. Мы свяжемся с вами в ближайшее время.')
            return redirect('appeal')
    else:
        form = AppealForm()
    return render(request, 'core/appeal.html', {'form': form})
