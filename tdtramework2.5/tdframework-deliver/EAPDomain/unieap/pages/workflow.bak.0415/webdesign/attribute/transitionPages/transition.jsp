<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="/WEB-INF/taglib/struts-html.tld" prefix="html"%>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean"%>
<%@ taglib uri="/WEB-INF/taglib/struts-logic.tld" prefix="logic"%>
<%@ taglib uri="/WEB-INF/taglib/uniflow.tld" prefix="uniflow"%>
<%@ page import="com.neusoft.uniflow.web.util.WorkflowManager"%>

<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
String xmlStr = ((String)request.getAttribute("xmlStr"));
String id = ((String)request.getAttribute("id"));
String closeflag = ((String)request.getAttribute("close_flag"));
String name = ((String)((TransitionForm)request.getAttribute("TransitionForm")).getName());
%>


<%@page import="com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.transitionForms.TransitionForm;"%>
<html:html locale="true">
<head>
    <title>属性页</title>	
    <script type="text/javascript" src="<%=WorkflowManager.getWorkflowPath()%>/js/OpenWin.js"></script>
    <LINK href="<%=WorkflowManager.getWorkflowPath()%>/stylesheet/Style.css" rel=stylesheet>
     <script type="text/javascript" src="<%=WorkflowManager.getWorkflowPath()%>/webdesign/js/transition.js"></script>
   <script language="javascript"
	src="<%=WorkflowManager.getWorkflowPath()%>/webdesign/ext-1.1.1/adapter/ext/Ext.js"></script>
<script language="javascript"
	src="<%=WorkflowManager.getWorkflowPath()%>/webdesign/ext-1.1.1/adapter/ext/ext-base.js"></script>
<link rel="stylesheet"
	href="<%=WorkflowManager.getWorkflowPath()%>/webdesign/ext-1.1.1/resources/css/ext-all.css"
	type="text/css"></link>
<script language="javascript"
	src="<%=WorkflowManager.getWorkflowPath()%>/webdesign/ext-1.1.1/ext-all-debug.js"></script>

<link rel="stylesheet"
	href="<%=WorkflowManager.getWorkflowPath()%>/webdesign/ext-1.1.1/resources/css/dependency.css"
	type="text/css"></link>
<link rel="stylesheet"
	href="<%=WorkflowManager.getWorkflowPath()%>/webdesign/css/org_dependency.css"
	type="text/css"></link>
<LINK href="<%=WorkflowManager.getWorkflowPath()%>/stylesheet/Style.css"
	rel=stylesheet>
<style type="text/css">
	.btn_small {
		cursor: hand;
		border-color:  #000000;
		border-style: none;
		background-image: url(<%=WorkflowManager.getWorkflowPath()%>/webdesign/images/btn_small.gif);
		background-repeat: no-repeat;
		height: 21px;
		width: 36px;
		font-family: Verdana, Arial, "宋体";
		font-size: 12px;
		color: #000000;
		padding-top: 2px;
		padding-left: 1px;
	}
	.btn_normal {
		cursor: hand;
		border-color:  #000000;
		border-style: none;
		background-image: url(<%=WorkflowManager.getWorkflowPath()%>/webdesign/images/btn_normal.gif);
		background-repeat: no-repeat;
		height: 21px;
		width: 76px;
		font-family: Verdana, Arial, "宋体";
		font-size: 12px;
		color: #000000;
		padding-top: 2px;
		padding-left: 1px;
	}
	.btn_large {
		cursor: hand;
		border-color:  #000000;
		border-style: none;
		background-image: url(<%=WorkflowManager.getWorkflowPath()%>/webdesign/images/btn_large.gif);
		background-repeat: no-repeat;
		height: 21px;
		width: 232px;
		font-family: Verdana, Arial, "宋体";
		font-size: 12px;
		color: #000000;
		padding-top: 2px;
		padding-left: 1px;
	}
</style>	
	
	
	<script>
