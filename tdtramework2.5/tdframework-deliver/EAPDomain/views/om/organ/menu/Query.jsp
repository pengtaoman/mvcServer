<%--
/* JSP程序简要描述信息
**************************************************************
* 程序名	: 菜单维护查询条件页面
* 建立日期: 2008-06-16
* 作者		: zhaof@neusoft.com
* 模块		: 权限
* 描述		: 权限系统-菜单维护
* 备注		: 
* ------------------------------------------------------------
* 修改历史
* 序号		日期		修改人			修改原因
* 1
* 2
**************************************************************
*/
--%>
<%@ page contentType="text/html; charset=gb2312" %>
<%@ taglib uri="/WEB-INF/taglib/unieap.tld" prefix="unieap" %>
<%@ taglib uri="/WEB-INF/tld/td.tld" prefix="td" %>
<%@ taglib uri="/WEB-INF/tld/om.tld" prefix="om" %>
<%
	String webpath = request.getContextPath();
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<title>权限维护</title>
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">
<link   href="<%=webpath%>/common/css/td_style.css" rel=stylesheet type="text/css">
<script language="javascript" src="<%=webpath%>/common/js/td_date.js" ></script>
<script language="javascript" src="<%=webpath%>/unieap/js/Globals.js"> </script>
<script language="javascript" src="<%=webpath%>/unieap/js/Common.js"> </script>
<script language="javascript" src="<%=webpath%>/unieap/js/EAPObjsMgr.js"> </script>
<script language="javascript" src="<%=webpath%>/unieap/js/BaseObj.js"> </script>		
<script language="javascript" src="<%=webpath%>/common/js/titlebar.js"> </script>
<script language="javascript" src="<%=webpath%>/views/common/js/nas_check_no_null.js"></script>
<script language="javascript" src="<%=webpath%>/views/common/js/nas_date_compare.js"></script>
<script language="javascript" src="<%=webpath%>/common/js/td_common.js" ></script>
<script language="javascript">
	/*
	 *
	 */
	function load(){	
		document.getElementById("bModify").disabled = 'true';
		document.getElementById("bDelete").disabled = 'true';
		TitleBar.addTitleBarByTag('select');
		
		adjustIframeSize();
	}
	/*
	 *
	 */
	function doSearch(path){
		//parent.list.document.showWaitingBar();		
		document.forms[0].action = path+"/om/menuAction.do?method=query";
		document.forms[0].target = "list";	    	
		document.forms[0].submit();
	}
	/*
	 *
	 */
	 function doAddSys(path){
		var url = path+ '/om/menuAction.do?method=addInit&type=system';
		var width = 550;
		var height = 250;
		var wleft=(screen.width-width)/2;
		var wtop=(screen.availHeight-height)/2-20;
		dimensions="width="+width+",height="+height+",left="+wleft+",top="+wtop+",scrollbars";
		window.open(url,'markpage',dimensions);
	}
	function doAddMenu(path){
		var url = path+ '/om/menuAction.do?method=addInit&type=menu';
		var width = 550;
		var height = 300;
		var wleft=(screen.width-width)/2;
		var wtop=(screen.availHeight-height)/2-20;
		dimensions="width="+width+",height="+height+",left="+wleft+",top="+wtop+",scrollbars";
		window.open(url,'markpage',dimensions);
	}
	/*
	 *
	 */
	function doModify(path){
		var menuId = parent.list.document.getElementById("menuId").value;
		var menuType = parent.list.document.getElementById("menuType").value;
		if(menuId!=null && menuId!=''){
			var url = path+ '/om/menuAction.do?method=getDetail&menuId='+menuId+'&menuType='+menuType+'&oper=modify';
			var width = 550;
			var height = 300;
			var wleft=(screen.width-width)/2;
			var wtop=(screen.availHeight-height)/2-20;
			dimensions="width="+width+",height="+height+",left="+wleft+",top="+wtop+",scrollbars";
			window.open(url,'markpage',dimensions);
		}		
	}
	/*
	 *
	 */
	function doDelete(path){
		if(confirm("确认删除该权限信息吗?")){	
			var menuId = parent.list.document.getElementById("menuId").value;
			var menuType = parent.list.document.getElementById("menuType").value; 
			document.forms[0].action = path+"/om/menuAction.do?method=doDelete&delMenuId="+menuId+"&delMenuType="+menuType;
			document.forms[0].target = "list";	    	
			document.forms[0].submit();			
		}		
	}
	
	
		
	function adjustIframeSize() {
		var a = window.parent.document.getElementsByTagName('iframe');
		for (var i=0; i<a.length; i++) {
			if (a[i].name == self.name) {
				a[i].style.height = document.body.scrollHeight+10;
				return;
			}
		}
	}
		
</script>
</head>
  
<body onload="load()" class="mainBody">
<form method="POST" name="myform">
	 <table border="0" cellpadding="0" cellspacing="2" class="formTableCore" id="QueryCondition">
		<tr>
			<td class="formLabel">
				权限标识
			</td>
			<td class="formField">
				<input type="text" id="menuId" name="menuId" />
            </td>
			<td class="formLabel">
				权限名称
			</td>
			<td class="formField">
				<input type="text" id="menuName" name="menuName" />
			</td>
			<td class="formLabel">
				权限类型
			</td>
			<td class="formField">
				<select name="menuType" id="menuType" onkeydown="nas_enter();">
					<option value="99">子系统</option>
					<option value="1">菜单</option>
					<option value="0">按钮或组件</option>
			  	</select>
			</td>
		</tr>
	 </table>
	 <div class="formButtonDIV" id="filebutton1" style="display:block"> 
	 	<button class="formButton" id="bSearch" name="bSearch" onclick="doSearch('<%=webpath%>')">查 询</button>
	 	<button class="formButton" id="bAddSys" name="bAddSys" onclick="doAddSys('<%=webpath%>')">增加子系统</button>
	 	<button class="formButton" id="bAddMenu" name="bAddMenu" onclick="doAddMenu('<%=webpath%>')">增加菜单组件</button>
		<button class="formButton" id="bModify" name="bModify" onclick="doModify('<%=webpath%>')">修 改</button>
		<button class="formButton" id="bDelete" name="bDelete" onclick="doDelete('<%=webpath%>')">删 除</button>
	 </div>
</form>
</body>
</html>
