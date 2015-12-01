<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8" %>
<%@ include file="/unieap/ria3.3/pages/config.jsp" %>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>Grid样例</title>
		<style type="text/css">
			@import "<%=appPath%>/pages/samples/blackbird/blackbird.css";
			@import "<%=appPath%>/pages/samples/syntaxHighlighter/Styles/SyntaxHighlighter.css";
		</style>
		<script type="text/javascript" src="<%=appPath%>/pages/samples/blackbird/blackbird.js"></script>
		<script type="text/javascript" src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shCore.js"></script>
		<script type="text/javascript" src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shBrushXml.js"></script>
		<script type="text/javascript" src="<%=appPath%>/pages/samples/grid/data.js"></script>
        <script type="text/javascript">
			dojo.addOnLoad(function(){
				dp.SyntaxHighlighter.HighlightAll('code');
			});			
        </script>
    </head>
    <body class="unieap">
    	<div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="说明">
			设置colSpan实现Grid多标题的功能。
			<br>
		</div>
		<div dojoType="unieap.layout.TitlePane" title="多标题">
			<div id="grid" dojoType="unieap.grid.Grid" width="100%" height="300px"
				binding="{store:'empDataStore'}" 
				views="{rowNumber:true}">
				<header>
					<row>
						<cell rowSpan="2" name="attr_empno" width="200px" label="编号"></cell>
						<cell label="标题一" isMulTitle="true" colSpan="2"></cell>
						<cell label="标题二" isMulTitle="true" colSpan="3"></cell>
					</row>
					<row>
						<cell name="attr_sal" label="工资" width="200px"></cell>
						<cell name="attr_job" label="职位" width="200px"></cell>
						<cell name="NAME" label="姓名" width="200px"></cell>
						<cell name="attr_deptno" label="部门" width="200px" decoder="{store:'DEPT',valueAttr:'CODEVALUE',displayAttr:'CODENAME'}"></cell>
						<cell name="attr_hiredate" label="日期" width="200px"></cell>
					</row>
				</header>
			</div>
		</div>		
		<div dojoType="unieap.layout.TitlePane" title="极复杂多标题">
			<div dojoType="unieap.grid.Grid" width="100%" height="250px"
				binding="{store:'mulTilteStore'}" views="{rowNumber:true}">
				<header>
					<row> 
						<cell label="年份" name="V_PERAGEDASSUR_AAE001" rowSpan="4" width="50px"></cell>
						<cell label="上年职工平均工资" name="V_PERAGEDASSUR_SNGZ" rowSpan="4" width="75px"></cell>
						<cell label="当年缴费工资" name="V_PERAGEDASSUR_AIC080" rowSpan="4" width="75px"></cell>	
						<cell label="当年缴费月数" name="V_PERAGEDASSUR_AIC079" rowSpan="4" width="75px"></cell>	
						<cell label="缴费比例" isMulTitle="true" rowSpan="2" colSpan="3"></cell>
						<cell label="当年缴费金额" isMulTitle="true" rowSpan="2" colSpan="3"></cell>
						<cell label="当年记帐利率%" name="V_PERAGEDASSUR_BNLV" rowSpan="4" width="75px"></cell>
						<cell label="个人帐户储蓄金额" isMulTitle="true" colSpan="12"></cell>
						<cell label="结清标志" name="V_PERAGEDASSUR_JQ" rowSpan="4" width="75px"></cell>
					</row>
					<row>
						<cell label="上年止累计储存额及本年利息" isMulTitle="true" colSpan="5"></cell>
						<cell label="本年计帐额及利息" isMulTitle="true" colSpan="5"></cell>
						<cell label="本年止累计储存额" isMulTitle="true" colSpan="2" ></cell>	
					</row>
					<row>
						<cell label="合计" name="V_PERAGEDASSUR_HJ" rowSpan="2" width="75px"></cell>
						<cell label="其中" isMulTitle="true" colSpan="2"></cell>
						<cell label="合计" name="V_PERAGEDASSUR_DNJFHJ" rowSpan="2" width="75px"></cell>
						<cell label="其中" isMulTitle="true" colSpan="2"></cell>
						<cell label="小计" name="V_PERAGEDASSUR_SNZLJ" rowSpan="2" width="75px"></cell>
						<cell label="个人缴费" isMulTitle="true" colSpan="2"></cell>
						<cell label="单位划转部分" isMulTitle="true" colSpan="2"></cell>
						<cell label="小计" name="V_PERAGEDASSUR_BNJZXJ" rowSpan="2" width="75px"></cell>
						<cell label="个人缴费" isMulTitle="true" colSpan="2"></cell>
						<cell label="单位划转部分" isMulTitle="true" colSpan="2"></cell>
						<cell label="合计" name="V_PERAGEDASSUR_BNZLJHJ" rowSpan="2" width="75px"></cell>
						<cell label="其中个人缴费本息" name="V_PERAGEDASSUR_GRJFBX" rowSpan="2" width="75px"></cell>
					</row>
					<row>
						<cell label="个人缴费%" name="V_PERAGEDASSUR_GRBL" width="75px"></cell>
						<cell label="单位划转%" name="V_PERAGEDASSUR_DWBL" width="75px"></cell>
						<cell label="个人缴费%" name="V_PERAGEDASSUR_AIC072" width="75px"></cell>
						<cell label="单位划转%" name="V_PERAGEDASSUR_AIC058" width="75px"></cell>
						<cell label="储存额" name="V_PERAGEDASSUR_AIC041" width="50px"></cell>	
						<cell label="利息" name="V_PERAGEDASSUR_AIC076" width="50px"></cell>
						<cell label="储存额" name="V_PERAGEDASSUR_AIC040" width="50px"></cell>	
						<cell label="利息" name="V_PERAGEDASSUR_AIC077" width="50px"></cell>
						<cell label="本金" name="V_PERAGEDASSUR_BJ" width="50px"></cell>	
						<cell label="利息" name="V_PERAGEDASSUR_LX" width="50px"></cell>
						<cell label="本金" name="V_PERAGEDASSUR_DWBJ" width="50px"></cell>	
						<cell label="利息" name="V_PERAGEDASSUR_DWLX" width="50px"></cell>
					</row>
	
				</header>
			</div>
		</div>
		<div dojoType="unieap.layout.TitlePane" title="多标题表格说明" open="false">
    		<div style="font-size: 13px;font-family: 宋体" >
					    表格多标题用row标签和列cell的isMtitle属性来实现，具体代码如下：
			</div>
			<br>
			<textarea name="code" class="html">
				<div id="grid" dojoType="unieap.grid.Grid" width="100%" height="300px"
					binding="{store:'empDataStore'}" 
					views="{rowNumber:true}">
					<header>
						<row>
							<cell rowSpan="2" name="attr_empno" width="200px" label="编号"></cell>
							<cell label="标题一" isMulTitle="true" colSpan="2"></cell>
							<cell label="标题二" isMulTitle="true" colSpan="3"></cell>
						</row>
						<row>
							<cell name="attr_sal" label="工资" width="200px"></cell>
							<cell name="attr_job" label="职位" width="200px"></cell>
							<cell name="NAME" label="姓名" width="200px"></cell>
							<cell name="attr_deptno" label="部门" width="200px" decoder="{store:'DEPT',valueAttr:'CODEVALUE',displayAttr:'CODENAME'}"></cell>
							<cell name="attr_hiredate" label="日期" width="200px"></cell>
						</row>
					</header>
				</div>
			</textarea>
    	</div>
    </body>
</html>