var appName;
var leftTreeRootNode2;
var rightTreeRootNode2;
var copyText;
var bottomRootNode; 
var bottomRootNode1;
var condition;
Ext.onReady(function(){
	var WEB_APP_NAME = '<%=request.getContextPath()%>'
	Ext.BLANK_IMAGE_URL = WEB_APP_NAME+'/unieap/pages/workflow/webdesign/ext-1.1.1/resources/images/shared/s.gif';
	Ext.QuickTips.init(); 
	var xt = Ext.tree;
	var extLoader=new xt.TreeLoader({dataUrl:WEB_APP_NAME+'/transition.do?',
       							   baseParams:{'nodeType':'root','id':'root','varTree':'<%=request.getAttribute("transitionVariables")%>'}})
    extLoader.requestData =function(node, callback){
		 if(this.fireEvent("beforeload", this, node, callback) !== false){
            this.transId = Ext.Ajax.request({
                method:'post',
                url: this.dataUrl||this.url,
                success: this.handleResponse,
                failure: this.handleFailure,
                scope: this,
                headers :{'ajax':'true'},
                argument: {callback: callback, node: node},
                params: this.getParams(node)
            });
        }else{
            // if the load is cancelled, make sure we notify
            // the node that we are done
            if(typeof callback == "function"){
                callback();
            }
        }
		
	};
//*********************左边********************************************
	var leftTreePanel = new xt.TreePanel('leftTreePanel', {
		animate:false,
       // enableDD:true,
        containerScroll: true,
        autoScroll:true,
   
        loader: extLoader,
		rootVisible: false
    });
	
    var leftTreeRootNode = new xt.AsyncTreeNode({
        text: '根节点',
        draggable:false,
        iconCls:'lunit',               
        id:'leftSource'
    });
      var leftTreeRootNode1 = new xt.AsyncTreeNode({
        text: '变量',
        draggable:false,
        iconCls:'variable',               
        id:'rightSource1'
    });
   
    leftTreePanel.setRootNode(leftTreeRootNode);
    leftTreePanel.render();
    leftTreeRootNode.expand();
    leftTreeRootNode.appendChild(leftTreeRootNode1);
       leftTreePanel.loader.on("beforeload", function(treeLoader, node) {   	
	    	var nodeType = node.attributes.nodeType 
	        treeLoader.baseParams.nodeType = nodeType;
	        treeLoader.baseParams.id = node.attributes.id;
	    });
    leftTreePanel.expandAll();
//*************************右边的树****************************************
	
//*******************左边数复制***************	
	leftTreePanel.on("click", function(node){
		if(node.attributes.id!='rightSource1'){
			setValue(node.attributes.text);
		}
	})
//************************右边数复制**************************	
	

});
var validateFlag="";	
var conn = new Ext.data.Connection();
function ajaxCommit(num,expression){
		conn.request({
            url: '<%=request.getContextPath()%>/toTransitionValidate.do',
            method: 'post',
            params: {'id':'<%= request.getAttribute("procId")%>',"ValidateType":num,"expression":expression,"xmlStr": document.transitionForm.xmlStr.value},
            headers :{'ajax':'true'},
            callback: callback
          });
          }
function  callback(options, success, response) {
	if(document.getElementById("num").value=="0"){
		if( response.responseText=="1" ){
			leftTreeRootNode2.appendChild(bottomRootNode);
    		rightTreeRootNode2.appendChild(bottomRootNode1);
    	}else{
    	if(response.responseText=="2"){
			alert("表达式必须为布尔型");
		}else{
			alert("语法错误");
		}
    	}
	}else{
		if( response.responseText=="1" ){
			document.transitionForm.expression.value=condition;
		}else{
		if(response.responseText=="2"){
			alert("表达式必须为布尔型");
		}else{
			alert("语法错误");
		}
		}
	}
}

