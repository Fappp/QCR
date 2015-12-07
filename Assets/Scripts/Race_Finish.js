#pragma strict

import UnityEngine.Networking;

var _audio : AudioSource;
var checkSound : AudioClip;

var lapTimer : LapTimer;

var _nm : NetworkManager;

function Start(){
	lapTimer = (GameObject.Find("LapRecorder").GetComponent("LapTimer") as LapTimer);
}

function OnTriggerEnter ( other : Collider ) {
	_audio.PlayOneShot( checkSound );
	lapTimer.Finish();
}