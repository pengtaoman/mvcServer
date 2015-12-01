<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="/WEB-INF/taglib/struts-html.tld" prefix="html"%>
<%@ taglib uri="/WEB-INF/taglib/struts-logic.tld" prefix="logic"%>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean"%>
<%@ taglib uri="/WEB-INF/taglib/uniflow.tld" prefix="uniflow"%>
<%@ page import="com.neusoft.uniflow.web.util.WorkflowManager"%>
<%
	String conditionValue=java.net.URLDecoder.decode(request.getParameter("conditionValue"), "utf-8");
	if(conditionValue==null)
		conditionValue="";
%>
<html>
	<title>条件设置</title>
	<LINK
		href="<%=WorkflowManager.getWorkflowPath()%>/stylesheet/Style.css"
		rel=stylesheet>
	<script language="javascript"
		src="<%=WorkflowManager.getWorkflowPath()%>/webdesign/ext-1.1.1/adapter/ext/Ext.js"></script>
	<script language="javascript"
		src="<%=WorkflowManager.getWorkflowPath()%>/webdesign/ext-1.1.1/adapter/ext/ext-base.js"></script>
	<link rel="stylesheet"
		href="<%=WorkflowManager.getWorkflowPath()%>/webdesign/ext-1.1.1/resources/css/ext-all.css"
		type="text/css"></link>
	<link rel="stylesheet"
		href="<%=WorkflowManager.getWorkflowPath()%>/webdesign/ext-1.1.1/resources/css/dependency.css"
		type="text/css"></link>
	<link rel="stylesheet"
		href="<%=WorkflowManager.getWorkflowPath()%>/webdesign/css/org_dependency.css"
		type="text/css"></link>
	<script language="javascript"
		src="<%=WorkflowManager.getWorkflowPath()%>/webdesign/ext-1.1.1/ext-all-debug.js"></script>
	<script type="text/javascript">
		var conditionType = '<%=request.getParameter("conditionType")%>'
		Ext.onReady(function(){
			var WEB_APP_NAME = '<%=request.getContextPath()%>'
			Ext.BLANK_IMAGE_URL = WEB_APP_NAME+'/unieap/pages/workflow/webdesign/ext-1.1.1/resources/images/shared/s.gif';
			Ext.QuickTips.init(); 
			var xt = Ext.tree;
			var extLoader=new xt.TreeLoader({dataUrl:WEB_APP_NAME+'/transition.do?',
		       							   baseParams:{'nodeType':'root','id':'root','varTree':window.opener.document.getElementById('transitionVariables').value}})
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
			leftTreePanel.on("click", function(node){
				if(node.attributes.id!='rightSource1'){
					setValue(node.attributes.text);
				}
			})
		
		});  
		function setValue(myValue){ 
			var conditionStrs = document.getElementsByName('conditionValue');
			var myField=conditionStrs[0];
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
		function trim(str){ 
	 		return str.replace(/\s/g, "");    
		} 
		
		var conn = new Ext.data.Connection();
		function checkForm(){
			var conditionStrs = document.getElementsByName('conditionValue');
			var conditionStr=conditionStrs[0];
			if(trim(conditionStr.value)!=""){
				var num="1";
				var expression=conditionStr.value;
				if(!checkSemicolon(expression)){
					return;
				}
				conn.request({
		            url: '<%=request.getContextPath()%>/toTransitionValidate.do',
		            method: 'post',
		            params: {"expression":expression,"xmlStr": window.opener.document.forms[0].xmlStr.value,"variableString":window.opener.document.getElementById('transitionVariables').value},
		            headers :{'ajax':'true'},
		            callback: checkForm_callback
		          });	
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
		
		function checkCon(){
			var conditionStrs = document.getElementsByName('conditionValue');
			var conditionStr=conditionStrs[0];
			if(trim(conditionStr.value)!=""){
				var expression=conditionStr.value;
				if(!checkSemicolon(expression)){
					return;
				}
				conn.request({
		            url: '<%=request.getContextPath()%>/toTransitionValidate.do',
		            method: 'post',
		            params: {"expression":expression,"xmlStr": window.opener.document.forms[0].xmlStr.value,"variableString":window.opener.document.getElementById('transitionVariables').value},
		            headers :{'ajax':'true'},
		            callback: checkContion
		          });
		      }else{
		      	setParentValue();	
		      }
		}
		function  checkContion(options, success, response) {
			if(response.responseText=="1"){
				setParentValue();
			}else{
				if(response.responseText=="2"){
					alert("表达式必须为布尔型");
				}else{
					alert("语法错误");
				}
			}
		};
		
		function setParentValue() {
			var conditionStrs = document.getElementsByName('conditionValue');
			var conditionStr=conditionStrs[0];
			var conditionValue = conditionStr.value;
			if(conditionType == "preCondition"){
				window.opener.document.forms[0].preCondition.value = conditionValue;
			}else if(conditionType == "postCondition"){
				window.opener.document.forms[0].postCondition.value = conditionValue;
			}
			window.opener = null;
			window.close();
		}  
	</script>
	<body>
		<div class="main_label_outline" style="width: 520px">
			<table style="width: 500px" class="main_label_table">
				<tr>
					<td align="left" valign="top" style="width: 90px">
						条件表达式:
					</td>
					<td style="width: 400px">
						<input style="font-size:12px;color:#a5a5a5;" type="text" readonly="true" size="73" value="日期格式按照“yyyy-MM-dd HH24:mm:ss”输入，表达式以分号结束。">
					</td>
				</tr>
				<tr>
					<td align="left" valign="top" style="width: 90px">
					</td>
					<td>
						<html:textarea property="conditionValue"
							value="<%=conditionValue%>"
							style="width:398px" rows="5" />
					</td>
					<td valign="bottom"></td>
				</tr>
			</table>
			<table class="main_label_table">

				<tr>
					<td align="left" style="width: 90px" valign="top">
						表达式设置:
					</td>
					<td style="valign: top">
						<div
							style="height: 115px; width: 150px; overflow: auto; border-style: solid; border-width: 1pt; border-color: #9ab5cc">
							<div id="leftTreePanel"></div>
						</div>
					</td>
					<td width="10" />
					<td valign="top">
						<table style="width: 150px" class="main_label_table">
							<tr>
								<td>
									<input id="btn1" value="+" type='button' class="btn_small"
										onclick="setValue(' + ')">
								</td>
								<td>
									<input id="btn2" value="-" type='button' class="btn_small"
										onclick="setValue(' - ')">
								</td>
								<td>
									<input id="btn3" value="*" type='button' class="btn_small"
										onclick="setValue(' * ')">
								</td>
								<td>
									<input id="btn4" value="/" type='button' class="btn_small"
										onclick="setValue(' / ')">
								</td>
								<td>
									<input id="btn5" value='&lt;' type='button' class="btn_small"
										onclick="setValue(' < ')">
								</td>
								<td>
									<input id="btn6" value=">" type='button' class="btn_small"
										onclick="setValue(' > ')">
								</td>
							</tr>
							<tr>
								<td>
									<input id="btn7" value="<=" type='button' class="btn_small"
										onclick="setValue(' <= ')">
								</td>
								<td>
									<input id="btn8" value=">=" type='button' class="btn_small"
										onclick="setValue(' >= ')">
								</td>
								<td>
									<input id="btn9" value="=" type='button' class="btn_small"
										onclick="setValue(' = ')">
								</td>
								<td>
									<input id="btn10" value="!=" type='button' class="btn_small"
										onclick="setValue(' != ')">
								</td>
								<td>
									<input id="btn11" value='(' type='button' class="btn_small"
										onclick="setValue('(')">
								</td>
								<td>
									<input id="btn12" value=")" type='button' class="btn_small"
										onclick="setValue(')')">
								</td>
							</tr>
							<tr>
								<td>
									<input id="btn14" value="and" type='button' class="btn_small"
										onclick="setValue(' and ')">
								</td>
								<td>
									<input id="btn15" value="or" type='button' class="btn_small"
										onclick="setValue(' or ')">
								</td>
								<td>
									<input id="btn13" value="not" type='button' class="btn_small"
										onclick="setValue('not ()')">
								</td>
								<td>
									<input id="btn16" value="in" type='button' class="btn_small"
										onclick="setValue(' in ()')">
								</td>
								<td colspan='2'>
									<input id="btn17" value='include' type='button'
										class="btn_normal" onclick='setValue(" include \"args\"")'>
								</td>
							</tr>
							<tr>
								<td colspan='2'>
									<input id="btn18" value="like" type='button' class="btn_normal"
										onclick='setValue(" like \"*args*\"")'>
								</td>
								<td colspan='2'>
									<input id="btn19" value="subStr" type='button'
										class="btn_normal"
										onclick='setValue("substr(\"args\", beginIndex, endIndex)")'>
								</td>
								<td colspan='2'>
									<input id="btn20" value="tonumber" type='button'
										class="btn_normal" onclick='setValue("tonumber(\"args\")")'>
								</td>
							</tr>
							<tr>
								<td colspan='6'>
									<input id="btn19" value="校验" type='button' class="btn_large"
										onclick='checkForm()'>
								</td>
							</tr>
						</table>
					</td>
				</tr>
			</table>
		</div>
		<table style="width: 500px" class="main_button">
			<tr>
				<td style="width: 500px" align="right">
					<input type="button" id="sub"
						value='<bean:message bundle="uniflow" key="workflow.webdesign.submit"/>'
						onclick="checkCon()" class="button_normal" />
					<input type="button"
						value='<bean:message bundle="uniflow" key="workflow.webdesign.cancel"/>'
						class="button_normal" onclick="window.close()" />
				</td>
			</tr>
		</table>
	</body>
</html>