function add(num){
	document.getElementById("num").value=num;
	var flag=getFlag('flagSelect');
	var con="("+document.getElementById("leftText").value+flag+document.getElementById("rightText").value+")";
	    bottomRootNode = new Ext.tree.TreeNode({
        text: con,
        iconCls:'bsubexpressions'          
    });
    	bottomRootNode1 = new Ext.tree.TreeNode({
        text: con,
        iconCls:'bsubexpressions'          
    });
    ajaxCommit(num,con);
		
    	
    
}
function checkCon(){
	if(trim(document.transitionForm.expression.value)!=""){
		var num="1";
		var expression=document.transitionForm.expression.value;
		if(!checkSemicolon(expression)){
			return;
		}
		conn.request({
            url: '<%=request.getContextPath()%>/toTransitionValidate.do',
            method: 'post',
            params: {'id':'<%= request.getAttribute("procId")%>',"ValidateType":num,"expression":expression,"xmlStr": document.transitionForm.xmlStr.value},
            headers :{'ajax':'true'},
            callback: checkContion
          });
      }else{
      	submit_onclick()	
      }
}
function  checkContion(options, success, response) {
	if(response.responseText=="1"){
		submit_onclick();
	}else{
		if(response.responseText=="2"){
			alert("表达式必须为布尔型");
		}else{
			alert("语法错误");
		}
	}
};
function checkForm(){
	if(trim(document.transitionForm.expression.value)!=""){
		var num="1";
		var expression=document.transitionForm.expression.value;
		if(!checkSemicolon(expression)){
			return;
		}
		conn.request({
            url: '<%=request.getContextPath()%>/toTransitionValidate.do',
            method: 'post',
            params: {'id':'<%= request.getAttribute("procId")%>',"ValidateType":num,"expression":expression,"xmlStr": document.transitionForm.xmlStr.value},
            headers :{'ajax':'true'},
            callback: checkForm_callback
          });	
	}
}
function checkForm_callback(options, success, response){
	if(response.responseText=="1"){
		alert("语法正确");
	}else{
		if(response.responseText=="2"){
			alert("表达式必须为布尔型");
		}else{
			alert("语法错误");
		}
	}
}
function checkSemicolon(expression){
	if(";"!=expression.substring(expression.length-1, expression.length)){
		alert("表达式应以分号结束");
		return false ;
	}
	var semicolonCount = expression.length - (expression.replace(new RegExp(";","g"),"")).length//计算表达式中的分号数。
	if(1<semicolonCount){
		alert("表达式中存在多个结束符");
		return false;
	}
	return true;
}
function commitValue(){
	var name='<%=request.getParameter("applicationPageName")%>'
	switch(name){
		case "openAutoNodeApplication":window.opener.document.autoNodeForm.application.value = appName;break;
		case "openDelayApplication": window.opener.document.getElementById("delayApplication").value = appName;break;
		case "openAlertApplication": window.opener.document.getElementById("alertApplication").value = appName;break;
		default: window.opener.document.manualNodeForm.application.value = appName;
	}
	window.close();
}
function getFlag(id){
	var obj=document.getElementById(id);
	for(i=0;i<obj.length;i++){
		if(obj[i].selected==true){
			optionText=obj[i].text;
			return optionText;
		}
	}
}
function addCondition(num){
	document.getElementById("num").value=num;
	var flag=getFlag('flagSelect');
	    condition=document.getElementById("leftText").value+flag+document.getElementById("rightText").value+";";
	ajaxCommit(num,condition);
}
</script>
	
    <script type="text/javascript">
    function LoadName(){ 
    if(document.all){
    	}else{
    		self.resizeTo(620,600); 
    	}
       var action = '<%=closeflag%>';
          if(action == "close"){
             var xmlStr = document.transitionForm.xmlStr.value;
             var id = '<%=id%>';
             window.close();
             opener.callFlex(xmlStr , id);
          }
          document.getElementById('path').value = '<%=path%>';
    }
    </script>
    <script>
    	function setValue(myValue){  
			var myField = document.transitionForm.expression
		  	if   (document.selection)   {  
				myField.focus();  
				sel = document.selection.createRange();  
				sel.text = myValue; 
				sel.select(); 
			}else if(myField.selectionStart||myField.selectionStart=="0"){  
				var startPos = myField.selectionStart;  
				var endPos = myField.selectionEnd;  
				myField.value = myField.value.substring(0,   startPos)  
									+   myValue  
		  							+   myField.value.substring(endPos,   myField.value.length);  
			}else{  
		  		myField.value += myValue;  
		  	}  
		}  
    </script>
</head>

<body  onLoad="LoadName()"><br>

