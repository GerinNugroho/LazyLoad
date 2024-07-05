let bar = document.getElementById('bars');
let lazyList = document.getElementsByClassName('lazyLoad');
const navScroll = () => {
  let section = document.getElementsByClassName('section');
  let navBar = document.getElementById('navbar');
  var scroll = scrollY;
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
const scrollService = (function () {
  let container = document.getElementById('servicesContent');
  var check = false;
  function setup() {
    container.addEventListener('mousedown', condition.click);
    container.addEventListener('mousemove', condition.move);
    container.addEventListener('mouseup', condition.endMove);
    container.addEventListener('mouseleave', condition.endMove);
  }
  const condition = {
    click: function (evt) {
      evt.preventDefault();
      check = true;
    },
    move: function (evt) {
      if (check) {
        container.scrollLeft -= evt.movementX;
      }
    },
    endMove: function (evt) {
      check = false;
    },
  };
  return {
    start: function () {
      setup();
    },
  };
})();

const see = (function () {
  let button = document.getElementById('btnEye');
  let container = document.getElementById('contentSee');
  function setup() {
    button.addEventListener('click', condition);
  }

  function condition() {
    container.classList.add('see');
    button.classList.add('see');
  }
  return {
    start: function () {
      setup();
    },
  };
})();

const navbarMobile = () => {
  let barIcon = document.getElementById('bars').children[0];
  let container = document.getElementById('navbarMobile');
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
  function toPoint() {
    container.style.height = '0';
    if (barIcon.classList.contains('bi-x-lg')) {
      barIcon.classList.replace('bi-x-lg', 'bi-list');
    }
  }
};

const lasyLoad = (photo) => {
  var observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        var target = entry.target;
        var src = target.getAttribute('data-lazy');
        if (target.classList.contains('servicesItem')) {
          target.style.background = `url('${src}')`;
          target.style.backgroundSize = 'cover';
          target.style.backgroundPosition = 'center';
          target.style.backgroundRepeat = 'no-repeat';
        } else {
          target.classList.add('loaded');
        }
        observer.disconnect();
      }
    });
  });
  observer.observe(photo);
};
window.addEventListener('scroll', navScroll);
window.addEventListener('load', () => {
  [...lazyList].forEach(lasyLoad);
  see.start();
  scrollService.start();
  bar.addEventListener('click', navbarMobile);
});
