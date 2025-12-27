import '../css/global.css'

document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Menu ---
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            const isHidden = mobileMenu.classList.toggle('hidden');
            mobileMenuBtn.querySelector('span').textContent = isHidden ? 'menu' : 'close';
        });

        // Close menu when clicking links
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                mobileMenuBtn.querySelector('span').textContent = 'menu';
            });
        });
    }

    // --- Consultation Modal ---
    const bookBtns = [
        document.getElementById('book-consultation-btn'),
        document.getElementById('hero-cta-btn'),
        document.getElementById('mobile-book-btn')
    ];
    const bookingModal = document.getElementById('booking-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const bookingForm = document.getElementById('booking-form');

    const toggleModal = (show) => {
        if (bookingModal) {
            bookingModal.classList.toggle('hidden', !show);
            if (show) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        }
    };

    bookBtns.forEach(btn => {
        if (btn) btn.addEventListener('click', () => toggleModal(true));
    });

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => toggleModal(false));
    }

    if (bookingModal) {
        bookingModal.addEventListener('click', (e) => {
            if (e.target === bookingModal) toggleModal(false);
        });
    }

    // --- Form Validation ---
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            const nameInput = bookingForm.querySelector('#name');
            const emailInput = bookingForm.querySelector('#email');

            if (!nameInput.value.trim()) {
                showError(nameInput, true);
                isValid = false;
            } else {
                showError(nameInput, false);
            }

            if (!validateEmail(emailInput.value)) {
                showError(emailInput, true);
                isValid = false;
            } else {
                showError(emailInput, false);
            }

            if (isValid) {
                const submitBtn = bookingForm.querySelector('button[type="submit"]');
                submitBtn.textContent = 'Processing...';
                submitBtn.disabled = true;

                setTimeout(() => {
                    alert('Thank you! Your consultation has been booked.');
                    toggleModal(false);
                    bookingForm.reset();
                    submitBtn.textContent = 'Confirm Booking';
                    submitBtn.disabled = false;
                }, 1500);
            }
        });
    }

    function showError(input, show) {
        const errorMsg = input.nextElementSibling;
        if (errorMsg && errorMsg.classList.contains('error-msg')) {
            errorMsg.classList.toggle('hidden', !show);
        }
        input.classList.toggle('border-red-500', show);
    }

    function validateEmail(email) {
<<<<<<< HEAD
        return /^[^s@]+@[^s@]+.[^s@]+$/.test(email);
=======
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
>>>>>>> be9d713 (feat: implement initial responsive landing page with interactive mobile menu, booking modal, and form validation using Tailwind CSS.)
    }
});
