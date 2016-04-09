#pragma strict

var thisItem : GameObject;
var player : Player;
var manager : Manager;

function Start () {
    manager = GameObject.FindWithTag("Manager").GetComponent(Manager);
}

function Update () {

}

function Equip()
{
    //call an equip menu on the manager.uihandler;
}

function Remove()
{
    player.inventory.Remove(thisItem);
    manager.uiHandler.ItemInfo(thisItem);
}

function  Split()
{

}

function Close()
{
    manager.uiHandler.ItemInfo(thisItem);
}