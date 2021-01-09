'use strict';

window.onload = () => {

    //SIZE STANDARS
    const GLOBAL_SIZE = 100;
    const FIGHTER_HEIGHT = GLOBAL_SIZE * 0.7;
    const FIGHTER_WIDTH = GLOBAL_SIZE ;
    const BRUCE_HEIGHT = GLOBAL_SIZE * 0.7;
    const BRUCE_WIDTH = GLOBAL_SIZE;

    //ALL IMAGES
    const tatamiImg = new Image();
    tatamiImg.src = './images/tatami.jpg';
    const introImg = new Image();
    introImg.src = './images/intro.jpg';
    const backgroundImg = new Image();
    backgroundImg.src = './images/back.jpg';
    const scoreImg = new Image();
    scoreImg.src = './images/score.jpg';
    
    const fighterImgLeft = new Image();
    fighterImgLeft.src = './images/chuck-left.png'
    const fighterImgRight = new Image();
    fighterImgRight.src = './images/chuck-right.png';
    
    const startBruceImg = new Image();
    startBruceImg.src = './images/start-bruce.png';
    const bruceImgLeft = new Image();
    bruceImgLeft.src = './images/bruceLeft.png';
    const bruceImgRight= new Image();
    bruceImgRight.src = './images/bruceRight.png';
    const bruceImgDowm = new Image();
    bruceImgDowm.src = './images/bruceUp.png';
    const bruceImgUp = new Image();
    bruceImgUp.src = './images/bruceDown.png';


    //GENERATION OF ENVIROMENT, MUSIC AND GAMEPLAY
    const canvas = document.getElementById('main-canvas');
    const ctx = canvas.getContext('2d');
    const viewport = {
        width: parseInt(canvas.getAttribute("width")),
        height: parseInt(canvas.getAttribute("height"))
    };

    const introMusic = new Audio('./sounds/intro-music.ogg');
    const inGameMusic = new Audio('./sounds/ingame-music.ogg');
    const endGameMusic = new Audio('./sounds/endgame-music.ogg');
    const woundSound = new Audio('./sounds/wound-sound.mp3');
    const hitSound = new Audio('./sounds/hit-sound.mp3');
    const gameOverSound = new Audio('./sounds/game-over-sound.mp3');
    const readySound = new Audio('./sounds/ready-sound.mp3');

    let enemiesArmy = [];
    let endGame = false;
    
    const VOLUME = 0.1
    introMusic.volume = VOLUME;
    inGameMusic.volume = VOLUME / 2;
    woundSound.volume = VOLUME;
    hitSound.volume = VOLUME;
    endGameMusic.volume = VOLUME;
    gameOverSound.volume = VOLUME;
    readySound.volume = VOLUME;
    introMusic.play();
    
    //ENEMY'S BEHAVIOR PARAMETERS
    const SPEED = 1;
    let acceleration = 1.01;
    let tempo = 35;

    const gameArea = {
        health: 3,
        score: 0,
        timing: 0,
        increaseDifficulty: ()=>{
            acceleration += 0.005;
            tempo -= 3;
        }
    };

    //ENEMIES CLASS
    class Fighter {
        constructor(_positionX, _positionY, _appears, _image) {
            this.positionX = _positionX;
            this.positionY = _positionY;
            this.appears = _appears;
            this.image = _image;
            this.width = FIGHTER_WIDTH;
            this.height = FIGHTER_HEIGHT;
            this.speed = SPEED;
            
            switch(_appears){
                case 'down':
                    this.move = this.moveUp;
                break;
                case 'right':
                    this.move = this.moveLeft;
                break;
                case 'left':
                    this.move = this.moveRight;
                break;
                case 'up':
                    this.move = this.moveDown;
                break;
            }
        }

        move() {}

        moveLeft() {
            this.positionX -= this.speed;
        
        }
        moveRight() {
            this.positionX += this.speed;
        
        }
        moveUp() {
            this.positionY -= this.speed;
            
        }
        moveDown() {
            this.positionY += this.speed;
        
        }

        drawFighter() {
            ctx.drawImage(this.image, this.positionX, this.positionY, this.width, this.height);
        }
    }


    const bruceLee = {
        direction: '',
        image: startBruceImg,
        positionX: viewport.width / 2 - BRUCE_WIDTH / 2,
        positionY: viewport.height / 2 - BRUCE_HEIGHT / 2,
        
        borderTop: viewport.height / 2 - BRUCE_HEIGHT / 2,
        borderBottom: viewport.height / 2 + BRUCE_HEIGHT / 2,
        borderLeft: viewport.width / 2,
        borderRight: viewport.width / 2
    }


    //FUNCTIONS

    // SETUP 
    const setUpGame = () => {
        //REMOVE INTRO BUTTONS
        document.getElementById('start-game').style.display = "none";
        document.getElementById('how-to-play').style.display = "none";
        
        //CHANGE INTRO MUSIC TO INGAME MUSIC
        introMusic.pause();
        inGameMusic.play();

        //DISPLAY VISUAL SETUP
        const gameViewStyle = document.getElementById('game-area');
        const healthCounter = document.getElementById('health-display');
        const scoreCounter = document.getElementById('score-display');

        gameViewStyle.style.display = 'flex';
        gameViewStyle.style.flexDirection = 'row-reverse';
        gameViewStyle.style.justifyContent = 'space-between';
        gameViewStyle.style.alignItems = 'center';
        document.getElementById('main-canvas').style.display = 'block';
        ctx.drawImage(bruceLee.image, bruceLee.positionX, bruceLee.positionY, BRUCE_WIDTH, BRUCE_HEIGHT);
        healthCounter.style.display = 'inherit';
        scoreCounter.style.display = 'inherit';
        healthCounter.innerText = `HEALTH ${gameArea.health}`;
        scoreCounter.innerText = `SCORE ${gameArea.score}`;
    };

    const start = () => {
        readySound.play();
    
        setTimeout(() => {setUpGame()}, 1500);
        setTimeout(() => {mainFunction()}, 1500);
        setInterval(() => {gameArea.increaseDifficulty()}, 10000);
    
    
        //KEYBOARD EVENT-LISTENER
        document.addEventListener('keydown', (touch) => {
            
            switch(touch.key) {
                case 'ArrowUp':
                    bruceLee.direction = 'up';
                    bruceLee.image = bruceImgUp;
                    break;
                case 'w':
                    bruceLee.direction = 'up';
                    bruceLee.image = bruceImgUp;
                    break;
    
                case 'ArrowDown':
                    bruceLee.direction = 'down';
                    bruceLee.image = bruceImgUp;
                    break;
                case 's':
                    bruceLee.direction = 'down';
                    bruceLee.image = bruceImgUp;
                    break;
    
                case 'ArrowLeft':
                    bruceLee.direction = 'left';
                    bruceLee.image = bruceImgLeft;
                    break;
                case 'a':
                    bruceLee.direction = 'left';
                    bruceLee.image = bruceImgLeft;
                    break;
    
                case 'ArrowRight':
                    bruceLee.direction = 'right';
                    bruceLee.image = bruceImgRight;
                    break;
                case 'd':
                    bruceLee.direction = 'right';
                    bruceLee.image = bruceImgRight;
                    break;
            };            
        });
    
        document.addEventListener('keyup', (touch) => {
            if( touch.key === 'ArrowUp' || touch.key === 'w' ||
                touch.key === 'ArrowDown' || touch.key === 's' ||
                touch.key === 'ArrowLeft' || touch.key === 'a' ||
                touch.key === 'ArrowRight' || touch.key === 'd') {
                
                bruceLee.direction = '';
                bruceLee.image = bruceImgDowm;
            }
        });
    }

    //RESTART ALL
    const gameRestart = () => {
        location.reload(); 
    };

    document.getElementById('start-game').addEventListener('click', ()=>{
        start();
    });

    document.addEventListener('keydown', (event) => {
        if(event.key === 'r') {
            start();
        }
    });


    //MAIN FUNCTION, WICH ITERATES DURING THE GAME
    const mainFunction = () => {
        if (!endGame) {
            clearCanvas();
            drawAll();
            updateData();
            requestAnimationFrame(mainFunction);
        } else {
            setScore();
        }  
    };

    //SECONDARY FUNCTIONS
    
    const clearCanvas = () => {
        ctx.clearRect(0, 0, viewport.width, viewport.height);
    };
    
    const drawAll = () => {
        document.getElementById('health-display').innerText = `HEALTH ${gameArea.health}`;
        document.getElementById('score-display').innerText = `SCORE ${gameArea.score}`;
        drawBruce();
        drawEnemies();
    };

    const drawBruce = () => {
        ctx.drawImage(bruceLee.image, bruceLee.positionX, bruceLee.positionY, BRUCE_WIDTH, BRUCE_HEIGHT);
    };
    
    const drawEnemies = () => {
        enemiesArmy.forEach(enemy => {
            enemy.drawFighter();  
        })
    };


    const updateData = () => {
        createAndUpdateEnemies();
        checkCollision();
        endGameCheck();
    };
    

    //MINOR FUNCTIONS

    const createAndUpdateEnemies = () => {
        gameArea.timing++;
        
        if(gameArea.timing % tempo === 0) {
            let randomNum = Math.floor(Math.random() * 4);
            switch (randomNum) {
                case 0:
                    enemiesArmy.push(new Fighter(viewport.width / 2 - FIGHTER_WIDTH / 2, 0 - FIGHTER_HEIGHT, 'up', fighterImgLeft));
                    break;
                case 1:
                    enemiesArmy.push(new Fighter(viewport.width, viewport.height / 2 - FIGHTER_HEIGHT / 2, 'right', fighterImgLeft));
                    break;
                case 2:
                    enemiesArmy.push(new Fighter(viewport.width / 2 - FIGHTER_WIDTH / 2, viewport.height, 'down', fighterImgRight));
                    break;
                case 3:
                    enemiesArmy.push(new Fighter(0 - FIGHTER_WIDTH, viewport.height / 2 - FIGHTER_HEIGHT / 2, 'left', fighterImgRight));
                    break;
            }
        }

        enemiesArmy.forEach(enemy => {
            enemy.move();
            enemy.speed *= acceleration;
            
        })
    };

    const checkCollision = ()=>{
        enemiesArmy.forEach((enemy)=>{
            switch(enemy.appears) {
                case 'up':
                    if(enemy.positionY + enemy.height > bruceLee.borderTop) {
                        if(bruceLee.direction === enemy.appears){
                            gameArea.score++;
                            hitSound.play();

                        } else {
                            gameArea.health--;
                            woundSound.play();
                        }
                        enemiesArmy = enemiesArmy.filter(e => e !== enemy);
                    }
                break;
                case 'right':
                    if(enemy.positionX < bruceLee.borderRight) {
                        if(bruceLee.direction === enemy.appears){
                            gameArea.score++;
                            hitSound.play();
                        } else {
                            gameArea.health--;
                            woundSound.play();
                        }
                        enemiesArmy = enemiesArmy.filter(e => e !== enemy);
                    }
                break;
                case 'down':
                    if(enemy.positionY < bruceLee.borderBottom) {
                        if(bruceLee.direction === enemy.appears){
                            gameArea.score++;
                            hitSound.play();
                        } else {
                            gameArea.health--;
                            woundSound.play();
                        }
                        enemiesArmy = enemiesArmy.filter(e => e !== enemy);
                    }
                break;
                case 'left':
                    if(enemy.positionX + enemy.width > bruceLee.borderLeft) {
                        if(bruceLee.direction === enemy.appears){
                            gameArea.score++;
                            hitSound.play();
                        } else {
                            gameArea.health--;
                            woundSound.play();
                        }
                        enemiesArmy = enemiesArmy.filter(e => e !== enemy);
                    }
                break;
            }
        })
    };

    const endGameCheck = ()=>{
        if(gameArea.health === 0) {
            endGame = true;
        }
        return endGame;
    };


    //FUNCTION TO STOP THE GAME AND SET THE FINAL SCORE
    const setScore = () => { 

        document.getElementById('title-image').style.display = 'none';
        document.getElementById('main-canvas').style.display = 'none';
        document.getElementById('score-display').style.display = 'none';
        document.getElementById('health-display').style.display = 'none';

        const bodyDisplay = document.body;
        const finalScore = document.getElementById('final-score')
        const restartButton = document.getElementById('restart-game-btn');
        bodyDisplay.style.backgroundImage = "url('./images/score.jpg')";
        bodyDisplay.style.flexDirection = 'column';
        bodyDisplay.style.justifyContent = 'flex-start';
        bodyDisplay.style.alignItems = 'flex-end';
        finalScore.style.display = 'inherit';
        finalScore.innerText = `YOUR SCORE ${gameArea.score}`;
        restartButton.style.display = 'inherit';
        restartButton.style.marginRight = '3rem';
        restartButton.style.marginTop = '2rem';

        inGameMusic.pause();
        gameOverSound.play();
        endGameMusic.play();
        
        restartButton.onclick = () => {
            gameRestart();
        }
        document.onkeyup = (touch) => {
            if(touch.key == 'r') {
                gameRestart();
            };
        };
        
    };
}