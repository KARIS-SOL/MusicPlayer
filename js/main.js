//패널 돌리기
const frame = document.querySelector("section");
//돌리고싶은애들
const articleArr = frame.querySelectorAll("article");
//갯수 알려주기
const len = articleArr.length; //8
const deg = 360 / len;

console.log(articleArr);

const names = ["cardio", "groove", "happy", "light", "lily", "limes", "pop", "swing"];

for (let i = 0; i < len; i++) {
  articleArr[i].style.transform = `rotate(${deg * i}deg) translateY(-100vh)` 
  //뒷부분에 deg 써줘야함, 돌린후에 기준점 -100이동 

  //사진 일괄적용
  const pic = articleArr[i].querySelector(".pic");
  pic.style.backgroundImage = `url("../img/${names[i]}.jpg")`;

  //음악 제목 일괄적용
  const title = articleArr[i].querySelector(".text>h2");
  title.innerHTML = `${names[i]}`;

  // 음악 태그 & 파일 일괄적용 
  const audio = document.createElement("audio");
  audio.setAttribute("src", `../music/${names[i]}.mp3`);
  audio.setAttribute("loop", "loop");
  articleArr[i].append(audio);
}

//Prev, Next 버튼 액션 처리

const prev = document.querySelector(".btnPrev");
const next = document.querySelector(".btnNext");

let num = 0;  // 회전 각도 조절용
let active = 0; // 활성화 패널 위치 기억용 


prev.addEventListener("click", function () {
  frame.style.transform = `rotate(${deg * ++num}deg)`;

  if (active === 0)  {
    active = len - 1;
  } else {
    --active;
  }

  for(let el of articleArr) {
    el.classList.remove("on");
    //버튼 누르면 현재 재생되던 노래 멈춤 
    // el.querySelector(".pic").classList.remove("on");
    // el.querySelector("audio").pause();
  };

  articleArr[active].classList.add("on");

 
});



next.addEventListener("click", function () {
  frame.style.transform = `rotate(${deg * --num}deg)`;

  if (active === len -1)  {
    active = 0;
  } else {
    active++;
  }

  for(let el of articleArr) {
    el.classList.remove("on");
    //버튼 누르면 현재 재생되던 노래 멈춤 
    // el.querySelector(".pic").classList.remove("on"); 
    // el.querySelector("audio").pause();
  };

  articleArr[active].classList.add("on");
});

// CD 모양 사진 회전 & 음악파일 컨트롤 

let before = 0; //이전패널위치 적용 


for(let el of articleArr) {
  const play = el.querySelector(".play");
  const pause = el.querySelector(".pause");
  const reload = el.querySelector(".reload");

  // // 가장 가까운 클래스를 찾아서 쓰는 법도 있음 - e target 이용해보기 
  // play.addEventListener("click", function (e) {
  //   e.target.closest("article").querySelector(".pic").classList.add("on");
  // }) 

  // pause.addEventListener("click", function (e) {
  //   e.target.closest("article").querySelector(".pic").classList.remove("on");
  // }) 

  
  //elements 사용해서도 써보기 ! - 조금더 깔끔함 

  play.addEventListener("click", function (e) {
    //동시재생되는거 멈추기 
    if (before ===0) { 
      before = e.target;
    } else if (before !== e.target) {
      before.closest("article").querySelector(".pic").classList.remove("on");
      before.closest("article").querySelector("audio").pause("");
      before = e.target;
    }

    
    el.querySelector(".pic").classList.add("on");
    el.querySelector("audio").play();
  }) 

  pause.addEventListener("click", function (e) {
    el.querySelector(".pic").classList.remove("on");
    el.querySelector("audio").pause();
        // e.target.closest("article").querySelector(".audio").pause();
  }) 

  reload.addEventListener("click", function (e) {
    //음악 동시재생 막기
    if (before ===0) { 
      before = e.target;
    } else if (before !== e.target) {
      before.closest("article").querySelector(".pic").classList.remove("on");
      before.closest("article").querySelector("audio").pause("");
      before = e.target;
    }

    el.querySelector(".pic").classList.add("on");
    el.querySelector("audio").load();
    el.querySelector("audio").play();
  })
}





