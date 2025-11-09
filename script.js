// const { forEach } = require("lodash");

const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.left_btn');
const nextBtn = document.querySelector('.right_btn');
let currentIndex = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove('slide-active');
  });
  slides[index].classList.add('slide-active');

  dots.forEach((dot, i) => {
    dot.classList.remove('dot-active');
    if (i === index) {
      dot.classList.add('dot-active');
    }
  });
  const activeslide = slides[index];
  const contentelement = activeslide.querySelectorAll('.slide-content > *');
  contentelement.forEach((el, i) => {
    el.classList.remove('fade-up');
    void el.offsetWidth;
    setTimeout(() => {
      el.classList.add('fade-up');
    }, i * 300);

  });
  const contentel = activeslide.querySelectorAll('.rounded-contener');
  contentel.forEach((el, i) => {
    el.classList.remove('rounded');
    void el.offsetWidth;
    setTimeout(() => {
      el.classList.add('rounded');
    }, (contentelement.length * 300 - 300) + i * 300);
  })


}
showSlide(currentIndex);

function nextSlide() {
  currentIndex++;
  if (currentIndex >= slides.length) currentIndex = 0;
  showSlide(currentIndex);
}
function prevSlide() {
  currentIndex--;
  if (currentIndex < 0) currentIndex = slides.length - 1;
  showSlide(currentIndex);
}
nextBtn.addEventListener('click', () => { nextSlide(); resetTimer(); });
prevBtn.addEventListener('click', () => { prevSlide(); resetTimer(); });

dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    currentIndex = i;
    showSlide(currentIndex);
    resetTimer();
  });
});

let timer = setInterval(nextSlide, 5000);

function resetTimer() {
  clearInterval(timer);
  timer = setInterval(nextSlide, 5000);
}





///////////////////////
const swiper = new Swiper('.mySwiper', {
      speed:1000,
      loop: true,
      spaceBetween: 20,
      slidesPerView: 3,
      centeredSlides: false,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      breakpoints: {
        0: { slidesPerView: 1 },
        640: { slidesPerView: 2 },
        1280: { slidesPerView: 3 },

      }
    });

    
//////////////////////////////

const totalSeconds = 30 * 24 * 60 * 60;
    const endTime = new Date().getTime() + totalSeconds * 1000;

    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");

    function updateCountdown() {
      const now = new Date().getTime();
      const distance = endTime - now;

      if (distance <= 0) {
        daysEl.textContent = "0";
        hoursEl.textContent = "00";
        minutesEl.textContent = "00";
        secondsEl.textContent = "00";
        clearInterval(interval);
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      daysEl.textContent = days;
      hoursEl.textContent = hours.toString().padStart(2, '0');
      minutesEl.textContent = minutes.toString().padStart(2, '0');
      secondsEl.textContent = seconds.toString().padStart(2, '0');
    }

    const interval = setInterval(updateCountdown, 1000);
    updateCountdown();





    /////////////////////////

    const swiper1 = new Swiper('.mySwiper1', {
      speed:1000,
      loop: true,
      spaceBetween: 50,
      slidesPerView: 3,
      centeredSlides: false,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      breakpoints: {
        0: { slidesPerView: 2, spaceBetween:20},
        640:{ slidesPerView: 3, spaceBetween:20},
        769: { slidesPerView: 5, spaceBetween:20},
        1024:{slidesPerView: 5,spaceBetween:20},
        1100:{slidesPerView: 5,spaceBetween:50}
      }
    });



    //////////////////////


function changeLanguage(lang) {
  const translations = {
    English: {
      description: "login",
      q1:"All Categories",
      q2:"What do you need?",
    },
    العربية: {
      description: "تسجيل الدخول",
      q1:"كل الفئات",
      q2:"ماذا تحتاج؟",
    },
  };

  // غيّر نصوص الصفحة
   document.getElementById("q1").textContent = translations[lang].q1;
   document.getElementById("q2").placeholder = translations[lang].q2;
  document.getElementById("description").textContent = translations[lang].description;

  // لو بدك تغيّر اتجاه الصفحة للعربية
  // document.documentElement.dir = lang === "العربية" ? "rtl" : "ltr";
}

//////////////////////////
const btn = document.getElementById('dropdownBtn');
    const menu = document.getElementById('dropdownMenu');
    const selectedLang = document.getElementById('selectedLang');
    const arrow = btn.querySelector('svg');

    // فتح/إغلاق القائمة
    btn.addEventListener('click', () => {
      const isOpen = menu.classList.contains('scale-y-100');
      if (isOpen) {
        menu.classList.replace('scale-y-100', 'scale-y-0');
        menu.classList.replace('opacity-100', 'opacity-0');
        arrow.classList.remove('rotate-180');
      } else {
        menu.classList.replace('scale-y-0', 'scale-y-100');
        menu.classList.replace('opacity-0', 'opacity-100');
        arrow.classList.add('rotate-180');
      }
    });

    // تغيير اللغة عند الضغط
    menu.querySelectorAll('.b').forEach(btnLang => {
      btnLang.addEventListener('click', () => {
        const selected=btnLang.dataset.lang;
        selectedLang.textContent = selected;
        changeLanguage(selected);
        // إغلاق القائمة بعد الاختيار
        menu.classList.replace('scale-y-100', 'scale-y-0');
        menu.classList.replace('opacity-100', 'opacity-0');
        arrow.classList.remove('rotate-180');
      });
    });

    // إغلاق عند النقر خارجها
    window.addEventListener('click', (e) => {
      if (!btn.contains(e.target) && !menu.contains(e.target)) {
        menu.classList.replace('scale-y-100', 'scale-y-0');
        menu.classList.replace('opacity-100', 'opacity-0');
        arrow.classList.remove('rotate-180');
      }
    });