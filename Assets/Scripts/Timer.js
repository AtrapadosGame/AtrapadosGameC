#pragma strict


// ================================================================================
// Variables
// ================================================================================
private var startTime : float;
private var restSeconds : int;
private var roundedRestSeconds : int;
private var displaySeconds : int;
private var displayMinutes : int;
private var shakeTimer : int ;
private var lastShake : int;
private var numTemblores : int;

var timeUntilShake : int;
var countDownSeconds : int;

var MainCamera : Camera;


private var originPosition:Vector3;
private var originRotation:Quaternion;
 
private var shake_decay: float;
private var shake_intensity: float;;
 
 
// ================================================================================
// Update
// ================================================================================
function Update(){

    if(shake_intensity > 0){
        MainCamera.transform.position = originPosition + Random.insideUnitSphere * shake_intensity;
        MainCamera.transform.rotation =  Quaternion(
                        originRotation.x + Random.Range(-shake_intensity,shake_intensity)*.2,
                        originRotation.y + Random.Range(-shake_intensity,shake_intensity)*.2,
                        originRotation.z + Random.Range(-shake_intensity,shake_intensity)*.2,
                        originRotation.w + Random.Range(-shake_intensity,shake_intensity)*.2);
        shake_intensity -= shake_decay;
    }
}
 // ================================================================================
// Awake
// ================================================================================
function Awake() {
	startTime = Time.time;
	lastShake = startTime;
	numTemblores = 0;
	shake();
	
}

 // ================================================================================
// OnGui
// ================================================================================

function OnGUI () {
	//make sure that your time is based on when this script was first called
	//instead of when your game started
	var guiTime = Time.time - startTime;
	restSeconds = countDownSeconds - (guiTime);
	shakeTimer = Time.time - lastShake;
	if(shakeTimer >= timeUntilShake){
		
		//ACA TIENE QUE TEMBLAR
		shake();
		
		lastShake = Time.time;
		numTemblores ++ ;
		if(timeUntilShake>75){
			timeUntilShake = timeUntilShake/2;		
		}
		
		
	}
	if(restSeconds<120){
		timeUntilShake = 30;
	}

	if (restSeconds < 0) {
		GUI.Label (Rect (Screen.width/2 - 100 , Screen.height/2-Screen.height/4, 400, 200), "<size=40>HAS PERDIDO</size>");
//		gameOver();
	}
	
	if (restSeconds <= -1) {
		Application.Quit();
	}
	//display the timer
	roundedRestSeconds = Mathf.CeilToInt(restSeconds);
	displaySeconds = roundedRestSeconds % 60;
	displayMinutes = roundedRestSeconds / 60;
	
	var text : String = String.Format ("{0:00}:{1:00}", displayMinutes, displaySeconds);
	var anchoLabel:int = Screen.width/8;
	var altoLabel:int = Screen.height/8;
	if (restSeconds > 0) {
	GUI.Label (Rect (Screen.width/2 - anchoLabel, 0, anchoLabel, altoLabel), text);
	}
}

 
 // ================================================================================
// Metodos
// ================================================================================


function shake(){
    originPosition = MainCamera.transform.position;
    originRotation = MainCamera.transform.rotation;
    shake_intensity = .3;
    shake_decay = 0.002;
}


function getStartTime(){
	return startTime;
}
function gameOver(){


	yield WaitForSeconds(5);
	Application.LoadLevel ("Nivel1");
		
}