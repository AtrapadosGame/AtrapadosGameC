#pragma strict

private var dialogosActivos : boolean;
private var enOpcion: boolean = false;
private var conversacionActual : ArbolConversacion;
private var conversacionGabriela : ArbolConversacion;
private var conversacionConserje : ArbolConversacion;
private var conversacionSinConserje : ArbolConversacion;
private var conversacionF1 : ArbolConversacion;
private var conversacionF1Ayudar : ArbolConversacion;
private var conversacionLockerF1 : ArbolConversacion;
private var conversacionF2 : ArbolConversacion;
private var conversacionF2Ayudar : ArbolConversacion;
private var conversacionLockerF2 : ArbolConversacion;
private var conversacionF3 : ArbolConversacion;
private var conversacionF3Ayudar : ArbolConversacion;
private var conversacionF3Paila : ArbolConversacion;
private var conversacionF4 : ArbolConversacion;
private var conversacionF4Ayudar : ArbolConversacion;
private var conversacionF4Paila : ArbolConversacion;
private var conversacionLockerVacio : ArbolConversacion;
private var conversacionSinDesinfectar : ArbolConversacion;
private var conversacionPalanca : ArbolConversacion;
private var conversacionAlambre : ArbolConversacion;

private var ventana : Rect = Rect(0,(Screen.height/2)+50, Screen.width,(Screen.height/3));
private var textoActivo: String;
private var textoOpcion1: String;
private var textoOpcion2: String;
private var textoOpcion3: String;

private var texturaActual1 : Texture2D;
private var texturaActual2 : Texture2D;


//Conexión con el LevelManager
var manager : GameObject;


var customSkin: GUISkin;
var texturaCristina: Texture2D;
var texturaGabriela: Texture2D;
var texturaConserje: Texture2D;
var texturaF1: Texture2D;
var texturaF2: Texture2D;
var texturaF3: Texture2D;
var texturaF4: Texture2D;

var texturaCristinaSombreada: Texture2D;
var texturaGabrielaSombreada: Texture2D;
var texturaConserjeSombreada: Texture2D;
var texturaF1Sombreada: Texture2D;
var texturaF2Sombreada: Texture2D;
var texturaF3Sombreada: Texture2D;
var texturaF4Sombreada: Texture2D;


public static final var CONVERSACION_GABRIELA  :int= 0;
public static final var CONVERSACION_CONSERJE  :int= 1;
public static final var CONVERSACION_SIN  :int= 2;
public static final var CONVERSACION_F1  :int= 3;
public static final var CONVERSACION_LOCKERF1  :int= 4;
public static final var CONVERSACION_VACIO  :int= 5;
public static final var CONVERSACION_DESINFECTAR  :int= 6;
public static final var CONVERSACION_F1AYUDAR  :int= 7;
public static final var CONVERSACION_F2  :int= 8;
public static final var CONVERSACION_F2AYUDAR  :int= 9;
public static final var CONVERSACION_LOCKERF2  :int= 10;
public static final var CONVERSACION_PALANCA  :int= 11;
public static final var CONVERSACION_F3  :int= 12;
public static final var CONVERSACION_F3AYUDAR  :int= 13;
public static final var CONVERSACION_ALAMBRE  :int= 14;
public static final var CONVERSACION_F3PAILA  :int= 15;
public static final var CONVERSACION_F4  :int= 16;
public static final var CONVERSACION_F4AYUDAR  :int= 17;
public static final var CONVERSACION_F4PAILA  :int= 18;

public static final var GABRIELA = 1;
public static final var CONSERJE = 2;
public static final var FANTASMA1 = 3;
public static final var FANTASMA2 = 4;



// ================================================================================
// OnCreate
// ================================================================================

function Start(){

 inicializarConversacionGabriela();
 inicializarConversacionConserje();
 inicializarConversacionF1();
 inicializarConversacionLockerF1();
 inicializarConversacionF1Ayudar();
 inicializarConversacionF2();
 inicializarConversacionF2Ayudar();
 inicializarConversacionPalanca();
 inicializarConversacionF3();
 inicializarConversacionF3Ayudar();
 inicializarConversacionF3Paila();
 inicializarConversacionF4();
 inicializarConversacionF4Ayudar();
 inicializarConversacionF4Paila();
 inicializarConversacionAlambre();
}


