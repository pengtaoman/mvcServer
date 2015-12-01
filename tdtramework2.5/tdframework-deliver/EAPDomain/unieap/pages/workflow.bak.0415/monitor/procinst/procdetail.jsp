<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="/WEB-INF/taglib/struts-html.tld" prefix="html"%>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean" %>
<%@ taglib uri="/WEB-INF/taglib/uniflow.tld" prefix="uniflow"%>
<%@ page import="com.neusoft.uniflow.web.util.MessageUtil"%>
<%@ page import="com.neusoft.uniflow.web.util.WorkflowManager"%>
<%@ page import="com.neusoft.uniflow.web.util.CommonInfoManager"%>
<html:html locale="true">
<head>
<%String pid = request.getParameter("procInstID");%>
<META HTTP-EQUIV="MSThemeCompatible" CONTENT="No">
<uniflow:style/>
<SCRIPT language="JavaScript">
    function showProcAct(){
     document.all.wiData.style.visibility="hidden";
	 document.all.relData.style.visibility="hidden";
    }
    function showWI(){
  			 document.all.relData.style.visibility="hidden";
             document.all.wiData.style.visibility="visible";
	} 
    function showRD(){
			 document.all.wiData.style.visibility="hidden";
			 document.all.relData.style.visibility="visible";
	}
function popWorkitem(workitemValue){
        
    for(var i=0;document.all.workitem.rows.length>1;i++){
		document.all.workitem.deleteRow();
	}
    var totalStr =workitemValue;
    var index = totalStr.indexOf('}');
    var dealStr,Jindex;

    for(var i=0;index>0;i++){
	  dealStr = totalStr.substring(0,index);
  	  totalStr = totalStr.substring(index+1);
      index = totalStr.indexOf("}");
	  myNewRow = document.all.workitem.insertRow();
	  myNewRow.style.height="25px";
      if(i%2==0){
         myNewRow.style.backgroundColor="#f4f4f4";
	  }else{
	     myNewRow.style.backgroundColor="#FFFFFF";
	  }
	  //alert(dealStr);
	  for(var j=0;dealStr!="";j++){
		Jindex = dealStr.indexOf("#");
		if (dealStr.substring(0,Jindex).indexOf(',')>0){
	        //alert(dealStr.substring(0,Jindex));
	    }else{  
			var newcell =myNewRow.insertCell();
			newcell.align="center";			  
		    newcell.innerText=dealStr.substring(0,Jindex);
	    }
		dealStr = dealStr.substring(Jindex+1);	
	  }

  }
}
function popRData(rName,rValue){
	for(var i=0;document.all.rData.rows.length>1;i++){
		document.all.rData.deleteRow();
	}
    var i=1;
    var propNames = rName;
    var propValues = rValue;

    var name,value;
    var index = propNames.indexOf("#");
    while(index>-1)
    {
	  name = propNames.substring(0,index);
	  value = propValues.substring(0,propValues.indexOf("#"));

	  var myrelRow = document.all.rData.insertRow();
      if(i%2==1){
         myrelRow.style.backgroundColor="#f4f4f4";
	  }else{
	     myrelRow.style.backgroundColor="#FFFFFF";
	  }

	  myrelRow.style.height="25px";
	  var newcell =myrelRow.insertCell();
	  newcell.innerHTML=name;
      newcell =myrelRow.insertCell();
	  newcell.innerHTML=value;
	propNames = propNames.substring(index+1,propNames.length);
	propValues = propValues.substring(propValues.indexOf("#")+1,propValues.length);
	  i = i+1;
	  index = propNames.indexOf("#");
    }
	if(propNames!=""){
	  var myrelRow = document.all.rData.insertRow();
      if(i%2==1){
         myrelRow.style.backgroundColor="#f4f4f4";
	  }else{
	     myrelRow.style.backgroundColor="#FFFFFF";
	  }
	  myrelRow.style.height="25px";
	  var newcell =myrelRow.insertCell();
	  newcell.innerHTML=propNames;
      newcell =myrelRow.insertCell();
	  //  newcell.innerHTML=propValues;
	  if(propValues!="")
    	  newcell.innerHTML=propValues;
    else
       newcell.innerHTML="&nbsp;";

	}

}

