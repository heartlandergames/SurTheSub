#pragma strict
import System;
import UnityEngine.UI;

var manager : Manager;

//identifying variables
var id :float;

var fName : String;

var lName : String;

var nName : String;

var race : raceType;

var age : int;

var weight : float;

var height : float;

var fave : Item = new Item();

//Components on this Player
var inventory : Inventory;

var stats : Stats;

var skills : Skills;


//Relevant GameObjects
var left : GameObject;

var leftLoc : Transform;

var right : GameObject;

var rightLoc : Transform;

var cameraHolder : Transform;

var retText : Text;

function Start () {
    
    FirstSetup();
    if(Cursor.visible)
    {Cursor.visible = false;}
    if(Cursor.lockState != CursorLockMode.Locked)
    {Cursor.lockState = CursorLockMode.Locked;}
    }

function Update () {
    Focus();
    AbilityCheck();
}


function PickUp(g : GameObject)
{
    if(g.GetComponent(Item) != null)
    {
        if(right == null)
        {
            right = g;
            SetForPickUp(g);
            g.transform.position = rightLoc.position;
            g.transform.rotation = rightLoc.rotation;
            g.transform.SetParent(rightLoc);
            return;
        }
    
        if(right != null && left == null)
        {
            left = g;
            SetForPickUp(g);
            g.transform.position = leftLoc.position;
            g.transform.rotation = leftLoc.rotation;
            g.transform.SetParent(leftLoc);
            return;
        }

        else if (right != null && left != null)
        {
            inventory.Add(g);
        }
    }
}

function Attack(g: GameObject)
{
    if(g.GetComponent(Item) != null)
    {
       
    }
}

function Drop ()
{
    if(right!=null)
    {
        SetForDrop(right);
        right.transform.position += cameraHolder.forward;
        right.transform.SetParent(null);
        right = null;
        return;
    }
    else if(right == null && left != null)
    {
        SetForDrop(left);
        left.transform.position += cameraHolder.forward;
        left.transform.SetParent(null);
        left = null;
        return;
    }

    else if(right ==null && left == null)
    {
        Debug.Log("Hands are Empty");
    }
}

function Use()
{
    
}

function Construct()
{

}

function Deconstruct()
{

}

function Interact()
{

}

function Focus() : GameObject
{
    var hit : RaycastHit;

    if(Physics.Raycast(cameraHolder.position, cameraHolder.forward, hit, 5))
    {
        if(hit.collider.gameObject != left && hit.collider.gameObject != right)
        {
            retText.text = hit.collider.gameObject.name;
            return hit.collider.gameObject;
        }
    }
    else if(!Physics.Raycast(cameraHolder.position, cameraHolder.forward, hit, 5))
    {
        retText.text = "";
        
    }
}

function AbilityCheck()
{
    if(Input.GetButtonUp("E"))
    {
        PickUp(Focus());
    }
    if(Input.GetButtonUp("I"))
    {
        OpenInv();
    }
    if(Input.GetButtonUp("G"))
    {
        Drop();
    }
    if(Input.GetButtonUp("B") && left != null && right != null)
    {
        SendToWorkbench();
    }
}





function FirstSetup()
{
    manager = GameObject.FindWithTag("Manager").GetComponent(Manager);

    if(fName == null && lName == null)
    {
        //get a random first and last name for this character if this character does not have names already
        var f : firstMale = UnityEngine.Random.Range(0,Enum.GetValues(firstMale).length);
        var l : lastName = UnityEngine.Random.Range(0,Enum.GetValues(lastName).length);
    
        //assign the random names to this player script
        fName = f.ToString();
        lName = l.ToString();
    }
    //assign random race;
    race = UnityEngine.Random.Range(0,Enum.GetValues(raceType).length);

    //get the RetText Text Object
    retText = GameObject.FindWithTag("RetText").GetComponent(UI.Text);
}

function SetForPickUp(g:GameObject)
    {
        if(g.GetComponent(Rigidbody)!=null)
        {
            var rb : Rigidbody = g.GetComponent(Rigidbody);
            rb.isKinematic = true;
            rb.useGravity = false;
        }
                
        if(g.GetComponent(BoxCollider))
        {
            var bc : BoxCollider = g.GetComponent(BoxCollider);
            bc.enabled = false;
        }
        
    }


    function SetForDrop(g:GameObject)
        {
            if(g.GetComponent(Rigidbody)!=null)
            {
                var rb : Rigidbody = g.GetComponent(Rigidbody);
                rb.isKinematic = false;
                rb.useGravity = true;
            }
                
            if(g.GetComponent(BoxCollider))
            {
                var bc : BoxCollider = g.GetComponent(BoxCollider);
                bc.enabled = true;
            }
            
        }
    


    ///Tells the manager to open the inventory for this player
    function OpenInv()
    {
        manager.uiHandler.character = this;
        manager.uiHandler.OpenInventory(this);
    }



        //sends the current held items to the workbench as a workorder attached to a new gameobject

    function SendToWorkbench()
    {
        //new gameobject
        var go : GameObject = new GameObject();
        go.AddComponent(WorkOrder);
        go.name = "WorkOrder Object";

        //new "WorkOrder"
        var bill : WorkOrder = go.GetComponent(WorkOrder);
        //set new Work Order items and Player
        bill.character = this;
        bill.item1 = left;
        bill.item2 = right;

        //attach the currently held items to the new gameobject for transfer. (prevents them from being invisible when this gets deactivated)
        left.transform.SetParent(go.transform);
        right.transform.SetParent(go.transform);

        //Call the Workbench function on the game Manager and feed it the new WorkOder and GameObject
        manager.ToWorkbench(go, this.gameObject);
    }