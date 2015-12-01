<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8" %>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
        </meta>
		<title></title>
        <%@ include file="/unieap/ria3.3/pages/config.jsp" %>
        <script type="text/javascript" src="../treeData.js"></script>
		<script type="text/javascript" src="test_dialog_height.js"></script>
    </head>
   	<body class="unieap">
   		<table>
			<tr>
				<td>
					<div dojoType="unieap.layout.TitlePane" title="树控件" style="width:250px;height:400px">
						<div dojoType="unieap.tree.Tree" id="basicTree"   label="UniEAP"
							binding = "{leaf:'leaf',store:'testTreeDataStore',parent:'parentID',query:{name:'parentID',relation:'=',value:'1212403325756'} }">
						</div>
					</div>
				</td>
				
				<td>
					<div dojoType="unieap.layout.TitlePane" title="下拉树" style="width:250px;height:400px">
						<div dojoType="unieap.form.ComboBoxTree" id='combo_tree',
							popup="{width:'300px',height:'400px'}",
							separator:",",
							treeJson="{label:'UniEAP',binding:{leaf:'leaf',store:'testTreeDataStore',parent:'parentID',query:{name:'parentID',relation:'=',value:'1212403325756'}}}">
						</div>
					</div>
				</td>
			</tr>
		</table>
	</body>
</html>