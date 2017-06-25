$(document).ready(function() {


function initialScreen() {
	startScreen = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Start Quiz</a></p>";
	$(".mainArea").html(startScreen);
}

initialScreen();



$("body").on("click", ".start-button", function(event){
	event.preventDefault(); 
	clickSound.play();
	generateHTML();

	timerWrapper();

}); 

$("body").on("click", ".answer", function(event){
	
	clickSound.play();
	selectedAnswer = $(this).text();
	if(selectedAnswer === correctAnswers[questionCounter]) {
		

		clearInterval(theClock);
		generateWin();
	}
	else {
		
		clearInterval(theClock);
		generateLoss();
	}
}); 

$("body").on("click", ".reset-button", function(event){
	clickSound.play();
	resetGame();
}); 

});  

function generateLossDueToTimeOut() {
	unansweredTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='img/x.png'>";
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 4000);  
}

function generateWin() {
	correctTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 4000);  
}

function generateLoss() {
	incorrectTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: "+ correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='img/x.png'>";
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 4000); 
}

function generateHTML() {
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p><p class='text-center'>" + questionArray[questionCounter] + "</p><p class='first-answer answer'>A. " + answerArray[questionCounter][0] + "</p><p class='answer'>B. "+answerArray[questionCounter][1]+"</p><p class='answer'>C. "+answerArray[questionCounter][2]+"</p><p class='answer'>D. "+answerArray[questionCounter][3]+"</p>";
	$(".mainArea").html(gameHTML);
}

function wait() {
	if (questionCounter < 7) {
	questionCounter++;
	generateHTML();
	counter = 30;
	timerWrapper();
	}
	else {
		finalScreen();
	}
}

function timerWrapper() {
	theClock = setInterval(thirtySeconds, 1000);
	function thirtySeconds() {
		if (counter === 0) {
			clearInterval(theClock);
			generateLossDueToTimeOut();
		}
		if (counter > 0) {
			counter--;
		}
		$(".timer").html(counter);
	}
}

function finalScreen() {
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>All done, here's how you did!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
	$(".mainArea").html(gameHTML);
}

function resetGame() {
	questionCounter = 0;
	correctTally = 0;
	incorrectTally = 0;
	unansweredTally = 0;
	counter = 30;
	generateHTML();
	timerWrapper();
}

var startScreen;
var gameHTML;
var counter = 30;
var questionArray = ["What was the name of the Largest German Battleship of the War?", "What nation built the largest Battleship of WWII?", "Who's assasination would lead to the start of WW1?", "What was the oldest empire in WWI?", "What event caused the US to join the War1?", "With revolutions spuring up in Europe and Monarchs being removed, what new type of goverment would take power in Italy and Germany?", "Who was allied with Nazi Germany at the start of WWII but would end as enemies?", "What turned the tide of WWII from the Axis to Allied victory?"];
var answerArray = [["Bismarck", "Wilhelm II", "King George V", "The Albert"], ["USA","USSR","Nazi German","Japan"], ["Franz Joseph", "Kaiser Wilhelm II", "Archduke Franz Ferdinand", "Nicholas II of Russia"], ["Ottoman Empire","Austro-Hungarian Empire","Russian Empire","British Empire"], ["Brusilov Offensive", "Sinking of US Merchant ships and Zimmerman Notes", "Crashing of Hindenburg", "Battle of the Somme"], ["Socialism","Fascism","Oligarchy","Communism"], ["Empire of Japan", "Vichy France", "USSR", "Kingdom of Italy"], ["Lack of Japanese involment on the Russian front","US entered the War","Russia Turned the tide of war","All of the Above"]];
var imageArray = ["<img class='center-block img-right' src='../HistIMG/Bismarck-ship.jpg'>", "<img class='center-block img-right' src='../HistIMG/IJ.jpg'>", "<img class='center-block img-right' src='../HistIMG/franz.jpg'>", "<img class='center-block img-right' src='../HistIMG/ottoman.jpg'>", "<img class='center-block img-right' src='../HistIMG/zim.jpg'>", "<img class='center-block img-right' src='../HistIMG/hitler&muss.jpg'>", "<img class='center-block img-right' src='../HistIMG/hitstal.jpg'>", "<img class='center-block img-right' src='../HistIMG/barb.jpg'>"];
var correctAnswers = ["A. Bismarck", "D. Japan", "C. Archduke Franz Ferdinand", "A. Ottoman Empire", "B. Sinking of US Merchant ships and Zimmerman Notes", "B. Fascism", "C. USSR", "D. All of the Above"];
var questionCounter = 0;
var selecterAnswer;
var theClock;
var correctTally = 0;
var incorrectTally = 0;
var unansweredTally = 0;
var clickSound = new Audio("sound/button-click.mp3");
