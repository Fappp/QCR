#pragma strict

var startPos : Transform;

function OnTriggerEnter ( other : Collider ) {
	if ( other.gameObject.CompareTag("Player") ){
		other.gameObject.transform.position = startPos.position;
	}
}