// -------- Portfolio Cards -------- //

const works = document.querySelectorAll('#portfolio .work');

function openCard(event) {
    if (window.innerWidth < 1024) return;

    const work = event.target;

    const site = work.querySelector('.site');
    const info = work.querySelector('.info');
    const title = work.querySelector('.title');
    const background = work.querySelector('.background');

    title.classList.add('open');
    work.classList.add('open');
    info.classList.add('open');
    site.classList.add('open');
    background.classList.add('open');
    site.style.top = info.offsetHeight + 'px';
}

function closeCard(event) {
    if (window.innerWidth < 1024) return;
    const work = event.target;

    const site = work.querySelector('.site');
    const info = work.querySelector('.info');
    const title = work.querySelector('.title');
    const background = work.querySelector('.background');

    title.classList.remove('open');
    work.classList.remove('open');
    site.classList.remove('open');
    site.style.top = 0;
    info.classList.remove('open');
    background.classList.remove('open');
}

const phoneCard =  document.querySelector('#portfolio .phone-card');
const wrapper = document.querySelector('#portfolio .wrapper');

function clickCard(event) {
    if (window.innerWidth >= 1024) return;

    const title = phoneCard.querySelector('h3');
    const description = phoneCard.querySelector('p');
    const image = phoneCard.querySelector('.phone-site');

    let card = event.target.parentNode;
    if (card.classList.contains('title')) card = card.parentNode;

    const cardTitle = card.querySelector('.info h3');
    const cardDescription = card.querySelector('.info p');
    const cardImage = card.querySelector('.site');

    title.textContent = cardTitle.textContent;
    description.textContent = cardDescription.textContent;
    image.src = cardImage.src;

    phoneCard.classList.add('open');
    wrapper.style.height = phoneCard.offsetHeight + 'px';
    window.scrollTo(top);
}

function exitCard() {
    wrapper.style.height = 'auto';
    phoneCard.classList.remove('open');
}

works.forEach(work => {
    work.addEventListener('mouseenter', openCard);
    work.addEventListener('mouseleave', closeCard);
    work.addEventListener('click', clickCard);
});

const exitButton = phoneCard.querySelector('#close');
exitButton.addEventListener('click', exitCard);


function dragCard() {
    if (phoneCard.getBoundingClientRect().top > 100) {
        wrapper.style.height = 'auto';
        phoneCard.classList.remove('open');
    }
}

phoneCard.addEventListener('touchstart', () => {})
phoneCard.addEventListener('touchend', dragCard)


// -------- Portfolio Cursour -------- //
const cursour = document.querySelector('.cursour');

function moveCursour(event) {
    const work = event.target.getBoundingClientRect();
    cursour.style.left = work.left + event.offsetX + window.scrollX - cursour.offsetWidth / 2 + 'px';
    cursour.style.top = work.top + event.offsetY + window.scrollY - cursour.offsetHeight / 2 + 'px';
}

function enterCursour() {
    cursour.classList.add('active');
}

function exitCursour() {
    cursour.classList.remove('active');
}

works.forEach(work => {
    work.addEventListener('mousemove', moveCursour);
    work.addEventListener('mouseenter', enterCursour);
    work.addEventListener('mouseleave', exitCursour);
});