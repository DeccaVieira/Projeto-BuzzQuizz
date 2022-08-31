const screenPlayQuizz = document.querySelector('.js-playQuizz');

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

    let justIdQuizz = quizz.id.substring(5);
    makeGet(`/quizzes/${justIdQuizz}`, 'singleQuizz');


    
}

function createSingleQuizz(answer) {
    screenPlayQuizz.innerHTML = '';

    const quizzToPlay = answer.data;
    
    console.log(quizzToPlay);
    
    screenPlayQuizz.innerHTML += `
        <button class="c-play__button-close" onclick="closeScreenPlay()">fechar</button>
        <div>creating a page to play quizz id: ${quizzToPlay.id}</div>
    `
    
    screenPlayQuizz.style.display = 'initial';
    window.scroll(0, 0);
    return;
}

function closeScreenPlay() {
    screenPlayQuizz.style.display = 'none';
}