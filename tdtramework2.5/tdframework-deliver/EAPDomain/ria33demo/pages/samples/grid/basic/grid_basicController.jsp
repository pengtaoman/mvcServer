<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8" %>
<%@ include file="/unieap/ria3.3/pages/config.jsp" %>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>Grid样例</title>
		<style type="text/css">
			@import "<%=appPath%>/pages/samples/syntaxHighlighter/Styles/SyntaxHighlighter.css";
		</style>
		<script type="text/javascript" src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shCore.js"></script>
		<script type="text/javascript" src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shBrushXml.js"></script>
		<script type="text/javascript" src="<%=appPath%>/pages/samples/grid/data.js"></script>
		<script type="text/javascript" src="<%=appPath%>/pages/samples/grid/basic/grid_basicController.js"></script>
    </head>
    <body class="unieap">
	    <div style="line-height:20px;font-size: 13px;font-family: 宋体;" dojoType="unieap.layout.TitlePane" title="说明">
			本样例展示了表格的以下几个方面：<br/>
			·表格的基本方法的调用；<br />
			·表格的默认行高的设置；<br />
		</div>
		<div dojoType="unieap.layout.TabContainer" style="height:85%;width:100%">
		<div dojoType="unieap.layout.ContentPane" title="服务器端排序、修改样式、页面刷新">
			<div id="grid1" dojoType="unieap.grid.Grid" width="auto" height="280px" rows="{defaultRowHeight:40}"
				binding="{store:'empDataStore-sever'}"  views="{rowNumber:true,orderType:'server'}">
						<header>
							<cell name="attr_empno" label="员工编号" width="25%" ></cell>
							<cell name="attr_ename" label="姓名" width="25%"></cell>
							<cell name="attr_job" label="职位" width="25%"></cell>
							<cell name="attr_sal" label="工资" width="25%"></cell>
						</header>
						<toolbar ></toolbar>
			</div>
			<br />
			<table>
				<tr>
					<td width="200px">
						设置默认行高为40px，服务器端排序
					</td>
					<td width="180px">
					</td>
					<td>
					</td>
				</tr>
				<tr>
					<td width="200px">
						设置grid中单元格样式：
					</td>
					<td width="180px">
						<div dojoType="unieap.form.Button" label="setCellStyles()" width="160px" onClick="setCellStyles()"></div>
					</td>
					<td>
						第一个单元格字体样式改为蓝色居右
					</td>
				</tr>				
				<tr>
					<td width="200px">
						修改当前行样式(用于观察页面刷新效果)：
					</td>

					<td width="180px">
						<div dojoType="unieap.form.Button" label="changeRowStyle()" width="160px" onClick="changeRowStyle()"></div>
					</td>
					<td>
						为观察页面刷新的效果，下拉滚动条，将焦点落在某行并点击按钮修改样式，可以更方便看到页面刷新的刷新效果
					</td>
				</tr>
				<tr>
					<td width="200px">
						刷新单元格：
					</td>
					<td width="180px">
						<div dojoType="unieap.form.Button" label="refreshCell()" width="160px" onClick="refreshCell"></div>
					</td>
					<td>
						修改刷新第一个单元格,数据变为3,左上角出现红三角(修改标志)
					</td>
				</tr>			
			</table>
		<div dojoType="unieap.layout.TitlePane" title="代码说明" open="false" width="98%">
			<textarea name="code" class="html">
				<script type="text/javascript">
					//设置行样式
					function changeRowStyle(){
						var rowIndex = unieap.byId("grid1").getRowManager().getCurrentRowIndex();
						if(rowIndex<0){
							alert("请选中一行");
						}
						var vm = unieap.byId("grid1").getViewManager();
						vm.setRowStyles(rowIndex,{"color":"red","textAlign":"center"});
					}
					//设置单元格样式
					function setCellStyles(){
						var vm = unieap.byId("grid1").getViewManager();
						vm.setCellStyles(0,"attr_empno",{"color":"blue","textAlign":"right"});
					}			
					//单元格刷新
					function refreshCell(){
						var data=unieap.byId("grid1").getBinding().getRowData()[0],
							orginNo=data['attr_empno'];
						data['_o']={attr_empno:orginNo};
						data['attr_empno']=3;
						var cell = unieap.byId("grid1").getCell('attr_empno');
						unieap.byId("grid1").getManager('ViewManager').refreshCell(0,cell);
					
					}
	        </script>
			</textarea>
		</div>			
		</div>
		<div dojoType="unieap.layout.ContentPane" title="客户端排序、过滤、全选及索引">		
			
			<div id="grid" dojoType="unieap.grid.Grid" width="auto" height="280px" 
				selection="{selectType:'m'}" binding="{store:'empFilterDataStore'}" edit="{editType:'rowEdit'}" views="{rowNumber:true,orderType:'client'}">
				<header>
					<cell name="attr_empno" label="员工编号" width="25%" editor="{editorClass:'unieap.form.TextBox'}"></cell>
					<cell name="NAME" label="姓名" width="25%" editor="{editorClass:'unieap.form.TextBox'}"></cell>
					<cell name="attr_job" label="职位" width="25%" editor="{editorClass:'unieap.form.TextBox'}"></cell>
					<cell name="attr_sal" label="工资" width="25%" editor="{editorClass:'unieap.form.TextBox'}"></cell>
				</header>
			</div>
			<br/>
			<table>
				<tr>
					<td>
						不设置默认行高，客户端排序
					</td>
					<td></td>
					<td></td>
				</tr>
				<tr>
					<td width="200px">
						设置grid过滤：
					</td>
					<td width="180px">
						<div dojoType="unieap.form.Button" label="setFilter()" width="160px" onClick="setFilter()"></div>
					</td>
					<td>
						过滤出所有名称不为杨作仲且职位为项目经理的数据
					</td>
				</tr>
				<tr>
					<td width="200px">
						取消grid过滤：
					</td>
					<td width="180px">
						<div dojoType="unieap.form.Button" label="cancelFilter()" width="160px" onClick="cancelFilter()"></div>
					</td>
					<td>
						取消grid过滤，显示原始数据
					</td>
				</tr>
				<tr>
					<td width="200px">
						获得选中行行号：
					</td>
					<td width="180px">
						<div dojoType="unieap.form.Button" label="getIndex()" width="160px" onClick="getIndex()"></div>
					</td>
					<td>
						获得选中行号，按逗号分隔
					</td>
				</tr>
				<tr>
					<td width="200px">
						设置全选：
					</td>
					<td width="180px">
						<div dojoType="unieap.form.Button" label="全选" width="160px" onClick="setAllSelect()"></div>
					</td>
				</tr>
				<tr>
					<td width="200px">
						取消全选：
					</td>
					<td>
						<div dojoType="unieap.form.Button" label="取消全选" width="160px" onClick="cancelAllSelect()"></div>
					</td>
				</tr>
			</table>
			<div dojoType="unieap.layout.TitlePane" width="98%" open="false" title="代码说明">
			<textarea name="code" class="html">
				<script type="text/javascript">
					//设置过滤条件		
					function setFilter(){
						var layoutManager=unieap.byId("grid").getManager('LayoutManager');
			 			var filterManager=unieap.byId("grid").getManager('FilterManager');
			 			var filter={
			 				condition:{
			 				A:{name:'attr_job',relation:"=",value:'开发'},
			 				B:{name:'attr_ename',relation:"!=",value:'test'}
			 				},
			 			pattern:" ${A} && ${B} "
			 			}
			 			var cell=layoutManager.getCell('attr_ename');
			 			filterManager.setFilter(cell,filter);
			 			filterManager.doFilter();
					}
					//取消过滤
					function cancelFilter(){
						var filterManager=unieap.byId("grid").getManager('FilterManager');
						filterManager.cancelFilter();
					}
					//取索引
					function getIndex(){
						var sm = unieap.byId("grid").getManager("SelectionManager");
						var index = sm.getSelectedRowIndexs();
						alert(index);
					}
					//设置全选
					function setAllSelect(){
						var sm = unieap.byId("grid").getManager("SelectionManager");
						sm.setAllSelect(true);
					}
					//设置取消全选
					function cancelAllSelect(){
						var sm = unieap.byId("grid").getManager("SelectionManager");
						sm.setAllSelect(false);
					}
	        </script>
			</textarea>
		</div>
		</div>
		</div>
    </body>
</html>
