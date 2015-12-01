<%@ page contentType="text/html; charset=gb2312"%>
<%@ taglib uri="/WEB-INF/tld/crm_taglibs.tld" prefix="crm"%>
<%@ taglib uri="/WEB-INF/tld/om.tld" prefix="om"%>
<%@ taglib uri="/WEB-INF/tld/td.tld" prefix="td"%>
<%@ taglib prefix="unieap" uri="/WEB-INF/taglib/unieap"%>
<%@ page import="java.util.List"%>
<%@ page import="com.neusoft.om.dao.dataParamRole.FilterRelationVO"%>
<%@ taglib uri="http://www.extremecomponents.org" prefix="ec" %>
<%
	String path = request.getContextPath();
    String message = (String)request.getAttribute("message")==null? "":(String) request.getAttribute("message");
    List tableList = (List)request.getAttribute("result");
    String operType = (String)request.getAttribute("operType")==null? "":(String) request.getAttribute("operType");
    String tableId = (String)request.getAttribute("tableId")==null? "":(String) request.getAttribute("tableId");
    String mainColumn = (String)request.getAttribute("mainColumn")==null? "":(String) request.getAttribute("mainColumn");
%>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=gbk">
	<title>Query Result</title>
	<contextPath value="<%=path%>"/>
	
	<!-- 禁止 windows 主题风格ss -->
	<meta http-equiv="MSThemeCompatible" content="no" />
	<!-- 禁止缓存 headers -->
	<meta http-equiv="Pragma" content="no-cache" />
	<meta http-equiv="Expires" content="-1" />
	<meta http-equiv="Cache-Control" content="no-cache" />
	
	<link href="<%=path%>/common/css/td_style.css" rel=stylesheet></link>
	<link href="<%=path%>/common/css/td_style_ec.css" rel=stylesheet></link>

	<script language="javascript" src="<%=path%>/common/js/td_common.js"></script>
	<script language="javascript" src="<%=path%>/common/js/waitingbar.js"></script>
	<script language="javascript" src="<%=path%>/common/js/titlebar.js"></script>
	<script language="javascript" src="<%=path%>/unieap/js/Common.js"></script>
	<script language="javascript" src="<%=path%>/unieap/js/Globals.js"></script>
	<script language="javascript" src="<%=path%>/common/js/eccn.js"></script>
	<script language="javascript" src="<%=path%>/views/om/organ/dataParamRole/filterRelation/js/list.js"></script>
</head>
	<body onLoad="init('<%=message%>')" class="mainBody">
		<form id="ec"  action=""  method="post" style="visibility :hidden;" >
		<div class="eXtremeTable"  id="ec_main_content"  style="width:100%;" >
			<div>
			<input type="hidden"  name="ec_i"  value="ec" />
			<input type="hidden"  name="ec_efn" />
			<input type="hidden"  name="ec_crd"  value="2" />
			<input type="hidden"  name="ec_p"  value="1" />
			<input type="hidden"  id="operType" name="operType"  value="<%=operType%>" />
			<input type="hidden"  id="filterName" name="filterName"  value="<%=mainColumn%>" />
			<input type="hidden"  id="tableId" name="tableId"  value="<%=tableId%>" />
			<input type="hidden"  name="ec_totalpages"  value="1" />
			<input type="hidden"  name="ec_totalrows"  value="<%=tableList.size()%>" />
			</div>
		
			<table id="ec_table"  border="0"  cellspacing="0"  cellpadding="0"  class="tableRegion"  width="100%"    >
				<thead id="ec_table_head" >
				<tr>
					<td class="tableHeader"  width="15" ><input type="checkbox"  title="全选/全消"  class="checkbox"  onclick="ECSideUtil.checkAll('ec','checkboxs',this)" /></td>
					<td class="tableHeader" >联动过滤器表</td>
					<td class="tableHeader" >联动过滤器对应字段</td>
					<td class="tableHeader" >联动过滤器描述</td>
					<td class="tableHeader" >联动查询数据信息</td>
				</tr>
				</thead>
				<tbody id="ec_table_body" >
				<%  for(int i=0;i<tableList.size();i++){
						FilterRelationVO vo = (FilterRelationVO)tableList.get(i);
						String checkboxValue = vo.getTableId()+"~"+vo.getMainFilterInfo()+"~"+vo.getPassiveFilterInfo()+"~"+vo.getFilterId()+"~"+vo.getSelectTagName();
						if(i%2 == 0){%>
							<tr class="odd" onclick="ECSideUtil.selectRow('ec',this);">
				<%		}else{%>
							<tr class="even" onclick="ECSideUtil.selectRow('ec',this);">
				<%		}%>
								<td width="15">
									<input type="checkbox" name="checkboxs"  value="<%=checkboxValue%>"  class="checkbox" <%if(vo.getIfUsed()==null || vo.getIfUsed().trim().equals("")){%>/>
									<%}else{%>checked="checked"/><%}%>
								</td>																	
								<td><%=vo.getFilterInfo()%></td>		
								<td>
									<td:SelectTag selectFlag="true" selectColl="<%=vo.getFilterColumnColl()%>" selectvalue="<%=vo.getParamColumnInfo()%>" 
										fixlength="100%" tagName="<%=vo.getSelectTagName()%>" title="过滤器"/>
								</td>
								<td><%=vo.getColumnDesc()%></td>
								<td><%=vo.getPassiveFilterInfo()%></td>
							</tr>
				<%	}%>	
				</tbody>
			</table>
		</div>
		</form>
	</body>
</html>
