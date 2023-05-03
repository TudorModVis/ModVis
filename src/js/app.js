// -------- Accent Underline -------- //

const accents = document.querySelectorAll('.accent');

const accentObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        } else {
            entry.target.classList.remove('active');
        }
    })
});

accents.forEach(accent => accentObserver.observe(accent));
