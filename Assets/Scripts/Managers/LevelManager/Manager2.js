#pragma strict

private var currentPlayer : Player;

// ================================================================================
// Variables
// ================================================================================
//Variables para los managers
private var managerDialogos: ManagerDialogos2;
private var playerManager : Player_Manager;
private var lootManager : LootManager2;
private var persistance : Persistance;
private var inventario : InventarioManager;
private var puzzle : Puzzle;

// ================================================================================
// Texturas
// ================================================================================
//Texturas
var cinematicas : Texture2D[] = new Texture2D[5];

var texturaCursorCristina : Texture2D;
var texturaCursorGabriela : Texture2D;

var texturaCuadroCristina : Texture2D;
var texturaCuadroGabriela : Texture2D;
var texturaPalanca : Texture2D;

// ================================================================================
// FLAGS
// ================================================================================
//FLAGS
private var flagConserje : boolean = false;// Hablar con el conserje por primera vez
private var flagFCuerpo : boolean = false;// Hablar con el fantasma F1 (En la primera morgue)
private var flagFTrabado : boolean = false;// Hablar con el fantasma F2 (En el salón grande al lado de los baños)
private var flagEncontrarCuerpoF1 : boolean = false;// En contrar el cuerpo de F1
private var flagRescatarCuerpoF2 : boolean = false;// En contrar el cuerpo de F2
private var desinfectado : boolean = false;// Desinfectarse en una estación
private var cinematica1 : boolean = false;// Cinemática del fantasma F1
private var cinematica2 : boolean = false;// Cinemática del fantasma F2
private var cinematica3 : boolean = false;// Abrir el locker con una palanca

// ================================================================================
// Awake
// ================================================================================
function Awake () {


//Inicializacion de los managers y demas scripts
playerManager = GetComponent(Player_Manager);
managerDialogos = GetComponent(ManagerDialogos2);
lootManager = GetComponent(LootManager2);
inventario = GetComponent(InventarioManager);
persistance = GameObject.Find("Persistance").GetComponent(Persistance);

puzzle = GetComponent(Puzzle);
inventario.setItemsActuales(persistance.getInventario());

var tempPlayers: Player[] = persistance.getParty();
for(var i:int = 0 ; i <tempPlayers.Length ; i++){
	if(tempPlayers[i]){
		playerManager.addPlayer(new Player(tempPlayers[i].getTextura(),tempPlayers[i].getId(),tempPlayers[i].getNombre(),tempPlayers[i].getCursor()));
	}

}
currentPlayer = tempPlayers[0];
}

// ================================================================================
// OnGUI
// ================================================================================

function OnGUI(){
	if(cinematica1){
		GUI.Label (Rect (Screen.width/2 - 600,Screen.height/2 - 250, Screen.width, Screen.height), cinematicas[0]);
	}
	if(cinematica2){
		GUI.Label (Rect (Screen.width/2 - 600,Screen.height/2 - 250, Screen.width, Screen.height), cinematicas[1]);
	}
	if(cinematica3){
		GUI.Label (Rect (Screen.width/2 - 600,Screen.height/2 - 250, Screen.width, Screen.height), cinematicas[2]);
	}
}

