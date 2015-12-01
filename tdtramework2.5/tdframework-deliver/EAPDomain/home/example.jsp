<%@ page language="java" contentType="text/html;charset=GBK" %>
<%@ taglib uri="http://www.extremecomponents.org" prefix="ec" %>

<%

int rowc=300;
request.setAttribute("totalRows",new Integer(rowc));
java.util.List presidents = new java.util.ArrayList();
for (int i=0;i<rowc/6;i++){

	java.util.Map president = new java.util.HashMap(); 
	president.put("name", "George Washington"+"_"+i); 
	president.put("nickname", "Father of His Country"+"_"+i);  
	president.put("term", "1789-1797"); 
	president.put("no", ""+i); 
	presidents.add(president); 

	president = new java.util.HashMap(); 
	president.put("name", "John Adams"+"_"+i); 
	president.put("nickname", "Atlas of Independence"+"_"+i); 
	president.put("term", "1797-1801"); 
	president.put("no", ""+i); 
	presidents.add(president); 

	president = new java.util.HashMap(); 
	president.put("name", "Thomas Jefferson"+"_"+i); 
	president.put("nickname", "Man of the People, Sage of Monticello"+"_"+i);  
	president.put("term", "1801-09"); 
	president.put("no", ""+i); 
	presidents.add(president); 

	president = new java.util.HashMap(); 
	president.put("name", "James Madison"+"_"+i); 
	president.put("nickname", "Father of the Constitution"+"_"+i); 
	president.put("term", "1809-17"); 
	president.put("no", ""+i); 
	presidents.add(president); 

	president = new java.util.HashMap(); 
	president.put("name", "James Monroe"+"_"+i); 
	president.put("nickname", "The Last Cocked Hat, Era-of-Good-Feelings President"+"_"+i);  
	president.put("term", "1817-25"); 
	president.put("no", ""+i); 
	presidents.add(president); 

	president = new java.util.HashMap(); 
	president.put("name", "John Adams"); 
	president.put("nickname", "Old Man Eloquent"+"_"+i); 
	president.put("term", "1825-29"); 
	president.put("no", ""+i); 
	presidents.add(president); 
	
}

 
request.setAttribute("pres", presidents); 
request.setAttribute("ecid",request.getParameter("ecid"));
%>



<%

String webapp=request.getContextPath();


%>



<ec:table tableId="${ecid}"
 items="pres" var="pre" action="${pageContext.request.contextPath}/home/example.jsp"
style="table-layout:fixed;" 
rowsDisplayed="5" 
toolbarLocation="bottom" 
toolbarContent="navigation|pagejump|pagesize|export|extend|status"
width="100%" 
>
	<ec:row  >
		<ec:column property="_1" title="±àºÅ" width="50"  value="${TOTALROWCOUNT}" />
		<ec:column property="name" title="ÐÕÃû"  width="150" />
		<ec:column property="nickname" title="³ÆºÅ" width="150"  ellipsis="true" />
		<ec:column property="no" title="ÐòºÅ"  />
		<ec:column property="term"  title="ÈÎÆÚ" />
	</ec:row>
</ec:table>