// ================================================================================
// OnGui
// ================================================================================

function OnGUI () {
var pausa : boolean = GetComponent(MenuManager).estaPausado();
if(!pausa){
GUI.skin = customSkin;
	if(dialogosActivos){
		ventana = GUI.Window(0,ventana , WindowFunction,"");
		GUI.Box(Rect(0,50,Screen.width/2,Screen.height/2),texturaActual1);
		GUI.Box(Rect(Screen.width/2,50,Screen.width/2,Screen.height/2),texturaActual2);		
	}
	
	}
}

function WindowFunction (windowID : int) {


	if(enOpcion){
	
	
	if(GUI.Button(Rect (10, 20, ventana.width, 75), textoOpcion1)){
	
	conversacionActual.setNodoActual(conversacionActual.getNodoActual().getHijo1());
	dibujarDialogo();
	enOpcion = false;
	textoOpcion1 = "";
	textoOpcion2 = "";
	
	}
	if(GUI.Button(Rect (10, 95, ventana.width, 75), textoOpcion2)){
		
	conversacionActual.setNodoActual(conversacionActual.getNodoActual().getHijo2());
	dibujarDialogo();
	enOpcion = false;
	textoOpcion1 = "";
	textoOpcion2 = "";
	}
	if(conversacionActual.getNodoActual().getHijo3()){
	
	if(GUI.Button(Rect (10, 170, ventana.width, 75), textoOpcion3)){
		
	conversacionActual.setNodoActual(conversacionActual.getNodoActual().getHijo3());
	dibujarDialogo();
	enOpcion = false;
	textoOpcion1 = "";
	textoOpcion2 = "";
	}
	
	
	
	}
	
	}
	else{
	GUI.Label (Rect (10, 30, ventana.width, ventana.height), textoActivo);
	}
}


// ================================================================================
// OnMouseDown
// ================================================================================
function Update(){
var pausa : boolean = GetComponent(MenuManager).estaPausado();
if(!pausa){
if(dialogosActivos && Input.GetKeyDown(KeyCode.Mouse0) && !enOpcion){

	
		
	
	
	if(!conversacionActual.getNodoActual().estaTerminado()){
	
		dibujarDialogo();
	}
	else if(conversacionActual.getNodoActual().estaTerminado()&&conversacionActual.getNodoActual().tieneHijos()){
		
		enOpcion = true;
		dibujarOpcion();
	}
	//Aqui se acaba la conversación
	else if(conversacionActual.getNodoActual().estaTerminado() && !conversacionActual.getNodoActual().tieneHijos()){
		
		dialogosActivos = false;
		GetComponent(Player_Manager).getCurrentPlayer().getGameObject().GetComponent(MoverClick).MoverOn();
		manager.GetComponent(IEvent_manager).DialogSwitch(conversacionActual.getResultado());
		GetComponent(MenuManager).setBotonesHabilitado(true);		
	}
}

}

}

// ================================================================================
// Metodos
// ================================================================================


function empezarDialogos(idConversacion:int ){
GetComponent(MenuManager).setBotonesHabilitado(false);

switch(idConversacion){

case CONVERSACION_GABRIELA:

conversacionActual = conversacionGabriela;

break;

case CONVERSACION_CONSERJE:

conversacionActual = conversacionConserje;

break;

case CONVERSACION_SIN:
inicializarConversacionSinConserje();
conversacionActual = conversacionSinConserje;

break;

case CONVERSACION_F1:

conversacionActual = conversacionF1;

break;

case CONVERSACION_F1AYUDAR:
conversacionActual = conversacionF1Ayudar;

break;

case CONVERSACION_LOCKERF1:

conversacionActual = conversacionLockerF1;

break;

case CONVERSACION_F2:

conversacionActual = conversacionF2;

break;

case CONVERSACION_F2AYUDAR:
conversacionActual = conversacionF2Ayudar;

break;

case CONVERSACION_LOCKERF2:
inicializarConversacionLockerF2();
conversacionActual = conversacionLockerF2;

break;

case CONVERSACION_F3:

conversacionActual = conversacionF3;

break;

case CONVERSACION_F3AYUDAR:
conversacionActual = conversacionF3Ayudar;
dibujarDialogo();

break;

case CONVERSACION_F3PAILA:
conversacionActual = conversacionF3Paila;
dibujarDialogo();

break;

case CONVERSACION_F4:

conversacionActual = conversacionF4;

break;

case CONVERSACION_F4AYUDAR:
conversacionActual = conversacionF4Ayudar;

break;

case CONVERSACION_F4PAILA:
conversacionActual = conversacionF4Paila;

break;

case CONVERSACION_VACIO:
inicializarConversacionLockerVacio();
conversacionActual = conversacionLockerVacio;

break;

case CONVERSACION_DESINFECTAR:
inicializarConversacionSinDesinfectar();
conversacionActual = conversacionSinDesinfectar;

break;

case CONVERSACION_PALANCA:

conversacionActual = conversacionPalanca;

break;

case CONVERSACION_ALAMBRE:

conversacionActual = conversacionAlambre;

break;
}

GetComponent(Player_Manager).getCurrentPlayer().getGameObject().GetComponent(MoverClick).MoverOff();

dialogosActivos = true;
}

