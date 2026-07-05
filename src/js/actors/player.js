import { Actor, Vector, Keys, SpriteSheet, Animation, range, Label, Color, CollisionType } from 'excalibur'
import { Resources } from '../resources.js'
import { Bullet } from './bullet.js';


export class Player extends Actor {

    lives;
    speed = 400;
    score = 0;
    ammo;
    dirUp;
    dirDown;
    dirLeft;
    dirRight;
    shootCallback = null;
    shootDir = new Vector(1, 0);

    setShootCallback(callback) {
        this.shootCallback = callback;
    }

    constructor() {
        super({
            width: 70,
            height: 70,
            color: Color.Black,
            z: 999
        });

        this.name = 'player';
        this.body.collisionType = CollisionType.Active;
    }

    onInitialize(engine) {
        this.engine = engine;

        const idleDown = SpriteSheet.fromImageSource({
            image: Resources.playerIdleDown,
            grid: { rows: 1, columns: 4, spriteWidth: 32, spriteHeight: 32 }
        })

        const playerIdleDown = Animation.fromSpriteSheet(idleDown, range(0, 3), 160)
        playerIdleDown.scale = new Vector(4, 4)

        const idleLeft = SpriteSheet.fromImageSource({
            image: Resources.playerIdleLeft,
            grid: { rows: 1, columns: 4, spriteWidth: 32, spriteHeight: 32 }
        })

        const playerIdleLeft = Animation.fromSpriteSheet(idleLeft, range(0, 3), 160)
        playerIdleLeft.scale = new Vector(4, 4)

        const idleRight = SpriteSheet.fromImageSource({
            image: Resources.playerIdleRight,
            grid: { rows: 1, columns: 4, spriteWidth: 32, spriteHeight: 32 }
        })

        const playerIdleRight = Animation.fromSpriteSheet(idleRight, range(0, 3), 160)
        playerIdleRight.scale = new Vector(4, 4)

        const idleUp = SpriteSheet.fromImageSource({
            image: Resources.playerIdleUp,
            grid: { rows: 1, columns: 4, spriteWidth: 32, spriteHeight: 32 }
        })

        const playerIdleUp = Animation.fromSpriteSheet(idleUp, range(0, 3), 160)
        playerIdleUp.scale = new Vector(4, 4)

        const walkDown = SpriteSheet.fromImageSource({
            image: Resources.playerWalkDown,
            grid: { rows: 1, columns: 4, spriteWidth: 32, spriteHeight: 32 }
        })

        const playerWalkDown = Animation.fromSpriteSheet(walkDown, range(0, 3), 160)
        playerWalkDown.scale = new Vector(4, 4)

        const walkLeft = SpriteSheet.fromImageSource({
            image: Resources.playerWalkLeft,
            grid: { rows: 1, columns: 4, spriteWidth: 32, spriteHeight: 32 }
        })

        const playerWalkLeft = Animation.fromSpriteSheet(walkLeft, range(0, 3), 160)
        playerWalkLeft.scale = new Vector(4, 4)

        const walkRight = SpriteSheet.fromImageSource({
            image: Resources.playerWalkRight,
            grid: { rows: 1, columns: 4, spriteWidth: 32, spriteHeight: 32 }
        })

        const playerWalkRight = Animation.fromSpriteSheet(walkRight, range(0, 3), 160)
        playerWalkRight.scale = new Vector(4, 4)

        const walkUp = SpriteSheet.fromImageSource({
            image: Resources.playerWalkUp,
            grid: { rows: 1, columns: 4, spriteWidth: 32, spriteHeight: 32 }
        })

        const playerWalkUp = Animation.fromSpriteSheet(walkUp, range(0, 3), 160)
        playerWalkUp.scale = new Vector(4, 4)

        this.graphics.add('idleDown', playerIdleDown)
        this.graphics.add('idleLeft', playerIdleLeft)
        this.graphics.add('idleRight', playerIdleRight)
        this.graphics.add('idleUp', playerIdleUp)
        this.graphics.add('walkDown', playerWalkDown)
        this.graphics.add('walkLeft', playerWalkLeft)
        this.graphics.add('walkRight', playerWalkRight)
        this.graphics.add('walkUp', playerWalkUp)

        this.idleUp = this.graphics.use('idleUp')
        this.idleDown = this.graphics.use('idleDown')
        this.idleLeft = this.graphics.use('idleLeft')
        this.idleRight = this.graphics.use('idleRight')

        this.walkUp = this.graphics.use('walkUp')
        this.walkDown = this.graphics.use('walkDown')
        this.walkLeft = this.graphics.use('walkLeft')
        this.walkRight = this.graphics.use('walkRight')

        this.dirUp = false;
        this.dirDown = false;
        this.dirLeft = false;
        this.dirRight = false;

    }

    onPreUpdate(engine, delta) {
        let xVel = 0;
        let yVel = 0;

        if (engine.input.keyboard.isHeld(Keys.W)) {
            yVel = -this.speed;
            this.dirDown = false;
            this.dirUp = true;
            this.shootDir = new Vector(0, -1);
        }

        if (engine.input.keyboard.isHeld(Keys.S)) {
            yVel = this.speed;
            this.dirUp = false;
            this.dirDown = true;
            this.shootDir = new Vector(0, 1);
        }

        if (engine.input.keyboard.isHeld(Keys.A)) {
            xVel = -this.speed;
            this.dirRight = false;
            this.dirLeft = true;
            this.shootDir = new Vector(-1, 0);
        }

        if (engine.input.keyboard.isHeld(Keys.D)) {
            xVel = this.speed;
            this.dirLeft = false;
            this.dirRight = true;
            this.shootDir = new Vector(1, 0);
        }


        if (this.dirUp) {
            if (xVel === 0 && yVel < 0) {
                this.graphics.use(this.walkUp)
                this.dirLeft = false;
                this.dirRight = false;
            } else {
                this.graphics.use(this.idleUp)
            }
        }
        if (this.dirDown) {
            if (xVel === 0 && yVel > 0) {
                this.graphics.use(this.walkDown)
                this.dirLeft = false;
                this.dirRight = false;
            } else {
                this.graphics.use(this.idleDown)
            }
        }

        if (this.dirLeft) {
            if (xVel < 0) {
                this.graphics.use(this.walkLeft)
                this.dirUp = false;
                this.dirDown = false;
            } else {
                this.graphics.use(this.idleLeft)
            }
        }

        if (this.dirRight) {
            if (xVel > 0) {
                this.graphics.use(this.walkRight)
                this.dirUp = false;
                this.dirDown = false;
            } else {
                this.graphics.use(this.idleRight)
            }
        }
        this.vel = new Vector(xVel, yVel);

        if (engine.input.keyboard.wasPressed(Keys.Space) && this.shootCallback) {
            if (this.ammo > 0) {
                this.ammo--;
                this.shootCallback(this.pos.clone(), this.shootDir.clone());
            }
        }
    }

    loseLife(damage) {
        if (this.isInvulnerable) return;
        this.isInvulnerable = true;
        this.body.collisionType = CollisionType.Passive;
        this.engine.currentScene.ui?.updateHud(this);
        this.lives -= damage;
        if (this.lives <= 0) {
            this.engine.gameOver();
        } else {
            this.actions.blink(150, 100, 6).callMethod(() => {
                this.body.collisionType = CollisionType.Active;
                this.isInvulnerable = false;
            });

        }



    }
}