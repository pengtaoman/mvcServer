<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
	<%@ page contentType="text/html; charset=UTF-8"  import="java.io.File" %>
	<%
		String appName = EAPConfigHelper.getApplicationName(request
				.getSession());
		String contextPath = request.getSession().getServletContext()
				.getRealPath("/");
		String uploadPath = null;
		if (contextPath.endsWith("\\")) {
			uploadPath = contextPath + appName
					+ "/pages/samples/form/fileInput/upload/";
		} else {
			uploadPath = contextPath + "\\" + appName
					+ "/pages/samples/form/fileInput/upload/";
		}
		File file = new File(uploadPath);
		if(!file.exists()){
			file.mkdir();
		}
		File[] uploadFiles = file.listFiles();
	%>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		</meta>
		<title>filelist</title>
	</head>
	<%@ include file="/unieap/ria3.3/pages/config.jsp"%>
		<script type="text/javascript">
			var files = [];
			<%for(int i=0;i<uploadFiles.length;i++){%>
				files.push('<%=uploadFiles[i].getName()%>');
			<%}%>
			var inner="<form action=\""+"<%=path%>"+"/upload_downLoad_file.do\" method=\"post\"><table>";
			inner+="<tr><td style=\"font-size: 13px;width:300px;font-family: 宋体\">";
			inner+="已上传文件:";
			inner+="</td></tr>";
			for(var i=0;i<files.length;i++){
				inner+="<tr><td style=\"font-size: 13px;font-family: 宋体\">";
				inner+=files[i];
				inner+="</td><td>"
				inner+="<div dojoType=\"unieap.form.Button\" label=\"下载\" onClick=\"download('"+files[i]+"')\" style=\"margin-right:5px\"></div>"
				inner+="</td><td>"
				inner+="<div dojoType=\"unieap.form.Button\" label=\"删除\" onClick=\"del('"+files[i]+"')\" style=\"margin-right:5px\"></div>"
				inner+="</td></tr>";
			}
			inner+="</table><input type=\"hidden\" name=\"method\"/>"
			inner+="<input type=\"hidden\" name=\"filename\"/>";
			inner+="</form>";
			function download(filename){
				document.forms[0].filename.value=filename;
				document.forms[0].method.value='commonDownload';
				document.forms[0].submit();
			}
			
			function del(filename){
				document.forms[0].filename.value=filename;
				document.forms[0].method.value='delete';
				document.forms[0].submit();
			}
		</script>
	<body>
		<script type="text/javascript">
			document.write(inner);
		</script>
	</body>
</html>