function dibujarDialogo(){


if(conversacionActual.getNodoActual().getQuienLinea() == 1){
texturaActual1 = conversacionActual.getTexturaPj1();
texturaActual2 = conversacionActual.getTexturaPj2Sombreada();
}
else if (conversacionActual.getNodoActual().getQuienLinea() == 2){
texturaActual1 = conversacionActual.getTexturaPj1Sombreada();
texturaActual2 = conversacionActual.getTexturaPj2();
}

textoActivo = conversacionActual.getNodoActual().getTextoLinea();



}


function dibujarOpcion(){
textoOpcion1 = conversacionActual.getNodoActual().getHijo1().getTextoLinea();
textoOpcion2 = conversacionActual.getNodoActual().getHijo2().getTextoLinea();
textoActivo = "";
if(conversacionActual.getNodoActual().getHijo3()){
	textoOpcion3 = conversacionActual.getNodoActual().getHijo3().getTextoLinea();
}


texturaActual1 = conversacionActual.getTexturaPj1();
texturaActual2 = conversacionActual.getTexturaPj2Sombreada();




}





// ================================================================================
// Inicializacion de Arboles
// ================================================================================

//Introducción Gabriela
function inicializarConversacionGabriela(){
conversacionGabriela = new ArbolConversacion(texturaCristina,texturaGabriela,texturaCristinaSombreada,texturaGabrielaSombreada);

/**
* Nodo Raiz
* 
*/
var dialogos : Array = new Array();
var l: LineaDialogo = new LineaDialogo("Bueno, aquí estoy ¿Cómo puedo ayudar a los seres que mencionas?",1);
dialogos.Push(l);
l = new LineaDialogo("Tranquila, hay que encontrar primero al conserje. Yo te sigo",2);
dialogos.Push(l);
  
var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos,GABRIELA);

conversacionGabriela.setRaiz(nodoRaiz);
}

//Introducción conserje
function inicializarConversacionConserje(){
conversacionConserje = new ArbolConversacion(texturaCristina,texturaConserje,texturaCristinaSombreada,texturaConserjeSombreada);

/**
* Nodo Raiz
* 
*/
var dialogos : Array = new Array();
var l: LineaDialogo = new LineaDialogo("Aqui va un dialogo",1);
dialogos.Push(l);
l = new LineaDialogo("Aqui va una respuesta",2);
dialogos.Push(l);
  
var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos,CONSERJE);

conversacionConserje.setRaiz(nodoRaiz);
}

//Hablar con un fantasma sin haber hablado con el conserje
function inicializarConversacionSinConserje(){
conversacionSinConserje = new ArbolConversacion(texturaCristina,texturaConserje,texturaCristinaSombreada,texturaConserjeSombreada);

/**
* Nodo Raiz
* 
*/
var dialogos : Array = new Array();
var l: LineaDialogo = new LineaDialogo("No me molestes",2);
dialogos.Push(l);
  
var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);

conversacionSinConserje.setRaiz(nodoRaiz);
}

