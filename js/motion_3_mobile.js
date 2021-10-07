var prev_button, next_button;
var contentWrap;
var disk_inner;
var pageNum = 0;
var totalNum = 0;
var album;
var pointBtnAll;
var lyrics;
var bgArray = new Array();
bgArray[0] = ["#d27753", "#d8c4c9", "#d59e8f"];
bgArray[1] = ["#57c5c4", "#ffffff", "#a4dfdf"];
bgArray[2] = ["#811c7d", "#d7d8d4", "#ad7caa"];
bgArray[3] = ["#407ca1", "#b7bd99", "#7d9d9d"];
bgArray[4] = ["#5989f5", "#dddbda", "#98b0e8"];
bgArray[5] = ["#010101", "#fdde92", "#7c6d48"];

function showPopup() {
  window.open(
    "page/" + [pageNum] + ".html",
    "music",
    "width=375, height=500,left=100,top=50"
  );
}

window.onload = function () {
  prev_button = document.querySelector(".PREV");
  next_button = document.querySelector(".NEXT");

  contentWrap = document.querySelector(".contentWrap");
  disk_inner = document.querySelectorAll(".disk_inner");
  album = document.querySelectorAll(".album");
  pointBtnAll = document.querySelectorAll(".pointWrap li");
  totalNum = album.length;

  lyrics = document.querySelectorAll(".lyrics");

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

  for (var i = 0; i < pointBtnAll.length; i++) {
    (function (idx) {
      pointBtnAll[idx].onclick = function () {
        // alert(idx);
        pageNum = idx;
        pageChangeFunc();
      };
    })(i);
  }

  if (mobileChk()) {
    contentWrap.addEventListener("touchstart", touchFunc, false);
    // contentWrap.addEventListener("touchmove", touchFunc, false);
    contentWrap.addEventListener("touchend", touchFunc, false);
  }

  var start_X = 0;
  var end_X = 0;

  function touchFunc(evt) {
    var type = null;
    var touch = null;

    switch (evt.type) {
      case "touchstart":
        type = "mousedown";
        touch = evt.changedTouches[0];
        start_X = touch.clientX;
        end_X = 0;
        break;
      // case "touchmove":
      //     type = "mousemove";
      //     touch = evt.changedTouches[0];
      //     console.log(touch)
      // break;
      case "touchend":
        type = "mouseup";
        touch = evt.changedTouches[0];
        end_X = touch.clientX;

        var chkNum = start_X - end_X;
        var chkNumAbs = Math.abs(chkNum);

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

//여기서 모든 것을 한다.
function pageChangeFunc() {
  contentWrap.style.background =
    "linear-gradient(120deg," +
    bgArray[pageNum][0] +
    ", " +
    bgArray[pageNum][1] +
    ")";

  for (var i = 0; i < totalNum; i++) {
    if (pageNum == i) {
      //현재 컨텐츠(페이지)
      album[i].classList.add("active");
      pointBtnAll[i].classList.add("active");
    } else {
      album[i].classList.remove("active");
      pointBtnAll[i].classList.remove("active");
    }
  }

  disk_inner[pageNum].style.background = bgArray[pageNum][2];
  lyrics[pageNum].style.background = bgArray[pageNum][2];
}

function mobileChk() {
  var mobileKeyWords = new Array(
    "Android",
    "iPhone",
    "iPod",
    "BlackBerry",
    "Windows CE",
    "SAMSUNG",
    "LG",
    "MOT",
    "SonyEricsson"
  );
  for (var info in mobileKeyWords) {
    if (navigator.userAgent.match(mobileKeyWords[info]) != null) {
      return true;
    }
  }
  return false;
}
