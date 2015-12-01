<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ include file="/unieap/ria3.3/pages/config.jsp"%>
 
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		</meta>
		<title>下拉框级联</title>
		<style type="text/css">
			@import "<%=appPath%>/pages/samples/syntaxHighlighter/Styles/SyntaxHighlighter.css";
		</style>
		<script type="text/javascript"
			src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shCore.js"></script>
		<script type="text/javascript"
			src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shBrushXml.js"></script>
		<script type="text/javascript"
			src="<%=appPath%>/pages/samples/form/combobox/comboBox_cascade.js"></script>
	</head>
	<body class="unieap">
		<div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="表单下拉框控件级联功能说明">
			·下拉列表支持ComboBox组件间的级联，可以简单的通过设置cascade属性实现级联。			
		</div>
		<div dojoType="unieap.layout.TitlePane" title="表单下拉框控件级联样例"
			style="width: 100%;">
			<div dojoType="unieap.form.FieldSet" title="设置cascade的filterAttr属性实现级联" style="margin-right:50px">
				<table>
					<tr>
						<td>省份：</td>
						<td>
							<div dojoType="unieap.form.ComboBox" id='p_combobox'
								 popup="{displayStyle:'table'}"
								 dataProvider="{'store':'province_store'}"></div>
						</td>
					</tr>
					<tr>
						<td>
							城市：
						</td>
						<td>
							<div cascade="{primary:'p_combobox',filterAttr:'filter'}"
								 dojoType="unieap.form.ComboBox" id='c_combobox'
								 popup="{displayStyle:'table'}"
								 dataProvider="{'store':'city_store'}"></div>	
						</td>
					</tr>
				</table>
			</div>
			<div dojoType="unieap.form.FieldSet" title="设置cascade的getCascadeStore属性实现级联">
				<table>
					<tr>
						<td>
							省份：
						</td>
						<td>
							<div dojoType="unieap.form.ComboBox" id='p_combobox1'
								 popup="{displayStyle:'table'}" dataProvider="{'store':'province_store'}"></div>
						</td>
					</tr>
					<tr>
						<td>城市：
						</td>
						<td>
							<div cascade="{primary:'p_combobox1',getCascadeStore:getCascadeStore}"
								 dojoType="unieap.form.ComboBox" id='c_combobox1'
								 popup="{displayStyle:'table'}"
								 dataProvider="{'store':'city_store'}"></div>
						</td>
					</tr>
				</table>
			</div>
		</div>
		<div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="表单下拉框控件级联功能源码">
			<textarea name="code" class="html">
				<!-- 设置cascade的filterAttr属性实现级联-->
				<script type="text/javascript">
					var province = new unieap.ds.DataStore('province_store', [
						{CODEVALUE: 11,CODENAME: '浙江'}, 
						{CODEVALUE: 12,CODENAME: '辽宁'}
					]);
				
					var city = new unieap.ds.DataStore('city_store', [
						//注意此处的filter属性,它指向province的CODEVALUE
					    {CODEVALUE: 1,CODENAME: '宁波',filter: 11},
						{CODEVALUE: 2,CODENAME: '宁海',filter: 11},
						{CODEVALUE: 4,CODENAME: '沈阳',filter: 12}, 
						{CODEVALUE: 15,CODENAME: '大连',filter: 12}
					]);
					dataCenter.addDataStore(province);
					dataCenter.addDataStore(city);
				</script>
				<div dojoType="unieap.form.ComboBox" id='p_combobox'
					 popup="{displayStyle:'table'}"
					 dataProvider="{'store':'province_store'}">
				</div>
				<div cascade="{primary:'p_combobox',filterAttr:'filter'}"
					 dojoType="unieap.form.ComboBox" id='c_combobox'
					 popup="{displayStyle:'table'}"
					 dataProvider="{'store':'city_store'}">
				</div>
				
				<!-- 实现cascade的getCascadeStore属性实现级联 -->
				<script type="text/javascript">
					var city1 = new unieap.ds.DataStore('city_store1', [
						{CODEVALUE: 1,CODENAME: '宁波'},
						{CODEVALUE: 2,CODENAME: '宁海'},
						{CODEVALUE: 3,CODENAME: '温州'}
					]);
					
					var city2 = new unieap.ds.DataStore('city_store2', [
						{CODEVALUE: 4,CODENAME: '沈阳'},
						{CODEVALUE: 15,CODENAME: '大连'},
						{CODEVALUE: 16,CODENAME: '金州'}
					]);
					
					function getCascadeStore(item){
						if(item==11){ //代表浙江省
							return 'city_store1'
						}else if(item==12){ //代表辽宁省
							return 'city_store2'
						}
					}
					dataCenter.addDataStore(city1);
					dataCenter.addDataStore(city2);
				</script>
			
				<div dojoType="unieap.form.ComboBox" id='p_combobox1'
					 popup="{displayStyle:'table'}"
					 dataProvider="{'store':'province_store'}">
				</div>
				<div cascade="{primary:'p_combobox1',getCascadeStore:getCascadeStore}"
					 dojoType="unieap.form.ComboBox" id='c_combobox1'
					 popup="{displayStyle:'table'}"
					 dataProvider="{'store':'city_store'}">
				</div>
			</textarea>
		</div>
	</body>
</html>