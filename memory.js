// See: https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Modo_estricto
'use strict';

const canvas = document.getElementById('main-canvas');
const ctx = canvas.getContext('2d');
const viewport = {
    width: parseInt(canvas.getAttribute("width")),
    height: parseInt(canvas.getAttribute("height"))
}

//TODAS LAS IMAGENES
const tatamiImg = new Image();
tatamiImg.src = './images/tatami.jpg';
const fighterImgLeft = new Image();
fighterImgLeft.src = './images/enemies.jpg'
const fighterImgRight = new Image();
fighterImgRight.src = ''
const bruceImgLeft = new Image();
bruceImgLeft.src = ''
const bruceImgRight= new Image();
bruceImgRight.src = ''
const bruceImgDowm = new Image();
bruceImgDowm.src = ''
const bruceImgUp = new Image();
bruceImgUp.src = ''
//ARRIBA FALTAN LAS URL's

const DIRECTION = {
    DOWN: 'down',
    RIGHT: 'right',
    LEFT: 'left',
    UP: 'up',
}

const bruceImg = {
    [DIRECTION.UP]: bruceImgUp,
    [DIRECTION.DOWN]: bruceImgDowm,
    [DIRECTION.LEFT]: bruceImgLeft,
    [DIRECTION.RIGHT]: bruceImgRight
};

const FIGHTER_HEIGHT = 100;


class GameArea {
    constructor(){
        this.health = 3;
        this.enemies = [];
        this.score = 0;
    }
    start(){
        this.setInterval(()=>{
            this.enemiesGeneration
        }, 1000)
    }
    isGameOver() {
        if(health === 0) {
            clearInterval(this.setInterval);

        }
    }
    createEnemy(){
        //this.enemies.push()
    }
    //gameStop(){}

    //gamerestart(){}

}

const game = new GameArea;

//DEFINIR INSTANCIA CON LA POSICION Y ORIENTACION
//const fighterTop = new Fighter(width / 2 - figherWith / 2, 0, DIRECTION.DOWN)

class Fighter {
    constructor(_positionX, _positionY, _direction) {
        this.positionX = _positionX;
        this.positionY = _positionY;
        this.direction = _direction;
        // this.image = imagen segun posicion inicial;
        // this.imageLeft = fighterImgLeft;
        // this.imageRight = fighterImgRight;
        switch(_direction){
            case DIRECTION.DOWN:
                this.move = this.moveDown;
            break;
            case DIRECTION.RIGHT:
                this.move = this.moveRight;
            break;
            case DIRECTION.LEFT:
                this.move = this.moveLeft;
            break;
            case DIRECTION.UP:
                this.move = this.moveUp;
            break;
        }
    }
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
}



const bruceLee = {
    direction: DIRECTION.LEFT,

    changeDirection: (direction) => {
        this.direction = direction;
    },
    
    sufferDamage: () => {
        this.health--
    },

    crashWith: () => {
        //para choque con enemigos
    }
}
