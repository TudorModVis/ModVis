const service = document.querySelector('section');
const wrapper = service.querySelector('.wrapper');

function moveWrapper() {
    let prog = service.getBoundingClientRect().top * -1 / service.clientHeight;

    // let text = document.querySelector('#test').getBoundingClientRect().bottom;
    // if (text == window.innerHeight) {
    //     console.log(prog);
    // }

    wrapper.style.transform = 'translateY(' + prog * 100 + '%)';

}

window.addEventListener('scroll', moveWrapper);