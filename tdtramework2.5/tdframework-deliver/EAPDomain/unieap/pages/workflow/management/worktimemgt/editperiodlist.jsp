<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="/WEB-INF/taglib/struts-html.tld" prefix="html"%>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean"%>
<%@ taglib uri="/WEB-INF/taglib/struts-logic.tld" prefix="logic"%>
<%@ taglib uri="/WEB-INF/taglib/uniflow.tld" prefix="uniflow"%>
<%@ page import="com.neusoft.uniflow.web.util.MessageUtil"%>
<%@ page import="com.neusoft.uniflow.web.management.worktimemgt.beans.WorktimeBean"%>
<%@ page import="com.neusoft.uniflow.web.util.WorkflowManager"%>

<%
	String beghour = "";
	String begmin = "";
	String endhour = "";
	String endmin = "";
	
	String begtime =(String)request.getAttribute("begtime");
	String endtime =(String) request.getAttribute("endtime");
	if(!begtime.equals("")&&!endtime.equals("")){
	
	beghour = begtime.split(":")[0];
	
	begmin = begtime.split(":")[1];

	endhour = endtime.split(":")[0];
	endmin = endtime.split(":")[1];
	}
%>
<html:html locale="true">
<head>
<title><bean:message bundle="uniflow" key = "workflow.popup"/></title>	
	<uniflow:style />
	<style type="text/css">
<!--
body {
	margin-left: 0px;
	margin-right: 0px;
	margin-top: 0px;
	margin-bottom: 0px;
}
-->
</style>

<script language="JavaScript"
	src="<%=WorkflowManager.getWorkflowPath()%>/js/DatePicker.js"></script>
<script language="JavaScript"
	src="<%=WorkflowManager.getWorkflowPath()%>/js/OpenWin.js"></script>
<script language="JavaScript"
	src="<%=WorkflowManager.getWorkflowPath()%>/js/Common.js"></script>
	
<script language="javascript">

function button_onclick(action)
{ 
  workperiodForm.action.value = action; 
  var starttime = document.all("beghour").value+":"+document.all("begmin").value;
  var endtime = document.all("endhour").value+":"+document.all("endmin").value;
  if(starttime>endtime&&action=="OK"){
     warning_info.innerHTML ="<%=MessageUtil.getString("workflow.check.time.checked",request.getSession())%>";
    return;
  }
  if(starttime==endtime&&action=="OK"){
     warning_info.innerHTML ="<%=MessageUtil.getString("workflow.check.time.checked",request.getSession())%>";
    return;
  }
  workperiodForm.startTime.value = starttime;
  workperiodForm.endTime.value = endtime;
  workperiodForm.submit();
  
}

function changeContent(obj){
   var parameter = "ID=changeContent";
   parameter+="&value="+obj.value;  
}
function onload()
{
 var action = "<%=request.getAttribute("close_flag")%>";
 if(action == "close")
  {
    parent.returnValue = true;
    //opener.parent.refreshDayPartInfo();
    window.close();
  }
  }


