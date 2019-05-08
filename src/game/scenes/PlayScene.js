import { Scene } from 'phaser';

let nJugadors = 4
let fitxesSprite = []
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
let jugadorAct = 0

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
		 for ( j = 0; j < taulerAmplada; j ++){
			tauler[i].push(Phaser.Math.Between(0, 3));
			if ( i == 0 || i == taulerAlcada - 1){
				tauler[i][j] = 5;
			}
		 }
	 }
	 tauler[0][0] = 4;
	 tauler[0][taulerAmplada - 1] = 4;
	 tauler[taulerAlcada - 1][0] = 4;
	 tauler[taulerAlcada - 1][taulerAmplada - 1] = 4;

   fitxes.push(new coordenades(0, 0));
   fitxes.push(new coordenades(0, taulerAmplada - 1));
   fitxes.push(new coordenades(taulerAlcada - 1, 0));
   fitxes.push(new coordenades(taulerAlcada - 1, taulerAmplada -1));

	//console.log(tauler)
	// When loading from an array, make sure to specify the tileWidth and tileHeight
	map = this.make.tilemap({ data: tauler, tileWidth: midaTile, tileHeight: midaTile });
	tiles = map.addTilesetImage('tile_set');
	layer = map.createStaticLayer(0, tiles);

  for (i = 0; i < nJugadors; i++) {
    fitxesSprite.push(this.add.image(midaTile, midaTile, 'tile_fitxes'));
    switch (i) {
      case 0:
        console.log(i);
        fitxesSprite[i].frame.cutHeight = midaTile; fitxesSprite[i].frame.cutWidth = midaTile;
        fitxesSprite[i].x = midaTile; fitxesSprite[i].y = midaTile;
        break;
      case 1:
        console.log(i);
        fitxesSprite[i].frame.cutX = midaTile; fitxesSprite[i].frame.cutY = midaTile;
        fitxesSprite[i].x = taulerAmplada * midaTile; fitxesSprite[i].y = midaTile;
        break;
      case 2:
        fitxesSprite[i].frame.cutHeight = midaTile; fitxesSprite[i].frame.cutWidth = midaTile;
        fitxesSprite[i].x = midaTile; fitxesSprite[i].y = taulerAlcada * midaTile;
        break;
      case 3:
        fitxesSprite[i].frame.cutHeight = midaTile; fitxesSprite[i].frame.cutWidth = midaTile;
        fitxesSprite[i].x = taulerAmplada * midaTile; fitxesSprite[i].y = taulerAlcada * midaTile;
        break;
    }
    fitxesSprite[i].frame.updateUVs();
  }

  this.input.on('pointerdown', function (pointer) {

        mou(jugadorAct, pointer)

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
    var spriteMoute = fitxesSprite[jugador]
    spriteMoute.x = (Math.floor(posicio.x / midaTile) + 1) * midaTile;
    spriteMoute.y = (Math.floor(posicio.y / midaTile) + 1) * midaTile;
    jugadorAct += 1;
    if (jugadorAct == nJugadors) {
      jugadorAct = 0;
    }
    //fitxesSprite[0].frame.updateUVs();
}
