#pragma strict

var cameras : GameObject[];
var activeCamera : int = 1;

function Start(){
	cameras[0].SetActive(true);	
}

function Update () {
	if ( Input.GetButtonDown("Camera")){
		if ( activeCamera == 1 ){
			cameras[0].SetActive(false);
			cameras[1].SetActive(true);
			activeCamera = 2;
		}
		else{
			cameras[0].SetActive(true);
			cameras[1].SetActive(false);
			activeCamera = 1;
		}
	}
}