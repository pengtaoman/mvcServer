<%@ page contentType="text/html; charset=UTF-8"%>
<html>
	<head>
		<META HTTP-EQUIV="MSThemeCompatible" CONTENT="No">
		<meta content="text/html; Encoding=UTF-8">
		<title>下载文件</title>
	 <script>
       function downloadLicense() 
         {
           var fileid = getParastr("fileid");
           document.location = "<%=request.getContextPath()%>/fileDownload.do?fileid="+fileid;
         }
         function getParastr(strname) 
           {
             var hrefstr,pos,parastr,para,tempstr;
             hrefstr = window.location.href;
             pos = hrefstr.indexOf("?");
             parastr = hrefstr.substring(pos+1);
             para = parastr.split("&");
             tempstr="";
             for(i=0;i<para.length;i++)	
              {  
                tempstr = para[i];
                pos = tempstr.indexOf("=");
                if(tempstr.substring(0,pos) == strname) 
                   {  	
                    return tempstr.substring(pos+1);
                   }	
               }	
                 return null;
            }
    </script>
	</head>
	<body onload="downloadLicense()"> 
	    <center><td align="left" height="26" valign="middle" style="font-size:12;font-weight:bold">
	        <a href="javascript:window.close()">下载完毕，关闭窗口。</a></td>
	    </center>
	</body>
</html>