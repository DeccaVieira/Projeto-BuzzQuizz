import "script.js"

/*

//construtor do quiz
const quiz = {
    title: "titulo",
    image: "imagem",
    questions: []
}

//construto de questão
const question = {
    title: "titulo", //pelo menos 20 caracteres
    color: "cor", //cor hexagonal
    answers: []
}

//construtor de reposta
const answer = {
    text: "texto da resposta_x", //!== ""
    image: "URL da resposta_x", //must be url
    isCorrectAnswer: "boolean" //pelo menos uma answer tem que ser a correta
}

usar esse pedaço do HTML
const formulario = document.querySelector(".c-forms")

*/


//questions = [question0, question1, ...]
const questions = []

//answers = [answer0, answer1,...]
const answers = []

//objetos vazios
const question = {}
const answer = {}


const pergunta =
    `
<article>
    <label Pergunta ></label>
    <input type="text" class="js_texto_pergunta" placeholder="Título da pergunta">
    <input type="text" class="js_cor_pergunta" placeholder="Cor de fundo da pergunta">
</article> 
`

const resposta_correta =
    `
<article>
    <label Resposta correta></label>
    <input type="text" class="js_texto_resposta correta" placeholder="Título da resposta correta">
    <input type="url" class="js_url_img_resposta correta" placeholder="URL da imagem">
</article> 
`


const resposta_incorreta =
    `
<article>
    <label Resposta incorreta></label>
    <input type="text" class="js_texto_resposta incorreta" placeholder="Título da resposta incorreta">
    <input type="url" class="js_url_img_resposta incorreta" placeholder="URL da imagem">
</article> 
`

function creatRightAnswer() {

    //criar as variaveis com os inputs das respostaas
    const textoResposta = document.querySelector('.correta')
    const urlResposta = document.querySelector('.correta')

    if (textoResposta.value !== "") {
        answer.text = textoResposta, //!== ""
        answer.image = urlResposta, //must be url
        answer.isCorrectAnswer = true //pelo menos uma answer tem que ser a correta

    } else {
        alert("você precisa escrever algo para a resposta")
    }

    answers.push(answer)
}

function creatWrongAnswer() {

    //criar as variaveis com os inputs das respostaas
    const textoResposta = document.querySelector('.incorreta')
    const urlResposta = document.querySelector('.incorreta')

    if (textoResposta.value !== "") {
        answer.text = textoResposta, //!== ""
        answer.image = urlResposta, //must be url
        answer.isCorrectAnswer = false //pelo menos uma answer tem que ser a correta

    } else {
        alert("você precisa escrever algo para a resposta")
    }

    answers.push(answer)
}


function creatTextQuestion() {

    //criar as variaveis com os inputs das perguntas
    const textoPergunta = document.querySelector('.js_texto_pergunta');
    const corPergunta = document.querySelector('.js_cor_pergunta');

    //condição para o textoPergunta ter mais de 20 caracteres, se True fazer o objeto com a questão
    if (textoPergunta.value.length >= 20) {
        question.title = textoPergunta.value, //pelo menos 20 caracteres
        question.color = corPergunta.value, //cor hexagonal
        question.answers = []


    } else {
        alert("o texto da pergunta deve ter pelo menos 20 caracteres")
    }

    return question
}

function createQuestion() {
    if (answers.length >= 2 && answers.length <= 4) {
        //criar dois contadores para garantir as condiçoes de resposta
        let correto = 0
        let incorreto = 0

        //rodar a lista de resposta e ver se tem resposta certa e errada
        for (let i = 0; i < answers.length; i++) {
            if (answers[i].isCorrectAnswer == true) {
                correto += 1
            } else {
                incorreto += 1
            }
        }

        if (correto === 1 && incorreto > 0) {
            question.answers = answers
        } else {
            alert("Você não escreveu a respota correta ou não escreveu o numero suficiente de incorretas")
        }

    }
    questions.push(question)
}