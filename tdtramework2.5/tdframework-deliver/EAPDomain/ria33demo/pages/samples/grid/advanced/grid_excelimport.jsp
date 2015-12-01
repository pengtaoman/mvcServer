<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8" %>
<%@ include file="/unieap/ria3.3/pages/config.jsp" %>
<html>
    <head>
        <meta content="text/html; charset=UTF-8" http-equiv="Content-Type">
        </meta>
        <title>导入示例</title>
		<script type="text/javascript" src="<%=appPath%>/pages/samples/grid/advanced/grid_excelimport.js">			
		</script>
    </head>
    <body class="unieap">
    	<div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="样例描述">
			·Excel导入功能需要根据具体的Excel文件进行解析模板的定制，后台通过解析该模板获取Excel文件的相关信息，执行数据抽取<br>
			·样例仅支持导入符合<a href= "<%=appPath%>/Resources/importexcel/impXml/student_imp.xml" target="_blank" style="font-size: 15px">样例解析模板</a>的<a href= "<%=appPath%>/Resources/importexcel/student.xls" style="font-size: 15px">Excel文件</a><br>
			·不支持Excel 2007导入
		</div>
		<div id="gridTitlePane" dojoType="unieap.layout.TitlePane" title="Excel数据Grid展示">
			<div id="grid" dojoType="unieap.grid.Grid" width="500px" height="300px" 
					views="{rowNumber:false,rowBar:false}">
	            <header>
	                <cell width="33%" label="姓名" name="name">
	                </cell>
	                <cell width="33%" label="年龄" name="age">
	                </cell>
	                <cell width="auto" label="性别" name="sex">
	                </cell>
	            </header>
				<toolbar></toolbar>
       		</div>
		
	        <form id="form" dojoType="unieap.form.Form" enctype="multipart/form-data" style="padding-top:15px">
	            <table style="top:100px">
	                <tr>
	                    <td class="td">
	                        <label for="impFile" style="line-height:20px;font-size: 13px;font-family: 宋体; width=100px">
	                            文件上传：
	                        </label>
	                    </td>
	                    <td>
	                        <div id="impFile" dojotype="unieap.form.FileInput" fileFilter='xls' style="width:350px">
	                        </div>
	                    </td>
						<td>
							<div id="impBtn" dojoType="unieap.form.Button" label="导入" width="70px" onClick="importExcel">
  							</div>
						</td>
	                </tr>
	            </table>
	        </form>
			<!--
			<br>
			提示：<br>
			<li><a href= "<%=appPath%>/Resources/importexcel/student.xls">点击下载</a>样例Excel文件后通过文件上传控件导入<br>
			<li><a href= "<%=appPath%>/Resources/importexcel/impXml/student_imp.xml" target="_blank">查看</a>样例的Excel解析模板
			-->
		</div>
    </body>
</html>