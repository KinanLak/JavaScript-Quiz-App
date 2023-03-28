
const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const hintButton = document.getElementById('hint-btn')


let score = 0;
let shuffledQuestions, currentQuestionIndex

window.onload = function () {
	document.body.className += " loaded";
}



hintButton.addEventListener('click', showContexte)
startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
	currentQuestionIndex++
	setNextQuestion()
})

function startGame(e) {
	if (e.target.innerText == "Recommencer") {
		location.reload()
	}
	startButton.classList.add('hide')
	shuffledQuestions = questions
	currentQuestionIndex = 0
	questionContainerElement.classList.remove('hide')
	setNextQuestion()
	score = 0;

	document.getElementById('score-container').classList.remove('hide2')
	document.getElementById('score').innerHTML = "Score : " + score;
	document.getElementById('score-mark').innerHTML = "/" + shuffledQuestions.length;
}

function setNextQuestion() {
	resetState()
	document.getElementById('index').classList.remove('hide')
	document.getElementById('index').innerHTML = "Anecdote " + (currentQuestionIndex + 1) + " / " + shuffledQuestions.length;
	showQuestion(shuffledQuestions[currentQuestionIndex])
	showAnswer(shuffledQuestions[currentQuestionIndex])
}


function showContexte() {
	document.getElementById("dialog-confirm").classList.remove('hide')

	context = shuffledQuestions[currentQuestionIndex].context

	links = shuffledQuestions[currentQuestionIndex].links
	for (var i = 0; i < links.length; i++) {
		if (i == 0) {
			context += '<hr></hr>'
		} else {
			context += ''
		}
		link = links[i]
		cleanLink = link.replace("https://www.", "")
		context += '<p><a style="color: blue;" href="' + links[i] + '" target="_blank"> Lien ' + (i + 1) + '</a></p>'
	}

	document.getElementById("dialog-confirm").innerHTML = context
	$("#dialog-confirm").dialog({
		resizable: false,
		height: "auto",
		width: 400,
		modal: true,
		buttons: {
			"Ok": function () {
				$(this).dialog("close");
			}
		}
	});
};

function showQuestion(question) {
	questionElement.innerText = question.question
}

