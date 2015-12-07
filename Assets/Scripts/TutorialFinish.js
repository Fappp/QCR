#pragma strict

var tutController : Tutorial2;

function OnTriggerEnter ( other : Collider ) {
	tutController.SendMessage("Complete", SendMessageOptions.DontRequireReceiver);
}