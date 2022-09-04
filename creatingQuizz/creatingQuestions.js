//informacoes gerais do quiz

const infoGerais = document.querySelector(".info_gerais")

//HTML do quiz
const infoQuiz =
    `
<article class="js_article">
    <h1> Comece pelo começo </h1>
    
    <input type="text" class="js_info_titulo" placeholder="Título do seu quizz">
    <input type="text" class="js_info_img" placeholder="URL da imagem do seu quizz">
    <input type="text" class="js_info_qtd_perguntas" placeholder="Quantidade de perguntas do quizz">
    <input type="text" class="js_info_qtd_niveis" placeholder="Quantidade de níveis do quizz">
    
    
</article> 
`
//botao de prosseguir
//chama a função concluirInfo
//falta fazer passar pra proxima pagina



infoGerais.innerHTML += infoQuiz + `<button class="js_button" onclick="concluirInfo()">Prosseguir pra criar perguntas</button>`

/*
//construtor do quiz - fazer ele pelas informacoes basicas do quiz
const quiz = {
    id: "meu id",
    title: "esse é o titulo do quiz",
    image: "essa é a imagem do quiz",
    questions: []
}
*/

const quiz = { id: "meu id" }

//funcao chamada quando apertar o botao
function concluirInfo() {
    //criar um quiz


    //criar uma lista para validar se os inputs estao dentro do esperado
    const validacaoFuncao = [false, true, false, false]

    //pegar os valores dos inputs e colocar em variaveis
    const tituloQuiz = document.querySelector(".js_info_titulo").value
    const urlImagemInfo = document.querySelector(".js_info_img").value
    const qtdPerguntas = Number(document.querySelector(".js_info_qtd_perguntas").value)
    const qtdNiveis = Number(document.querySelector(".js_info_qtd_niveis").value)


    //ver se as variaveis passam nos criterios estabelecidos
    if (tituloQuiz.length >= 20 && tituloQuiz.length <= 65) {
        validacaoFuncao[0] = true
    }

    //nao tenho certeza ainda
    //if(typeof(urlImagemInfo) === URL){
    //    validacaoFuncao[1] = true
    //}

    if (qtdPerguntas >= 1) {
        validacaoFuncao[2] = true
    }

    if (qtdNiveis >= 1) {
        validacaoFuncao[3] = true
    }

    //ver se existe algum elemento que nao passou nos criterios
    if (validacaoFuncao.some(elem => elem === false)) {
        alert("voce fez coisa errada")
    } else {

        //adicionar essas variaveis no objeto quizz se elas passaram nos criterios
        quiz.title = tituloQuiz
        quiz.image = urlImagemInfo
        quiz.questions = qtdPerguntas
        quiz.niveis = qtdNiveis


        //teste
        console.log("info gerais do quiz ", quiz)
    }

    //funçao para fazer as perguntas
    fazerPerguntas()

}



//////////////////Perguntas do quiz



//questions = [question0, question1, ...]
const questions = []

//answers = [answer0, answer1,...]
const answers = []




const formulario = document.querySelector(".perguntas")


function fazerPerguntas() {
    for (let i = 1; i < quiz.questions + 1; i++) {

        //construindo os modelos de pergunta, resposta certa e resposta errada

        formulario.innerHTML += `
    <article class="js_article">

        <label> Pergunta ${i} </label>
        <input type="text" class="js_texto_pergunta" placeholder="Texto da pergunta">
        <input type="color" class="js_cor_pergunta" placeholder="Cor de fundo da pergunta">
    

        <label>Resposta correta</label>
        <input type="text" class="js_texto_resposta correta" placeholder="Resposta correta">
        <input type="url" class="js_url_img_resposta correta" placeholder="URL da imagem">
  
    
        <label> Respostas incorretas </label>
        <input type="text" class="js_texto_resposta incorreta1" placeholder="Resposta incorreta 1">
        <input type="url" class="js_url_img_resposta incorreta1" placeholder="URL da imagem 1">
    
        <input type="text" class="js_texto_resposta incorreta2" placeholder="Resposta incorreta 2">
        <input type="url" class="js_url_img_resposta incorreta2" placeholder="URL da imagem 2">
    
        <input type="text" class="js_texto_resposta incorreta3" placeholder="Resposta incorreta 3">
        <input type="url" class="js_url_img_resposta incorreta3" placeholder="URL da imagem 3">
    
    </article> 
    `
    }

    //adcionar butao com funcao de concluir as perguntas
    formulario.innerHTML += `<button class="js_button" onclick="concluirQuestions()">Prosseguir pra criar níveis</button>`
}




