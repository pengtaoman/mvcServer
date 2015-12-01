<%@ page language="java" import="java.util.*" pageEncoding="GB2312"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>数据角色维护</title>
    
    <meta http-equiv="pragma" content="no-cache">
    <meta http-equiv="cache-control" content="no-cache">
    <meta http-equiv="expires" content="0">
    <meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
    <meta http-equiv="description" content="This is my page">
    
    <link href="<%=path%>/common/css/td_style.css" rel=stylesheet type="text/css">
    <script language="JavaScript">
    <!--
    	/*
    	 * 页面初始化
    	 */
    	function load() 
	    {
	    	var arrayBtn=new Array(myform.confirm, myform.cancel);
		    for (var i=0;i<arrayBtn.length;i++)
		    {
		    /**
				arrayBtn[i].className="btn3_mouseout";
				arrayBtn[i].onmouseover=function(){this.className="btn3_mouseover"};
				arrayBtn[i].onmouseout=function(){this.className="btn3_mouseout"};
				arrayBtn[i].onmousedown=function(){this.className="btn3_mousedown"};
				arrayBtn[i].onmouseup=function(){this.className="btn3_mouseup"};
			*/
		    }
		    myform.roleName.value=window.dialogArguments;
		}
		
		/**
		 * 关闭窗口
		 */
		function wClose()
		{
			window.close();
		}
		
		/**
		 * 确认按钮
		 */
		function confirmOnClick()
		{
			var roleName = myform.roleName.value;
			if (roleName.length == 0){
				alert ('您必须输入一个名称');
				return false;
			}
			var ifValid = checkValues();
			if (ifValid != ''){
				alert (ifValid);
				return false;
			}
			window.returnValue = roleName;
			window.close();
		}
		
		/**
		 * 文本框回车
		 */
		function nas_enter(){
			var scode=(navigator.appname=="Nwtscape")?event.which:event.keyCode;
			if(scode == 13){
				//event.keyCode = 9;
				confirmOnClick();
			}
		}
		
		function checkValues()
		{
			var msg = '';
			var roleName = document.getElementById('roleName').value;
			if (roleName.indexOf('\'') >= 0) {
				msg = '名称中不允许出现非法字符';
			}
			if (roleName.indexOf('\"') >= 0) {
				msg = '名称中不允许出现非法字符';
			}
			if (roleName.indexOf('\\') >= 0) {
				msg = '名称中不允许出现非法字符';
			}
			return msg;
		}
	-->
	</script>
  </head>
  
	<body onload="load();" class="mainBody">
		<form name="myform">
			<table cellspacing="0" border="0" width="100%" cellpadding="0" class="formTable">
			 <tr class="tableTitleTR2">
				<td colspan="4" >
					<table width="100%" border="0" cellpadding="0" cellspacing="0" >
			            <tr>
						<td class="tableTitleLeft2" >&#160;</td>
						<td class="tableTitle2">数据角色维护</td>
						<td class="tableTitleRight2" >&#160;</td>
						</tr>
					 </table>
				 </td>
			</tr>
			<tr> 
		       <td class="formTableL" >&#160;</td>
		       <td class="formTableC">		 	 			
					<table border="0" cellpadding="0" cellspacing="2" class="formTableCore">
						<tr>
							<td class="formLabel" align="left">角色名称&#160;&#160;</td>
							<td align="center" class="formField" >
								<input id="roleName" name="roleName" type="text" maxlength="20" class="textType" value="" onkeydown="nas_enter();" >
							</td>			
							<td class="formField">&#160;</td>
							<td class="formField">&#160;</td>            
						  </tr>		
					</table>
			   </td>
		       <td class="formTableR" >&#160;</td>
		    </tr> 
		    <tr> 
			   <td class="formTableLB">&#160;</td>
			   <td class="formTableB">&#160;
			   	   <input type="hidden" name="roleId" id="roleId" value=""/>
			   </td>
			   <td class="formTableRB">&#160;</td>
		    </tr>
		 </table>
		 <div class="formButtonDIV" id="filebutton1" style="display:block"> 
			<button class="formButton" id="confirm" name="confirm" onClick="return confirmOnClick();">确&#160;&#160;定</button>
			<button class="formButton" id="cancel" name="cancel" onClick="wClose();">取&#160;&#160;消</button>
		 </div>
		</form>
	</body> 
</html>
