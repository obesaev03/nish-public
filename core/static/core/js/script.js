/**
 * script.js — НИШ ИГСУ РАНХиГС
 * Функции:
 *  1. Плавная прокрутка по якорям
 *  2. Бургер-меню (мобильные)
 *  3. Имитация поиска по словарю
 *  4. Активный пункт меню при прокрутке
 */

/* ── 1. Плавная прокрутка по якорям ─────────────────────── */
function initSmoothScroll() {
  const HEADER_OFFSET = parseInt(
    getComputedStyle(document.documentElement).getPropertyValue('--header-h')
  ) || 72;

  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '#top') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      var target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      var targetTop = target.getBoundingClientRect().top + window.pageYOffset - HEADER_OFFSET - 16;

      window.scrollTo({ top: targetTop, behavior: 'smooth' });

      // Закрываем мобильное меню если открыто
      closeBurgerMenu();
    });
  });
}

/* ── 2. Бургер-меню ─────────────────────────────────────── */
var burgerBtn = document.getElementById('burger-btn');
var mainNav   = document.getElementById('main-nav'); /* теперь это .mainbar__nav */

function openBurgerMenu() {
  burgerBtn.classList.add('is-open');
  mainNav.classList.add('is-open');
  burgerBtn.setAttribute('aria-expanded', 'true');
  // Блокируем прокрутку страницы при открытом меню
  document.body.style.overflow = 'hidden';
}

function closeBurgerMenu() {
  burgerBtn.classList.remove('is-open');
  mainNav.classList.remove('is-open');
  burgerBtn.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

function initBurgerMenu() {
  if (!burgerBtn || !mainNav) return;

  burgerBtn.addEventListener('click', function () {
    var isOpen = burgerBtn.classList.contains('is-open');
    if (isOpen) {
      closeBurgerMenu();
    } else {
      openBurgerMenu();
    }
  });

  // Закрываем меню при клике вне него
  document.addEventListener('click', function (e) {
    if (
      mainNav.classList.contains('is-open') &&
      !mainNav.contains(e.target) &&
      !burgerBtn.contains(e.target)
    ) {
      closeBurgerMenu();
    }
  });

  // Закрываем меню при нажатии Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mainNav.classList.contains('is-open')) {
      closeBurgerMenu();
      burgerBtn.focus();
    }
  });

  // Закрываем меню при изменении размера окна (переход к десктопу)
  window.addEventListener('resize', function () {
    if (window.innerWidth > 768) {
      closeBurgerMenu();
    }
  });
}

/* ── 3. Имитация словаря (заглушка данных) ───────────────── */

// Небольшой словарь-заглушка для прототипа
var DICTIONARY_DATA = {
  'государственная служба': {
    term: 'Государственная служба',
    definition:
      'Профессиональная служебная деятельность граждан Российской Федерации по '
      + 'обеспечению исполнения полномочий федеральных государственных органов, '
      + 'государственных органов субъектов РФ, а также лиц, замещающих '
      + 'государственные должности.',
    source: 'Федеральный закон № 58-ФЗ «О системе государственной службы РФ»'
  },
  'чиновник': {
    term: 'Чиновник',
    definition:
      'Лицо, занимающее должность в органах государственной власти и '
      + 'осуществляющее функции государственного управления на профессиональной основе. '
      + 'В строгом юридическом смысле — государственный гражданский служащий.',
    source: 'Толковый словарь государственного управления ИГСУ, 2024'
  },
  'должностной регламент': {
    term: 'Должностной регламент',
    definition:
      'Документ, определяющий квалификационные требования к замещающему должность '
      + 'государственного служащего, права и обязанности, перечень вопросов, по которым '
      + 'он вправе принимать самостоятельные решения, а также показатели результативности.',
    source: 'Федеральный закон № 79-ФЗ «О государственной гражданской службе РФ»'
  },
  'реестр должностей': {
    term: 'Реестр должностей государственной гражданской службы',
    definition:
      'Перечень наименований должностей государственной гражданской службы, '
      + 'систематизированных по государственным органам, категориям, группам '
      + 'должностей и иным признакам. Утверждается Указом Президента РФ.',
    source: 'Указ Президента РФ № 1574 от 31.12.2005'
  },
  'конкурс': {
    term: 'Конкурс на замещение должности государственной службы',
    definition:
      'Процедура отбора претендентов на вакантную должность государственной '
      + 'гражданской службы на основе оценки профессионального уровня кандидатов, '
      + 'их соответствия установленным квалификационным требованиям.',
    source: 'Федеральный закон № 79-ФЗ, статья 22'
  },
  'конкурс на госслужбу': {
    term: 'Конкурс на замещение должности государственной службы',
    definition:
      'Процедура отбора претендентов на вакантную должность государственной '
      + 'гражданской службы на основе оценки профессионального уровня кандидатов, '
      + 'их соответствия установленным квалификационным требованиям.',
    source: 'Федеральный закон № 79-ФЗ, статья 22'
  },
  'государственная должность': {
    term: 'Государственная должность',
    definition:
      'Должность, устанавливаемая Конституцией РФ, федеральными законами для '
      + 'непосредственного исполнения полномочий федеральных государственных органов '
      + 'и государственных органов субъектов РФ.',
    source: 'Федеральный закон № 58-ФЗ «О системе государственной службы РФ»'
  }
};