function killErrors() { return true;} 
window.onerror = killErrors; 
//function reSizeApplet(){
   //document.all.wiData.style.height=document.body.clientHeight-100;
   //document.all.relData.style.height=document.body.clientHeight-100;

   //document.monitor.width =10>parseInt(document.body.clientWidth)?10:parseInt(document.body.clientWidth)-355;
   //document.monitor.height =15>parseInt(document.body.clientHeight)?1:parseInt(document.body.clientHeight)-50;
//}

function OnWfNodeClicked(type,names,values,rdNames,rdValues,wiValues)
{
   
  popWorkitem(wiValues);
  popRData(rdNames,rdValues);
  if(type=="TRANSITION")
    return true;
  else if(type=="PROCESS")
  {
    a1n.innerHTML = "&nbsp;";
    a1v.innerHTML = "&nbsp;";
    a2n.innerHTML = "&nbsp;";
    a2v.innerHTML = "&nbsp;";
    a3n.innerHTML = "&nbsp;";
    a3v.innerHTML = "&nbsp;";
    a4n.innerHTML = "&nbsp;";
    a4v.innerHTML = "&nbsp;";
    a5n.innerHTML = "&nbsp;";
    a5v.innerHTML = "&nbsp;";
    a6n.innerHTML = "&nbsp;";
    a6v.innerHTML = "&nbsp;";
    a7n.innerHTML = "&nbsp;";
    a7v.innerHTML = "&nbsp;";
    a8n.innerHTML = "&nbsp;";
    a8v.innerHTML = "&nbsp;";
    a1n.width="100%";
    a1n.align="left";
    a1n.innerHTML = "<%=MessageUtil.getString("workflow.alt.monitor.click.activity",session)%>&nbsp;&nbsp;";
  }
  else
  { 
    a1n.width="30%";
    a1n.align="left";
    var i=1;
    var actPropNames = names,actPropValues=values,name,value;
    var index = actPropNames.indexOf("#");
    while(index>-1)
    {
	name = actPropNames.substring(0,index);
	value = actPropValues.substring(0,actPropValues.indexOf("#"));
	eval("a"+i+"n.innerHTML = '"+name+":'");
	eval("a"+i+"v.innerHTML = '"+value+"'");
	actPropNames = actPropNames.substring(index+1,actPropNames.length);
	actPropValues = actPropValues.substring(actPropValues.indexOf("#")+1,actPropValues.length);
	  i = i+1;
	  index = actPropNames.indexOf("#");
    }
    eval("a"+i+"n.innerHTML = '"+actPropNames+":'");
    eval("a"+i+"v.innerHTML = '"+actPropValues+"'");
    i = i+1;
    while(i<=9)
    {
	eval("a"+i+"n.innerHTML = '&nbsp;'");
	eval("a"+i+"v.innerHTML = '&nbsp;'");
	  i = i+1;
    }
  }
}
function onload()
{
   var i=1;
    var propNames = document.monitor.getProcessPropNames()
    var propValues = document.monitor.getProcessPropValues();

    var name,value;
    var index = propNames.indexOf("#");
    while(index>-1)
    {
	name = propNames.substring(0,index);
	value = propValues.substring(0,propValues.indexOf("#"));
	eval("p"+i+"n.innerHTML = '"+name+":'");
	eval("p"+i+"v.innerHTML = '"+value+"'");
	propNames = propNames.substring(index+1,propNames.length);
	propValues = propValues.substring(propValues.indexOf("#")+1,propValues.length);
	  i = i+1;
	  index = propNames.indexOf("#");
    }
    eval("p"+i+"n.innerHTML = '"+propNames+":'");
    eval("p"+i+"v.innerHTML = '"+propValues+"'");

//init the workitem header
		var myNewRow = document.all.workitem.insertRow();
		myNewRow.setAttribute("height", "20", 0);
        myNewRow.style.fontSize="12px";
		myNewRow.style.backgroundImage="url(<%=WorkflowManager.getWorkflowStylePath()%>/images/main_list_th.gif)";
		myNewRow.style.fontFamily="宋体";
		myNewRow.style.color="#FFFFFF";
		//myNewRow.style.fontWeight="bold";
        var newcell =myNewRow.insertCell();
		newcell.width="30%";
		newcell.innerText='帐 号';
		newcell.align='center';
        var newcell =myNewRow.insertCell();
		newcell.width="20%";
		newcell.align='center';
		newcell.innerText='状 态';
        var newcell =myNewRow.insertCell();
		newcell.width="50%";
		newcell.align='center';
		newcell.innerText='完成时间';

//init the relative data header
		var myrelRow = document.all.rData.insertRow();
		myrelRow.setAttribute("height", "20", 0);
        myrelRow.style.fontSize="12px";
		myrelRow.style.backgroundImage="url(<%=WorkflowManager.getWorkflowStylePath()%>/images/main_list_th.gif)";
		myrelRow.style.fontFamily="宋体";
		myrelRow.style.color="#FFFFFF";
		//myrelRow.style.fontWeight="bold";
        var relcell =myrelRow.insertCell();
		relcell.width="40%";
		relcell.innerText='变量名';
		relcell.align='center';
        var relcell =myrelRow.insertCell();
		relcell.width="60%";
		relcell.align='center';
		relcell.innerText='变量值';
//resize the applet's height and width
    //reSizeApplet();
    //document.all.proc.style.visibility="visible";
    //document.all.wiData.style.visibility="hidden";
    //document.all.relData.style.visibility="hidden";
}
function openSVG(){
   location.href="<%=request.getContextPath()%>/procmonitor.do?procInstID=<%=request.getParameter("procInstID")%>";
}
</SCRIPT>

