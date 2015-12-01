<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		</meta>
		<%@ include file="/unieap/ria3.3/pages/config.jsp" %>
		<contextPath value="<%=path%>"/>
		<script type="text/javascript">
		
		var date = new Date();
		date.setDate(01);

		var FormData = new unieap.ds.DataStore('formData_store', 
				dojo.fromJson("[{"+
				"datebinging:'"+ date.getTime() +"',"+
				"valid001:'98008'"+
			    "}]"));
		dataCenter.addDataStore(FormData);
		
		function getValue() {
			var base001 =  unieap.byId("date301");
			alert("日期控件的值是：" + base001.getValue());
		}
		</script>
		
	</head>
<body class="unieap">
<div dojoType="unieap.form.Form" binding="{store:'formData_store'}">
<font color="red">※ 日期控件暂时不带清空按钮，后续调整</font>
<table border="0">
	<tr>
		<td>
			<div dojoType="unieap.layout.TitlePane"  width="400px" height="150px" title="日期控件">
				日期控件(格式为yyyy-MM-dd)：<div dojoType="unieap.form.DateTextBox" id="date001" displayFormatter="{dataFormat:'yyyy-MM-dd'}"></div>
				日期控件(格式为yyyy-MM-dd HH:mm:ss)：<div dojoType="unieap.form.DateTextBox" id="date002" displayFormatter="{dataFormat:'yyyy-MM-dd HH:mm:ss'}"></div>
				默认不显示当前时间：<div dojoType="unieap.form.DateTextBox" id="date003" displayFormatter="{dataFormat:'yyyy-MM-dd'}" autoDate="false"></div>
			</div>
		</td>
		<td>
		&nbsp;&nbsp;&nbsp;&nbsp;
		</td>
		<td>
			<div dojoType="unieap.layout.TitlePane"  width="400px" height="150px" title="日期控件其他样式">
				<BR/>带时间的日期控件 ：<div dojoType="unieap.form.DateTextBox" popup="{showsTime:24}" displayFormatter="{dataFormat:'yyyy-MM-dd HH:mm:ss'}"></div>
			    <BR/>不显示其他月份的日期控件 ：<div dojoType="unieap.form.DateTextBox" popup="{showsOtherMonths:false}"></div>
			    
			</div>
		</td>
	</tr>
	
    <tr>
		<td>
			<div dojoType="unieap.layout.TitlePane"  width="400px" height="150px" title="日期控件数据绑定">
			    <BR/>绑定值的日期控件(日期是当月第一天)：<div dojoType="unieap.form.DateTextBox" id="date101" displayFormatter="{dataFormat:'yyyy-MM-dd'}" binding="{name:'datebinging'}"></div>

			</div>
		</td>
		<td>
		&nbsp;&nbsp;&nbsp;&nbsp;
		</td>
		<td>
			<div dojoType="unieap.layout.TitlePane"  width="400px" height="150px" title="日期控件取值">
			<font color="red">※日期控件的值形式为长整形，方便后台java程序直接进行日期转换</font>
			<BR>日期控件(格式为yyyy-MM-dd)：<div dojoType="unieap.form.DateTextBox" id="date301" displayFormatter="{dataFormat:'yyyy-MM-dd'}"></div>
			<BR><div dojoType="unieap.form.Button" label="点击查看上面日期控件的值" onclick="getValue();">
			</div>
		</td>
	</tr>
	
</table>
</div>
</body>
</html>	
	