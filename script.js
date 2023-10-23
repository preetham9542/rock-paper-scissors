const closeRules = () => {
	const gameRule = document.getElementById("gameRule");
	gameRule.style.display = gameRule.style.display === "flex" ? "none" : "flex";
};
window.onload = () => {
	// Get userScore and pcScore from localStorage or initialize to 0
	let userScore = parseInt(localStorage.getItem('userScore')) || 0;
	let pcScore = parseInt(localStorage.getItem('pcScore')) || 0;
  
	// Update the DOM to display the scores
	document.getElementById('userScore').textContent = userScore;
	document.getElementById('pcScore').textContent = pcScore;
};
  
// Playing
const playagain = () => {
	document.getElementById("Choosen").style.display = "flex";
	document.getElementById("Result").style.display = "none";
};

if(localStorage.getItem('userScore')){
	var userScore = localStorage.getItem('userScore');
	var pcScore = localStorage.getItem('pcScore');
}
else{
	var userScore = 0;
	var pcScore = 0;
}

const StartGame = (userChoice) => {
	// Store userScore and pcScore in localStorage
	localStorage.setItem('userScore', userScore);
	localStorage.setItem('pcScore', pcScore);

	const myChoiceElement = document.getElementById('myChoice');
	const userChoiceImage = document.getElementById('userChoice');

	// Define a mapping of user choices to border and image sources
	const choiceMapping = {
		rock: { borderColor: '#0074b6', imageSrc: './asssests/image1.png' },
		paper: { borderColor: '#ffa943', imageSrc: './asssests/image2.png' },
		scissor: { borderColor: '#bd00ff', imageSrc: './asssests/image3.png' },
	};

	const choiceInfo = choiceMapping[userChoice];

	// Update the styling and image for the user's choice
	myChoiceElement.style.border = `20px solid ${choiceInfo.borderColor}`;
	userChoiceImage.src = choiceInfo.imageSrc;

	// Display and animate the result elements
	document.getElementById('Choosen').style.display = 'none';
	document.getElementById('Result').style.display = 'flex';
	document.getElementById('ResultInfo').style.transform = 'scale(0)';
	document.getElementById('computerChoice').style.display = 'none';
	document.getElementById('loading').style.display = 'inherit';

	// Remove previous winner elements
	const elements = document.querySelectorAll('.winner');
	elements.forEach(element => {
		element.remove();
	});

	// Use a timeout instead of an interval for a better approach
	setTimeout(() => {
		play(userChoice);
	}, 100);
};

const play = (userChoice) => {
	document.getElementById("ResultInfo").style.transform = "scale(1)";
	document.getElementById("computerChoice").style.display = "inherit";
	document.getElementById("loading").style.display = "none";

	const choices = ["rock", "paper", "scissor"];
	const randomIndex = Math.floor(Math.random() * 3);
	const computerChoice = choices[randomIndex];

	// Set User Choice
	const resultLoad = document.createElement("div");
	resultLoad.classList.add("winner");

	// Set Computer Choice

	if (computerChoice === "rock") {
        document.getElementById('pcChoice').style.border = "20px solid #0074b6";
        document.getElementById("computerChoice").src = "./asssests/image1.png";
	} else if (computerChoice === "paper") {
        document.getElementById('pcChoice').style.border = "20px solid #ffa943";
        document.getElementById("computerChoice").src = "./asssests/image2.png";
	} else if (computerChoice === "scissor") {
        document.getElementById('pcChoice').style.border = "20px solid #bd00ff";
		document.getElementById("computerChoice").src = "./asssests/image3.png";
	}

	let result = "";

	if (userChoice === computerChoice) {
		result = "It's a tie!";
		document.getElementById("yourTitle").innerHTML = "It's A TIE ";
		document.getElementById("resultTie").innerHTML = "";
	} else if (
		(userChoice === "rock" && computerChoice === "scissor") ||
		(userChoice === "paper" && computerChoice === "rock") ||
		(userChoice === "scissor" && computerChoice === "paper")
	) {
		result = "You win!";
		userScore++;
		localStorage.setItem('userScore', userScore)
		localUserScore = localStorage.getItem('userScore')

		document.getElementById("userScore").innerHTML = localUserScore;
		document.getElementById("yourTitle").innerHTML = "YOU WON";
		document.getElementById("resultTie").innerHTML = "against pc";
		document.getElementById("myChoice").appendChild(resultLoad);
	} else {
		result = "You lose!";
		pcScore++;
		localStorage.setItem('pcScore', pcScore)
		localPCScore = localStorage.getItem('pcScore')

		document.getElementById("pcScore").innerHTML = localPCScore;
		document.getElementById("yourTitle").innerHTML = "YOU LOST";
		document.getElementById("resultTie").innerHTML = "against pc";
		document.getElementById("pcChoice").appendChild(resultLoad);
	}

	if(result === "You win!"){
		document.getElementById('next').style.display = 'inherit'
	}else{
		document.getElementById('next').style.display = 'none'
	}
};