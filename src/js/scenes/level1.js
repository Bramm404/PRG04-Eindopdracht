import { Actor, Engine, Vector, CollisionType, CompositeCollider, randomIntInRange, EdgeCollider, Scene, Color, vec, Shape, BoundingBox } from 'excalibur'
import { Resources } from '../resources.js'
import { Player } from '../actors/player.js'
import { Bullet } from '../actors/bullet.js'
import { Zombie, FastZombie, SlowZombie } from '../actors/zombies.js'
import { UI } from '../actors/ui.js'

export class Level extends Scene {

    wave = 1;
    waveSize = 10;
    sceneWidth = 4096;
    sceneHeight = 4096;
    enemiesAlive = 0;
    bigZombieCount = 0;

    constructor() {
        super();
    }

    onInitialize(engine) {
        this.engine = engine;

        this.wave = 1;
        this.waveSize = 10;
        this.enemiesAlive = 0;
        this.bigZombieCount = 0;



        //background logic
        const bg = new Actor({
            x: 0,
            y: 0,
            width: this.sceneWidth,
            height: this.sceneHeight,
            anchor: Vector.Zero,
            collisionType: CollisionType.PreventCollision
        })
        const bgImg = Resources.level1.toSprite()
        bgImg.scale = new Vector(this.sceneWidth / bgImg.width, this.sceneHeight / bgImg.height)
        bg.graphics.use(bgImg);
        this.add(bg);

        //player logic
        this.player = new Player()
        this.player.lives = 6;
        this.player.score = 0;
        this.player.ammo = 30;
        this.player.pos = new Vector(2048, 2048)
        this.player.setShootCallback((origin, direction) => {
            const bullet = new Bullet(origin, direction);
            console.log('fire')
            this.add(bullet);
        })
        this.add(this.player)

        //camera
        this.camera.strategy.elasticToActor(this.player, 0.05, 0.05)
        this.camera.strategy.limitCameraBounds(new BoundingBox(0, 0, this.sceneWidth, this.sceneHeight))

        //walls
        this.add(new Actor({ x: 0, y: 0, width: this.sceneWidth, height: 450, collisionType: CollisionType.Fixed, anchor: Vector.Zero }))
        this.add(new Actor({ x: 0, y: this.sceneHeight - 450, width: this.sceneWidth, height: 450, collisionType: CollisionType.Fixed, anchor: Vector.Zero }))
        this.add(new Actor({ x: 0, y: 0, width: 450, height: this.sceneHeight, collisionType: CollisionType.Fixed, anchor: Vector.Zero }))
        this.add(new Actor({ x: this.sceneWidth - 450, y: 0, width: 450, height: this.sceneHeight, collisionType: CollisionType.Fixed, anchor: Vector.Zero }))


        //UI logic
        this.ui = new UI();
        this.ui.setupLivesHud();
        this.ui.updateHud(this.player, this.enemiesAlive, this.waveSize, this.bigZombieCount, this.wave);

        // zombies logic
        engine.clock.schedule(() => { this.spawnWave() }, 1000)
    }

    onPreUpdate(engine) {
        if (this.ui && this.player) {
            this.ui.updateHud(this.player, this.wave, this.enemiesAlive, this.waveSize, this.bigZombieCount);
        }
    }

    spawnWave() {
        this.enemiesAlive = 0;

        if (this.wave % 3 === 0) {
            this.bigZombieCount++;
        }

        for (let i = 0; i < this.waveSize; i++) {
            const fastZombie = new FastZombie();
            fastZombie.pos = this.getSpawnPointOnEdge();

            fastZombie.on('kill', () => {
                this.zombieKilled();

            });

            this.enemiesAlive++;
            this.add(fastZombie);
        }

        for (let j = 0; j < this.bigZombieCount; j++) {
            const bigZombie = new SlowZombie();
            bigZombie.pos = this.getSpawnPointOnEdge();
            this.enemiesAlive++;
            this.add(bigZombie);

            bigZombie.on('kill', () => {
                this.zombieKilled();
            });
        }
    }

    getSpawnPointOnEdge() {
    const rim = 550;
    const side = randomIntInRange(0, 3);

    switch (side) {
        case 0:
            return new Vector(
                randomIntInRange(rim, this.sceneWidth-rim),
                rim
            );
        case 1:
            return new Vector(
                this.sceneWidth - rim,
                randomIntInRange(rim, this.sceneHeight-rim)
            );
        case 2:
            return new Vector(
                randomIntInRange(rim, this.sceneWidth-rim),
                this.sceneHeight - rim
            );
        case 3:
        default:
            return new Vector(
                rim,
                randomIntInRange(rim, this.sceneHeight-rim)
            );
    }
}

    zombieKilled() {
        this.enemiesAlive--;
        if (this.enemiesAlive === 0) {
            this.engine.clock.schedule(() => { this.nextWave() }, 1000)
        }
    }

    nextWave() {
        this.wave++;

        this.waveSize += 2;
        this.spawnWave();
    }
}