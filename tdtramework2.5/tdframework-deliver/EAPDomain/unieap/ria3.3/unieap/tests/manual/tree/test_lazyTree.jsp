<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8" %>
<html>
    <head>
        <title>unieap.tree.Tree Unit Test---Test For CheckLogic</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		 <%@ include file="/unieap/ria3.3/pages/config.jsp" %>
		<script type="text/javascript" src="test_lazyTree.js"></script>
    </head>
    <body class="unieap">
    	<div dojoType="unieap.layout.TitlePane" title="用例说明" height=120px open="false">
			测试功能点：
					本测试用来测试删除树节点的方法，分一下几种情况：</li>
					<li>懒加载删除节点</li>
					<li>树的数据来源是树型结构</li>
					<li>树的数据来源是平面结构</li>
					<li>懒加载树节点全部展开功能验证</li>
	  	</div>
		  <div  dojoType="unieap.layout.TitlePane" title="测试用例" >
				<table width="100%" height="100%">
					<colgroup>
						<col width="25%"></col>
						<col width="25%"></col>
						<col width="25%"></col>
						<col width="25%"></col>
					</colgroup>
					<tr >
						<td valign="top">
							<div dojoType="unieap.tree.Tree" 
								 id="lazytree" 
								 label="rowset tree" 
								 checkLogic="{model:'childCascade',showRootCheckbox:true}"
								 loader="{'url':unieap.WEB_APP_NAME+'/getLazyData.do?method=getTrueData'}" 
								 binding = "{'leaf':'leaf','id':'UP_TREE_TEST_ID','label':'UP_TREE_TEST_LABEL','parent':'UP_TREE_TEST_PARENTID',query:{name:'UP_TREE_TEST_PARENTID',relation:'=',value:'unieap_ria_tree_id_for_root'}}">
							</div>
						</td>
						<td valign="top">
							<div dojoType="unieap.form.Button" label="deleteLazyNode" onClick="deleteLazyNode"></div><br />
							<div dojoType="unieap.form.Button" label="deleteLazyItem" onClick="deleteLazyItem"></div><br />	
							<div dojoType="unieap.form.Button" label="deleteLazyData" onClick="deleteLazyData"></div>	<br />	
							<div dojoType="unieap.form.Button" label="getStores" onClick="getStores"></div>	<br />	
							<div dojoType="unieap.form.Button" label="setDataStore" onClick="setDataStore"></div>	<br />	
							<div dojoType="unieap.form.Button" label="setDataStore2" onClick="setDataStore2"></div>	<br />	
							<div dojoType="unieap.form.Button" label="expandAllNodes" onClick="expandAllNodes"></div><br /> 
						</td>
						<td valign="top">
							<div dojoType="unieap.tree.Tree" 
								 id="jsontree" 
								 label="json tree" 
								 loader="{'url':unieap.WEB_APP_NAME+'/getLazyData.do?method=getJsonData'}" 
								 binding = "{'bindingClass' :'unieap.tree.JsonTreeBinding',
								 			 'leaf':'leaf',
											 'label':'text',
											 'id':'id'}">
							</div>
						</td>
						<td valign="top">
							
							<div dojoType="unieap.form.Button" label="deleteNode" onClick="deleteNode"></div><br />
							<div dojoType="unieap.form.Button" label="getData" onClick="getData"></div><br />
							<div dojoType="unieap.form.Button" label="expandAllNodes" onClick="expandJsonNodes"></div></br>
						</td>
					</tr>
		 
				</table>
		        </div>
					<div  dojoType="unieap.layout.TitlePane" title="说明" >
						本样例只把第一层节点的store放到了dataCenter中，使用Alt+x可以查看，其它层次节点在加载后点击按钮&lt;getStores&gt;可以查看
						<table border="1" bordercolor="#99BBE8" style="margin-top:20px;width:auto">
							<colgroup>
								<col style="width:25%"></col>
								<col style="width:30%"></col>
								<col style="width:45%"></col>
							</colgroup>
							<tr height="30px">
								<td><strong>功能点描述</strong></td>
								<td><strong>操作过程</strong></td>
								<td><strong>预期结果</strong></td>
							</tr>
							<tr height="30px">
								<td style="vertical-align:top">删除rowset tree的节点</td>
								<td style="vertical-align:top">在rowset tree上选择一节点后（注意根节点应做测试），点击&lt;deleteLazyNode&gt;按钮</td>
								<td style="vertical-align:top">选择的节点被删除;点击&lt;getStores&gt;被删节点的子节点的也被查询出来，并且数据被取出放到rowset的delete缓冲区中</td>
							</tr>
							<tr height="30px">
								<td style="vertical-align:top">删除rowset tree的数据</td>
								<td style="vertical-align:top">在rowset tree上选择一节点后（注意根节点应做测试），点击&lt;deleteLazyItem&gt;按钮</td>
								<td style="vertical-align:top">
									页面无变化;点击&lt;getStores&gt;被删节点的子节点的也被查询出来，并且数据被取出放到rowset的delete缓冲区中</td>
							</tr>
							<tr height="30px">
								<td style="vertical-align:top">删除rowset tree绑定的store的数据</td>
								<td style="vertical-align:top">点击&lt;deleteLazyData&gt;按钮</td>
								<td style="vertical-align:top">第0个节点被删除，其子节点数据被取出放到rowset的delete缓冲区中</td>
							</tr>
							<tr height="30px">
								<td style="vertical-align:top">懒加载树复选逻辑（json tree不支持）</td>
								<td style="vertical-align:top">选中rowset tree的之后展开查看其子节点是否被选中</td>
								<td style="vertical-align:top">子节点被选中</td>
							</tr>
							<tr height="30px">
								<td style="vertical-align:top">设置节点store</td>
								<td style="vertical-align:top">选中一节点，点击&lt;setDataStore&gt;按钮（query为“id=1”）</td>
								<td style="vertical-align:top">选中节点的子节点变为“基础软件”</td>
							</tr>
							<tr height="30px">
								<td style="vertical-align:top">设置节点store</td>
								<td style="vertical-align:top">选中一节点，点击&lt;setDataStore2&gt;按钮（query为“parent=1”）</td>
								<td style="vertical-align:top">选中节点无子节点</td>
							</tr>
							<tr height="30px">
								<td style="vertical-align:top">删除json tree的节点</td>
								<td style="vertical-align:top">在json tree上选择一节点后（注意根节点应做测试），点击&lt;deleteNode&gt;按钮查看json树的数据中与被删节点相关的数据是否被删除</td>
								<td style="vertical-align:top">选择的节点被删除;点击&lt;getData&gt;节点相关数据被删除</td>
							</tr>
							<tr height="30px">
								<td style="vertical-align:top">json Tree懒加载</td>
								<td style="vertical-align:top">查看json tree是否能加载出数据</td>
								<td style="vertical-align:top">展现成一棵树</td>
							</tr>
							<tr height="30px">
								<td style="vertical-align:top">树懒加载</td>
								<td style="vertical-align:top">当节点无子节点时，且没有配置leaf为false时，查看节点是否为叶子节点样式</td>
								<td style="vertical-align:top">节点为叶子节点的图标</td>
							</tr>
						</table>
					</div>
			 
    </body>
</html>