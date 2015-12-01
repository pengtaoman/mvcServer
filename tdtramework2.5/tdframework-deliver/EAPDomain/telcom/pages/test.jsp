<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8" %>
<html>
       <head>
           <title>异常规则管理</title>
           <%@ include file="/unieap/ria3.3/pages/config.jsp" %>
		   
		   
		  <script>
         	var ds={"header":{"code":0,"message":{"title":"","detail":""}},"body":{"parameters":{},"dataStores":{"CustomOrder":{"rowSet":{"primary":[{"id":"dddd"}],"filter":[],"delete":[]},"parameters":{},"name":"CustomOrder","pageNumber":1,"pageSize":2147483647,"recordCount":0,"metaData":{"columns":{"id":{"dataType":12,"nullable":true,"primaryKey":false,"attribute":{"name":"id"}}},"order":"","condition":""},"rowSetName":"com.neusoft.td.crm.entity.CustomerOrder"},"CustomOrder.OrderItem_0":{"rowSet":{"primary":[{"id":"oi1"},{"id":"oi2"}],"filter":[],"delete":[]},"parameters":{},"name":"CustomOrder.OrderItem_0","pageNumber":1,"pageSize":2147483647,"recordCount":0,"metaData":{"columns":{"id":{"dataType":12,"nullable":true,"primaryKey":false,"attribute":{"name":"id"}}},"order":"","condition":""},"rowSetName":"com.neusoft.td.crm.entity.OrderItem"},"CustomOrder.OrderItem_0.OrderItemDetail_0":{"rowSet":{"primary":[{"id":"detail1"},{"id":"detail2"}],"filter":[],"delete":[]},"parameters":{},"name":"CustomOrder.OrderItem_0.OrderItemDetail_0","pageNumber":1,"pageSize":2147483647,"recordCount":0,"metaData":{"columns":{"id":{"dataType":12,"nullable":true,"primaryKey":false,"attribute":{"name":"id"}}},"order":"","condition":""},"rowSetName":"com.neusoft.td.crm.entity.OrderItemDetail"},"CustomOrder.OrderItem_0.OrderItemDetail_1":{"rowSet":{"primary":[{"id":"detail3"},{"id":"detail4"}],"filter":[],"delete":[]},"parameters":{},"name":"CustomOrder.OrderItem_0.OrderItemDetail_1","pageNumber":1,"pageSize":2147483647,"recordCount":0,"metaData":{"columns":{"id":{"dataType":12,"nullable":true,"primaryKey":false,"attribute":{"name":"id"}}},"order":"","condition":""},"rowSetName":"com.neusoft.td.crm.entity.OrderItemDetail"}}}};

         	dataCenter=new unieap.ds.DataCenter(ds);
		  </script>
       </head>
       <body class="unieap">
         
	               
	               
	               
	               
	               <div   dojoType="unieap.grid.Grid"  width="100%"  binding="{store:'CustomOrder'}">
	                
	                   <header>
	                  
	                         <cell width="200" label="CSTOMORDER" name="id"></cell>
	           
	                
	                   </header>
	              
	               </div>
	               
	               
	               <div   dojoType="unieap.grid.Grid"  width="100%"  binding="{store:'CustomOrder.OrderItem_0'}">
	                
	                   <header>
	                   
	                         <cell width="200" label="CSTOMORER_ITEMS" name="id"></cell>
	           
	                
	               
	                   </header>
	              
	               </div>
	                <div    dojoType="unieap.grid.Grid"  width="100%" binding="{store:'CustomOrder.OrderItem_0.OrderItemDetail_0'}">
	                
	                   <header>
	                  
	                         <cell width="200" label="DETAILS-1" name="id"></cell>
	           
	                
	                   
	                   </header>
	              
	               </div>
	               
	                <div   dojoType="unieap.grid.Grid"  width="100%"  binding="{store:'CustomOrder.OrderItem_0.OrderItemDetail_1'}">
	                
	                   <header>
	                   
	                         <cell width="200" label="DETAILS-2" name="id"></cell>
	           
	                
	                  
	                   </header>
	              
	               </div>
	          
       </body>
   </html>