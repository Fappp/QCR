	#pragma strict
	
	var elapsedTime : float;

	var timePassedText : UI.Text;

	public var spheresRemaining : int = 9;
	var sphereText : UI.Text;

	var copter : GameObject;

	var speed : float;
	var speedText : UI.Text;
	var lastPosition = Vector3.zero;
	
	var infoPanel : GameObject;
	var infoText : UI.Text;
	
	var tutStarted : boolean;
	var tutDone : boolean;

	function Start () {			
		if(PlayerPrefs.HasKey("tut1Completed")){
			Application.LoadLevel(1);
		}

		copter = GameObject.Find("Copter");
		yield WaitForSeconds(6);
		infoPanel.SetActive(false);
		infoText.text = "Use the left analog stick to tilt the craft. The right analog stick to throttle up or down. And use the triggers to rotate. Good luck!";
		yield WaitForSeconds(1);
		infoPanel.SetActive(true);
		yield WaitForSeconds(6);
		infoPanel.SetActive(false);
		infoText.text = "Press R at any time to restart this test.";
		yield WaitForSeconds(1);
		infoPanel.SetActive(true);
		yield WaitForSeconds(3);
		infoPanel.SetActive(false);
		tutStarted = true;
	}


	function FixedUpdate(){
	
		if ( tutStarted ){
			speed = (copter.transform.position - lastPosition).magnitude;
			lastPosition = copter.transform.position;
			speedText.text = "AirSpeed: " + (Mathf.Round(speed * 10 * 1000) /1000 ).ToString() + "km/h";
		}
	}

	function Update(){
		Loop();
	}

	function Loop () {
	
		if ( Input.GetKey("r")){
			Application.LoadLevel( 0 );
		}
	
		if ( !tutStarted ){
			elapsedTime = Time.time;
		}
	
		if ( !tutDone && tutStarted){
		
			var time = Time.time - elapsedTime;
			timePassedText.text = "Time Passed: " + (Mathf.Round(time * 1000) /1000 ).ToString();
			sphereText.text = "Remaining Spheres: " + spheresRemaining.ToString();

			if ( spheresRemaining <= 0 ) {
				tutDone = true;
				infoText.text = "You did it! \n\n Prepare for the next test. \n";
				if ( time <= 59 ){
					infoText.text += "Professional! Completion time: " + Mathf.RoundToInt( time ) + " seconds";
				}
				else if ( time <= 120 ){
					infoText.text += "Completion time: " + Mathf.RoundToInt( time ) + " seconds";					
				}
				yield WaitForSeconds(1);
				infoPanel.SetActive(true);
				yield WaitForSeconds(5);
				PlayerPrefs.SetInt("tut1Completed",1);				
				Application.LoadLevel(1);
			}
			
		}
	}