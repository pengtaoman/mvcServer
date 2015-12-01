<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8" %>
<html>
    <head>
	    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<%@ include file="/unieap/ria3.3/pages/config.jsp" %>
    </head>
    <body class="unieap">
    	<div class="form_layout">
			<form id="formId" dojoType="unieap.form.Form">
				<table border="0"  
					cellspacing="0" 
					cellpadding="0" 
					class="table_layout">
					<colgroup>
						<col width="80"/>
						<col width="100%"/>
					</colgroup>			
					<tr class="tr">
						<td class="th">
							<label>名称：</label>
						</td>
						<td>
							<div id="name" jsId="name" dojoType="unieap.form.TextBox" binding="{name:'name'}" width="auto" required="true" trim="true" maxLength="32"></div>
						</td>
					</tr>
					<tr class="tr">
						<td class="th">
							<label>描述：</label>
						</td>
						<td>
							<div id="description" jsId="description" dojoType="unieap.form.Textarea" binding="{name:'description'}" height="80px" width="auto" trim="true" maxLength="1024"></div>
						</td>
					</tr>
				</table>
			</form>
		</div>
    </body>
</html>