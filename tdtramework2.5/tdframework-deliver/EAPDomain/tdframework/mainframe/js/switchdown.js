// JavaScript Document
function switchdown(theOb,ob2)
{
     var ob2=eval(ob2);
	 
	if(theOb.src.indexOf("_2")>-1)
	{
		theOb.src="images/down_1.gif";
		ob2.style.display="none";		
	}
	else if(theOb.src.indexOf("_1")>-1)
	{
		theOb.src="images/down_2.gif";
		ob2.style.display="block";		
	}
}