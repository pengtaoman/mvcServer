function get_xml_value(directory_path,param_name,type)
{	
	if (directory_path=="") {
		directory_path="root";
	}	
	if (param_name=="") {
		return "";
	}		
	switch (type)
	{
		case "text":
			mark=directory_path+"/"+param_name;						
			break;
		case "selected":
			mark=directory_path+"/"+param_name+"/selected";							
			break;		
		default:
			mark=directory_path+"/"+param_name;
			break;
	}	
	var source = document.XMLDocument;	
	var node=source.selectNodes(mark);
	var text_xml = "";
	var returnvalue = "";
	text_xml=node.nextNode();
	if(text_xml) {
		returnvalue = text_xml.text;		
		return returnvalue;
	} else {
		return "";
	}	
}