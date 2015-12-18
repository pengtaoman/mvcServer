<%@ page contentType="text/html;charset=GBK" language="java" %>
<%@ page import="com.neusoft.tdframework.common.util.HttpObjectUtil" %>
<%@ taglib uri="/WEB-INF/taglib/unieap" prefix="unieap" %>
<%@ taglib uri="http://www.extremecomponents.org" prefix="ec" %>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c" %>

<%
	String webpath = request.getContextPath();
	//System.out.println(webpath);
	String appName = HttpObjectUtil.getAppName(request);
	//System.out.println(appName);
	String name = (String)request.getAttribute("id");
	//System.out.println(name);
	String baseInfo = "/demoQueryResultProcess.do?method=processTab1&name="+name;
	//System.out.println(baseInfo);
	String listbox = "/"+appName+"/demo/operatorMaint/ListboxDemo.jsp?name="+name;
	//System.out.println(listbox);
	String commonTree = "/demoCommonTree.do?method=begin&name="+name;
	//System.out.println(commonTree);
	String combox = "/createComboDataAction.do?method=createCombo";
	//System.out.println(combox);
	String cascade = "/createComboDataAction.do?method=createDoubleCombo";
	//System.out.println(cascade);
%>

<html>
<head>
<title>�û���Ϣ</title>

<link rel="stylesheet" href="<%=webpath%>/unieap/css/tab/unieapTab.css" type="text/css"></link>
<link rel="stylesheet" href="<%=webpath%>/common/css/td_style_tab.css" type="text/css"></link>

<script language="javascript" src="<%=webpath%>/unieap/js/tab/tabApi.js"></script>
<script language="javascript" src="<%=webpath%>/unieap/js/Globals.js"></script>
<script language="javascript" src="<%=webpath%>/unieap/js/tab/unieapTab.js"></script>
<script language="javascript" src="<%=webpath%>/unieap/js/Common.js"></script>
<script language="javascript" src="<%=webpath%>/common/js/td_date.js" ></script>
<script language="javascript" src="<%=webpath%>/tdframework/demo/js/detailsEdit.js"></script>

<script language="javascript">

var tempitem;
   
function tabEventTabClick(item,controlid){//�������Ƿ�װ�õĲ����Լ�����

	if(item != ""){
		tempitem = item;
	}	
   	var editWindow = getCertainPageWindow(controlid,tempitem.iframeid);
   	if(editWindow.document.readyState.toLowerCase() != "complete"){
   		setTimeout("tabEventTabClick('','"+controlid+"')",50);
   		return;
   	}
   	
   	//ʵ��TabPage��̬ˢ��
   	//getTabIFrameObj(controlid,tempitem.iframeid).src=tempitem.url;
   	//�������ڲ㷽��
   	//getCertainPageWindow(controlid,tempitem.iframeid).init();
}
	
function ui(){
	alert("�ڲ������㷽��");
}	
</script>
</head>

<body style="margin:25px;" onload="">

<form id="EAPForm" name="EAPForm" action="demoExtremeTable.do?method=doModify"  method="post">

<unieap:Tab name="tab" tabMode="2" allLoad="false" width="600" design="1" maxTabItemsPerRow ="6">
	<unieap:TabPage iframeid="demo_tab_1" text="Basic" title="������Ϣ" url="<%=baseInfo%>" height="450" autoCheckEAP="false" active="true"/>
	<unieap:TabPage iframeid="demo_tab_2" text="Listbox" title="Listboxʾ��" url="<%=listbox%>" height="450" autoCheckEAP="false"/>
    <unieap:TabPage iframeid="demo_tab_3" text="CommonTree" title="CommonTreeʾ��" url="<%=commonTree%>" height="450" autoCheckEAP="false"/>
    <!--unieap:TabPage iframeid="demo_tab_3" securityid="tabPage03" text="CommonTree" title="CommonTreeʾ��" url="<%=commonTree%>" height="450" autoCheckEAP="false"/-->
    <unieap:TabPage iframeid="demo_tab_4" text="Combox" title="Comboxʾ��" url="<%=combox%>" height="450" autoCheckEAP="false"/>
    <unieap:TabPage iframeid="demo_tab_5" text="Cascade" title="����ѡ���ʾ��" url="<%=cascade%>" height="450" autoCheckEAP="false"/>
    <unieap:TabPage iframeid="demo_tab_6" text="Remote" title="Remoteʾ��" url="eapabsolute:/jsp-examples/jsp2/el/functions.jsp" 
                    height="450" autoCheckEAP="false"/>
     <unieap:TabPage iframeid="demo_tab_7" text="Sina" title="Sina" url="http://www.sina.com.cn" height="450" autoCheckEAP="false"/>
    <unieap:TabPage iframeid="demo_tab_8" text="doubleco5" title="����ѡ���ʾ��" url="<%=cascade%>" height="450" autoCheckEAP="false"/>
    <unieap:TabPage iframeid="demo_tab_9" text="doubleco6" title="����ѡ���ʾ��" url="<%=cascade%>" height="450" autoCheckEAP="false"/>
    <unieap:TabPage iframeid="demo_tab_10" text="doubleco7" title="����ѡ���ʾ��" url="<%=cascade%>" height="450" autoCheckEAP="false"/>
</unieap:Tab>

<p><input type="button" value="�ύ" onclick="pos1('tab');"></p>

<div style="display:none;" id="aa"></div>

<div style="display:none;">
	<input type="button"  onclick="aaa();">
	<script>
	function aaa(){
		document.all("sss").innerText = window.document.body.innerHTML;
	}
	</script>
	<textarea id="sss"></textarea>
</div>

</form>
</body>
</html>