#pragma strict

var box : GameObject;
var count : int = 25;

function Start () {

}

function Update () {
    SpawnItem();
}

function SpawnItem()
{
    if(count >0)
    {
        var newItem : GameObject = Instantiate(box, transform.position, transform.rotation);
        newItem.AddComponent(Item);
        count--;
    }
}