<%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ taglib uri="/WEB-INF/taglib/unieap" prefix="unieap" %>
<%@ taglib uri="/WEB-INF/tld/td.tld" prefix="td" %>
<unieap:form action="">
	<table>
	    <tr> 
	      <td>
	    	<input type="button" name="test" class="formButton" value="普通按钮" onclick="testA();"/>
	      </td>
	      <td>
	      	 <td:unieapbutton securityid="test_b" classname="formButton" name="submit" value="权限按钮" onclick="alert()"/>
	      </td>
	    </tr>
	</table>
</unieap:form>

