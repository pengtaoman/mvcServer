<%@ page language="java" pageEncoding="GBK"%>
<%@ page import="com.neusoft.crm.ordermgr.common.guide.data.GuideVO"%>
<%@ page import="com.neusoft.crm.ordermgr.common.guide.data.GuideInfoConfigVO"%>
<%@ page import="com.neusoft.unieap.util.RequestUtil" %>
<%@ page import="java.util.List"%>
<%
	 /* 
	 **************************************************************
	 * 程序名		: Guide.jsp
	 * 建立日期  	: 2012年05月24日
	 * 作者		: zhuguojun
	 * 模块		: 订单－公用导航条
	 * 描述		: 使用该页面需要引入 common/css/td_style_new.css common/js/td_common.js
	 * 备注		: 
	 * ------------------------------------------------------------
	 * 修改历史
	 * 序号		日期		修改人	修改原因
	 * 1     
	 * 2
	 **************************************************************
	 */
%>
<% 
	GuideVO guideVO = (GuideVO)request.getAttribute("guideVO");
	int curStep = (Integer)request.getAttribute("curStep");
	List<GuideInfoConfigVO> list = null;
	String className = null;
	String ifLast = "true";
	String showTitle = null;
	GuideInfoConfigVO vo = null;
	RequestUtil reqUtil = new RequestUtil(request);
	String subFuncName = String.valueOf(reqUtil.getParameter("subFuncName"));
	subFuncName = java.net.URLDecoder.decode(subFuncName,"UTF-8");
	if(subFuncName == null || subFuncName.equals("null")){
		subFuncName = "";
	}
	if(!subFuncName.equals("")){
		subFuncName = "(" + subFuncName + ")";
	}
%>
<%if(guideVO != null){%>
<div class="step_content">
	<div class="step_div" id="divAllStep">
	<% list = guideVO.getActList();
		if(list != null && list.size() > 0){
			for(int i = 0; i < list.size(); i++){
				vo = list.get(i);
				if(vo == null){
					continue;
				}
				if(curStep > vo.getStep()){
					className = "step_b";//当前步骤大于该步骤时，该步骤显示样式为蓝色：step_b 
				}else if(curStep == vo.getStep()){
					className = "step_o";//当前步骤等于该步骤时，该步骤显示样式为橙色：step_o ，同时更新title
					showTitle = list.get(i).getActDesc();
				}else{
					className = "step_g";
				}
				if(i==0){
					className += "e";
					ifLast = "true";
				}
				else{
					ifLast = "false";
				}
	%>
		<div class="<%=className %>" id="step<%=vo.getStep() %>" step="<%=vo.getStep() %>" ifLast="<%=ifLast %>" showName="<%=vo.getActDesc() %>">
			<%=vo.getActName() %>
		</div>
	<%		}
		}
	%>
	</div>
	<div class="step_title_left">
		<img src="/crm1/common/images/icon/report--pencil.png" width="16" height="16"><%=vo.getFunctionName() %><%=subFuncName%>
		<span class="2b">&gt;&nbsp;</span><span id="curStepShowName" class="step_title_left"><%=showTitle %></span>
	</div>
</div>
<%} %>