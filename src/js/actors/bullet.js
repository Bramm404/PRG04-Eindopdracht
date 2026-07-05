import { Actor, Vector, CollisionType } from 'excalibur'
import { Resources } from '../resources.js'
import { Zombie } from './zombies.js'

export class Bullet extends Actor {

    constructor(origin, direction) {
        super({
            x: origin.x + direction.x * 70,
            y: origin.y + direction.y * 70,
            width: 16,
            height: 16,
            collisionType: CollisionType.Passive
        });
        this.vel = direction.normalize().scale(600);
    }

    onInitialize() {
        const bulletImg = Resources.bullet.toSprite();
        bulletImg.scale = new Vector(0.03, 0.03);
        this.graphics.use(bulletImg);        
        this.on('collisionstart', (event) => {
            if (event.other.owner.name === 'enemy') {
                console.log('hit enemy');
                event.other.owner.takeDamage(1);
                this.kill();
            }
        });
    }
}