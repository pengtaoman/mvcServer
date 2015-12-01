<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    <title>表单授权查询</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="form,privilege,query">
	<meta http-equiv="description" content="Form privilege query">
	<link href="unieap/pages/form/css/Style.css" rel=stylesheet>
	<link href="unieap/pages/form/css/Style2.css" rel=stylesheet>
	<script type="text/javascript" src="unieap/pages/form/jslib/form_calendar.js"></script>
	<script language="javascript">
		var returnObj = window.dialogArguments;

		function getReturnValue() {
			var nameInput = document.getElementsByName("formName")[0];
			var authorInput = document.getElementsByName("author")[0];
			
			var ctbInput = document.getElementsByName("createTimeBegin")[0];
			var cteInput = document.getElementsByName("createTimeEnd")[0];
			
			var mtbInput = document.getElementsByName("modifyTimeBegin")[0];
			var mteInput = document.getElementsByName("modifyTimeEnd")[0];
			
			var name = nameInput.value;
			var author = authorInput.value;
			
			var ctBegin = ctbInput.value;
			var ctEnd = cteInput.value;
			
			var mtBegin = mtbInput.value;
			var mtEnd = mteInput.value;

			if((ctBegin != "" && ctEnd == "") 
				|| (ctBegin == "" && ctEnd != "")) {
				alert("请输入完整的查询起止时间");
				return;
			}
			
			if((mtBegin != "" && mtEnd == "") 
				|| (mtBegin == "" && mtEnd != "")) {
				alert("请输入完整的查询起止时间");
				return;
			}

			if(name == "" && author == "" && (ctBegin == "" && ctEnd == "") && (mtBegin=="" && mtEnd=="")) {
				alert("请输入查询条件");
				return;
			}

			var str = "";
			if(name != "") {
				str = str + "formName=" + doReplace(name) + "&";
			}

			if(author != "") {
				str = str + "author=" + doReplace(author) + "&";
			}

			if(ctBegin != "" && ctEnd != "") {
				str = str + "createTime=" + ctBegin + "~" + ctEnd + "&";
			}

			if(mtBegin != "" && mtEnd != "") {
				str = str + "modifyTime=" + mtBegin + "~" + mtEnd + "&";
			}

			returnObj.value = str;
			//window.opener.window.location.href="<%=request.getContextPath()%>/privilegeFormList.do?"+obj.value+"&isNowSession='true'";
			window.close();
		}

		//去左空格;
		function ltrim(s){
		    return s.replace( /^\s*/, "");
		}
		
		//去右空格;
		function rtrim(s){
		    return s.replace( /\s*$/, "");
		}
		
		//去左右空格;    
		function trim(s){
		    return rtrim(ltrim(s));
		}
		
		function doReplace(p){
		   var space = "@space@"; //空格替换符
		   var end = "@end@"; //<SPAN class=hilite2>奇数</SPAN>字符乱码装饰符
		   var res = trim(p) + end;
		   res = res.replace(/ /g,space);
		   return res;
		}
	</script>
  </head>

  <body>
  	<table id="queryTable" class="main_list" align="center" cellpadding="0" cellspacing="0" style="margin-top:5px;margin-left:0px;">
  		<tr>
  			<td colspan="5" class="main_list_td" nowrap>请录入查询条件</td>
  		</tr>
  		<tr>
  			<td colspan="5" class="main_list_td" nowrap>以下条件间关系为：名称 并 作者 并 创建时间 并 修改时间</td>
  		</tr>
  		<tr>
  			<td class="main_list_td" nowrap>名称：</td>
  			<td class="main_list_td" nowrap>包含</td>
  			<td class="main_list_td"><input name="formName" class="input_text" value=""></input></td>
  			<td>&nbsp;</td>
  			<td>&nbsp;</td>
  		</tr>
  		<tr>
  			<td class="main_list_td" nowrap>作者：</td>
  			<td class="main_list_td" nowrap>包含</td>
  			<td class="main_list_td"><input name="author" class="input_text" value=""></input></td>
  			<td>&nbsp;</td>
  			<td>&nbsp;</td>
  		</tr>
  		<tr>
  			<td class="main_list_td" nowrap>创建时间：</td>
  			<td class="main_list_td" nowrap>从</td>
  			<td class="main_list_td">
  				<span>
  					<input name="createTimeBegin" type="calendar" format="yyyy-MM-dd" class="input_text" value=""/><img style="cursor:hand" src="<%=request.getContextPath()%>/unieap/pages/form/css/images/calendar.gif" onclick="popFormCalendar('createTimeBegin','createTimeBegin');return false;"/>
  				</span>
  			</td>
  			<td class="main_list_td" nowrap>到</td>
  			<td class="main_list_td">
  				<span>
  					<input name="createTimeEnd" type="calendar" format="yyyy-MM-dd" class="input_text" value=""/><img style="cursor:hand" src="<%=request.getContextPath()%>/unieap/pages/form/css/images/calendar.gif" onclick="popFormCalendar('createTimeEnd','createTimeEnd');return false;"/>
  				</span>
  			</td>
  		</tr>
  		<tr>
  			<td class="main_list_td" nowrap>修改时间：</td>
  			<td class="main_list_td" nowrap>从</td>
  			<td class="main_list_td">
  				<span>
  					<input name="modifyTimeBegin" type="calendar" format="yyyy-MM-dd" class="input_text" value=""/><img style="cursor:hand" src="<%=request.getContextPath()%>/unieap/pages/form/css/images/calendar.gif" onclick="popFormCalendar('modifyTimeBegin','modifyTimeBegin');return false;"/>
  				</span>
  			</td>
  			<td class="main_list_td" nowrap>到</td>
  			<td class="main_list_td">
  				<span>
  					<input name="modifyTimeEnd" type="calendar" format="yyyy-MM-dd" class="input_text" value=""/><img style="cursor:hand" src="<%=request.getContextPath()%>/unieap/pages/form/css/images/calendar.gif" onclick="popFormCalendar('modifyTimeEnd','modifyTimeEnd');return false;"/>
  				</span>
  			</td>
  		</tr>
  		<tr>
  			<td class="main_list_td" colspan="5" align="right">
  				<input type="button" name="queryBtn" value="查询" class="button_normal" onclick="javascript:getReturnValue()"></input>&nbsp;
  				<input type="button" name="closeBtn" value="关闭" class="button_normal" onclick="javascript:window.close()"></input>
  			</td>
  		</tr>
  	</table>
  </body>
</html>
