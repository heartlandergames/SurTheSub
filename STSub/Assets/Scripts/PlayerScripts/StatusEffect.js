#pragma strict

var stat : specStat;

var duration : float;

var effect : float;

var cure : String;

enum specStat
{
    Health,
    Hunger,
    Thirst,
    Mind,
    Energy,

}




function Start () {

}

function Update () {

}

function StatusEffect()
{
    stat = Random.Range(0,4);
    duration = Random.Range(0,100);
    effect = Random.Range(-100, 100);
    cure = "Cure";
}

function StatusEffect(s : specStat)
{
    stat = s;
    duration = Random.Range(0,100);
    effect = Random.Range(-100,100);
    cure = "Cure";
}

function StatusEffect(sts : specStat, dur : float, eff : float, cur : String)
{
    stat = sts;
    duration = dur;
    effect = eff;
    cure = cur;
}

function StatusEffect(sts : specStat, proCon : boolean)
{
    stat = sts;
    duration = Random.Range(0,100);
    if(proCon)
    {
        effect = Random.Range (1,100);
    }
    if(!proCon)
    {
        effect = Random.Range(-100, -1);
    }
    cure = "Cure";
}