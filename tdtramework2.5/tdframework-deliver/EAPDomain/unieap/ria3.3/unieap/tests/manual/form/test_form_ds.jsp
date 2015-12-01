<%@ page contentType="text/html; charset=UTF-8" %>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        </meta>
        <title>个性化定义</title>
          <%@ include file="/unieap/ria3.3/pages/config.jsp" %>
        <script type="text/javascript">
         
         function setDS(){
           form.getBinding().setDataStore(new unieap.ds.DataStore("test",[{
           col1:'col1',
           col2:'col2',
           col3:'col3'
           }]))
         }
         
         function setDS2(){
           form.getBinding().setDataStore(new unieap.ds.DataStore("test"));
         }
         
        
        </script>
    </head>
    <body class="unieap">
          <div jsId="form" dojoType="unieap.form.Form">
            	<div binding="{name:'col1'}" dojoType="unieap.form.TextBox"></div>
            	<div binding="{name:'col2'}" dojoType="unieap.form.TextBox"></div>
            	<div binding="{name:'col3'}" dojoType="unieap.form.TextBox"></div>
          </div>
          
          <button onClick="setDS()">setDS</button>
          <button onClick="setDS2()">setDS2</button>
    </body>
