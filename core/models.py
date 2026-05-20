from django.db import models
from django.utils import timezone


class News(models.Model):
    CATEGORY_CHOICES = [
        ('conference', 'Конференция'),
        ('publication', 'Публикация'),
        ('seminar', 'Семинар'),
        ('grant', 'Грант'),
        ('announcement', 'Анонс'),
        ('other', 'Другое'),
    ]

    title = models.CharField('Заголовок', max_length=300)
    category = models.CharField('Категория', max_length=30, choices=CATEGORY_CHOICES, default='other')
    excerpt = models.TextField('Краткое описание', max_length=500)
    content = models.TextField('Полный текст')
    image = models.ImageField('Изображение', upload_to='news/', blank=True, null=True)
    published_at = models.DateTimeField('Дата публикации', default=timezone.now)
    is_published = models.BooleanField('Опубликовано', default=True)
    is_featured = models.BooleanField('Главная новость', default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Новость'
        verbose_name_plural = 'Новости'
        ordering = ['-published_at']

    def __str__(self):
        return self.title


class DictionaryEntry(models.Model):
    term = models.CharField('Термин', max_length=200, unique=True)
    definition = models.TextField('Определение')
    source = models.CharField('Источник', max_length=300, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Запись словаря'
        verbose_name_plural = 'Словарь государственной службы'
        ordering = ['term']

    def __str__(self):
        return self.term


class ResearchProject(models.Model):
    STATUS_CHOICES = [
        ('open', 'Открыт'),
        ('review', 'На рассмотрении'),
        ('closed', 'Закрыт'),
    ]

    customer = models.CharField('Заказчик', max_length=200)
    title = models.CharField('Тема НИР', max_length=400)
    description = models.TextField('Описание', blank=True)
    deadline = models.DateField('Срок подачи')
    status = models.CharField('Статус', max_length=10, choices=STATUS_CHOICES, default='open')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Запрос по НИР'
        verbose_name_plural = 'Интегратор НИР'
        ordering = ['deadline']

    def __str__(self):
        return f'{self.customer} — {self.title[:60]}'


class Appeal(models.Model):
    SUBJECT_CHOICES = [
        ('consultation', 'Консультация'),
        ('partnership', 'Партнёрство'),
        ('nir', 'Запрос по НИР'),
        ('other', 'Другое'),
    ]

    name = models.CharField('Имя', max_length=150)
    email = models.EmailField('Email')
    phone = models.CharField('Телефон', max_length=20, blank=True)
    subject = models.CharField('Тема', max_length=20, choices=SUBJECT_CHOICES, default='other')
    message = models.TextField('Сообщение')
    created_at = models.DateTimeField(auto_now_add=True)
    is_processed = models.BooleanField('Обработано', default=False)

    class Meta:
        verbose_name = 'Обращение'
        verbose_name_plural = 'Обращения'
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.name} ({self.email}) — {self.get_subject_display()}'
