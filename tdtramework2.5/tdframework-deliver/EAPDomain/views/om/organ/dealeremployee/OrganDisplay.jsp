<%
/* JSP�����Ҫ������Ϣ
**************************************************************
* ������	: ����Ա��ѯҳ��-��֯������
* ��������: 
* ����		: �λ� ren.hui@neusoft.com
* ģ��		: Ȩ��
* ����		: Ȩ��ϵͳ-��֯������
* ��ע		: 
* ------------------------------------------------------------
* �޸���ʷ
* ���		����		�޸���			�޸�ԭ��
* 1
* 2
**************************************************************
*/
%>
<%@ page contentType="text/xml; charset=gb2312" %>
<%@ page import="com.neusoft.tdframework.common.util.NullProcessUtil" %>
<%@ page import="com.neusoft.tdframework.common.data.ParamObjectCollection" %>
<%@ page import="com.neusoft.om.dao.organdisplay.OrganDisplayColl" %>
<%@ page import="com.neusoft.om.dao.organdisplay.OrganDisplayVO" %>

<% String path = request.getContextPath();
	String message = (String)request.getAttribute("Message");
	if(message == null){
		message = "";
	}
%>

<?xml version="1.0" encoding="gb2312"?>
<?xml-stylesheet type="text/xsl" href="<%=path%>/views/om/organ/dealeremployee/OrganDisplay.xsl"?>

<root>
	<create>
		<Message><%=message%></Message>
	<%
       	//�����֯������Ϣ
		OrganDisplayColl organDisplayColl = (OrganDisplayColl)request.getAttribute("OrganDisplayColl");
        if(organDisplayColl!=null){
        	int rowcount = organDisplayColl.getRowCount();
		    for(int i=0;i<rowcount;i++){
		    	OrganDisplayVO vo = organDisplayColl.getOrganDisplay(i);
		    	OrganDisplayVO nextvo = organDisplayColl.getOrganDisplay(i+1);
		    	int organLevel = vo.getOrganLevel();
		    	int nextLevel = 0;
		    	if(nextvo != null)
		    		nextLevel = nextvo.getOrganLevel();
		    	if(organLevel == 1){
            %>
	<OrganCenter>
		<%=vo.toString(2)%>
	</OrganCenter>
    <%
       	    	}else{
       	    		if(organLevel < nextLevel){%>
     <OrganInfo>
     		<If_havesub>1</If_havesub>
				<%=vo.toString(2)%>
     </OrganInfo>
     <%				}
     				else{%>
		<OrganInfo>
     	<If_havesub>0</If_havesub>
				<%=vo.toString(2)%>
    </OrganInfo>     			
      <% 	    	}
       	    	}
       	    }
        }%>    			
    <path><%=path%></path> 
   </create> 
</root>
