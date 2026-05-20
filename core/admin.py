from django.contrib import admin
from .models import News, DictionaryEntry, ResearchProject, Appeal


@admin.register(News)
class NewsAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'published_at', 'is_published', 'is_featured')
    list_filter = ('category', 'is_published', 'is_featured')
    search_fields = ('title', 'excerpt', 'content')
    list_editable = ('is_published', 'is_featured')
    date_hierarchy = 'published_at'
    ordering = ('-published_at',)


@admin.register(DictionaryEntry)
class DictionaryEntryAdmin(admin.ModelAdmin):
    list_display = ('term', 'source', 'created_at')
    search_fields = ('term', 'definition', 'source')
    ordering = ('term',)


@admin.register(ResearchProject)
class ResearchProjectAdmin(admin.ModelAdmin):
    list_display = ('customer', 'title', 'deadline', 'status')
    list_filter = ('status',)
    search_fields = ('customer', 'title', 'description')
    list_editable = ('status',)
    ordering = ('deadline',)


@admin.register(Appeal)
class AppealAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'subject', 'created_at', 'is_processed')
    list_filter = ('subject', 'is_processed')
    search_fields = ('name', 'email', 'message')
    list_editable = ('is_processed',)
    readonly_fields = ('created_at',)
