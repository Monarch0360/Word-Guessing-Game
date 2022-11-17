//Onload function to disable alphabets before starting new game
window.onload = function() {
    document.querySelectorAll("#letters button").forEach(el =>{
        el.disabled = true;
    })
  };

//Global variables
var words = ["BANANA", "BRAVE", "YELLOW", "CROSSWORD"];
var randomWord = words[Math.floor(Math.random() * words.length)];
var chanceRemaining = 7;
var action = 1;

//Start new game button function
const startButton = () =>{
    if(action == 1){
        document.getElementById("blanks").innerHTML = main();
        document.querySelectorAll("#letters button").forEach(el =>{
            el.disabled = false; el.style.backgroundColor = "rgb(255, 243, 134)";
        });
        action++;
    }
    else{
        randomWord = words[Math.floor(Math.random() * words.length)];
        document.getElementById("blanks").innerHTML = main();
        document.querySelectorAll("#letters button").forEach(el =>{
            el.disabled = false; el.style.backgroundColor = "rgb(255, 243, 134)";
        });
        chanceRemaining = 7;
        document.getElementById("h3").innerHTML = "Chances remaining: " + chanceRemaining;
    }
}

document.getElementById("startButton").addEventListener("click", startButton);

//Create blanks function
function main(){
    var createBlanks = "";
    for(var i = 0; i < randomWord.length ; i++){
        if(i == randomWord.length){
            createBlanks = "_";
        }
        else{
        createBlanks += "_ ";
        }
    }
        return createBlanks;
}

//Alphabets function
let btn = document.querySelectorAll('.btn-letter');
for (i of btn) {
    i.addEventListener('click', function() {
      check(this.textContent); this.disabled = true; this.style.backgroundColor = "grey";
    });
  }
  
//Check word function
function check(str){
    var checkWord;
    if(randomWord.indexOf(str) == -1){
        chanceRemaining -= 1;
        document.getElementById("h3").innerHTML = "Chances remaining: " + chanceRemaining;
        alert("The letter clicked is not correct!");
    }
     else{
        for(var i = 0; i <= randomWord.length; i++){
            checkWord = randomWord.indexOf(str, i);
            if(checkWord > -1){
                var text = document.getElementById("blanks").textContent;
                text = text.replace(/\s+/g, '');
                var newText = setCharAt(text,checkWord, str);
                newText = newText.split('').join(' ');
                document.getElementById("blanks").innerHTML = newText;
                
            }
    
        }
    }
   
   if(document.getElementById("blanks").textContent == randomWord.split('').join(' ')){
       document.querySelectorAll('#letters button').forEach(el => {
        el.disabled = true; el.style.backgroundColor = "grey";})
    setTimeout(function () { alert("You Win!"); }, 1);
   }

   if(chanceRemaining == 0){
    document.querySelectorAll('#letters button').forEach(el => {
        el.disabled = true; el.style.backgroundColor = "grey";})
    document.getElementById("blanks").innerHTML = randomWord.split('').join(' ');
    setTimeout(function () { alert("You Lose!"); }, 1);
   }

}

//Supporting function to set particular letter at particular index
function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substring(0,index) + chr + str.substring(index+1);
}



