#pragma strict
import System.Collections.Generic;

var itemsList : List.<GameObject> = new List.<GameObject>();

var weight : float = 0;

var maxWeight : float = 100;

var size : float;

var maxSize : float = 100;



function Start () {

}

function Update () {

}



function Add(g : GameObject)
    {
        //Item script of the object to add
        var toAdd : Item = g.GetComponent(Item); 
    
        //if this item takes the inventory oversize
        if(size + (toAdd.size.x * toAdd.size.y * toAdd.size.z) > maxSize)
        {
            Debug.Log("Inventory out of space");
            return;
        }

        //if this item takes the inventory overweight
        if(weight + toAdd.weight > maxWeight)
        {
            Debug.Log("Youre over packed");
            return;
        }

        //There are items in the inventory
        if(itemsList.Count-1 >= 1)
        {
            Debug.Log("Items in List");
            
            //iterate through the items in inventory
            for(var go : GameObject in itemsList)
            {
                Debug.Log("Checking List:  " + go.name);
                //Item script of the current item in inventory during iteration
                var i : Item = go.GetComponent(Item);
                
                //if they share the same name
                if(i.itemName == toAdd.itemName)
            {
                    Debug.Log("Names Match");
                //if they also will remain under max stack
                    if(i.quantity + toAdd.quantity < i.maxQuan)
            {
                        Debug.Log("Less than total");
                        
                //add the total quantities
                        i.quantity += toAdd.quantity;

                //if they will excede the maxStack size
                        if(i.quantity + toAdd.quantity > i.maxQuan)
            {
                            Debug.Log("more than total");
                //the left over amount                
                            var left : float = (i.quantity + toAdd.quantity) - i.maxQuan;
                            
                //create a new item and give it the same properties and feed it the left over amount
                            var newItem : Item = new Item();
                            newItem = toAdd;
                            newItem.quantity = left;
                            SetForInventory(g);
                            itemsList.Add(g);
                            Recalculate();
                            return;
                        
            }   
    }
            
    
}
        
}
}
    
//if there is nothing in the itemsList just add this then    
    Debug.Log("Just Adding");
    SetForInventory(g);
    itemsList.Add(g);
    Recalculate();

        
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

        function Split(i :Item) : Item
        {
            var splitVal : float = i.quantity%2;
            var splitCopy : Item = new Item();
            splitCopy = i;
            splitCopy.quantity = splitVal;
            i.quantity = splitVal;
            return splitCopy;
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
                s += (i.size.y * i.size.x * i.size.z);
            }

        weight = w;
        size =s;
        Debug.Log("Should Work");
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