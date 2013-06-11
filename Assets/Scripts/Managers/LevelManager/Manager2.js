#pragma strict

private var currentPlayer : Player;

//Variables para los managers
private var managerDialogos: ManagerDialogos2;
private var playerManager : Player_Manager;
private var lootManager : LootManager2;
private var persistance : Persistance;
private var inventario : Inventario;

//Texturas
var cinematicas : Texture2D[] = new Texture2D[5];

var texturaCursorCristina : Texture2D;
var texturaCursorGabriela : Texture2D;

var texturaCuadroCristina : Texture2D;
var texturaCuadroGabriela : Texture2D;

//FLAGS
private var flagConserje : boolean = false;
private var flagFCuerpo : boolean = false;
private var cinematica1 : boolean = false;

function Awake () {


//Inicializacion de los managers y demas scripts
playerManager = GetComponent(Player_Manager);
managerDialogos = GetComponent(ManagerDialogos2);
lootManager = GetComponent(LootManager2);
inventario = GetComponent(Inventario);
persistance = GameObject.Find("Persistance").GetComponent(Persistance);


inventario.setItemsActuales(persistance.getInventario());

var tempPlayers: Player[] = persistance.getParty();
for(var i:int = 0 ; i <tempPlayers.Length ; i++){
	if(tempPlayers[i]){
		playerManager.addPlayer(new Player(tempPlayers[i].getTextura(),tempPlayers[i].getId(),tempPlayers[i].getNombre(),tempPlayers[i].getCursor()));
	}

}
currentPlayer = tempPlayers[0];
}

//Funcion OnGUI
function OnGUI(){
	if(cinematica1){
		GUI.Label (Rect (Screen.width/2 - 600,Screen.height/2 - 250, Screen.width, Screen.height), cinematicas[0]);
	}
}

//Implementación de la función Trigger()
function EventTrigger(objName : String){
	
}

//Imlementación de la funcion Switch()
function EventSwitch(comando : String){
	
	if(comando.Equals("Gabriela")){
	
		managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_GABRIELA);
	}
	
	if(comando.Equals("Conserje")){
	
		managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_CONSERJE);
	}
	
	if(comando.Equals("F1")){
		if(currentPlayer.getId() == Player_Manager.CRISTINA){
			if(flagConserje)
				managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_F1);
			else
				managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_SIN);
		}
		else{
			currentPlayer.getGameObject().GetComponent(MoverClick).MoverOff();
			cinematica1 = true;
			yield WaitForSeconds(5);
			cinematica1 = false;
		}	
	}
	if(comando.Equals("LockerF1")){
		if(flagFCuerpo){
			managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_LOCKERF1);
			}
		else{
			managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_VACIO);
			}
	}
	if(comando.Equals("LockerVacio")){
		managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_VACIO);
	}	
}

//Se llama como resultado(al finalizar) de un dialogo, no todos los dialogos tiene resultado*
//Implementación de la función IEventDialog
function EventDialog(idResultado : int){

switch(idResultado){

case ManagerDialogos2.GABRIELA:
	playerManager.addPlayer(new Player(texturaCuadroGabriela,Player_Manager.GABRIELA, "Gabriela" , texturaCursorGabriela));
	var pl : GameObject = GameObject.Find("Gabriela");
	pl.AddComponent(MoverClick);
	pl.GetComponent(Interactor_Click).FlagOff();
	pl.renderer.enabled = false;
	pl.collider.enabled = false;
break;

case ManagerDialogos2.CONSERJE:
	flagConserje = true;
break;

case ManagerDialogos2.FANTASMA1:
	flagFCuerpo = true;
	print(flagFCuerpo + "!!!!!!!!!!!!!!!!!!!!!!!!!!!");
break;

}


		
}




function DarCinematica(index : int){
	return cinematicas[index];
}