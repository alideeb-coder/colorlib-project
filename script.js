let cart = {}; // { productId : {title, price, img, qty} }

let addButtons = document.querySelectorAll('.add-to-cart');
let cartItems = document.getElementById('cart-items');
let cartTotalCount = document.getElementById('cart-total-count');
let cartTotalPrice = document.querySelectorAll('.cart-total-price');
// إضافة منتج
addButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const product = btn.closest('.product');
        
        const id = product.dataset.id;
        const title = product.dataset.title;
        const price = Number(product.dataset.price);
        const img = product.dataset.img;

        // لو المنتج موجود → زيد الكمية فقط
        if (cart[id]) {
            cart[id].qty++;
        } else {
            cart[id] = { title, price, img, qty: 1 };
        }
        updateCartUI();
    });
});

// تحديث واجهة السلة
function updateCartUI() {
    cartItems.innerHTML = "";
    let totalPrice = 0;
    let totalCount = 0;

    for (let id in cart) {
        const p = cart[id];
        totalPrice += p.price * p.qty;
        totalCount += p.qty;

        cartItems.innerHTML += 
            `<div class="flex items-center gap-3 pb-2 border-b relative " data-id="${id}">
                <img src="${p.img}" class="w-14 h-14 rounded">
                <div>
                    <p class="text-[20px] text-yellow-500">${p.price}<span>.00</span>$ × ${p.qty}</p>
                    <p class=" text-[18px]">${p.title}</p>
                </div>
                <button  class="ti-close text-[17px] absolute end-3 top-5 cursor-pointer close p-[6px] rounded-xl transition-all duration-300
                hover:bg-slate-400"></button>
            </div>`
        ;
    }

    cartTotalCount.textContent = totalCount;
    cartTotalPrice.forEach(i=>{
      i.textContent=totalPrice
});
}

// حذف منتج من السلة عند الضغط على زر الإغلاق
cartItems.addEventListener('click', (event) => {
    if (event.target.classList.contains('close')) {
        // العنصر الأب الذي يحتوي معلومات المنتج
        const productDiv = event.target.closest('.flex.items-center');
        
        // نحدد الـ id من صورة أو div (مطلوب إضافة data-id عند إنشاء العناصر في updateCartUI)
        const id = productDiv.dataset.id;

        if (id && cart[id]) {
            delete cart[id]; // حذف المنتج من الكائن
            updateCartUI(); // تحديث واجهة السلة
        }
    }
});


const cartIcon = document.querySelector(".cart");
const addBtns = document.querySelectorAll(".add-to-cart");

// انفجار بسيط حول زر الشراء
function createExplosion(x, y) {
  for (let i = 0; i < 8; i++) {
    const spark = document.createElement("div");
    spark.className = "explosion";

    // اتجاه عشوائي
    const angle = Math.random() * Math.PI * 2;
    const dist = 40 + Math.random() * 30;

   ` spark.style.setProperty("--x", ${Math.cos(angle) * dist}px)`;
   ` spark.style.setProperty("--y", ${Math.sin(angle) * dist}px)`;

    spark.style.left = x + "px";
    spark.style.top = y + "px";

    document.body.appendChild(spark);

    spark.addEventListener("animationend", () => spark.remove());
  }
}

// طيران المنتج نحو السلة
function flyToCart(startRect, endRect, imgSrc) {
  const img = document.createElement("img");
  img.src = imgSrc;
  img.className = "fly-img";

  img.style.left = startRect.left + "px";
  img.style.top = startRect.top + "px";

  document.body.appendChild(img);

  requestAnimationFrame(() => {
    img.style.transform = 
     ` translate(${endRect.left - startRect.left}px, 
                ${endRect.top - startRect.top}px)
      scale(0.2)
      rotate(360deg)`
    ;
    img.style.opacity = "0";
  });

  img.addEventListener("transitionend", () => {
  img.remove();

    // وميض عند السلة
    const flash = document.createElement("div");
    flash.className = "cart-flash";
    flash.style.left = endRect.left + "px";
    flash.style.top = endRect.top + "px";

    document.body.appendChild(flash);

    flash.addEventListener("animationend", () => flash.remove());
  });
}

// تشغيل الحركة عند الضغط
addBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const product = btn.closest(".product");

    // اهتزاز الزر
    btn.classList.add("shake");
    setTimeout(() => btn.classList.remove("shake"), 400);

    // انفجار حول الزر
    const b = btn.getBoundingClientRect();
    createExplosion(b.left + b.width / 2, b.top + b.height / 2);

    // حركة الطيران
    const imgSrc = product.dataset.img;
    const startRect = btn.getBoundingClientRect();
    const endRect = cartIcon.getBoundingClientRect();

    flyToCart(startRect, endRect, imgSrc);
  });
});

////////////////////////////
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
        showSlide(currentIndex);
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