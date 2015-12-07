#pragma strict

var _rb : Rigidbody;

var pitchSpeed : float;
var rollSpeed : float;
var throttleSpeed : float;
var rotateSpeed : float;

var curPitch : float;
var curRoll : float;
var curThrot : float;

var leftRot : boolean;
var rightRot : boolean;

var propellors : GameObject[];

function Start(){
	_rb = GetComponent(Rigidbody);
}

function FixedUpdate () {


	curThrot = 0;

	var pitch = Input.GetAxis("Pitch");
	var roll = Input.GetAxis("Roll");	
	var throt = Input.GetAxis("Throttle");
	curPitch = pitch * pitchSpeed * Time.deltaTime;
	curRoll = roll * rollSpeed * Time.deltaTime;
	curThrot = throt * throttleSpeed * Time.deltaTime;
	
	var propellorSpeed = 60 + (200 * curThrot) * Time.deltaTime;

	for ( var x=0; x<4; x++ ){
		propellors[x].transform.Rotate(Vector3.forward * propellorSpeed);
	}
	
	transform.Rotate(Vector3(roll * rollSpeed * Time.deltaTime ,0, pitch * pitchSpeed * Time.deltaTime));
	
//	if(Input.GetKey("joystick button " + 4)){
//		transform.Rotate( Vector3(-rotateSpeed * Time.deltaTime,0, 0) );
//		leftRot = true;
//	}
//	if ( Input.GetKey("joystick button " + 5) ){
//		transform.Rotate( Vector3(rotateSpeed * Time.deltaTime,0, 0) );
//		rightRot = true;
//	}
	
	if(Input.GetButton("RotateLeft")){
		transform.Rotate( Vector3(0,-rotateSpeed * Time.deltaTime, 0) );
		leftRot = true;
	}
	if ( Input.GetButton("RotateRight") ){
		transform.Rotate( Vector3(0,rotateSpeed * Time.deltaTime, 0) );
		rightRot = true;
	}
	
	_rb.AddRelativeForce( Vector3.up * curThrot * throttleSpeed * Time.deltaTime, ForceMode.Acceleration );

	var i = 0;
    for(i = 0; i < 20; i++){
   if(Input.GetKeyDown("joystick button " + i))
   {
       Debug.Log("Joystick Button " + i + " was pressed!");
   }
 }

}