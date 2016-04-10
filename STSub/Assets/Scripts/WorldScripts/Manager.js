#pragma strict
import UnityEngine.SceneManagement;


var uiHandler : UIHandler;

private var workbenchActive : boolean;

private var workbenchCamera : Camera;

private var workbench : Workbench;

function Start () {
    workbench = GameObject.Find("Workbench").GetComponent(Workbench);
}

function Update () {

}

function ToWorkbench(g : GameObject, p : GameObject)
{
    if(!workbenchActive)
    {
        workbench.cam.gameObject.SetActive(true);
        p.SetActive(false);
        workbench.Set(g);
        workbenchActive = true;
        workbench.isActive = true;
        return;
    }
    if(workbenchActive)
    {
        workbench.ReturnCreation();
        workbench.cam.gameObject.SetActive(false);
        p.SetActive(true);
        workbenchActive = false;
        workbench.isActive= false;
        return;
    }
    
   
}
