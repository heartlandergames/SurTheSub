#pragma strict
private var manager : Manager;

var isActive : boolean;

var orderObject : GameObject;

var order : WorkOrder;

var player : Player;

var item1Loc : Transform;

var item2Loc : Transform;

var cam : Camera;

var creation : GameObject;

function Start()
{
    manager = GameObject.FindWithTag("Manager").GetComponent(Manager);
}


function Update () {
    if(Input.GetButtonUp("B"))
    {
        if(isActive)
        manager.ToWorkbench(orderObject, player.gameObject);
    }

    
}

function Set (g : GameObject)
    {
        var w : WorkOrder = g.GetComponent(WorkOrder);
        orderObject = g;
        order = w;
        player = w.character;
        ReadyItems(order.item1, order.item2);
        PlaceItems(order.item1, order.item2);
    }


function ReadyItems(a : GameObject, b : GameObject)
    {
        
        if(a.GetComponent(MeshRenderer) != null || b.GetComponent(MeshRenderer) != null)
        {
            a.GetComponent(MeshRenderer).enabled = true;
            b.GetComponent(MeshRenderer).enabled = true;
        }

        a.AddComponent(WorkbenchItem);
        b.AddComponent(WorkbenchItem);
        
    }

function PlaceItems(a : GameObject, b:GameObject)
    {
        a.transform.position = item1Loc.transform.position;
        b.transform.position = item2Loc.transform.position;
        a.transform.rotation = item1Loc.transform.rotation;
        b.transform.rotation = item2Loc.transform.rotation;

        Cursor.lockState = CursorLockMode.None;
        Cursor.visible = true;
    }

    function Manipulate()
    {
        var hit : RaycastHit;
        var ray : Ray = cam.ScreenPointToRay(Input.mousePosition);
        if(Physics.Raycast(ray, hit, 100))
        {
            if(hit.collider.gameObject.GetComponent(WorkbenchItem) != null)
            {
                Debug.Log("Clicked " + hit.collider.gameObject.name);
                hit.transform.position.x += Time.deltaTime * Input.GetAxis("Mouse X");
                hit.transform.position.z += Time.deltaTime * Input.GetAxis("Mouse Y");
            }
        }
    }


function Connect()
    {

    }



function ResetItems(a : GameObject, b: GameObject)
{
    a.transform.SetParent(player.leftLoc);
    b.transform.SetParent(player.rightLoc);
    a.transform.position = Vector3.zero;
    b.transform.position = Vector3.zero;
    b.transform.rotation = Quaternion.identity;
    a.transform.rotation = Quaternion.identity;
}


function ReturnCreation() : GameObject
{
    if(creation != null)
    {
        return creation;
    }
    if(creation == null)
    {
        ResetItems(order.item1, order.item2);
        Destroy(orderObject);
    }
    Debug.Log("Nada here");
    Cursor.lockState = CursorLockMode.Locked;
    Cursor.visible = true;
}