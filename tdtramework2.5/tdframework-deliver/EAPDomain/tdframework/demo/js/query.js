//var APP_PATH = document.getElementsByTagName("contextPath")[0].value;
//alert(APP_PATH);
//ѡ���ڲ����ڵ㣨 ����֯�ṹ��ѯ ��
var selectedTreeNode = null; 

/**
 *�ı�Ӷ����������������
 */
function alterSelect(){
	if(document.all("storeValue").value==selectedTreeNode) return ;
	selectedTreeNode = document.all("storeValue").value;
	var paramters = "storeValue="+selectedTreeNode;
	//paramters = paramters + "&yanlm=]H<(=%6%S3T4";
	//alert(paramters);
	var result = executeRequest("demoPartRefresh","demo",paramters);
	var obj = document.all("select");
	obj.outerHTML = obj.outerHTML.substring(0,obj.outerHTML.indexOf(">")+1) + result +"</select>";
}

//ѡ���ڲ����ڵ㣨 ����ɫ��ѯ ��
var requestid = null;

/**
 *�ı�Ӷ��ڲ�������������
 */
function alterInnerTree(){
    if(requestid==document.all("initiative").value) return;
    requestid = document.all("initiative").value;
    if(!requestid||requestid=="") return;
     //treeDataAction.do
    document.frames("drivenframe").location.href = APP_PATH+"/demoRequestInnerTreeData.do?method=drivenTree&requestid="+requestid;
}
 
//��ʼ��Ĭ���ܹ������Ĳ�ѯ��ʽ 
var querySelected = "account";

/**
 *������div��̬��ʾ
 */
function construtStr(){
	
	var testStr="<table id=\"tempTable\">";
		testStr= testStr+"<tr bgColor=\"#e6e6e6\" onclick=\"changeBKColor(this)\" >";
		testStr= testStr+"<td><font>line1:column1</font></td>";
		testStr= testStr+"<td>line1:column2</td>";
		testStr= testStr+"</tr>";
		testStr= testStr+"<tr bgColor =\"#e6e6e6\" onclick=\"changeBKColor(this)\" >";
		testStr= testStr+"<td>line2:column1</td>";
		testStr= testStr+"<td>line2:column2</td>";
		testStr= testStr+"</tr>";
		testStr= testStr+"<tr bgColor =\"#e6e6e6\" onclick=\"changeBKColor(this)\" >";
		testStr= testStr+"<td>line3:column1</td>";
		testStr= testStr+"<td>line3:column2</td>";
		testStr= testStr+"</tr>";
        testStr= testStr+"</table>";
	return testStr;
}

/**
  *�ı��ѯ��ʽ
  *@obj ���������
  */
function alertQueryPattern(obj){
	
	if(obj.value == "") {
		document.getElementById("tempTable").innerHTML = "";
		document.getElementById("tempTable").style.display = "none";
		return;
	}
	
    if(obj.value == "test"){
    	var str = construtStr();
    	document.getElementById("tempTable").innerHTML = str;
    	document.getElementById("tempTable").style.display = "";
    	return;
    }else{
        document.getElementById("tempTable").innerHTML = "";
        document.getElementById("tempTable").style.display = "none";
    }
    
    try{
    	document.all(querySelected).style.display = "none";
    	querySelected = obj.value;
    	document.all(querySelected).style.display = "";
    	document.all("queryType").value = querySelected;
    }catch(e){
    	alert(e);
    }
}

/**
  *��ʼ��������ܹ������Ĳ�ѯ����
  */
function init(){
	document.all("query").value = querySelected;
    document.all(querySelected).style.display = "";
    eapObjsMgr.onReady();
}

/**
  *��ѯ
  */
function queryq(){
    EAPForm.action = "demoExtremeTable.do?method=catchManager";
	document.forms[0].target = "grid";	    	
	document.forms[0].submit();
}

/**
 * ���˻���ѯʱ���˻�ֵ�ǿ�ȷ��
 */
function checkValue(){
	
    parent.myFrame.rows = "120,*,0";
    
	if(querySelected == 'account'){
		var account = document.all("zhanghu").value;
		if(account == ''){
    		alert('�˻�Ϊ������������˻���Ϣ!');
    		return;
		}
	}
	
	var parentDoc = window.parent.document;
	var queryType = document.all("queryType").value;
	
	document.EAPForm.action = "demoExtremeTable.do?method=query";
	document.forms[0].target = "grid";	    	
	document.forms[0].submit();
}

/**
 * ���˻���ѯʱ���˻�ֵ�ǿ�ȷ��
 */
function checkAllValue(){
	
    parent.myFrame.rows = "120,0,*";
    
	if(querySelected == 'account'){
		var account = document.all("zhanghu").value;
		if(account == ''){
    		alert('�˻�Ϊ������������˻���Ϣ!');
    		return;
		}
	}
	
	var parentDoc = window.parent.document;
	var queryType = document.all("queryType").value;
	
	document.EAPForm.action = "demoExtremeTable.do?method=queryAll";
	document.forms[0].target="end";	    	
	document.forms[0].submit();
}

/**
 *  ����
 */
function addUser(){
	var result = openModalDialog('demoExtremeTable','add','linkData=','820px','600px');
	callback();
}

/**
 *
 */
function openErrorPage(){
    //alert("openpage");
	var result = openModalDialog('demoErrorAction','init','linkData=','410px','300px');
}

/**
 *
 */
function callback(){
    if(parent.grid.ajax)	    
	parent.grid.ajax.submit('ec');
}

/**
 *
 */
var myobj = document.all.item; 

function changeBKColor(obj){
	myobj.bgColor ="#e6e6e6";
	if(obj.bgColor=="#e6e6e6")
		obj.bgColor="#a6a6a6";
	myobj = obj;
}