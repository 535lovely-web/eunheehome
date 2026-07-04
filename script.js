// 모바일 메뉴 토글
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');

navToggle.addEventListener('click', () => {
  mainNav.classList.toggle('is-open');
});

// 메뉴 클릭 시 부드럽게 스크롤 이동 + 모바일 메뉴 닫기
document.querySelectorAll('.nav-link, .header-cta').forEach(link => {
  link.addEventListener('click', (e) => {
    const targetId = link.getAttribute('href');
    if (!targetId || !targetId.startsWith('#')) return;
    const target = document.querySelector(targetId);
    if (!target) return;
    e.preventDefault();
    const headerHeight = document.getElementById('siteHeader').offsetHeight;
    const top = target.getBoundingClientRect().top + window.scrollY - headerHeight + 1;
    window.scrollTo({ top, behavior: 'smooth' });
    mainNav.classList.remove('is-open');
  });
});

// 히어로 슬라이드 자동 전환
const slides = document.querySelectorAll('#heroSlides .hero-slide');
const dotsWrap = document.getElementById('heroDots');
let currentSlide = 0;
let slideTimer;

slides.forEach((_, i) => {
  const dot = document.createElement('span');
  if (i === 0) dot.classList.add('is-active');
  dot.addEventListener('click', () => goToSlide(i));
  dotsWrap.appendChild(dot);
});

function goToSlide(index) {
  slides[currentSlide].classList.remove('is-active');
  dotsWrap.children[currentSlide].classList.remove('is-active');
  currentSlide = index;
  slides[currentSlide].classList.add('is-active');
  dotsWrap.children[currentSlide].classList.add('is-active');
  resetTimer();
}

function nextSlide() {
  goToSlide((currentSlide + 1) % slides.length);
}

function resetTimer() {
  clearInterval(slideTimer);
  slideTimer = setInterval(nextSlide, 5000);
}

resetTimer();
