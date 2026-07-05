import { Actor, Vector, CollisionType, randomIntInRange, Animation, SpriteSheet, range } from 'excalibur';
import { Resources } from '../resources.js';
import { AmmoDrop, HealthDrop } from './item.js';
import { Player } from './player.js';

export class Zombie extends Actor {

    health;
    damage;
    name = 'enemy';
    pointValue;

    playerContact = false;

    constructor(width = 52, height = 60) {
        super({
            width,
            height

        })
        this.body.collisionType = CollisionType.Active;
    }

    onInitialize(engine) {
        this.on('collisionstart', (event) => {
            if (event.other.owner.name === 'player') {
                this.playerContact = true;
                event.other.owner.loseLife(this.damage);
            }
        });
    }


    onPreUpdate(engine) {
        const player = engine.currentScene?.player;
        if (!player) {
            this.vel = Vector.Zero;
            return;
        }
        const direction = engine.currentScene.player.pos.sub(this.pos).normalize();

        if (this.vel.y < 0) {
            if (this.vel.x < 40 && this.vel.x > -40) {
                this.graphics.use(this.walkUp);
            } else if (this.vel.x > 40) {
                this.graphics.use(this.walkRight);
            } else if (this.vel.x < -40) {
                this.graphics.use(this.walkLeft);
            }
        } else if (this.vel.y > 0) {
            if (this.vel.x < 40 && this.vel.x > -40) {
                this.graphics.use(this.walkDown);
            } else if (this.vel.x > 40) {
                this.graphics.use(this.walkRight);
            } else if (this.vel.x < -40) {
                this.graphics.use(this.walkLeft);
            }
        }

        if (!this.playerContact) {
            this.vel = direction.scale(this.speed);
        } else if (this.playerContact) {
            this.vel = Vector.Zero;
            engine.clock.schedule(() => { this.playerContact = false }, 1000)
        }

    }

    takeDamage(amount = 1) {
        this.health -= amount;

        if (this.health <= 0) {
            this.kill();
            this.dropItem();
            this.awardScore();
        }
    }


    dropItem() {
        if (Math.random() >= 0.75) {
            if (Math.random() >= 0.75) {
                const healthDrop = new HealthDrop();
                healthDrop.pos = this.pos.clone();
                this.scene.add(healthDrop);
            } else {
                const ammoDrop = new AmmoDrop();
                ammoDrop.pos = this.pos.clone();
                this.scene.add(ammoDrop);
            }
        }
    }

    awardScore() {
        const player = this.scene.player;
        if (!player) return;
        player.score += this.pointValue;
        console.log(`Score: ${player.score}`);
    }

}



export class FastZombie extends Zombie {

    speed = 180;
    pointValue = 10;

    constructor() {
        super();
        this.health = 1;
        this.damage = 1;
    }

    onInitialize(engine) {
        super.onInitialize(engine);
        const walkUp = SpriteSheet.fromImageSource({
            image: Resources.zombieSmallWalkUp,
            grid: { rows: 1, columns: 6, spriteWidth: 13, spriteHeight: 15 }
        })

        const zombieWalkUp = Animation.fromSpriteSheet(walkUp, range(0, 5), 160)
        zombieWalkUp.scale = new Vector(4, 4)

        const walkDown = SpriteSheet.fromImageSource({
            image: Resources.zombieSmallWalkDown,
            grid: { rows: 1, columns: 6, spriteWidth: 12, spriteHeight: 15 }
        })

        const zombieWalkDown = Animation.fromSpriteSheet(walkDown, range(0, 5), 160)
        zombieWalkDown.scale = new Vector(4, 4)

        const walkLeft = SpriteSheet.fromImageSource({
            image: Resources.zombieSmallWalkLeft,
            grid: { rows: 1, columns: 6, spriteWidth: 13, spriteHeight: 15 }
        })

        const zombieWalkLeft = Animation.fromSpriteSheet(walkLeft, range(0, 5), 160)
        zombieWalkLeft.scale = new Vector(4, 4)

        const walkRight = SpriteSheet.fromImageSource({
            image: Resources.zombieSmallWalkRight,
            grid: { rows: 1, columns: 6, spriteWidth: 13, spriteHeight: 15 }
        })

        const zombieWalkRight = Animation.fromSpriteSheet(walkRight, range(0, 5), 160)
        zombieWalkRight.scale = new Vector(4, 4)

        this.graphics.add('walkUp', zombieWalkUp)
        this.graphics.add('walkDown', zombieWalkDown)
        this.graphics.add('walkLeft', zombieWalkLeft)
        this.graphics.add('walkRight', zombieWalkRight)

        this.walkUp = this.graphics.use('walkUp')
        this.walkDown = this.graphics.use('walkDown')
        this.walkLeft = this.graphics.use('walkLeft')
        this.walkRight = this.graphics.use('walkRight')
    }
}


export class SlowZombie extends Zombie {
    speed = 100;
    pointValue = 25;

    constructor() {
        super(65, 130);
        this.health = 3;
        this.damage = 2;
        this.body.collider
    }

    onInitialize(engine) {
        super.onInitialize(engine);

        const walkUp = SpriteSheet.fromImageSource({
            image: Resources.zombieBigWalkUp,
            grid: { rows: 1, columns: 6, spriteWidth: 16, spriteHeight: 24 }
        })

        const zombieWalkUp = Animation.fromSpriteSheet(walkUp, range(0, 5), 160)
        zombieWalkUp.scale = new Vector(6, 6)

        const walkDown = SpriteSheet.fromImageSource({
            image: Resources.zombieBigWalkDown,
            grid: { rows: 1, columns: 6, spriteWidth: 16, spriteHeight: 24 }
        })

        const zombieWalkDown = Animation.fromSpriteSheet(walkDown, range(0, 5), 160)
        zombieWalkDown.scale = new Vector(6, 6)

        const walkLeft = SpriteSheet.fromImageSource({
            image: Resources.zombieBigWalkLeft,
            grid: { rows: 1, columns: 6, spriteWidth: 16, spriteHeight: 24 }
        })

        const zombieWalkLeft = Animation.fromSpriteSheet(walkLeft, range(0, 5), 160)
        zombieWalkLeft.scale = new Vector(6, 6)

        const walkRight = SpriteSheet.fromImageSource({
            image: Resources.zombieBigWalkRight,
            grid: { rows: 1, columns: 6, spriteWidth: 16, spriteHeight: 24 }
        })

        const zombieWalkRight = Animation.fromSpriteSheet(walkRight, range(0, 5), 160)
        zombieWalkRight.scale = new Vector(6, 6)

        this.graphics.add('walkUp', zombieWalkUp)
        this.graphics.add('walkDown', zombieWalkDown)
        this.graphics.add('walkLeft', zombieWalkLeft)
        this.graphics.add('walkRight', zombieWalkRight)

        this.walkUp = this.graphics.use('walkUp')
        this.walkDown = this.graphics.use('walkDown')
        this.walkLeft = this.graphics.use('walkLeft')
        this.walkRight = this.graphics.use('walkRight')
    }

}