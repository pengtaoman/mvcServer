<%@ page contentType="text/html;charset=gb2312" %>

<%  
    String message = (String)request.getAttribute("msg");
    String ifClose = (String)request.getAttribute("ifModal");
    
   if( message == null){
        message = "";
    }else{
        message = message.trim();	
    }

    if (ifClose == null) {
    	ifClose = "";
    } else {
    	ifClose = ifClose.trim();
    }
%>

<html>
  <body>
	  <form name="myform">
		<input type="hidden" name="message" value=<%=message%> />
		<input type="hidden" name="ifClose" value=<%=ifClose%> />
		<script language="javascript">
   
			if(document.myform.message.value != ""){
			  alert(document.myform.message.value);
			}
			//�Ե���ʽ���ڴ�����Ϻ��Ƿ�رմ���
			if(document.myform.ifClose.value == "true"){
				//��Ǵ򿪴��ڵĸ�������ĳЩ����
				window.parent.self.returnValue = "workClose";
				window.parent.close();
				window.parent.parent.close();
			}else if(document.myform.ifClose.value == "middle"){
				//�رմ��ڵ������ڲ���ĳЩ����
				window.parent.self.returnValue = "";
				window.parent.close();
			}
		 
		</script>
	   </form>
  </body>
</html>