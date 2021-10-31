const prev_button = document.querySelector(".PREV");
const next_button = document.querySelector(".NEXT");
const body = document.body;
const disk = document.querySelectorAll(".disk");
const disk_inner = document.querySelectorAll(".disk_inner");
const album = document.querySelectorAll(".album");
const turntable = document.querySelectorAll(".album img:first-child");
const pointBtnAll = document.querySelectorAll(".pointWrap li");

let pageNum = 0;
let bgArray = [
  ["#d27753", "#d8c4c9", "#d59e8f"],
  ["#57c5c4", "#ffffff", "#a4dfdf"],
  ["#811c7d", "#d7d8d4", "#ad7caa"],
  ["#407ca1", "#b7bd99", "#7d9d9d"],
  ["#5989f5", "#dddbda", "#98b0e8"],
  ["#010101", "#fdde92", "#7c6d48"],
];

let totalNum = album.length;

prev_button.addEventListener("click", function () {
  if (pageNum > 0) {
    pageNum--;
  } else {
    pageNum = totalNum - 1;
  }
  pageChangeFunc();
});

next_button.addEventListener("click", function () {
  if (pageNum < totalNum - 1) {
    pageNum++;
  } else {
    pageNum = 0;
  }
  pageChangeFunc();
});

for (let i = 0; i < pointBtnAll.length; i++) {
  pointBtnAll[i].addEventListener("click", function () {
    pageNum = i;
    pageChangeFunc();
  });
}

window.onload = function () {
  if (mobileChk()) {
    body.addEventListener("touchstart", touchFunc, false);
    body.addEventListener("touchend", touchFunc, false);
  }

  // album.forEach((album, i) => {
  //   album.addEventListener("click", () => {
  //     disk[i].classList.toggle("mobileDisk");
  //     turntable[i].classList.toggle("mobileTurnTable");
  //   });
  // });

  let start_X = 0;
  let end_X = 0;

  function touchFunc(evt) {
    let type = null;
    let touch = null;

    switch (evt.type) {
      case "touchstart":
        type = "mousedown";
        touch = evt.changedTouches[0];
        start_X = touch.clientX;
        end_X = 0;
        break;
      case "touchend":
        type = "mouseup";
        touch = evt.changedTouches[0];
        end_X = touch.clientX;

        let chkNum = start_X - end_X;
        let chkNumAbs = Math.abs(chkNum);

        if (chkNumAbs > 100) {
          // //터치를 많이 했으면 실행
          if (chkNum < 0) {
            //왼쪽으로 터치
            if (pageNum > 0) {
              pageNum--;
            } else {
              pageNum = totalNum - 1;
            }
          } else {
            //오른쪽으로 터치
            if (pageNum < totalNum - 1) {
              pageNum++;
            } else {
              pageNum = 0;
            }
          }
          pageChangeFunc();
        }
        break;
    }
  }

  //최초실행
  pageChangeFunc();
};

function pageChangeFunc() {
  body.style.background =
    "linear-gradient(90deg," +
    bgArray[pageNum][0] +
    ", " +
    bgArray[pageNum][1] +
    ")";

  disk_inner[pageNum].style.background = bgArray[pageNum][2];
  disk[pageNum].style.backgroundImage = `url("./image/day6_${pageNum}.jpg")`;

  for (let i = 0; i < totalNum; i++) {
    if (pageNum == i) {
      //현재 컨텐츠(페이지)
      album[i].classList.add("active");
      pointBtnAll[i].classList.add("active");
      disk[i].classList.add("mobileDisk");
      turntable[i].classList.toggle("mobileTurnTable");
    } else {
      album[i].classList.remove("active");
      pointBtnAll[i].classList.remove("active");
      disk[i].classList.remove("mobileDisk");
      turntable[i].classList.remove("mobileTurnTable");
    }
  }
}

function mobileChk() {
  let mobileKeyWords = [
    "Android",
    "iPhone",
    "iPod",
    "BlackBerry",
    "Windows CE",
    "SAMSUNG",
    "LG",
    "MOT",
    "SonyEricsson",
  ];

  for (let info in mobileKeyWords) {
    if (navigator.userAgent.match(mobileKeyWords[info]) != null) {
      return true;
    }
  }
  return false;
}