// ================================================================================
// Trigger
// ================================================================================
//Implementación de la función Trigger()
function EventTrigger(objName : String){
	currentPlayer = GetComponent(Player_Manager).getCurrentPlayer();
	if(objName.Equals("PuertaEntrada1")){
		var puertaA : GameObject = GameObject.Find("PuertaCorrediza1");
		//puertaA.GetComponent(TrasladarVertical).setVelocidad(0.11);
		//puertaA.GetComponent(TrasladarVertical).activar();
		//yield WaitForSeconds(0.1);
		//puertaA.GetComponent(TrasladarVertical).desactivar();
		//puertaA.GetComponent(Interactor_Click).FlagOn();
		puertaA.collider.enabled = true;
		puertaA.renderer.enabled = true;
		GameObject.Find("PuertaSTrigger1").GetComponent(Interactor_Trigger).encender();
	}
	if(objName.Equals("PuertaEntrada2")){
		var puertaB : GameObject = GameObject.Find("PuertaCorrediza2");
		//puertaA.GetComponent(TrasladarVertical).setVelocidad(0.11);
		//puertaA.GetComponent(TrasladarVertical).activar();
		//yield WaitForSeconds(0.1);
		//puertaA.GetComponent(TrasladarVertical).desactivar();
		//puertaA.GetComponent(Interactor_Click).FlagOn();
		puertaB.collider.enabled = true;
		puertaB.renderer.enabled = true;
		GameObject.Find("PuertaSTrigger2").GetComponent(Interactor_Trigger).encender();
	}
	if(objName.Equals("PuertaEntrada3")){
		var puertaC : GameObject = GameObject.Find("PuertaCorrediza3");
		//puertaA.GetComponent(TrasladarVertical).setVelocidad(0.11);
		//puertaA.GetComponent(TrasladarVertical).activar();
		//yield WaitForSeconds(0.1);
		//puertaA.GetComponent(TrasladarVertical).desactivar();
		//puertaA.GetComponent(Interactor_Click).FlagOn();
		puertaC.collider.enabled = true;
		puertaC.renderer.enabled = true;
		GameObject.Find("PuertaSTrigger3").GetComponent(Interactor_Trigger).encender();
	}
	if(objName.Equals("PuertaEntrada4")){
		var puertaD : GameObject = GameObject.Find("PuertaCorrediza4");
		//puertaA.GetComponent(TrasladarVertical).setVelocidad(0.11);
		//puertaA.GetComponent(TrasladarVertical).activar();
		//yield WaitForSeconds(0.1);
		//puertaA.GetComponent(TrasladarVertical).desactivar();
		//puertaA.GetComponent(Interactor_Click).FlagOn();
		puertaD.collider.enabled = true;
		puertaD.renderer.enabled = true;
		GameObject.Find("PuertaSTrigger4").GetComponent(Interactor_Trigger).encender();
	}
	if(objName.Equals("PuertaSalida1")){
		var puertaE : GameObject = GameObject.Find("PuertaCorrediza1");
		//puertaB.GetComponent(TrasladarVertical).setVelocidad(0.11);
		//puertaB.GetComponent(TrasladarVertical).activar();
		//yield WaitForSeconds(0.1);
		//puertaB.GetComponent(TrasladarVertical).desactivar();
		//puertaB.GetComponent(Interactor_Click).FlagOn();
		puertaE.collider.enabled = true;
		puertaE.renderer.enabled = true;
		GameObject.Find("PuertaETrigger1").GetComponent(Interactor_Trigger).encender();
		desinfectado = false;
	}
	if(objName.Equals("PuertaSalida2")){
		var puertaF : GameObject = GameObject.Find("PuertaCorrediza2");
		//puertaB.GetComponent(TrasladarVertical).setVelocidad(0.11);
		//puertaB.GetComponent(TrasladarVertical).activar();
		//yield WaitForSeconds(0.1);
		//puertaB.GetComponent(TrasladarVertical).desactivar();
		//puertaB.GetComponent(Interactor_Click).FlagOn();
		puertaF.collider.enabled = true;
		puertaF.renderer.enabled = true;
		GameObject.Find("PuertaETrigger2").GetComponent(Interactor_Trigger).encender();
		desinfectado = false;
	}
	if(objName.Equals("PuertaSalida3")){
		var puertaG : GameObject = GameObject.Find("PuertaCorrediza3");
		//puertaB.GetComponent(TrasladarVertical).setVelocidad(0.11);
		//puertaB.GetComponent(TrasladarVertical).activar();
		//yield WaitForSeconds(0.1);
		//puertaB.GetComponent(TrasladarVertical).desactivar();
		//puertaB.GetComponent(Interactor_Click).FlagOn();
		puertaG.collider.enabled = true;
		puertaG.renderer.enabled = true;
		GameObject.Find("PuertaETrigger3").GetComponent(Interactor_Trigger).encender();
		desinfectado = false;
	}
	if(objName.Equals("PuertaSalida4")){
		var puertaH : GameObject = GameObject.Find("PuertaCorrediza4");
		//puertaB.GetComponent(TrasladarVertical).setVelocidad(0.11);
		//puertaB.GetComponent(TrasladarVertical).activar();
		//yield WaitForSeconds(0.1);
		//puertaB.GetComponent(TrasladarVertical).desactivar();
		//puertaB.GetComponent(Interactor_Click).FlagOn();
		puertaH.collider.enabled = true;
		puertaH.renderer.enabled = true;
		GameObject.Find("PuertaETrigger4").GetComponent(Interactor_Trigger).encender();
		desinfectado = false;
	}
}
// ================================================================================
// Switch
// ================================================================================
//Imlementación de la funcion Switch()
function EventSwitch(comando : String){
	currentPlayer = GetComponent(Player_Manager).getCurrentPlayer();
	//Hablar a gabriela apenas empieza el nivel
	if(comando.Equals("Gabriela")){
	
		managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_GABRIELA);
	}
	if(comando.Equals("Puzzle")){
	
	print("esta entrando al puzzle");
		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		puzzle.empezarPuzzle();
	}
	//Hablar con el conserje
	if(comando.Equals("Conserje")){
	
		managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_CONSERJE);
	}
	//Fantasma buscando su cuerpo en la morgue 1
	if(comando.Equals("F1")){
		if(!flagEncontrarCuerpoF1){
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
				currentPlayer.getGameObject().GetComponent(MoverClick).MoverOn();
			}
		}
		else{
			managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_F1AYUDAR);
			GameObject.Find("F1").renderer.enabled = false;
			GameObject.Find("F1").collider.enabled = false;
		}	
	}
	
	//Fantasma en el salon de abajo con el cuerpo atrapado en la morgue 1
	if(comando.Equals("F2")){
		if(!flagRescatarCuerpoF2){
		print("No se ha rescatado a f2");
			if(currentPlayer.getId() == Player_Manager.CRISTINA){
				if(flagConserje)
					managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_F2);
				else
					managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_SIN);
			}
			else{
				currentPlayer.getGameObject().GetComponent(MoverClick).MoverOff();
				cinematica2 = true;
				yield WaitForSeconds(5);
				cinematica2 = false;
				currentPlayer.getGameObject().GetComponent(MoverClick).MoverOn();
			}
		}
		else{
		print("Dialogo de rescate f2");
			managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_F2AYUDAR);
			GameObject.Find("F2").renderer.enabled = false;
			GameObject.Find("F2").collider.enabled = false;
		}	
	}
	//Locker donde está el cuerpo del fantasma F1
	if(comando.Equals("LockerF1")){
		if(flagFCuerpo){
			managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_LOCKERF1);
			flagEncontrarCuerpoF1 = true;
		}
		else{
			managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_VACIO);
		}
	}
	//Locker trabado donde está el cuerpo del fantasma F2
	if(comando.Equals("LockerF2")){
		if(flagFTrabado){
			var pala : boolean =inventario.enInventario(InventarioManager.PALA);
			var palanca : boolean = inventario.enInventario(InventarioManager.PALANCA);
			if(pala || palanca){
				currentPlayer.getGameObject().GetComponent(MoverClick).MoverOff();
				cinematica3 = true;
				yield WaitForSeconds(3);
				cinematica3 = false;
				currentPlayer.getGameObject().GetComponent(MoverClick).MoverOn();
				flagRescatarCuerpoF2 = true;
			}
			else
				managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_LOCKERF2);
		}
		else{
			managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_VACIO);
		}
	}
	//Cualquier locker que no contenga algo importante
	if(comando.Equals("LockerVacio")){
		managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_VACIO);
	}
	if(comando.Equals("LockerPalanca")){
		managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_PALANCA);
		inventario.addItem(new Item(texturaPalanca, inventario.PALANCA));
	}
	//Puertas corrediza para entrar a las morgues
	if(comando.Equals("Puerta1")){
		if(desinfectado){
			var puerta1 : GameObject = GameObject.Find("PuertaCorrediza1");
			//puerta.GetComponent(TrasladarVertical).setVelocidad(-0.1);
			//puerta.GetComponent(TrasladarVertical).activar();
			//yield WaitForSeconds(0.1);
			//puerta.GetComponent(TrasladarVertical).desactivar();
			//puerta.GetComponent(Interactor_Click).FlagOff();
			puerta1.collider.enabled = false;
			puerta1.renderer.enabled = false;
		}
		else
			managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_DESINFECTAR);	
	}
	if(comando.Equals("Puerta2")){
		if(desinfectado){
			var puerta2 : GameObject = GameObject.Find("PuertaCorrediza2");
			//puerta.GetComponent(TrasladarVertical).setVelocidad(-0.1);
			//puerta.GetComponent(TrasladarVertical).activar();
			//yield WaitForSeconds(0.1);
			//puerta.GetComponent(TrasladarVertical).desactivar();
			//puerta.GetComponent(Interactor_Click).FlagOff();
			puerta2.collider.enabled = false;
			puerta2.renderer.enabled = false;
		}
		else
			managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_DESINFECTAR);	
	}
	if(comando.Equals("Puerta3")){
		if(desinfectado){
			var puerta3 : GameObject = GameObject.Find("PuertaCorrediza3");
			//puerta.GetComponent(TrasladarVertical).setVelocidad(-0.1);
			//puerta.GetComponent(TrasladarVertical).activar();
			//yield WaitForSeconds(0.1);
			//puerta.GetComponent(TrasladarVertical).desactivar();
			//puerta.GetComponent(Interactor_Click).FlagOff();
			puerta3.collider.enabled = false;
			puerta3.renderer.enabled = false;
		}
		else
			managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_DESINFECTAR);	
	}
	if(comando.Equals("Puerta4")){
		if(desinfectado){
			var puerta4 : GameObject = GameObject.Find("PuertaCorrediza4");
			//puerta.GetComponent(TrasladarVertical).setVelocidad(-0.1);
			//puerta.GetComponent(TrasladarVertical).activar();
			//yield WaitForSeconds(0.1);
			//puerta.GetComponent(TrasladarVertical).desactivar();
			//puerta.GetComponent(Interactor_Click).FlagOff();
			puerta4.collider.enabled = false;
			puerta4.renderer.enabled = false;
		}
		else
			managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_DESINFECTAR);	
	}
	if(comando.Equals("Estacion")){
		print("presiono la estacion");
		desinfectado = true;
	}	
}
// ================================================================================
// Switch
// ================================================================================
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
break;

case ManagerDialogos2.FANTASMA2:
	flagFTrabado = true;
break;
}


		
}




function DarCinematica(index : int){
	return cinematicas[index];
}