function showAnswer(question) {
	var i = 0;
	question.answers.forEach(answer => {
		const button = document.createElement('button')
		button.classList.add('btn')
		button.id = i;

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
	hintButton.classList.add('hide')
	while (answerButtonsElement.firstChild) {
		answerButtonsElement.removeChild(answerButtonsElement.firstChild)
	}
}

const delay = ms => new Promise(res => setTimeout(res, ms));

async function selectAnswer(e) {
	const selectedButton = e.target
	const correct = selectedButton.dataset.correct

	if (!correct) {
		selectedButton.classList.add('wrong-selected')
	}

	if (correct && !(selectedButton.classList.contains('clicked'))) {
		score++;
		document.getElementById('score').innerHTML = "Score : " + score;
	}

	setStatusClass(document.body, correct)
	Array.from(answerButtonsElement.children).forEach(button => {
		setStatusClass(button, button.dataset.correct)
	})

	if (shuffledQuestions.length > currentQuestionIndex + 1) {
		nextButton.classList.remove('hide')
		hintButton.classList.remove('hide')

	} else {
		startButton.innerText = "Recommencer"
		
		await delay(1500);
		showContexte();
		await delay(5000);


		questionContainerElement.classList.add('hide')
		document.getElementById('score-container').classList.add('score-end')
		document.getElementById('score-mark').classList.add('score-mark-end')
		document.getElementById('watermark').classList.remove('hide')
		document.getElementById('index').classList.add('hide')
		startButton.classList.remove('hide')
		// Add to the header div the class end
		document.querySelector('header').classList.add('end')

	}
}

function setStatusClass(element, correct) {
	clearStatusClass(element)
	if (correct) {
		element.classList.add('correct')
		element.classList.add('clicked')

	} else {
		element.classList.add('wrong')
	}


}

function clearStatusClass(element) {
	element.classList.remove('correct')
	element.classList.remove('wrong')
	element.classList.remove('correct-selected')
	element.classList.remove('clicked')
}

const questionstemp = [
	{
		question: "Anecdote blaablaaaablablaablaaaablablaablaaaablablaablaaa ablablaablaaaablablaablaaaablablaablaaaabl ablaablaaaablablaablaaaablablaablaaaablablaabla aaablablaablaaaabla",
		answers: [
			{ text: 'YouTubeur #0', correct: true },
			{ text: 'YouTubeur #1', correct: false },
			{ text: 'YouTubeur #2', correct: false },
			{ text: 'YouTubeur #3', correct: false },
			{ text: 'YouTubeur #4', correct: false },
			{ text: 'YouTubeur #5', correct: false },
			{ text: 'YouTubeur #6', correct: false },
			{ text: 'YouTubeur #7', correct: false },
			{ text: 'YouTubeur #8', correct: false },
			{ text: 'YouTubeur #9', correct: false },
		],
		context: "Il faut savoir que kalina est vraiment très nulle à minecraft par exemple en bedwars elle saute souvent dans le vide et perd tout le stuff qu'elle a mis 30 minutes à obtenir (exemple ici [1]) et c'est pour ça qu'elle préfère les survies minecraft mais on juge pas c cool ^^",
		links: ["https://www.youtube.com/watch?v=dQw4w9WgXcQ"]
	},
	{
		question: "Anecdote blaablaaaablablaablaaaablablaablaaaablablaablaaa ablablaablaaaablablaablaaaablablaablaaaabl ablaablaaaablablaablaaaablablaablaaaablablaabla aaablablaablaaaabla",
		answers: [
			{ text: 'YouTubeur #0', correct: true },
			{ text: 'YouTubeur #1', correct: false },
			{ text: 'YouTubeur #2', correct: false },
			{ text: 'YouTubeur #3', correct: false },
			{ text: 'YouTubeur #4', correct: false },
			{ text: 'YouTubeur #5', correct: false },
			{ text: 'YouTubeur #6', correct: false },
			{ text: 'YouTubeur #7', correct: false },
			{ text: 'YouTubeur #8', correct: false },
			{ text: 'YouTubeur #9', correct: false },
		],
		context: "Il faut savoir que kalina est vraiment très nulle à minecraft par exemple en bedwars elle saute souvent dans le vide et perd tout le stuff qu'elle a mis 30 minutes à obtenir (exemple ici [1]) et c'est pour ça qu'elle préfère les survies minecraft mais on juge pas c cool ^^",
		links: ["https://www.youtube.com/watch?v=dQw4w9WgXcQ"]
	},
	{
		question: "Anecdote blaablaaaablablaablaaaablablaablaaaablablaablaaa ablablaablaaaablablaablaaaablablaablaaaabl ablaablaaaablablaablaaaablablaablaaaablablaabla aaablablaablaaaabla",
		answers: [
			{ text: 'YouTubeur #0', correct: true },
			{ text: 'YouTubeur #1', correct: false },
			{ text: 'YouTubeur #2', correct: false },
			{ text: 'YouTubeur #3', correct: false },
			{ text: 'YouTubeur #4', correct: false },
			{ text: 'YouTubeur #5', correct: false },
			{ text: 'YouTubeur #6', correct: false },
			{ text: 'YouTubeur #7', correct: false },
			{ text: 'YouTubeur #8', correct: false },
			{ text: 'YouTubeur #9', correct: false },
		],
		context: "Il faut savoir que kalina est vraiment très nulle à minecraft par exemple en bedwars elle saute souvent dans le vide et perd tout le stuff qu'elle a mis 30 minutes à obtenir (exemple ici [1]) et c'est pour ça qu'elle préfère les survies minecraft mais on juge pas c cool ^^",
		links: ["https://www.youtube.com/watch?v=dQw4w9WgXcQ"]
	},
]


const questions = [
	{
		question: "Dans le cadre d'une OP qui n'a jamais vu le jour, je me suis baigné en sous-vêtements avec Davidlafarge dans une source chaude naturelle en Islande. Il faisait 0 degré, et nous n'avions ni serviettes ni habits de rechange...",
		answers: [
			{ text: 'Amixem', correct: false },
			{ text: 'Théa', correct: false },
			{ text: 'Squeezie', correct: false },
			{ text: 'Léna Situation', correct: false },
			{ text: 'Djilsi', correct: false },
			{ text: 'Frigiel', correct: true },
			{ text: 'Pidi', correct: false },
			{ text: 'Mastu', correct: false },
			{ text: 'Natoo', correct: false },
			{ text: 'Bouzi', correct: false }
		],
		context: "C'est Frigiel directement qui a raconté cette anecdote dans le formulaire, il va falloir lui demander si vous voulez en savoir plus...",
		links: []
	},
	{
		question: "En voyage à la réunion, on décide de se baigner au pied d’escaliers en pierre. Je m’assois tranquillement sur la dernière marche, les pieds dans l’eau. Je me prends une grosse vague dans la tronche, ça faisait à peu près 4 secondes que j’étais assis(e). J’essaye de me rattraper, par réflexe, avec une de mes mains. Je me casse le doigt. En rentrant, plus tard, on me dit qu’il faut m’opérer pour éviter que mon doigt se solidifie dans cette position. L’opération s’est bien passée. Je décide ensuite de demander un avis à un spécialiste de la main : des études ont été faites et l’opération ne sert à rien. Une attelle suffisait. Je me fais opérer une deuxième fois car il faut retirer les broches de mon doigt au plus vite pour éviter une infection et commencer la rééducation. Voilà, j’ai été opéré 2 fois, pour rien.",
		answers: [
			{ text: 'Amixem', correct: false },
			{ text: 'Théa', correct: false },
			{ text: 'Squeezie', correct: false },
			{ text: 'Léna Situation', correct: false },
			{ text: 'Djilsi', correct: false },
			{ text: 'Frigiel', correct: false },
			{ text: 'Pidi', correct: false },
			{ text: 'Mastu', correct: false },
			{ text: 'Natoo', correct: true },
			{ text: 'Bouzi', correct: false }
		],
		context: "Natoo a raconté cette petite expérience il y a 5 mois, dans cette vidéo [Lien 1].",
		links: ["https://www.youtube.com/watch?v=JLkl6mSAUA0"]
	},
	{
		question: "Quand j'étais petit(e) je faisais la collection des fèves de galette des rois. Un jour j'en avale une sans faire exprès (une petite fève) du coup j'ai attendu de faire caca et je l'ai récupéré, nettoyé et mise dans ma collection au-dessus de mon lit.",
		answers: [
			{ text: 'Amixem', correct: false },
			{ text: 'Théa', correct: false },
			{ text: 'Squeezie', correct: false },
			{ text: 'Léna Situation', correct: false },
			{ text: 'Djilsi', correct: false },
			{ text: 'Frigiel', correct: false },
			{ text: 'Pidi', correct: false },
			{ text: 'Mastu', correct: false },
			{ text: 'Natoo', correct: false },
			{ text: 'Bouzi', correct: true }
		],
		context: "Bouzi nous a raconté sa petite histoire depuis le formulaire également, pas plus de détails mais l'histoire est assez claire!",
		links: []
	},
	{
		question: "On est le 22 avril 2016. J'avais 5000 abonnés. Avec des potes on décide de sortir le soir vers 22h en voiture. On roulait aux limites autorisées, on discutait, on chantait. On voit au loin 2 yeux qui brillent sur le bord de la route. C'est un animal proche donc mon pote qui conduit se décale un peu pour ne pas prendre de risque. Arrivé à son niveau, l'animal, qui s'est avéré être une biche, se précipite sur la route. Impossible de l'éviter, on la percute. Avec le choc la voiture commence à faire des zig-zags, on perd le contrôle, on fait des tonneaux et on se retrouve dans le fossé de façon très violente. Heureusement tout le monde va bien. Simplement on est bloqué et on commence à sentir une odeur d'essence. On panique et on a peur que la voiture explose. Finalement on arrive à sortir, puis une voiture qui passait a pu appeler les secours. Bref, j’ai vu ma vie défiler ce jour-là.",
		answers: [
			{ text: 'Amixem', correct: false },
			{ text: 'Théa', correct: false },
			{ text: 'Squeezie', correct: false },
			{ text: 'Léna Situation', correct: false },
			{ text: 'Djilsi', correct: false },
			{ text: 'Frigiel', correct: false },
			{ text: 'Pidi', correct: false },
			{ text: 'Mastu', correct: true },
			{ text: 'Natoo', correct: false },
			{ text: 'Bouzi', correct: false }
		],
		context: "Mastu a raconté son accident il y a 4 ans, dans cette vidéo [Lien 1]. C'était à l'époque la chose la plus traumatisante qu'il ait vécu! Il a expliqué que c'est la première fois de sa vie où il a eu peur de mourir. On peut voir une photo de la voiture après l'accident ici [Lien 2]. Depuis ce jour là, il a décidé de vivre sans aucun regrets.",
		links: ["https://www.youtube.com/watch?v=iEP_8XvHXhk&t=693s", "https://www.youtube.com/watch?v=iEP_8XvHXhk&t=889s"]
	},
	{
		question: "J’étais au collège à cette époque. Il faut savoir que mes parents sont divorcés, et ma mère travaillait beaucoup donc elle avait pas toujours le temps de venir me chercher à l’école. C’était un samedi, et dans notre famille on avait une tradition, le samedi midi on mangeait du poulet. Je devais aller l'acheter. A la fin des cours, je sors de l’école pour rentrer chez moi et je vois un homme de 35-40 ans qui commence à marcher vers moi. J’avais à peu près 13 ans à ce moment. J’étais un peu impressionné(e) et pas très rassuré(e) de voir un homme que je ne connais pas se rapprocher. On sait jamais ce qui peut arriver. Il arrive à mon niveau, il me regarde et il me dit : “Bonjour mon/ma chéri(e)” dans ma tête je comprends pas ce qu’il se passe et là il enchaîne “Je suis ton père.” C’était mon daron! Je l’ai pas reconnu tout de suite car je le connaissais pas vraiment mais c’était bien lui. J’étais tellement boulversé(e) que j’ai oublié d’aller chercher le poulet… haha.",
		answers: [
			{ text: 'Amixem', correct: false },
			{ text: 'Théa', correct: false },
			{ text: 'Squeezie', correct: false },
			{ text: 'Léna Situation', correct: false },
			{ text: 'Djilsi', correct: false },
			{ text: 'Frigiel', correct: false },
			{ text: 'Pidi', correct: true },
			{ text: 'Mastu', correct: false },
			{ text: 'Natoo', correct: false },
			{ text: 'Bouzi', correct: false }
		],
		context: "L'anecdote de Pidi a été partagée il y a 8 mois! Dans cette vidéo [Lien 1] de FABI1.",
		links: ["https://www.youtube.com/watch?v=w1ENEPb4HU4&t=105s"]
	},
	{
		question: "J’avais 18 ans. Je parlais à une fille sur une application de rencontre depuis 1 jour. On avait un bon feeling et elle me plaisait physiquement. Elle était très entreprenante et voulait qu’on se voit dès le lendemain, chez elle dans son appartement. Une fois arrivé, je constate une petite arnaque sur les photos. Mais bon… Cette fille me fait comprendre qu’elle est pressée et qu'elle est pas là pour jouer au Uno. Sauf que j’avais pas trop envie, et elle était insistante, genre j’ai dû retirer mon tee-shirt et mes chaussures. Du coup à un moment où elle quitte la pièce, je passe par sa fenêtre et je m’accroche à son balcon. Je suis torse-nu suspendu à 4 étages de haut. Je me balance pour atterrir sur le balcon du 3ème étage. Je me retrouve face au voisin d’en dessous et lui explique la situation… il rigole et me laisse partir, je traverse toute la ville pied nu et torse-nu pour rentrer chez moi.",
		answers: [
			{ text: 'Amixem', correct: false },
			{ text: 'Théa', correct: false },
			{ text: 'Squeezie', correct: false },
			{ text: 'Léna Situation', correct: false },
			{ text: 'Djilsi', correct: true },
			{ text: 'Frigiel', correct: false },
			{ text: 'Pidi', correct: false },
			{ text: 'Mastu', correct: false },
			{ text: 'Natoo', correct: false },
			{ text: 'Bouzi', correct: false }
		],
		context: "Le petit Djilsi a raconté son aventure dans cette vidéo [Lien 1] de Mcfly et Carlito, il y a 1 an. Il précise qu'il faisait déjà beaucoup de Parkour à ce moment et que ce n'est évidemment PAS A REFAIRE, mais il savait qu'il en était capable",
		links: ["https://www.youtube.com/watch?v=zSl1xrCbCxc&t=2760s"]
	},
	{
		question: "Un jour, je suis tombé(e) en panne au Sénégal, on s'est renversé dans les dunes, fait suivre par des dealeurs de drogue avec une machette et perdu dans la forêt.",
		answers: [
			{ text: 'Amixem', correct: false },
			{ text: 'Théa', correct: true },
			{ text: 'Squeezie', correct: false },
			{ text: 'Léna Situation', correct: false },
			{ text: 'Djilsi', correct: false },
			{ text: 'Frigiel', correct: false },
			{ text: 'Pidi', correct: false },
			{ text: 'Mastu', correct: false },
			{ text: 'Natoo', correct: false },
			{ text: 'Bouzi', correct: false }
		],
		context: "Je pense qu'on a tous besoin que vous appeliez Théa MAINTENANT pour en savoir plus... elle a raconté cette histoire sur le formulaire.",
		links: []
	},
	{
		question: "Tournage de la plus grosse vidéo de ma chaîne YouTube. Un regroupement de 15 youtubeurs et plus de 100 abonnés pour l’occasion. Il y avait à peu près 75 caméras. Disons que ça nous a pris environ 20 minutes rien que pour faire les “claps” de synchronisation. C’était en été, il faisait chaud et on se trouvait sur une très grande étendue de 5 hectares, vraiment sèche. Pour les besoins de la vidéo, certaines personnes avaient des fumigènes. Une d’elle a jeté son fumigène par terre, sans savoir que les fumigènes, bah ça brûle. C’est le concept. Pour info je suis très loin de cet endroit et je ne suis pas au courant de ce qu’il se passe à ce moment. Quelques personnes tentent d’éteindre le feu comme ils peuvent mais rien à faire, ils appellent le responsable du tournage. Ce dernier a couru pour prendre un bidon et couper le feu. Il jette le contenu du bidon sur le feu. Problème, il restait de l’essence dans le bidon. Énorme gerbe de feu. Les gens commencent à paniquer. Finalement, ils trouvent les extincteurs et le feu est maîtrisé. Voilà comment on a empêché un incendie de détruire un terrain privé avec à peu près 150 personnes présentes.",
		answers: [
			{ text: 'Amixem', correct: true },
			{ text: 'Théa', correct: false },
			{ text: 'Squeezie', correct: false },
			{ text: 'Léna Situation', correct: false },
			{ text: 'Djilsi', correct: false },
			{ text: 'Frigiel', correct: false },
			{ text: 'Pidi', correct: false },
			{ text: 'Mastu', correct: false },
			{ text: 'Natoo', correct: false },
			{ text: 'Bouzi', correct: false }
		],
		context: "C'était pour sa vidéo 'BATTLE ROYAL DANS LA VRAIE VIE' datant de 2019, des abonnés utilisaient les fumigènes pour reproduire la tempête et l'un d'eux en a jeté 1 par terre sans vérifier qu'il était éteint... En plus, c'était sur un immense terrain de paintball privatisé pour le tournage, si ça avait brûlé, ça aurait été catastrophique. Il a raconté cette anecdote il y a 3 mois dans cette vidéo [Lien 1] de Charles Schiele.",
		links: ["https://www.youtube.com/watch?v=AAAvWMHYapc&t=2495s"]
	},
	{
		question: "Un jour Squeezie est venu me demander conseil : il hésitait entre se mettre à fond sur YouTube, ou se concentrer sur ses études… C'était en 2012, et je lui ai bien entendu conseillé de continuer YouTube !",
		answers: [
			{ text: 'Amixem', correct: false },
			{ text: 'Théa', correct: false },
			{ text: 'Squeezie', correct: false },
			{ text: 'Léna Situation', correct: false },
			{ text: 'Djilsi', correct: false },
			{ text: 'Frigiel', correct: true },
			{ text: 'Pidi', correct: false },
			{ text: 'Mastu', correct: false },
			{ text: 'Natoo', correct: false },
			{ text: 'Bouzi', correct: false }
		],
		context: "Rien à ajouter à cette douce anecdote, Frigiel l'a partagé dans le formulaire.",
		links: []
	},
	{
		question: "C’était pendant des vacances avec mon/ma meilleur(e) pote. Il/Elle nous emmène à l’étage luxueux d’un SPA dans lequel on était. Il fallait enlever ses vêtements pour y accéder, on avait juste une serviette autour de nous. Arrive le moment où on veut rentrer dans un sauna : pour des raisons d'hygiène, il faut mettre sa serviette sur le banc où on veut s’asseoir. Je suis donc complètement nu(e) à ce moment-là et pas très à l’aise mais c’est pareil pour tout le monde donc ça va. Mon/Ma meilleur(e) ami(e) sort 2 minutes du sauna, et je vois une personne se lever pour s’approcher de moi. Cette personne avait eu la chance d’avoir 2 serviettes, une autour d’elle et une pour s’asseoir. Je me retrouve nu(e) face à cette personne, et elle me dit “C’est toi ‘nom du youtubeur/de la youtubeuse’ ?? On peut faire une photo ??” Je panique comme j’ai pas l’habitude de paniquer, j’ai dis “haha non on me confond souvent avec mais c’est pas moi”, j’ai récupéré mon/ma meilleure pote, on a pris nos affaires et on est vite partis.",
		answers: [
			{ text: 'Amixem', correct: false },
			{ text: 'Théa', correct: false },
			{ text: 'Squeezie', correct: false },
			{ text: 'Léna Situation', correct: true },
			{ text: 'Djilsi', correct: false },
			{ text: 'Frigiel', correct: false },
			{ text: 'Pidi', correct: false },
			{ text: 'Mastu', correct: false },
			{ text: 'Natoo', correct: false },
			{ text: 'Bouzi', correct: false }
		],
		context: "Léna à raconter cette histoire il y a 4 ans dans cette vidéo [Lien 1].",
		links: ["https://www.youtube.com/watch?v=-5s6pwoPyJs&t=760s"]
	},
	{
		question: "Quand j’étais petit ma mère faisait pas beaucoup de courses, pour pas que ça coûte trop cher. Le problème c’est que quand on avait tout mangé elle attendait avant d’en refaire, donc on avait souvent très faim avec mon frère. Heureusement on avait UN truc auquel on tenait, c’était le Nutella. On avait le droit à un pot par semaine et on mangeait ça à tous les petits dejs, à tous les goûters. Mais il se passait un truc bizarre avec : le niveau du nutella (notre trésor) baissait pendant la nuit. Ce n’était pas moi, mon frère disait que c’était pas lui. On devenait fou. Une nuit j’entends quelqu’un descendre et je me cache pour essayer de voir qui c’est. 10 minutes plus tard, la personne est toujours en bas. Je décide d’aller voir qui c’est et ce qu’il se passe. Je descends, j’avance vers la cuisine… Et en fait je vois ma mère, accroupie, avec une cuillère et notre précieux nutella dans les mains, en train d’en manger. Mais elle me voit et se tourne vers moi avec un regard bizarre : en fait elle était somnambule et régulièrement dans son sommeil elle allait dans la cuisine et elle mangeait du Nutella, mais sans s’en rendre compte. Le matin quand on lui en parlait, elle s’en souvenait pas.",
		answers: [
			{ text: 'Amixem', correct: false },
			{ text: 'Théa', correct: false },
			{ text: 'Squeezie', correct: true },
			{ text: 'Léna Situation', correct: false },
			{ text: 'Djilsi', correct: false },
			{ text: 'Frigiel', correct: false },
			{ text: 'Pidi', correct: false },
			{ text: 'Mastu', correct: false },
			{ text: 'Natoo', correct: false },
			{ text: 'Bouzi', correct: false }
		],
		context: "On découvre la fasse cachée de la maman de Squeezie dans cette vidéo [Lien 1], qui date d'il y a 5 ans!",
		links: ["https://www.youtube.com/watch?v=JHDDkxLsYDw&t=254s"]
	},
	{
		question: "Lors d’une convention dans le sud de la France, j’ai signé un autographe à un acteur qui a joué dans Harry Potter, le Seigneur des anneaux et Star Wars.",
		answers: [
			{ text: 'Amixem', correct: false },
			{ text: 'Théa', correct: false },
			{ text: 'Squeezie', correct: false },
			{ text: 'Léna Situation', correct: false },
			{ text: 'Djilsi', correct: false },
			{ text: 'Frigiel', correct: false },
			{ text: 'Pidi', correct: false },
			{ text: 'Mastu', correct: true },
			{ text: 'Natoo', correct: false },
			{ text: 'Bouzi', correct: false }
		],
		context: "C'était durant une convention à Fréjus, en fait l'acteur est marié à une femme belge et ils ont une fille qui parle donc français. Elle était abonné à la chaîne de Mastu! Il a raconté cette anecdote dans cette vidéo [Lien 1] en 2019.",
		links: ["https://www.youtube.com/watch?v=BbdiZ4PzSnE&t=733s"]
	}
]
