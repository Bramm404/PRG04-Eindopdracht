import { Actor, Vector, CollisionType, Color } from 'excalibur'
import { Resources } from '../resources.js'


export class Item extends Actor {

    constructor() {
        super({
            width: 50,
            height: 50,
            color: Color.Black,
        });
        this.body.collisionType = CollisionType.Passive;
    }

    onInitialize(engine) {
        this.on('collisionstart', (event) => {
            if (event.other.owner.name === 'player') {
                if (this.name === 'ammobox') {
                    event.other.owner.ammo += 5;
                    
                } else if (this.name === 'healthpack') {
                    event.other.owner.lives += 1;
                }
                this.kill();
            }
        });
    }

}

export class AmmoDrop extends Item {

    constructor() {
        super();
        this.name = 'ammobox';
    }

    onInitialize(engine) {
        super.onInitialize(engine);
        const ammoImg = Resources.ammoDrop.toSprite();
        ammoImg.scale = new Vector(.8, .8);
        this.graphics.use(ammoImg);
    }
}

export class HealthDrop extends Item {

    constructor() {
        super();
        this.name = 'healthpack';
    }

    onInitialize(engine) {
        super.onInitialize(engine);
        const healthImg = Resources.healthDrop.toSprite();
        healthImg.scale = new Vector(.8, .8);
        this.graphics.use(healthImg);
    }

}