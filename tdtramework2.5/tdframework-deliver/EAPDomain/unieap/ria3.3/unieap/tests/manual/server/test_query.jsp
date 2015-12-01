<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8" %>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        </meta>
        <title>表格持久化</title>
        <%@ include file="/unieap/ria3.3/pages/config.jsp" %>
         <script type="text/javascript" src="test_query.js"></script>
	</head>
    <body class="unieap">
    	<div dojoType="unieap.layout.TitlePane" title="说明">
    		当查询数据时，如果提交的DataStore中有数据，会清除原有数据，返回的DataStore中数据为新查询的数据。
    	</div>
	     <div dojoType="unieap.layout.TitlePane" title="人员编辑" >
			   <div id="grid" jsId="grid" dojoType="unieap.grid.Grid" width="100%" height="300px"
					binding="{store:'empDataStore'}"
					lockedRow="{statistics:{'attr_empno':'max','attr_hiredate':'min','attr_sal':'avg'}}"
					views="{rowNumber:false,rowBar:true,orderType:'none'}"
					selection="{selectType:'s'}">
					<fixed>
						<cell label="员工编号" width="150" name="empno"></cell>
					</fixed>
					<header>
						<cell width="100px" label="姓名" width="25%" name="ename"></cell>
						<cell width="150px" label="职位" width="25%" name="job"></cell>
						<cell width="150px" label="工资" width="25%" name="sal"></cell>
					</header>
					<toolbar paging="{url:'/DCTest.do?method=testLoadPoJo'}">
					</toolbar>   
				</div>
				
		</div>
		 <div dojoType="unieap.layout.TitlePane" title="查询" >
		 	<div dojoType="unieap.form.Button" label="test" onClick="query"></div>
		 	</div>
		 	
		 <div dojoType="unieap.layout.TitlePane" title="异常捕获" >
		 	<div dojoType="unieap.form.Button" label="空指针异常" onClick="testCommonException"></div>
		 	<div dojoType="unieap.form.Button" label="数组越界异常" onClick="testOutArrayException"></div>
		 	<div dojoType="unieap.form.Button" label="App异常" onClick="testAppException"></div>
		 </div>
    </body>
</html>