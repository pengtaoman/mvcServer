<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="/WEB-INF/taglib/struts-html.tld" prefix="html"%>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean"%>
<%@ taglib uri="/WEB-INF/taglib/struts-logic.tld" prefix="logic"%>
<%@ taglib uri="/WEB-INF/taglib/uniflow.tld" prefix="uniflow"%>
<%@ page import="com.neusoft.uniflow.web.util.WorkflowManager"%>
<%@ page
	import="com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.subProcNodeForms.SubProcNodeForm"%>
<%@page import="com.neusoft.workflow.model.Data"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
	String xmlStr = ((String) request.getAttribute("xmlStr"));
	String id = ((String) request.getAttribute("id"));
%>
<html:html locale="true">
<head>
	<title>属性页</title>
	<link rel="stylesheet"
		href="<%=WorkflowManager.getWorkflowPath()%>/webdesign/ext-1.1.1/resources/css/ext-all.css"
		type="text/css"></link>
	<script type="text/javascript"
		src="<%=WorkflowManager.getWorkflowPath()%>/js/OpenWin.js"></script>
	<script language="javascript"
		src="<%=WorkflowManager.getWorkflowPath()%>/webdesign/ext-1.1.1/adapter/ext/Ext.js"></script>
	<script language="javascript"
		src="<%=WorkflowManager.getWorkflowPath()%>/webdesign/ext-1.1.1/adapter/ext/ext-base.js"></script>
	<script language="javascript"
		src="<%=WorkflowManager.getWorkflowPath()%>/webdesign/ext-1.1.1/ext-all-debug.js"></script>
	<script type="text/javascript"
		src="<%=WorkflowManager.getWorkflowPath()%>/webdesign/js/subprocNode.js"></script>
	<script type="text/javascript"
		src="<%=WorkflowManager.getWorkflowPath()%>/webdesign/js/subprocGrid.js"></script>
	<script type="text/javascript"
		src="<%=WorkflowManager.getWorkflowPath()%>/webdesign/js/Combo.js"></script>
	<script type="text/javascript"
		src="<%=WorkflowManager.getWorkflowPath()%>/webdesign/js/conditions.js"></script>
	<script type="text/javascript"
		src="<%=WorkflowManager.getWorkflowPath()%>/webdesign/js/EditorGrid.js"></script>
	<LINK
		href="<%=WorkflowManager.getWorkflowPath()%>/stylesheet/Style.css"
		rel=stylesheet>
	<script type="text/javascript">

    	function LoadName(){
			if(document.all){
    			self.resizeTo(660,700);
  			}else{
    			self.resizeTo(660,700);
  			} 
         	var action = '<%=request.getAttribute("close_flag")%>';
          	if(action == "close"){
			   var xmlStr = document.subprocNodeForm.xmlStr.value;
			   var id = '<%=request.getAttribute("id")%>';
			   var templateNodeType = '<%=request.getAttribute("templateNodeType") == null ? ""
								: request.getAttribute("templateNodeType")%>'
			   window.close();
			   if(templateNodeType != '')
			   { 
				  //把jsp的编辑信息，回写到flex树上
				  opener.callFlexTree(xmlStr,id ,'',templateNodeType);
			   }
			   else
			   {
					opener.callFlex(xmlStr , id);
			   }	   
			  
          	}else{
          	var obj=document.getElementsByName("coupleType");     	
      		if(obj[0].checked==false&&obj[1].checked==false)
      			obj[0].checked=true;
          }   
    	}

    var ds; 
    var combo=new Ext.form.ComboBox({
        typeAhead: true,
        triggerAction: 'all',
              // transform:'Change',
        lazyRender:true,
        valueField :"id",
	 	displayField: "text",
	  	store:new Ext.data.SimpleStore({
  		   	fields: ["id", "text"],
  		   	data: []}),
	       	mode: 'local'
            });
	var parentCombo=new Ext.form.ComboBox({
        typeAhead: true,
        triggerAction: 'all',
           // transform:'Change',
        lazyRender:true,
        valueField :"id",
	 	displayField: "text",
	  	store:new Ext.data.SimpleStore({
  		   	fields: ["id", "text"],
  		   	data: []}),
	  	    mode: 'local'
            });       
	var mappCombo=new Ext.form.ComboBox({
        typeAhead: true,
        triggerAction: 'all',
           // transform:'Change',
        lazyRender:true,
        valueField :"id",
	 	displayField: "text",
	  	store:new Ext.data.SimpleStore({
  		   	fields: ["id", "text"],
  		   	data: []}),
	  	    mode: 'local'
            });  
           var parentData=[]; 
	 parentData.push(<%=request.getAttribute("parentData")%>);
	 parentCombo.store.loadData(parentData);
	
	function tranType0(){
		var mappData=[];
			mappData.push(["0","入参"]);
			mappData.push(["1","出参"]);
			mappData.push(["2","入参/出参"]);
			mappCombo.store.loadData(mappData);
	}
	function tranType1(){
		var mappData=[];
			mappData.push(["0","入参"]);
			mappCombo.store.loadData(mappData);
			for(k=0;k<ds.getCount();k++){
				ds.getAt(k).set("mappName","入参");
				ds.getAt(k).set("mappId","0")
			}
	}
	var conn = new Ext.data.Connection();
		conn.request({
            url: '<%=request.getContextPath()%>/toSubGrid.do',
            method: 'post',
            params: {'id':'<%=((SubProcNodeForm) request
								.getAttribute("SubProcNodeForm")).getSubproc()%>'},
            headers :{'ajax':'true'},
            callback: callback
          });
	function getSubName(id){
		var con = new Ext.data.Connection();
		con.request({
            url: '<%=request.getContextPath()%>/toSubGrid.do',
            method: 'post',
            params: {'id':id},
            headers :{'ajax':'true'},
            callback: callback
          });
          if(document.subprocNodeForm.subproc.value!=id){
          	ds.removeAll();
          }
	}
      function  callback(options, success, response) {
          if(success){
			var data=[];
            var jsonObj = Ext.util.JSON.decode(response.responseText);
				for(i=0;i<jsonObj.length;i++){
				data.push([jsonObj[i].id,jsonObj[i].name]);
			}
          }
           combo.store.loadData(data);  
        }
	Ext.BLANK_IMAGE_URL = '<%=WorkflowManager.getWorkflowPath()%>/webdesign/ext-1.1.1/resources/images/default/s.gif';
