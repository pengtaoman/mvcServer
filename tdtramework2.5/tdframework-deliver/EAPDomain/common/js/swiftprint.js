  function swiftPrint(printobject,str)
  {
    var text = toArray(str);
	printobject.DocBegin();
	printobject.WindowTitle("Neusoft print");
	printobject.Units = 2;
	printobject.SetFont( "Arial", 100, 4 + 1, 0);
    var len = text.length;
    for(var i=0;i<len;i++){
		//if(i%2==0)
			//printobject.BackColor = 224*224*224;
		//else
			printobject.BackColor = 198*198*198;

        if(i==0)
 			printobject.BackColor = 198*198*198;
        else 
     		printobject.BackMode = 1;
		printobject.SetFont( "??", 60, 4 + 1, 0);
		printobject.TextOut(110,70+(i+1)*60,text[i]);
	}
	printobject.DoPrintPreview();
  }
  function toArray(retString){
	var str = retString.split("\n");
  	return str;
  }
  
  
  
  
  
 
