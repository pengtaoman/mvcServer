<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="/WEB-INF/taglib/struts-html.tld" prefix="html"%>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean"%>
<%@ taglib uri="/WEB-INF/taglib/struts-logic.tld" prefix="logic"%>
<%@ taglib uri="/WEB-INF/taglib/uniflow.tld" prefix="uniflow"%>
<%@ page import="com.neusoft.uniflow.web.util.WorkflowManager"%>
<html>
<title>生存期</title>
<LINK href="<%=WorkflowManager.getWorkflowPath()%>/stylesheet/Style.css" rel=stylesheet>
<script type="text/javascript" src="<%=WorkflowManager.getWorkflowPath()%>/webdesign/js/parallelExpiration.js"></script>
<body onload="displayDiv()">
<!-- 生存期的时间设置 -->
<input type="hidden" id="duration" value='<%=request.getParameter("dur")%>'></input>
<!-- 预警的时间设置 -->
<input type="hidden"  id="alertDuration" value='<%=request.getParameter("aDur")%>'></input>
<!-- 生存期判断变量与简单 -->
<input type="hidden"  id="varOrDur" value='<%=request.getParameter("vOD")%>'></input>
<!-- 催办判断变量与简单 -->
<input type="hidden" id="alertVarOrDur" value='<%=request.getParameter("aVOD")%>'></input> 	 	
<!-- 生存期的处理方式 -->
<input type="hidden" id="actionType" value='<%=request.getParameter("aType")%>'></input> 	 	
<!-- 预警的处理方式 -->
<input type="hidden" id="alertActionType" value='<%=request.getParameter("aAType")%>'></input> 	 	
<!-- 预警的间隔时间 -->
<input type="hidden" id="alertActionInterval" value='<%=request.getParameter("aAI")%>'/> 	 	
<!--生存期超时的应用程序  -->
<input type="hidden" id="actionApplication" value='<%=request.getParameter("aA")%>'/> 	 	
<!--生存期预警的应用程序  -->
<input type="hidden"  id="alertActionApplication" value='<%=request.getParameter("aAA")%>'/> 
<!--超时变量  -->
<input type="hidden"  id="variable" value='<%=request.getParameter("v")%>'/> 
<!--催办变量  -->
<input type="hidden"  id="alertVariable" value='<%=request.getParameter("aV")%>'/> 
<input type="hidden"  id="exActionName" value='<%=request.getParameter("exAn")%>'/>
<input type="hidden"  id="exAlertActionName" value='<%=request.getParameter("exAAN")%>'/>		 	
<br>
<div class="main_label_outline" style="width:510px">
<fieldset style="width:500px;">
	<legend>超时设置</legend>
		<table style="width:450" class="main_label_table">
			<tr>
				<td style="height:30px;width:90px">&nbsp;</td>
				<td>
					<input type="radio" name="dRadio" class="rodio"  <%=request.getParameter("vOD").equals("0")?"checked":""%>  value="0" onclick="displayDelayTime()">简单</input>
					<input type="radio" name="dRadio" class="rodio" id="radioDelayTime" <%=request.getParameter("vOD").equals("1")?"checked":""%>  value="1" onclick="displayDelayInput()">变量 </input>
				</td>
			</tr>
		</table>
	<div id="delayTime" >
		<table class="main_label_table">
			<tr>
				<td style="height:30px;width:90px">时间设置:</td>
				<td>工作日<input id="durationDay" type="text" class="input_text"  style="width:40px" onkeypress="return ieNum(event);"  onkeyup="ffNum(this.id)" ></input>
					小时<input  id="durationHour" type="text" class="input_text"  style="width:40px" onkeypress="return ieNum(event);"  onkeyup="ffNum(this.id)"></input>
					分钟<input type="text"  id="durationMin" class="input_text"  style="width:40px" onkeypress="return ieNum(event);"  onkeyup="ffNum(this.id)"></input>未处理则超时
				</td>
			</tr>
		</table>
	</div>
	<div style="display:none" id="delayVarSet">
		<table class="main_label_table">
			<tr>
				<td style="height:30px;width:90px">变量设置:</td>
				<td><select NAME="Cats"  id="select1" class="input_text"  style="width:350px">
						<option></option>
						<logic:iterate id="variables" scope="session" name="variables"> 
			        	<option><bean:write name="variables" property="name"/></option> 
						</logic:iterate>
					</select>
				</td>
			</tr>
		</table>
	</div>
	<div>
		<table class="main_label_table">
			<tr>
		    	<td style="height:30px;width:90px">处理方式:</td>
		    	<td><input type="radio" name="delayType" class="rodio" <%=request.getParameter("aType").equals("0")?"checked":""%> value="0" onclick="displayDelayApp()">继续</input>
				<input type="radio" name="delayType" class="rodio" <%=request.getParameter("aType").equals("1")?"checked":""%>  value="1" onclick="displayDelayApp()">等待</input>
				<input type="radio" name="delayType" class="rodio" <%=request.getParameter("aType").equals("2")?"checked":""%> value="2" onclick="displayDelayApp()">终止</input>
				<input type="radio" name="delayType" class="rodio"  <%=request.getParameter("aType").equals("3")?"checked":""%> value="3" onclick="displayDelayApp()">挂起</input>
				<input type="radio" name="delayType" class="rodio" <%=request.getParameter("aType").equals("4")?"checked":""%> value="4" onclick="displayDelayApp()">回退</input>
				<input type="radio" name="delayType" class="rodio" <%=request.getParameter("aType").equals("5")?"checked":""%>  value="5" id="delayApp" onclick="displayDelayApp()">应用程序</input></td>
		    </tr>

		</table>
	</div>
	<div id="application1" style="display:none">
		<table class="main_label_table">
			<tr>
				<td style="height:30px;width:90px" noWrap="true" >应用程序:</td>
				<td><input type="text" id="delayApplication" class="input_text"  value='<%=request.getParameter("exAn")%>' style="width:290px"></input>&nbsp;<input type="button" class="button_small" value="浏览" name="openDelayApplication" onclick="openApp(event)">&nbsp;<input type="button" class="button_small" onclick="clearUp()" value="取消" >
				</td>
			</tr>
		</table>
	</div>
