#pragma strict
import UnityEngine.Networking;

var count : int = 10;
var prefab : GameObject;
class NetworkItemGenerator extends NetworkBehaviour
{
function Start () {

}

function Update () {
    CmdSpawnItem();
}

@Command

function CmdSpawnItem()
{
    if(count > 0)
    {
        var item : GameObject = Instantiate(prefab, transform.position, transform.rotation);
        item.AddComponent(NetItem);
        NetworkServer.Spawn(item);
        count--;
    }
}

}