</head>
<body onload="javascript:onload()">
<uniflow:tab >
      <uniflow:tabElement messageKey="workflow.monitor.type.svg" selected="false" action="javascript:openSVG()"/>  
      <uniflow:tabElement messageKey="workflow.monitor.type.applet" selected="true" action="javascript:openApplet()"/>        
</uniflow:tab>
<uniflow:p_content_comm_wrapper width="100%" styleClass="main_label_outline3">
<uniflow:p_content_table>
<tr height="500">
<td class="main_label_td" valign="middle" width="60%" height="100%"nowrap>
<OBJECT
    classid = "clsid:8AD9C840-044E-11D1-B3E9-00805F499D93"
    NAME="monitor"
    WIDTH =420 HEIGHT =100% >
    <PARAM NAME = CODE VALUE = "com.neusoft.monitor.client.MonitorApplet" >
    <PARAM NAME = ARCHIVE VALUE = "monitor.jar,xpp3.jar,alloy.jar" >
    <PARAM NAME = "servletPath"  VALUE = "<%=request.getContextPath()%>/Tool" >
    <PARAM NAME = "processID"  VALUE = "<%=pid%>" >
    <PARAM NAME = "type" VALUE = "application/x-java-applet;version=1.4.2">
    <PARAM NAME = "scriptable" VALUE = "false">
    <PARAM NAME = "controlable" VALUE = "true">
    
    <PARAM NAME = "uninit.fillColor" VALUE = "white">
    <PARAM NAME = "init.fillColor"   VALUE = "gray">
    <PARAM NAME = "running.fillColor" VALUE = "green">
    <PARAM NAME = "active.fillColor" VALUE = "blue">
    <PARAM NAME = "suspend.fillColor" VALUE = "yellow">
    <PARAM NAME = "completed.fillColor" VALUE = "#408080">
    <PARAM NAME = "terminated.fillColor" VALUE = "red">

    <PARAM NAME = "uninit.textColor" VALUE = "black">
    <PARAM NAME = "init.textColor"   VALUE = "black">
    <PARAM NAME = "running.textColor" VALUE = "black">
    <PARAM NAME = "active.textColor" VALUE = "black">
    <PARAM NAME = "suspend.textColor" VALUE = "black">
    <PARAM NAME = "completed.textColor" VALUE = "black">
    <PARAM NAME = "terminated.textColor" VALUE = "black">

    <PARAM NAME = "selectedColor" VALUE = "lightGray">

    <COMMENT>
	<EMBED
		type = "application/x-java-applet;jpi-version=1.4.2" \
		CODE = "com.neusoft.monitor.MonitorApplet" \
		NAME="monitor" \
		ARCHIVE = "xerces.jar,deftool.jar,monitor.jar" \
		WIDTH = 420 \
		HEIGHT = 100% \
	    scriptable = false \
	    pluginspage = "http://java.sun.com/products/plugin/index.html#download">
	    <NOEMBED>
		alt="Your browser understands the &lt;APPLET&gt; tag but isn't running the applet, for some reason."
	Your browser is completely ignoring the &lt;APPLET&gt; tag!
		</NOEMBED>
	</EMBED>
    </COMMENT>
