function genPrintString(printobject) 
{   
	var source = document.XMLDocument;
	var mark = "/root/Create/Printed_info/info"
	var sup_str = source.selectNodes(mark);
   	var printString = "";
  	var temp_count = 0;
  	var temp_del = 0;
    for(var i = sup_str.nextNode(); i != null; i = sup_str.nextNode())
    {        
    	var offset_x = i.selectNodes("Offset_x").nextNode().text;
    	var offset_y = i.selectNodes("Offset_y").nextNode().text;
    	var font_size = i.selectNodes("Font_size").nextNode().text;
    	var char_space = i.selectNodes("Char_space").nextNode().text;
    	var printed_info = i.selectNodes("Printed_info").nextNode().text;
    	var max_length = i.selectNodes("Max_length").nextNode().text;
    	var row_space = i.selectNodes("Row_space").nextNode().text;
    	var item_name = i.selectNodes("Item_name").nextNode().text;
    	if(printed_info=="" || printed_info == "null" || printed_info == null)
    	{
    		temp_del = temp_del + 1;
    	}
    	else{
    		printed_info = item_name + ": " + printed_info;
    		while (printed_info.length*2 > max_length)
    		{
    			printString += offset_x+"~";
				printString += parseInt(offset_y)+ parseInt(row_space)*temp_count - parseInt(row_space)*temp_del + "~";
				printString += font_size+"~";
				printString += char_space+"~";
				printString += printed_info.substr(0,Math.floor(max_length/2))+"~";
				printed_info = printed_info.substr(Math.floor(max_length/2) + 1,printed_info.length -1);
				temp_count = temp_count + 1;
    		}	
    		printString += offset_x+"~";
			printString += parseInt(offset_y)+parseInt(row_space)*temp_count - parseInt(row_space)*temp_del+"~";
			printString += font_size+"~";
			printString += char_space+"~";
			printString += printed_info+"~";
		}
    } 
   	//alert(printString);
    print_something(printobject,printString);
}