//Fantasma F1
function inicializarConversacionF1(){
conversacionF1 = new ArbolConversacion(texturaCristina,texturaF1,texturaCristinaSombreada,texturaF1Sombreada);

/**
* Nodo Raiz
* 
*/
var dialogos : Array = new Array();
var l: LineaDialogo = new LineaDialogo("No recuerdo donde está mi cuerpo",2);
dialogos.Push(l);
l = new LineaDialogo("Uy grave, debe haber una forma de averiguarlo",1);
dialogos.Push(l);
  
var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos, FANTASMA1);

conversacionF1.setRaiz(nodoRaiz);
}

// Locker con el cuerpo de F1
function inicializarConversacionLockerF1(){
conversacionLockerF1 = new ArbolConversacion(texturaCristina,texturaGabriela,texturaCristinaSombreada,texturaGabrielaSombreada);

/**
* Nodo Raiz
* 
*/
var dialogos : Array = new Array();
var l: LineaDialogo = new LineaDialogo("Si, aqui está el cuerpo",1);
dialogos.Push(l);

var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);

conversacionLockerF1.setRaiz(nodoRaiz);
}

//Click a un locker vacío
function inicializarConversacionLockerVacio(){
conversacionLockerVacio = new ArbolConversacion(texturaCristina,texturaGabriela,texturaCristinaSombreada,texturaGabrielaSombreada);

/**
* Nodo Raiz
* 
*/
var dialogos : Array = new Array();
var l: LineaDialogo = new LineaDialogo("Aqui hay un cuerpo, squeeeee",1);
dialogos.Push(l);

var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);

conversacionLockerVacio.setRaiz(nodoRaiz);
}

//Click a una puerta sin desinfectarse
function inicializarConversacionSinDesinfectar(){
conversacionSinDesinfectar = new ArbolConversacion(texturaCristina,texturaGabriela,texturaCristinaSombreada,texturaGabrielaSombreada);

/**
* Nodo Raiz
* 
*/
var dialogos : Array = new Array();
var l: LineaDialogo = new LineaDialogo("Al parecer primero necesitas desinfectarte en una estación",2);
dialogos.Push(l);

var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);

conversacionSinDesinfectar.setRaiz(nodoRaiz);
}

//Terminar la mision de F1
function inicializarConversacionF1Ayudar(){
conversacionF1Ayudar = new ArbolConversacion(texturaCristina,texturaF1,texturaCristinaSombreada,texturaF1Sombreada);

/**
* Nodo Raiz
* 
*/
var dialogos : Array = new Array();
var l: LineaDialogo = new LineaDialogo("Listo, ya te puedes ir en paz",1);
dialogos.Push(l);

var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);

conversacionF1Ayudar.setRaiz(nodoRaiz);
}

//Fantasma F2
function inicializarConversacionF2(){
conversacionF2 = new ArbolConversacion(texturaCristina,texturaF2,texturaCristinaSombreada,texturaF2Sombreada);

/**
* Nodo Raiz
* 
*/
var dialogos : Array = new Array();
var l: LineaDialogo = new LineaDialogo("Mi cuerpo está en la morgue 1, pero la puerta está trabada",2);
dialogos.Push(l);
l = new LineaDialogo("Hay que abrirla de alguna manera",1);
dialogos.Push(l);

var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos, FANTASMA2);

conversacionF2.setRaiz(nodoRaiz);
}

//Terminar la mision de F2
function inicializarConversacionF2Ayudar(){
conversacionF2Ayudar = new ArbolConversacion(texturaCristina,texturaF2,texturaCristinaSombreada,texturaF2Sombreada);

/**
* Nodo Raiz
* 
*/
var dialogos : Array = new Array();
var l: LineaDialogo = new LineaDialogo("Listo, ya te puedes ir en paz",1);
dialogos.Push(l);

var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);

conversacionF2Ayudar.setRaiz(nodoRaiz);
}

// Locker atorado con el cuerpo de F2
function inicializarConversacionLockerF2(){
conversacionLockerF2 = new ArbolConversacion(texturaCristina,texturaGabriela,texturaCristinaSombreada,texturaGabrielaSombreada);

/**
* Nodo Raiz
* 
*/
var dialogos : Array = new Array();
var l: LineaDialogo = new LineaDialogo("Aquí está el locker, pero necesitaré algo para forzar la puerta",1);
dialogos.Push(l);

var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);

conversacionLockerF2.setRaiz(nodoRaiz);
}

