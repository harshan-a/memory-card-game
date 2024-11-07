let data = [
  {
    id: 1,
    img: 'images/img-1.png'
  },
  {
    id: 2,
    img: 'images/img-2.png'
  },
  {
    id: 3,
    img: 'images/img-3.png'
  },
  {
    id: 4,
    img: 'images/img-4.png'
  },
  {
    id: 5,
    img: 'images/img-5.png'
  },
  {
    id: 6,
    img: 'images/img-6.png'
  },
  {
    id: 7,
    img: 'images/img-7.png'
  },
  {
    id: 8,
    img: 'images/img-8.png'
  }
];

memoryGame();

function memoryGame() {
  let listHTML = '';
  data.concat(data)
    .sort(() => Math.random() > 0.5 ? 1 : -1)
      .forEach((object, i) => {
        listHTML +=`
          <li class="card js-card" 
            data-id="${object.id}"
            data-index="${i}"
          >
            <div class="view front-side">
              <span class="material-icons">question_mark</span>
            </div>
            <div class="view back-side">
              <img src="${object.img}" alt="card">
            </div>
          </li>
        `;
      });
   
  
  const cardsElem = document.querySelector('.js-cards');
  cardsElem.innerHTML = listHTML;
  
  
  const cardElem = document.querySelectorAll('.js-card');
  
  
  cardElem.forEach(card => {
    card.addEventListener('click' , flipCard);
  });
  

  let cardCount = 0, cardOne, cardTwo, passCount = 0;

  function flipCard(e) {
    if(cardCount < 2) {
      const clickedCard = e.target;
  
      clickedCard.classList.add('flip');
  
      if(cardCount === 0) {
        cardOne = clickedCard;
        
      } else if(cardCount === 1) {
        cardTwo = clickedCard;
      };
  
      if(cardOne && cardTwo) {
        const [id1, index1] = [cardOne.dataset.id,  cardOne.dataset.index];
        const [id2, index2] = [cardTwo.dataset.id,  cardTwo.dataset.index];
  
        if(index1 === index2) {
          return;
        };
  
        if(id1 === id2) {
          cardOne.classList.add('matched');
          cardTwo.classList.add('matched');
          cardCount = 0;
          cardOne = cardTwo = undefined;
          passCount++;
          if(passCount === 8) {
            gameWin();
          }
          return;
  
        } else {
  
          setTimeout(() => {
            cardOne.classList.add('shake');
            cardTwo.classList.add('shake');
          }, 400);
  
          setTimeout(() => {
            cardOne.classList.remove('flip', 'shake');
            cardTwo.classList.remove('flip', 'shake');
            cardCount = 0;
            cardOne = cardTwo = undefined;
          }, 1000);

        };
      };
  
      cardCount++;
    };
  }

  function gameWin() {

    setTimeout(() => {
      const winElem = document.createElement('div');
      winElem.classList.add('win-message');
  
      winElem.innerHTML = "You Win <br />&nbsp; &nbsp; &nbsp; &#129321;";
  
      cardsElem.appendChild(winElem);
    }, 500);

    setTimeout(memoryGame, 2000);
  }
}