<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		</meta>
		<%@ include file="/unieap/ria3.3/pages/config.jsp" %>
		<contextPath value="<%=path%>"/>
		<script type="text/javascript">
		    var deptName = new unieap.ds.DataStore('deptName_store', dojo.fromJson("["+
				"{CODEVALUE: 1,CODENAME: '部门I'},"+
				"{CODEVALUE: 2,CODENAME: '部门II',check:1},"+
				"{CODEVALUE: 3,CODENAME: '部门III'}"+
			"]"));
			dataCenter.addDataStore(deptName);
			
			
			var city = new unieap.ds.DataStore('city_store', dojo.fromJson("[" + 
			                                          		"{CODEVALUE: 1,CODENAME: '浙江'}," + 
			                                          		"{CODEVALUE: 2,CODENAME: '辽宁'}," + 
			                                          		"{CODEVALUE: 3,CODENAME: '福建'}," + 
			                                          		"{CODEVALUE: 4,CODENAME: '沈阳'}," + 
			                                          		"{CODEVALUE: 5,CODENAME: '北京'}," + 
			                                          		"{CODEVALUE: 6,CODENAME: '宁海'}," + 
			                                          		"{CODEVALUE: 7,CODENAME: '宁波'}," + 
			                                          		"{CODEVALUE: 8,CODENAME: '水车'}," + 
			                                          		"{CODEVALUE: 15,CODENAME: '上园'}," + 
			                                          		"{CODEVALUE: 16,CODENAME: '下园'}" + 
			                                          	"]"));
			dataCenter.addDataStore(city);
			
			
			
			function setValue() {
				unieap.byId('CheckboxGroup202').setValue('2,5');
			}
			
			function getValue() {
				alert(unieap.byId('CheckboxGroup302').getValue());
			}
            
		
		</script>
		
	</head>
<body class="unieap">
<font color="red"></font>
<div dojoType="unieap.form.Form">
<table border="0">
	<tr>
		<td>
			<div dojoType="unieap.layout.TitlePane"  width="400px" height="150px" title="复选框控件">
			    <BR>单独的复选框：<div dojoType="unieap.form.CheckBox" checked="true" checkedValue="yes" ></div><font color="red"></font>
				<BR>与JSON绑定的复选框组：<div id="customerDept" labelAlign="right" dojoType="unieap.form.CheckBoxGroup" cols="3"
                                            dataProvider="{'store':'deptName_store'}" ></div>
			</div>
		</td>
		<td>
		&nbsp;&nbsp;&nbsp;&nbsp;
		</td>
		<td>
			<div dojoType="unieap.layout.TitlePane"  width="400px" height="150px" title="复选框控件样式">
				<BR/>选项分4列显示，文字在左边 ：<div id="CheckboxGroup" cols="4" labelAlign="left" dojoType="unieap.form.CheckBoxGroup" 
				                         dataProvider="{'store':'city_store'}">
                                      </div>
			</div>
		</td>
	</tr>
	
    <tr>
		<td>
			<div dojoType="unieap.layout.TitlePane"  width="400px" height="150px" title="复选框控件设值">
			    <BR/><div id="CheckboxGroup202" cols="4" labelAlign="left" dojoType="unieap.form.CheckBoxGroup" 
				                         dataProvider="{'store':'city_store'}">
                                      </div>
                <BR><div dojoType="unieap.form.Button" label="点击设置上面复选框的2、5为选中状态" onclick="setValue();">
			</div>
		</td>
		<td>
		&nbsp;&nbsp;&nbsp;&nbsp;
		</td>
		<td>
			<div dojoType="unieap.layout.TitlePane"  width="400px" height="150px" title="复选框控件取值">
			<BR/><div id="CheckboxGroup302" cols="4" labelAlign="left" dojoType="unieap.form.CheckBoxGroup" 
				                         dataProvider="{'store':'city_store'}">
                                      </div>
                <BR><div dojoType="unieap.form.Button" label="点击取得选中复选框的值" onclick="getValue();">
			</div>
		</td>
	</tr>
	
</table>
</div>


</body>
</html>	
	