const screenPlayQuizz = document.querySelector('.js-playQuizz');
const screenCreateQuizz = document.querySelector('.js-createQuizz');
const screenMain = document.querySelector('.js-mainQuizzes');

let count = 0;
let templateURL = 'https://mock-api.driven.com.br/api/v4/buzzquizz';
let thisIsQuizz = undefined;
let posicao = [];
let justIdQuizz;







/* const meuStorage = localStorage;
const idd = 213432;
const sdkljdsa = {
    nome: 'rodrigo',
    idade: 123
};
meuStorage.setItem(idd, JSON.stringify(sdkljdsa));
console.log(meuStorage.getItem(idd)) */
let lastQuestion;

makeGet('/quizzes', 'allQuizzes');

function makePost(endUrl, body) {

    let url = templateURL + endUrl;
    const promise = axios.post(url, body);

    promise.then( outraCoisa );
    promise.catch( errorCorrections );

}

function makeGet(endUrl, description) {
    let url = templateURL + endUrl;
    const promise = axios.get(url);

    if (description === 'allQuizzes') {

        promise.then( renderAllQuizzes );
        promise.catch( errorCorrections );

    } else if (description === 'singleQuizz') {

        promise.then( createSingleQuizz );
        promise.catch( errorCorrections );

    } else if (description === 'createQuizz') {

        promise.then( renderCreateQuizz );
        promise.catch( errorCorrections );

    }
}

function errorCorrections(answer) {
    const error = answer.response;
    console.log(error)
    return;
}

function renderAllQuizzes(answer) {

    const listOfQuizz = answer.data;
    const sectionDatabase = document.querySelector('.js-databaseOfQuizzes');
    // console.log(listOfQuizz);

    listOfQuizz.forEach(function(quizz) {
        sectionDatabase.innerHTML += `
            <article 
                    
                class="c-main__quizz js-quizz" 
                id="quizz${quizz.id}"
                style="background-image: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 64.58%, #000000 100%), url(${quizz.image});"
                onclick="openQuiz(this)">
                

                <h1 class="c-quizz__title">${quizz.title}</h1>
            </article>  
        `
    })
    
    return;
}

function openQuiz(quizz) {

    justIdQuizz = quizz.id.substring(5);
    makeGet(`/quizzes/${justIdQuizz}`, 'singleQuizz');


    
}

function pageToCreateQuizz(quizz) {
    screenMain.style.display = 'none';
    screenCreateQuizz.style.display = 'initial';

}

function createSingleQuizz(answer) {

    screenMain.style.display = 'none';
    screenPlayQuizz.style.display = 'flex';

    const quizzToPlay = answer.data;
    const questionsQuizz = shuffleArray(quizzToPlay.questions);
    console.log('Embaralhada: ', questionsQuizz)
    
    console.log(quizzToPlay);
    
    screenPlayQuizz.innerHTML = `
        <div 
            class="c-play__header u-all-center" 
            style="background: linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${quizzToPlay.image});"
            >

            <h1>${quizzToPlay.title}</h1>
        </div>
        `;

    for(let i=0; i < questionsQuizz.length; i++) {

        screenPlayQuizz.innerHTML += `
        <section class="c-play__box-question js-question${i} js-scroll${i}">
            <div class="c-play__question u-all-center js-question-color">${questionsQuizz[i].title}</div>

            <div class="c-play__box-options js-box1"></div>
            <div class="c-play__box-options js-box2"></div>

        </section>
        `;

        document.querySelector('.js-question-color').style.backgroundColor =  questionsQuizz[i].color;
        const boxQuestionOne = document.querySelector(`.js-question${i} .js-box1`);
        const boxQuestionTwo = document.querySelector(`.js-question${i} .js-box2`);
        
        for(let e=0; e < questionsQuizz[i].answers.length; e++) {
    
            
            if (e <= 1) {
                boxQuestionOne.innerHTML += `
        
                    <div class="c-play__box-option">
                        <div class="c-play__option js-option${i}" data-correct="${questionsQuizz[i].answers[e].isCorrectAnswer}" onclick="ChosenAnswer(this)" style="background-image: url(${questionsQuizz[i].answers[e].image});">
                        </div>
                        <p class="js-option-text">${questionsQuizz[i].answers[e].text}</p>
                    </div>
                `;
            } else {
                boxQuestionTwo.innerHTML += `
    
                    <div class="c-play__box-option">
                        <div class="c-play__option js-option${i}" data-correct="${questionsQuizz[i].answers[e].isCorrectAnswer}" onclick="ChosenAnswer(this)" style="background-image: url(${questionsQuizz[i].answers[e].image});">
                        </div>
                        <p class="js-option-text">${questionsQuizz[i].answers[e].text}</p>
                    </div>
                `;
            }
        }
        if (i === questionsQuizz.length - 1) {

            lastQuestion = screenPlayQuizz.lastElementChild;
            console.log('ultima questão', lastQuestion)

            screenPlayQuizz.innerHTML += `
            <section class="c-play__result js-result js-scroll${i+1} is-hidden">

                <h1 class="c-play_result-title u-all-center"></h1>

                <div class="c-play__result-content">
                    <img src="" alt="">
        
                    <p></p>
                </div>
            </section>

            <section class="blabla is-hidden">
                <button onclick="reloadQuizz()">Reiniciar Quizz</button>
    
                <button class="c-play__button-close" onclick="closeScreenPlay()">fechar</button>
                <div>creating a page to play quizz id${quizzToPlay.id}</div>
            </section>
        
            `;
        }
    }

    
    window.scroll(0, 0);
}

function ChosenAnswer(selected) {
    
    const questionSelected = selected.parentNode.parentNode.parentNode;
    const classOfQuestionSelected = questionSelected.classList[1];
    

    const listOptionsQuestion = document.querySelectorAll(`.${classOfQuestionSelected} .c-play__option`);

    console.log('aaaaaaaaaaaaaaaa',lastQuestion.classList[2], questionSelected.classList[2])
    
    listOptionsQuestion.forEach( function(element) {

        const value = element.dataset.correct;

        if (value === 'false') {
            element.nextElementSibling.style.color = '#FF0B0B';

        } else {
            element.nextElementSibling.style.color = '#009C22';
        }

        if (element !== selected) {
            element.style.opacity = '0.3';
        }

        element.style.pointerEvents = 'none';
    } );

    if (questionSelected.classList[2] === lastQuestion.classList[2]) {
        document.querySelector('.js-result').style.display = 'initial';
        document.querySelector('.blabla').style.display = 'initial';
    }

    setTimeout((function() {
        document.querySelector(`.js-scroll${count}`).scrollIntoView(false)
    }), 2000);
    count++;
}

function reloadQuizz() {
    
    makeGet(`/quizzes/${justIdQuizz}`, 'singleQuizz');
}

function closeScreenPlay() {
    screenMain.style.display = 'initial';
    screenPlayQuizz.style.display = 'none';
    window.scroll(0, 0);
}

function closeScreenCreate() {
    screenCreateQuizz.style.display = 'none';
    screenMain.style.display = 'initial';
    window.scroll(0, 0);
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {

        const randomPosition = Math.floor(Math.random() * (i + 1));

        [array[i], array[randomPosition]] = [array[randomPosition], array[i]];
    }
    return array;
}

// module.exports = makePost, makeGet, errorCorrections