
window.onload = () => {
    /*TAKE OUT ALL FUNCTION STATEMENTS; SO THAT WHEN PUSH START BUTTON
    IT ONLY MUST RUN EVERYTHIG ALREADY LOADED*/
    document.getElementById('start-game').addEventListener('click', ()=>{

        //definir funcion start game para meter el setup tambien ye implementar el boton restart
        
        const setUpGame = () => {
        //ELIMINAR ELEMENTOS DEL SCREEN DE INTRO
        document.getElementById('start-game').style.display = "none";
        document.getElementById('how-to-play').style.display = "none";

        //GENERAR ENTORNO Y PARTIDA
        const canvas = document.getElementById('main-canvas');
        const ctx = canvas.getContext('2d');
        const viewport = {
            width: parseInt(canvas.getAttribute("width")),
            height: parseInt(canvas.getAttribute("height"))
        }
        let game = new GameArea(3, 0, 0);
        

        //DISPLAY DEL SETUP VISUAL
        document.getElementById('game-area').style.display = 'flex';
        document.getElementById('game-area').style.flexDirection = 'row-reverse';
        document.getElementById('game-area').style.justifyContent = 'space-between';
        document.getElementById('game-area').style.alignItems = 'center';
        document.getElementById('main-canvas').style.display = "block";
        ctx.drawImage(bruceLee.image, (viewport.width / 2) - BRUCE_WIDTH / 2, (viewport.height / 2) - BRUCE_HEIGHT / 2, BRUCE_WIDTH, BRUCE_HEIGHT);
        document.getElementById('health-display').style.display = 'inherit';
        document.getElementById('health-display').innerText = `HEALTH ${game.health}`;
        document.getElementById('score-display').style.display = 'inherit';
        document.getElementById('score-display').innerText = `SCORE ${game.score}`;

        }
       
        setUpGame();
        
        
        //FUNCION PRINCIPAL; LA QUE ITERA DURANTE EL JUEGO
        const mainFunction = () => {
            updateData()
            clearCanvas()
            drawAll()
            requestAnimationFrame(mainFunction)
        };
        
        //FUNCIONES SUBPRINCIPALES
        const updateData = () => {
            updateEnemies();
            updateBruce();
            endGameCheck();
        };
        
         const clearCanvas = () => {
             ctx.clearRect(0, 0, viewport.width, viewport. height);
        };

        const drawAll = () => {
            document.getElementById('health-display').innerText = `HEALTH ${game.health}`;
            document.getElementById('score-display').innerText = `SCORE ${game.score}`;
            drawBruce();
            drawEnemies()
        }
       
       
        //FUNCIONES MENORES

        const updateEnemies = () => {
            //firstEnemy() //para problema del array vacío al empezar
            game.timing++;

            if(game.timing % 50 === 0) {
                let randomNum = Math.floor(Math.random() * 4);
                switch (randomNum) {
                    case 0:
                        enemiesArmy.push(new Fighter(350, 0, DIRECTION.UP));
                        break;
                    case 1:
                        enemiesArmy.push(new Fighter(700, 350, DIRECTION.RIGHT));
                        break;
                    case 2:
                        enemiesArmy.push(new Fighter(350, 700, DIRECTION.DOWN))
                        break;
                    case 3:
                        enemiesArmy.push(new Fighter(0, 350, DIRECTION.LEFT))
                }
            
            }

            enemiesArmy.forEach(enemy => {
                enemy.move()
            })
            
        };

        
        
        const updateBruce = () => {
            const encounter = enemiesArmy.some((_enemy) => {
                return bruceLee.contactWhit(_enemy);
            });

            if(encounter) {
                game.checkContact();
                enemiesArmy.shift();
            }
        }; 
        
        
        const endGameCheck = ()=>{
            if(game.isOver()) {
                setScore();
            }
        } 
        
        
        const drawBruce = () => {
            // /*
            //  * TODO: Understand why I can do this.
            //  * bruceImg[bruceLee.direction] -> bruceImg.down -> bruceImageDown
            //  * When you don't know the value of the object property, but it saved in a variable
            //  * you use brackets("[]").
            //  */
            // const bruceImage = bruceImg[bruceLee.direction];
            // ctx.drawImage(bruceImage, viewport.width / 2, viewport.height / 2, 50, 50);
            ctx.drawImage(bruceImgUp, bruceLee.positionX, bruceLee.positionY, BRUCE_WIDTH, BRUCE_HEIGHT);
        };
        
        const drawEnemies = () => {
            enemiesArmy.forEach(enemy => {
                enemy.drawFighter();
            })
            
        };

        // const firstEnemy = (function() {
        //     var executed = false;
        //     return function() {
        //         if (!executed) {
        //             executed = true;
        //             game.enemies.push(new Fighter(0, 250, DIRECTION.LEFT));
        //         }
        //     };
        // })();


        const setScore = () => { //STOP GAME FUNCTION
            document.body.style.backgroundImage = "url('./images/score.jpg')";
            document.body.style.flexDirection = 'column';
            document.body.style.justifyContent = 'flex-start';
            document.body.style.alignItems = 'flex-end';
            
            document.getElementById('title-image').style.display = 'none';
            document.getElementById('main-canvas').style.display = 'none';
            document.getElementById('score-display').style.display = 'none';
            document.getElementById('health-display').style.display = 'none';
            document.getElementById('final-score').style.display = 'inherit';
            document.getElementById('final-score').innerText = `YOUR SCORE ${game.score}`
            document.getElementById('restart-game').style.display = 'inherit';
            document.getElementById('restart-game').style.marginRight = '3rem';
            document.getElementById('restart-game').style.marginTop = '2rem';
            
            document.getElementById('restart-game').onclick = () => {
                gamerestart();
            }
            
        };


        const gamerestart = () => {
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

        
        // //EVENTLISTENERS FINAL
        document.addEventListener('keydown', (touch) => {
            switch(touch.key) {
                case 'ArrowUp':
                    bruceLee.changeDirection(DIRECTION.UP);
                    console.log(bruceLee.direction);
                    console.log(bruceLee.image);
                    break;
                case 'ArrowDown':
                    bruceLee.changeDirection(DIRECTION.DOWN);
                    console.log(bruceLee.direction);
                    console.log(bruceLee.image);
                    break;
                case 'ArrowLeft':
                    bruceLee.changeDirection(DIRECTION.LEFT);
                    console.log(bruceLee.direction);
                    console.log(bruceLee.image);
                    break;
                case 'ArrowRight':
                    bruceLee.changeDirection(DIRECTION.RIGHT);
                    console.log(bruceLee.direction);
                    console.log(bruceLee.image);
                    break;
            }
        })


        
       
       
        //FUNCION PARA CHECKEAR LA CARGA DE IMAGENES
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
       

       mainFunction();
        

        
    })
}


