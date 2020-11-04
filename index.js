'use strict';
window.onload = () => {

    //SIZES STANDARS
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


    // const DIRECTION = {
    //     DOWN: 'down',
    //     RIGHT: 'right',
    //     LEFT: 'left',
    //     UP: 'up',
    // }

    // const bruceImg = {
    //     'up': bruceImgUp,
    //     'down': bruceImgDowm,
    //     'left': bruceImgLeft,
    //     'right': bruceImgRight
    // };

    // const enemiesImg = {
    //     'up': fighterImgRight,
    //     'down': fighterImgLeft,
    //     'left': fighterImgRight,
    //     'right': fighterImgLeft
    // }

    // const enemiesImg = {
    //     [DIRECTION.UP]: fighterImgRight,
    //     [DIRECTION.DOWN]: fighterImgLeft,
    //     [DIRECTION.LEFT]: fighterImgRight,
    //     [DIRECTION.RIGHT]: fighterImgLeft
    // };



    // class GameArea {
    //     constructor(_health, _score, _timming){
    //         this.health = _health;
    //         this.score = _score;
    //         this.timing = _timming;
    //     }

    //     // isOver() {
    //     //     if(this.health === 0) {
    //     //         return true;
    //     //     }
    //     //     return false;
    //     // }

    //     // checkContact() {
    //     //     if(bruceLee.direction === enemiesArmy[0].appears) {
    //     //         this.score++
    //     //     } else {
    //     //         this.health--;
    //     //         game.isOver();
    //     //     }
    //     // }
    // }
    


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

    let enemiesArmy = [];
    let endGame = false;
    introMusic.play();

    const gameArea = {
        health: 3,
        score: 0,
        timing: 0
    };

    //ENEMY'S MOVEMENT SPEED AND RATE OF ACCELERATION
    const SPEED = 1;
    const MOMENTUM = 1.03;


    
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
        borderBottom: (viewport.height / 2 - BRUCE_HEIGHT / 2) + BRUCE_HEIGHT,
        borderLeft: viewport.width / 2,
        borderRight: viewport.width / 2
        
    
        // contactWhit: (_enemy) => {
        //     return !(
        //         this.borderBottom < _enemy.top() ||
        //         this.borderTop > _enemy.bottom() ||
        //         this.borderRight < _enemy.left() ||
        //         this.borderLeft > _enemy.right()
        //     );
        // }
    }

    
    
    //___________________________________________________________________________


    document.getElementById('start-game').addEventListener('click', ()=>{

        
        const setUpGame = () => {
        //REMOVE INTRO BUTTONS
        document.getElementById('start-game').style.display = "none";
        document.getElementById('how-to-play').style.display = "none";
        
        //CHANGE INTRO MUSIC TO INGAME MUSIC
        introMusic.pause();
        inGameMusic.play();

        //DISPLAY VISUAL SETUP
        document.getElementById('game-area').style.display = 'flex';
        document.getElementById('game-area').style.flexDirection = 'row-reverse';
        document.getElementById('game-area').style.justifyContent = 'space-between';
        document.getElementById('game-area').style.alignItems = 'center';
        document.getElementById('main-canvas').style.display = "block";
        ctx.drawImage(bruceLee.image, bruceLee.positionX, bruceLee.positionY, BRUCE_WIDTH, BRUCE_HEIGHT);
        document.getElementById('health-display').style.display = 'inherit';
        document.getElementById('health-display').innerText = `HEALTH ${gameArea.health}`;
        document.getElementById('score-display').style.display = 'inherit';
        document.getElementById('score-display').innerText = `SCORE ${gameArea.score}`;

        }
       
        
        
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
        const updateData = () => {
            createAndUpdateEnemies();
            checkCollision();
            endGameCheck();
        };
        

         const clearCanvas = () => {
             ctx.clearRect(0, 0, viewport.width, viewport.height);
        };


        const drawAll = () => {
            document.getElementById('health-display').innerText = `HEALTH ${gameArea.health}`;
            document.getElementById('score-display').innerText = `SCORE ${gameArea.score}`;
            drawBruce();
            drawEnemies();
        }
       

       
        //MINOR FUNCTIONS

        const createAndUpdateEnemies = () => {
            gameArea.timing++;
            
            if(gameArea.timing % 20 === 0) {
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
                enemy.speed *= MOMENTUM;
                
            })
        };

        
        
        // const updateBruce = () => {
        //     const encounter = enemiesArmy.some((_enemy) => {
        //         return bruceLee.contactWhit(_enemy);
        //     });

        //     if(encounter) {
        //         game.checkContact();
        //         //enemiesArmy.splice(0,1);
        //     }
        // }; 
        


        const checkCollision = ()=>{
            enemiesArmy.forEach((enemy)=>{
                switch(enemy.appears) {
                    case 'up':
                        if(enemy.positionY + enemy.height > bruceLee.borderTop) {
                            if(bruceLee.direction === enemy.appears){
                                gameArea.score++
                            } else {
                                gameArea.health--
                            }
                            enemiesArmy = enemiesArmy.filter(e => e !== enemy);
                        }
                    break;
                    case 'right':
                        if(enemy.positionX < bruceLee.borderRight) {
                            // debugger;
                            if(bruceLee.direction === enemy.appears){
                                gameArea.score++
                            } else {
                                gameArea.health--
                            }
                            enemiesArmy = enemiesArmy.filter(e => e !== enemy);
                        }
                    break;
                    case 'down':
                        if(enemy.positionY < bruceLee.borderBottom) {
                            if(bruceLee.direction === enemy.appears){
                                gameArea.score++
                            } else {
                                gameArea.health--
                            }
                            enemiesArmy = enemiesArmy.filter(e => e !== enemy);
                        }
                    break;
                    case 'left':
                        if(enemy.positionX + enemy.width > bruceLee.borderLeft) {
                            // debugger;
                            if(bruceLee.direction === enemy.appears){
                                gameArea.score++
                            } else {
                                gameArea.health--
                            }
                            enemiesArmy = enemiesArmy.filter(e => e !== enemy);
                        }
                    break;
                }
            })
        }




        // enemiesArmy.forEach(enemy => {
        //     if(checkCollision(enemy)) {
        //         setScore();
        //     };
        // })
        
        // const checkCollision = (enemy) => {
        //     let myleft = bruceLee.borderLeft;
        //     let myright = bruceLee.borderRight;
        //     let mytop = bruceLee.borderTop;
        //     let mybottom = bruceLee.borderBottom;
        //     let enemyLeft = enemy.positionX;
        //     let enemyRight = enemy.positionX + FIGHTER_WIDTH;
        //     let enemyTop = enemy.positionY;
        //     let enemyBottom = enemy.positionY + FIGHTER_HEIGHT;
        //     let crash = true;
        //     if ((mybottom < enemyTop) ||
        //     (mytop > enemyBottom) ||
        //     (myright < enemyLeft) ||
        //     (myleft > enemyRight)) {
        //       crash = false;
        //     }
        //     return crash;
        // }

    

        const endGameCheck = ()=>{
            if(gameArea.health === 0) {
                endGame = true;
            }
            return endGame;
        } 
        

        const drawBruce = () => {
            ctx.drawImage(bruceLee.image, bruceLee.positionX, bruceLee.positionY, BRUCE_WIDTH, BRUCE_HEIGHT);
        };
        

        const drawEnemies = () => {
            enemiesArmy.forEach(enemy => {
                enemy.drawFighter();  
            })
        };


        //FUNCTION TO STOP THE GAME AND SET THE FINAL SCORE
        const setScore = () => { 
            document.body.style.backgroundImage = "url('./images/score.jpg')";
            document.body.style.flexDirection = 'column';
            document.body.style.justifyContent = 'flex-start';
            document.body.style.alignItems = 'flex-end';
            
            document.getElementById('title-image').style.display = 'none';
            document.getElementById('main-canvas').style.display = 'none';
            document.getElementById('score-display').style.display = 'none';
            document.getElementById('health-display').style.display = 'none';
            document.getElementById('final-score').style.display = 'inherit';
            document.getElementById('final-score').innerText = `YOUR SCORE ${gameArea.score}`
            document.getElementById('restart-game').style.display = 'inherit';
            document.getElementById('restart-game').style.marginRight = '3rem';
            document.getElementById('restart-game').style.marginTop = '2rem';

            inGameMusic.pause();
            endGameMusic.play();
            
            document.getElementById('restart-game').onclick = () => {
                gameRestart();
            }
            
        };


        const gameRestart = () => {
            location.reload(); 
            // game.health = 0;
            // game.score = 0;
            // enemiesArmy = [];
            // document.getElementById('final-score').style.display = 'none';
            // document.getElementById('restart-game').style.display = 'none';
            // document.getElementById('title-image').style.display = 'block';
            // document.getElementById('main-canvas').style.display = 'block';
            // document.getElementById('score-display').style.display = 'block';
            // document.getElementById('health-display').style.display = 'block';
            // document.body.style.backgroundImage = "url('./images/intro.jpg')";
            // document.body.style.flexDirection = 'column';
            // document.body.style.justifyContent = 'space-evenly';
            // document.body.style.alignItems = 'center';
            // setUpGame();
            // mainFunction();
        }

        
        // //EVENT-LISTENER
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
                    bruceLee.image = bruceImgDowm;
                    break;
                case 's':
                    bruceLee.direction = 'down';
                    bruceLee.image = bruceImgDowm;
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
            }
        })


        
        //EXECUTION OF SET-UP GAME FUNCTION AND MAIN FUNCTION
        setUpGame();

        mainFunction();
       






        //______________________________________________________________________________

       
        //FUNCTION TO CHECK LOADED IMAGES
    //     const checkLoadComplete = () => {
            
    //         tatamiImg.onload = () => {
    //             counter++;
    //             checkAllImagesLoaded();
    //         };
            
    //         introImg.onload = () => {
    //             counter++;
    //             checkAllImagesLoaded();
    //         };

    //         backgroundImg.onload = () => {
    //             counter++;
    //             checkAllImagesLoaded();
    //         };
            
    //         scoreImg.onload = () => {
    //             counter++;
    //             checkAllImagesLoaded();
    //         };

    //         fighterImgLeft.onload = () => {
    //             counter++;
    //             checkAllImagesLoaded();
    //         };
            
    //         fighterImgRight.onload = () => {
    //             counter++;
    //             checkAllImagesLoaded();
    //         };

    //         bruceImgLeft.onload = () => {
    //             counter++;
    //             checkAllImagesLoaded();
    //         };
            
    //         bruceImgRight.onload = () => {
    //             counter++;
    //             checkAllImagesLoaded();
    //         };

    //         bruceImgDowm.onload = () => {
    //             counter++;
    //             checkAllImagesLoaded();
    //         };
            
    //         bruceImgUp.onload = () => {
    //             counter++;
    //             checkAllImagesLoaded();
    //         };
        
            
    //         // const checkCount = 0;
    //         // const checkAllImagesLoaded = () => {
    //         //     if(checkCount === allImages.length) {
    //         //         mainFunction();
    //         //     }
    //         // }
    //         // const allImages = [
    //         //     tatamiImg,
    //         //     introImg,
    //         //     backgroundImg,
    //         //     scoreImg,
    //         //     fighterImgLeft,
    //         //     fighterImgRight,
    //         //     bruceImgUp,
    //         //     bruceImgDowm,
    //         //     bruceImgLeft,
    //         //     bruceImgRight
    //         // ];
            
    //         // allImages.forEach(image => {
    //         //     image.onload = () => {
    //         //         checkCount++;
    //         //         checkAllImagesLoaded();
                    
    //         //     }
    //         // })
    //    }
       
    //     const checkAllImagesLoaded = () => {
    //         console.log('checkAllImagesLoaded');
    //         if (counter === 10) {
    //         console.log('cheched')
    //         mainFunction();
    //         }
    // };
       
    //    //CALL FUNCTION AND START OF EVERYTHING
    //    checkLoadComplete();
        
    })
}


