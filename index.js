
window.onload = () => {
    document.getElementById('start-game').addEventListener('click', ()=>{
        const canvas = document.getElementById('main-canvas');
        const ctx = canvas.getContext('2d');
        const viewport = {
            width: parseInt(canvas.getAttribute("width")),
            height: parseInt(canvas.getAttribute("height"))
        }
        const game = new GameArea;
        ctx.font = '30px Arial';
        ctx.fillStyle = "white";

        
        //DISPLAY DEL SETUP
        ctx.fillRect((viewport.width / 2) - 25, (viewport.height / 2) - 25, 50, 50);
        ctx.fillText(`SCORE: ${game.score}`, 350, 30);
        ctx.fillText(`HEALTH: ${game.health}`, 55, 30);

        const fighter1 = new Fighter(0, 240, DIRECTION.LEFT);
        console.log(fighter1);

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
        const updateData = () => {
            updateEnemies();
            checkColision()
            endGameCheck();
        };
        
        const clearCanvas = () => {
            ctx.clearRect(0, 0, canvas.width, canvas. height);
        };

        const drawAll = () => {
            ctx.fillText(`SCORE: ${game.score}`, 350, 30);
            ctx.fillText(`HEALTH: ${game.health}`, 55, 30);
            drawBruce();
            drawEnemies();
        }
       
       
        //FUNCIONES MENORES

        const updateEnemies = () => {
            //aqui: actualizar posicion de enemigos por cada uno
            fighter1.moveRight();
        };

        const checkColision = () => {};
        
        
        const endGameCheck = ()=>{
            if(game.health === 0) {
                isGameOver()
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
            ctx.fillRect((viewport.width / 2) - 25, (viewport.height / 2) - 25, 50, 50);
        };
        3
        const drawEnemies = () => {
            //empezar con 1 y luego loop
            ctx.drawImage(fighterImgLeft, fighter1.positionX, fighter1.positionY, 50, 50)
        };
        

        // //EVENTLISTENERS FINAL
        // document.addEventListener('keydown', (touch) => {
        //     switch(touch) {
        //         case 'ArrowUp':
        //             bruceLee.changeDirection(DIRECTION.UP)
        //             break;
        //         case 'ArrowDown':
        //             bruceLee.direction = 'down';
        //             bruceLee.image = bruceImgUp
        //             break;
        //         case 'ArrowLeft':
        //             bruceLee.direction = 'left';
        //             bruceLee.image = bruceImgLeft;
        //             break;
        //         case 'ArrowRight':
        //             bruceLee.direction = 'right';
        //             bruceLee.image = bruceImgRight;
        //             break;
                
        //     }
        // })

        
        mainFunction()
        
       
        //EVENTLISTENERS temporal
        document.addEventListener('keydown', (touch) => {
            switch(touch.key) {
            case 'ArrowUp':
                ctx.fillStyle = 'green';
                ctx.fillRect((viewport.width / 2) - 25, (viewport.height / 2) - 25, 50, 50);
                console.log(touch);
                break;
            case 'ArrowDown':
                ctx.fillStyle = 'red';
                ctx.fillRect((viewport.width / 2) - 25, (viewport.height / 2) - 25, 50, 50);;
                console.log(touch);
                break;
            case 'ArrowLeft':
                ctx.fillStyle = 'blue';
                ctx.fillRect((viewport.width / 2) - 25, (viewport.height / 2) - 25, 50, 50);;
                console.log(touch);
                break;
            case 'ArrowRight':
                ctx.fillStyle = 'yellow';
                ctx.fillRect((viewport.width / 2) - 25, (viewport.height / 2) - 25, 50, 50);;
                console.log(touch);
                break;
            }
        })
       
       
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


