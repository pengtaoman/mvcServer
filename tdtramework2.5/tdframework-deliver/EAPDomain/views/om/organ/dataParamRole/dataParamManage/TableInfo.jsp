<%@ page contentType="text/html; charset=gb2312"%>
<%@ taglib uri="/WEB-INF/tld/crm_taglibs.tld" prefix="crm"%>
<%@ taglib uri="/WEB-INF/tld/om.tld" prefix="om"%>
<%@ taglib prefix="unieap" uri="/WEB-INF/taglib/unieap"%>
<%@ taglib uri="http://www.extremecomponents.org" prefix="ec"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core"%>
<%@ page import="java.util.List"%>
<%
	String path = request.getContextPath();
	//做详细信息页面显示时获取标识位
	String flag=(String)request.getAttribute("flag");
	String showNewDataFlag=(String)request.getAttribute("showNewDataFlag");
	String message = (String) request.getAttribute("message") == null ? "" : (String) request.getAttribute("message");
	                
	//显示的数据列的名字
	List nameColls=(List)request.getAttribute("nameColls");
	//页面显示的数据的列数
	int countCols=0;
	//om_param_data_info_t.data_info 的值使 checkbox 不被选中
	String dataInfo=(String)request.getAttribute("dataInfo");
	//显示的数据的列数 + 存在checkbox的值的列数
	String length=(String)request.getAttribute("length");
	int lengthNum=0;
	if(length!=null){
		  lengthNum=Integer.parseInt(length);
	}
	if(nameColls!=null){
		  countCols=nameColls.size();
	}
	//checkbox 的value   
	StringBuffer strBuf=new StringBuffer();
	for (int i=countCols;i<lengthNum;i++){
		  strBuf.append("${infoObjs.column"+(i+1)+"}");
		  if(i<lengthNum-1){
		  		strBuf.append(";");
		  }
	}
	String values=strBuf.toString();
%>
<html>
	<head>
		<meta http-equiv="pragma" content="no-cache">
		<meta http-equiv="cache-control" content="no-cache">
		<meta http-equiv="expires" content="0">
		<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
		<meta http-equiv="description" content="This is my page">
		
		<link href="<%=path%>/common/css/td_style.css" rel=stylesheet></link>
		<link href="<%=path%>/common/css/td_style_ec.css" rel=stylesheet></link>
		
		<script language="javascript" src="<%=path%>/common/js/td_common.js"></script>
		<script language="javascript" src="<%=path%>/common/js/waitingbar.js"></script>
		<script language="javascript" src="<%=path%>/common/js/titlebar.js"></script>
		<script language="javascript" src="<%=path%>/unieap/js/Common.js"></script>
		<script language="javascript" src="<%=path%>/unieap/js/Globals.js"></script>
		<script language="javascript" src="<%=path%>/common/js/eccn.js"></script>
		<script language="javascript" src="<%=path%>/views/om/organ/dataParamRole/dataParamManage/js/tableInfo.js"></script>
		<script language="JavaScript">
			/*
			 *保存页面说有没选中的复选框的数据值
			 */
			function makeCheckedValues(){
			    var unCheckValue="";
			    var arrayc=document.getElementsByName('checkboxs');
			    var length=arrayc.length;

			    for(i=0; i<length;i++){
			    	if(arrayc[i].checked==false){
			    		if(arrayc[i].value!==''){
			    			unCheckValue+=arrayc[i].value;
			    			unCheckValue+="~";
			    		}
			    	}
			    }
			    
			    document.getElementById('unCheckValue').value=unCheckValue;
			}
			/*
			 *保存
			 */
			function doSave(){
				var parentObj=parent.document.queryPage.document;
			    var tableDesc=parentObj.getElementById('tableDesc').value;
			    document.getElementsByName('tableDesc')[0].value=tableDesc;
			    //存储所有页面上没选中的复选框数据值
			    makeCheckedValues();
			    
				document.getElementById('ec').action="dataparammanage.do?method=doSave";
				document.getElementById('ec').target='resultPage';
				document.getElementById('ec').submit();
			}
	    </script>
	</head>
	<body onLoad="init('<%=message%>','<%=dataInfo%>','<%=flag%>','<%=showNewDataFlag%>')" class="mainBody">
		<ec:table items="infoColls" var="infoObjs" rowsDisplayed="200" action="${pageContext.request.contextPath}/dataparammanage.do?method=query">
		
		<ec:parameter name="unCheckValue" /> 
		<ec:parameter name="oldDataInfo" value="<%=dataInfo%>" /> 
		<ec:parameter name="checkboxs" value="" />
		<ec:parameter name="tableDesc" value="" />
			<ec:row>
				<ec:column cell="checkbox" headerCell="checkbox" alias="checkboxs" width='15' value="<%=values%>"  />
				<%for (int i=0;i<countCols;i++){
					String cols="column"+(i+1);
				%>
					<ec:column property="<%=cols%>"  title="<%=(String)nameColls.get(i)%>" />
				<%}%>				
			</ec:row>
		</ec:table>
		
		<table width="100%" border="0" cellpadding="0" cellspacing="0">
			<tr>
				<td >&#160;</td>
			</tr>
			<tr>
				<td >&#160;</td>
			</tr>
		</table>
	</body>
</html>