</OBJECT>
</td>
<td class="main_label_td" valign=top width="280" height="100%"nowrap>
<table>
<tr>
<td><table width="100%" style="font-size:12px;">
	    <tr style="font-size:12px;font-weight:bold"> 
	  	<td colspan="2">
		  <bean:message bundle="uniflow" key="workflow.procinst.detail.procdetail"/>
		  &nbsp;&nbsp;
		</td>
		</tr>
	    <tr >
		<td id="p1n" align="left" style="height:12px;font-size:12px">&nbsp;</td>
		<td id="p1v"  style="height:12px;font-size:12px">&nbsp;</td>
	    </tr>
	    <tr class="input_text">
		<td id="p2n" align="left" style="height:12px;font-size:12px">&nbsp;</td>
		<td id="p2v"  style="height:12px;font-size:12px">&nbsp;</td>
	    </tr>
	    <tr class="input_text">
		<td id="p3n" align="left" style="height:12px;font-size:12px">&nbsp;</td>
		<td id="p3v"  style="height:12px;font-size:12px">&nbsp;</td>
	    </tr>
	    <tr class="input_text">
		<td id="p4n" align="left" style="height:12px;font-size:12px">&nbsp;</td>
		<td id="p4v"  style="height:12px;font-size:12px">&nbsp;</td>
	    </tr>
	    <tr class="input_text">
		<td id="p5n" align="left" style="height:12px;font-size:12px">&nbsp;</td>
		<td id="p5v"  style="height:12px;font-size:12px">&nbsp;</td>
	    </tr>
	    <tr class="input_text">
		<td id="p6n" align="left" style="height:12px;font-size:12px">&nbsp;</td>
		<td id="p6v"  style="height:12px;font-size:12px">&nbsp;</td>
	    </tr>
	  </table>
     </td>
