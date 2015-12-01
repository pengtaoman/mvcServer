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
<TITLE>��ɫά��</TITLE>
<link href="<%=path%>/common/css/td_style.css" rel=stylesheet></link>
<script language="javascript">
  /**
   *ȫѡ
   */
  function selectAll(){
	  parent.ChildMenuTree.selectAll();	  
  }
  /**
   *ȫ��ȡ��
   */
  function unselectAll(){
      parent.ChildMenuTree.unselectAll();
  } 
  /**
   *����
   */
  function resetSelect(){
 	  parent.ChildMenuTree.resetSelect();  
  }
  /**
   *��ͼƬ
   */
  function changePic(src){
	  parent.ChildMenuTree.changePic(src); 
  }
  /**
   *�ύ
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
					<button class="formButton" name="bAdd" id="bAdd" onClick="doSubmit('tab_page_2');" disabled="disabled" title="ֻ�ύ�Ӳ˵����еĸ�Ȩ��Ϣ">��&#160;&#160;��</button>
					<%if(condType.equals("true")){%>
						<button class="formButton" name="bSelectAll" id="bSelectAll" onClick="selectAll()" disabled="disabled">ȫ&#160;&#160;ѡ</button>
						<button class="formButton" name="bDeleteAll" id="bDeleteAll" onClick="unselectAll()" disabled="disabled">ȫ��ȡ��</button>
					<%}%>
				</div>
			</td>
		</tr>
	</table>
</form>
</body>
</html>
