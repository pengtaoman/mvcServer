<%/* JSP程序简要描述信息
**************************************************************
* 程序名		: OrganEmployeeList.jsp
* 建立日期	: 2006-06-28
* 作者		: liuxue
* 模块		: 组织机构管理
* 描述		: 机构人员调整
* 备注		: 
* ------------------------------------------------------------
* 修改历史
* 序号		日期		修改人			修改原因
* 1   
* 2
**************************************************************
*/

%>
<%@ page contentType="text/html;charset=GBK"%>
<%@ taglib uri="/WEB-INF/taglib/unieap.tld" prefix="unieap"%>
<%@ taglib uri="http://www.extremecomponents.org" prefix="ec" %>
<%@ taglib uri="/WEB-INF/tld/om.tld" prefix="om" %>
<%@ page import="com.neusoft.tdframework.common.data.ParamObjectCollection"%>
<%@ page import="java.util.List"%>
<%@ page import="com.neusoft.om.dao.organemployeedisplay.OrganEmployeeDisplayVO"%>

<%

     String path =request.getContextPath();
     List employeeList = (List)request.getAttribute("employeeList");
     ParamObjectCollection dutyColl=(ParamObjectCollection)request.getAttribute("dutyColl");
     ParamObjectCollection dutyTypeColl=(ParamObjectCollection)request.getAttribute("dutyTypeColl");
     String organId=(String)request.getAttribute("organId");
     String authAdminType = (String)request.getAttribute("authAdminType");

%>
<html>
  <head>
  <TITLE>机构职员调整</TITLE>
  <link rel="stylesheet" type="text/css" href="<%=path%>/views/common/css/pubstyle.css" TYPE="text/css">
  <LINK REL="stylesheet" HREF="<%=path%>/views/common/css/extremecomponents.css" TYPE="text/css"/>
  	<script  language=javascript src="<%=path%>/common/js/prototypeajax.js"> </script>
	<script  language=javascript src="<%=path%>/common/js/eccn.js"> </script>
  <script language="javascript">
   var eccn=new ECCN("ec");
   function load() {	
   var dutyType = document.getElementById("dutyType").value;
   if(dutyType ==1){
   	document.getElementById("dutyType").value = 0;
   	document.getElementById("dutyTypeId").value = 0;
   }
   		eccn.doPrep=false;
		eccn.doPrepPrev=false;
		eccn.init();		
		<% String str=(String)request.getAttribute("Message");
		   if(str!=null&&!str.equals("")){
		%>
		var msg = '<%=str%>';
		alert(msg);
		<%}%>
		
		var arrayBtn=new Array(myform.bAdd,myform.bDelete);
		for (var i=0;i<arrayBtn.length;i++){
		/*
				arrayBtn[i].className="btn3_mouseout";
				arrayBtn[i].onmouseover=function(){this.className="btn3_mouseover"};
				arrayBtn[i].onmouseout=function(){this.className="btn3_mouseout"};
				arrayBtn[i].onmousedown=function(){this.className="btn3_mousedown"};
				arrayBtn[i].onmouseup=function(){this.className="btn3_mouseup"};
		*/
		}
		<%if(authAdminType.equals("0")){%>
			myform.bDelete.disabled = true;
			myform.bAdd.disabled = true;
		<%}%>
	
	  }
    
     
     function radioOnclick(kind,employeeid,dutyid,workNo,modifiable)
     {
     	var flag = document.all("choose").value;
        if(kind=="0"){
          document.getElementById("bDelete").disabled=true;
        }else{         
          	<%if(authAdminType.equals("0")){%>
				myform.bDelete.disabled = true;
				myform.bAdd.disabled = true;
			<%}else{%>
				document.getElementById("bDelete").disabled=false;
			<%}%>
			if(modifiable=="0"){
				myform.bDelete.disabled = true;
			}
			//document.getElementById("bDelete").disabled=false;
        }if (flag =="1"){
        	 document.myform.employee.value=employeeid;
        }else{        
        	 document.myform.employee.value=workNo;
        }
     	document.myform.employeeId.value=employeeid;
       	document.myform.dutyId.value=dutyid;
       	document.all("dutyType").value=kind;
       	document.all("duty").value=dutyid;
       	document.all("dutyTypeId").value=kind;
     }   
     
     function bDeleteClick()
     {
          if (!confirm('您确定要删除么？'))	return;
          document.getElementById("myform").action="OrganMaintanceAction.do?OperType=deleteDutyRelationInfo";
          document.getElementById("myform").submit();
     }
     
     
     function bAddClick()
     {
     	
        if(myform.employee.value=='')
        {
          alert("请输入职员帐号或编码");
          return;
        }
        var dutyType = document.getElementById("dutyType").value; 
        var dutyTypeId = document.getElementById("dutyTypeId").value;
		if(dutyTypeId == 0){//0:主要职务,需要提示
			if (!confirm('您确定调整该主要职务人员吗?')) return false;
		}
        if(checkValue())
         {
          document.getElementById("myform").action="OrganMaintanceAction.do?OperType=modifyEmployeeDutyInfo";
          document.getElementById("myform").submit();
         
         }
         else
         alert("此职员已经拥有该职务");
     }    
      
      function bBackClick(webpath)
	{
		if (!confirm('您确定关闭这个窗口么？')) return false;
	    window.close();
	}
			  
      function  checkValue()
     {
        var eid;
        var did;
        var eWorkNo;
        var flag=true;
        var choose = document.getElementById("choose").value;
        var employee = document.myform.employee.value.toUpperCase();
        <%
           for(int i=0 ;i<employeeList.size();i++)
           {
                OrganEmployeeDisplayVO vo = (OrganEmployeeDisplayVO) employeeList.get(i);
         %>       
             eid='<%=vo.getEmployeeId() %>' ;
             eWorkNo='<%=vo.getWorkNo()%>';
             did='<%=String.valueOf(vo.getDutyId()) %>' ;
             //alert("eid="+eid+"  eWorkNo="+eWorkNo+"  did="+did+"  employee="+employee+"  choose="+choose+"  duty="+document.myform.duty.value);
             if(choose=='1' && eid == employee && did==document.myform.duty.value){
             	flag=false;
             }else if(choose=='0' && eWorkNo == employee && did==document.myform.duty.value){
             	flag=false;
             }
         <%
           }
         %>
        return flag;
     }
   
    // begin add by jialixin
   /**
    *单击一行时候选中单选按钮
    */
   function doOnClickEvent(kind,employeeid,dutyid,workNo,modifiable){
   		//alert("workNo="+workNo+" employeeId="+employeeId);
   		var radioKind = "radio_"+kind+"_"+employeeid;
   		var cb = document.getElementById(radioKind);
		cb.checked = "checked";
		radioOnclick(kind,employeeid,dutyid,workNo,modifiable)
   }
   //end add by jialixin
   
   function changeDuty(){
       var dutytype = document.getElementById("dutyType").value;
       var dutyTypeId = document.getElementById("dutyTypeId").value;
       if(dutyTypeId == 0){
       	document.getElementById("dutyTypeId").value = 1;
       }else if(dutyTypeId == 1){
        document.getElementById("dutyTypeId").value = 0;
       }
       
   }
  </script>
  </head>
  
  <body onload="load()">
  <table width="100%" height="105" border="0" cellpadding="5" cellspacing="0">
    <tr>
    	<td width="100%">