function createRightAnswer() {

    const answer = {}

    //criar as variaveis com os inputs das respostaas
    const textoResposta = document.querySelector('.js_texto_resposta.correta')
    const urlResposta = document.querySelector('.js_url_img_resposta.correta')

    //conferir criterios
    if (textoResposta.value !== "") {
        answer.text = textoResposta.value

    } else {
        alert("você precisa escrever algo para a resposta")
    }

    //nao tenho certeza ainda
    //if(typeof(urlResposta) === URL){
    answer.image = urlResposta.value
    //}else{
    //    alert("voce nao colocou um URL valido")
    //}

    answer.isCorrectAnswer = true
    //adicionar na lista de respostas
    answers.push(answer)

    //teste
    console.log("lista de resposta certa: ", answers)
}


//como chamar a funcao para varias perguntas?
function createWrongAnswer() {



    for (let i = 1; i <= 3; i++) {

        const answer = {}
        //criar as variaveis com os inputs das respostas

        const textoResposta = document.querySelector(`.js_texto_resposta.incorreta${i}`)
        const urlResposta = document.querySelector(`.js_url_img_resposta.incorreta${i}`)

        //conferir criterios
        if (textoResposta.value !== " ") {
            answer.text = textoResposta.value

        } else {
            alert("você precisa escrever algo para a resposta")
        }

        //nao tenho certeza ainda
        //if(typeof(urlResposta) === URL){
        answer.image = urlResposta.value
        //}else{
        //    alert("voce nao colocou um URL valido")
        //}

        answer.isCorrectAnswer = false
        //adicionar na lista de respostas
        answers.push(answer)

    }


    //teste
    console.log("lista de resposta errada: ", answers)

}


const question = {}


function createTextQuestion() {


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
    console.log("lista de questao: " + question)
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

            questions.push(question)
        } else {
            alert("Você não escreveu a respota correta ou não escreveu o numero suficiente de incorretas")
        }
        

    }

    console.log("lista de questoes", questions)
}


function concluirQuestions() {


    for (let i = 0; i < quiz.questions; i++) {

        createRightAnswer()
        createWrongAnswer()
        createTextQuestion()
        createQuestion()

    }
    

    console.log("esse é o obj questions: ", questions)
    quiz.questions = questions
    console.log("esse é o obj quiz: ", quiz)
    fazerNiveis()
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
const pagNiveis = document.querySelector(".niveis")
const niveis = []
const nivel = {}

function fazerNiveis() {
    for (let i = 1; i < quiz.niveis + 1; i++) {

        //construindo os modelos de pergunta, resposta certa e resposta errada

        pagNiveis.innerHTML += `
        <article class="js_article">
    
            <label> Nível ${i} </label>
            <input type="text" class="js_texto_nivel" placeholder="Título do nível">
            <input type="text" class="js_porcentagem_nivel" placeholder="% de acerto da pergunta">
            <input type="url" class="js_url_img_nivel" placeholder="URL da imagem do nivel">
            <input type="text" class="js_desc_nivel" placeholder="Resposta correta">
            
        </article> 
        `
    }
    //adcionar butao com funcao de concluir as perguntas
    pagNiveis.innerHTML += `<button class="js_button" onclick="concluirQuestions()">Finalizar quiz</button>`
}

function VerificarNiveis() {

    for (let i = 1; i < quiz.niveis + 1; i++) {
        const textoNivel = document.querySelector(`.js_texto_nivel${i}`).value
        const porcentagemNivel = document.querySelector(`.js_porcentagem_nivel${i}`).value
        const urlNivel = document.querySelector(`.js_url_img_nivel${i}`).value
        const descNivel = document.querySelector(`.js_desc_nivel${i}`).value


        //1° texto
        if (textoNivel.length <= 10) {
            nivel.text = textoNivel
        } else {
            alert("voce colocou menos de 10 caracteres")
        }

        //2°porcentagem
        if (porcentagemNivel > 0 && porcentagemNivel < 100) {
            nivel.minValue = porcentagemNivel
        } else {
            alert("voce colocou um numero que faz sentido")
        }

        //3°url da img
        nivel.image = urlNivel

        //4° descricao do nivel
        if (descNivel.length <= 65) {
            nivel.text = descNivel
        } else {
            alert("voce colocou menos letras do que deveria")
        }
        niveis.push(nivel)
    }
    quiz.niveis = niveis

    //teste
    console.log(niveis)

    //teste quiz
    console.log(quiz)
}