const imageObserver = new IntersectionObserver (entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            entry.target.querySelector('video').play();
        }
    })
})

document.querySelectorAll('.image').forEach(image => {
    imageObserver.observe(image);
});