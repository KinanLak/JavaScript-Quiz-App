const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')



let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
	currentQuestionIndex++
	setNextQuestion()
})

function startGame() {
	startButton.classList.add('hide')
	shuffledQuestions = questions.sort(() => Math.random() - .5)
	currentQuestionIndex = 0
	questionContainerElement.classList.remove('hide')
	setNextQuestion()
}

function setNextQuestion() {
	resetState()
	showQuestion(shuffledQuestions[currentQuestionIndex])
	showAnswer(shuffledQuestions[currentQuestionIndex])
}



function showQuestion(question) {
	new TypeIt("#question", {
		strings: question.question,
		speed: 30,
		cursorChar: "|",
		loop: false,
	}).go();
}

function showAnswer(question) { 
	var i = 0;
	question.answers.forEach(answer => {
		const button = document.createElement('button')
		button.classList.add('btn')
		
		button.innerText = answer.text
		if (answer.correct) {
			button.dataset.correct = answer.correct
		}
		button.addEventListener('click', selectAnswer)
		answerButtonsElement.appendChild(button)
		i++;
	})
}

function resetState() {
	clearStatusClass(document.body)
	nextButton.classList.add('hide')
	while (answerButtonsElement.firstChild) {
		answerButtonsElement.removeChild(answerButtonsElement.firstChild)
	}
}

function selectAnswer(e) {
	const selectedButton = e.target
	const correct = selectedButton.dataset.correct
	setStatusClass(document.body, correct)
	Array.from(answerButtonsElement.children).forEach(button => {
		setStatusClass(button, button.dataset.correct)
	})
	if (shuffledQuestions.length > currentQuestionIndex + 1) {
		nextButton.classList.remove('hide')
	} else {
		startButton.innerText = 'Recommencer'
		startButton.classList.remove('hide')
	}
}

function setStatusClass(element, correct) {
	clearStatusClass(element)
	if (correct) {
		element.classList.add('correct')
	} else {
		element.classList.add('wrong')
	}
}

function clearStatusClass(element) {
	element.classList.remove('correct')
	element.classList.remove('wrong')
}

const questions = [
	{
		question: "Quand j'étais petit(e) je faisais la collection des fèves de galette des rois. Un jour j'en avale une sans faire exprès (une petite fève) du coup j'ai attendu de faire caca et je l'ai récupéré, nettoyé et mise dans ma collection au-dessus de mon lit.",
		answers: [
			{ text: 'La Dinde', correct: false },
			{ text: 'Frigiel', correct: false },
			{ text: 'Masterclass', correct: false },
			{ text: 'Kaatsup', correct: false },
			{ text: 'Bamato', correct: false },
			{ text: 'Logames', correct: true },
			{ text: 'Fireship', correct: false },
			{ text: 'Inoxtag', correct: false },
			{ text: 'Joueur du Grenier', correct: false },
			{ text: "C'est Clara", correct: false },

		]
	},
]