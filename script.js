/* FIREBASE */
const firebaseConfig = {
  apiKey: "YOUR_KEY",
  authDomain: "YOUR_DOMAIN",
  projectId: "YOUR_ID",
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

/* GLOBAL */
let stars = 0;
let level = 1;
let userId = null;

/* LOGIN */
function login(){

let email=document.getElementById("email").value;
let pass=document.getElementById("pass").value;

auth.signInWithEmailAndPassword(email,pass)
.catch(()=>auth.createUserWithEmailAndPassword(email,pass))

.then(user=>{

userId=user.user.uid;

loadData();

document.getElementById("login").style.display="none";
document.getElementById("app").style.display="block";

loadABC();
loadNUM();

});
}

/* LOAD DATA */
function loadData(){

db.collection("users").doc(userId).get().then(doc=>{

if(doc.exists){
stars=doc.data().stars;
level=doc.data().level;
update();
}

});
}

/* SAVE */
function save(){
db.collection("users").doc(userId).set({
stars,level
});
}

/* UPDATE UI */
function update(){
document.getElementById("status").innerText=
"⭐ "+stars+" | 🏆 "+level;
}

/* SECTION */
function show(id){
document.querySelectorAll(".section").forEach(s=>s.classList.remove("active"));
document.getElementById(id).classList.add("active");
}

/* SPEAK */
function sound(t){
let s=new SpeechSynthesisUtterance(t);
speechSynthesis.speak(s);
addStar();
}

/* ABC */
function loadABC(){

let box=document.getElementById("abcBox");

let data=[
"A Apple","B Ball","C Cat","D Dog","E Elephant",
"F Fish","G Grapes","H Hen","I Ice","J Joker",
"K Kite","L Lion","M Mango","N Nest","O Orange",
"P Parrot","Q Queen","R Rabbit","S Sun","T Tiger",
"U Umbrella","V Van","W Watch","X Xylophone","Y Yak","Z Zebra"
];

let letters="ABCDEFGHIJKLMNOPQRSTUVWXYZ";

for(let i=0;i<26;i++){

let d=document.createElement("div");
d.className="card";
d.innerHTML="<h2>"+letters[i]+"</h2><p>"+data[i]+"</p>";

d.onclick=()=>sound(data[i]);

box.appendChild(d);
}
}

/* NUMBERS */
function loadNUM(){

let box=document.getElementById("numBox");

for(let i=1;i<=100;i++){

let d=document.createElement("div");
d.className="card";
d.innerText=i;

d.onclick=()=>sound(i.toString());

box.appendChild(d);
}
}

/* ⭐ STAR SYSTEM */
function addStar(){

stars++;

if(stars%10==0) level++;

update();
save();
}

/* 🎈 BALLOON */
function balloons(){

let g=document.getElementById("game");
g.innerHTML="";

for(let i=0;i<10;i++){

let b=document.createElement("div");
b.innerHTML="🎈";
b.style.position="absolute";
b.style.left=Math.random()*250+"px";
b.style.top=Math.random()*250+"px";
b.style.fontSize="40px";

b.onclick=()=>{
b.remove();
sound("Pop");
};

g.appendChild(b);
}
}

/* 🎨 DRAW */
let canvas=document.getElementById("canvas");
let ctx=canvas.getContext("2d");

canvas.width=300;
canvas.height=300;

let draw=false;

canvas.onmousedown=()=>draw=true;
canvas.onmouseup=()=>{draw=false;ctx.beginPath();}

canvas.onmousemove=(e)=>{

if(!draw) return;

ctx.lineWidth=4;
ctx.strokeStyle="pink";

ctx.lineTo(e.offsetX,e.offsetY);
ctx.stroke();
ctx.beginPath();
ctx.moveTo(e.offsetX,e.offsetY);
};

function clearCanvas(){
ctx.clearRect(0,0,300,300);
}