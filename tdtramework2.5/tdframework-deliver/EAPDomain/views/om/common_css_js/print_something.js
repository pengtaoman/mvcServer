//��ӡ�ؼ���ʹ��:printstringΪ��ӡ�ַ�������ʽΪ:��ӡ��1������+'~'+��ӡ��1������+'~'+�ִ�С+'~'+��ӡ��1ֵ+'~'+...
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
			alert('��ӡ��Ӧ���к�������ʹ�ӡֵ,��˲�!');
		}
	}
	else
	{
		alert('��ӡ��Ӧ����~�ָ�,���Ҳ���Ϊ��!');		
	}
	
	//printobject.DoPrintPreview();
	printobject.DoPrintDirect();				
}