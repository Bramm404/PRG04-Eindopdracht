import { Actor, CollisionType, SpriteSheet, Vector, Color, Font, FontUnit } from 'excalibur'
import { Resources } from '../resources.js'

export class UI extends Actor {

    constructor() {
        super({
            x: 20,
            y: 20,
            width: 1280,
            height: 120,
            color: Color.Transparent,
            z: 1000,
            anchor: Vector.Zero,
            collisionType: CollisionType.PreventCollision
        });

        this.currentLives = 0;
        this.currentAmmo = 0;
        this.currentScore = 0;
    }

    onInitialize(engine) {
        this.engine = engine;
        const heartSpriteSheet = SpriteSheet.fromImageSource({
            image: Resources.heart,
            grid: { rows: 1, columns: 1, spriteWidth: 32, spriteHeight: 32 }
        });

        const fullHeart = heartSpriteSheet.getSprite(0, 0);
        const halfHeart = heartSpriteSheet.getSprite(1, 0);
        const emptyHeart = heartSpriteSheet.getSprite(2, 0);

        const ammoImg = Resources.ammo.toSprite();



    }

    setupLivesHud() {
        const existingHud = document.getElementById('lives-hud');
        if (existingHud) {
            this.livesHud = existingHud;
            this.heartsRow = existingHud.querySelector('[data-hearts]');
            this.ammoRow = existingHud.querySelector('[data-ammo]');
            this.scoreRow = existingHud.querySelector('[data-score]');
            this.waveRow = existingHud.querySelector('[data-wave]');
            this.zombieRow = existingHud.querySelector('[data-zombies]');
            return;
        }

        const hud = document.createElement('div');
        hud.id = 'lives-hud';
        hud.style.position = 'fixed';
        hud.style.inset = '0';
        hud.style.top = '20px';
        hud.style.left = '20px';
        hud.style.display = 'flex';
        hud.style.flexDirection = 'column';
        hud.style.gap = '8px';
        hud.style.zIndex = '1000';
        hud.style.pointerEvents = 'none';
        hud.style.fontFamily = 'Arial, sans-serif';
        hud.style.color = 'white';
        hud.style.fontSize = '22px';
        hud.style.fontWeight = '700';
        hud.style.textShadow = '2px 2px 0 black';

        const heartsRow = document.createElement('div');
        heartsRow.dataset.hearts = 'true';
        heartsRow.style.position = 'absolute';
        heartsRow.style.top = '20px';
        heartsRow.style.left = '20px';
        heartsRow.style.display = 'flex';
        heartsRow.style.gap = '4px';
        heartsRow.style.alignItems = 'center';

        const zombieRow = document.createElement('div');
        zombieRow.dataset.zombies = 'true';
        zombieRow.style.position = 'absolute';
        zombieRow.style.top = '20px';
        zombieRow.style.left = '50%';
        zombieRow.style.transform = 'translateX(-50%)';

        const waveRow = document.createElement('div');
        waveRow.dataset.wave = 'true';
        waveRow.style.position = 'absolute';
        waveRow.style.top = '20px';
        waveRow.style.right = '20px';

        const ammoRow = document.createElement('div');
        ammoRow.dataset.ammo = 'true';
        ammoRow.style.position = 'absolute';
        ammoRow.style.top = '100px';
        ammoRow.style.left = '20px';
        ammoRow.style.display = 'flex';
        ammoRow.style.gap = '8px';
        ammoRow.style.alignItems = 'center';

        const scoreRow = document.createElement('div');
        scoreRow.dataset.score = 'true';
        scoreRow.style.position = 'absolute';
        scoreRow.style.top = '150px';
        scoreRow.style.left = '20px';

        hud.appendChild(heartsRow);
        hud.appendChild(zombieRow);
        hud.appendChild(waveRow);
        hud.appendChild(ammoRow);
        hud.appendChild(scoreRow);
        document.body.appendChild(hud);

        this.livesHud = hud;
        this.heartsRow = heartsRow;
        this.zombieRow = zombieRow;
        this.waveRow = waveRow;
        this.ammoRow = ammoRow;
        this.scoreRow = scoreRow;
    }

    updateHud(player, wave, enemiesAlive, waveSize, bigZombieCount) {
        if (!this.livesHud || !player) return;

        const maxHearts = 3;
        const maxLives = 6;
        const lives = Math.max(0, Math.min(maxLives, player.lives ?? 0));
        const ammo = Math.max(0, player.ammo ?? 0);
        const score = Math.max(0, player.score ?? 0);

        this.heartsRow.innerHTML = '';
        for (let index = 0; index < maxHearts; index++) {
            const heart = document.createElement('img');

            const heartHealth = lives - index * 2;

            if (heartHealth >= 2) {
                heart.src = '/images/sprites/UI/fullheart.png';
            } else if (heartHealth === 1) {
                heart.src = '/images/sprites/UI/halfheart.png';
            } else {
                heart.src = '/images/sprites/UI/emptyheart.png';
            }

            heart.style.width = '64px';
            heart.style.height = '64px';
            heart.style.objectFit = 'contain';

            this.heartsRow.appendChild(heart);
        }

        this.zombieRow.textContent = `Zombies: ${enemiesAlive} / ${waveSize + bigZombieCount}`;
        this.waveRow.textContent = `Wave: ${wave}`;

        this.ammoRow.innerHTML = '';
        const ammoImg = document.createElement('img');
        ammoImg.src = '/images/sprites/UI/ammo.png';
        ammoImg.style.width = '26px';
        ammoImg.style.height = '26px';
        ammoImg.style.objectFit = 'contain';

        const ammoText = document.createElement('span');
        ammoText.textContent = `ammo x ${ammo}`;

        this.ammoRow.appendChild(ammoImg);
        this.ammoRow.appendChild(ammoText);

        this.scoreRow.textContent = `Score: ${score}`;
    }

    destroy() {
        if (this.livesHud) {
            this.livesHud.remove();
        }

        this.livesHud = null;
        this.heartsRow = null;
        this.ammoRow = null;
        this.scoreRow = null;
    }
}
