// See: https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Modo_estricto
'use strict';

//DECLARACIONES INNECESARIAS; SOLUCIONAR!!
const canvas = document.getElementById('main-canvas');
const ctx = canvas.getContext('2d');
const viewport = {
    width: parseInt(canvas.getAttribute("width")),
    height: parseInt(canvas.getAttribute("height"))
}

const GLOBAL_SIZE = 60;
const FIGHTER_HEIGHT = GLOBAL_SIZE;
const FIGHTER_WIDTH = GLOBAL_SIZE;
const BRUCE_HEIGHT = GLOBAL_SIZE;
const BRUCE_WIDTH = GLOBAL_SIZE;

//TODAS LAS IMAGENES //FALTAN IMAGENES CORRECTAS
const tatamiImg = new Image();
tatamiImg.src = './images/tatami.jpg';
const introImg = new Image();
introImg.src = './images/intro.jpg';
const backgroundImg = new Image();
backgroundImg.src = './images/back.jpg';
const scoreImg = new Image();
scoreImg.src = './images/score.jpg';
const fighterImgLeft = new Image();
fighterImgLeft.src = './images/enemies.jpg'
const fighterImgRight = new Image();
fighterImgRight.src = './images/enemies.jpg'
const bruceImgLeft = new Image();
bruceImgLeft.src = 'url/left'
const bruceImgRight= new Image();
bruceImgRight.src = 'url/right'
const bruceImgDowm = new Image();
bruceImgDowm.src = 'url/down'
const bruceImgUp = new Image();
bruceImgUp.src = './images/bruce.png'


const DIRECTION = {
    DOWN: 'down',
    RIGHT: 'right',
    LEFT: 'left',
    UP: 'up',
}

const bruceImg = {
    'up': bruceImgUp,
    'down': bruceImgDowm,
    'left': bruceImgLeft,
    'right': bruceImgRight
};

// const enemiesImg = {
//     'up': fighterImgRight,
//     'down': fighterImgLeft,
//     'left': fighterImgRight,
//     'right': fighterImgLeft
//}

const enemiesImg = {
    [DIRECTION.UP]: fighterImgRight,
    [DIRECTION.DOWN]: fighterImgLeft,
    [DIRECTION.LEFT]: fighterImgRight,
    [DIRECTION.RIGHT]: fighterImgLeft
};




class GameArea {
    constructor(){
        this.health = 3;
        this.enemies = [];
        this.score = 0;
        this.timing = 0;
        //this.interval = setInterval(updateGame, 20)
    }
    // start(){this.setInterval(()=>{this.createEnemy()}, 1000)}
    
    // endGame() {clearInterval(this.interval)}

    isGameOver() {
        if(this.health === 0) {
            return true;
        }
        return false;
    }

    setScore() { //STOP GAME FUNCTION
        document.body.innerHTML = 
        `<div>
        <img src=".image/scorescreen.jpg">
        <h1>YOUR SCORE ${game.score}</h1>
        <button>TRY AGAIN</button>
        </div>`;
        /*LA IDEA: IMPRIMIR IMAGEN DE HTML ENCIMA DE TODO. SI SCORE FINAL SE SIEGUE ACTUALIZANDO:
        clearInterval(this.setInterval); U OTRO METODO PARA DETENER EL CICLO SI ES CALLBACK,
        */
    }

    // createEnemy(){
    //     //this.enemies.push()
    // }

    checkContact() {
        if(bruceLee.direction === game.enemies[0].appears) {
            this.score++
        } else {
            this.health--;
            game.isGameOver();
        }
    }
    
    gamerestart() {}

}


//DEFINIR INSTANCIA CON LA POSICION Y ORIENTACION
//const fighterTop = new Fighter(width / 2 - figherWith / 2, 0, DIRECTION.DOWN)

class Fighter {
    constructor(_positionX, _positionY, _appears) {
        this.positionX = _positionX;
        this.positionY = _positionY;
        this.appears = _appears;
        this.image = _appears;
        this.width = FIGHTER_WIDTH;
        this.height = FIGHTER_HEIGHT;
        
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
        this.positionX -= 1;
    }
    moveRight() {
        this.positionX += 1;
        if(200 < this.positionX && this.positionX > 210) {
            this.positionX = 512;
        }
    }
    moveUp() {
        this.positionY -= 1;
    }
    moveDown() {
        this.positionY += 1;
    }

    drawFighter() {
        ctx.drawImage(this.image, this.positionX, this.positionY, this.width, this.height);
    }
    

    left() {
        return this.positionX;
    }

    right() {
        return this.positionX + this.width;
    }

    top() {
        return this.positionY;
    }

    bottom() {
        return this.positionY + this.height;
    }
    
}


const bruceLee = {
    direction: 'right',
    image: bruceImgLeft,
    positionX: viewport.width / 2 - BRUCE_WIDTH / 2,
    positionY: viewport.height / 2 - BRUCE_HEIGHT / 2,
    
    borderTop: viewport.height / 2 - BRUCE_HEIGHT / 2,
    borderBottom: (viewport.height / 2 - BRUCE_HEIGHT / 2) + BRUCE_HEIGHT,
    borderLeft: viewport.width / 2 - BRUCE_WIDTH / 2,
    borderRight: (viewport.width / 2 - BRUCE_WIDTH / 2) + BRUCE_WIDTH,
    
    
    changeDirection: function(direction) {
        this.direction = direction;
        bruceLee.image = bruceImg[direction];
    },
    
    sufferDamage: () => {
        this.health--
    },

    contactWhit: (_enemy) => {
        return !(
            this.borderBottom < _enemy.top() ||
            this.borderTop > _enemy.bottom() ||
            this.borderRight < _enemy.left() ||
            this.borderLeft > _enemy.right()
        );
    }
}



//DECLARACIONES INNECESARIAS; SOLUCIONAR!!
const game = new GameArea;
game.enemies.push(new Fighter(0, 250, DIRECTION.LEFT));

console.log(bruceLee.borderLeft);