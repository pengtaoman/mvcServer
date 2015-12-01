<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8" %>
<%@ include file="/unieap/ria3.3/pages/config.jsp" %>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        </meta>
        <title>测试requestData的parameters属性</title>
		<script type="text/javascript" src="pageds.js"></script>
		<script type="text/javascript">
			function f(){
				alert("点击了按钮")
			}
			dojo.addOnLoad(function(){
				dojo.connect(unieap.byId("button"),"onClick","f");
			});
		</script>
	</head>
   <body class="unieap">
		 <div dojoType="unieap.layout.TitlePane" title="toolbar" open="true">
            <div dojoType="unieap.xgrid.Grid" jsId="lockrow" width="600px" height="250px" binding="{store:'page1'}">
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
                <toolbar>
                	<div dojoType="unieap.form.Button" id="button" label="按钮"></div>
                </toolbar>
            </div>
        </div>
	</body>
</html>