const imageObserver = new IntersectionObserver (entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    })
})

document.querySelectorAll('.image').forEach(image => {
    imageObserver.observe(image);
});


document.body.addEventListener('touchstart', () => {
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        if (!video.playing) video.play();
    });
})