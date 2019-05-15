import {Scene} from 'phaser'
import tile_set from '@/game/assets/tileset.png';
//import tile_fitxes from '@/game/assets/tileset_fichas.png';
import fitxa_y from '@/game/assets/ficha_1.png';
import fitxa_b from '@/game/assets/ficha_2.png';
import fitxa_r from '@/game/assets/ficha_3.png';
import fitxa_g from '@/game/assets/ficha_4.png';
import flip from '@/game/assets/flip.png';
import overlay from '@/game/assets/overlay.png';
import overlay2 from '@/game/assets/overlay2.png';
import fondo from '@/game/assets/fondo_titulo.png';
import boton_jugar from '@/game/assets/b_jugar.png';
import over_dau from '@/game/assets/over_dau.png';
import game_over from '@/game/assets/game_over.png';

export default class BootScene extends Scene {
    constructor() {
        super({key: 'BootScene'})
    }

    preload() {
  		this.load.image('tile_set', tile_set);

      this.load.image('fitxa_y', fitxa_y);
      this.load.image('fitxa_b', fitxa_b);
      this.load.image('fitxa_r', fitxa_r);
      this.load.image('fitxa_g', fitxa_g);

      this.load.image('flip', flip);
      this.load.image('overlay', overlay);
      this.load.image('overlay2', overlay2);
      this.load.image('fondo', fondo);
      this.load.image('boton_jugar', boton_jugar);
      this.load.image('over_dau', over_dau);
      this.load.image('game_over', game_over);
      // this.load.audio('thud', ['assets/thud.mp3', 'assets/thud.ogg'])
    }

    create() {
    this.add.image(0, 0, 'fondo').setOrigin(0);
    var height = 576;
    var width = 960;
		let boto1 = this.add.sprite(960 / 2, 576 / 2, 'boton_jugar').setInteractive();
    boto1.setScale(0.5);
		let th = this;

		boto1.on('pointerdown', function (pointer) {
			th.scene.start('PlayScene');
		});

		boto1.on('pointerout', function (pointer) {
			this.clearTint();
		});

		boto1.on('pointerover', function (pointer) {
			this.setTint(0xFF7878);
		});
    }

}
