import cards from './cards/cards.js'

const styleElem = document.head.appendChild(document.createElement("style"));
const container = document.querySelector('.main');
const cardsElement = [];
const player = new Audio();
player.volume = 0.4;

const settings = {
  train: true,
  set: 0
}
const score = [];

function start(){
  settings.set = 0;
  cards[0].forEach((element, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    if(!settings.train)
      card.classList.add('blue__bg');
    container.append(card);
    card.id = index+1;
    cardsElement.push(card);
  
    const picture = document.createElement('div');
    picture.className = 'card__picture';
    
    if(!settings.train)
      picture.classList.add('blue__bb');

    card.append(picture);
    picture.style.background = `url(cards/${cards[index+1][0].image})`;
    picture.style.backgroundPosition = 'center';
  
    const caption = document.createElement('div');
    caption.className = 'card__caption';
    caption.innerText = element
    card.append(caption);
  });
  
  container.addEventListener('click', listener)
}

function listener(event){
  if(event.target.closest('.card') != null ){
    let id = event.target.closest('.card').id;
    cardsElement.forEach((element) => {
      element.remove();
      cardsElement.splice(1, 0)
    })
    
    container.removeEventListener('click', listener)
    document.querySelector('.menu__item-active').classList.remove('menu__item-active');
    document.querySelectorAll('.menu__item')[id].classList.add('menu__item-active')
    if(settings.train)
      addCardsTrain(id);
    else
      addCardsPlay(id);
  }
  
}


function addCardsTrain(id) {
  settings.set = id;
  cards[id].forEach((element,index) => {
    const card = document.createElement('div');
    card.className = 'card';
    container.append(card);
    card.id = index+1;
    cardsElement.push(card);
  
    const front = document.createElement('div')
    front.className = 'card__front';
    card.append(front);

    const audio = document.createElement('audio');
    audio.src = `cards/${cards[id][index].audioSrc}`;
    front.append(audio);

    const picture = document.createElement('div');
    picture.className = 'card__picture';
    
    front.append(picture);
    picture.style.background = `url(cards/${cards[id][index].image})`;
    picture.style.backgroundPosition = 'center';
  
    const caption = document.createElement('div');
    caption.className = 'card__caption';
    caption.innerText = element.word;
    front.append(caption);

    const button = document.createElement('button');
    button.classList.add('card__button');
    front.append(button);


    const back = document.createElement('div')
    back.className = 'card__back';
    card.append(back);

    const pictureB = document.createElement('div');
    pictureB.classList.add('card__picture');
    back.append(pictureB);
    pictureB.style.background = `url(cards/${cards[id][index].image})`;
    pictureB.style.backgroundPosition = 'center';
  
    const captionB = document.createElement('div');
    captionB.className = 'card__caption';
    captionB.innerText = element.translation;
    back.append(captionB);


    


  })

  const startButton = document.createElement('button');
  startButton.classList.add('main__button');
  startButton.classList.add('hidden');
  startButton.innerText = 'Start game'
  container.append(startButton);

  container.addEventListener('click', setCards)
}

function addCardsPlay(id){
  settings.set = id;
  // add random
  cards[id].forEach((element,index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.classList.add('blue__card');
    container.append(card);
    card.id = index+1;
    cardsElement.push(card);

    const audio = document.createElement('audio');
    audio.src = `cards/${cards[id][index].audioSrc}`;
    card.append(audio);

    const picture = document.createElement('div');
    picture.classList.add('card__picture');
    picture.classList.add('blue__bb');
    card.append(picture);

    picture.style.background = `url(cards/${cards[id][index].image})`;
    picture.style.backgroundPosition = 'center';
  
    
  })
  
  const startButton = document.createElement('button');
  startButton.classList.add('main__button');
  startButton.innerText = 'Start game';
  container.append(startButton);

  
}

function setCards(event) {
  if(event.target.classList.contains('card__button') ){
    let active_card = event.target.closest('.card');
    active_card.style.transform = "rotateY(180deg)";
    event.target.style.visibility = 'hidden';
    active_card.addEventListener('mouseleave', () => {
      active_card.style = "";
      event.target.style.visibility = 'visible';
    })
  }
  else if(event.target.closest('.card') != null && event.target.closest('.card__back') == null){
    player.src = event.target.parentNode.querySelector('audio').src;
    player.pause();
    player.play();
  }
  
}

