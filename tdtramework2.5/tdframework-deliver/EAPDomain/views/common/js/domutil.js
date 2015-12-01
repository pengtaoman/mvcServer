// weizj 2006-02-17
var XMLSource = document.XMLDocument;
var XSLTSource=document.XSLDocument;
var createDOMDocument=function (){
	var xDoc=null;
	//if (typeof ActiveXObject != "undefined"){
		var msXmlAx=null;
		try {
			msXmlAx = new ActiveXObject("Msxml2.DOMDocument.4.0");
		}catch (e)	{
			try{
				msXmlAx=new ActiveXObject("Msxml2.DOMDocument");
			}catch (e){
				msXmlAx=new ActiveXObject("Msxml.DOMDocument");
			}
		}
		xDoc=msXmlAx;
	//}else if (document.implementation && document.implementation.createDocument){
	//	xDoc=document.implementation.createDocument("","",null);
	//}
	if (xDoc==null || typeof xDoc.load=="undefined"){
		xDoc=null;
	}else{
		xDoc.async = false;
		xDoc.resolveExternals = false;

	}
	return xDoc;
}


var paraXML=function(xmlFile,xsltFile,nodeTag){

	var xmlDoc=null;
	var xsltDoc=null;
	
	if (xmlFile!=null && typeof xmlFile !="undefined"){
		xmlDoc=createDOMDocument();
		xmlDoc.load(xmlFile);
	}else{
		xmlDoc=document.XMLDocument;
	}
	

	if (xsltFile!=null && typeof xsltFile !="undefined"){
		xsltDoc=createDOMDocument();
		xsltDoc.load(xsltFile);
	}else{
		xsltDoc=document.XSLDocument;
	}

	var xmlRoot=null;

	if (nodeTag==null || typeof nodeTag =="undefined"){
		nodeTag="/";
	}

	xmlRoot=xmlDoc.selectSingleNode(nodeTag);
	//////////////////////
	if(!true && xsltFile.indexOf("custviewother")>0) {
		alert(xmlRoot.xml);
	}
	if (xmlRoot==null || typeof xmlRoot =="undefined") return "";
	return xmlRoot.transformNode(xsltDoc);
}

var paraXMLObj=function(xmlObj,xsltObj,nodeTag){
	var xmlDoc=xmlObj;
	var xsltDoc=xsltObj;

	if (xmlDoc!=null && typeof xmlDoc !="undefined"){
		xmlDoc=document.XMLDocument;
	}

	if (xsltDoc!=null && typeof xsltDoc !="undefined"){
		xsltDoc=document.XSLDocument;
	}

	var xmlRoot=null;

	if (nodeTag!=null && typeof nodeTag !="undefined"){
		xmlRoot=xmlDoc.selectSingleNode(nodeTag);
		if (xmlRoot!=null) return xmlRoot.transformNode(xsltDoc);
	}
	return xmlDoc.transformNode(xsltDoc);

}



innerDOMHtml=function(objId,xmlFile,xsltFile,nodeTag){
	oobj=document.getElementById(objId);
	if (oobj!=null && typeof oobj != "undefined"){
		oobj.innerHTML=paraXML(xmlFile,xsltFile,nodeTag);
	}
}




//////////////////////////////////////
/////////
/*

假设XXXX.do ---->jsp--->xml 对应的 xslt文件是 qqq.xslt

原方法：
<div>
<iframe src="/crm/XXX/XXXX.do?pa=123&pb=321" ></iframe>
</div>



采用XMLDocument后：
<div>
<script>
document.writeln(paraXML("/crm/XXX/XXXX.do?pa=123&pb=321" ,"qqq.xslt" ));
</script>
</div>


*/
/////////
//////////////////////////////////////