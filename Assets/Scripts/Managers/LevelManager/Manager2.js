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
private var desinfectado : boolean = false;
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

//Imlementación de la funcion Switch()
function EventSwitch(comando : String){
	//Hablar a gabriela apenas empieza el nivel
	if(comando.Equals("Gabriela")){
	
		managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_GABRIELA);
	}
	//Hablar con el conserje
	if(comando.Equals("Conserje")){
	
		managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_CONSERJE);
	}
	//Fantasma buscando su cuerpo en la morgue 1
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
	//Locker donde está el cuerpo del fantasma F1
	if(comando.Equals("LockerF1")){
		if(flagFCuerpo){
			managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_LOCKERF1);
			}
		else{
			managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_VACIO);
			}
	}
	//Cualquier locker que no contenga algo importante
	if(comando.Equals("LockerVacio")){
		managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_VACIO);
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

}


		
}




function DarCinematica(index : int){
	return cinematicas[index];
}