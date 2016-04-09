#pragma strict

var box : GameObject;
var count : int = 25;
var holder : GameObject;
function Start () {
    holder = new GameObject();
}

function Update () {
    SpawnItem();
}

function SpawnItem()
{
    if(count >0)
    {
        var newItem : GameObject = Instantiate(box, transform.position + Vector3(Random.Range(-2, 2), Random.Range(0,10),Random.Range(-2,2)), transform.rotation);
        newItem.AddComponent(Item);
        newItem.transform.SetParent(holder.transform);
        count--;
    }
}