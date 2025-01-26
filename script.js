// Particles.js Konfigürasyonu
particlesJS("particles-js", {
    particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: "#0ff" },
        shape: { type: "circle" },
        opacity: {
            value: 0.5,
            random: false,
            animation: { enable: true, speed: 1, minimumValue: 0.1, sync: false }
        },
        size: {
            value: 3,
            random: true,
            animation: { enable: true, speed: 2, minimumValue: 0.1, sync: false }
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: "#0ff",
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 2,
            direction: "none",
            random: false,
            straight: false,
            outMode: "bounce",
            attract: { enable: false, rotateX: 600, rotateY: 1200 }
        }
    },
    interactivity: {
        detectOn: "canvas",
        events: {
            onHover: { enable: true, mode: "repulse" },
            onClick: { enable: true, mode: "push" },
            resize: true
        }
    },
    retina_detect: true
});

// Scroll Reveal
function reveal() {
    const reveals = document.querySelectorAll(".reveal");
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add("active");
        }
    });
}

window.addEventListener("scroll", reveal);

// İstatistik Sayaç Animasyonu
const stats = document.querySelectorAll('.stat-number');
stats.forEach(stat => {
    const target = parseInt(stat.getAttribute('data-target'));
    const increment = target / 100;
    
    function updateCounter() {
        const current = parseInt(stat.innerText);
        if (current < target) {
            stat.innerText = Math.ceil(current + increment);
            setTimeout(updateCounter, 20);
        }
    }
    
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            updateCounter();
        }
    });
    
    observer.observe(stat);
});

// Mobil Menü
const menuBtn = document.querySelector('.menu-btn');
const navMenu = document.querySelector('nav ul');

menuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuBtn.classList.toggle('active');
});

// Ödeme işlemleri
const paymentBtn = document.getElementById('paymentBtn');
const paymentModal = document.getElementById('paymentModal');
const confirmModal = document.getElementById('confirmModal');
const paymentDetailsModal = document.getElementById('paymentDetailsModal');
const paymentOptions = document.querySelectorAll('.payment-option');
const confirmYes = document.getElementById('confirmYes');
const confirmNo = document.getElementById('confirmNo');
let selectedPaymentMethod = '';

// Hemen Öde butonuna tıklandığında
paymentBtn.addEventListener('click', (e) => {
    e.preventDefault();
    paymentModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
});

// Ödeme seçeneklerine tıklandığında
paymentOptions.forEach(option => {
    option.addEventListener('click', () => {
        selectedPaymentMethod = option.dataset.method;
        paymentModal.style.display = 'none';
        confirmModal.style.display = 'block';
    });
});

// Onay butonları
confirmYes.addEventListener('click', () => {
    confirmModal.style.display = 'none';
    paymentDetailsModal.style.display = 'block';
    
    // İlgili ödeme detayını göster
    document.querySelectorAll('.payment-detail-content').forEach(content => {
        content.style.display = 'none';
    });
    document.getElementById(`${selectedPaymentMethod}Details`).style.display = 'block';
});

confirmNo.addEventListener('click', () => {
    confirmModal.style.display = 'none';
    paymentModal.style.display = 'block';
});

// Kopyalama işlevi
document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const input = btn.previousElementSibling;
        input.select();
        document.execCommand('copy');
        
        // Kopyalandı bildirimi
        const originalText = btn.textContent;
        btn.textContent = 'Kopyalandı!';
        setTimeout(() => {
            btn.textContent = originalText;
        }, 2000);
    });
});

// Modal Kontrolü
const urunModal = document.getElementById('urunModal');
const urunModalBtn = document.getElementById('urunModal-btn');
const closeButtons = document.querySelectorAll('.close-modal');

// Ürün modal butonuna tıklandığında
urunModalBtn.addEventListener('click', () => {
    urunModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
});

// Tüm close butonları için kapatma işlevi
closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        urunModal.style.display = 'none';
        paymentModal.style.display = 'none';
        confirmModal.style.display = 'none';
        paymentDetailsModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
});

// Modal dışına tıklandığında
window.addEventListener('click', (e) => {
    if (e.target === urunModal) {
        urunModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Escape tuşu ile modalı kapatma
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        urunModal.style.display = 'none';
        paymentModal.style.display = 'none';
        confirmModal.style.display = 'none';
        paymentDetailsModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});