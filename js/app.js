/*
 * Create a list that holds all of your cards
 */
 let cards = ['fa-diamond', 'fa-paper-plane-o',
                'fa-anchor', 'fa-bolt',
                'fa-cube', 'fa-anchor',
                'fa-leaf', 'fa-bicycle',
                'fa-diamond', 'fa-bomb',
                'fa-leaf', 'fa-bomb',
                'fa-bolt', 'fa-bicycle',
                'fa-paper-plane-o', 'fa-cube'
               ];
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the pages
 */
 let allStars = [ '<li><i class="fa fa-star"></i></li>',
                  '<li><i class="fa fa-star"></i></li>',
                  '<li><i class="fa fa-star"></i></li>' ]


  function startGame() {
    shuffle(cards);

      for (const card of cards) {
        const template = `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`;
        const deck = document.querySelector('.deck');
        deck.insertAdjacentHTML('afterbegin', template);
      } // displays cards on the deck
      clickFunction(); // re-adds click logic when starting the game
  }
  startGame();

  /* Restart the game */
    $(".restart").click(function() {
      restartFunction();
    });

  function restartFunction() { // restart function

    let moveCounter = document.querySelector('.moves');
    let moves = 0;

    let stars = document.querySelector('.stars');

    /* Empty deck before re-adding cards */
    const deck = document.querySelector('.deck');
        while (deck.firstChild) {
        deck.removeChild(deck.firstChild);
        }

        /* restarts Moves to 0 */
        moveCounter.innerText = moves;
        moves = 0;

        /* restart the scores */
        while (stars.firstChild) {
          stars.removeChild(stars.firstChild);
        }
          stars.innerHTML = allStars.join(' ');

  startGame();
}
// Shuffle function from http://stackoverflow.com/a/2450976

    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

  function clickFunction() {

      let moveCounter = document.querySelector('.moves');
      let moves = 0;
      moveCounter.innerText = moves;

      let allCards = document.querySelectorAll('.card');
      let openCards = []; // saves opened cards in an array

      let movesText = document.querySelector('.moves_text');
      let stars = document.querySelector('.stars');

      const item = document.getElementsByTagName('li');

    allCards.forEach(function(card) {
        card.addEventListener('click', function() {

            if (!card.classList.contains("open") && !card.classList.contains("show") && !card.classList.contains("match") && openCards.length < 2) {
            openCards.push(card);
            card.classList.add("open", "show");

                  if (openCards.length == 2) {
                      if (openCards[0].dataset.card == openCards[1].dataset.card) {

                        openCards[0].classList.add("match", "open", "show");
                        openCards[1].classList.add("match", "open", "show");

                        openCards = [];

                      } else {

                          function closeCards() {
                              openCards.forEach(function(card) {
                               card.classList.remove("open", "show");
                             });
                             openCards = [];
                           }
                           setTimeout(closeCards, 1000);

                      } // end of else

                      moves += 1;
                      moveCounter.innerText = moves;

                      item[1].innerHTML = `With ${moves} moves`;

                      /* if 1 - "Move", if more than 1 - "Moves" */
                      if (moves == 1) {
                        movesText.innerHTML = "Move";
                      } else {
                        movesText.innerHTML = "Moves";
                      }

                      /* stars - game rating */
                      function hideStar() {
                        const starList = document.querySelectorAll('.stars li');
                          for (star of starList) {
                              if (star.style.display !== 'none') {
                                 star.style.display = 'none';
                                 break;
                              }
                          }
                      }

                       if (moves == 11) {
                          hideStar();
                       } else if (moves == 15) {
                          hideStar();
                       }

                      }
                  }
        });
    });

  }

// Timer function from https://stackoverflow.com/
  function timer() {
      const timer = document.querySelector(".timer");
      let timerVar = setInterval(countTimer, 1000);
      let totalSeconds = 0;
      let timeResult = document.querySelector('.modal-content li')

      function countTimer() {

        ++totalSeconds;
        let hour = Math.floor(totalSeconds /3600);
        let minuteCount = Math.floor((totalSeconds - hour*3600)/60);
        let minute = minuteCount;
        let seconds = totalSeconds - (hour*3600 + minute*60);

        if (seconds < 10) {
          seconds = `0${totalSeconds - (hour*3600 + minute*60)}`;
        }
        if (minute < 10) {
          minute = `${minuteCount}`;
        }
        timer.innerHTML = `${minute} : ${seconds}`;
        timeResult.innerHTML = `Time spent: ${minute} min and ${seconds} sec`;
      }
      // Resets timer
       $('.restart').click(function() {
           minute = 0;
           seconds = 0;
           timer.innerHTML = `${minute} : 0${seconds}`;
           clearInterval(timerVar);
           startTimer();
       });
       /*
       * check if all elements has match class
       * stop timer if all cards match
       * open modal if all cards match
       * "Play again!" button
      */
       $('.card').click(function() {
         if ($("li.card").length == $("li.match").length) {
           clearInterval(timerVar);
              $('.modal').css("display", "block");
         }
       });
       // Modal's "Play again!" button - starting game from the beginning
         $('.button').click(function() {
           $('.modal').css("display", "none");
           minute = 0;
           seconds = 0;
           timer.innerHTML = `${minute} : 0${seconds}`;
           clearInterval(timerVar);
           restartFunction();
           startTimer();
         });
  }

// Start timer on the first target element click
  function startTimer() {
    let clockOff = true;
    $('.deck').click(function() {
      if (event.target.classList.contains('card')) {
        if (clockOff == true) {
        timer();
        clockOff = false;
        console.log(event.target);
        }
      }
    });
  }
  startTimer();

/* star rating function - counts how many stars left */
  function getStars() {
    stars = document.querySelectorAll('.stars li');
    starCount = 3;
      for (star of stars) {
          if (star.style.display == 'none') {
             --starCount;
          }
      }
      return starCount;
  }

/*  on every card click get the number of stars left. */
  $('.deck').click(function() {
    const starQuantity = getStars();
    const item = document.getElementsByTagName('li');
      if (event.target.classList.contains('card')) {
      item[1].innerHTML += ` and ${starQuantity} Stars.`;
      }
  });
