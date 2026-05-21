function showSection(id){

  let sections = document.querySelectorAll(".section");

  sections.forEach(section=>{
    section.classList.remove("active");
  });

  document.getElementById(id).classList.add("active");
}

function speak(text){

  let speech = new SpeechSynthesisUtterance(text);

  speech.rate = 0.9;
  speech.pitch = 1.2;

  speechSynthesis.speak(speech);
}

const numbersGrid = document.getElementById("numbersGrid");

const numberWords = [
"One","Two","Three","Four","Five","Six","Seven","Eight","Nine","Ten",
"Eleven","Twelve","Thirteen","Fourteen","Fifteen","Sixteen","Seventeen","Eighteen","Nineteen","Twenty"
];

for(let i=1;i<=100;i++){

  let box = document.createElement("div");

  box.className = "number-box";

  let word = i <= 20 ? numberWords[i-1] : i;

  box.innerHTML = `
    <h2>${i}</h2>
    <p>${word}</p>
  `;

  box.onclick = ()=>{
    speak(i.toString());
  };

  numbersGrid.appendChild(box);
}

function playAnimal(animal){

  let sound = "";

  if(animal=="dog"){
    sound = "Woof Woof";
  }

  if(animal=="cat"){
    sound = "Meow";
  }

  if(animal=="lion"){
    sound = "Roar";
  }

  speak(sound);
}

/* DRAWING */

const canvas = document.getElementById("canvas");

const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth - 40;
canvas.height = 400;

let drawing = false;

canvas.addEventListener("mousedown",start);
canvas.addEventListener("mouseup",end);
canvas.addEventListener("mousemove",draw);

canvas.addEventListener("touchstart",start);
canvas.addEventListener("touchend",end);
canvas.addEventListener("touchmove",draw);

ctx.lineWidth = brushSize;
ctx.strokeStyle = currentColor;

function start(e){
  drawing = true;
  draw(e);
}

function end(){
  drawing = false;
  ctx.beginPath();
}

function draw(e){

  if(!drawing) return;

  e.preventDefault();

  let rect = canvas.getBoundingClientRect();

  let x = e.touches ? e.touches[0].clientX - rect.left : e.clientX - rect.left;

  let y = e.touches ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

  ctx.lineWidth = 6;
  ctx.lineCap = "round";
  ctx.strokeStyle = "#ff69b4";

  ctx.lineTo(x,y);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(x,y);
}

function clearCanvas(){

  ctx.clearRect(0,0,canvas.width,canvas.height);
}
function changeColor(color){

  currentColor = color;
}

function changeBrush(size){

  brushSize = size;
}

function eraserMode(){

  currentColor = "white";
}