</tr>
<tr>
	<td><table  width="100%">
	    <tr style="font-size:12px;font-weight:bold">
		  <td colspan="2">
		    <bean:message bundle="uniflow" key="workflow.procinst.detail.actdetail"/>
		  </td>
	    </tr>
	    <tr class="input_text">
		<td id="a1n" align="left" style="height:12px;font-size:12px"></td>
		<td id="a1v"  style="height:12px;font-size:12px"></td>
	    </tr>
	    <tr class="input_text">
		<td id="a2n" align="left" style="height:12px;font-size:12px">&nbsp;</td>
		<td id="a2v"  style="height:12px;font-size:12px"></td>
	    </tr>
	    <tr class="input_text">
		<td id="a3n" align="left" style="height:12px;font-size:12px">&nbsp;</td>
		<td id="a3v"  style="height:12px;font-size:12px"></td>
	    </tr>
	    <tr class="input_text">
		<td id="a4n" align="left" style="height:12px;font-size:12px">&nbsp;</td>
		<td id="a4v"  style="height:12px;font-size:12px"></td>
	    </tr>
	    <tr class="input_text">
		<td id="a5n" align="left" style="height:12px;font-size:12px">&nbsp;</td>
		<td id="a5v"  style="height:12px;font-size:12px"></td>
	    </tr>
	    <tr class="input_text">
		<td id="a6n" align="left" style="height:12px;font-size:12px">&nbsp;</td>
		<td id="a6v"  style="height:12px;font-size:12px"></td>
	    </tr>
	    <tr class="input_text">
		<td id="a7n" align="left" style="height:12px;font-size:12px">&nbsp;</td>
		<td id="a7v"  style="height:12px;font-size:12px"></td>
	    </tr>
	    <tr class="input_text">
		<td id="a8n" align="left" style="height:12px;font-size:12px">&nbsp;</td>
		<td id="a8v"  style="height:12px;font-size:12px"></td>
	    </tr>
	    <tr class="input_text">
		<td id="a9n" align="left" style="height:12px;font-size:12px">&nbsp;</td>
		<td id="a9v"  style="height:12px;font-size:12px"></td>
	    </tr>
	  </table>
	</td>
</tr>
<tr><td>
<table style="font-size:12px;font-weight:bold">
<tr style="font-size:12px;font-weight:bold"> <td><bean:message bundle="uniflow" key = "workflow.monitor.procinst.workitem"/></td></tr>
</table>
</td></tr>
<tr><td>
<table id=workitem width="99%" style="font-size:12px;">
</table>
</td></tr>
<tr><td>
<table style="font-size:12px;font-weight:bold">
<tr style="font-size:12px;font-weight:bold"> <td><bean:message bundle="uniflow" key = "workflow.monitor.procinst.reldate"/></td></tr>
</table>
</td></tr>
<tr><td>
<table border=1 id=rData  bordercolordark="#FFFFFF" bordercolorlight="#cccccc" cellpadding="2" cellspacing="0" class="input_text" bgcolor="#FFFFFF" width="99%">
</table>
</td></tr>
</table>

</td>
<td></td>
</tr>
<tr>
<uniflow:m_table style="main_button">
	<tr>
	<td align="left" valign="top"width="30"><hr width='30' size='13' noshade color='#cccccc'></td>
	<td align="left" valign="middle" width="50" class="input_text"><%=CommonInfoManager.getStateStr(0,session)%></td>
	<td align="left" valign="top"width="30"><hr width='30' size='13' noshade color='green'></td>
    <td align="left" valign="middle" width="50" class="input_text"><%=CommonInfoManager.getStateStr(1,session)%></td>
	<td align="left" valign="top"width="30"><hr width='30' size='13' noshade color='blue'></td>
    <td align="left" valign="middle" width="50" class="input_text"><%=CommonInfoManager.getStateStr(2,session)%></td>
	<td align="left" valign="top"width="30"><hr width='30' size='13' noshade color='yellow'></td>
    <td align="left" valign="middle" width="50" class="input_text"><%=CommonInfoManager.getStateStr(2,session)%></td>
	<td align="left" valign="top"width="30"><hr width='30' size='13' noshade color='#408080'></td>
    <td align="left" valign="middle" width="50" class="input_text"><%=CommonInfoManager.getStateStr(4,session)%></td>
	<td align="left" valign="top"width="30"><hr width='30' size='13' noshade color='red'></td>
    <td align="left" valign="middle" width="50" class="input_text"><%=CommonInfoManager.getStateStr(5,session)%></td>
    <td>&nbsp;</td>
</tr>
</uniflow:m_table>
</tr>
</uniflow:p_content_table>
</uniflow:p_content_comm_wrapper>
</body>
</html:html>