function searchDictionary(query) {
  var q = query.trim().toLowerCase();
  if (!q) return null;

  // Прямое совпадение
  if (DICTIONARY_DATA[q]) return DICTIONARY_DATA[q];

  // Частичное совпадение
  var keys = Object.keys(DICTIONARY_DATA);
  for (var i = 0; i < keys.length; i++) {
    if (keys[i].indexOf(q) !== -1 || q.indexOf(keys[i]) !== -1) {
      return DICTIONARY_DATA[keys[i]];
    }
  }

  return null;
}

function renderDictResult(entry) {
  var resultEl = document.getElementById('dict-result');
  if (!resultEl) return;

  if (!entry) {
    resultEl.innerHTML =
      '<p class="dict-not-found">Термин не найден. Попробуйте другой запрос или откройте полный словарь.</p>';
    return;
  }

  resultEl.innerHTML =
    '<div class="dict-result-entry">' +
      '<p class="dict-result-entry__term">' + escapeHtml(entry.term) + '</p>' +
      '<p class="dict-result-entry__def">'  + escapeHtml(entry.definition) + '</p>' +
      '<p class="dict-result-entry__source">Источник: ' + escapeHtml(entry.source) + '</p>' +
    '</div>';
}

// Простая защита от XSS для прототипа
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function initDictionary() {
  var searchInput = document.getElementById('dict-search');
  var searchBtn   = document.getElementById('dict-search-btn');
  var tags        = document.querySelectorAll('.dict-tag');

  if (!searchInput || !searchBtn) return;

  // Поиск по кнопке
  searchBtn.addEventListener('click', function () {
    var entry = searchDictionary(searchInput.value);
    renderDictResult(entry);
  });

  // Поиск по Enter
  searchInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      var entry = searchDictionary(searchInput.value);
      renderDictResult(entry);
    }
  });

  // Клик по тегу-термину
  tags.forEach(function (tag) {
    tag.addEventListener('click', function () {
      var term = this.getAttribute('data-term');
      searchInput.value = term;
      var entry = searchDictionary(term);
      renderDictResult(entry);
      // Прокручиваем к результату
      setTimeout(function () {
        var resultEl = document.getElementById('dict-result');
        if (resultEl) {
          resultEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }, 100);
    });
  });
}

/* ── 4. Подсветка активного пункта меню при прокрутке ────── */
function initScrollSpy() {
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.mainbar__nav-link[href^="#"]');

  if (!sections.length || !navLinks.length) return;

  var OFFSET = 100;

  function updateActiveLink() {
    var scrollY = window.pageYOffset;
    var activeId = '';

    sections.forEach(function (section) {
      var sectionTop = section.offsetTop - OFFSET;
      if (scrollY >= sectionTop) {
        activeId = '#' + section.getAttribute('id');
      }
    });

    navLinks.forEach(function (link) {
      link.classList.remove('mainbar__nav-link--active');
      if (link.getAttribute('href') === activeId) {
        link.classList.add('mainbar__nav-link--active');
      }
    });
  }

  // Троттлинг для производительности
  var ticking = false;
  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        updateActiveLink();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  updateActiveLink();
}

/* ── Добавляем CSS для активного пункта меню динамически ─── */
function addActiveLinkStyle() {
  var style = document.createElement('style');
  style.textContent =
    '.mainbar__nav-link--active { color: var(--red) !important; }';
  document.head.appendChild(style);
}

/* ── Инициализация всех модулей ─────────────────────────── */
document.addEventListener('DOMContentLoaded', function () {
  addActiveLinkStyle();
  initSmoothScroll();
  initBurgerMenu();
  initDictionary();
  initScrollSpy();
});
