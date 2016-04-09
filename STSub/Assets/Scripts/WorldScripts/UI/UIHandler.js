#pragma strict
import UnityEngine.UI;

//canvas to which all will be assigned
var canvas : Canvas;

var character : Player;

//inventory variables
var invGO : GameObject;

var invMenu : GameObject;

var invButton : GameObject;

var invOpen : boolean;



//item info variables
var itemGO : GameObject;

var itemMenu : GameObject;

var itemOpen : boolean;


function OpenInventory(p : Player)
{
    
    if(!invOpen)
        {//if the inventory is closed
            var inv : Inventory = p.inventory;
            var toDisplay : List.<Item> = new List.<Item>();

            for(var g : GameObject in inv.itemsList)
            {//get the Item componenet from each Inventory GameObject
                toDisplay.Add(g.GetComponent(Item));
            }

        var menu = Instantiate(invMenu, canvas.transform.position, canvas.transform.rotation); 
        var mRT : RectTransform = menu.GetComponent(RectTransform);  
        menu.transform.SetParent(canvas.transform);
        Debug.Log(toDisplay.Count-1);

        if(toDisplay.Count >=1)
        {//if there are inv.items then create a button for each one below the previous one
            mRT.rect.height = toDisplay.Count * invButton.GetComponent(RectTransform).rect.height + (5 * toDisplay.Count-1);
            for(var i : Item in toDisplay)
            {
                var but : GameObject = Instantiate(invButton, menu.transform.position, menu.transform.rotation);
                var butB : Button = but.GetComponent(Button);
                var butT : Text = but.GetComponentInChildren(Text);
                var butRT : RectTransform = but.GetComponent(RectTransform);

                butT.text = i.itemName;
                but.transform.SetParent(menu.transform);
                butRT.localPosition.y = -toDisplay.IndexOf(i) * (invButton.GetComponent(RectTransform).rect.height + 5);
                but.GetComponent(InvItem).buttonItem = i.gameObject;
                but.GetComponent(InvItem).uiHandler = this;
                
            }
        }
    invGO = menu;
    invOpen = true;
    Cursor.lockState = CursorLockMode.None;
    Cursor.visible = true;
    Time.timeScale = 0;
    return;
}


        if(invOpen)
        {
            Destroy(invGO);
            invOpen = false;
            Cursor.lockState = CursorLockMode.Locked;
            Cursor.visible = false;
            Time.timeScale = 1;
            return;
        }
}

function ItemInfo(g:GameObject)
{
    if(!itemOpen)
    {
        itemGO = Instantiate(itemMenu, canvas.transform.position, canvas.transform.rotation);
        itemGO.transform.SetParent(canvas.transform);
        itemGO.GetComponent(ItemMenu).thisItem = g;
        itemGO.GetComponent(ItemMenu).player = character;
        itemOpen = true;
        //Cursor.lockState = CursorLockMode.None;
        //Cursor.visible = true;
        return;
    }
    if(itemOpen)
    {
        Destroy(itemGO);
        itemOpen = false;
        //Cursor.lockState = CursorLockMode.Locked;
        //Cursor.visible = true;
        OpenInventory(character);
        OpenInventory(character);
        return;
    }
}