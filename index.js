
window.onload = () => {
    /*TAKE OUT ALL FUNCTION STATEMENTS; SO THAT WHEN PUSH START BUTTON
    IT ONLY MUST RUN EVERYTHIG ALREADY LOADED*/
    document.getElementById('start-game').addEventListener('click', ()=>{

        //definir funcion start game para meter el setup tambien ye implementar el boton restart
        
        const setUpGame = () => {
        //ELIMINAR ELEMENTOS DEL SCREEN DE INTRO
        document.getElementById('start-game').style.display = "none";
        document.getElementById('how-to-play').style.display = "none"; 
        document.getElementById('main-canvas').style.display = "inherit";


        //GENERAR ENTORNO Y PARTIDA
        const canvas = document.getElementById('main-canvas');
        const ctx = canvas.getContext('2d');
        const viewport = {
            width: parseInt(canvas.getAttribute("width")),
            height: parseInt(canvas.getAttribute("height"))
        }
        const game = new GameArea;
        
        

        //DISPLAY DEL SETUP VISUAL
        ctx.drawImage(bruceLee.image, (viewport.width / 2) - BRUCE_WIDTH / 2, (viewport.height / 2) - BRUCE_HEIGHT / 2, BRUCE_WIDTH, BRUCE_HEIGHT);
        ctx.font = '2.5rem PressStart2P';
        ctx.fillStyle = "white";
        ctx.fillText(`SCORE: ${game.score}`, 475, 40);
        ctx.fillText(`HEALTH: ${game.health}`, 55, 40);

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
            ctx.fillText(`SCORE: ${game.score}`, 475, 40);
            ctx.fillText(`HEALTH: ${game.health}`, 55, 40);
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
                game.setScore();
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
       

       mainFunction()
        

        
    })
}


