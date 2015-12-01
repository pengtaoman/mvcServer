<%@ page language="java" pageEncoding="GBK"%>
<%@ page import="com.neusoft.crm.ordermgr.common.util.dateutil.DateUtils" %>
<%
String webpath = request.getContextPath();
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<title>测试数据库连接</title>
		<contextPath value="<%=webpath%>" />
		<meta http-equiv="Content-Type" content="text/html; charset=GBK" />
		<link href="<%=webpath%>/common/css/td_style_new.css" rel="stylesheet" type="text/css" />
		<script language=javascript src="<%=webpath%>/buscard/common/js/buscard_2.0.js"></script>
		
	</head>
	<body style="font-family:微软雅黑">
		<script>
		var timeOutObj = null;
		var testTimes = 1;
		var testSumTime = 0;
		function testConnection(){			
			var seconds = parseInt(document.getElementById("seconds").value);
			if(isNaN(seconds) || seconds < 0){
				document.getElementById("seconds").value = "0";
				seconds = 0;
			}
			if(seconds > 0){
				document.getElementById("testBtn").value = "测试中";
				document.getElementById("testBtn").disabled = true;
			}
			var sqlUtilDAO = BusCard.$remote("sqlUtilDAO");
			var result = BusCard.util.parse(sqlUtilDAO.getConnectionTest());
			result = BusCard.util.parse(result);
			var DateUtils = BusCard.$load("com.neusoft.crm.ordermgr.common.util.dateutil.DateUtils");
			var currentTime = DateUtils.getSysdate().replace(/"/g,"");
			if(result.flag == "1"){
				document.getElementById("result").value = "当前数据库连接可用...."
						+(!!result.info?("\r\n"
								+"当前时间:"+currentTime
								+"\r\n"+"测试信息:已测试"+testSumTime+"秒,共测试"+testTimes+"次."
								+"\r\n"+"连接对象:"+result.info)
							:"");
				document.getElementById("headTitle").innerHTML = "测试数据库连接,结果如下:";
				if(seconds > 0){
					testTimes++;
					testSumTime += seconds;					
					timeOutObj=setTimeout("testConnection()",seconds*1000);
				}else{
					stopTest();
				}
			}else{
				document.getElementById("result").value = "当前数据库连接连接失败...."
						+(!!result.info?("\r\n"
								+"当前时间:"+currentTime
								+"\r\n"+"测试信息:已测试"+testSumTime+"秒,共测试"+testTimes+"次."
								+"\r\n"+"异常信息:\r\n"+result.info)
							:"");
				stopTest();
			}
		}
		function stopTest(){
			if(!!timeOutObj){		
				clearTimeout(timeOutObj);
			}
			testTimes = 1;
			testSumTime = 0;
			document.getElementById("headTitle").innerHTML = "测试数据库连接";
			document.getElementById("testBtn").value = "测试连接";
			document.getElementById("testBtn").disabled = false;	
		}
		</script>
		<center><font id="headTitle" size="5">测试数据库连接</font></center>
		<table align="center">
			<tr align="center">
				<td align="center" width="600px">
					<textarea name="result" readonly="readonly" id="result" cols="" rows="5" style="font-size:13;font-family:微软雅黑">此处显示测试结果.....</textarea>
				</td>
			</tr>
			<tr align="center" >
				<td align="center" >
					每隔
					<input id="seconds" value="0" style="width:30px" maxlength="4"/>
					秒测试(输入0为单次测试)
					<input type="button" id="testBtn" class="formButton" value="测试连接" onclick="testConnection()" />	
					<input type="button" id="stopTestBtn" class="formButton" value="停止测试" onclick="stopTest()" />				
				</td>
			</tr>
		</table>
	</body>
</html>
