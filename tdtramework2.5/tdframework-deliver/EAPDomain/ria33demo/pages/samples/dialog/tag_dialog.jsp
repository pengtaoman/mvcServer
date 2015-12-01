<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8" %>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        </meta>
        <title>dialog测试</title>
        <%@ include file="/unieap/ria3.3/pages/config.jsp" %>
	</head>
	<script type="text/javascript">
		
		function showDlg1(){
			var dialog=unieap.byId("dlg1");
			dialog.show();
		}
		
		function showDlg2(){
			var dialog=unieap.byId("dlg2");
			dialog.show(null,{name:'jack哈哈'});
		}
		
		function fn(str){
			alert("dialog传回的值为:"+str);
		}
		
		

		
		

		
		

	</script>
	<body class="unieap">
	  	<div id="titlePane1" dojoType="unieap.layout.TitlePane" title="用例说明" height=100px>
				测试功能点：
				<li>Dialog控件支持标签创建</li>
	  	</div>
        <div id="titlePane2" dojoType="unieap.layout.TitlePane"  title="测试用例" height="500px" >
			<div dojoType="unieap.form.Button" label="显示dialog(内嵌控件)" id="btn1" onClick="showDlg1" ></div><p></p>
			<div dojoType="unieap.dialog.Dialog"  id="dlg1" width="700">
				<div dojoType="unieap.layout.TitlePane" title="测试" height="200px">
					<div dojoType="unieap.form.DateTextBox"></div>
					<p></p>
					<div dojoType="unieap.form.TextBox"></div>
					
				</div>
			</div>
			<div dojoType="unieap.dialog.Dialog" width="500" height="600"  url="tag_dialog_url.jsp" title="测试" id="dlg2" onComplete="fn" ></div>
			<div dojoType="unieap.form.Button" label="显示dialog(url+回调)" onClick="showDlg2"  style="margin-top:5px"></div><p></p>
		</div>
    </body>
</html>