var Example = {
    init : function(){
        var myData;
        myData =<%=request.getAttribute("JsonData")%>;
		var Plant = Ext.data.Record.create([
      ]);
         ds = new Ext.data.Store({
		        proxy: new Ext.data.MemoryProxy(myData),
		        reader: new Ext.data.ArrayReader({}, [
                      {name: 'parentName'}, {name: 'subName'},{name: 'mappName'}, {name: 'parentId'}, {name: 'subId'}, {name: 'mappId'}
                  ])
        });
         tranType1();
    	if('<%=((SubProcNodeForm) request
								.getAttribute("SubProcNodeForm"))
								.getInvokeType()%>'=="0"){
   			tranType0();
    	}
        ds.load();
        var fm = Ext.form, Ed = Ext.grid.GridEditor;
        var colModel = new Ext.grid.ColumnModel([
       {
           header: "流程变量",
           dataIndex: 'parentName',
           sortable: true,
           width: 187,
           editor: new Ed(parentCombo)
        },
       {
           header: "子流程变量",
           dataIndex: 'subName',
           sortable: true,
           width: 187,
           editor: new Ed(combo)
        },
        {
           header: "映射类型",
           dataIndex: 'mappName',
           sortable: true,
           width: 187,
           editor: new Ed(mappCombo)
        }]);
        var grid = new Ext.grid.EditorGrid('grid-example', {
            ds: ds,
            cm: colModel,
            // selModel: new Ext.grid.RowSelectionModel({singleSelect:false}),
               enableColLock:false
        });  
        var layout = Ext.BorderLayout.create({
            center: {
                margins:{left:3,top:3,right:3,bottom:3},
                panels: [new Ext.GridPanel(grid)]
            }
        }, 'grid-panel');
        grid.render();     
      // grid.getSelectionModel().selectFirstRow();      
    var gridHead = grid.getView().getHeaderPanel(true);
    var tb = new Ext.Toolbar(gridHead, [{
        text: '添加',
        handler : function(){
          var p = new Plant({
              parentName: '请选择流程变量',
              subName: '请选择子流程变量',
              mappName:'入参',
              parentId: '0',
              subId: '0',
              mappId:'0'
            });
            grid.stopEditing();
            ds.insert(0, p);
            grid.startEditing(0, 0);
        }
    },{
		text: '删除',
		handler : function(){
		 if(grid.selModel.getSelectedCell()==null) {	
		 }else{
		 	 var record = ds.getAt(grid.selModel.getSelectedCell()[0]);
		      ds.remove(record);
		    }
		}
 	},
 	{
		text: '全部删除',
		handler : function(){
		      ds.removeAll();
		}
 	}]); 
    }  
};
		
	Ext.onReady(Example.init, Example);

	function trim(str) {
		return str.replace(/\s/g, "");
	}

	function submit_onclick(){
		if (trim(document.subprocNodeForm.name.value) == "") {
			document.subprocNodeForm.name.focus();
			alert("名称不可以为空")
			document.subprocNodeForm.name.value = "";
			return false;
		}
	    var parentIdString="";
	    var subIdString="";
	    var mappIdString="";
		for(i=0;i<ds.getCount();i++){
		if(ds.getAt(i).get("subId")=="0"||ds.getAt(i).get("parentId")=="0")
		{	
			alert("请设置流程变量");
			return;
		}
				parentIdString=parentIdString+ds.getAt(i).get("parentId")+";"
				subIdString=subIdString+ds.getAt(i).get("subId")+";";
				mappIdString=mappIdString+ds.getAt(i).get("mappId")+";";
			}
		document.subprocNodeForm.parentVariable.value=parentIdString;
	    document.subprocNodeForm.supprocVariable.value=subIdString;
	    document.subprocNodeForm.mapType.value=mappIdString;
	    document.subprocNodeForm.invokeType.value=radioValue("invokeType");
	   	document.subprocNodeForm.coupleType.value=radioValue("coupleType");
	 
	    document.subprocNodeForm.submit();
	}
