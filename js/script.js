const screenCreateQuizz = document.querySelector('.js-createQuizz');
const screenPlayQuizz = document.querySelector('.js-playQuizz');
const screenMain = document.querySelector('.js-mainQuizzes');

const boxMyQuizzes = document.querySelector('.js-main__my-quizzes');
const boxCreateQuizz = document.querySelector('.js-main__create'); 

const myStorage = localStorage;
const listMyQuizzes = [];

let templateURL = 'https://mock-api.driven.com.br/api/v4/buzzquizz';
let numberTotalQuestions = 0;
let correctAnswer = 0;
let count = 0;

let lastQuestion;
let justIdQuizz;
let quizzToPlay;

// usar essa função para gravar o quizz no LocalStorage
const sentToLocalStorage = (idQuizz) => myStorage.setItem(idQuizz, JSON.stringify(idQuizz));
//

// usar essa função para enviar pegar um quizz do LocalStorage e armazenar uma lista;
const getToLocalStorage = (idQuizz) => listMyQuizzes.push(JSON.parse(myStorage.getItem(idQuizz)));
//

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
    const sectionAllDatabase = document.querySelector('.js-databaseOfQuizzes');
    const sectionMyDatabase = document.querySelector('.js-databaseCreations');
    // console.log(listOfQuizz);

    listOfQuizz.forEach(function(quizz) {
        const conditionCreationQuizz = listMyQuizzes.includes(quizz.id);

        if (conditionCreationQuizz) {
            sectionMyDatabase.innerHTML += `
                <article 
                        
                    class="c-main__quizz js-quizz" 
                    id="quizz${quizz.id}"
                    style="background-image: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 64.58%, #000000 100%), url(${quizz.image});"
                    onclick="openQuiz(this)">
                    

                    <h1 class="c-quizz__title">${quizz.title}</h1>
                </article>  
        `;

        } else {

            sectionAllDatabase.innerHTML += `
                <article 
                        
                    class="c-main__quizz js-quizz" 
                    id="quizz${quizz.id}"
                    style="background-image: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 64.58%, #000000 100%), url(${quizz.image});"
                    onclick="openQuiz(this)">
                    
    
                    <h1 class="c-quizz__title">${quizz.title}</h1>
                </article>  
            `;
        }

        if (sectionMyDatabase.innerHTML !== '') {
            boxMyQuizzes.style.display = 'flex';
            boxCreateQuizz.style.display = 'none';

        }
    })
    
    return;
}

function openQuiz(quizz) {

    justIdQuizz = quizz.id.substring(5);
    makeGet(`/quizzes/${justIdQuizz}`, 'singleQuizz');

}

function pageToCreateQuizz() {
    screenMain.style.display = 'none';
    screenCreateQuizz.style.display = 'initial';
    createPageCreate();

}

