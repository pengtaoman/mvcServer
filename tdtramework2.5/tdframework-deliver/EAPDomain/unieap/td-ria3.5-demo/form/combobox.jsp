<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		</meta>
		<%@ include file="/unieap/ria3.3/pages/config.jsp" %>
		<contextPath value="<%=path%>"/>
		<script type="text/javascript">
			
			var comboxData = new unieap.ds.DataStore('combox01', dojo.fromJson("[" + 
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
			dataCenter.addDataStore(comboxData);   
			
			function getValue() {
				alert(unieap.byId('separatorCombo').getValue());
			}

			//级联数据
			var city = new unieap.ds.DataStore('city_store', [{
			    CODEVALUE: 1,
			    CODENAME: '宁波',
			    filter: 11
			}, {
			    CODEVALUE: 2,
			    CODENAME: '宁海',
			    filter: 11
			}, {
			    CODEVALUE: 3,
			    CODENAME: '温州',
			    filter: 11
			}, {
			    CODEVALUE: 4,
			    CODENAME: '沈阳',
			    filter: 12
			}, {
			    CODEVALUE: 15,
			    CODENAME: '大连',
			    filter: 12
			}, {
			    CODEVALUE: 16,
			    CODENAME: '金州',
			    filter: 12
			}]);
			
			var province = new unieap.ds.DataStore('province_store', [{
			    CODEVALUE: 11,
			    CODENAME: '浙江'
			}, {
			    CODEVALUE: 12,
			    CODENAME: '辽宁'
			}]);
			
			dataCenter.addDataStore(province);
			dataCenter.addDataStore(city);
			
			function getCascadeStore(value){
				if(value==11){
					return 'city_store'
				}else if(value==12){
					return 'combox01'
				}
			}
			
		    //comboBox 树
		    var comboxTree = "[{id:'1001',label:'辽宁',parent:'',leaf:false},"+
                 "{id:'10011',label:'沈阳',parent:'1001',leaf:true},"+
				 "{id:'10013',label:'大连',parent:'1001',leaf:true},"+
				 "{id:'10014',label:'鞍山',parent:'1001',leaf:true},"+
				 "{id:'10015',label:'盘锦',parent:'1001',leaf:true},"+
				 "{id:'10016',label:'锦州',parent:'1001',leaf:true},"+
				 "{id:'10017',label:'营口',parent:'1001',leaf:true},"+
				 "{id:'10018',label:'大石桥',parent:'1001',leaf:true},"+
				 "{id:'10019',label:'熊岳',parent:'1001',leaf:true},"+
				 "{id:'10020',label:'盖县',parent:'1001',leaf:true},"+
				 "{id:'1002',label:'广州', parent:'',leaf:false},"+
				 "{id:'1003',label:'深圳', parent:'1002',leaf:true}]";
				var dsComTree=new unieap.ds.DataStore("comTree",dojo.fromJson(comboxTree));
				dataCenter.addDataStore(dsComTree);
		
		</script>
		
	</head>
<body class="unieap">
<font color="red"></font>
<div dojoType="unieap.form.Form" binding="{store:'formData_store'}">
<table border="0">
	<tr>
		<td>
			<div dojoType="unieap.layout.TitlePane"  width="400px" height="200px" title="基本ComboBox">
			    <BR>与JSON绑定的的ComboBox：<div dojoType="unieap.form.ComboBox" id="combox01" dataProvider="{store:'combox01'}" binding="{name:'CODENAME',value:'CODEVALUE'}"></div>
			</div>
		</td>
		<td>
		&nbsp;&nbsp;&nbsp;&nbsp;
		</td>
		<td>
			<div dojoType="unieap.layout.TitlePane"  width="400px" height="200px" title="ComboBox其他形式">
				带复选框的选择项 ：<select dojoType="unieap.form.ComboBox" id="separatorCombo" separator="," popup="{displayStyle:'multi'}" dataProvider="{store:'combox01'}"></select>
			    <div dojoType="unieap.form.Button" label="点击取得上面ComboBox的值" onclick="getValue();"></div><BR/>
			    <BR/>列表选择项1 ：<select dojoType="unieap.form.ComboBox" id="separatorCombo001" separator="," popup="{displayStyle:'table'}" dataProvider="{store:'combox01'}"></select>
                <BR/>列表选择项2 ：<div  dojoType="unieap.form.ComboBox"  popup="{structure:{rows:[{title:'<strong>地点</strong>',field:'CODENAME'},{title:'代码',field:'CODEVALUE'}]}}" dataProvider="{'store':'combox01'}" ></div>
			</div>
		</td>
	</tr>
	
    <tr>
		<td>
			<div dojoType="unieap.layout.TitlePane"  width="400px" height="200px" title="ComboBox级联">
			                 （过滤级联）省份:<div  dojoType="unieap.form.ComboBox" id='p_combobox' popup="{displayStyle:'table'}" dataProvider="{'store':'province_store'}" ></div>
			                    城市:<div cascade="{primary:'p_combobox',filterAttr:'filter'}" dojoType="unieap.form.ComboBox" id='c_combobox' popup="{displayStyle:'table'}" dataProvider="{'store':'city_store'}" ></div>
			    <BR/>（切换数据级联）省份:<div  dojoType="unieap.form.ComboBox" id='p_combobox01' popup="{displayStyle:'table'}" dataProvider="{'store':'province_store'}" ></div>
                                                 城市:<div cascade="{primary:'p_combobox01',filterAttr:'filter',getCascadeStore:getCascadeStore}" dojoType="unieap.form.ComboBox" id='c_combobox01' popup="{displayStyle:'table'}" dataProvider="{'store':'city_store'}" ></div>
			</div>
		</td>
		<td>
		&nbsp;&nbsp;&nbsp;&nbsp;
		</td>
		<td>
			<div dojoType="unieap.layout.TitlePane"  width="400px" height="200px" title="ComboBox Tree">
			<BR/>单选ComboBoxTree：<div dojoType="unieap.form.ComboBoxTree" id="ComboBoxTree01" separator:"," treeJson="{label:'UniEAP',binding:{leaf:'leaf',store:'comTree',query:{name:'parent',relation:'=',value:''}}}" onChange="this.getPopup().close();"></div>
			<BR/>复选ComboBoxTree：<div dojoType="unieap.form.ComboBoxTree" id="ComboBoxTree02" separator:"," treeJson="{label:'UniEAP',checkLogic:{model:'multiple'},binding:{leaf:'leaf',store:'comTree',query:{name:'parent',relation:'=',value:''}}}"></div>
			</div>
		</td>
	</tr>
	
</table>
</div>


</body>
</html>	
	