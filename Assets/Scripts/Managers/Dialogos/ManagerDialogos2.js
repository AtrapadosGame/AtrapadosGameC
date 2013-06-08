#pragma strict

private var dialogosActivos : boolean;
private var enOpcion: boolean = false;
private var conversacionActual : ArbolConversacion;
private var conversacionGabriela : ArbolConversacion;
private var conversacionConserje : ArbolConversacion;
private var conversacionSinConserje : ArbolConversacion;
private var conversacionF1 : ArbolConversacion;
private var conversacionLockerF1 : ArbolConversacion;
private var conversacionLockerVacio : ArbolConversacion;

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

var texturaCristinaSombreada: Texture2D;
var texturaGabrielaSombreada: Texture2D;
var texturaConserjeSombreada: Texture2D;
var texturaF1Sombreada: Texture2D;


public static final var CONVERSACION_GABRIELA  :int= 0;
public static final var CONVERSACION_CONSERJE  :int= 1;
public static final var CONVERSACION_SIN  :int= 2;
public static final var CONVERSACION_F1  :int= 3;
public static final var CONVERSACION_LOCKERF1  :int= 4;
public static final var CONVERSACION_VACIO  :int= 5;

public static final var GABRIELA = 1;
public static final var CONSERJE = 2;
public static final var FANTASMA1 = 3;



// ================================================================================
// OnCreate
// ================================================================================

function Start(){

 inicializarConversacionGabriela();
 inicializarConversacionConserje();
 inicializarConversacionF1();
 inicializarConversacionLockerF1();
}


// ================================================================================
// OnGui
// ================================================================================

function OnGUI () {
var pausa : boolean = GetComponent(MenuScript).estaPausado();
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
	print("Escogio Opcion 1:");
	conversacionActual.setNodoActual(conversacionActual.getNodoActual().getHijo1());
	dibujarDialogo();
	enOpcion = false;
	textoOpcion1 = "";
	textoOpcion2 = "";
	
	}
	if(GUI.Button(Rect (10, 95, ventana.width, 75), textoOpcion2)){
		print("Escogio Opcion 2:");
	conversacionActual.setNodoActual(conversacionActual.getNodoActual().getHijo2());
	dibujarDialogo();
	enOpcion = false;
	textoOpcion1 = "";
	textoOpcion2 = "";
	}
	if(conversacionActual.getNodoActual().getHijo3()){
	
	if(GUI.Button(Rect (10, 170, ventana.width, 75), textoOpcion3)){
		print("Escogio Opcion 2:");
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
var pausa : boolean = GetComponent(MenuScript).estaPausado();
if(!pausa){
if(dialogosActivos && Input.GetKeyDown(KeyCode.Mouse0) && !enOpcion){

	print("OnMouseDown");
		
	print("Tiene hijos?: " +conversacionActual.getNodoActual().tieneHijos());
	
	if(!conversacionActual.getNodoActual().estaTerminado()){
	print("Dialogo:");
		dibujarDialogo();
	}
	else if(conversacionActual.getNodoActual().estaTerminado()&&conversacionActual.getNodoActual().tieneHijos()){
		print("Opciones:");
		enOpcion = true;
		dibujarOpcion();
	}
	//Aqui se acaba la conversación
	else if(conversacionActual.getNodoActual().estaTerminado() && !conversacionActual.getNodoActual().tieneHijos()){
		print("Fin dialogo");
		dialogosActivos = false;
		GetComponent(Player_Manager).getCurrentPlayer().getGameObject().GetComponent(MoverClick).MoverOn();
		
		manager.GetComponent(IEvent_manager).DialogSwitch(conversacionActual.getResultado());
		print(conversacionActual.getResultado());
	}
}

}

}

// ================================================================================
// Metodos
// ================================================================================


function empezarDialogos(idConversacion:int ){
print("empezarDialogos");

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

case CONVERSACION_LOCKERF1:

conversacionActual = conversacionLockerF1;

break;

case CONVERSACION_VACIO:
inicializarConversacionLockerVacio();
conversacionActual = conversacionLockerVacio;

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