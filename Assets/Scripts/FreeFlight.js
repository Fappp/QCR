#pragma strict

	public function QuitGame(){
		Application.Quit();
	}
	
	function Update(){
		if ( Input.GetKey( KeyCode.LeftControl )){
			if ( Input.GetKeyDown(KeyCode.R)){
				PlayerPrefs.DeleteAll();
 				Application.LoadLevel(Application.loadedLevel);
 			}
		}
	}