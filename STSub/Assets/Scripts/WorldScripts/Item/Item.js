#pragma strict

class Item extends MonoBehaviour{

    var id : String;

var icon : Sprite;

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
    if(itemName == "RandomizedItem")
    {
        ItemFirst();
    }
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
        var nam : String;
        mat =  Random.Range(0,8);
        type = Random.Range(0,6);
        weight = Random.Range(.1,50);
        size = Vector3(Random.Range(.1,1),Random.Range(.1,1),Random.Range(.1,1));
        quantity = Random.Range(0,maxQuan);    
        quality = Random.Range(0,100);
        durability = Random.Range(0,100);
        transform.localScale = size;
        lastCheck = Time.time;
        

        
        switch (type) //apply matType and meshRenderer.material based on itemType
        {
            case itemType.Appliance:
                GetComponent(MeshRenderer).material = Resources.Load("Materials/Appliance");
                Debug.Log("Appliace");
                mat = matType.Metal;
                break;
            case itemType.Connector:
                GetComponent(MeshRenderer).material = Resources.Load("Materials/Connector");
                mat = matType.Metal;
                break;
            case itemType.Consumable:
                GetComponent(MeshRenderer).material = Resources.Load("Materials/Consumable");
                mat = 5;
                break;
            case itemType.Container:
                GetComponent(MeshRenderer).material = Resources.Load("Materials/Container");
                break;
            case itemType.Construction:
                GetComponent(MeshRenderer).material = Resources.Load("Materials/Green");
                break;
            case itemType.Clothing:
                GetComponent(MeshRenderer).material = Resources.Load("Materials/Red");
                mat = matType.Cloth;
                break;
            case itemType.Tool:
                GetComponent(MeshRenderer).material = Resources.Load("Materials/Black");
                mat = Random.Range(0,2);
                break;
               
        }
        nam = mat.ToString() + " " + type.ToString();
        gameObject.name = nam + itemName;
    }
}