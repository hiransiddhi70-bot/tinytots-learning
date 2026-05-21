let currentColor = "black";
let brush = 5;

function startApp(){

  let name = document.getElementById("kidName").value;

  if(name==""){
    alert("Enter name!");
    return;
  }

  speak("Welcome " + name);

  document.getElementById("login").style.display = "none";
  document.getElementById("app").style.display = "block";

  showSection("alphabets");
}

/* SECTION SWITCH */
function showSection(id){

  let all = document.querySelectorAll(".section");

  all.forEach(s=>s.classList.remove("active"));

  document.getElementById(id).classList.add("active");
}

/* SPEAK */
function speak(text){

  let msg = new SpeechSynthesisUtterance(text);
  speechSynthesis.speak(msg);
}

/* ALPHABETS */
let alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

let box = document.getElementById("alphabetBox");

alpha.forEach(a=>{

  let div = document.createElement("div");
  div.className = "animal-card";
  div.innerHTML = `<h2>${a}</h2>`;

  div.onclick = ()=>speak(a + " for learning");

  box.appendChild(div);
});

/* NUMBERS */
let numBox = document.getElementById("numbersBox");

for(let i=1;i<=100;i++){

  let d = document.createElement("div");
  d.className="animal-card";
  d.innerHTML=i;

  d.onclick=()=>speak(i.toString());

  numBox.appendChild(d);
}

/* ANIMALS */
function playAnimal(type){

  let sound = "";

  if(type=="dog") sound="Woof Woof";
  if(type=="cat") sound="Meow Meow";
  if(type=="lion") sound="Roar";
  if(type=="cow") sound="Moo";
  if(type=="duck") sound="Quack";

  speak(sound);
}

/* DRAWING */
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;

let draw = false;

canvas.addEventListener("mousedown",start);
canvas.addEventListener("mouseup",stop);
canvas.addEventListener("mousemove",drawFn);

function start(){ draw=true; }
function stop(){ draw=false; ctx.beginPath(); }

function drawFn(e){

  if(!draw) return;

  ctx.lineWidth = brush;
  ctx.strokeStyle = currentColor;

  ctx.lineTo(e.clientX, e.clientY);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(e.clientX, e.clientY);
}

function setColor(c){
  currentColor=c;
}

function setBrush(b){
  brush=b;
}

function eraser(){
  currentColor="white";
}

function clearCanvas(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
}