// Encontrar la palanca en el locker de la morgue 2
function inicializarConversacionPalanca(){
conversacionPalanca = new ArbolConversacion(texturaCristina,texturaGabriela,texturaCristinaSombreada,texturaGabrielaSombreada);

/**
* Nodo Raiz
* 
*/
var dialogos : Array = new Array();
var l: LineaDialogo = new LineaDialogo("Oh, una palanca",1);
dialogos.Push(l);

var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);

conversacionPalanca.setRaiz(nodoRaiz);
}

// Conversación fantasma F3
function inicializarConversacionF3(){
conversacionF3 = new ArbolConversacion(texturaCristina,texturaF3,texturaCristinaSombreada,texturaF3Sombreada);

/**
* Nodo Raiz
* 
*/
var dialogos : Array = new Array();
var l: LineaDialogo = new LineaDialogo("Perdí mi argolla de compromiso en esta estación, no te dejaré usarla\n hasta recuperarlo",2);
dialogos.Push(l);

var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);

conversacionF3.setRaiz(nodoRaiz);
}

//Ayudar al fantasma F3
function inicializarConversacionF3Ayudar(){
conversacionF3Ayudar = new ArbolConversacion(texturaCristina,texturaF3,texturaCristinaSombreada,texturaF3Sombreada);

/**
* Nodo Raiz
* 
*/
var dialogos : Array = new Array();
var l: LineaDialogo = new LineaDialogo("Listo, ya te puedes ir en paz",1);
dialogos.Push(l);

var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);

conversacionF3Ayudar.setRaiz(nodoRaiz);
}

//En el armario con el alambre
function inicializarConversacionAlambre(){
conversacionAlambre = new ArbolConversacion(texturaCristina,texturaGabriela,texturaCristinaSombreada,texturaGabrielaSombreada);

/**
* Nodo Raiz
* 
*/
var dialogos : Array = new Array();
var l: LineaDialogo = new LineaDialogo("Oh, aqui hay un alambre",1);
dialogos.Push(l);

var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);

conversacionAlambre.setRaiz(nodoRaiz);
}

//Elegir el anillo incorrecto
function inicializarConversacionF3Paila(){
conversacionF3Paila = new ArbolConversacion(texturaCristina,texturaF3,texturaCristinaSombreada,texturaF3Sombreada);

/**
* Nodo Raiz
* 
*/
var dialogos : Array = new Array();
var l: LineaDialogo = new LineaDialogo("Nooo, mi esposa no me perdonará",2);
dialogos.Push(l);

var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);

conversacionF3Paila.setRaiz(nodoRaiz);
}

//Conversación con F4
function inicializarConversacionF4(){
conversacionF4 = new ArbolConversacion(texturaCristina,texturaF4,texturaCristinaSombreada,texturaF4Sombreada);

/**
* Nodo Raiz
* 
*/
var dialogos : Array = new Array();
var l: LineaDialogo = new LineaDialogo("No me iré hasta que mi esposo recupere la argolla",2);
dialogos.Push(l);

var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);

conversacionF4.setRaiz(nodoRaiz);
}

//Ayudar a F4
function inicializarConversacionF4Ayudar(){
conversacionF4Ayudar = new ArbolConversacion(texturaCristina,texturaF4,texturaCristinaSombreada,texturaF4Sombreada);

/**
* Nodo Raiz
* 
*/
var dialogos : Array = new Array();
var l: LineaDialogo = new LineaDialogo("Si, ese es el anillo, gracias",2);
dialogos.Push(l);
l = new LineaDialogo("Bueno, ya te puedes ir en paz",1);
dialogos.Push(l);

var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);
conversacionF4Ayudar.setRaiz(nodoRaiz);
}

//Paila con F4
function inicializarConversacionF4Paila(){
conversacionF4Paila = new ArbolConversacion(texturaCristina,texturaF4,texturaCristinaSombreada,texturaF4Sombreada);

/**
* Nodo Raiz
* 
*/
var dialogos : Array = new Array();
var l: LineaDialogo = new LineaDialogo("No, ese no es,nooo",2);
dialogos.Push(l);
l = new LineaDialogo("Ahhh",1);
dialogos.Push(l);

var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);

conversacionF4Paila.setRaiz(nodoRaiz);
}