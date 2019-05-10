import { Scene } from 'phaser';
let th;
let nJugadors = 1
let fitxesSprite = []
let fitxes = [];
let tamany = 10
let taulerAmplada = 15
let taulerAlcada = 9
let tauler = [];
let tiles;
let layer;
let map;

let casellaPosible = [];
let cruzeta = [];

let fitxesTiles;
let fitxesMap;
let dibuixa = 3
let midaTile = 64
let jugadorAct = 0

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
   th = this;
	 let i;
   //Crear Tauler
	 for ( i = 0; i < taulerAlcada; i ++){
		 let j;
		 tauler[i] = [];
		 for ( j = 0; j <  taulerAmplada; j ++){
			tauler[i].push(Phaser.Math.Between(0, 3));
			if ( i == 0 || i == taulerAlcada - 1){
				tauler[i][j] = 5;
			}
		 }
	 }
   //Caselles Posibles
   for ( i = 0; i <= taulerAmplada; i++) {
     casellaPosible[i] = [];
     let j;
     for ( j = 0; j < taulerAmplada; j ++){
       casellaPosible[i].push(true);
       if ( j == 1 || j == taulerAlcada){
         casellaPosible[i][j] = false;
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

	// When loading from an array, make sure to specify the tileWidth and tileHeight
	map = this.make.tilemap({ data: tauler, tileWidth: midaTile, tileHeight: midaTile });
	tiles = map.addTilesetImage('tile_set');
	layer = map.createStaticLayer(0, tiles);

  //Crea els sprites de jugadors
  for (i = 0; i < nJugadors; i++) {
    var nouSprite;
    switch (i) {
      case 0:
        nouSprite = this.add.image(midaTile, midaTile, 'fitxa_y');
        nouSprite.setScale(.25);
        nouSprite.setOrigin(1);
        fitxesSprite.push(nouSprite);
        break;
      case 1:
        nouSprite = this.add.image(taulerAmplada * midaTile, midaTile, 'fitxa_b');
        nouSprite.setScale(.25);
        nouSprite.setOrigin(1);
        fitxesSprite.push(nouSprite);
        break;
      case 2:
        nouSprite = this.add.image(midaTile, taulerAlcada * midaTile, 'fitxa_r');
        nouSprite.setScale(.25);
        nouSprite.setOrigin(1);
        fitxesSprite.push(nouSprite);
        break;
      case 3:
        nouSprite = this.add.image(taulerAmplada * midaTile, taulerAlcada * midaTile, 'fitxa_g');
        nouSprite.setScale(.25);
        nouSprite.setOrigin(1);
        fitxesSprite.push(nouSprite);
        break;
    }
  }

  this.input.on('pointerdown', function (pointer) {

        mou(jugadorAct, pointer)

    }, this);
  }

  update () {

  }

}

  function mou (jugador, posicio) {
    var spriteMoure = fitxesSprite[jugador]
    var nouPosX = (Math.floor(posicio.x / midaTile) + 1);
    var nouPosY = (Math.floor(posicio.y / midaTile) + 1);
    console.log(" ON ES MOU ");
    console.log("JUGADRO = " + String(jugador));
    console.log(nouPosX);
    console.log(nouPosY);
    console.log(casellaPosible[nouPosX][nouPosY]);
    console.log(" ");
    if ( casellaPosible[nouPosX][nouPosY] ) {
      console.log("JUGADOR ACT = " + String(jugadorAct));
      //marca_posible(fitxesSprite[jugadorAct].x, fitxesSprite[jugadorAct].y); // TEST
      casellaPosible[nouPosX][nouPosY] = false;
      flip_casella(nouPosX * midaTile, nouPosY * midaTile);
      spriteMoure.x = nouPosX * midaTile;
      spriteMoure.y = nouPosY * midaTile;
      spriteMoure.setDepth(1);
      jugadorAct += 1;
      if (jugadorAct == nJugadors) {
        jugadorAct = 0;
      }
      marca_posible(fitxesSprite[jugadorAct].x, fitxesSprite[jugadorAct].y);//, Phaser.Math.Between(1, 6));
    }
  }

  function flip_casella (casellaX, casellaY) {
    th.add.image(casellaX - midaTile / 2, casellaY - midaTile / 2 , 'flip').setDepth(0);
  }

  function marca_posible(casellaX, casellaY, numDau = 3) {
    var posXtauler = (Math.floor(casellaX / midaTile));
    var posYtauler = (Math.floor(casellaY / midaTile));
    for (var i = 0; i < cruzeta.length; i++) {
      cruzeta[i].destroy();
    }
    //MARCA LA CASELLA
    var over = th.add.image(casellaX, casellaY, 'overlay');
    over.setOrigin(1);
    over.setScale(1)
    cruzeta.push(over);

    //MOVIMENT POSIBLE VERTICAL ADALT
    if (posYtauler - numDau > 1 && casellaPosible[posXtauler][posYtauler - numDau]){ // FUNCIONA
      dibuixa_overlay(casellaX, casellaY - midaTile, 1, numDau, false);
    }
    //MOVIMENT POSIBLE VERTICAL ABAIX
    if (posYtauler + numDau < taulerAlcada && casellaPosible[posXtauler][posYtauler + numDau]){ //FUNCIONA
      dibuixa_overlay(casellaX, casellaY + (numDau * midaTile), 1, numDau);
    }
    //MOVIMENT POSIBLE HORITZONTAL ESQUERRA
    if (posXtauler - numDau > 0 && casellaPosible[posXtauler - numDau][posYtauler]){
      dibuixa_overlay(casellaX - midaTile, casellaY, numDau, 1, false);
    }
    //MOVIMENT POSIBLE HORITZONTAL DRETA
    if (posXtauler + numDau <= taulerAmplada && casellaPosible[posXtauler + numDau][posYtauler]){
      dibuixa_overlay(casellaX + (midaTile * numDau), casellaY, numDau);
    }
}

  function dibuixa_overlay(posX, posY, scaleX, scaleY = 1, final = true){
    var overlay = th.add.image(posX, posY, 'overlay');
    overlay.setScale(scaleX, scaleY);
    overlay.setOrigin(1);
    cruzeta.push(overlay);
    if (final){
      cruzeta.push(th.add.image(posX, posY, 'overlay2').setOrigin(1));
    }
    else {
      cruzeta.push(th.add.image(posX - (midaTile * (scaleX - 1)), posY - (midaTile * (scaleY - 1)), 'overlay2').setOrigin(1));
    }
  }
