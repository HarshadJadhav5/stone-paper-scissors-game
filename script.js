let score = JSON.parse(localStorage.getItem('score')) || {win:0, loose:0, tie:0};

document.querySelector('.reset-score-btn')
.addEventListener('click',() => {
    
    localStorage.removeItem('score');
    score = {win: 0, loose: 0, tie: 0};
    document.querySelector('.js-score').innerHTML = `Win:${score.win}, Loose:${score.loose}, Tie:${score.tie}`;

});

//adEL provides event object as parameter
document.querySelector('.body').addEventListener('keydown', (event) => {
    if(event.key === 'r'){
        playGame('stone');
    }
    else if(event.key ==='p'){
        playGame('paper');
    }
    else if(event.key ==='s'){
        playGame('scissors');
    }
    console.log(event.key);
})


let isAutoPlaying=false;
let intervalId = null;
document.querySelector('.auto-play-btn')
.addEventListener('click', () => {
    
    if(!isAutoPlaying) {
        intervalId = setInterval( () => {
            const playerMove = pickComputerMove();
            playGame(playerMove);
        }, 1000)
        isAutoPlaying = true;
    }else{
        clearInterval(intervalId);
        isAutoPlaying = false;
    }

    document.querySelector('.auto-play-btn').innerHTML = `${isAutoPlaying? 'Stop Auto Play':'Auto Play'}`;

})


document.querySelector('.js-stone-button').addEventListener('click', () => {
    playGame('stone');
})
document.querySelector('.js-paper-button').addEventListener('click', () => {
    playGame('paper');
})
document.querySelector('.js-scissors-button').addEventListener('click', () => {
    playGame('scissors');
})
                
function playGame(playerMove)
{
    let computerMove=pickComputerMove();
    let result = '';
    if(playerMove === 'stone')
    {    
        if(computerMove === 'stone')
        {
            result='tie';
        }
        else if(computerMove === 'paper')
        {
            result='loose';
        }
        else 
        {
            result = 'win';
        }

    }
    else if(playerMove === 'paper')
    {
        if(computerMove === 'stone') 
        {
            result='win';
        }
        else if(computerMove === 'paper')
        {
            result='tie';
        }
        else 
        {
            result = 'loose';
        }

    }
    else if (playerMove === 'scissors')
    {
        if(computerMove === 'stone') 
        {
            result='loose';
        }
        else if(computerMove === 'paper')
        {
            result='win';
        }
        else 
        {
            result = 'tie';
        }

    }       

    
    if(result === 'win')
    {
        score.win += 1;
        document.querySelector('.js-win-sound').play();
    }
    else if(result === 'loose')
    {
        score.loose += 1;
        document.querySelector('.js-loose-sound').play();

    }
    else if(result === 'tie')
    {
        score.tie += 1;
    }

    localStorage.setItem('score', JSON.stringify(score));
    console.log(score)

    document.querySelector('.js-result').innerHTML = `${result} `;
    document.querySelector('.js-computerMove').innerHTML = `You choosed ${playerMove}-Computer choosed ${computerMove}`;
    document.querySelector('.js-score').innerHTML = `Win:${score.win}, Loose:${score.loose}, Tie:${score.tie}`;

}
        
function pickComputerMove()
{
    randomNumber = Math.random();

    let computerMove='';
    
    if(randomNumber>=0 && randomNumber <1/3) 
    {
        computerMove='stone';
    }
    else if(randomNumber>=1/3 && randomNumber < 2/3) 
    {
        computerMove='paper';
    }
    else if(randomNumber >=2/3 && randomNumber <1 )
    {
        computerMove='scissors';
    }

    return computerMove;
}
