	#pragma strict

	var elapsedTime : float;

	var timePassedText : UI.Text;
	
	var timeRemain : float;
	var timeRemainText : UI.Text;

	var copter : GameObject;

	var speed : float;
	var speedText : UI.Text;
	var lastPosition = Vector3.zero;
	
	var infoPanel : GameObject;
	var infoText : UI.Text;
	
	var tutStarted : boolean;
	var tutDone : boolean;
	
	function Start () {
		if(PlayerPrefs.HasKey("tut2Completed")){
			Application.LoadLevel(2);
		}
		copter = GameObject.Find("Copter");
		yield WaitForSeconds(6);
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
			Application.LoadLevel( 1 );
		}
	
		if ( !tutStarted ){
			elapsedTime = Time.time;
		}
	
		if ( !tutDone && tutStarted){
		
			var time = Time.time - elapsedTime;
			timePassedText.text = "Time Passed: " + (Mathf.Round(time * 1000) /1000 ).ToString();
			timeRemain = 15 - (Mathf.Round(time * 1000) / 1000);
			timeRemainText.text = "Time Remaining: " +  timeRemain.ToString();
			
		}
	}
	
	public function Complete(){
		tutDone = true;
		infoText.text = "Perfect run. \n Free flight is now being loaded, have fun! \n\n Time trials with leaderboards coming soon.";		
		infoPanel.SetActive(true);
		yield WaitForSeconds(5);
		PlayerPrefs.SetInt("tut2Completed",1);				
		Application.LoadLevel(2);
	}