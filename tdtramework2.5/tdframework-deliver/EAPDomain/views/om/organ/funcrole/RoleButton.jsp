<%@ page contentType="text/html;charset=GBK"%>
<%@ taglib uri="/WEB-INF/taglib/unieap.tld" prefix="unieap"%>
<%@ taglib uri="http://www.extremecomponents.org" prefix="ec"%>
<%@ taglib uri="/WEB-INF/tld/om.tld" prefix="om"%>
<%
	String path = request.getContextPath();
	String condType = "true";//request.getParameter("condType");
	if(condType == null){
		condType = "roleId";
	}
%>
<html>
<head>
<TITLE>角色维护</TITLE>
<link href="<%=path%>/common/css/td_style.css" rel=stylesheet></link>
<script language="javascript">
  /**
   *全选
   */
  function selectAll(){
	  parent.ChildMenuTree.selectAll();	  
  }
  /**
   *全部取消
   */
  function unselectAll(){
      parent.ChildMenuTree.unselectAll();
  } 
  /**
   *重置
   */
  function resetSelect(){
 	  parent.ChildMenuTree.resetSelect();  
  }
  /**
   *换图片
   */
  function changePic(src){
	  parent.ChildMenuTree.changePic(src); 
  }
  /**
   *提交
   */
  //function doSubmit(treeName){
  //	  parent.RoleManage.doSubmit(treeName);
  //}
  
  function doSubmit(treeName){
  	  document.getElementById('bAdd').disabled = true;
  	  parent.ChildMenuTree.doSubmit(treeName);
  }
</script>
</head>

<body>
<form name="myform" action="" method="post">
	<input type='hidden' name='path' value='<%=path%>'/>
	<table width="100%" border="0" align="center">
		<tr align="right">
			<td width="100%" align="center">
				<div class="formButtonDIV" id="filebuttons" style="display:block">
					<button class="formButton" name="bAdd" id="bAdd" onClick="doSubmit('tab_page_2');" disabled="disabled" title="只提交子菜单树中的赋权信息">提&#160;&#160;交</button>
					<%if(condType.equals("true")){%>
						<button class="formButton" name="bSelectAll" id="bSelectAll" onClick="selectAll()" disabled="disabled">全&#160;&#160;选</button>
						<button class="formButton" name="bDeleteAll" id="bDeleteAll" onClick="unselectAll()" disabled="disabled">全部取消</button>
					<%}%>
				</div>
			</td>
		</tr>
	</table>
</form>
</body>
</html>
