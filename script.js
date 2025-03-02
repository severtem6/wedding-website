let currentSlide = 0;
const images = document.querySelectorAll('.gallery-item img');
const modal = document.getElementById('photoModal');
const modalImg = document.getElementById('modalImage');

function openModal(index) {
    modal.style.display = 'block';
    currentSlide = index;
    showSlide(currentSlide);
}

function closeModal() {
    modal.style.display = 'none';
}

function changeSlide(direction) {
    currentSlide += direction;
    if (currentSlide >= images.length) {
        currentSlide = 0;
    }
    if (currentSlide < 0) {
        currentSlide = images.length - 1;
    }
    showSlide(currentSlide);
}

function showSlide(index) {
    modalImg.src = images[index].src;
}

// Закрытие модального окна при клике вне изображения
modal.addEventListener('click', function(event) {
    if (event.target === modal) {
        closeModal();
    }
});

// Управление с клавиатуры
document.addEventListener('keydown', function(event) {
    if (modal.style.display === 'block') {
        if (event.key === 'ArrowLeft') {
            changeSlide(-1);
        } else if (event.key === 'ArrowRight') {
            changeSlide(1);
        } else if (event.key === 'Escape') {
            closeModal();
        }
    }
});

// Карусель в галерее
const carousel = document.querySelector('.gallery-carousel');
const prevButton = carousel.querySelector('.prev');
const nextButton = carousel.querySelector('.next');
const galleryGrid = carousel.querySelector('.gallery-grid');
const items = galleryGrid.querySelectorAll('.gallery-item');

let currentIndex = 0;
const itemsPerView = window.innerWidth <= 768 ? 1 : 3;
const totalItems = items.length;

function updateCarousel() {
    const itemWidth = items[0].offsetWidth + 32; // 32px это gap (2rem)
    
    // Показываем только текущие и следующие элементы
    items.forEach((item, index) => {
        if (index >= currentIndex && index < currentIndex + itemsPerView) {
            item.style.display = 'block';
            item.classList.remove('hidden');
        } else {
            item.style.display = 'none';
            item.classList.add('hidden');
        }
    });

    // Обновляем видимость кнопок
    prevButton.style.opacity = currentIndex === 0 ? '0.5' : '1';
    nextButton.style.opacity = currentIndex >= totalItems - itemsPerView ? '0.5' : '1';
}

prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
    }
});

nextButton.addEventListener('click', () => {
    if (currentIndex < totalItems - itemsPerView) {
        currentIndex++;
        updateCarousel();
    }
});

// Обновляем карусель при изменении размера окна
window.addEventListener('resize', () => {
    currentIndex = 0;
    updateCarousel();
});

// Инициализация карусели
updateCarousel();

// Добавим плавную прокрутку для навигации
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        // Получаем высоту навигационной панели
        const navHeight = document.querySelector('nav').offsetHeight;
        
        // Вычисляем позицию элемента с учетом высоты навигации
        const targetPosition = targetSection.offsetTop - navHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    });
});

// Подсветка активного пункта меню при скролле
function updateActiveMenuItem() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const navHeight = document.querySelector('nav').offsetHeight;
        const scrollPosition = window.scrollY + navHeight + 100; // Добавляем небольшой отступ
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            const targetId = '#' + section.getAttribute('id');
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === targetId) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Обновляем активный пункт меню при скролле
window.addEventListener('scroll', updateActiveMenuItem);

let lastScrollTop = 0;
const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop) {
        // Скролл вниз
        nav.classList.remove('header-pin');
        nav.classList.add('header-unpin');
    } else {
        // Скролл вверх
        nav.classList.remove('header-unpin');
        nav.classList.add('header-pin');
    }
    
    lastScrollTop = scrollTop;
}); 