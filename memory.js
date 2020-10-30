
//TODAS LAS IMAGENES
const dojoImg = new Image();
dojoImg.src = ''
const fighterImgLeft = new Image();
fighterImgLeft.src = ''
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


//¿HACER CLASS PARA GAME-AREA?

class Fighter {
    constructor(_positionX, _positionY, _direction) {
        this.positionX = _positionX;
        this.positionY = _positionY;
        this.direction = _direction;
        this.image = imagen segun posicion inicial;
        // this.imageLeft = fighterImgLeft;
        // this.imageRight = fighterImgRight;
    }
    moveLeft() {
        this.positionX -= 1;
    }
    moveRight() {
        this.positionX += 1;
    }
    moveUp() {
        this.positionY -= 1;
    }
    moveDown() {
        this.positionY += 1;
    }
}



const bruceLee = {
    health: 3,
    image: bruceImgLeft,
    //imageLeft: bruceImgLeft;
    //imageRight: bruceImgRight;
    //imageUp: bruceImgUp;
    //imageDown: bruceImgDowm;

    changeDirection: () => {},
    
    sufferDamage: () => {
        health--
    },

    crashWith: () => {
        //para choque con enemigos
    }
}



// class MasterFighter extends Fighter {
//     constructor (_direction, _health) {
//         super(_direction)
//         this.health = _health;
//         this.image = bruceImgLeft;
//         // this.imageLeft = bruceImgLeft;
//         // this.imageRight = bruceImgRight;
//         // this.imageUp = bruceImgUp;
//         // this.imageDown = bruceImgDowm;
//     }
    
//     changeDirection() {}
    
//     sufferDamage() {
//         this.health--;
//     };

//     crashWith() {
//         //para choque con enemigos
//     }  
// }