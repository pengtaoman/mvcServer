<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ include file="/unieap/ria3.3/pages/config.jsp"%>
 
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		</meta>
		<title></title>
		<style type="text/css">
			@import "<%=appPath%>/pages/samples/syntaxHighlighter/Styles/SyntaxHighlighter.css";
		</style>
		<script type="text/javascript"
			src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shCore.js"></script>
		<script type="text/javascript"
			src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shBrushXml.js"></script>
	    <script type="text/javascript"
			src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shBrushJScript.js"></script>
		<script type="text/javascript"
			src="<%=appPath%>/pages/samples/tree/js/collapseAllNodesData.js"></script>	
		<script type="text/javascript"
			src="<%=appPath%>/pages/samples/tree/bindForm.js"></script>
	</head>
	<body class="unieap">
		<div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="树节点与form绑定">
			·在点击树节点的时候，得到当前节点的Row对象，并绑定到Form组件上；<br>
		    ·在label对应的字段发生变化的时候，调用树的freshNodeLabel方法，将会刷新节点的显示值。
		</div>
		<div dojoType="unieap.layout.TitlePane" title="绑定form"
			style="width: 100%;">
			<table style="width: 100%;table-layout:fixed">
				<tr>
					<td style="width:40%">
						<div dojoType="unieap.tree.Tree" id="formTree" onClick="bindData" label="UniEAP"  binding = "{'leaf':'leaf','store':treeStorePart,'label':'label','parent':'parentID',query:{name:'parentID',relation:'=',value:'1212403325756'}}">
						</div>
					</td>
					<td style="width:60%;font-size: 13px;font-family: 宋体" valign="top">
						<div dojoType = "unieap.form.Form" id="treeNodeForm">
						   <table  >
							<tr style="margin-right:20px">
								<td style="font-size: 12px;font-family: 宋体">
									名称:
								</td>
								<td>
									<div dojoType="unieap.form.TextBox"
										binding="{name:'label'}"  onBlur="setTreeValue" style="margin-right:20px"></div>
								</td>
								<td style="font-size: 12px;font-family: 宋体;">
									类型:
								</td>
								<td>
									<div dojoType="unieap.form.TextBox"
										binding="{name:'type'}"></div>
								</td>
							</tr>
							<tr style="margin-right:20px">
								<td style="font-size: 12px;font-family: 宋体">
									location:
								</td>
								<td>
									<div dojoType="unieap.form.TextBox"
										binding="{name:'location'}"  style="margin-right:20px"></div>
								</td>
								<td style="font-size: 12px;font-family: 宋体;">
									pagearea:
								</td>
								<td>
									<div dojoType="unieap.form.TextBox"
										binding="{name:'pagearea'}"></div>
								</td>
							</tr>
						</table>
						</div>
					</td>
				</tr>
			</table>
		</div>
		<div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="树节点与form绑定">
			<textarea name="code" class="html">
			     <div dojoType="unieap.tree.Tree" 
                     id="formTree" 
                     onClick="bindData" label="UniEAP"  
                     binding = "{'leaf':'leaf','store':treeStorePart,'label':'label','parent':'parentID',query:{name:'parentID',relation:'=',value:'1212403325756'}}">
				  </div>
			</textarea>
			<textarea name="code" class="js">
			function bindData(node){
				var row = node.getTree().getBinding().getRow(node);
				unieap.byId("treeNodeForm").getBinding().bind(row)
			}
			function setTreeValue(value){
               var node = formTree.getCurrentNode();
               unieap.byId("formTree").fireDataChange(node);
            }
		   </textarea>
		</div>
	</body>
</html>