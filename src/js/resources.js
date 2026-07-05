import { ImageSource, Resource, Loader, SpriteSheet } from 'excalibur'

// voeg hier jouw eigen resources toe
const Resources = {
    level1: new ImageSource('./images/maps/level1.png'),
    titleScreen: new ImageSource('./images/maps/titlescreen.png'),

    playerIdleDown: new ImageSource('/images/sprites/player/idle/cowboy_idle.png'),
    playerIdleLeft: new ImageSource('/images/sprites/player/idle/idle_left.png'),
    playerIdleRight: new ImageSource('/images/sprites/player/idle/idle_right-sheet-sheet.png'),
    playerIdleUp: new ImageSource('/images/sprites/player/idle/cowboy_idle_top-Sheet.png'),

    playerWalkDown: new ImageSource('/images/sprites/player/move/cowboy_walk_down.png'),
    playerWalkLeft: new ImageSource('/images/sprites/player/move/cowboy_walk_left.png'),
    playerWalkRight: new ImageSource('/images/sprites/player/move/cowboy_walk_right.png'),
    playerWalkUp: new ImageSource('/images/sprites/player/move/cowboy_walk_up.png'),

    bullet: new ImageSource('/images/sprites/bullet/bullet.webp'),

    zombieSmallIdleDown: new ImageSource('/images/sprites/Enemies/Zombie_fast/Zombie_Small_Down_Idle-Sheet6.png'),
    zombieSmallIdleLeft: new ImageSource('/images/sprites/Enemies/Zombie_fast/Zombie_Small_Side-left_Idle-Sheet6.png'),
    zombieSmallIdleRight: new ImageSource('/images/sprites/Enemies/Zombie_fast/Zombie_Small_Side_Idle-Sheet6.png'),
    zombieSmallIdleUp: new ImageSource('/images/sprites/Enemies/Zombie_fast/Zombie_Small_Up_Idle-Sheet6.png'),

    zombieSmallWalkDown: new ImageSource('/images/sprites/Enemies/Zombie_fast/Zombie_Small_Down_walk-Sheet6.png'),
    zombieSmallWalkLeft: new ImageSource('/images/sprites/Enemies/Zombie_fast/Zombie_Small_Side-left_Walk-Sheet6.png'),
    zombieSmallWalkRight: new ImageSource('/images/sprites/Enemies/Zombie_fast/Zombie_Small_Side_Walk-Sheet6.png'),
    zombieSmallWalkUp: new ImageSource('/images/sprites/Enemies/Zombie_fast/Zombie_Small_Up_Walk-Sheet6.png'),

    zombieBigIdleDown: new ImageSource('/images/sprites/Enemies/Zombie_slow/Zombie_Big_Down_Idle-Sheet6.png'),
    zombieBigIdleLeft: new ImageSource('/images/sprites/Enemies/Zombie_slow/Zombie_Big_Side-left_Idle-Sheet6.png'),
    zombieBigIdleRight: new ImageSource('/images/sprites/Enemies/Zombie_slow/Zombie_Big_Side_Idle-Sheet6.png'),
    zombieBigIdleUp: new ImageSource('/images/sprites/Enemies/Zombie_slow/Zombie_Big_Up_Idle-Sheet6.png'),

    zombieBigWalkDown: new ImageSource('/images/sprites/Enemies/Zombie_slow/Zombie_Big_Down_Walk-Sheet8.png'),
    zombieBigWalkLeft: new ImageSource('/images/sprites/Enemies/Zombie_slow/Zombie_Big_Side-left_Walk-Sheet8.png'),
    zombieBigWalkRight: new ImageSource('/images/sprites/Enemies/Zombie_slow/Zombie_Big_Side_Walk-Sheet8.png'),
    zombieBigWalkUp: new ImageSource('/images/sprites/Enemies/Zombie_slow/Zombie_Big_Up_Walk-Sheet8.png'),

    ammoDrop: new ImageSource('/images/sprites/items/ammobox.png'),
    healthDrop: new ImageSource('/images/sprites/items/healthpack.png'),

    ammo: new ImageSource('/images/sprites/UI/ammo.png'),
}

const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
    // if (res.path) console.log('loading:', res.path)
}

export { Resources, ResourceLoader }