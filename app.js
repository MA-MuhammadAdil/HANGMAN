var hangmanImage   = document.querySelector(".hangman-box img");

var  wordDisp = document.querySelector(".word-display");

var  guessesText  = document.querySelector(".guesses-text b");

var keyboardDiv = document.querySelector(".keyboard");

var gameModel  = document.querySelector(".game-model")

var  playAgainbtn  = document.querySelector(".play-again")

var currentWord ;

var wrongGuessCount  ;

var maxGusses = 6;

var correctLetter = [];

var  resetGame = () =>{
    correctLetter = [];
  wrongGuessCount = 0;
  wordDisp.innerHTML =  currentWord.split("").map(()=> `<li class="letter"></li>`).join("")
  
        hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`

        keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled =false)
  guessesText.innerText =`${wrongGuessCount} / ${maxGusses}`;
  gameModel.classList.remove("show");
 
}
var getRandowWord = () =>{

   const {word, hint } = wordList[Math.floor(Math.random()* wordList.length) ]

 currentWord = word;

 console.log(word)
document.querySelector(".hint-text b").innerText = hint;

resetGame();
 
}



let  gameOver = (isVictory) =>{
    setTimeout(()=>{
        var modaltext = isVictory ?  `You found the word:`:`The correct word was:`;

        gameModel.querySelector("img").src = `images/${isVictory ? 'victory': 'lost'}.gif`;

        gameModel.querySelector("h4").innerText = ` ${isVictory ? 'Congrats!': 'Game Over!'}` ;

        gameModel.querySelector("p").innerHTML = `${modaltext} <b>${currentWord}</b>` ;
 
        gameModel.classList.add("show");
    },300)
}



var initgame = (button, clickedLetter) => {

    if(currentWord.includes(clickedLetter)){ 
        [...currentWord].forEach((letter,index) =>{
            if(letter === clickedLetter){

                correctLetter.push(letter)
                wordDisp.querySelectorAll("li")[index].innerText = letter;

                wordDisp.querySelectorAll("li")[index].classList.add("guessed")

            }
        } )

       }else{
        wrongGuessCount++;
        hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`
         

       }
       button.disabled = true
       guessesText.innerText =`${wrongGuessCount} / ${maxGusses}`;

       if(wrongGuessCount === maxGusses)return gameOver(false)
        if(correctLetter.length ===  currentWord.length)return gameOver(true)

}


for (let  i = 97;  i<=122;  i++) { 

    var button = document.createElement("button")

    button.innerText = String.fromCodePoint(i);

    keyboardDiv.appendChild(button)

    button.addEventListener("click", e => initgame(e.target, String.fromCodePoint(i)))
}


getRandowWord()

playAgainbtn.addEventListener("click",getRandowWord)