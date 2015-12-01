//打印控件的使用:printstring为打印字符串：格式为:打印项1横坐标+'~'+打印项1纵坐标+'~'+字大小+'~'+打印项1值+'~'+...
function print_something(printobject,printstring)
{	
	printobject.DocBegin();
	printobject.WindowTitle("Neusoft print");		
	printobject.Units=2;
	printobject.SetPen(1,1,0);
	printobject.ForeColor = 0;	
	var print_len=0;
	
	print_string=printstring.split('~');
	print_len=print_string.length;
	if (print_len>0)
	{
		if (print_len>4)
		{
			for (var i=0; 5*i< print_len; i++)
			{
				if (5*i+4 < print_len)
				{					
					printobject.SetFont("Arial", print_string[5*i+2], 4 + 1, 0);
					printobject.TextOut(print_string[5*i],print_string[5*i+1],print_string[5*i+4]);
				}
			}
		}
		else
		{
			alert('打印项应该有横纵坐标和打印值,请核查!');
		}
	}
	else
	{
		alert('打印项应该用~分隔,并且不能为空!');		
	}
	
	//printobject.DoPrintPreview();
	printobject.DoPrintDirect();				
}