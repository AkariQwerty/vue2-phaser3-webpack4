import { Scene } from 'phaser';
let height = 576;
let width = 960;
let nomJugadors = ["GROC", "BLAU", "VERMELL", "VERD"];
let TERRA = 0;
let AIGUA = 1;
let AIRE = 2;
let FOC = 3;
let th;
let nJugadors = 4;
let fitxesSprite = [];
let fitxes = [];
let taulerAmplada = 15
let taulerAlcada = 9
let tauler = [];
let tiles;
let layer;
let map;

let casellaPosible = [];
let cruzeta = [];
let viu = []

let midaTile = 64;
let jugadorAct = 0;
let puntuacio = [];
let potMoure = false;
let overTirar = [];

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
        in_jugador(midaTile, midaTile, 'fitxa_y');
        break;
      case 1:
        in_jugador(taulerAmplada * midaTile, midaTile, 'fitxa_b');
        break;
      case 2:
        in_jugador(midaTile, taulerAlcada * midaTile, 'fitxa_r');
        break;
      case 3:
        in_jugador(taulerAmplada * midaTile, taulerAlcada * midaTile, 'fitxa_g');
        break;
    }
  }
  var nDau;
  mostra_dau();
  this.input.on('pointerdown', function (pointer) {
      if (potMoure){
        if (pot_moure(fitxesSprite[jugadorAct].x, fitxesSprite[jugadorAct].y, pointer.x, pointer.y, nDau)){
          mou(jugadorAct, pointer);
        }
      }
      else{
        nDau = tira_dau();
      }
    }, this);
  }

  update () {

  }

}

  function in_jugador(posX, posY, tipus){
    var nouSprite = th.add.image(posX, posY, tipus);
    nouSprite.setScale(.25);
    nouSprite.setOrigin(1);
    fitxesSprite.push(nouSprite);
    puntuacio.push(0);
    viu.push(true);
  }

  function seg_jugador(){
    jugadorAct += 1;
    while ((jugadorAct >= nJugadors) || (!viu[jugadorAct])) {
      jugadorAct += 1
      if (jugadorAct >= nJugadors) {
        jugadorAct = 0;
      }
    }
    console.log("JUGADRO ACTUAL " + String(jugadorAct));
  }

  function mou (jugador, posicio) {
    var spriteMoure = fitxesSprite[jugador]
    var nouPosX = (Math.floor(posicio.x / midaTile) + 1);
    var nouPosY = (Math.floor(posicio.y / midaTile) + 1);
    if ( casellaPosible[nouPosX][nouPosY] ) {
      casellaPosible[nouPosX][nouPosY] = false;
      flip_casella(nouPosX * midaTile, nouPosY * midaTile);
      spriteMoure.x = nouPosX * midaTile;
      spriteMoure.y = nouPosY * midaTile;
      spriteMoure.setDepth(1);
      seg_jugador();
      mostra_dau();
    }
  }

  function flip_casella (casellaX, casellaY) {
    th.add.image(casellaX - midaTile / 2, casellaY - midaTile / 2 , 'flip').setDepth(0);
  }

  function marca_posible(casellaX, casellaY, numDau = 3, numIteracio = 1) {
    var posible = false;
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
      posible = true;
    }
    //MOVIMENT POSIBLE VERTICAL ABAIX
    if (posYtauler + numDau < taulerAlcada && casellaPosible[posXtauler][posYtauler + numDau]){ //FUNCIONA
      dibuixa_overlay(casellaX, casellaY + (numDau * midaTile), 1, numDau);
      posible = true;
    }
    //MOVIMENT POSIBLE HORITZONTAL ESQUERRA
    if (posXtauler - numDau > 0 && casellaPosible[posXtauler - numDau][posYtauler]){
      dibuixa_overlay(casellaX - midaTile, casellaY, numDau, 1, false);
      posible = true;
    }
    //MOVIMENT POSIBLE HORITZONTAL DRETA
    if (posXtauler + numDau <= taulerAmplada && casellaPosible[posXtauler + numDau][posYtauler]){
      dibuixa_overlay(casellaX + (midaTile * numDau), casellaY, numDau);
      posible = true;
    }
    if (!posible) {
      tira_dau(numIteracio + 1);
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

  function mostra_dau(){
    for (var i = 0; i < overTirar.length; i++) {
      overTirar[i].destroy();
    }
    potMoure = false;
    overTirar.push(th.add.image(0, 0, 'over_dau').setOrigin(0).setDepth(2));
    var text = "Turn del jugador " + nomJugadors[jugadorAct];
    overTirar.push(th.add.text(width / 2, 100, text, { fontFamily: 'Arial', fontSize: 64, color: '#ffffff' }).setOrigin(0.5).setDepth(3));
  }

  function tira_dau(numIteracio = 0){
    var numDau = Phaser.Math.Between(1, 6);
    if (numIteracio){
      numDau = numIteracio;
    }
    for (var i = 0; i < overTirar.length; i++) {
      overTirar[i].destroy();
    }
    var text = "Et pots moure " + String(numDau) + " caselles";
    overTirar.push(th.add.text(width / 2, midaTile / 2, text, { fontFamily: 'Arial', fontSize: 20, color: '#000000' }).setOrigin(0.5));
    potMoure = true;
    if (numIteracio == 7){
      mata();
    }
    else{
      marca_posible(fitxesSprite[jugadorAct].x, fitxesSprite[jugadorAct].y, numDau, numIteracio);
      return numDau;
    }
  }

  function mata(){
    overTirar.push(th.add.text(width / 2, height / 2, "TAS MUERTO Jugador " + nomJugadors[jugadorAct], { fontFamily: 'Arial', fontSize: 50, color: '#000000' }).setOrigin(0.5));
    viu[jugadorAct] = false;
    potMoure = false;
    var vius = 0;
    var ultim;
    console.log("SIGUEN VISU");
    for (var i = 0; i < viu.length; i++) {
      if (viu[i]){
        console.log(nomJugadors[i]);
        ultim = i;
        vius += 1;
      }
    }
    if (vius < 2){
      game_end(ultim);
    }
    else{
      seg_jugador();
    }
  }

  function game_end(ultimViu){
    var pantallaEnd = [];
    var splash = th.add.image(0, 0, 'game_over').setOrigin(0);
    splash.setDepth(2);
    pantallaEnd.push(splash);
    pantallaEnd.push(th.add.text(width / 2, 243, "Ha guanyat " + nomJugadors[ultimViu], { fontFamily: 'Arial', fontSize: 20, color: '#000000' }).setOrigin(0.5));
    pantallaEnd[1].setDepth(3);
  }

  function pot_moure(posXraw, posYraw, posClickXraw, posClickYraw, numDau){
    var posClickX = (Math.floor(posClickXraw / midaTile) + 1);
    var posClickY = (Math.floor(posClickYraw / midaTile) + 1);
    var posX = (Math.floor(posXraw / midaTile));
    var posY = (Math.floor(posYraw / midaTile));
    console.log(posClickY);
    console.log(posClickX);
    console.log(posY);
    console.log(posX);
    var pot = false;
    if (posX + numDau == posClickX && posY == posClickY){
      pot = true;
    }
    if (posX - numDau == posClickX && posY == posClickY){
      pot = true;
    }
    if (posX == posClickX && posY + numDau == posClickY){
      pot = true;
    }
    if (posX == posClickX && posY - numDau == posClickY){
      pot = true;
    }
    return pot;
  }
