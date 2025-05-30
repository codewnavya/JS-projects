
        let randomNum = parseInt(Math.random()*10 + 1);
        const submit = document.getElementById("submit");
        const userInput = document.querySelector("#guessField");
        const prevGuesses = document.querySelector(".prevGuesses");
        const remaining = document.querySelector('.remaining');
        const answer = document.querySelector('.answer');
        const result = document.querySelector('.result');
        const p = document.createElement("p");

        let preGuess = [];
        let numGuess = 1;
        let playGame = true;

        if(playGame){
            submit.addEventListener('click', function(e){
                e.preventDefault();
                const guess = parseInt(userInput.value);
                validateGuess(guess);
            });
        }

        function validateGuess(guess){
            if(isNaN(guess)){
                alert("Please enter a valid number");
            }
            else if(guess<1){
                alert("Please enter a number greater than 0");
            }
            else if(guess>10){
                alert("Please enter a number less than 11");
            }
            else{
                preGuess.push(guess);
                if(numGuess === 6){
                    displayGuess(guess);
                    displayMessage(`Game Over. The random number was ${randomNum}`)
                    endGame()
                }else{
                    displayGuess(guess)
                    checkGuess(guess)
                }
            }
        }

        function checkGuess(guess){
            if(guess === randomNum){
                displayMessage(`You guessed it right`);
                endGame();
            }
            else if(guess>randomNum){
                displayMessage(`Number is TOO high`)
            }
            else if(guess<randomNum){
                displayMessage(`Number is TOO low`)
            }
        }

        function displayGuess(guess){
            userInput.value = '';
            prevGuesses.innerHTML += `${guess}, `;
            numGuess++;
            remaining.innerHTML = `Guesses Remaining: ${5-numGuess}`;
        }

        function displayMessage(message){
            answer.innerHTML = `<h2>${message}</h2>`
        }

        function endGame(){
            userInput.value = '';
            userInput.setAttribute('disabled', '');
            p.classList.add('button');
            p.innerHTML = `<h2 id="newGame">Start a new game</h2>`;
            result.appendChild(p);
            playGame = false;
            newGame();
        }

        function newGame(){
            const newGameButton = document.querySelector('#newGame');
            newGameButton.addEventListener('click', function(e){
                randomNum = parseInt(Math.random()*10 + 1);
                preGuess = [];
                numGuess = 1;
                prevGuesses.innerHTML = 'Previous Guesses: ';
                remaining.innerHTML = 'Guesses Remaining: 5';
                answer.innerHTML = '';
                userInput.removeAttribute('disabled');
                result.removeChild(p);
                playGame = true;
            });
        }