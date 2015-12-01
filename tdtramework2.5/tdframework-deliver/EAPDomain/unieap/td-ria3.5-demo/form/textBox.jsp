<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8" %>
<%@ page import="com.neusoft.tdframework.authorization.*" %>
<%@ page import="com.neusoft.tdframework.common.GlobalParameters" %>
<% 

AuthorizeVO authorizeVO = (AuthorizeVO)session.getAttribute(GlobalParameters.SESSION_INFO);

out.println("!!!!!!!!!!!!!!!! SESSION HOME-CITY-CODE :   " + authorizeVO.getHomeCity());

out.println("!!!!!!!!!!!!!!!! SESSION ID :   " + session.getId());
%>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		</meta>
		<%@ include file="/unieap/ria3.3/pages/config.jsp" %>
		<contextPath value="<%=path%>"/>
		<script type="text/javascript">
		
			var FormData = new unieap.ds.DataStore('formData_store', 
					dojo.fromJson("[{"+
					"base001:'\u901f\u5ea6\u5206\u6563\u5bf9\u65b9',"+
					"valid001:'98008'"+
				    "}]"));
			dataCenter.addDataStore(FormData);
			
			function setValue() {
				var base001 =  unieap.byId("base001");
				var formData = dataCenter.getDataStore('formData_store').getRowSet().getRowData(0,"primary")["base001"];
				base001.setText(formData);
				//alert(unieap.byId("valid001").getValue());
			}
			
			function getValue() {
				var base001 =  unieap.byId("base001");
				alert("\u901f\u5ea6\u5206\u6563\u5bf9\u65b9：" + base001.getValue());
			}
		</script>
		
	</head>
<body class="unieap">
<div dojoType="unieap.form.Form" binding="{store:'formData_store'}">

<table border="0">

	<tr>
		<td>
			<div dojoType="unieap.layout.TitlePane"  width="400px" height="150px" title="\u901f\u5ea6\u5206\u6563\u5bf9\u65b9">
				<BR/>文本框基本形式：<div dojoType="unieap.form.TextBox" id="base001"></div>
				<BR/>文本框密码形式：<div dojoType="unieap.form.TextBox" password="true"></div>
			</div>
		</td>
		<td>
		&nbsp;&nbsp;&nbsp;&nbsp;
		</td>
		<td>
			<div dojoType="unieap.layout.TitlePane"  width="400px" height="150px" title="必填文本框">
				<BR/>必填文本框 ：<div dojoType="unieap.form.TextBox" required="true"></div>
			</div>
		</td>
	</tr>
	
    <tr>
		<td>
			<div dojoType="unieap.layout.TitlePane"  width="400px" height="150px" title="带验证的文本框">
			    <BR/>验证数字(预绑定数据)：<div dojoType="unieap.form.TextBox" id="valid001" binding="{name:'valid001'}" validator="{regExp:/^\d+$/,errorMsg:'只能输入数字'}"></div>
                <BR/>验证字和大写字母：<div dojoType="unieap.form.TextBox" validator="{regExp:/^[A-Z0-9]+$/,errorMsg:'只能输入数字和大写字母',realTime:true}"></div>
			</div>
		</td>
		<td>
		&nbsp;&nbsp;&nbsp;&nbsp;
		</td>
		<td>
			<div dojoType="unieap.layout.TitlePane"  width="400px" height="150px" title="过滤输入">
				<BR/>只能输入数字：<div dojoType="unieap.form.TextBox" inputFilter="{filterRule:/\d/}"></div>
			</div>
		</td>
	</tr>
	
	<tr>
		<td>
			<div dojoType="unieap.layout.TitlePane"  width="400px" height="150px" title="数字文本框控件">
			       只能输入-100~100之间的整数：<div dojoType="unieap.form.NumberTextBox" validator="{errorMsg:'只能输入-100~100之间的整数'}" range="{min:-100,max:100,allowDecimal:false}"></div>
			       最多只能输入5个数字和一个小数点：<div dojoType="unieap.form.NumberTextBox" precision="5" scale="2" validator="{errorMsg:'最多只能输入5个数字和一个小数点'}" ></div>
			       格式化输入内容(###,###.###)：<div dojoType="unieap.form.NumberTextBox" displayFormatter="{dataFormat:'###,###.###'}"></div>
			</div>
		</td>
		<td>
		&nbsp;&nbsp;&nbsp;&nbsp;
		</td>
		<td>
			<div dojoType="unieap.layout.TitlePane"  width="400px" height="150px" title="Inline形式的文本框">
				<div dojoType="unieap.form.InlineEditBox" displayFormatter="{declaredClass:'unieap.form.NumberDisplayFormatter',dataFormat:'$###,###.00'}"></div>
	            <div dojoType="unieap.form.InlineEditBox" displayFormatter="{declaredClass:'unieap.form.DateDisplayFormatter',dataFormat:'yyyy/MM/dd'}"></div>
	            <div dojoType="unieap.form.InlineEditBox" editor="{editorProps:{required:true}}"></div>
	            <div dojoType="unieap.form.InlineEditBox"></div>
	            <font color="red">（※编辑时总使显示有边框的文本框，editor="{editorProps:{required:true}}设置不能生效,需要调查）</font>
			</div>
		</td>
</table>

</div>
<div dojoType="unieap.form.Button" label="给《文本框基本形式》的文本框赋值" onclick="setValue();"></div>&nbsp;&nbsp;&nbsp;&nbsp;<div dojoType="unieap.form.Button" label="取得《数字文本框控件》文本框的值" onclick="getValue();"></div>
</body>
</html>	
	