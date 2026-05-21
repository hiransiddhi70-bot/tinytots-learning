let stars = 0;
let level = 1;

/* LOGIN */
function startApp(){

  let name = document.getElementById("kidName").value;

  if(name=="") return alert("Enter Name");

  speak("Welcome " + name);

  document.getElementById("login").style.display="none";
  document.getElementById("app").style.display="block";

  playMusic();

  loadAlphabet();
  loadNumbers();

  showSection("alphabets");
}

/* MUSIC */
function playMusic(){
  document.getElementById("bgmusic").play();
}

/* SECTION */
function showSection(id){

  document.querySelectorAll(".section").forEach(s=>{
    s.classList.remove("active");
  });

  document.getElementById(id).classList.add("active");
}

/* SPEAK */
function speak(text){
  let msg = new SpeechSynthesisUtterance(text);
  speechSynthesis.speak(msg);
}

/* ALPHABET */
function loadAlphabet(){

  let box = document.getElementById("alphabetBox");

  let letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  for(let l of letters){

    let div = document.createElement("div");
    div.className="animal";
    div.innerHTML="🔤 "+l;

    div.onclick=()=>{
      speak(l + " for Apple");
      addStar();
    }

    box.appendChild(div);
  }
}

/* NUMBERS */
function loadNumbers(){

  let box = document.getElementById("numberBox");

  for(let i=1;i<=100;i++){

    let d = document.createElement("div");
    d.className="animal";
    d.innerHTML=i;

    d.onclick=()=>{
      speak(i.toString());
      addStar();
    }

    box.appendChild(d);
  }
}

/* ANIMALS */
function speak(text){
  let msg=new SpeechSynthesisUtterance(text);
  speechSynthesis.speak(msg);
}

/* ⭐ REWARD SYSTEM */
function addStar(){

  stars++;

  if(stars%10==0){
    level++;
    speak("Level Up!");
  }

  document.getElementById("status").innerText=
  "⭐ Stars: "+stars+" | 🏆 Level: "+level;
}

/* 🎈 BALLOON GAME */
function startBalloon(){

  let game=document.getElementById("gameArea");

  game.innerHTML="";

  for(let i=0;i<10;i++){

    let b=document.createElement("div");

    b.innerHTML="🎈";
    b.style.position="absolute";
    b.style.left=Math.random()*250+"px";
    b.style.top=Math.random()*250+"px";
    b.style.fontSize="40px";
    b.style.cursor="pointer";

    b.onclick=()=>{
      b.remove();
      speak("Pop");
      addStar();
    }

    game.appendChild(b);
  }
}

/* 🎮 MINI GAME */
let q=1;

setTimeout(()=>{
  document.getElementById("question").innerText="What is Apple?";
},1000);

function answer(n){

  if(n==1){
    speak("Correct");
    addStar();
  }else{
    speak("Try Again");
  }
}