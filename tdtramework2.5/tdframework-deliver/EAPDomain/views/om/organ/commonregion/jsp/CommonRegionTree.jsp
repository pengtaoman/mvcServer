
<%@ page contentType="text/html;charset=GBK"%>
<%@ page import="com.neusoft.om.dao.region.CommonRegionColl"%>
<%@ page import="com.neusoft.om.dao.region.CommonRegionVO"%>

<%
	String path = request.getContextPath();
	String message = (String) request.getAttribute("Message");
	if (message == null) {
		message = "";
	}
	CommonRegionColl commonRegionColl = (CommonRegionColl) request
			.getAttribute("commonRegionColl");
	StringBuffer mzTreeViewBuff = new StringBuffer();
	String commonRegionDetailUrl = path+"/om/commonRegionAction.do?method=initCommonRegionPage";
	String treeName = "common_region_tree";
	String commonRegionDetailPageTarget="commonRegionDetail";
%>

<html>
	<head>
		<title>行政区域</title>
		<script language=javascript src="<%=path%>/unieap/js/Globals.js"> </script>
		<script language=javascript src="<%=path%>/unieap/js/treehandle.js"> </script>
		<script language=javascript src="<%=path%>/unieap/js/Common.js"> </script>
		<script language=javascript src="<%=path%>/unieap/js/treeAPI.js"> </script>
		<script language=javascript src="<%=path%>/common/js/tree/fw_menu.js"></script>
		<script language=javascript src="<%=path%>/common/js/tree/fw_menuEvent.js"> </script>
		<link_rel ="stylesheet_href="<%=path%>/unieap/css/tab/unieapTab.css" _type="text/css">
		</link>
		<style>
			A.MzTreeview
			{
  				font-size: 9pt;
  				font-color:#000000;
  				padding-left: 3px;
  
			}
		</style>
		<script type="text/javascript" src="<%=path%>/unieap/js/tab/tabApi.js"></script>
		<script type="text/javascript" src="<%=path%>/unieap/js/tab/unieapTab.js"></script>
		<script type="text/javascript" src="<%=path%>/views/om/organ/menu/menuFuncTree/MzTreeView10.js"></script>
		<script type="text/javascript" src="<%=path%>/views/om/organ/commonregion/js/CommonRegionTree.js"></script>
		<link href="<%=path%>/common/css/td_style.css" rel=stylesheet type="text/css">
	</head>

	<body  onload="init('<%=path %>')" >
	<form method="post"  name="mainForm" id="mainForm">
		<table border="0" cellpadding="0" cellspacing="0" class="formTable">
			<!-- 表格标题行-->
			<tr class="tableTitleTR2">
				<td colspan="3">
					<table width="100%" border="0" cellpadding="0" cellspacing="0">
						<tr>
							<td class="tableTitleLeft2">
								&#160;
							</td>
							<td class="tableTitle2">
								公用管理区域
							</td>
							<td class="tableTitleRight2">
								&#160;
							</td>
						</tr>
					</table>
				</td>
			</tr>
			<table>
				<tr>
					<td align="left" class="formLabel" style="width:50%">
						名称<span class="formRequested"></span>
					</td>
					<td align="left" class="formField" style="width:30%">
						<input  id="commonRegionName" name="commonRegionName" prompt="公共管理区域名称" 
							classname="textType" value="" onkeydown="return enterDown();" />
					</td>
					<td align="left" class="formField" style="width:20%">
						<button id="bSearch" name="bSearch" onclick="return bSearchClick();">
							查 询
						</button>
					</td>			
				</tr>
			</table>
			<tr>
				<td class="formTableL">
					&#160;
				</td>
				<td class="formTableC" style="width:97%;vertical-align:top">
					<%
						mzTreeViewBuff.append("\n<script type=\"text/javascript\">\n");
						mzTreeViewBuff.append("<!--\n");
						mzTreeViewBuff.append("	window." + treeName + " = new MzTreeView('"+ treeName + "');\n");
						mzTreeViewBuff.append("	" + treeName+ ".icons['property'] = 'property.gif';\n");
						mzTreeViewBuff.append("	" + treeName+ ".icons['css'] = 'collection.gif';\n");
						mzTreeViewBuff.append("	" + treeName+ ".icons['book']  = 'book.gif';\n");
						mzTreeViewBuff.append("	" + treeName+ ".iconsExpand['book'] = 'bookopen.gif'; //展开时对应的图片\n");
						mzTreeViewBuff.append("	" + treeName + ".setIconPath('" + path+ "/views/om/organ/menu/menuFuncTree/'); //可用相对路径\n");
						mzTreeViewBuff.append("	" + treeName + ".setTarget('" + commonRegionDetailPageTarget + "');\n");
						mzTreeViewBuff.append("	" + treeName + ".setURL('" + commonRegionDetailUrl + "');\n");
						
						for (int i = 0; i < commonRegionColl.getRowCount(); i++) {
							
							CommonRegionVO vo = commonRegionColl.getCommonRegionVO(i);
							String nodeId = String.valueOf(vo.getCommonRegionId());
							String parentNodeId = String.valueOf(vo.getUpRegionId());
							String nodeName = vo.getRegionName();
							String dataStr = "data:commonRegionId=" + nodeId;							
							
							if(parentNodeId.equals("0")){
								mzTreeViewBuff.append("	" + treeName + ".rootId = '" + parentNodeId + "';\n");
								mzTreeViewBuff.append("	" + treeName + ".nodes['"+parentNodeId+"_"+nodeId+"'] = 'text:"+nodeName+"; url:#; target:_self';\n");
								continue;
							}
							
							mzTreeViewBuff.append("	" + treeName + ".nodes['" + parentNodeId + "_" + nodeId + "'] = 'text:" + nodeName + "; " + dataStr + "';\n");
							
						}

						mzTreeViewBuff.append("	document.write(" + treeName + ".toString());\n");
						//mzTreeViewBuff.append(" " + treeName + ".expandAll();\n");
						//mzTreeViewBuff.append(" " + treeName + ".focus('2101');\n");
						
						mzTreeViewBuff.append("	setMzTree(" + treeName + ");\n");
						
						mzTreeViewBuff.append("	-->\n");
						mzTreeViewBuff.append("</script>\n");

						out.println(mzTreeViewBuff.toString());
					%>

				</td>
				<td class="formTableR">
					&#160;
				</td>
			</tr>
			<tr>
				<td class="formTableLB">
					&#160;
				</td>
				<td class="formTableB">
					&#160;
				</td>
				<td class="formTableRB">
					&#160;
				</td>
			</tr>
		</table>
		</form>
	</body>
</html>
