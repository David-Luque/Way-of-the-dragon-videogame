
window.onload = () => {
    document.getElementById('#start-game').addEventListener('click', ()=>{

        const ctx = document.getElementById('main-canvas').getContext('2d');
        ctx.drawImage = (dojoImg, 0, 0, canvaswidth, canvaslength);
        ctx.fillStyle = 'color';
        ctx.font = 'size | fuente molona oriental';

        //FUNCION PRINCIPAL; LA QUE ITERA DURANTE EL JUEGO
        const mainFunction = () => {
            updateData()
            clearCanvas()
            drawAll()
            requestAnimationFrame(mainFunction)
        }
        
        //FUNCIONES SUBPRINCIPALES
        const updateData = () => {
            const defeatedEnemies //contador de muertos y puntos: ¿array o contador simple?
            ctx.fillText(`SCORE ${defeatedEnemies.length}`, posX, posY)
            
            updateBruce();
            updateEnemies();
        };
        
        const clearCanvas = () => {
            ctx.clearRect(0, 0, canvas.width, canvas. height);
        };

        const drawAll = () => {
            ctx.drawImage(bruceLee.image, posX, posY, width, height)
            //aqui: dibujar todos los enemigos activos en cada momento segun su posicion actual
        }
       
       
        //FUNCIONES MENORES
        const updateBruce = () => {}; //FUNCION INUTIL DE MOMENTO. PARA BONUS
        
        const updateEnemies = () => {
            //aqui: actualizar posicion en x y en y para cada uno
        };
        
        
        //EVENTLISTENERS
        document.addEventListener('keydown', (touch) => {
            switch(touch) {
                case touch.key === 'ArrowUp':
                    bruceLee.direction = 'up';
                    bruceLee.image = bruceImgUp;
                    break;
                case touch.key === 'ArrowDown':
                    bruceLee.direction = 'down';
                    bruceLee.image = bruceImgUp
                    break;
                case touch.key === 'ArrowLeft':
                    bruceLee.direction = 'left';
                    bruceLee.image = bruceImgLeft;
                    break;
                case touch.key === 'ArrowRight':
                    bruceLee.direction = 'right';
                    bruceLee.image = bruceImgRight;
                    break;
                
            }
        })


        //FUNCION PARA CHECKEAR LA CARGA DE IMAGENES
       const checkLoadComplete = () => {
            const checkArray = [];
            const allImages = [
                dojoImg,
                fighterImgLeft,
                fighterImgRight,
                bruceImgUp,
                bruceImgDowm,
                bruceImgLeft,
                bruceImgRight
            ];
            
            allImages.forEach(image => {
                image.onload = () => {
                    checkArray.push(true);
                }
                if(checkArray.length === allImages.length){
                    mainFunction()
                }
            })
       }
       
       
       //CALL FUNCTION AND START OF EVERYTHING
       checkLoadComplete();




        

        
    })
}


