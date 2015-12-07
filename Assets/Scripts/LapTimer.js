#pragma strict

var seconds : float;
var minutes : float;
var miliseconds : float;
var timerStarted : boolean;

var fastestLap : float;
var laptimeUI : UI.Text;
var fastestLapTime : UI.Text;

var currentCheckpoint : int;
var checkpoints : GameObject[];
var amountOfCheckpoints : int;

var playerNameText : UI.Text;
public var playerName : String;

var GJhighscore : GJHighscore;

var copter : GameObject;
var startPos : Vector3;
var startRot : Vector3;

var lapRecorder : LapRecorder;
var timer : float;

function Start(){
	amountOfCheckpoints = checkpoints.Length;
	playerName = "Guest" + Mathf.Round(Random.Range(0,10000));
	playerNameText.text = playerName;
	startPos = copter.transform.position;
	startRot = copter.transform.eulerAngles;
	DisableCheckpoints();
}

function Update () {
 			
	if ( timerStarted ){
	
		timer += Time.deltaTime;
		if ( timer >= 1 ){
			timer = 0;
			lapRecorder.AddNode( new GhostData(Mathf.RoundToInt((minutes * 60) + seconds), copter.transform.position));
		}
		
		if ( Input.GetKeyDown(KeyCode.R)){
			Restart();
	 	}
		if ( seconds >= 60 ){
			minutes += 1;
			seconds = 0;
		}
		seconds += Time.deltaTime;
		if ( seconds >= 10 ){
			laptimeUI.text = minutes.ToString() + ":" + (Mathf.Round(seconds * 1000) / 1000 ).ToString();
		}
		else{
			laptimeUI.text = minutes.ToString() + ".0" + (Mathf.Round(seconds * 1000) / 1000 ).ToString();			
		}
	}
}

function Restart(){
	copter.transform.position = startPos;
	copter.transform.eulerAngles = startRot;
	currentCheckpoint = 0;
	timerStarted = false;
	fastestLap = 0;
	seconds = 0;
	minutes = 0;
	copter.GetComponent(Rigidbody).velocity = Vector3.zero;
			for ( var u=0; u < checkpoints.Length; u++ ){
				checkpoints[u].SetActive( false );
			}
}

function EnableCheckpoints(){
	for ( var cp=0; cp < checkpoints.Length; cp++ ){
		checkpoints[cp].SetActive( true );
	}	
}

function DisableCheckpoints(){
	for ( var cp=0; cp < checkpoints.Length; cp++ ){
		checkpoints[cp].SetActive( false );
	}	
}

function ShowLeaderBoards(){
	GameJolt.UI.Manager.Instance.ShowLeaderboards();
}

public function CheckPoint(){
	currentCheckpoint++;
}

public function Finish(){
	if ( !timerStarted ){
		if ( fastestLap > 0 ){
			lapRecorder.Play();
			lapRecorder.playing = true;
		}
		timerStarted = true;
		minutes = 0;
		seconds = 0;
		currentCheckpoint = 0;
		EnableCheckpoints();	
	}
	else{
		if ( currentCheckpoint == amountOfCheckpoints ){
			if ( fastestLap == 0 ){
				lapRecorder.HotLap();
				fastestLap = (minutes * 60) + seconds;
				if ( seconds >= 10 ){
					fastestLapTime.text = minutes.ToString() + "." + (Mathf.Round(seconds * 1000) / 1000 ).ToString();
				}
				else{
					fastestLapTime.text = minutes.ToString() + ".0" + (Mathf.Round(seconds * 1000) / 1000 ).ToString();			
				}
			}
			if ( (minutes * 60) + seconds <= fastestLap ){
				fastestLap = (minutes * 60) + seconds;
				playerName = playerNameText.text;
				GJhighscore.Score( fastestLap , minutes.ToString() + "." + (Mathf.Round(seconds * 1000) / 1000 ).ToString() , playerName, 96601, "AroundTheBlock" );
				if ( seconds >= 10 ){
					fastestLapTime.text = minutes.ToString() + ":" + (Mathf.Round(seconds * 1000) / 1000 ).ToString();
				}
				else{
					fastestLapTime.text = minutes.ToString() + ".0" + (Mathf.Round(seconds * 1000) / 1000 ).ToString();			
				}
			}
			
			minutes = 0;
			seconds = 0;
			currentCheckpoint = 0;
			
			for ( var x=0; x < checkpoints.Length; x++ ){
				checkpoints[x].SetActive( true );
			}
		}
	}
}

public function SetPlayerName ( nm : String ){
	playerName = nm;
}