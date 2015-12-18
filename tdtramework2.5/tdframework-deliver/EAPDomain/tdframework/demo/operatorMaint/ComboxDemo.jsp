<%@ page contentType="text/html;charset=GBK" language="java"%>
<%@page import="java.util.*"%>
<%@ taglib uri="/WEB-INF/taglib/unieap" prefix="unieap"%>

<%
	String webpath = request.getContextPath();
    pageContext.setAttribute("111", "aaaaa",pageContext.APPLICATION_SCOPE);
%>

<html>
<head>

<title>Comnbobox标签</title>

<link rel="stylesheet" href="<%=webpath%>/unieap/css/combobox/combobox.css" type="text/css"></link>
<link rel="stylesheet" href="<%=webpath%>/unieap/css/combobox/combobox2.css" type="text/css"></link>
<link rel="stylesheet" href="<%=webpath%>/unieap/css/combobox/combobox3.css" type="text/css"></link>
<link rel="stylesheet" href="<%=webpath%>/unieap/css/standard/Style.css" type="text/css"></link>

<script type="text/javascript" src="<%=webpath%>/unieap/js/prototype/prototype.js"></script>
<script type="text/javascript"src="<%=webpath%>/unieap/js/combobox/combobox.js"></script>

<script type="text/javascript">

window.onload = function(){
  var combo11=ComboBoxManager['combo11'];
  combo11.setContent("200588 耐克");
  combo11.textInput.value = "200588 耐克";
}

function getAllSelectedValue(){
	var combo1=ComboBoxManager['combo1'];
	var combo2=ComboBoxManager['combo2'];
	var combo3=ComboBoxManager['combo3'];
	var combo4=ComboBoxManager['combo4'];
	var combo5=ComboBoxManager['combo5'];
	var combo6=ComboBoxManager['combo6'];
	alert("combo1 的值为"+combo1.getSelectedValue()+"\n"+
    	"combo2 的值为"+combo2.getSelectedValue()+"\n"+
        "combo3 的值为"+combo3.getSelectedValue()+"\n"+
        "combo4 的值为"+combo4.getSelectedValue()+"\n"+
        "combo5 的值为"+combo5.getSelectedValue()+"\n"+
        "combo6 的值为"+combo6.getSelectedValue()
    );
}

function getAllSelectedText(){
	var combo1=ComboBoxManager['combo1'];
	var combo2=ComboBoxManager['combo2'];
	var combo3=ComboBoxManager['combo3'];
	var combo4=ComboBoxManager['combo4'];
	var combo5=ComboBoxManager['combo5'];
	var combo6=ComboBoxManager['combo6'];
	alert("combo1 的值为"+combo1.getSelectedText()+"\n"+
        "combo2 的值为"+combo2.getSelectedText()+"\n"+
        "combo3 的值为"+combo3.getSelectedText()+"\n"+
        "combo4 的值为"+combo4.getSelectedText()+"\n"+
        "combo5 的值为"+combo5.getSelectedText()+"\n"+
        "combo6 的值为"+combo6.getSelectedText()
    );
}

function dealMulti(result){
	var value=new String();
	for(var i=0;i<result.length;i++){
    	value+=result[i]+"#";
    }
    if(value.length>0){
    	value=value.substr(0,value.length-1);	
    }
    return value;
}
</script>
</head>

<body class="main_body_bg">

<br>

<table id="desktop" align="center" width="98%" cellpadding="10" style="border:dotted #0099CC 1px;">
	<tr>
		<td>
			<p>可编辑下拉选择框</p>
			<unieap:combobox id="combo1" name="comboBox1" capacity="20" width="150px" arrowButtonClass="arrowButton2" />
		</td>
		<td>
			<p>只读下拉选择框</p>
			<unieap:combobox id="combo2" name="comboBox3" capacity="6" itemEvenClass="ComboBoxItemEven2" itemOddClass="ComboBoxItemOdd2"
			                 listClass="ComboBoxListDiv2" comboBoxClass="ComboBox2" selectionColor="#339966" width="150px" editable="false" />
		</td>
	</tr>
	<tr>
		<div>
			<td>多选择CheckBox(支持自定义格式、显示默认选项)</td>
			<td>
				<unieap:combobox id="combo11" name="comboBox6" capacity="6" width="250px" checkbox="true" multiSelectionFun="dealMulti"/>
			</td>
		</div>
	</tr>
	<tr>
		<td>
			<p>其他属性设置</p>
			<unieap:combobox securityid="combobox" id="combo3" name="comboBox2" value="getName" capacity="10" width="150px"
			             	 itemEvenClass="ComboBoxItemEven3" itemOddClass="ComboBoxItemOdd3" listClass="ComboBoxListDiv3" comboBoxClass="ComboBox3"
						 	 selectionColor="#339966" defaultValue="刘德华" arrowButtonClass="arrowButton3" />
		</td>
		<td>
			<p>高亮显示匹配</p>
			<unieap:combobox id="combo4" name="comboBox4" capacity="6" highlightMatch="true" matchAnyWhere="true" ignoreCase="true"
							 width="150px" arrowButtonClass="arrowButton2" />
		</td>
	</tr>
	<tr>
		<td>
			<p>多匹配</p>
   			<unieap:combobox id="combo6" name="comboBox6" capacity="6" width="200px" arrowButtonClass="arrowButton2" />
   		</td>
		<td>
			<p>多选择 CheckBox</p>
			<unieap:combobox id="combo9" name="comboBox6" capacity="6" width="250px" checkbox="true" arrowButtonClass="arrowButton3" />
		</td>
	</tr>
</table>
</body>
</html>