</script>
</head>
<select name="xx" id="xxx" style="display: none;">
</select>
<body onLoad="LoadName()">
	<br>
	<html:form action="toSubproc.do">
		<div class="main_label_outline" style="width: 570px">
			<table style="width: 550px" class="main_label_table">
				<tr>
					<td align="left" style="width: 90px">
						ID:
					</td>
					<td>
						<html:text property="id" readonly="true" style="width:400px;"
							styleClass="input_underline"
							value='<%=((SubProcNodeForm) request
										.getAttribute("SubProcNodeForm"))
										.getId()%>'>
						</html:text>
					</td>
				</tr>
				<tr>
					<td align="left" style="width: 90px">
						<bean:message bundle="uniflow" key="workflow.webdesign.name" />
					</td>
					<td>
						<html:textarea property="name" style="width:400px;" rows="2"
							styleClass="input_text"
							value='<%=((SubProcNodeForm) request
										.getAttribute("SubProcNodeForm"))
										.getName()%>'></html:textarea>
										*
					</td>
				</tr>
				<tr>
					<td valign="top" style="width: 90px">
						<bean:message bundle="uniflow" key="workflow.webdesign.describe" />
					</td>
					<td>
						<html:textarea property="desc" style="width:400px;" rows="5"
							styleClass="input_text"
							value='<%=((SubProcNodeForm) request
											.getAttribute("SubProcNodeForm"))
											.getDesc()%>' />
					</td>
				</tr>
			</table>
			<table style="width: 550px" class="main_label_table">
				<tr>
					<td style="width: 90px">
						<bean:message bundle="uniflow"
							key="workflow.webdesign.bizcategory" />
					</td>
					<td>
						<html:text property="category" style="width:400px;"
							value='<%=((SubProcNodeForm) request
									.getAttribute("SubProcNodeForm"))
									.getCategory()%>' />
					</td>
				</tr>
				<tr>
					<td style="width: 90px">
						<bean:message bundle="uniflow"
							key="workflow.webdesign.extendProperty" />
					</td>
					<td>
						<html:text property="extendProperties" style="width:400px;"
							value='<%=((SubProcNodeForm) request
									.getAttribute("SubProcNodeForm"))
									.getExtendProperties()%>' />
					</td>
				</tr>
			</table>
