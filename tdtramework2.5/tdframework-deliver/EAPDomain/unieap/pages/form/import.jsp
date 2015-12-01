<%@ page contentType="text/html; charset=GBK"%>
<%@ page import="com.neusoft.form.manage.util.MessageUtil"%>
<%@ taglib uri="/WEB-INF/taglib/struts-html.tld" prefix="html"%>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean" %>
<%@ taglib uri="/WEB-INF/taglib/struts-logic.tld" prefix="logic" %>
<html>
<head>
<META HTTP-EQUIV="MSThemeCompatible" CONTENT="No">
<meta content="text/html; Encoding=gb2312">
<LINK href="<%=request.getContextPath()%>/unieap/pages/form/css/Style.css" rel=stylesheet>
<LINK href="<%=request.getContextPath()%>/unieap/pages/form/css/Style2.css" rel=stylesheet>
<title>
Uploads
</title>
<script language=vbscript>
function add()   '增加附件
  dim count_obj,tr_obj,td_obj,file_obj,form_obj,count,table_obj
  dim button_obj,countview_obj
  dim str1,str2

  set form_obj=document.getElementById("formedit")

  set fj_obj=document.getElementById("td_fj")

  if fj_obj.innertext="无附件" then
     fj_obj.innertext=""
  end if
  set count_obj=document.getElementById("count_obj")

  if (count_obj is nothing) then
    set count_obj=document.createElement("input")
        count_obj.type="hidden"
        count_obj.id="count_obj"
        count_obj.value=1

        form_obj.appendChild(count_obj)
        count=1
        count_obj.value=1
  else
    set count_obj=document.getElementById("count_obj")

        count=cint(count_obj.value)+1
        count_obj.value=count
  end if
       set div_obj=document.createElement("div")
     div_obj.id="div_"&cstr(count)
     div_obj.align="left"

      fj_obj.appendchild(div_obj)
  str1="<input type='file' name='fj"&count&"'  align=center id=fj'"&count&"' style='width:300'>"

   div_obj.innerHtml=str1
 end function

</script>
<script language=JavaScript>
function back(thisobj){
  thisobj.blur()
  location.href="<%=request.getContextPath()%>/formList.do"+"?isNowSession='true'";
}


</script>
</head>
<body >
  <form METHOD="POST" ACTION="<%=request.getContextPath()%>/uploadsAction.do" ENCTYPE="multipart/form-data">
     <center>
		<table border="0" cellpadding="0" cellspacing="0" id="formedit">
		  <tr>
		    <td ><table  cellspacing="0" class="main_title_table">
		      <tr>
		        <td nowrap class="text_title" ><%=MessageUtil.getString("form.import.new",session) %></td>
		        <td align="right" class="main_table2_td2">&nbsp;</td>
		      </tr>
		    </table>
		        <table border="0" cellpadding="0"  cellspacing="10" class="main_label_outline">
		          <tr>
		            <td><table cellspacing="0"   class="main_label_table">
		                <tr>
		                  <td class="main_label_td">
		                  <input type='file' name='f0'  align=center id='f0' style="width:300">
		                  <div id="td_fj"></div>
		                  </td>
		                </tr>		
		            </table></td>
		          </tr>
		        </table>
		      <table cellspacing="0" class="main_button">
		          <tr>
		            <td align="right" ><table class="button_table" cellspacing="0">
		                <tr align="right">
		                   
		                  <td class="button_td" ><input type="button" name="addfile" value='<%=MessageUtil.getString("form.button.new",session) %>' class="button_normal" onclick="vbscript:add()">
		                  </td>
		                  <td class="button_td" ><input type="submit" name="submit" value='<%=MessageUtil.getString("form.button.ok",session) %>' class="button_normal" >
		                  </td>
		                  <td class="button_td" ><input type="button" name="cancle" value='<%=MessageUtil.getString("form.button.return",session) %>' class="button_normal" onclick="javascript:back(this)">
		                  </td>
		                </tr>
		            </table></td>
		          </tr>
		      </table></td>
		  </tr>
		</table>
	</center>
  </form>
</body>
</html>
