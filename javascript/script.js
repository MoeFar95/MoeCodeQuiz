var Question1 = ["What is the name of the main character?", "Naruto Uzumaki", ];
var Question2 = ["What is Naruto's favorite food?", "Miso Ramen", "Rice", "Tomato Soup"];
var Question3 = ["Which Uchiha had MS but never used Susano'o?", "Sasuke Uchiha", "Itachi Uchiha", "Obito Uchiha", "Madara Uchiha"];
var Question4 = ["Which village represents Earth?", "Iwagakure", "Kirigakure", "Kumogakure"];
var Question5 = ["Who trained Naruto for over 2 years?", "Kakashi Hatake", "Tsunade Senju", "Jiraiya", "Hiruzen Sarutobi"];
var Question6 = ["Who was Naruto's father?", "Minato Namikaze", "Iruka Umino", "Jiraiya"];


var questions = [
    {
        title: "What is the name of the main character?",
        choices: ["Naruto", "Sasuke", "Sakura", "Kakashi"],
        answer: "Naruto" 
    },
    {
        title: "What is Naruto's favorite food?",
        choices: ["Miso Ramen", "Rice", "Tomato Soup"],
        answer: "Miso Ramen"

    },
    {
        title: "Which Uchiha had MS but never used Susano'o?",
        choices: ["Sasuke Uchiha", "Itachi Uchiha", "Obito Uchiha", "Madara Uchiha"],
        answer: "Obito Uchiha"
    },
    {   
        title: "Which village represents Earth?",
        choices: ["Iwagakure", "Kirigakure", "Kumogakure"],
        answer: "Iwagakure"

    },
    {
        title: "Who trained Naruto for over 2 years?",
        choices: ["Kakashi Hatake", "Tsunade Senju", "Jiraiya", "Hiruzen Sarutobi"],
        answer: "Jiraiya"
    },
    {
        title: "Who was Naruto's father?",
        choices: ["Minato Namikaze", "Iruka Umino", "Jiraiya"],
        answer: "Minato Namikaze"             
    },
    
];

var score = 0;
var questionIndex = 0;

var currentTime = document.querySelector("#currentTime");
var timer = document.querySelector("#startTime");
var questionsDiv = document.querySelector("#questionsDiv");
var wrapper = document.querySelector("#wrapper");

var secondsLeft = 200;
// Holds interval time
var holdInterval = 0;
// penalty time for incorrect answer is 10 seconds
var penalty = 10;
// Creates new element
var ulCreate = document.createElement("ul");

// Triggers timer on button, shows user a display on the screen
timer.addEventListener("click", function () {
    // We are checking zero because its originally set to zero
    if (holdInterval === 0) {
        holdInterval = setInterval(function () {
            secondsLeft--;
            currentTime.textContent = "Time: " + secondsLeft;

            if (secondsLeft <= 0) {
                clearInterval(holdInterval);
                allDone();
                currentTime.textContent = "Time's up!";
            }
        }, 1000);
    }
    render(questionIndex);
});

// Renders questions and choices to page: 
function render(questionIndex) {
    // Clears existing data 
    questionsDiv.innerHTML = "";
    ulCreate.innerHTML = "";
    // For loops to loop through all info in array
    for (var i = 0; i < questions.length; i++) {
        // Appends question title only
        var userQuestion = questions[questionIndex].title;
        var userChoices = questions[questionIndex].choices;
        questionsDiv.textContent = userQuestion;
    }
    // New for each for question choices
    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        questionsDiv.appendChild(ulCreate);
        ulCreate.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}
// Event to compare choices with answer
function compare(event) {
    var element = event.target;
    if (element.matches("li")) {
        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");
        // Correct condition 
        if (element.textContent == questions[questionIndex].answer) {
            score++;
            createDiv.textContent = "Correct! The answer is:  " + questions[questionIndex].answer;
            // Correct condition 
        } else {
            // Will deduct -10 seconds off secondsLeft for wrong answers
            secondsLeft = secondsLeft - penalty;
            createDiv.textContent = "Wrong! The correct answer is:  " + questions[questionIndex].answer;
        }

    }
    // Question Index determines number question user is on
    questionIndex++;

    if (questionIndex >= questions.length) {
        // All done will append last page with user stats
        allDone();
        createDiv.textContent = "End of quiz!" + " " + "You got  " + score + "/" + questions.length + " Correct!";
    } else {
        render(questionIndex);
    }
    questionsDiv.appendChild(createDiv);

}
// All done will append last page
function allDone() {
    questionsDiv.innerHTML = "";
    currentTime.innerHTML = "";

    //creates Heading:
    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "All Done!"

    questionsDiv.appendChild(createH1);

    // creates a Paragraph
    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");
    questionsDiv.appendChild(createP);

// Calculates time remaining and replaces it with score
if (secondsLeft >= 0) {
    var timeRemaining = secondsLeft;
    var createP2 = document.createElement("p");
    clearInterval(holdInterval);
    createP.textContent = "Your final score is: " + timeRemaining;
    questionsDiv.appendChild(createP2);
    }

// creates a label to enter user intials
var createLabel = document.createElement("label");
createLabel.setAttribute("id", "createLabel");
createLabel.textContent = "Enter your initials: ";
questionsDiv.appendChild(createLabel);

// inputs user initials
var createInput = document.createElement("input");
createInput.setAttribute("type", "text");
createInput.setAttribute("id", "initials");
createInput.textContent = "";
questionsDiv.appendChild(createInput);
 // submits the intials and score to the high scores page
 var createSubmit = document.createElement("button");
 createSubmit.setAttribute("type", "submit");
 createSubmit.setAttribute("id", "Submit");
 createSubmit.textContent = "Submit";
 questionsDiv.appendChild(createSubmit);

 // Event listener to capture initials and local storage for initials and score
 createSubmit.addEventListener("click", function () {
     var initials = createInput.value;

     if (initials === null) {

         console.log("No value entered!");
     } 
        else {
         var finalScore = {
             initials: initials,
             allScores: timeRemaining,
         }
        
         console.log(finalScore);
         var allScores = localStorage.getItem("allScores");
         if (allScores === null) {
             allScores = [];
         } else {
             allScores = JSON.parse(allScores);
         }
         allScores.push(finalScore);
         var newScore = JSON.stringify(allScores);
         localStorage.setItem("allScores", newScore);
         // Travels to final page
         window.location.replace("highscore.html");
     }
 });
}

   

