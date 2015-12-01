// JavaScript Document
function switchdown(theOb,ob1,ob2)
{	
     var ob1=eval(ob1);
     var ob2=eval(ob2);
	if(theOb.src.indexOf("_2")>-1)
	{
		theOb.src="common/dx20/images/down_1.gif";
		if(typeof ob1 != 'undefined'){
			ob1.style.display="none";		
		}
		if(typeof ob2 != 'undefined'){
			ob2.style.display="none";	
		}
	}
	else if(theOb.src.indexOf("_1")>-1)
	{
		theOb.src="common/dx20/images/down_2.gif";
		if(typeof ob1 != 'undefined'){
			ob1.style.display="block";		
		}
		if(typeof ob2 != 'undefined'){
			ob2.style.display="block";	
		}
	}
}

	function mouseoverevent(element){
		if(element){
			element.style.backgroundColor="#fffccc";
		}
	}
	function mouseoutevent(element){
		if(element){
			element.style.backgroundColor="#ffffff";
		}
	}