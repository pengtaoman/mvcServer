<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8" %>
<%@ include file="/unieap/ria3.3/pages/config.jsp" %>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>Grid样例</title>
		<style type="text/css">
			@import "<%=appPath%>/pages/samples/syntaxHighlighter/Styles/SyntaxHighlighter.css";
			@import "<%=appPath%>/pages/samples/blackbird/blackbird.css";
		</style>
		
		<script type="text/javascript" src="<%=appPath%>/pages/samples/blackbird/blackbird.js"></script>
		<script type="text/javascript" src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shCore.js"></script>
		<script type="text/javascript" src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shBrushXml.js"></script>
		<script type="text/javascript" src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shBrushJScript.js"></script>
		<script type="text/javascript" src="<%=appPath%>/pages/samples/grid/basic/grid_commonEvt.js"></script>
    </head>
    <body class="unieap">
	   <div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="说明">
    		本样例连接了下面几个基本事件：<br/>
			·单元格鼠标单击事件；<br />
			·表头单元格鼠标单击事件；<br />
    	</div>
        <div dojoType="unieap.grid.Grid" id="grid" width="auto" height="250px" 
        	binding="{store:'empDataStore'}" 
			views="{rowNumber:true,orderType:'none',onCellClick:cellClick,onHeaderCellClick:headerCellClick}">
            <header>
                <cell label="姓名" name="attr_ename"></cell>
                <cell label="部门" name="attr_empno"></cell>
                <cell label="职位" name="attr_job"></cell>
                <cell label="工资" name="attr_sal"></cell>
            </header>
        </div>
		<div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="示例代码">
			<textarea name="code" class="html">
				
				<div dojoType="unieap.grid.Grid" id="grid" width="auto" height="250px" 
        			binding="{store:'empDataStore'}" 
					views="{rowNumber:true,orderType:'none',onCellClick:cellClick,
					          onHeaderCellClick:headerCellClick}">
            		<header>
                	<cell label="姓名" name="attr_ename"></cell>
                	<cell label="部门" name="attr_empno"></cell>
               	 	<cell label="职位" name="attr_job"></cell>
                	<cell label="工资" name="attr_sal"></cell>
            		</header>
        </div>
        </textarea>
				<textarea name="code" class="js">
				<script language='JavaScript'>
					//单元格单击事件
					function cellClick(inCell, inRowIndex) {
						alert("click in row:"+inRowIndex+", cell:"+inCell.label);
					}
					//表头单元格鼠标单击事件
					function headerCellClick(inCell) {
						alert("header: "+inCell.label+ " clicked");
					}
				</script>
			</textarea>
		</div>
		
    </body>
</html>