function reload()
{
  location.href = "addworktimeperiod.do";
}
</script>
</head>
<uniflow:p_body onload="javascript:onload()" width="90%">

	<uniflow:m_form action="editworktimeperiod.do">
	<uniflow:p_title><bean:message bundle="uniflow" key="workflow.schedule.workperiod.modify"/></uniflow:p_title>
			<uniflow:p_content_comm_wrapper width="100%">

				<uniflow:p_warning>
					<html:errors />
				</uniflow:p_warning>
				
				<uniflow:p_content_table>

					<uniflow:p_content_tr>
						<td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key="workflow.starttime"/></td>
						<td class="main_label_td" valign="middle" nowrap>
							<label>
								<SELECT id="beghour" name="beghour" onchange="changeContent(this)" class="input_text">
									<option value="00"<%="00".equals(beghour) ? "selected":""%>>00</option>
									<option value="01"<%="01".equals(beghour) ? "selected":""%>>01</option>
									<option value="02"<%="02".equals(beghour) ? "selected":""%>>02</option>
									<option value="03"<%="03".equals(beghour) ? "selected":""%>>03</option>
									<option value="04"<%="04".equals(beghour) ? "selected":""%>>04</option>
									<option value="05"<%="05".equals(beghour) ? "selected":""%>>05</option>
									<option value="06"<%="06".equals(beghour) ? "selected":""%>>06</option>
									<option value="07"<%="07".equals(beghour) ? "selected":""%>>07</option>
									<option value="08"<%="08".equals(beghour) ? "selected":""%>>08</option>
									<option value="09"<%="09".equals(beghour) ? "selected":""%>>09</option>
									<option value="10"<%="10".equals(beghour) ? "selected":""%>>10</option>
									<option value="11"<%="11".equals(beghour) ? "selected":""%>>11</option>
									<option value="12"<%="12".equals(beghour) ? "selected":""%>>12</option>
									<option value="13"<%="13".equals(beghour) ? "selected":""%>>13</option>
									<option value="14"<%="14".equals(beghour) ? "selected":""%>>14</option>
									<option value="15"<%="15".equals(beghour) ? "selected":""%>>15</option>
									<option value="16"<%="16".equals(beghour) ? "selected":""%>>16</option>
									<option value="17"<%="17".equals(beghour) ? "selected":""%>>17</option>
									<option value="18"<%="18".equals(beghour) ? "selected":""%>>18</option>
									<option value="19"<%="19".equals(beghour) ? "selected":""%>>19</option>
									<option value="20"<%="20".equals(beghour) ? "selected":""%>>20</option>
									<option value="21"<%="21".equals(beghour) ? "selected":""%>>21</option>
									<option value="22"<%="22".equals(beghour) ? "selected":""%>>22</option>
									<option value="23"<%="23".equals(beghour) ? "selected":""%>>23</option>
								</SELECT>
							</label>
							:
							<label>
								<SELECT id="begmin" name="begmin" onchange="changeContent(this)" class="input_text">
									<option value="00"<%="00".equals(begmin) ? "selected":""%>>00</option>
									<option value="05"<%="05".equals(begmin) ? "selected": ""%>>05</option>
									<option value="10"<%="10".equals(begmin) ? "selected": ""%>>10</option>
									<option value="15"<%="15".equals(begmin) ? "selected": ""%>>15</option>
									<option value="20"<%="20".equals(begmin) ? "selected": ""%>>20</option>
									<option value="25"<%="25".equals(begmin) ? "selected": ""%>>25</option>
									<option value="30"<%="30".equals(begmin) ? "selected": ""%>>30</option>
									<option value="35"<%="35".equals(begmin) ? "selected": ""%>>35</option>
									<option value="40"<%="40".equals(begmin) ? "selected": ""%>>40</option>
									<option value="45"<%="45".equals(begmin) ? "selected": ""%>>45</option>
									<option value="50"<%="50".equals(begmin) ? "selected": ""%>>50</option>
									<option value="55"<%="55".equals(begmin) ? "selected": ""%>>55</option>

								</SELECT>
							</label>
						</td>
					</uniflow:p_content_tr>
					<uniflow:p_content_tr>
						<td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key="workflow.endtime"/></td>
						<td class="main_label_td" valign="middle" nowrap>
							<label>
								<SELECT id="endhour" name="endhour" onchange="changeContent(this)" class="input_text">
									<option value="00"<%="00".equals(endhour) ? "selected":""%>>00</option>
									<option value="01"<%="01".equals(endhour) ? "selected":""%>>01</option>
									<option value="02"<%="02".equals(endhour) ? "selected":""%>>02</option>
									<option value="03"<%="03".equals(endhour) ? "selected":""%>>03</option>
									<option value="04"<%="04".equals(endhour) ? "selected":""%>>04</option>
									<option value="05"<%="05".equals(endhour) ? "selected":""%>>05</option>
									<option value="06"<%="06".equals(endhour) ? "selected":""%>>06</option>
									<option value="07"<%="07".equals(endhour) ? "selected":""%>>07</option>
									<option value="08"<%="08".equals(endhour) ? "selected":""%>>08</option>
									<option value="09"<%="09".equals(endhour) ? "selected":""%>>09</option>
									<option value="10"<%="10".equals(endhour) ? "selected":""%>>10</option>
									<option value="11"<%="11".equals(endhour) ? "selected":""%>>11</option>
									<option value="12"<%="12".equals(endhour) ? "selected":""%>>12</option>
									<option value="13"<%="13".equals(endhour) ? "selected":""%>>13</option>
									<option value="14"<%="14".equals(endhour) ? "selected":""%>>14</option>
									<option value="15"<%="15".equals(endhour) ? "selected":""%>>15</option>
									<option value="16"<%="16".equals(endhour) ? "selected":""%>>16</option>
									<option value="17"<%="17".equals(endhour) ? "selected":""%>>17</option>
									<option value="18"<%="18".equals(endhour) ? "selected":""%>>18</option>
									<option value="19"<%="19".equals(endhour) ? "selected":""%>>19</option>
									<option value="20"<%="20".equals(endhour) ? "selected":""%>>20</option>
									<option value="21"<%="21".equals(endhour) ? "selected":""%>>21</option>
									<option value="22"<%="22".equals(endhour) ? "selected":""%>>22</option>
									<option value="23"<%="23".equals(endhour) ? "selected":""%>>23</option>
								</SELECT>
							</label>
							:
							<label>
								<SELECT id="endmin" name="endmin" onchange="changeContent(this)" class="input_text">
									<option value="00"<%="00".equals(endmin) ? "selected":""%>>00</option>
									<option value="05"<%="05".equals(endmin) ? "selected": ""%>>05</option>
									<option value="10"<%="10".equals(endmin) ? "selected": ""%>>10</option>
									<option value="15"<%="15".equals(endmin) ? "selected": ""%>>15</option>
									<option value="20"<%="20".equals(endmin) ? "selected": ""%>>20</option>
									<option value="25"<%="25".equals(endmin) ? "selected": ""%>>25</option>
									<option value="30"<%="30".equals(endmin) ? "selected": ""%>>30</option>
									<option value="35"<%="35".equals(endmin) ? "selected": ""%>>35</option>
									<option value="40"<%="40".equals(endmin) ? "selected": ""%>>40</option>
									<option value="45"<%="45".equals(endmin) ? "selected": ""%>>45</option>
									<option value="50"<%="50".equals(endmin) ? "selected": ""%>>50</option>
									<option value="55"<%="55".equals(endmin) ? "selected": ""%>>55</option>

								</SELECT>
							</label>
						</td>

					</uniflow:p_content_tr>
					
				</uniflow:p_content_table>
			</uniflow:p_content_comm_wrapper>

			<uniflow:p_action>
				<uniflow:button id="ok" action="javascript:button_onclick('OK')" name="button.ok"/>
				<uniflow:button id="cancel" action="javascript:window.close()" name="button.cancel"/>
			</uniflow:p_action>
		
		<html:hidden property="action" />
		<html:hidden property="calendarId" />
		<html:hidden property="categoryId" />
		<html:hidden property="daypartId"/>
		<html:hidden property="startTime" />
		<html:hidden property="endTime" />
	</uniflow:m_form>
</uniflow:p_body>

</html:html>