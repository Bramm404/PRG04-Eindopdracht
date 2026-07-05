import { Scene, Vector, Label, Font, FontUnit, Color, Keys } from 'excalibur'


export class EndScene extends Scene {


    onInitialize(engine) {
        const centerX = engine.drawWidth / 2;
        const leftX = 40;

        const message = new Label({
            text: 'Game Over',
            pos: new Vector(centerX, 250),
            anchor: new Vector(0.5, 0.5),
            font: new Font({
                family: 'Arial',
                size: 74,
                unit: FontUnit.Px,
                color: Color.White,
                textAlign: 'center',
                baseAlign: 'middle',
            }),
        });
        this.add(message);

        const scoreLabel = new Label({
            text: `Score: ${this.engine?.finalScore ?? 0}`,
            pos: new Vector(centerX, 330),
            anchor: new Vector(0.5, 0.5),
            font: new Font({
                family: 'Arial',
                size: 30,
                unit: FontUnit.Px,
                color: Color.White,
                textAlign: 'center',
                baseAlign: 'middle',
            }),
        });
        this.add(scoreLabel);

        const restartMessage = new Label({
            text: 'Press SPACE to Restart',
            pos: new Vector(centerX, 800),
            anchor: new Vector(0.5, 0.5),
            font: new Font({
                family: 'Arial',
                size: 36,
                unit: FontUnit.Px,
                color: Color.White,
                textAlign: 'center',
                baseAlign: 'middle',
            }),
        });
        this.add(restartMessage);

        const leaderboardTitle = new Label({
            text: 'Leaderboard',
            pos: new Vector(leftX, 40),
            anchor: new Vector(0, 0.5),
            font: new Font({
                family: 'Arial',
                size: 32,
                unit: FontUnit.Px,
                color: Color.White,
                textAlign: 'left',
                baseAlign: 'middle',
            }),
        });
        this.add(leaderboardTitle);

        const entries = JSON.parse(localStorage.getItem('leaderboard') ?? '[]');

        entries.slice(0, 5).forEach((entry, index) => {
            const dateText = new Date(entry.date).toLocaleDateString();
            const row = new Label({
                text: `${index + 1}. ${entry.score}  ${dateText}`,
                pos: new Vector(leftX, 85 + index * 30),
                anchor: new Vector(0, 0.5),
                font: new Font({
                    family: 'Arial',
                    size: 24,
                    unit: FontUnit.Px,
                    color: Color.White,
                    textAlign: 'left',
                    baseAlign: 'middle',
                }),
            });
            this.add(row);
        });
    }
    onPreUpdate(engine) {
        if (engine.input.keyboard.wasPressed('Space')) {
            engine.restartGame()
        }
    }
}



