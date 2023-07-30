const service = document.querySelector('section');
const wrapper = service.querySelector('.wrapper');

function moveWrapper() {
    if (service.getBoundingClientRect().bottom < window.innerHeight) return;

    footer.classList.remove('active');
    let prog = service.getBoundingClientRect().top * -1 / (service.clientHeight + window.innerHeight) * 1.12;
    wrapper.style.transform = 'translateY(' + prog * 100 + '%)';
}

window.addEventListener('scroll', moveWrapper);


const contactButtons = document.querySelectorAll('.contact-button');

contactButtons.forEach(butotn => {
    butotn.addEventListener('mouseover', () => {
        cursor.classList.add('active');
        cursor.querySelector('img').classList.add('active');
    });
    butotn.addEventListener('mouseout', () => {
        cursor.classList.remove('active');
        cursor.querySelector('img').classList.remove('active');
    });
});

/* -------- Footer -------- */

function footerScroll () {
    if (window.scrollY >= document.body.clientHeight - (window.innerHeight + 20)) {
        setTimeout(() => {
            footer.classList.add('active');
        }, 300);
    }
}

window.addEventListener('scroll', footerScroll);