<!--  
			<table style="width: 550px" class="main_label_table">
				<tr>
					<td style="height: 30px; width: 90px">
						生存期:
					</td>
					<td style="">
						<a href="#" onclick="displaySurvival()">详细设置</a>
					</td>
				</tr>
			</table>
-->
			<table style="width: 510px" class="main_label_table">
				<tr>
					<td style="height: 30px; width: 90px">
						前置条件:
					</td>
					<td>
						<html:text style="width: 330px;" readonly="true" property="preCondition"
							value='<%=((SubProcNodeForm) request
									.getAttribute("SubProcNodeForm"))
									.getPreCondition()%>' />
					</td>
					<td style="">
						<a href="#" onclick="displayConditions('preCondition')">设置</a>
					</td>
				</tr>
				<tr>
					<td style="height: 30px; width: 90px">
						后置条件:
					</td>
					<td>
						<html:text style="width: 330px;" readonly="true" property="postCondition"
							value='<%=((SubProcNodeForm) request
									.getAttribute("SubProcNodeForm"))
									.getPostCondition()%>' />
					</td>
					<td style="">
						<a href="#" onclick="displayConditions('postCondition')">设置</a>
					</td>
				</tr>
				<tr>
					<td align="left" style="width: 90px">
						子流程:
					</td>
					<td>
						<html:text readonly="true" property="subprocName" style="width:330px;"
							styleClass="input_text"
							value='<%=((SubProcNodeForm) request
										.getAttribute("SubProcNodeForm"))
										.getProcName()%>'></html:text>
					</td>
					<td>
						<input align="left" type="button" class="button_normal"
							onclick="openApp(event)" value="浏览" />
					<td>
				</tr>
			</table>
			<table class="main_label_table">
				<tr>
					<td valign="top" style="width: 85px">
						调用类型:
					</td>
					<td>
						<input type="radio" onclick="tranType0()" name="invokeType"
							value="0"
							<%="0".equals(((SubProcNodeForm) request
									.getAttribute("SubProcNodeForm"))
									.getInvokeType()) ? "checked" : ""%> />
						同步
					</td>
					<td>
						<input type="radio" onclick="tranType1()" name="invokeType"
							value="1"
							<%="1".equals(((SubProcNodeForm) request
									.getAttribute("SubProcNodeForm"))
									.getInvokeType()) ? "checked" : ""%> />
						异步
					</td>
				</tr>
				<tr>
					<td>
						耦合类型:
					</td>
					<td>
						<input type="radio" name="coupleType" value="0"
							<%="0".equals(((SubProcNodeForm) request
									.getAttribute("SubProcNodeForm"))
									.getCoupleType()) ? "checked" : ""%> />
						松耦合
					</td>
					<td>
						<input type="radio" name="coupleType" value="1"
							<%="1".equals(((SubProcNodeForm) request
									.getAttribute("SubProcNodeForm"))
									.getCoupleType()) ? "checked" : ""%> />
						紧耦合
					</td>
				</tr>
			</table>
		</div>
		<select name="lastChange" id="lastChange" style="display: none;">
		</select>
		<div id="grid-panel" style="width: 573px; height: 200px; margin: 10px">
			<div id="grid-example"></div>
		</div>
		<table>
			<tr>
				<td align="right" style="width: 590px">
					<input type="button" value="提交" class="button_normal"
						onclick="submit_onclick()" />
					<input type="button" value="取消" class="button_normal"
						onclick="window.close()" />
				</td>
			</tr>
		</table>
		<html:hidden property="subproc"
			value='<%=((SubProcNodeForm) request
									.getAttribute("SubProcNodeForm"))
									.getSubproc()%>' />
		<!-- 调用类型 -->
		<html:hidden property="invokeType"
			value='<%=((SubProcNodeForm) request
									.getAttribute("SubProcNodeForm"))
									.getInvokeType()%>' />
		<!-- 耦合类型 -->
		<html:hidden property="coupleType"
			value='<%=((SubProcNodeForm) request
									.getAttribute("SubProcNodeForm"))
									.getCoupleType()%>' />
		<!-- 生存期的时间设置 -->
		<html:hidden property="duration"
			value='<%=((SubProcNodeForm) request
									.getAttribute("SubProcNodeForm"))
									.getDuration()%>' />
		<!-- 预警的时间设置 -->
		<html:hidden property="alertDuration"
			value='<%=((SubProcNodeForm) request
									.getAttribute("SubProcNodeForm"))
									.getAlertDuration()%>' />
		<!-- 生存期判断变量与简单 -->
		<html:hidden property="varOrDur"
			value='<%=((SubProcNodeForm) request
									.getAttribute("SubProcNodeForm"))
									.getVarOrDur()%>' />
		<!-- 催办判断变量与简单 -->
		<html:hidden property="alertVarOrDur"
			value='<%=((SubProcNodeForm) request
									.getAttribute("SubProcNodeForm"))
									.getAlertVarOrDur()%>' />
		<!-- 生存期的处理方式 -->
		<html:hidden property="actionType"
			value='<%=((SubProcNodeForm) request
									.getAttribute("SubProcNodeForm"))
									.getActionType()%>' />
		<!-- 预警的处理方式 -->
		<html:hidden property="alertActionType"
			value='<%=((SubProcNodeForm) request
									.getAttribute("SubProcNodeForm"))
									.getAlertActionType()%>' />
		<!-- 预警的间隔时间 -->
		<html:hidden property="alertActionInterval"
			value='<%=((SubProcNodeForm) request
									.getAttribute("SubProcNodeForm"))
									.getAlertActionInterval()%>' />
		<!--生存期超时的应用程序  -->
		<html:hidden property="actionApplication"
			value='<%=((SubProcNodeForm) request
									.getAttribute("SubProcNodeForm"))
									.getActionApplication()%>' />
		<!--生存期预警的应用程序  -->
		<html:hidden property="alertActionApplication"
			value='<%=((SubProcNodeForm) request
									.getAttribute("SubProcNodeForm"))
									.getAlertActionApplication()%>' />
		<!--生存期变量-->
		<html:hidden property="variable"
			value='<%=((SubProcNodeForm) request
									.getAttribute("SubProcNodeForm"))
									.getVariable()%>' />
		<!--预警变量  -->
		<html:hidden property="alertVariable"
			value='<%=((SubProcNodeForm) request
									.getAttribute("SubProcNodeForm"))
									.getAlertVariable()%>' />
		<html:hidden property="exActionName"
			value='<%=((SubProcNodeForm) request
									.getAttribute("SubProcNodeForm"))
									.getExActionName()%>' />
		<html:hidden property="exAlertActionName"
			value='<%=((SubProcNodeForm) request
									.getAttribute("SubProcNodeForm"))
									.getExAlertActionName()%>' />
		<html:hidden property="parentVariable" value="" />
		<html:hidden property="supprocVariable" value="" />
		<html:hidden property="versionName"
			value='<%=((SubProcNodeForm) request
									.getAttribute("SubProcNodeForm"))
									.getVersionName()%>' />
		<html:hidden property="mapType" value="" />
		<html:hidden property="id" value='<%=id%>' />
		<input type="hidden" id="path" value='<%=path%>' />
		<html:hidden property="xmlStr" value='<%=xmlStr%>' />
		<input type="hidden" id="editCell" value="" />
	</html:form>
	<input type="hidden" id="variableSelect"
		value='<%=request.getAttribute("variableSelect")%>' />
	<input type="hidden" id="transitionVariables" value='<%=request.getAttribute("transitionVariables")%>' />
</body>
</html:html>