//console.log('QUANTIDADE DE QUESTÕES = ', questions.length);

// Initial Data
let currentQuestion = 0;
let correctAnswers = 0;


showQuestion();


// Events
document.querySelector('.scoreArea button').addEventListener('click', resetEvent);


// Functions
function showQuestion(){
    if(questions[currentQuestion]){

        let q = questions[currentQuestion];
        //console.log(q.question);

        let porcentagem = Math.floor((currentQuestion / questions.length) * 100);
        document.querySelector('.progress--bar').style.width = `${porcentagem}%`;

        document.querySelector('.scoreArea').style.display = 'none';
        document.querySelector('.questionArea').style.display = 'block';

        document.querySelector('.question').innerHTML = q.question;
        
        let optionsHtml = '';
        for(let i in q.options){
            optionsHtml += `<div data-op="${i}" class="option"><span>${parseInt(i)+1}</span></span>${q.options[i]}</div>`;
        }
        document.querySelector('.options').innerHTML = optionsHtml; // vai add na tela

        document.querySelectorAll('.options .option').forEach(item => {
            item.addEventListener('click', optionClickEvent);
        });

    } else {
        // acabaram as questões
        finishQuiz();
    }
}


function optionClickEvent(e){
    //console.log("CLICOU EM = ", e.target.getAttribute('data-op'));
    let clickedOption = parseInt(e.target.getAttribute('data-op'));

    if(questions[currentQuestion].answer === clickedOption){
        //console.log("ACERTOU");
        correctAnswers++;
    } else {
        //console.log("ERROU");
    }

    currentQuestion++;
    showQuestion();

}


function finishQuiz(){

    let points = Math.floor((correctAnswers / questions.length) * 100);

    if(points < 30){
        document.querySelector('.scoreText1').innerHTML = 'Tá ruim heim?!';
        document.querySelector('.scorePct').style.color = '#FF0000';
    } else if (points >= 30 && points < 70){
        document.querySelector('.scoreText1').innerHTML = 'Muito bom!';
        document.querySelector('.scorePct').style.color = '#FFFF00';
    } else if (points >= 70){
        document.querySelector('.scoreText1').innerHTML = 'Parabéns!';
        document.querySelector('.scorePct').style.color = '#0D630D';
    }

    document.querySelector('.scorePct').innerHTML = `Acertou ${points}%`;
    document.querySelector('.scoreText2').innerHTML = `Você respondeu ${questions.length} questões e acertou ${correctAnswers}.`;

    document.querySelector('.scoreArea').style.display = 'block';
    document.querySelector('.questionArea').style.display = 'none';
    document.querySelector('.progress--bar').style.width = '100%';

}


function resetEvent(){
    correctAnswers = 0;
    currentQuestion = 0;
    showQuestion();
}