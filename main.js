const items = ["kancha.jpg", "kilbish.JPG", "white walker.jpg", "thanos.jpg"];
const tiles = Array.from(document.querySelectorAll('.tile'));
const beasts = Array.from(document.querySelectorAll('.beasts'));
const start_btn = document.getElementById('start_btn');
const hits = Array.from(document.querySelectorAll('.hit'));
const intro_page = document.getElementById('intro-page');
const game_page = document.getElementById('game-page');
const result_page = document.getElementById('result-page');

let score = [0, 0, 0, 0];
let totalScore = 0;
let startTime;
let holes = [];
let t= 0;
let roundTime;
const bar1 = new ldBar("#timer");
const bar2 = document.getElementById('timer').ldBar;

    
function enterGamePage(){
    intro_page.style.display = 'none';
    game_page.style.display = 'block';
}

function playAgain(){
    game_page.style.display = 'block';
    result_page.style.display = 'none';
    setCanvas();
    totalScore = 0;
    score = [0, 0, 0, 0];
    document.getElementById('score').innerHTML = 0;
    start_btn.disabled = false;
    
}

function setCanvas(){
    holes.forEach(hole => hole.innerHTML = '');
}

function releseBeasts(){
    let numberOfBeasts = Math.floor(Math.random()*7)+1;
    for(let i=0;i<numberOfBeasts;i++){
        let index = Math.floor(Math.random()*16);
        let beast = Math.floor(Math.random()*4)
        holes.push(tiles[index]);
        tiles[index].innerHTML = `<img class="beasts" src="${items[beast]}">`;
    }
    t=0;
    clearInterval(roundTime);
    roundTime = setInterval(() => {
        t = t + 1;
        bar1.set(t);
    },20);
    holes.forEach(hole => hole.addEventListener('click', dham));
}

function startGame(){
    start_btn.disabled = true;
    startTime = new Date().getTime();
    releseBeasts();
    let interval = setInterval(function(){
        if(new Date().getTime() - startTime > 7200){
            clearInterval(interval);
            bar1.set(0);
            clearInterval(roundTime);
            showResult();
            return;
        }
        holes.forEach(hole => hole.innerHTML = '');
        holes = [];
        releseBeasts();
    }, 1200);
        
}

function giveSmash(parent){
    const node = document.createElement('img');
    node.setAttribute("src", "punch.png");
    node.setAttribute("class", "smash");
    parent.appendChild(node);
}


function dham(e){
    const smashed = e.target.getAttribute("src");
    if(items.includes(smashed)){
        giveSmash(e.target.parentNode);
        totalScore += 10;
        score[items.indexOf(smashed)] += 1;
        document.getElementById('score').innerHTML = totalScore; 
    }
    this.removeEventListener('click', dham);
}

function showResult(){
    game_page.style.display = 'none';
    result_page.style.display = 'block';
    document.getElementById('final_score').innerHTML = totalScore;
    hits.forEach((hit, i=0) => {
        hit.innerHTML = score[i];
        i++;
    });
}