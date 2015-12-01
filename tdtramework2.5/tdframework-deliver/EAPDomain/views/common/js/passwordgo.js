function passwordgo(key_event)
{		
	var which_key = (navigator.appname=="Nwtscape")?key_event.which:key_event.keyCode;
	if(which_key==13) {
		document.forms[0].BQuery.click();
	}	
}		