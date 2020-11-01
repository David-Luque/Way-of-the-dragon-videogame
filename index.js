
window.onload = () => {
    /*TAKE OUT ALL FUNCTION STATEMENTS; SO THAT WHEN PUSH START BUTTON
    IT ONLY MUST RUN EVERYTHIG ALREADY LOADED*/
    document.getElementById('start-game').addEventListener('click', ()=>{

        //CREAR FUNCION DE TODO EL SET-UP
        const canvas = document.getElementById('main-canvas');
        const ctx = canvas.getContext('2d');
        const viewport = {
            width: parseInt(canvas.getAttribute("width")),
            height: parseInt(canvas.getAttribute("height"))
        }
        const game = new GameArea;
        ctx.font = '30px Arial';
        ctx.fillStyle = "white";

        //DISPLAY DEL SETUP VISUAL
        ctx.drawImage(bruceImgUp, (viewport.width / 2) - 25, (viewport.height / 2) - 25, 50, 50);
        ctx.fillText(`SCORE: ${game.score}`, 350, 30);
        ctx.fillText(`HEALTH: ${game.health}`, 55, 30);

        game.enemies.push(new Fighter(0, 250, DIRECTION.LEFT));
        console.log(game.enemies);

        
        
        // //FUNCION GENERADORA DE ENEMIGOS, TANTO IMAGEN COMO DATA
        // const enemiesGenerator = ()=>{}
        
        //FUNCION PRINCIPAL; LA QUE ITERA DURANTE EL JUEGO
        const mainFunction = () => {
            updateData()
            clearCanvas()
            drawAll()
            requestAnimationFrame(mainFunction)
        };
        
        //FUNCIONES SUBPRINCIPALES
        // const updateGame = () => {
        //     game.clearCanvas();
        //     bruceLee.changeDirection()

        // }
        
        
        const updateData = () => {
            updateEnemies();
            updateBruce();
            endGameCheck();
        };
        
         const clearCanvas = () => {
             ctx.clearRect(0, 0, viewport.width, viewport. height);
        };

        const drawAll = () => {
            ctx.fillText(`SCORE: ${game.score}`, 350, 30);
            ctx.fillText(`HEALTH: ${game.health}`, 55, 30);
            drawBruce();
            drawEnemies()
        }
       
       
        //FUNCIONES MENORES

        const updateEnemies = () => {
            game.timing++;
            if(game.timing % 100 === 0) {
                let randomNo = Math.floor(Math.random() * 4);
                switch (randomNo) {
                    case 0:
                        game.enemies.push(new Fighter(250, 0, DIRECTION.UP));
                        break;
                    case 1:
                        game.enemies.push(new Fighter(500, 250, DIRECTION.RIGHT));
                        break;
                    case 2:
                        game.enemies.push(new Fighter(250, 500, DIRECTION.DOWN))
                        break;
                    case 3:
                        game.enemies.push(new Fighter(0, 250, DIRECTION.LEFT))
                }
            }

            game.enemies.forEach(enemy => {
                enemy.move()
            })
        };

        const updateBruce = () => {
            const encounter = game.enemies.some((_enemy) => {
                return bruceLee.contactWhit(_enemy);
            });

            if(encounter) {
                game.checkContact();
                game.enemies.shift();
            }
        }; 
        
        
        const endGameCheck = ()=>{
            if(game.isGameOver()) {
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
            game.enemies.forEach(enemy => {
                enemy.drawFighter();
            })
            
        };
        
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


        mainFunction();
       
       
        //FUNCION PARA CHECKEAR LA CARGA DE IMAGENES
    //     const checkLoadComplete = () => {
    //         const checkArray = [];
    //         const allImages = [
    //             tatamiImg,
    //             fighterImgLeft,
    //             fighterImgRight,
    //             bruceImgUp,
    //             bruceImgDowm,
    //             bruceImgLeft,
    //             bruceImgRight
    //         ];
            
    //         allImages.forEach(image => {
    //             image.onload = () => {
    //                 checkArray.push(true);
                    
    //                 if(checkArray.length === allImages.length){
    //                     mainFunction()
    //                 }
    //             }
    //         })
    //    }
       
       
       //CALL FUNCTION AND START OF EVERYTHING
       //checkLoadComplete();




        

        
    })
}


