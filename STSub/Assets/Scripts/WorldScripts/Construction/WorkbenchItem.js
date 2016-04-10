#pragma strict

var selected : boolean;

function Start () {

}

function Update () {
    if(selected)
    {
        if(Input.GetAxis("Mouse X"))
        {
            var x = Input.GetAxis("Mouse X");
            transform.position.x += x;
        }
        if(Input.GetAxis("Mouse Y"))
        {
            var z = Input.GetAxis("Mouse Y");
            transform.position.z += z;
        }

        if(Input.GetAxis("Mouse ScrollWheel"))
        {
            var y = Input.GetAxis("Mouse ScrollWheel");
            transform.position.y += y;
        }
    }
}

function OnMouseDown()
{
    if(Input.GetAxis("Mouse X"))
    {
        var x = Input.GetAxis("Mouse X");
        transform.position.x += x;
    }
    if(Input.GetAxis("Mouse Y"))
    {
        var z = Input.GetAxis("Mouse Y");
        transform.position.z += z;
    }

    if(Input.GetAxis("Mouse ScrollWheel"))
    {
        var y = Input.GetAxis("Mouse ScrollWheel");
        transform.position.y += y;
    }
}