function createSingleQuizz(answer) {

    screenMain.style.display = 'none';
    screenPlayQuizz.style.display = 'flex';

    quizzToPlay = answer.data;
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

                <h1 class="c-play_result-title js-result-title u-all-center"></h1>

                <div class="c-play__result-content">
                    <img class="js-image-result" src="" alt="">
        
                    <p class="js-paragraph-result"></p>
                </div>
            </section>

            <section class="c-play__restart is-hidden">
                <button class="c-play__restart-button" onclick="reloadQuizz()">Reiniciar Quizz</button>
    
                <div class="c-play__button-close" onclick="closeScreenPlay()">Voltar pra home</div>
            </section>
        
            `;
        }
    }

    
    window.scroll(0, 0);
}

function ChosenAnswer(selected) {

    numberTotalQuestions++;
    count++;

    const questionSelected = selected.parentNode.parentNode.parentNode;
    const classOfQuestionSelected = questionSelected.classList[1];
    const listOptionsQuestion = document.querySelectorAll(`.${classOfQuestionSelected} .c-play__option`);

    if (selected.dataset.correct === 'true') {
        correctAnswer++;
    }

    
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
        document.querySelector('.c-play__restart').style.display = 'initial';
        showResultsQuizz();
        
    } else {

        setTimeout((function() {
            document.querySelector(`.js-scroll${count}`).scrollIntoView(false)
        }), 2000);
    }
    
}

function reloadQuizz() {
    
    makeGet(`/quizzes/${justIdQuizz}`, 'singleQuizz');
}

function showResultsQuizz() {
    
    let result = Math.round((correctAnswer / numberTotalQuestions) * 100);
    let levelsQuizz = quizzToPlay.levels;
    let levelResultUser;
    
    let valuesLevelsResult = levelsQuizz.map((level) => level.minValue).filter((values) => values <= result);
    let maxValueResult = Math.max(...valuesLevelsResult);
    
    levelsQuizz.forEach(function(level) {
        if (level.minValue == maxValueResult) {
            levelResultUser = level;
        }
    })
    
    document.querySelector('.js-result-title').innerHTML = `${result}% de acerto: ${levelResultUser.title}`;
    document.querySelector('.js-image-result').src = levelResultUser.image;
    document.querySelector('.js-paragraph-result').innerHTML = levelResultUser.text;
    
    setTimeout((function() {
        console.log(count);
        document.querySelector(`.js-scroll${count}`).scrollIntoView(true);

        count = 0;
        numberTotalQuestions = 0;
        correctAnswer = 0;
        lastQuestion = undefined;
        quizzToPlay = undefined;

    }), 2000);
    

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


// _____________________________________________________________________________
// _____________________________________________________________________________
// _____________________________________________________________________________
// _____________________________________________________________________________

const quiz = {}
const infoGerais = document.querySelector(".info_gerais");

//const api = require("./js/script")

//informacoes gerais do quiz
function createPageCreate() {
    infoGerais.innerHTML = '';

    //HTML do quiz
    const infoQuiz =
        `
    <article class="c-forms__infos-quizz js_article">
        <h1> Comece pelo começo </h1>
        
        <div>
        <input type="text" class="js_info_titulo" placeholder="    Título do seu quizz">
        <input type="url" class="js_info_img" placeholder="    URL da imagem do seu quizz">
        <input type="text" class="js_info_qtd_perguntas" placeholder="    Quantidade de perguntas do quizz">
        <input type="text" class="js_info_qtd_niveis" placeholder="    Quantidade de níveis do quizz">
        </div>
        
    </article> 
    `
    //botao de prosseguir
    //chama a função concluirInfo
    //falta fazer passar pra proxima pagina



    infoGerais.innerHTML += infoQuiz + `<button class="js_button" onclick="concluirInfo()">Prosseguir pra criar perguntas</button>`
}
/*
//construtor do quiz - fazer ele pelas informacoes basicas do quiz
const quiz = {
    id: "meu id",
    title: "esse é o titulo do quiz",
    image: "essa é a imagem do quiz",
    questions: []
}
*/


//funcao chamada quando apertar o botao
function concluirInfo() {
    //criar um quiz
    

    //criar uma lista para validar se os inputs estao dentro do esperado
    const validacaoFuncao = [false, false, false, false]

    //pegar os valores dos inputs e colocar em variaveis
    const tituloQuiz = document.querySelector(".js_info_titulo").value
    const urlImagemInfo = document.querySelector(".js_info_img").value
    const qtdPerguntas = Number(document.querySelector(".js_info_qtd_perguntas").value)
    const qtdLevels = Number(document.querySelector(".js_info_qtd_niveis").value)


    //ver se as variaveis passam nos criterios estabelecidos
    if (tituloQuiz.length >= 20 && tituloQuiz.length <= 65) {
        validacaoFuncao[0] = true
    }


    if (urlImagemInfo.includes(".jpg")) {
        validacaoFuncao[1] = true
    }

    if (qtdPerguntas >= 1) {
        validacaoFuncao[2] = true
    }

    if (qtdLevels >= 2) {
        validacaoFuncao[3] = true
    }

    //ver se existe algum elemento que nao passou nos criterios
    if (validacaoFuncao.some(elem => elem === false)) {
        alert("Você colocou um dado invalido, os dados devem ter:\nO titulo precisa ter entre 20 a 65 caracteres\nO url da imagem precisa ser valido\nO numero de perguntas precisa ser maior que 2\nO numero de niveis precisa ser mais que 1")
    } else {

        //adicionar essas variaveis no objeto quizz se elas passaram nos criterios
        quiz.title = tituloQuiz
        quiz.image = urlImagemInfo
        quiz.questions = qtdPerguntas
        quiz.levels = qtdLevels


        //teste
        console.log("info gerais do quiz ", quiz);
        
        //funçao para fazer as perguntas
        fazerPerguntas()
    }
    


}



//////////////////Perguntas do quiz////////////////////////////////////



//questions = [question0, question1, ...]
let questions = [];

//answers = [answer0, answer1,...]
let answers = [];

//alerta de erro
let alerta = ""



const formulario = document.querySelector(".perguntas")


function fazerPerguntas() {
    console.log('AAAAAAAAAAAAA')
    //pq nao ta escondendo o quiz?
    infoGerais.style.display = 'none';
    formulario.innerHTML += `<h1 class="crie_perguntas_txt">Crie suas perguntas</h1>`
    for (let i = 1; i < quiz.questions + 1; i++) {

        //construindo os modelos de pergunta, resposta certa e resposta errada

        formulario.innerHTML += `
        <article class="c-forms__forms-questions js_article pergunta${i}">


        
        <div>
            <label> Pergunta ${i} </label>
            <input type="text" class="js_texto_pergunta" placeholder="Texto da pergunta">
            <input type="text" class="js_cor_pergunta" placeholder="Cor de fundo da pergunta">
        </div>

        <div>
            <label>Resposta correta</label>
            <input type="text" class="js_texto_resposta correta" placeholder="Resposta correta">
            <input type="url" class="js_url_img_resposta correta" placeholder="URL da imagem">
        </div>
    
        <div>
            <label> Respostas incorretas </label>
            <input type="text" class="js_texto_resposta incorreta1" placeholder="Resposta incorreta 1">
            <input type="url" class="js_url_img_resposta incorreta1" placeholder="URL da imagem 1">
        </div>

        <div>
            <input type="text" class="js_texto_resposta incorreta2" placeholder="Resposta incorreta 2">
            <input type="url" class="js_url_img_resposta incorreta2" placeholder="URL da imagem 2">
        </div>
        
        <div>
            <input type="url" class="js_url_img_resposta incorreta3" placeholder="URL da imagem 3">
            <input type="text" class="js_texto_resposta incorreta3" placeholder="Resposta incorreta 3">
        </div>

    </article> 
    `
    }

    //adcionar butao com funcao de concluir as perguntas
    formulario.innerHTML += `<button class="js_button" onclick="concluirQuestions()">Prosseguir pra criar níveis</button>`
}


//criar uma variavel para controlar se os criterios foram atendidos
let = true;

function createRightAnswer(numero) {

    const answer = {}

    //criar as variaveis com os inputs das respostaas
    const textoResposta = document.querySelector(`.pergunta${numero} > div > .js_texto_resposta.correta`)
    const urlResposta = document.querySelector(`.pergunta${numero} > div > .js_url_img_resposta.correta`)

    //conferir criterios
    if (textoResposta.value !== "") {
        answer.text = textoResposta.value
        validacaoResposta = true

    } else {
        alerta += "resposta correta: você precisa escrever algo"
        validacaoResposta = false
    }

    //nao tenho certeza ainda
    if (urlResposta.value.includes(".jpg")) {
        answer.image = urlResposta.value
    } else {
        alerta += "\nvoce nao colocou um URL valido"
        validacaoResposta = false
    }

    answer.isCorrectAnswer = true
    //adicionar na lista de respostas
    answers.push(answer)

    //teste
    console.log("validacao certa:" + validacaoResposta)
    console.log("lista de resposta certa: ", answers)
}



function createWrongAnswer(numero) {



    for (let i = 1; i <= 3; i++) {

        let answer = {}
        //criar as variaveis com os inputs das respostas

        const textoResposta = document.querySelector(`.pergunta${numero} > div > .js_texto_resposta.incorreta${i}`)
        const urlResposta = document.querySelector(`.pergunta${numero} > div > .js_url_img_resposta.incorreta${i}`)

        //conferir criterios
        if (textoResposta.value !== "") {
            answer.text = textoResposta.value
            validacaoResposta = true

        } else {
            alerta += `\nresposta errada numero ${i}:você precisa escrever algo para a resposta`
            validacaoResposta = false
        }

        //nao tenho certeza ainda
        if (urlResposta.value.includes(".jpg")) {
            answer.image = urlResposta.value
        } else {
            alerta += `\nresposta errada numero ${i}:voce nao colocou um URL valido`
            validacaoResposta = false
        }

        answer.isCorrectAnswer = false
        //adicionar na lista de respostas
        answers.push(answer)


    }


    //teste
    console.log("validacao errada:" + validacaoResposta)
    console.log("lista de resposta errada: ", answers)

}




//a funcao pega o texto e cor dos inputs e junta com a lista das respostas para gerar o objeto questao e colocá-lo na lista questoes
//a funcao retorna true ou false para garantir que os criterios que nao passem, nao entrem no quiz
function createQuestion(numero) {

    const question = {}

    //criar as variaveis com os inputs das perguntas
    const textoPergunta = document.querySelector(`.pergunta${numero} > div > .js_texto_pergunta`);
    const corPergunta = document.querySelector(`.pergunta${numero} > div > .js_cor_pergunta`);

    //condição para o textoPergunta ter mais de 20 caracteres, se True fazer o objeto com a questão
    if (textoPergunta.value.length >= 20) {
        question.title = textoPergunta.value //pelo menos 20 caracteres
    } else {
        alerta += "\no texto da pergunta deve ter pelo menos 20 caracteres"
        return false
    }

    if (corPergunta.value !== "" && corPergunta.value.length <= 6) {
        let testeCor = "0123456789abcdef"
        let validacaoCor = true
        for (let i = 0; i < corPergunta.value.length; i++) {
            validacaoCor = testeCor.includes(corPergunta.value[i])
            if (validacaoCor === false) {
                alerta += "\nvoce nao colocou uma cor valida"
                return false
                break
            } else {
                question.color = "#"+corPergunta.value //cor hexagonal
            }
        }
    } else {
        return false
    }



    console.log("question" + question)


    if (answers.length >= 2 && answers.length <= 4) {
        //criar dois contadores para garantir as condiçoes de resposta
        let correto = 0
        let incorreto = 0

        //rodar a lista de resposta e ver se tem resposta certa e errada
        for (let i = 0; i < answers.length; i++) {
            if (answers[i].isCorrectAnswer === true) {
                correto += 1
            } else {
                incorreto += 1
            }
        }

        if (correto === 1 && incorreto > 0) {
            question.answers = answers

            questions.push(question)
        } else {
            alerta += "\nVocê não escreveu um numero correto de respostas corretas e incorretas"
            return false
        }


    }
    if (validacaoResposta === false) {
        return false
    }


    console.log("lista de questoes", questions)
    return true
}

//chamada quando aperta o botao
function concluirQuestions() {


    for (let i = 1; i < quiz.questions + 1; i++) {

        createRightAnswer(i)
        createWrongAnswer(i)
        //chama a funcao createQuestion e pega o valor retornado na variavel (true/false)
        validacao = createQuestion(i)
        answers = []


    }

    if (validacao === true) {

        quiz.questions = questions

        //teste
        console.log("esse é o obj questions: ", questions)
        console.log("esse é o obj quiz: ", quiz)

        createLevel()
    } else {
        alert(alerta)
    }



}



//niveis dos quiz

/*
levels: [
    {
        title: "Título do nível 1",
        image: "https://http.cat/411.jpg",
        text: "Descrição do nível 1",
        minValue: 0
    },
    {
        title: "Título do nível 2",
        image: "https://http.cat/412.jpg",
        text: "Descrição do nível 2",
        minValue: 50
    }
]

level:{
    title: "Título do nível 1",
    image: "https://http.cat/411.jpg",
    text: "Descrição do nível 1",
    minValue: 0
}


*/

//pedaço do HTML 
const pagLevel = document.querySelector(".niveis")

//chamada quando partar o botao da sessao de perguntas
function createLevel() {
    formulario.innerHTML = ""
    pagLevel.innerHTML = `<h1 class"crie_perguntas_txt">Agora, decida os níveis</h1>`
    for (let i = 1; i < quiz.levels + 1; i++) {

        //construindo os modelos de pergunta, resposta certa e resposta errada

        pagLevel.innerHTML += `
        <article class="js_article">
    
            <label> Nível ${i} </label>
            <div class="nivel${i}"> 
            <input type="text" class="js_texto_nivel" placeholder="Título do nível">
            <input type="text" class="js_porcentagem_nivel" placeholder="% de acerto da pergunta">
            <input type="url" class="js_url_img_nivel" placeholder="URL da imagem do nivel">
            <input type="text" class="js_desc_nivel" placeholder="Resposta correta">
            </div>
        </article> 
        `
    }
    //adcionar butao com funcao de concluir as perguntas
    pagLevel.innerHTML += `<button class="js_button" onclick="verifyLevels()">Finalizar quiz</button>`
}

// levels = [level0, level1, level2, ...]
let levels = []

//obj com info do level
let level = {}

//variavel para garantir que os criterios sejam seguidos
let validacaoLevel = true


let alertaNivel = ""

function verifyLevels() {

    //criando variaveis com dados dos inputs, e refazendo isso para cada nivel
    for (let i = 1; i < quiz.levels + 1; i++) {
        const textoLevel = document.querySelector(`.nivel${i} > .js_texto_nivel`).value
        const porcentagemLevel = Number(document.querySelector(`.nivel${i} > .js_porcentagem_nivel`).value)
        const urlLevel = document.querySelector(`.nivel${i} > .js_url_img_nivel`).value
        const descLevel = document.querySelector(`.nivel${i} > .js_desc_nivel`).value


        //Criterios pre-estabelecidos
        //1° texto
        if (textoLevel.length >= 10) {
            level.title = textoLevel
            validacaoLevel = true
        } else {
            alertaNivel += "\nvoce colocou menos de 10 caracteres no texto do nivel"
            validacaoLevel = false
        }

        //2°porcentagem
        if (porcentagemLevel > 0 && porcentagemLevel < 100) {
            level.minValue = porcentagemLevel
            validacaoLevel = true
        } else {
            alertaNivel += "\nvoce colocou um numero que nao faz sentido como porcentagem"
            validacaoLevel = false
        }

        //3°url da img
        if (urlLevel.includes(".jpg")) {
            level.image = urlLevel
            validacaoLevel = true
        } else {
            alertaNivel += "\nvoce nao colocou um URL valido"
            validacaoLevel = false
        }

        //4° descricao do Level
        if (descLevel.length >= 30) {
            level.text = descLevel
            validacaoLevel = true
        } else {
            alertaNivel += "\nvoce colocou menos que 30 caracteres como descrição do nivel"
            validacaoLevel = false
        }

        //avaliar se os dados passaram nos criterios
        if (validacaoLevel === true) {
            levels.push(level)
            level = {}
        } else {
            alert(alerta)
        }
    }

    //add no obj o a lista de levels
    quiz.levels = levels


    endQuiz()

    //teste
    console.log("essa é a lista de niveis" + levels)

    //teste quiz
    console.log("quiz: " + quiz)
}


//finaliza o quiz
function endQuiz() {

    let templateURL = 'https://mock-api.driven.com.br/api/v4/buzzquizz';
    ////posta o quiz no servidor
    //api.makePost("/quizzes",quiz)
    ////carrega a pagina de sucesso do quiz
    carregarSucesso()


}

/////////////////Sucesso do quiz ///////////////////////


const sucessoQuiz = document.querySelector(".sucesso")
function carregarSucesso(){
pagLevel.innerHTML = ""

sucessoQuiz.innerHTML+=
`
<h1>Seu quizz está pronto!</h1>
-q
<p>Voltar a home</p>
`
//ainda dentro das aspas - colcoar no lugar do -q
// colocar para ver o quiz
//botao de acessar o quiz
}