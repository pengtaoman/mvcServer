function sort(divName,orderVal) 
{ 

var stylesheet=document.XSLDocument; 
var source=document.XMLDocument; 
var sortField=document.XSLDocument.selectSingleNode("//xsl:sort/@select");
var sortOrder = document.XSLDocument.selectSingleNode("//xsl:sort/@order");

if (sortField.value==orderVal)//���ı�����˳��
{
	if (sortOrder.value=='ascending')
		sortOrder.value='descending';
	else
		sortOrder.value='ascending';
}
else
{
	sortField.value=orderVal;
	sortOrder.value='ascending';
}

eval(divName).innerHTML=source.documentElement.transformNode(stylesheet); 
}
