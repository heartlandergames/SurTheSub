#pragma strict
import UnityEngine.Networking;
import System.Collections.Generic;

class Network_Character extends NetworkBehaviour{

    var monoList : List.<MonoBehaviour> = new List.<MonoBehaviour>();
        var cam : Camera;
        var aud : AudioListener;

    function Start () {
        if(isLocalPlayer)
        {
            for(var mb : MonoBehaviour in monoList)
            {
                mb.enabled = true;
                Debug.Log(mb.ToString());
            }
        cam.enabled = true;
        aud.enabled = true;
        }
    }

    function Update () {

    }

}