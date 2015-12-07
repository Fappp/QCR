#pragma strict

var _audio : AudioSource;
var checkSound : AudioClip;

var lapTimer : LapTimer;

function Start(){
	_audio = GetComponent(AudioSource);
}

function OnTriggerEnter ( other : Collider ) {
	_audio.PlayOneShot( checkSound );
	lapTimer.CheckPoint();
	yield WaitForSeconds(0.5);
	gameObject.SetActive(false);
}