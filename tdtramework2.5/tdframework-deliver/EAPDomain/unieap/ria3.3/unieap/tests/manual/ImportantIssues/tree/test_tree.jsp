<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8" %>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>树测试</title>
		<%@ include file="/unieap/ria3.3/pages/config.jsp" %>
		<script type="text/javascript" src="../treeData.js"></script>
		<script type="text/javascript" src="test_tree.js"></script>
    </head>
    <body class="unieap">
    	<div dojoType="unieap.layout.TabContainer" style="height:100%;width:100%;">
    		<div dojoType="unieap.layout.ContentPane" title="树测试 - 1">
				<div dojoType="unieap.layout.TitlePane" open="open" title="[U_EAP00011605]">
					<span style="font-size:9pt;color:blue">
						测试说明：
						<br>
						此测试用例用于验证RIA缺陷：[U_EAP00011605]
						<br>
						预期结果：
						<br>
						当名称过长时，树选中时背景色能够全部覆盖。
						<br>
					</span>
					<table>
						<tr>
							<td>
								<div dojoType="unieap.layout.TitlePane" title="树控件" style="width:400px;height:400px">
									<div dojoType="unieap.tree.Tree" id="basicTree"   label="UniEAP"
										binding = "{leaf:'leaf',store:'testTreeDataStore',parent:'parentID',query:{name:'parentID',relation:'=',value:'1212403325756'} }">
									</div>
								</div>
							</td>
							
							<td>
								<div dojoType="unieap.layout.TitlePane" title="下拉树" style="width:400px;height:400px">
									<div dojoType="unieap.form.ComboBoxTree" id='combo_tree',
										popup="{width:'300px',height:'400px'}",
										separator:",",
										treeJson="{label:'UniEAP',binding:{leaf:'leaf',store:'testTreeDataStore',parent:'parentID',query:{name:'parentID',relation:'=',value:'1212403325756'}}}">
									</div>
								</div>
							</td>
						</tr>
					</table>
				</div>
			</div>
			
			<div dojoType="unieap.layout.ContentPane" title="树测试 - 2">
				<div dojoType="unieap.layout.TitlePane" open="open" title="[U_EAP00011822]">
					<span style="font-size:9pt;color:blue">
						测试说明：
						<br>
						此测试用例用于验证RIA缺陷：[U_EAP00011822]
						<br>
						预期结果：
						<br>
						Tree控件expandNodeByPath提供回调函数。
						<br>
						点击按钮，展开'数据结构'节点，并弹出信息框，调用回调函数
					</span>
					<div dojoType="unieap.tree.Tree" id="t_tree" label="UniEAP"
						binding = "{leaf:'leaf',store:'testTreeDataStore',parent:'parentID',query:{name:'parentID',relation:'=',value:'1212403325756'} }">
					</div>
					<br>
					<div dojoType="unieap.form.Button" label="展开节点" onClick="expandNodeByPath"></div>
					<div dojoType="unieap.form.Button" label="合并节点" onClick="coolapse"></div>
				</div>
			</div>
			
			<div dojoType="unieap.layout.ContentPane" title="树测试 - 3">
				<div dojoType="unieap.layout.TitlePane" open="open" title="[U_EAP00011823]">
					<span style="font-size:9pt;color:blue">
						测试说明：
						<br>
						此测试用例用于验证RIA缺陷：[U_EAP00011823]
						<br>
						预期结果：
						<br>
						Tree控件提供根据路径选中某个节点的功能。
						<br>
					</span>
				</div>
			</div>
    	</div>
    </body>
</html>