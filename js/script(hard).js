const services = document.getElementById('servicesContent');
const buttonEye = document.getElementById('btnEye');
const contentSee = document.getElementById('contentSee');
const bar = document.getElementById('bars');
const container = document.getElementById('navbarMobile');
let CHECK;
const navScroll = () => {
  const section = document.getElementsByClassName('section');
  const navBar = document.getElementById('navbar');
  const scroll = scrollY;
  [...section].forEach((element) => {
    const top = element.offsetTop;
    const pointOff = section[0].offsetHeight;
    if (scroll > top && scroll < pointOff) {
      navBar.classList.remove('show');
    } else if (scroll > top) {
      navBar.classList.add('show');
    }
  });
};

const start = (evt) => {
  evt.preventDefault();
  CHECK = 'start';
};

const over = (evt) => {
  if (CHECK == 'start') {
    services.scrollLeft -= evt.movementX;
  }
};

const end = () => {
  CHECK = 'end';
};

const see = () => {
  contentSee.classList.add('see');
  buttonEye.classList.add('see');
};

const navbarMobile = () => {
  const barIcon = document.getElementById('bars').children[0];
  if (barIcon.classList.contains('bi-list')) {
    barIcon.classList.replace('bi-list', 'bi-x-lg');
    container.style.height = '100vh';
  } else {
    barIcon.classList.replace('bi-x-lg', 'bi-list');
    container.style.height = '0';
  }
  container.addEventListener('transitionend', () => {
    [...container.children].forEach((element) => {
      if (container.clientHeight == 0) {
        element.style.opacity = '0';
      } else {
        element.onclick = toPoint;
        element.style.opacity = '1';
      }
    });
  });
};

const toPoint = () => {
  const barIcon = document.getElementById('bars').children[0];
  container.style.height = '0';
  if (barIcon.classList.contains('bi-x-lg')) {
    barIcon.classList.replace('bi-x-lg', 'bi-list');
  }
};

window.addEventListener('scroll', navScroll);
services.addEventListener('mousedown', start);
services.addEventListener('mousemove', over);
services.addEventListener('mouseup', end);
services.addEventListener('mouseleave', end);
buttonEye.addEventListener('click', see);
bar.addEventListener('click', navbarMobile);
