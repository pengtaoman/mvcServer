<%/* 
			 **************************************************************
			 * 程序名	:FavourPlanQueryResContent.jsp
			 * 建立日期 : 
			 * 作者		: li.m@neusoft.com
			 * 模块		: 
			 * 描述		:
			 * 备注		: version20111114001
			 * ------------------------------------------------------------
			 * 修改历史
			 * 序号		日期		修改人			修改原因
			 * 1 20111114	li.m	  REQ2011102496501 关于新增帐户级套餐查询功能的需求
			 * 2
			 **************************************************************
			 */
%>
<%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ taglib uri="http://www.extremecomponents.org" prefix="ec"%>
<%@ taglib uri="/WEB-INF/taglib/unieap.tld" prefix="unieap"%>
<%
String webpath = request.getContextPath();
%>

<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=GBK" />
		<title>
			查询
		</title>
		<contextPath value="<%=webpath%>" />
		<!-- 公共css  -->
		<link rel="stylesheet" href="<%=webpath%>/common/css/td_style.css" type="text/css" />
		<link href="<%=webpath%>/common/css/td_style_ec.css" rel=stylesheet>
		<!-- 公共js  -->
		<script language="javascript" src="<%=webpath%>/unieap/js/Globals.js"> </script>
		<script language="javascript" src="<%=webpath%>/unieap/js/BaseObj.js"> </script>
		<script language="javascript" src="<%=webpath%>/unieap/js/EAPObjsMgr.js"> </script>
		<script language="javascript" src="<%=webpath%>/common/js/td_common.js"></script>
		<script language=javascript src="<%=webpath%>/common/js/prototypeajax.js"> </script>
		<script language=javascript src="<%=webpath%>/common/js/eccn.js"> </script>
		<script language=javascript src="<%=webpath%>/unieap/js/Globals.js"> </script>
		<script language=javascript src="<%=webpath%>/unieap/js/Common.js"> </script>
		<script type="text/javascript" src="<%=webpath%>/orderaccept/favourplanquery/js/FavourPlanBottom.js"></script>
	</head>
	<body class="mainBody" onload="init();">
		<ec:table items="resultList" var="pre" toolbarContent="navigation|pagejump|pagesize|export|extend|status" action="${pageContext.request.contextPath}/favourPlanQueryAction.do?method=doQuery" resizeColWidth="false"
    		style="table-layout:auto;" rowsDisplayed="10">
    		<ec:exportXls fileName="帐户套餐查询.xls" text="good"></ec:exportXls>
			<ec:row>
				<ec:column property="rowNum" title="序号"  />
				<ec:column property="fcityCode" title="地市"  />
				<ec:column property="serviceId" title="业务号码" />
				<ec:column property="fcustomerId" title="客户标识" />
				<ec:column property="faccountId" title="帐户标识" />
				<ec:column property="fserviceKind" title="套餐类型" />
				<ec:column property="ffavourName" title="套餐名称" />
				<ec:column property="ffavourDesc" title="套餐描述" />
				<ec:column property="fbegDate" cell="date" format="yyyy-MM-dd" title="生效时间" />
				<ec:column property="fendDate" cell="date" format="yyyy-MM-dd" title="失效时间" />
			</ec:row>			
		</ec:table>				
	</body>
</html>
