'use strict';

//DECLARACIONES INNECESARIAS; SOLUCIONAR!!
const canvas = document.getElementById('main-canvas');
const ctx = canvas.getContext('2d');
const viewport = {
    width: parseInt(canvas.getAttribute("width")),
    height: parseInt(canvas.getAttribute("height"))
}


const GLOBAL_SIZE = 150;
const FIGHTER_HEIGHT = GLOBAL_SIZE - 30;
const FIGHTER_WIDTH = GLOBAL_SIZE ;
const BRUCE_HEIGHT = GLOBAL_SIZE - 30;
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
fighterImgLeft.src = './images/chuck.png'
const fighterImgRight = new Image();
fighterImgRight.src = './images/chuck.png';
const bruceImgLeft = new Image();
bruceImgLeft.src = './images/bruceLeft.png';
const bruceImgRight= new Image();
bruceImgRight.src = './images/bruceRight.png';
const bruceImgDowm = new Image();
bruceImgDowm.src = './images/bruceDown.png';
const bruceImgUp = new Image();
bruceImgUp.src = './images/bruceUp.png';


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

const enemiesImg = {
    'up': fighterImgRight,
    'down': fighterImgLeft,
    'left': fighterImgRight,
    'right': fighterImgLeft
}

// const enemiesImg = {
//     [DIRECTION.UP]: fighterImgRight,
//     [DIRECTION.DOWN]: fighterImgLeft,
//     [DIRECTION.LEFT]: fighterImgRight,
//     [DIRECTION.RIGHT]: fighterImgLeft
// };


const enemiesArmy = [];

class GameArea {
    constructor(){
        this.health = 3;
        //this.enemies = [];
        this.score = 0;
        this.timing = 0;
        //this.interval = setInterval(updateGame, 20)
    }
    // start(){this.setInterval(()=>{this.createEnemy()}, 1000)}
    
    // endGame() {clearInterval(this.interval)}

    isOver() {
        if(this.health === 0) {
            return true;
        }
        return false;
    }

    setScore() { //STOP GAME FUNCTION
        ctx.font = '100px Arial';
        ctx.fillStyle = "red";
        document.body.style.backgroundImage = "url('./images/score.jpg')";
        document.getElementById('title-image').style.display = 'none';
        document.getElementById('main-canvas').style.display = 'none';
        document.getElementById('score').style.display = 'inherit';
        document.getElementById('score').innerText = `YOUR SCORE ${game.score}`
        document.getElementById('restart-game').style.display = 'inherit';
        document.getElementById('restart-game').style.marginRight = '3rem';
        document.getElementById('restart-game').style.marginTop = '2rem';
        document.body.style.justifyContent = 'flex-start';
        document.body.style.alignItems = 'flex-end';
        
    }

    // createEnemy(){
    //     //this.enemies.push()
    // }

    checkContact() {
        if(enemiesArmy.length !== 0) {
            if(bruceLee.direction === enemiesArmy[0].appears) {
                this.score++
            } else {
                this.health--;
                game.isOver();
            }
        }
    }
    
    gamerestart() {}


}


class Fighter {
    constructor(_positionX, _positionY, _appears) {
        this.positionX = _positionX;
        this.positionY = _positionY;
        this.appears = _appears;
        this.image = enemiesImg[_appears];
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
    direction: 'left',
    image: bruceImgDowm,
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
enemiesArmy.push(new Fighter(0, 250, DIRECTION.LEFT));

