import { Scene } from 'phaser';


export default class PlayScene extends Scene {
  constructor () {
    super({ key: 'PlayScene' });
  }

  create () {
    console.log("Starting PlayScene ...");
    let i = this.add.image(400, 300, 'sky');
    console.log(i);

    const bomb = this.physics.add.image(400, 200, 'bomb');
    bomb.setCollideWorldBounds(true);
    bomb.body.onWorldBounds = true; // enable worldbounds collision event
    bomb.setBounce(1);
    bomb.setVelocity(200, 20);
	contadorText = this.add.text(10, 10, bomb.body.position.x, { font: '48px Arial', fill: '#000000' });
  }

  update () {
	  contadorText.setText(bomb.body.position.x);
  }
}
