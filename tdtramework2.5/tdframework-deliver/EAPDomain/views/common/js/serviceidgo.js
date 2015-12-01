function serviceidgo(key_event)
{		
	var which_key = (navigator.appname=="Nwtscape")?key_event.which:key_event.keyCode;
	if(which_key==13) {
		var temp=get_xml_value("root","IfQueryPass","text");				
			switch (temp)
			{	
				case "no":					
					document.forms[0].Password.focus();
					break;
				case "yes":				
					if (document.forms[0].BQueryPass.disabled) {	
						document.forms[0].Password.focus();
					} else {
						document.forms[0].BQueryPass.click();
					}	
					break;
				default:
					document.forms[0].Password.focus();
					break;	
			}
	}	
}		