const menu = document.querySelector('.menu__list');

menu.addEventListener('click', (event) => {
  if(!event.target.classList.contains('menu__list'))
  if(event.target.id != null){
    cardsElement.forEach((element, index) => {
      element.remove();
      cardsElement.splice(1, 0)
    })
    if(document.querySelector('.main__button') != null){
      document.querySelector('.main__button').remove();
    }
    if(document.querySelector('.main__button-repeat') != null){
      document.querySelector('.main__button-repeat').remove();
    }
    /////////////remove
    document.querySelector('.score').classList.add('hidden')
    clearScore();
    container.removeEventListener('click', game_clickCallback);
    container.removeEventListener('click', listener);
    container.removeEventListener('click', setCards)

    document.querySelector('.menu__item-active').classList.remove('menu__item-active');
    document.querySelectorAll('.menu__item')[event.target.id].classList.add('menu__item-active')
    if(event.target.id == 0){
      start();
    }
    else{
      if(settings.train)
        addCardsTrain(event.target.id);
      else
        addCardsPlay(event.target.id);
    }
  }
  
});

const menu_toggle = document.querySelector('#menu__toggle');


document.addEventListener('click', function toggleListener(event){
  if(event.target.closest('.menu') != null && event.target.className != 'menu__list'){
    menu_toggle.checked = !menu_toggle.checked;
    
  }
  else if(menu_toggle.checked && event.target.className != 'menu__list'){
    menu_toggle.checked = false;
  }
})




const mode_toggle = document.querySelector('#mode__toggle');


//made less big
mode_toggle.addEventListener('change', () => {
  settings.train = !settings.train;

  if(!settings.train)
    if(settings.set != 0){
      if(document.querySelector('.main__button') != null){
        document.querySelector('.main__button').remove();
      }
      if(document.querySelector('.main__button-repeat') != null){
        document.querySelector('.main__button-repeat').remove();
      }
      /////////////remove
      document.querySelector('.score').classList.add('hidden')
      clearScore();

      document.querySelectorAll('.switcher__caption').forEach(element => {
        element.classList.toggle('switcher__disabled')
      })
      container.removeEventListener('click', game_clickCallback);
      cardsElement.forEach((element) => {
        element.remove();
        cardsElement.splice(1, 0)
      })
      container.removeEventListener('click', setCards);
      addCardsPlay(settings.set);

      if(settings.train){  
        styleElem.innerHTML = '';
      }
      else{
        styleElem.innerHTML = `.menu__btn > span,
        .menu__btn > span::before,
        .menu__btn > span::after {
          background-color: #6db1ff;
        } 
        .menu__item-active{
          background-color: #6db1ff;
        }
        .menu__item-active:hover{
          background-color: #429aff;
        }
        `;
      }
    }
    else{
      cardsElement.forEach(element => {
        element.classList.toggle('blue__bg');
      })
    
      document.querySelectorAll('.card__picture').forEach(element => {
        element.classList.toggle('blue__bb');
      })
      document.querySelectorAll('.switcher__caption').forEach(element => {
        element.classList.toggle('switcher__disabled')
      })

      if(settings.train){  
        styleElem.innerHTML = '';
      }
      else{
        styleElem.innerHTML = `.menu__btn > span,
        .menu__btn > span::before,
        .menu__btn > span::after {
          background-color: #6db1ff;
        } 
        .menu__item-active{
          background-color: #6db1ff;
        }
        .menu__item-active:hover{
          background-color: #429aff;
        }
        `;
      }
    }
  else{
    if(settings.set != 0){
      if(document.querySelector('.main__button') != null){
        document.querySelector('.main__button').remove();
      }
      if(document.querySelector('.main__button-repeat') != null){
        document.querySelector('.main__button-repeat').remove();
      }
      document.querySelector('.score').classList.add('hidden')
      /////////////remove
      document.querySelectorAll('.switcher__caption').forEach(element => {
        element.classList.toggle('switcher__disabled')
      })
      clearScore();
      container.removeEventListener('click', game_clickCallback);
      cardsElement.forEach((element) => {
        element.remove();
        cardsElement.splice(1, 0)
      })
      container.removeEventListener('click', setCards);
      addCardsTrain(settings.set);

      if(settings.train){  
        styleElem.innerHTML = '';
      }
      else{
        styleElem.innerHTML = `.menu__btn > span,
        .menu__btn > span::before,
        .menu__btn > span::after {
          background-color: #6db1ff;
        } 
        .menu__item-active{
          background-color: #6db1ff;
        }
        .menu__item-active:hover{
          background-color: #429aff;
        }
        `;
      }
    }
    else{
      cardsElement.forEach(element => {
        element.classList.toggle('blue__bg');
      })
    
      document.querySelectorAll('.card__picture').forEach(element => {
        element.classList.toggle('blue__bb');
      })
      document.querySelectorAll('.switcher__caption').forEach(element => {
        element.classList.toggle('switcher__disabled')
      })

      if(settings.train){  
        styleElem.innerHTML = '';
      }
      else{
        styleElem.innerHTML = `.menu__btn > span,
        .menu__btn > span::before,
        .menu__btn > span::after {
          background-color: #6db1ff;
        } 
        .menu__item-active{
          background-color: #6db1ff;
        }
        .menu__item-active:hover{
          background-color: #429aff;
        }
        `;
      }
    }
  }

})

