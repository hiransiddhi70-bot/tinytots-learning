// Login System
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

// Music & Fullscreen
let musicPlaying = false;
function toggleMusic() {
  const music = document.getElementById('bgMusic');
  const btn = document.getElementById('musicBtn');
  if(musicPlaying) {
    music.pause();
    btn.innerText = '🔇 Music';
    musicPlaying = false;
  } else {
    music.play();
    btn.innerText = '🔊 Music';
    musicPlaying = true;
  }
}

function toggleFullScreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}

// Menu Navigation
const sections = ['alphabet','numbers','animals','draw','math','shapes','colors','vegetables','fruits','rhymes'];
function show(id) {
  sections.forEach(s => document.getElementById(s).style.display = 'none');
  document.getElementById(id).style.display = 'block';
}

// Alphabets
const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const spellings = {A:'Anar',B:'Ball',C:'Cat',D:'Dog',E:'Haathi',F:'Fish',G:'Ghar',H:'Haath',I:'Imli',J:'Jug',K:'Kela',L:'Sher',M:'Machhli',N:'Naav',O:'Aam',P:'Patang',Q:'Queen',R:'Raja',S:'Suraj',T:'Tamatar',U:'Ullu',V:'Van',W:'Ghadi',X:'Xray',Y:'Yak',Z:'Joota'};
document.getElementById('alphaGrid').innerHTML = alphabets.map(a =>
  `<div class="card" onclick="speak('${a} for ${spellings[a]}')"><b>${a}</b><br>${spellings[a]}</div>`
).join('');

// Numbers
const numWords = ['One','Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten'];
document.getElementById('numGrid').innerHTML = numWords.map((n,i) =>
  `<div class="card" onclick="speak('${i+1} ${n}')"><b>${i+1}</b><br>${n}</div>`
).join('');

// Animals - 12 Animals
const animals = [
  {name:'Cow', hindi:'Gaay', sound:'Moo', emoji:'🐄'},
  {name:'Dog', hindi:'Kutta', sound:'Woof', emoji:'🐶'},
  {name:'Cat', hindi:'Billi', sound:'Meow', emoji:'🐱'},
  {name:'Lion', hindi:'Sher', sound:'Roar', emoji:'🦁'},
  {name:'Elephant', hindi:'Haathi', sound:'Trumpet', emoji:'🐘'},
  {name:'Monkey', hindi:'Bandar', sound:'Ooh Ooh', emoji:'🐵'},
  {name:'Tiger', hindi:'Bagh', sound:'Roar', emoji:'🐯'},
  {name:'Bear', hindi:'Bhalu', sound:'Growl', emoji:'🐻'},
  {name:'Duck', hindi:'Batakh', sound:'Quack', emoji:'🦆'},
  {name:'Horse', hindi:'Ghoda', sound:'Neigh', emoji:'🐴'},
  {name:'Pig', hindi:'Suar', sound:'Oink', emoji:'🐷'},
  {name:'Goat', hindi:'Bakri', sound:'Maa', emoji:'🐐'}
];
document.getElementById('animalGrid').innerHTML = animals.map(a =>
  `<div class="card" onclick="speak('${a.name} says ${a.sound}. Hindi mein ${a.hindi}')">${a.emoji}<br>${a.name}<br><small>${a.hindi}</small></div>`
).join('');

// Vegetables - 9 Items
const vegetables = [
  {name:'Carrot', hindi:'Gajar', emoji:'🥕'},
  {name:'Potato', hindi:'Aloo', emoji:'🥔'},
  {name:'Tomato', hindi:'Tamatar', emoji:'🍅'},
  {name:'Onion', hindi:'Pyaaz', emoji:'🧅'},
  {name:'Cabbage', hindi:'Patta Gobhi', emoji:'🥬'},
  {name:'Brinjal', hindi:'Baingan', emoji:'🍆'},
  {name:'Cauliflower', hindi:'Phool Gobhi', emoji:'🥦'},
  {name:'Peas', hindi:'Matar', emoji:'🫛'},
  {name:'Capsicum', hindi:'Shimla Mirch', emoji:'🫑'}
];
document.getElementById('vegGrid').innerHTML = vegetables.map(v =>
  `<div class="card" onclick="speak('${v.name}. ${v.hindi}')">${v.emoji}<br>${v.name}<br><small>${v.hindi}</small></div>`
).join('');

// Fruits - 9 Items
const fruits = [
  {name:'Apple', hindi:'Seb', emoji:'🍎'},
  {name:'Banana', hindi:'Kela', emoji:'🍌'},
  {name:'Orange', hindi:'Santra', emoji:'🍊'},
  {name:'Mango', hindi:'Aam', emoji:'🥭'},
  {name:'Grapes', hindi:'Angoor', emoji:'🍇'},
  {name:'Watermelon', hindi:'Tarbooz', emoji:'🍉'},
  {name:'Pineapple', hindi:'Ananas', emoji:'🍍'},
  {name:'Strawberry', hindi:'Strawberry', emoji:'🍓'},
  {name:'Papaya', hindi:'Papita', emoji:'🍈'}
];
document.getElementById('fruitGrid').innerHTML = fruits.map(f =>
  `<div class="card" onclick="speak('${f.name}. ${f.hindi}')">${f.emoji}<br>${f.name}<br><small>${f.hindi}</small></div>`
).join('');

