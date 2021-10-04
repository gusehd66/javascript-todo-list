const menuHeader = document.querySelector(".menu__header");
const headerBtn = document.querySelector(".menu__header__btn ");
const headerText = document.querySelector(".menu__header__text");
const menuHome = document.querySelector(".menu-home");
const menuTodo = document.querySelector(".menu-todo");
const menuMovie = document.querySelector(".menu-movie");
const menuScene = document.querySelector(".menu-scene");
const menuIllust = document.querySelector(".menu-illust");
const menuVertical = document.querySelector(".menu__vertical");

menuHeader.addEventListener("click", onClickMenuHeader);

let clicked = false;
let duration = 0;

function onClickMenuHeader(event) {
  const orderMenu = [
    menuVertical,
    menuHome,
    menuTodo,
    menuMovie,
    menuScene,
    menuIllust,
  ];

  const key = event.target.dataset.key;
  if (key === undefined) {
    return;
  } else {
    if (!clicked) {
      changeHeader("down");
      orderMenu.forEach((menu) => menuDown(menu));
      clicked = true;
    } else {
      changeHeader("up");
      orderMenu.forEach((menu) => menuUp(menu));
      clicked = false;
    }
  }
}

function menuUp(item) {
  item.style.opacity = "0";
  item.style.transitionDelay = `${duration}ms`;
  duration -= 80;
}

function menuDown(item) {
  item.style.opacity = `1`;
  item.style.transitionDelay = `${duration}ms`;
  duration += 80;
}

function changeHeader(text) {
  if (text === "down") {
    headerBtn.innerHTML = `<i class="fas fa-times" data-key="header-icon" data-value="scroll" ></i>`;
    headerText.innerText = `Close`;
  } else {
    headerBtn.innerHTML = `<i class="fas fa-bars" data-key="header-icon" data-value="scroll" ></i>`;
    headerText.innerText = `Menu`;
  }
}
