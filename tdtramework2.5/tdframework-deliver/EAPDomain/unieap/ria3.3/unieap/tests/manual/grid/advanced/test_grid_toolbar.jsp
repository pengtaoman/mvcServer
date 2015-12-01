<%@ page contentType="text/html; charset=UTF-8" %>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        </meta>
        <title>测试requestData的parameters属性</title>
        <%@ include file="/unieap/ria3.3/pages/config.jsp" %>
		<script type="text/javascript" src="pageds.js"></script>
	</head>
   <body class="unieap">
		 <div dojoType="unieap.layout.TitlePane" title="toolbar" open="true">
            <div dojoType="unieap.grid.Grid" jsId="lockrow" width="600px" height="250px" binding="{store:'page1'}" views="{rowBar:true,rowNumber:true}">
                <header>
                    <row>
                        <cell label="姓名" name="NAME">
                        </cell>
                        <cell label="部门" name="attr_empno">
                        </cell>
                        <cell label="职位" name="attr_job">
                        </cell>
                        <cell label="工资" name="attr_sal">
                        </cell>
                    </row>
                </header>
				<toolbar  print="{url:'/test.do?method=loadPojo'}">
				</toolbar>
            </div>
        </div>
		<div dojoType="unieap.layout.TitlePane" open="open" title="说明">
            <span style="font-size:14px;color:red;">测试点：</span>
            <span style="font-size:14px;color:blue;">1.打印可以自定义url，而不是采用默认路径</span>
            <br>
			<span style="font-size:14px;color:blue;">本样例中配置了一个不存在的url，如果控制台报类似“路径不存在”之类的错误，说明本测试用例通过。</span>
            <br>
            <br>
        </div>
	</body>
</html>