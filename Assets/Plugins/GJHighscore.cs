using UnityEngine;
using System.Collections;

public class GJHighscore : MonoBehaviour {

	public GameObject laptimer;
	public GameObject loginBut;
	public GameObject nameField;

	void Start(){
		GameJolt.UI.Manager.Instance.ShowSignIn((bool success) => {
			     if (success)
			     {
				    Debug.Log("The user signed in!");
					laptimer.GetComponent("LapTimer").SendMessage("SetPlayerName", GameJolt.API.Manager.Instance.CurrentUser.Name.ToString());
					loginBut.SetActive(false);
					nameField.SetActive(false);
			}
			     else
			     {
				         Debug.Log("The user failed to signed in or closed the window :(");
				     }
			   });	
	}

	public void Score ( int scoreValue, string scoreText, string guestName, int tableID, string extraData ) {
			GameJolt.API.Scores.Add(scoreValue, scoreText, guestName, tableID, extraData, (bool success) => {
			Debug.Log(string.Format("Score Add {0}.", success ? "Successful" : "Failed"));
		});

	}

	public void GJLogin(){
			GameJolt.UI.Manager.Instance.ShowSignIn((bool success) => {
				if (success)
				{
					Debug.Log("The user signed in!");
					laptimer.GetComponent("LapTimer").SendMessage("SetPlayerName", GameJolt.API.Manager.Instance.CurrentUser.Name.ToString());
					loginBut.SetActive(false);
					nameField.SetActive(false);
				}
				else
				{
					Debug.Log("The user failed to signed in or closed the window :(");
				}
			});
	}
}
