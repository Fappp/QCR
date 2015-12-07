#pragma strict

var tutController : Tutorial1;

function OnTriggerEnter ( other : Collider ) {
	tutController.spheresRemaining -= 1;
	GameObject.Destroy( gameObject );
}