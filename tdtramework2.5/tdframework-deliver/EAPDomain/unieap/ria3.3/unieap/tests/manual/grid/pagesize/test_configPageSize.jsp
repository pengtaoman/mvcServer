<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8" %>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        </meta>
        <title></title>
        <%@ include file="/unieap/ria3.3/pages/config.jsp" %>
         <script type="text/javascript" src="test_configPageSize.js"></script>
	</head>
    <body class="unieap">
    	<div  dojoType="unieap.layout.TitlePane" title="用例说明" >
			测试功能点：
				<li>验证设置grid每页显示行数功能</li>
				<li>验证grid显示是否和数据中心同步</li>
				<li>验证客户端小计合计是否正确</li>
				<li>验证过滤、排序是否正确</li>
	  	</div>
		<div  dojoType="unieap.layout.TitlePane" title="测试用例" >
			<div id="grid1"  dojoType="unieap.grid.Grid" width="100%" height="300px"
						binding="{store:'empDataStore'}"
						views="{rowNumber:true,orderType:'server'}"
						lockedRow="{statistics:[{attr_sal:'max'},{attr_sal:'min'}]}"
						unitedCell="{unite:['attr_deptno']}"
						edit="{editType:'rowEdit',singleClickEdit:false}">
						<fixed>
							<cell label="员工编号" width="150" name="attr_empno" editor="{editorClass:'unieap.form.TextBox',editorProps:{textAlign:'left'}}"  styles="color: red;"></cell>
						</fixed>
						<header>
							<cell width="150px" label="姓名" name="attr_ename" headerStyles="text-align: right;"></cell>
							<cell width="200px" label="职位" name="attr_job" ></cell>
							<cell width="250px" label="工资" name="attr_sal" styles="color: red;"></cell>
							<cell width="150px" label="部门" name="attr_deptno" decoder="{store:'DEPT'}"></cell>
							<cell width="200px" label="职位1" name="attr_job" styles="background:#FFE4C4"></cell>
						</header>
						<toolbar paging="{display:false,userPageSize:true}" >
								<table width="100%">
									<tr>
										<td><div dojoType="unieap.form.Button" label="显示翻页" onClick="showbar"></div></td>
										<td><div dojoType="unieap.form.Button" label="changeStore" onClick="changeStore"></div></td>
									</tr>
							</table>
						</toolbar>
						<foot style="text-align:center;">
								最大薪资：<span style="color: #2748c2" express="max(attr_sal)"></span>；
								最小薪资：<span style="color: #2748c2" express="min(attr_sal)"></span>；
						</foot>
					</div>
					<div id="grid2" dojoType="unieap.grid.Grid"   filter="{include:['attr_deptno']}"  width="100%" height="200px"
						binding="{store:'deptDataStore'}"
						views="{rowNumber:true}"
						group="{autoApply:true,groupBar:true}"
						unitedCell="{unite:['attr_deptno']}"
						>
						<fixed>
							<cell label="部门编号（配置了转义）" width="150" name="attr_deptno" decoder="{store:'DEPT'}"></cell>
						</fixed>
						<header>
							<cell width="150px" label="部门地址" name="attr_loc" headerStyles="text-align: right;"></cell>
							<cell width="150px" label="部门名称" name="attr_dname" ></cell>
							<cell label="部门编号绑定同一列" width="150" name="attr_deptno"></cell>
						</header>
						<toolbar paging="{display:true,userPageSize:[-1,1,2,3,4,5]}" export="true" print="true" individual="true">
							<div dojoType="unieap.form.Button" label="grid过滤" onClick="dogridfilter"></div>
							<div dojoType="unieap.form.Button" label="rowset过滤" onClick="dofilter"></div>
							<div dojoType="unieap.form.Button" label="取消过滤" onClick="cancelfilter"></div>
						</toolbar>
					</div>
					<div id="grid3"  dojoType="unieap.grid.Grid" width="100%" height="300px"
						binding="{store:'empStore'}"
						views="{rowNumber:true,orderType:'server'}"
						edit="{editType:'rowEdit',singleClickEdit:false}"
						selection="{selectType:'m'}">
						<fixed>
							<cell label="员工编号" width="150" name="attr_empno" editor="{editorClass:'unieap.form.NumberTextBox',editorProps:{textAlign:'left'}}"  styles="color: red;"></cell>
						</fixed>
						<header>
							<cell width="150px" label="姓名" name="attr_ename" editor="{editorClass:'unieap.form.TextBox',editorProps:{textAlign:'left'}}"  headerStyles="text-align: right;"></cell>
							<cell width="200px" label="职位" name="attr_job"  editor="{editorClass:'unieap.form.TextBox',editorProps:{textAlign:'left'}}" ></cell>
							<cell width="250px" label="工资" name="attr_sal" styles="color: red;"></cell>
							<cell width="150px" label="部门" name="attr_deptno" decoder="{store:'DEPT'}"></cell>
							<cell width="200px" label="职位1" name="attr_job" styles="background:#FFE4C4"></cell>
						</header>
						<toolbar paging="{display:true,userPageSize:true,pageCache:true}" >
						</toolbar>
					</div>
					<!--
			<div dojoType="unieap.layout.TabContainer">
				<div dojoType="unieap.layout.ContentPane" title="设置每页显示行数">
					
				</div>
				<div dojoType="unieap.layout.ContentPane" title="与其它功能影响">
					
				</div>
			</div>
			-->
			<div id="titlePane3" dojoType="unieap.layout.TitlePane" title="说明" >
				第一个Grid对应“empDataStore”，第二个Grid对应“deptDataStore”，第三个grid对应“empStore”
			<table border="1" bordercolor="#99BBE8" style="margin-top:20px;width:100%">
				<colgroup>
					<col style="width:300px"></col>
					<col style=""></col>
					<col style=""></col>
				</colgroup>
				<tr height="30px">
					<td><strong>功能点描述</strong></td>
					<td><strong>操作过程</strong></td>
					<td><strong>预期结果</strong></td>
				</tr>
				<tr height="30px">
					<td style="vertical-align:top">验证分页是否显示与设置行数的联动</td>
					<td style="vertical-align:top">第一个表格初始设置隐藏翻页，点击按钮“显示翻页”</td>
					<td style="vertical-align:top">
						设置分页行数下拉框也隐藏，点击按钮“显示翻页”后，显示翻页信息，同时显示设置分页行数的下列框
					</td>
				</tr>
				<tr height="30px">
					<td style="vertical-align:top">验证分页行数下拉列表中数据可配置</td>
					<td style="vertical-align:top">点击第二个表格的分页数</td>
					<td style="vertical-align:top">
						下拉列表中数据为“---,1,2,3,4,5”
					</td>
				</tr>
				<tr height="30px">
					<td style="vertical-align:top">验证分页与最大值，最小值联动</td>
					<td style="vertical-align:top">改变分页大小，看第一个表格中foot中薪资大小是否跟随动态改变</td>
					<td style="vertical-align:top">foot的值跟随改变</td>
				</tr>
				<tr height="30px">
					<td style="vertical-align:top">验证分页与数据中心联动</td>
					<td style="vertical-align:top">改变下拉列表分页大小，看数据中心中数据是否与grid显示一致（pageNumber、pageSize、数据）</td>
					<td style="vertical-align:top">与数据中心保持一致</td>
				</tr>
				<tr height="30px">
					<td style="vertical-align:top">验证分页与数据中心联动</td>
					<td style="vertical-align:top">点击按钮&lt;changeStore&gt;数据中心中设置pageSize的数据和分页下拉列表中数据有相同</td>
					<td style="vertical-align:top">下拉列表框中显示数据为pageSize</td>
				</tr>
				<tr height="30px">
					<td style="vertical-align:top">验证与分组联动</td>
					<td style="vertical-align:top">在第二个grid中设置分组后，设置分页大小</td>
					<td style="vertical-align:top">表格中数据与分页大小一致</td>
				</tr>
				<tr height="30px">
					<td style="vertical-align:top">验证与过滤联动</td>
					<td style="vertical-align:top">选择第二个grid的“部门”列过滤，改变分页大小</td>
					<td style="vertical-align:top">grid过滤消失</td>
				</tr>
				<tr height="30px">
					<td style="vertical-align:top">验证与过滤联动</td>
					<td style="vertical-align:top">点击&lt;grid过滤&gt;按钮，改变分页大小。</td>
					<td style="vertical-align:top">过滤条件消失（数据为非过滤数据和表头样式过滤样式消失），数据中心filter区无数据</td>
				</tr>
				<tr height="30px">
					<td style="vertical-align:top">验证与过滤联动</td>点击&lt;cancelFilter&gt;后
					<td style="vertical-align:top">点击&lt;rowset过滤&gt;改变分页大小。</td>
					<td style="vertical-align:top">过滤条件消失（数据为非过滤数据和表头样式过滤样式消失），数据中心filter区无数据</td>
				</tr>
				<tr height="30px">
					<td style="vertical-align:top">验证与排序联动</td>
					<td style="vertical-align:top">点击表头进行排序，改变分页大小</td>
					<td style="vertical-align:top">表头的排序状态是否还在？如果在数据是否排序？</td>
				</tr>
				<tr height="30px">
					<td style="vertical-align:top">验证设置了翻页缓存的影响</td>
					<td style="vertical-align:top">
						在第三个Grid中设置pageSize为一稍大值后翻页，再设为一稍小值，选择grid数据后翻页，改变分页大小（往大、小两种改法，不要遗漏），再返回原来页数
					</td>
					<td style="vertical-align:top">翻页缓存是否起作用？设置分页大小是否起作用？</td>
				</tr>
				<tr height="30px">
					<td style="vertical-align:top">验证与编辑器之间联动</td>
					<td style="vertical-align:top">修改编辑表格中数据，改变分页大小后是否有“保存修改”提示</td>
					<td style="vertical-align:top">有“保存修改”提示</td>
				</tr>
			</table>
		</div>
		</div>
    </body>
</html>