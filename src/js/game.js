import { Color, DisplayMode, Engine, BoundingBox } from "excalibur";
import { Resources, ResourceLoader } from "./resources.js";
import { Level } from "./scenes/level1.js";
import { EndScene } from "./scenes/end.js";
import { Player } from "./actors/player.js";
import { StartScene } from "./scenes/start.js";



export class Game extends Engine {

    constructor() {
        super({
            width: 1280,
            height: 720,
            maxFps: 60,
            displayMode: DisplayMode.FillScreen,
            color: Color.Green
        })

        this.start(ResourceLoader).then(() => this.startGame())
    }


    startGame() {
        this.addScenes()
        this.goToScene('Start')
    }

    addScenes() {
        this.startScene = new StartScene();
        this.endScene = new EndScene();
        this.levelScene = new Level();
        this.addScene('Start', this.startScene);
        this.addScene('End', this.endScene);
        this.addScene('Level', this.levelScene);
    }

    gameOver() {
        const score = this.currentScene?.player?.score ?? 0;
        this.finalScore = score;
        this.currentScene?.ui?.destroy?.();
        this.saveScoreToLeaderboard(score);


        this.goToScene('End');
    }

    async restartGame() {
        document.getElementById('lives-hud')?.remove();



        const level = this.levelScene
        level.player.lives = 6;
        level.player.score = 0;
        level.player.ammo = 30;

        level.player = null;
        for (const actor of level.actors) {
            if (actor.name === 'enemy' || actor.name === 'ammobox' || actor.name === 'healthpack') {
                level.remove(actor);
            }
        }

        this.removeScene('Level');

        this.addScenes()

        await this.goToScene('Start');

    }

    saveScoreToLeaderboard(score) {
        const key = 'leaderboard';
        const currentEntries = JSON.parse(localStorage.getItem(key) ?? '[]');

        currentEntries.push({
            score,
            date: new Date().toISOString()
        });

        currentEntries.sort((a, b) => b.score - a.score);
        localStorage.setItem(key, JSON.stringify(currentEntries.slice(0, 10)));
    }

}

new Game()