<html:form action="toTrans.do" >
<div class="main_label_outline" style="width:570px">
		  	<table style="width:550px" class="main_label_table">
				<tr>
					<td align="left" style="width:90px"><bean:message bundle="uniflow" key="workflow.webdesign.name"/></td>
					<td>
					<html:text property="name" style="width:400px;" styleClass="input_underline"  value='<%=name%>'>
					</html:text>*
					</td>
				</tr>
				<tr>
					<td valign="top"  style="width:90px"><bean:message bundle="uniflow" key="workflow.webdesign.describe"/></td>
					<td><html:textarea property="desc" style="width:400px;" rows="5"  value='<%=((TransitionForm)request.getAttribute("TransitionForm")).getDesc()%>'/></td>
				</tr>
			</table>
			<table style="width:550px" class="main_label_table">	
				<tr>
					<td align="left" style="width:89px">类型:</td>
					<td>
						<input type="radio" name="radioType"  value="0" class="rodio" onclick="usal()" <%=("0").equals(((TransitionForm)request.getAttribute("TransitionForm")).getTransType())?"checked":""%>>普通</input>&nbsp&nbsp&nbsp
						<input type="radio" name="radioType"  value="1" class="rodio" onclick="omit()" <%=("1").equals(((TransitionForm)request.getAttribute("TransitionForm")).getTransType())?"checked":""%>>缺省</input>
					</td>
				</tr>
				<tr>
					<td align="left" style="width:89px">优先级:</td>
					<td>
						<html:text property="priority" style="width:400px;"  disabled="false"  styleClass="input_text"  value='<%=((TransitionForm)request.getAttribute("TransitionForm")).getPriority()%>'>
						</html:text>
					</td>
				</tr>
				<tr>
					<td align="left" valign="top" style="width:89px">条件表达式:</td>
					<td>
						  <html:textarea property="expression" style="width:400px;" rows="5" value='<%=((TransitionForm)request.getAttribute("TransitionForm")).getExpression()%>' />
					</td>
					<td valign="bottom"></td>
				</tr>
				</table>
	<table class="main_label_table">

	<tr >
		<td align="left" style="width: 90px" valign="top">表达式设置:</td>
		<td style="valign:top" >
			<div style="height:115px; width:150px; overflow:auto;border-style:solid;border-width:1pt; border-color:#9ab5cc">
				<div id="leftTreePanel" ></div>
			</div>
		</td>
		<td valign="top">
			<table style="width:150px" class="main_label_table">
				<tr>
					<td><input id="btn1" value="+" type = 'button' class="btn_small" onclick = "setValue(' + ')"></td>
					<td><input id="btn2" value="-" type = 'button' class="btn_small" onclick = "setValue(' - ')"></td>
					<td><input id="btn3" value="*" type = 'button' class="btn_small" onclick = "setValue(' * ')"></td>
					<td><input id="btn4" value="/" type = 'button' class="btn_small" onclick = "setValue(' / ')"></td>
					<td><input id="btn5" value='<' type = 'button' class="btn_small" onclick = "setValue(' < ')"></td>
					<td><input id="btn6" value=">" type = 'button' class="btn_small" onclick = "setValue(' > ')"></td>
				</tr>
				<tr>
					<td><input id="btn7" value="<=" type = 'button' class="btn_small" onclick = "setValue(' <= ')"></td>
					<td><input id="btn8" value=">=" type = 'button' class="btn_small" onclick = "setValue(' >= ')"></td>
					<td><input id="btn9" value="=" type = 'button' class="btn_small" onclick = "setValue(' = ')"></td>
					<td><input id="btn10" value="!=" type = 'button' class="btn_small" onclick = "setValue(' != ')"></td>
					<td><input id="btn11" value='(' type = 'button' class="btn_small" onclick = "setValue('(')"></td>
					<td><input id="btn12" value=")" type = 'button' class="btn_small" onclick = "setValue(')')"></td>
				</tr>
				<tr>
					<td><input id="btn14" value="and" type = 'button' class="btn_small" onclick = "setValue(' and ')"></td>
					<td><input id="btn15" value="or" type = 'button' class="btn_small" onclick = "setValue(' or ')"></td>
					<td><input id="btn13" value="not" type = 'button' class="btn_small" onclick = "setValue('not ()')"></td>
					<td><input id="btn16" value="in" type = 'button' class="btn_small" onclick = "setValue(' in ()')"></td>
					<td colspan='2'><input id="btn17" value='include' type = 'button' class="btn_normal" onclick = 'setValue(" include \"args\"")'></td>
				</tr>
				<tr>
					<td colspan='2'><input id="btn18" value="like" type = 'button' class="btn_normal" onclick = 'setValue(" like \"*args*\"")'></td>
					<td colspan='2'><input id="btn19" value="subStr" type = 'button' class="btn_normal" onclick = 'setValue("substr(\"args\", beginIndex, endIndex)")'></td>
					<td colspan='2'><input id="btn20" value="tonumber" type = 'button' class="btn_normal" onclick = 'setValue("tonumber(\"args\")")'></td>
				</tr>
				<tr>
					<td colspan='6'><input id="btn19" value="校验" type = 'button' class="btn_large"  onclick = 'checkForm()' ></td>
				</tr>
			</table>
		</td>
	</tr>
</table>

</div>
	<html:hidden property="transType"  value='<%=((TransitionForm)request.getAttribute("TransitionForm")).getTransType()%>'/>
		<table style="width:570px" class="main_button">
			<tr>
				<td style="width:570px" align="right"><input type="button" id="sub" value='<bean:message bundle="uniflow" key="workflow.webdesign.submit"/>' onclick="checkCon()" class="button_normal"/>
				<input type="button" value='<bean:message bundle="uniflow" key="workflow.webdesign.cancel"/>' class="button_normal" onclick="window.close()"/></td>
			</tr>
		</table>

<input type = "hidden" id="path" />
  <input type="hidden" id="num" value=""/>	
  <html:hidden property="id" value='<%=id %>'/>
  <html:hidden property="xmlStr"  value='<%=xmlStr %>'/>
  </html:form>
  </body>
</html:html>