<%if (employeeList.isEmpty()) {

			%>
		<script language="JavaScript">
			alert("此机构暂无任何人员！");
		</script>
		<%} else {

				%>

		<ec:table items="employeeList" var="employee"
			action="OrganMaintanceAction.do?OperType=initDutyInfo&OrganId=<%=organId%>" 
			paginationLocation="false" rowsDisplayed="-1" >
					<ec:parameter name="beforetable" value="">
						<table border='0' cellpadding='0' cellspacing='0' class="tableRegion"  width='100%'>
							<tr class="trType">
								<td width='34' height="26" align='center' valign='middle' background="<%=path%>/views/common/images/top_line1.jpg">
								</td>
								<td align='center' height="26" valign='middle' background='<%=path%>/views/common/images/top_line_bg.jpg'>
									<div align='left'>组织机构职员调整</div>
								</td>
							</tr>
						</table>
					</ec:parameter>
					<ec:row onclick="doOnClickEvent('${employee.kind}','${employee.employeeId}','${employee.dutyId}','${employee.workNo}','${employee.modifiable}');">
					    <ec:column property="recordId" title="序号">
		                   <input type="radio"  name="radio" id="radio_${employee.kind}_${employee.employeeId}"  onclick="radioOnclick('${employee.kind}','${employee.employeeId}','${employee.dutyId}','${employee.workNo}','${employee.modifiable}')" />
		                </ec:column>
						<ec:column property="employeeName" title="姓名"  />
						<ec:column property="workNo" title="登陆帐号" />
						<ec:column property="employeeId" title="职员编码" />
						<ec:column property="dutyName" title="职务" />
						<ec:column property="kindName" title="任职类型" />
				   </ec:row>
		</ec:table>
<%}%>
		<form  name="myform" action="" method="post">
			<table width="97%" border="0" class="tableType1" cellspacing="0" cellpadding="0" height="20px">
			      <tr class="trType">
					  	<td class="tdType3">
					  	    <select class="selectType" name="choose">
						  	    <option value="0" selected>登录帐号</option>
						  	    <option value="1">职员编号</option>
					  	    </select>
					  	</td>
					  	<td class="tdType3"><input type="text" class="textType" name="employee" value=""></td>
					  	<td class="tdType4">职务</td>
					  	<td class="tdType3"><om:SelectTag selectFlag="" selectColl="<%=dutyColl%>" selectvalue="" tagName="duty"/></td>
					  	<td class="tdType4">任职类型</td>
					  	<td class="tdType3"><om:SelectTag selectFlag="" selectColl="<%=dutyTypeColl%>" selectvalue="0" tagName="dutyType" onchange="changeDuty()"/></td>
				  </tr>
				  <tr class="trType">
				  	<td colspan="5" align="right">
					  	<input type="button" name="bAdd" class="button1" value="增加" onclick="bAddClick();return false;"  />
					  	<input type="button" name="bDelete" class="button1" value="删除" disabled=true onclick="bDeleteClick();return false;" />
					    <input type="reset" name="bBack" value="关闭" class="button1" onclick="return bBackClick('<%=path%>');"/>
					</td>
				  </tr>
			</table>
			<input type="hidden" name="organId" value="<%=organId%>">
			<input type="hidden" name="employeeId" value="">
			<input type="hidden" name="dutyId" value="">
			<input type="hidden" name="dutyTypeId" value="0">
		</form>
	</td>
</tr>
</table>
  </body>
</html>
