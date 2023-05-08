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

// accents.forEach(accent => accentObserver.observe(accent));

// const colors = ['#F74264', '#F54264', '#F12D5C', '#F54298'];
// let index = 0;

// function changeColor(event) {
//     const accent = event.target;
//     if (index == colors.length) index = 0;
//     accent.style.setProperty('--color', colors[index])
//     index++;
// }

// accents.forEach(accent => {
//     accent.addEventListener('mouseenter', changeColor)
// });