// Shapes
const shapes = [
  {name:'Circle', emoji:'⭕', desc:'Gol Gol'},
  {name:'Square', emoji:'⬜', desc:'Chaar Kona'},
  {name:'Triangle', emoji:'🔺', desc:'Teen Kona'},
  {name:'Star', emoji:'⭐', desc:'Taara'},
  {name:'Heart', emoji:'❤️', desc:'Dil'},
  {name:'Rectangle', emoji:'▭', desc:'Lamba'}
];
document.getElementById('shapeGrid').innerHTML = shapes.map(s =>
  `<div class="card" onclick="speak('${s.name}. ${s.desc}')">${s.emoji}<br>${s.name}</div>`
).join('');

// Colors
const colors = [
  {name:'Red', hindi:'Laal', hex:'#ff0000'},
  {name:'Blue', hindi:'Neela', hex:'#0000ff'},
  {name:'Green', hindi:'Hara', hex:'#00ff00'},
  {name:'Yellow', hindi:'Peela', hex:'#ffff00'},
  {name:'Pink', hindi:'Gulaabi', hex:'#ff69b4'},
  {name:'Orange', hindi:'Narangi', hex:'#ffa500'}
];
document.getElementById('colorGrid').innerHTML = colors.map(c =>
  `<div class="card" style="background:${c.hex}; color:${c.name==='Yellow'?'black':'white'}"
   onclick="speak('${c.name}. ${c.hindi}')">${c.name}<br>${c.hindi}</div>`
).join('');

// Drawing Pad
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let drawing = false;
let currentColor = '#ff0000';

function setColor(color) {
  currentColor = color;
}

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
  ctx.fillStyle = currentColor;
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

// Math Game with Score Save
let ans = 0;
let score = parseInt(localStorage.getItem('tinytoys_score')) || 0;

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
    score++;
    localStorage.setItem('tinytoys_score', score);
    document.getElementById('score').innerText = score;
    document.getElementById('result').innerText = `✅ Wow ${kidName} you did it!`;
    speak(`Wow ${kidName}! You did it! Wow! Score is ${score}`);
    setTimeout(newQuestion, 2000);
  } else {
    document.getElementById('result').innerText = `❌ Try Again ${kidName}! Ans: ${ans}`;
    speak(`Try again ${kidName}`);
    setTimeout(newQuestion, 2000);
  }
}

// Nursery Rhymes
const rhymes = [
  {
    name:'Twinkle Twinkle',
    hindi:'Tim Tim Taare',
    lyrics:'Twinkle twinkle little star, How I wonder what you are',
    audio:'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0c6ff1bab.mp3'
  },
  {
    name:'Johny Johny',
    hindi:'Johny Johny',
    lyrics:'Johny Johny Yes Papa, Eating sugar No Papa',
    audio:'https://cdn.pixabay.com/download/audio/2022/03/15/audio_5b6a1c8d6c.mp3'
  },
  {
    name:'Machli Jal Ki Rani',
    hindi:'Machli Jal Ki Rani',
    lyrics:'Machli jal ki rani hai, jeevan uska paani hai',
    audio:'https://cdn.pixabay.com/download/audio/2021/08/04/audio_c6b0b6e0a5.mp3'
  },
  {
    name:'Humpty Dumpty',
    hindi:'Humpty Dumpty',
    lyrics:'Humpty Dumpty sat on a wall, Humpty Dumpty had a great fall',
    audio:'https://cdn.pixabay.com/download/audio/2022/03/10/audio_5c2d5e1c6b.mp3'
  }
];

let currentRhymeAudio = null;
function playRhyme(url, lyrics) {
  if(currentRhymeAudio) currentRhymeAudio.pause();
  currentRhymeAudio = new Audio(url);
  currentRhymeAudio.play();
  speak(lyrics);
}

document.getElementById('rhymeGrid').innerHTML = rhymes.map(r =>
  `<div class="rhyme-card" onclick="playRhyme('${r.audio}','${r.lyrics}')">
    🎵<br><b>${r.name}</b><br><small>${r.hindi}</small>
  </div>`
).join('');

// Speech
function speak(text) {
  window.speechSynthesis.cancel();
  const msg = new SpeechSynthesisUtterance(text);
  msg.lang = 'en-IN';
  window.speechSynthesis.speak(msg);
}

// Init
window.onload = function() {
  loadUser();
  newQuestion();
  document.getElementById('score').innerText = score;
}