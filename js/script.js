const screenPlayQuizz = document.querySelector('.js-playQuizz');
const screenCreateQuizz = document.querySelector('.js-createQuizz');
const screenMain = document.querySelector('.js-mainQuizzes');







/* const meuStorage = localStorage;
const idd = 213432;
const sdkljdsa = {
    nome: 'rodrigo',
    idade: 123
};
meuStorage.setItem(idd, JSON.stringify(sdkljdsa));
console.log(meuStorage.getItem(idd)) */














let templateURL = 'https://mock-api.driven.com.br/api/v4/buzzquizz';
let thisIsQuizz = undefined;

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


// primeira pergunta

// segunda pergunta

// 







function openQuiz(quizz) {

    let justIdQuizz = quizz.id.substring(5);
    makeGet(`/quizzes/${justIdQuizz}`, 'singleQuizz');


    
}

function pageToCreateQuizz(quizz) {
    screenMain.style.display = 'none';
    screenCreateQuizz.style.display = 'initial';

}


/* Andreia */

function createSingleQuizz(answer) {
    screenPlayQuizz.innerHTML = '';

    const quizzToPlay = answer.data;
    const questionsQuizz = quizzToPlay.questions[0];
    
    console.log(quizzToPlay);
    
    screenPlayQuizz.innerHTML += `
        <div 
            class="c-play__header u-all-center" 
            style="background: linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${quizzToPlay.image});"
            >

            <h1>${quizzToPlay.title}</h1>
        </div>

        <section class="c-play__box-question">
            <div class="c-play__question u-all-center">${questionsQuizz.title}</div>
        </section>
        `;
        
    const blabla = document.querySelector('.c-play__box-options');
    let bleble = '';

    for(let i=0; i < questionsQuizz.answers.length; i+=2) {
        if (i%2===0) {
            bleble += `
                <div class="c-play__box-options">
                    <div class="c-play__box-option">
                        <div class="c-play__option js-optionX" style="background-image: url(${questionsQuizz.answers[i].image});">
                        </div>
                        <p>${questionsQuizz.answers[i].text}</p>
                    </div>
                    <div class="c-play__box-option">
                        <div class="c-play__option js-optionX" style="background-image: url(${questionsQuizz.answers[i+1].image});">
                        </div>
                        <p>${questionsQuizz.answers[i+1].text}</p>
                    </div>
                </div>
            `;
        }
    }
    blabla.innerHTML = bleble;


    
    screenMain.style.display = 'none';
    screenPlayQuizz.style.display = 'flex';
    window.scroll(0, 0);
    return;
}
/* Andreia */

function closeScreenPlay() {
    screenPlayQuizz.style.display = 'none';
    screenMain.style.display = 'initial';
}

function closeScreenCreate() {
    screenCreateQuizz.style.display = 'none';
    screenMain.style.display = 'initial';
}

// module.exports = makePost, makeGet, errorCorrections