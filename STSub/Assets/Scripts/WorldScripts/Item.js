#pragma strict

class Item extends MonoBehaviour{

var id : String;

var itemName : String;

var mat : matType;

var type : itemType;

var size : Vector3;

var weight : float;

var owner : Player;

var quantity : float;

var maxQuan : float;

var quality : float;

var durability : float;

var maxDurability :float;

var lastCheck : float;




function Start () {
    ItemFirst();
}



function Item()
{
    itemName = "RandomizedItem";
    maxQuan = 100;
    maxDurability = 100;
    

}    

function Item(nam : String, typ : int, wei : float, siz : Vector3, quan : float, mQua : float, qual : float, dur : float, mDur : float)
    {
        itemName = nam;
        type = typ;
        weight = wei;
        size = siz;
        quantity = quan;
        maxQuan = mQua;
        quality = qual;
        durability = dur;
        maxDurability = mDur;
        lastCheck = Time.time;
    }

    
    function ItemFirst()
    {
        mat =  Random.Range(0,8);
        type = Random.Range(0,6);
        weight = Random.Range(.1,50);
        size = Vector3(Random.Range(.1,1),Random.Range(.1,1),Random.Range(.1,1));
        quantity = Random.Range(0,maxQuan);    
        quality = Random.Range(0,100);
        durability = Random.Range(0,100);
        transform.localScale = size;
        lastCheck = Time.time;
        itemName = mat.ToString() + " " + type.ToString();
        gameObject.name = itemName;

        switch (type)
        {
            case itemType.Appliance:
                GetComponent(MeshRenderer).material = Resources.Load("Materials/White");
                break;
            case itemType.Connector:
                GetComponent(MeshRenderer).material = Resources.Load("Materials/Gray");
                break;
            case itemType.Consumable:
                GetComponent(MeshRenderer).material = Resources.Load("Materials/Blue");
                break;
            case itemType.Container:
                GetComponent(MeshRenderer).material = Resources.Load("Materials/Brown");
                break;
            case itemType.Construction:
                GetComponent(MeshRenderer).material = Resources.Load("Materials/Green");
                break;
            case itemType.Clothing:
                GetComponent(MeshRenderer).material = Resources.Load("Materials/Red");
                break;
            case itemType.Tool:
                GetComponent(MeshRenderer).material = Resources.Load("Materials/Black");
                break;
        }
    }
}