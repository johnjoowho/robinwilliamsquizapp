let answers = []; 

function calculateScore() { 
  return answers.filter(function(answer){
    return answer.isCorrect}).length; 
}

function displayInstructions() {
  $('section.content').html(generateInstructions());
}

function displayResults() {
  $('section.content').html(generateResults());
}

function displayScoreboard() {
  $('section.scoreboard').html(generateScoreboard());
}

function displayQuestion(questionNumber) {
  const question = STORE[questionNumber];
  const htmlText = generateQuestion(question, questionNumber);
  $('section.content').html(htmlText); 
}

function displayQuestion(questionNumber) {
  const question = STORE[questionNumber];
  const htmlText = generateQuestion(question, questionNumber);
  $('section.content').html(htmlText); 
}

function displayFeedback(answer) {
  $('.content').html(generateFeedback(answer))
}

function generateInstructions() {
  return `
    <div class="instructions" "js-quiz-instructions">
      <p class="first-instruction">Welcome to the Ultimate Robin Williams Quiz</p>
      <p class="second-instruction">Match the Rob-Dub quote you see with the movie it's from</p>
      <button id="start-button">>click to start<</button>
    </div>
    `
}

function generateScoreboard() {
  return ` 
  <ul class="scoreboard-style">
  <li>Question: <span class="questionNumber">${answers.length+1}</span>/${STORE.length}</li>
  <li>Score: <span class="score">${calculateScore()}</span></li>
  </ul>
  `  
}

function generateResults() {
  if (calculateScore()>=7) {
    return `
      <section id="final-page">
        <p class="final-score">Final Score: ${calculateScore()} out of 10</p>
        <p class="final-message">Congratulations, you are a certified obscure Robin Williams quote level 1 specialist!</p>
        <img class="results-img" src="https://media1.giphy.com/media/5ns1wuK1Y3NKxkm3qO/giphy.gif" alt="Robin Dancing">
        <div></div>
        <button id="reset-button" type="reset">Start Over</button>
      </section>
    `; 
  }
  else {
    return `
    <section id="final-page">
      <p class="final-score">Final Score: ${calculateScore()} out of 10</p>
      <p class="final-message">You have failed the test. But Robin is sympathetic to your shortcomings.</p>
      <img class="results-img" src="https://media.giphy.com/media/Dvw2lJqlTuJmo/giphy.gif" alt="Robin consoling you">
      <div></div>
      <button id="reset-button" type="reset">Start Over</button>
    </section>
    `; 
  }
}

function generateQuestion(question, questionNumber) {
  return `
    <form id="quiz-form">
    <fieldset class="quiz-box" class="col-3">
      <legend class="question" class="col-6">"${question.text}"</legend>
      <p class="quiz-question-number">Question #${questionNumber+1}</p>
      <ul class="choices-outside" background=url"http://www.wallpapers13.com/wp-content/uploads/2017/12/Genie-character-from-the-cartoon-Aladdin-HD-Wallpaper-1920x1080.jpg">
        ${question.answers.map(function(answer, answerNumber){
          return `
          <li class="choices-inside">
          <input type="radio" name="moviename" id="ans-${answerNumber}" value="${answerNumber}" required><label for="ans-${answerNumber}">${answer.text}</label>
          </li>
          `
        }).join("")
        }
      </ul>

        <button id="submit-button" type="submit">Final Answer, Regis</button>
        <button id="reset-button" type="reset">Start Over</button>
      
    </fieldset>
    </form>
  `}

function generateFeedback(answer) { 
  if (answers.length<=9) {
  return answer.isCorrect? 
    //when answer is right 
  `
  <div class="correct-alert">
    <p class="alert-text">You are absolutely correct!  Robin would be proud of you.</p>
    <br>
    <img class="feedback-img"  src="https://media3.giphy.com/media/WSTXcFbR2ZQOY/giphy.gif" alt="Robin blowing a kiss">
    
    <button id="next-button" type="button">Go to the next question!</button>
    <button id="reset-button" type="reset">Start Over</button>
  </div>`: 
    //when answer is wrong
  `<div class="incorrect-alert">
    <p class="alert-text">You are wrong.  Robin is disappointed in you.
    The correct answer is "${getCorrectAnswer(STORE[answers.length-1]).text}"</p>
    <img src="https://media2.giphy.com/media/BgN8YjBN0ZQis/giphy.gif" class="feedback-img" alt="Genie scolding Aladdin">
    
    <button id="next-button" type="button">Go to the next question!</button>
    <button id="reset-button" type="reset">Start Over</button>
  </div>
  `
  } 
  else {
      return answer.isCorrect? 
        //when answer is right 
      `
      <div class="correct-alert">
        <p class="alert-text">You are absolutely correct!  Robin would be proud of you.</p>
        <br>
        <img class="feedback-img"  src="https://media3.giphy.com/media/WSTXcFbR2ZQOY/giphy.gif" alt="Robin dancing">
        
        <button id="next-button" type="button">See the results!</button>
        <button id="reset-button" type="reset">Start Over</button>
      </div>`: 
        //when answer is wrong
      `<div class="incorrect-alert">
        <p class="alert-text">You are wrong.  Robin is disappointed in you.
        The correct answer is "${getCorrectAnswer(STORE[answers.length-1]).text}"</p>
        <img src="https://media2.giphy.com/media/BgN8YjBN0ZQis/giphy.gif" class="feedback-img" alt="Genie scolding Aladdin">
        <button id="next-button" type="button">See the results!</button>
        <button id="reset-button" type="reset">Start Over</button>
      </div>
      `
  }
}

function nextQuestion() {
  if (answers.length >= STORE.length){
    displayResults(); 
  }
  else { 
    displayQuestion(answers.length);
    displayScoreboard();
  }
   
} 

function getCorrectAnswer(question) {
  return question.answers.find(function(answer){
    return answer.isCorrect});
}

function handleStartQuiz(event) {
  $('.content').on('click', '#start-button', function(event){
    nextQuestion();
  });
}

function handleSubmit(event) {
  $('.content').on('click', '#submit-button', function(event) {
    event.preventDefault(); 
  const currentChoice = $('input[name=moviename]:checked').val();
  if (currentChoice||currentChoice===0) {
    const currentQuestion = STORE[answers.length];
    const currentAnswer = currentQuestion.answers[currentChoice];
    answers.push(currentAnswer);
    displayFeedback(currentAnswer);
    }
  }); 
}
   
function handleNextQuestion() {
  $('.content').on('click', '#next-button', function(event){
    nextQuestion(); 
  });
}

function handleRestart() {
  $('.content').on('click', '#reset-button', function(event){
    displayInstructions(); 
    answers=[]; 
  });
}

function setupUI () {
displayInstructions();
};

function setupEventHandlers () {
handleStartQuiz(); 
handleSubmit(); 
handleNextQuestion(); 
handleRestart();
}

function loadQuiz() { 
  setupEventHandlers(); 
  setupUI(); 
}

$(loadQuiz); 