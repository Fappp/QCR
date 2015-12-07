#pragma strict

import UnityEngine;
import System.Collections;
import UnityEngine.Networking;

var copterController : QuadController;
var cameraController : CameraManager;

public class networkCopter extends NetworkBehaviour{
	function Start () {
		if ( isLocalPlayer ){
			copterController.enabled = true;
			cameraController.enabled = true;
		}
	}
}