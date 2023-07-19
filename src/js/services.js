const service = document.querySelector('section');
const wrapper = service.querySelector('.wrapper');

function moveWrapper() {
    let prog = service.getBoundingClientRect().top * -1 / service.clientHeight;
    wrapper.style.transform = 'translateY(' + prog * 100 + '%)';
}

window.addEventListener('scroll', moveWrapper);