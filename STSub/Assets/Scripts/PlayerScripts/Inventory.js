#pragma strict
import System.Collections.Generic;

var itemsList : List.<GameObject> = new List.<GameObject>();

var weight : float = 0;

var maxWeight : float = 100;

var size : float = 0;

var maxSize : float = 100;



function Start () {

}

function Update () {

}



function Add(g : GameObject)
{
    var toAdd : Item = g.GetComponent(Item); 
    if(itemsList.Count >= 1)
    {
        for(var go : GameObject in itemsList)
        {
            var i : Item = go.GetComponent(Item);
            if(i.itemName == toAdd.itemName)
        {
                if(i.quantity < i.maxQuan)
        {
                    i.quantity += toAdd.quantity;

                    if(i.quantity > i.maxQuan)
        {
                        var left : float = i.quantity - i.maxQuan;
                    
                        var newItem : Item = new Item();
                        newItem = toAdd;
                        newItem.quantity = left;
                        SetForInventory(g);
                        itemsList.Add(g);
                        
                    }   
                }
            return;
            }
        
        }
    }
    
    //if there is nothing in the itemsList just add this then    
SetForInventory(g);
itemsList.Add(g);

        
}

function Remove(g: GameObject)
{
    SetForRemove(g);
    itemsList.Remove(g);
    g.transform.position += GetComponent(Player).cameraHolder.forward;
}

function Equip (g:GameObject)
{

}

function Split()
{

}

function Sort()
{

}

function Search()
{

}


function Recalculate()
{
    var w : float;
    var s : float;

    for(var go : GameObject in itemsList)
    {
        var i : Item = go.GetComponent(Item);
        w += i.weight;
        s += i.size.y * i.size.x * i.size.z;
    }

weight = w;
size =s;
}

function SetForInventory(g :GameObject)
    {
        if(g.GetComponent(Rigidbody)!= null)
        {
            var rb : Rigidbody = g.GetComponent(Rigidbody);
            rb.isKinematic = true;
            rb.useGravity = false;
        
        }
        if(g.GetComponent(BoxCollider) != null)
        {
            var bc : BoxCollider = g.GetComponent(BoxCollider);
            bc.enabled =  false;
        }
        if(g.GetComponent(MeshRenderer)!= null)
        {
            var mr : MeshRenderer = g.GetComponent(MeshRenderer);
            mr.enabled = false;
        }
        g.transform.localScale = Vector3(.1,.1,.1);
        g.transform.position = gameObject.transform.position;
        g.transform.rotation = gameObject.transform.rotation;
        g.transform.SetParent(transform);

    }

function SetForRemove(g:GameObject)
    {
        //enable rigidbody 
        if(g.GetComponent(Rigidbody)!= null)
        {
            var rb : Rigidbody = g.GetComponent(Rigidbody);
            rb.isKinematic = false;
            rb.useGravity = true;
        
        }
        //enable collider
        if(g.GetComponent(BoxCollider) != null)
        {
            var bc : BoxCollider = g.GetComponent(BoxCollider);
            bc.enabled =  true;
        }
        //make visible / enable renderer
        if(g.GetComponent(MeshRenderer)!= null)
        {
            var mr : MeshRenderer = g.GetComponent(MeshRenderer);
            mr.enabled = true;
        }
        //remove parent and change the size to what it ought to be
        g.transform.SetParent(null);
        g.transform.localScale = g.GetComponent(Item).size;
    }