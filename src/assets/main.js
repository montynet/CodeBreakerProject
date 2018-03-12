let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');

function guess() {
    let input = document.getElementById('user-guess');
    //add functionality to guess function here
    //debugger;
    if (answer.value === "" || attempt.value === 0){
      setHiddenFields();
    }

    if(!validateInput(input.value)){
      return false;
    }
    else{
      attempt.value = parseInt(attempt.value) + 1;
    }

//debugger;
    if(getResults(input.value)){
      setMessage("You win! :)");
      showAnswer(true);
      showReplay();
    }else if(!getResults(input.value) && attempt.value >= 10){
      setMessage("You lose! :()");
      showAnswer(false);
      showReplay();
    }else{
      setMessage("Incorrect, try again.");
    }
}

//implement new functions here

/*
Function is responsible for initializing our hidden values.
*/
function setHiddenFields(){
  var max = 10000;
  attempt.value = 0,
  answer.value = Math.floor(Math.random() * Math.floor(max));


  while( answer.value.toString().length < 4){
    answer.value = "0"+answer.value;
  }
  //console.log(answer.value);
}

/*
Function is responsible for setting the passed content
to the message id.
*/
function setMessage(content){
  document.getElementById('message').innerHTML= content;
}

function validateInput(input){
  if (input.toString().length === 4){
    return true;
  }else{
    setMessage("Guesses must be exactly 4 characters long.");
    return false;
  }
}

function getResults(smallString){
  //debugger;
  var firstDiv = "<div class=\"row\"><span class=\"col-md-6\">",
  countOfGuesses = 0,
  answerString = answer.value;
  for(var i= 0; i<smallString.length; i++){
    var positionInString = answerString.indexOf(smallString[i]);
    if(positionInString > -1){
      //we know the input is in the string so compare the indexes
      if(answerString[positionInString] === smallString[positionInString] ){
        firstDiv = firstDiv + smallString[i] + "<span class=\"glyphicon glyphicon-ok\"></span>";
        countOfGuesses = countOfGuesses + 1;
      }
      else{
        firstDiv = firstDiv + smallString[i] + "<span class=\"glyphicon glyphicon-transfer\"></span>";
      }

    }else{
      firstDiv = firstDiv + smallString[i] + "<span class=\"glyphicon glyphicon-remove\"></span>";
    }
  }
  firstDiv =  firstDiv + "</div>";
  document.getElementById('results').innerHTML = firstDiv;

return countOfGuesses === 4;
}

function showAnswer(tellAnswer){
  if(tellAnswer){
    document.getElementById('code').innerHTML = answer.value;
    document.getElementById('code').classList.add("success");
  }else{
    document.getElementById('code').innerHTML = answer.value;
    document.getElementById('code').classList.add("failure");
  }

}

function showReplay(){
  document.getElementById('guessing-div').style.display = "none";
  document.getElementById('replay-div').style.display = "block";
}
