import { Actor, Label, Font, FontUnit, Color, Scene, Vector, Keys } from 'excalibur'
import { Resources } from '../resources.js'

export class StartScene extends Scene {

    onInitialize(engine) {
        const sceneWidth = engine.drawWidth;
        const sceneHeight = engine.drawHeight;

        const titleImg = Resources.titleScreen.toSprite()
        titleImg.scale = new Vector(sceneWidth / titleImg.width, sceneHeight / titleImg.height)
        const bg = new Actor({
            x: 0,
            y: 0,
            width: sceneWidth,
            height: sceneHeight,
            anchor: Vector.Zero,
        })
        bg.graphics.use(titleImg)
        this.add(bg);


        const centerX = engine.drawWidth / 2
        let message = new Label({
            text: "Press SPACE to start!",
            anchor: new Vector(0.5, 0.5),
            font: new Font({
                size: 42,
                unit: FontUnit.Px,
                textAlign: 'center',
                baseAlign: 'middle',
            }),
            color: Color.White
        })
        message.pos = new Vector(centerX - message.width / 2, sceneHeight - 200)
        this.add(message)
    }

    onPreUpdate(engine) {
        if (engine.input.keyboard.wasPressed(Keys.Space)) {
            engine.goToScene('Level')
        }
    }
}