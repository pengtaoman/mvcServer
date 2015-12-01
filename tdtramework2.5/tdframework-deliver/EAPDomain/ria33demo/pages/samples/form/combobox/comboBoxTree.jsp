<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ include file="/unieap/ria3.3/pages/config.jsp"%>
 
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		</meta>
		<title>comboboxtree</title>
		<style type="text/css">
			@import "<%=appPath%>/pages/samples/syntaxHighlighter/Styles/SyntaxHighlighter.css";
		</style>
		<script type="text/javascript"
			src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shCore.js"></script>
		<script type="text/javascript"
			src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shBrushXml.js"></script>
		<script type="text/javascript"
			src="<%=appPath%>/pages/samples/form/combobox/comboBoxTree.js"></script>
	</head>
	<body class="unieap">
		<div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="表单下拉树控件说明">
			·多选树重设数据源；<br>
			·getValue/setValue；<br>
			·懒加载树。
		</div>
		
		<div dojoType="unieap.layout.TitlePane" title="表单下拉树控件样例" style="width: 100%;">
			<div dojoType="unieap.layout.TabContainer" style="height:120px;width:100%">
				<div dojoType="unieap.layout.ContentPane" title="清空和重设数据源">
					<table width="100%">
				<tr>
					<td style="font-size: 13px;font-family: 宋体;width:150px">
						下拉树:
					</td>
					<td>
						<div id="combobox_tree1"
							dojoType="unieap.form.ComboBoxTree" value="111"
							treeJson="{binding:{store:'person_store',leaf:'leaf',query:{
							name:'parent',
							relation:'=',
							value:''
							}}}">
						</div>
					</td>
				</tr>
				<tr>
					<td style="font-size: 13px;font-family: 宋体;width:150px">
						清空下拉树:
					</td>
					<td>
						<div dojoType="unieap.form.Button" label="清空下拉树" onclick="fn_clear"/>
					</td>
				</tr>
				<tr>
					<td style="font-size: 13px;font-family: 宋体;width:150px">
						重新设置下拉树内容:
					</td>
					<td>
						<div dojoType="unieap.form.Button" label="重新设置下拉树" onclick="changeStore()"/>
					</td>
				</tr>
			</table>
				</div>
 		    	<div dojoType="unieap.layout.ContentPane" title="多选树"><br>
					<div id="combobox_tree"
						dojoType="unieap.form.ComboBoxTree" value="111"
						treeJson="{checkLogic:{model:'multiple'}, binding:{store:'person_store',leaf:'leaf',query:{
						name:'parent',
						relation:'=',
						value:''
						}}}">
					</div>
					<br>
					<div dojoType="unieap.form.Button" label="点击设置值(setValue)" onclick="fn_setValue"></div>&nbsp;&nbsp;&nbsp;
					<div dojoType="unieap.form.Button" label="点击清空数据" onclick="fn_clearTree"></div>&nbsp;&nbsp;&nbsp;
					<div dojoType="unieap.form.Button" label="点击获取值(GetValue)" onclick="fn_getValue"></div>
				</div>
				
				<div dojoType="unieap.layout.ContentPane" title="懒加载树">
					<div dojoType="unieap.form.Form" binding="{store:'form_ds'}">
						<div dojoType="unieap.form.ComboBoxTree" binding="{name:'number'}"
						     dataProvider="{label:'info'}"
						     treeJson="{label:'懒加载树',loader:{url:'getLazyData.do?method=getData'},binding:{store:'lazyStore',leaf:'leaf',parent:'parentID',query:{name:'parentID',relation:'=',value:''}}}"
						></div><br>
						懒加载树的数据未全部加载，所以无法找到对应ID值，因此需要用户自己设置ID；
					</div>
				</div>
			</div>
		</div>
		<div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="表单下拉树控件源码">
			<textarea name="code" class="html">

			<!-- 生成一棵下拉树 -->
			<div dojoType="unieap.form.ComboBoxTree" value="111"
				 treeJson="{binding:{store:'person_store',leaf:'leaf',query:{
					name:'parent',
					relation:'=',
					value:''
				}}}">
			</div>
			
			<!-- 清空下拉树文本框中的数据 -->
			<script type="text/javascript">
				function fn_clear(){
					unieap.byId('combobox_tree').clear();
				}
				
				//调用setTreeJson方法重新生成一棵下拉树
				function changeStore(){
					unieap.byId('combobox_tree').setTreeJson({
						label: '新的树',
						binding: {
							leaf: 'leaf',
							store: 'neusoft_store',
							query: {
								name: 'parent',
								relation: '=',
								value: ''
							}
						}
					});
				}
			</script>
			
			
			<!-- 下拉树的setValue和getValue方法,此时下拉树为复选树 -->
			<script type = "text/javascript">
				function fn_setValue(){				
					unieap.byId('combobox_tree').setValue("112");
					alert("控件中显示中学生");
				}
				function fn_getValue(){				
					var value = unieap.byId('combobox_tree').getValue();
					alert("从下拉树取出的值为:"+value);
				}
			</script>
			
			<div id="combobox_tree"
				dojoType="unieap.form.ComboBoxTree" value="111"
				treeJson="{checkLogic:{model:'multiple'}, binding:{store:'person_store',leaf:'leaf',query:{
					name:'parent',
					relation:'=',
					value:''
				}}}">
			</div>
			
			<!--下拉树为懒加载树-->
			<script type="text/javascript">
				var form_ds=new unieap.ds.DataStore("form_ds",[
					{number:'10011',info:'01-01'}
				]);
				dataCenter.addDataStore(form_ds);
			</script>
			<div dojoType="unieap.form.Form" binding="{store:'form_ds'}">
				<div dojoType="unieap.form.ComboBoxTree" binding="{name:'number'}"
					     dataProvider="{label:'info'}"
						 <!-- loader表示从后台读取数据-->
					     treeJson="{label:'懒加载树',loader:{url:'getLazyData.do?method=getData'},
						 binding:{store:'lazyStore',leaf:'leaf',parent:'parentID',query:{name:'parentID',relation:'=',value:''}}}">	
				</div>
			</div>
			</textarea>
		</div>
	</body>
</html>