<%@ page language="java" pageEncoding="GBK"%>
<%@ page import="com.neusoft.crm.ordermgr.common.util.dateutil.DateUtils" %>
<%
String webpath = request.getContextPath();
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<title>�������ݿ�����</title>
		<contextPath value="<%=webpath%>" />
		<meta http-equiv="Content-Type" content="text/html; charset=GBK" />
		<link href="<%=webpath%>/common/css/td_style_new.css" rel="stylesheet" type="text/css" />
		<script language=javascript src="<%=webpath%>/buscard/common/js/buscard_2.0.js"></script>
		
	</head>
	<body style="font-family:΢���ź�">
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
				document.getElementById("testBtn").value = "������";
				document.getElementById("testBtn").disabled = true;
			}
			var sqlUtilDAO = BusCard.$remote("sqlUtilDAO");
			var result = BusCard.util.parse(sqlUtilDAO.getConnectionTest());
			result = BusCard.util.parse(result);
			var DateUtils = BusCard.$load("com.neusoft.crm.ordermgr.common.util.dateutil.DateUtils");
			var currentTime = DateUtils.getSysdate().replace(/"/g,"");
			if(result.flag == "1"){
				document.getElementById("result").value = "��ǰ���ݿ����ӿ���...."
						+(!!result.info?("\r\n"
								+"��ǰʱ��:"+currentTime
								+"\r\n"+"������Ϣ:�Ѳ���"+testSumTime+"��,������"+testTimes+"��."
								+"\r\n"+"���Ӷ���:"+result.info)
							:"");
				document.getElementById("headTitle").innerHTML = "�������ݿ�����,�������:";
				if(seconds > 0){
					testTimes++;
					testSumTime += seconds;					
					timeOutObj=setTimeout("testConnection()",seconds*1000);
				}else{
					stopTest();
				}
			}else{
				document.getElementById("result").value = "��ǰ���ݿ���������ʧ��...."
						+(!!result.info?("\r\n"
								+"��ǰʱ��:"+currentTime
								+"\r\n"+"������Ϣ:�Ѳ���"+testSumTime+"��,������"+testTimes+"��."
								+"\r\n"+"�쳣��Ϣ:\r\n"+result.info)
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
			document.getElementById("headTitle").innerHTML = "�������ݿ�����";
			document.getElementById("testBtn").value = "��������";
			document.getElementById("testBtn").disabled = false;	
		}
		</script>
		<center><font id="headTitle" size="5">�������ݿ�����</font></center>
		<table align="center">
			<tr align="center">
				<td align="center" width="600px">
					<textarea name="result" readonly="readonly" id="result" cols="" rows="5" style="font-size:13;font-family:΢���ź�">�˴���ʾ���Խ��.....</textarea>
				</td>
			</tr>
			<tr align="center" >
				<td align="center" >
					ÿ��
					<input id="seconds" value="0" style="width:30px" maxlength="4"/>
					�����(����0Ϊ���β���)
					<input type="button" id="testBtn" class="formButton" value="��������" onclick="testConnection()" />	
					<input type="button" id="stopTestBtn" class="formButton" value="ֹͣ����" onclick="stopTest()" />				
				</td>
			</tr>
		</table>
	</body>
</html>
