import {Scene} from 'phaser'
import sky from '@/game/assets/sky.png';
import bomb from '@/game/assets/bomb.png';
import boto from '@/game/assets/botoPlaceholder.png';
import tile_set from '@/game/assets/tileset.png';
//import tile_fitxes from '@/game/assets/tileset_fichas.png';
import fitxa_y from '@/game/assets/ficha_1.png';
import fitxa_b from '@/game/assets/ficha_2.png';
import fitxa_r from '@/game/assets/ficha_3.png';
import fitxa_g from '@/game/assets/ficha_4.png';
import flip from '@/game/assets/flip.png';
import overlay from '@/game/assets/overlay.png';


export default class BootScene extends Scene {
    constructor() {
        super({key: 'BootScene'})
    }

    preload() {
        this.load.image('sky', sky);
        this.load.image('bomb', bomb);
		this.load.image('boto', boto);
		this.load.image('tile_set', tile_set);
		//this.load.image('tile_fitxes', tile_fitxes);

    this.load.image('fitxa_y', fitxa_y);
    this.load.image('fitxa_b', fitxa_b);
    this.load.image('fitxa_r', fitxa_r);
    this.load.image('fitxa_g', fitxa_g);

    this.load.image('flip', flip);
    this.load.image('overlay', overlay);
        // this.load.audio('thud', ['assets/thud.mp3', 'assets/thud.ogg'])
    }

    create() {
		let boto1 = this.add.sprite(400, 300, 'boto').setInteractive();
		this.add.text(250, 280, 'Play Game', { font: '25px Arial Bold', fill: 'Black' });
		let th = this

		boto1.on('pointerdown', function (pointer) {
			this.setTint(0xff0000);
			th.scene.start('PlayScene');
		});

		boto1.on('pointerout', function (pointer) {
			this.clearTint();
		});

		boto1.on('pointerup', function (pointer) {
			this.clearTint();
		});
    }

}
