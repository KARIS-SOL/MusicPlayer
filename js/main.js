//패널 돌리기
const frame = document.querySelector("section");
//돌리고싶은애들
const articleArr = frame.querySelectorAll("article");
//갯수 알려주기
const len = articleArr.length; //8
const deg = 360 / len;

console.log(articleArr);

for (let i = 0; i < len; i++) {
  articleArr[i].style.transform = `rotate(${deg * i}deg) translateY(-100vh)` 
  //뒷부분에 deg 써줘야함, 돌린후에 기준점 -100이동 
}