</fieldset>
<fieldset style="width:500px;">
	<legend>催办设置</legend>
		<table style="width:450" class="main_label_table">
			<tr>
				<td style="height:30px;width:90px">&nbsp;</td>
				<td>
					<input type="radio" name="alertRadio" class="rodio" <%=request.getParameter("aVOD").equals("0")?"checked":""%> value="0" onclick="displayAlertTime()">简单</input>
					<input type="radio" name="alertRadio" class="rodio" id="alertDelayTime" <%=request.getParameter("aVOD").equals("1")?"checked":""%> value="1" onclick="displayAlertInput()">变量 </input>
				</td>
			</tr>
		</table>
	<div id="alertTime" >
		<table class="main_label_table">
			<tr>
				<td style="height:30px;width:90px">时间设置:</td>
				<td>工作日<input id="alertDurationDay" type="text" class="input_text"  style="width:40px" onkeypress="return ieNum(event);"  onkeyup="ffNum(this.id)" ></input>
					小时<input id="alertDurationHour" type="text" class="input_text"   style="width:40px" onkeypress="return ieNum(event);"  onkeyup="ffNum(this.id)"></input>
					分钟<input id="alertDurationMin" type="text" class="input_text" style="width:40px" onkeypress="return ieNum(event);"  onkeyup="ffNum(this.id)"></input>未处理则催办
			</tr>
		</table>
	</div>
	<div style="display:none"  id="alertVarSet">
		<table class="main_label_table">
			<tr>
				<td style="height:30px;width:90px" >变量设置:</td>
				<td><select NAME="Cats"  id="select2" style="width:350px">
					<option></option>
			        <logic:iterate id="variables" scope="session" name="variables"> 
					<option ><bean:write name="variables" property="name"/></option> 
			        </logic:iterate>
				 </select>
				</td>
			</tr>
		</table>
	</div>
	<div>
		<table class="main_label_table">
			<tr>
				<td style="height:30px;width:90px">间隔时间:</td>
				<td>工作日<input type="text" class="input_text"  id="intervalDay" style="width:40px" onkeypress="return ieNum(event);"  onkeyup="ffNum(this.id)"></input>
					小时<input type="text" class="input_text" id="intervalHour" style="width:40px" onkeypress="return ieNum(event);"  onkeyup="ffNum(this.id)"></input></td>
			</tr>
		</table>
	</div>
	<div>
		<table class="main_label_table">
			<tr>
				<td style="height:30px;width:90px">处理方式:</td>
				<td> 
					<input type="radio" name="alertType" class="rodio" <%=request.getParameter("aAType").equals("0")?"checked":""%> value="0" onclick="displayAlertApp()">默认</input>
				   	<input type="radio" name="alertType" class="rodio" <%=request.getParameter("aAType").equals("1")?"checked":""%> value="1" id="alertApp" onclick="displayAlertApp()">应用程序</input></td>
			</tr>
		</table>
	</div>
	<div id="application2" style="display:none">
		<table class="main_label_table">
			<tr>
				<td style="height:30px;width:90px" noWrap="true">应用程序:
				</td>
				<td>
				    <input type="text" id="alertApplication" class="input_text"  value='<%=request.getParameter("exAAN")%>'  style="width:290px"></input>&nbsp;<input type="button" class="button_small" value="浏览"  name="openAlertApplication" onclick="openApp(event)">&nbsp;<input type="button" class="button_small" onclick="clearUp1()" value="取消" >
				</td>
			</tr>
		</table>
	</div>
</fieldset>
</div>
	<table style="width:510px"  class="main_button">
        <tr>
            <td align="right" style="width:510px" >
              <input type="button" value="提交" class="button_normal" onclick="setParentValue()"/>&nbsp;
              <input type="button" value="取消" class="button_normal" onclick="window.close()"/>  
            </td>
        </tr>
    </table> 
</body>	
	</html>