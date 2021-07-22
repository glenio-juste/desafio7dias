// Initial Data
let square = {
    a1: '', a2: '', a3: '',
    b1: '', b2: '', b3: '',
    c1: '', c2: '', c3: ''
};

let player = '';
let warning = '';
let playing = false;

// Events
document.querySelector('.reset').addEventListener('click', reset);

document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', itemClick);    
});


// Functions

function itemClick(event){
    //console.log( event.target );
    let item = event.target.getAttribute('data-item'); // em quem está clicando
    //console.log('Clicou em ', item);

    if(playing && square[item] === ''){
        square[item] = player;
        renderSquare();
        togglePlayer();
    }

}


function reset(){
    warning = '';

    let random = Math.floor(Math.random() * 2);
    
    /* if(random === 0){
        player = 'x';
    } else {
        player = 'o';
    } */
    player = (random === 0) ? 'x' : 'o';

    for(let i in square){
        square[i] = '';
    }

    playing = true;

    renderSquare();
    renderInfo();

}

function renderSquare(){

    for(let i in square){
        let item = document.querySelector(`div[data-item=${i}]`);
        item.innerHTML = square[i];
    }

    checkGame();

}


function renderInfo(){

    document.querySelector('.vez').innerHTML = player;
    document.querySelector('.resultado').innerHTML = warning;

}


function  togglePlayer(){
    /* if(player === 'x'){
        player = 'o';
    } else {
        player = 'x';
    } */
    player = (player === 'x') ? 'o' : 'x';
    renderInfo();
}


function checkGame(){

    if(checkWinnerFor('x')){
        warning = 'O "x" venceu';
        playing = false;
    } else if(checkWinnerFor('o')){
        warning = 'O "o" venceu';
        playing = false;
    } else if(isFull()){
        warning = 'Deu empate';
        playing = false;
    }

}


function checkWinnerFor(player){
    let possibilidade = [
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',

        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',

        'a1,b2,c3',
        'c1,b2,a3'
    ];

    for(let w in possibilidade){
        let pArray = possibilidade[w].split(','); // a1, a2, a3
        /* pArray.every((option)=>{
            if(square[option] === player){
                return true;
            } else {
                return false;
            }
        }); */
        let hasWon = pArray.every(option => square[option] === player);

        if(hasWon){
            return true;
        }

    }

    return false;

}


function isFull(){

    for(let i in square){
        if(square[i] === ''){
            return false;
        }
    }

    return true;

}