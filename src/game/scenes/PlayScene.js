import { Scene } from 'phaser';

let fitxes = [];
let tamany = 10
let taulerAmplada = 15
let taulerAlcada = 9
let tauler = [];
let tiles;
let layer;
let map;

let fitxesTiles;
let fitxesMap;
let dibuixa = 3
let midaTile = 64

let posicioJ1 = []

function coordenades(x, y) {
    this.x = x;
    this.y = y;
}

export default class PlayScene extends Scene {
  constructor () {
    super({ key: 'PlayScene' });
  }

  create () {
    console.log("Starting PlayScene ...");
    //let i = this.add.image(400, 300, 'tile_set');
	 // Load a map from a 2D array of tile indices

	 let i;
	 for ( i = 0; i < taulerAlcada; i ++){
		 let j;
		 tauler[i] = []
		 fitxes[i] = []
		 for ( j = 0; j < taulerAmplada; j ++){
			tauler[i].push(Phaser.Math.Between(0, 3));
			fitxes[i].push(-1);
			if ( i == 0 || i == taulerAlcada - 1){
				tauler[i][j] = 5;
			}
		 }
	 }
	 tauler[0][0] = 4;
	 tauler[0][taulerAmplada - 1] = 4;
	 tauler[taulerAlcada - 1][0] = 4;
	 tauler[taulerAlcada - 1][taulerAmplada - 1] = 4;

   arr.push(new coordinate(10, 0));
   arr.push(new coordinate(0, 11));
	 fitxes[0][0] = 0;
	 fitxes[0][taulerAmplada - 1] = 1;
	 fitxes[taulerAlcada - 1][0] = 2;
	 fitxes[taulerAlcada - 1][taulerAmplada - 1] = 3;

	//console.log(tauler)
	// When loading from an array, make sure to specify the tileWidth and tileHeight
	map = this.make.tilemap({ data: tauler, tileWidth: midaTile, tileHeight: midaTile });
	tiles = map.addTilesetImage('tile_set');
	layer = map.createStaticLayer(0, tiles);

	fitxesMap = this.make.tilemap({data : fitxes, tileWidth: midaTile, tileHeight : midaTile});
	fitxesTiles = fitxesMap.addTilesetImage('tile_fitxes');
	layer = fitxesMap.createStaticLayer(0, fitxesTiles);

  this.input.on('pointerdown', function (pointer) {

        mou(1, pointer)

    }, this);
  }

  update () {
	/*
	map = this.make.tilemap({ data: tauler, tileWidth: midaTile, tileHeight: midaTile });
	tiles = map.addTilesetImage('tile_set');
	layer = map.createStaticLayer(0, tiles);*/
  }

}

  function mou (jugador, posicio) {
    console.log(Math.floor(posicio.x / midaTile));
    console.log(Math.floor(posicio.y / midaTile));
}