let numbers = [];

container.addEventListener('click', mainButtonCallback)

function mainButtonCallback(event){
  
  if(event.target.classList.contains('main__button')){
    numbers = [...Array(8).keys()]
    .sort(() => Math.random() - 0.5);
    gameStart();
  }
  else if(event.target.classList.contains('main__button-repeat')){
    repeat();
  }
}

function gameStart() {
  //
  // change button
  //
  const button = document.querySelector('.main__button');
  button.classList.remove('main__button');
  button.classList.add('main__button-repeat');
  button.innerText = '';

      
  player.src = `cards/${cards[settings.set][numbers[0]].audioSrc}`;
  player.play();
  

  //
  document.querySelector('.score').classList.remove('hidden')
  game();

  

  
  
}

function game() {
  setTimeout(container.addEventListener('click', game_clickCallback),0)
}

function game_clickCallback(event) {
  if(event.target.closest('.card') != null && !event.target.closest('.card').classList.contains('disabled')){
    setTimeout(game_checkCard(event.target.closest('.card'), numbers[0]+1), 0);    
    container.removeEventListener('click', game_clickCallback);
    setTimeout(game(),500);
    
    
  }
}

function game_checkCard(element, number) {
  
  let newElement = document.createElement('div');
  newElement.classList.add('star');

  if(element.id == number){
    score.push(1);
    player.src = 'assets/correct.mp3';
    player.play();
    
    
    element.classList.add('disabled')
    newElement.classList.add('star__win');
    numbers.splice(0,1);

    if(numbers.length == 0){
      setTimeout(game_end(), 500) 
    }
    else{
        setTimeout(() => {
        player.src = `cards/${cards[settings.set][numbers[0]].audioSrc}`;
        player.play();
      }, 1000);
    }
  }
  else{
    score.push(2);
    player.src = 'assets/error.mp3';
    player.play();
    newElement.classList.add('star__lose');
    
  }

  document.querySelector('.score').append(newElement)
}

function repeat(){
  player.src = `cards/${cards[settings.set][numbers[0]].audioSrc}`;
  player.play();
}

function game_end(){

 
  document.querySelectorAll('.star').forEach(element => {
    element.remove();
  })
  document.querySelector('.score').classList.add('hidden')

  cardsElement.forEach(element => {
    element.remove();
  })

  document.querySelector('.main__button-repeat').remove();
  container.removeEventListener('click', mainButtonCallback);
  container.removeEventListener('click', game_clickCallback);

  const final = document.createElement('div')
  final.classList.add('final');

  if(score.includes(2)){
    final.classList.add('final__lose')
    player.src = `assets/lose.mp3`;
  }
  else{
    final.classList.add('final__win')
    player.src = `assets/win.wav`;
  }
  document.querySelector('.wrapper').append(final)
  player.play()
  score.forEach(element => {
    score.splice(0,1);
  }) 
  setTimeout(() => {
    final.remove();
    location.href = location
  },2000)
}

function clearScore(){
  document.querySelectorAll('.star').forEach(element => {
    element.remove()
  })
}

start();
