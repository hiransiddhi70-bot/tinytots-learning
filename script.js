// Simple Name Login - No Google needed
function simpleLogin() {
  const name = document.getElementById('nameInput').value.trim();
  if(!name) return alert('Naam to likho beta!');
  const data = {
    name: name,
    given_name: name,
    picture: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
  };
  localStorage.setItem('tinytoys_user', JSON.stringify(data));
  loadUser();
}

function loadUser() {
  const user = localStorage.getItem('tinytoys_user');
  if(user) {
    const data = JSON.parse(user);
    document.getElementById('userName').innerText = data.given_name || data.name;
    document.getElementById('userPic').src = data.picture;
    document.getElementById('loginDiv').style.display = 'none';
    document.getElementById('appDiv').style.display = 'block';
    show('alphabet');
  }
}

function logout() {
  localStorage.removeItem('tinytoys_user');
  location.reload();
}

// Menu Navigation
const sections = ['alphabet','numbers','animals','draw','math'];
function show(id) {
  sections.forEach(s => document.getElementById(s).style.display = 'none');
  document.getElementById(id).style.display = 'block';
}

// Alphabets
const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const spellings = {A:'Apple',B:'Ball',C:'Cat',D:'Dog',E:'Elephant',F:'Fish',G:'Goat',H:'Hat',I:'Ice',J:'Jug',K:'Kite',L:'Lion',M:'Monkey',N:'Nest',O:'Orange',P:'Parrot',Q:'Queen',R:'Rat',S:'Sun',T:'Tiger',U:'Umbrella',V:'Van',W:'Watch',X:'Xray',Y:'Yak',Z:'Zebra'};
document.getElementById('alphaGrid').innerHTML = alphabets.map(a =>
  `<div class="card" onclick="speak('${a} for ${spellings[a]}')"><b>${a}</b><br>${spellings[a]}</div>`
).join('');

// Numbers
const numWords = ['One','Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten'];
document.getElementById('numGrid').innerHTML = numWords.map((n,i) =>
  `<div class="card" onclick="speak('${i+1} ${n}')"><b>${i+1}</b><br>${n}</div>`
).join('');

// Animals
const animals = [
  {name:'Cow', sound:'Moo', emoji:'🐄'},
  {name:'Dog', sound:'Woof', emoji:'🐶'},
  {name:'Cat', sound:'Meow', emoji:'🐱'},
  {name:'Lion', sound:'Roar', emoji:'🦁'},
  {name:'Duck', sound:'Quack', emoji:'🦆'},
  {name:'Elephant', sound:'Trumpet', emoji:'🐘'}
];
document.getElementById('animalGrid').innerHTML = animals.map(a =>
  `<div class="card" onclick="speak('${a.name} says ${a.sound}')">${a.emoji}<br>${a.name}</div>`
).join('');

// Drawing Pad
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let drawing = false;

function getPos(e) {
  const rect = canvas.getBoundingClientRect();
  if(e.touches) {
    return {
      x: e.touches[0].clientX - rect.left,
      y: e.touches[0].clientY - rect.top
    };
  }
  return { x: e.clientX - rect.left, y: e.clientY - rect.top };
}

function startDraw(e) {
  drawing = true;
  draw(e);
}

function endDraw() { drawing = false; }

function draw(e) {
  if(!drawing) return;
  e.preventDefault();
  const pos = getPos(e);
  ctx.fillStyle = document.getElementById('colorPicker').value;
  ctx.beginPath();
  ctx.arc(pos.x, pos.y, document.getElementById('brushSize').value, 0, 2 * Math.PI);
  ctx.fill();
}

canvas.addEventListener('mousedown', startDraw);
canvas.addEventListener('mouseup', endDraw);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('touchstart', startDraw);
canvas.addEventListener('touchend', endDraw);
canvas.addEventListener('touchmove', draw);

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Math Game
let ans = 0;
function newQuestion() {
  let a = Math.floor(Math.random()*5)+1;
  let b = Math.floor(Math.random()*5)+1;
  let op = Math.random() > 0.5? '+' : '-';
  if(op === '-' && a < b) [a,b] = [b,a];
  ans = op === '+'? a+b : a-b;
  document.getElementById('question').innerText = `${a} ${op} ${b} =?`;
  document.getElementById('result').innerText = '';
  document.getElementById('answer').value = '';
}

function checkAnswer() {
  const userAns = parseInt(document.getElementById('answer').value);
  const user = JSON.parse(localStorage.getItem('tinytoys_user'));
  const kidName = user? user.given_name || user.name.split(' ')[0] : 'Champion';

  if(userAns === ans) {
    document.getElementById('result').innerText = `✅ Wow ${kidName} you did it!`;
    speak(`Wow ${kidName}! You did it! Wow!`);
    setTimeout(newQuestion, 2000);
  } else {
    document.getElementById('result').innerText = `❌ Try Again ${kidName}! Ans: ${ans}`;
    speak(`Try again ${kidName}`);
    setTimeout(newQuestion, 2000);
  }
}

// Speech
function speak(text) {
  const msg = new SpeechSynthesisUtterance(text);
  window.speechSynthesis.speak(msg);
}

// Init
window.onload = function() {
  loadUser();
  newQuestion();
}
let musicPlaying = false;
function toggleMusic() {
  const music = document.getElementById('bgMusic');
  const btn = document.getElementById('musicBtn');
  if(musicPlaying) {
    music.pause();
    btn.innerText = '🔇 Music Off';
    musicPlaying = false;
  } else {
    music.play();
    btn.innerText = '🔊 Music On';
    musicPlaying = true;
  }
}
