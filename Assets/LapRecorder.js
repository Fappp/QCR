#pragma strict
import System.Collections.Generic;

var recorderLap = new List.<GhostData>();
var hotLapData = new List.<GhostData>();
var hotLapDataLength : int;

var ghost : GameObject;
var currentNode : int = 0;
public var playing : boolean;

var timer : float;

function Update(){
	Loop();
}

function Loop(){
	if ( playing ){
		if ( currentNode < hotLapDataLength ){
			timer+= Time.deltaTime;
			if ( timer > 1 ){
				timer = 0;
				MoveTowards( hotLapData[ currentNode ].pos );
				currentNode++;
			}
		}
	}
}

public function HotLap(){
	hotLapData.Clear();
	hotLapData = recorderLap;
	hotLapDataLength = hotLapData.Count;
}

public function AddNode ( data : GhostData ) {
	recorderLap.Add( data );
}

public function Play(){
	playing = true;
}

function MoveTowards ( pos : Vector3 ){
	for ( var x=0; x < 10; x++ ){
		ghost.transform.position = Vector3.Lerp( ghost.transform.position, pos, x );
	}
}