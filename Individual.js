class Individual {

    static SUSCEPTIBLE = 0;
    static BITTEN = 1;
    static ZOMBIES = 2;

    constructor(boundaryX, boundaryY, status) {
        this._boundaryX = boundaryX;
        this._boundaryY = boundaryY;
        this._posX = Math.floor(Math.random() * this._boundaryX);
        this._posY = Math.floor(Math.random() * this._boundaryY);
        this._status = status;
        this._directionX = Math.random();
        this._directionY = Math.random();
        if (Math.floor(Math.random() * 2) >= 1) {
            this._directionX *= -1;
        }
        if (Math.floor(Math.random() * 2) >= 1) {
            this._directionY *= -1;
        }
        this._daysOfInfection = 0;
        this._daysOfZombie = 0;
    }

    update() {
        let speed = 1
        this._posX += this._directionX * speed;
        this._posY += this._directionY * speed;
        if (this._posX > this._boundaryX || this._posX < 0) {
            this._directionX *= -1;
            this._posX += 2 * this._directionX;
        }
        if (this._posY > this._boundaryY || this._posY < 0) {
            this._directionY *= -1;
            this._posY += 2 * this._directionY;
        }
        this.gainImmunity();
    }

    
   
    gainImmunity() {
        if (this._status == Individual.BITTEN) {
            this._daysOfInfection++;
            if (this._daysOfInfection >= 600) {
                this._status = Individual.ZOMBIES;
            }
        }
        if(this._status == Individual.ZOMBIES){
            this._daysOfZombie++;
            if(this._daysOfZombie >= 900){
                this._status = Individual.DEAD;
            }
        }
    }

    infect() {
        if (this._status == Individual.SUSCEPTIBLE) {
            Math.random() <= 0.2 ? this._status = Individual.ZOMBIES : this._status = Individual.BITTEN;
        }
    }

    get posX() {
        return this._posX;
    }

    get posY() {
        return this._posY;
    }

    get status() {
        return this._status;
    }

    set posX(posX) {
        this._posX = posX;
    }

    set posY(posY) {
        this._posY = posY;
    }

    set status(status) {
        this._status = status;
    }

}