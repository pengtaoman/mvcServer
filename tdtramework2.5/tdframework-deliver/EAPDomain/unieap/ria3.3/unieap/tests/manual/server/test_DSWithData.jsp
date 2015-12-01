<%@ page contentType="text/html; charset=UTF-8" %>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        </meta>
        <title>测试将查询结果放入DataStore中</title>
        <%@ include file="/unieap/ria3.3/pages/config.jsp" %>
	</head>
	<script type = "text/javascript">
		function testDrm(){
			
			unieap.Action.requestData({
				url:unieap.WEB_APP_NAME+ "/DSTest.do?method=test_withDataDrm", 
				sync:true,
				load:function(dc){
					alert(dc.getDetail());
				}
			});
		}
		function testPojo(){
			
			unieap.Action.requestData({
				url:unieap.WEB_APP_NAME+ "/DSTest.do?method=test_withDataPojo", 
				sync:true,
				load:function(dc){
					alert(dc.getDetail());
				}
			});
		}
	</script>
    <body class="unieap">
    	<div dojoType="unieap.layout.TitlePane" title="drm实现将查询结果写入DataStore测试">
			dc =  dcDao.query(dc);<br>
			dc = dcDao.count(dc);<br>
			if(ds.getRecordCount()>0){<br>
				if(ds.getRowDatas().size()==0){<br>
					System.out.println("Drm方式DataStore中无查询结果");<br>
					dc.setDetail("Drm方式DataStore中无查询结果");<br>
				}else{<br>
					dc.setDetail("Drm方式查询结果已放入DataStore中");<br>
					System.out.println("Drm方式查询结果已放入DataStore中");<br>
				}<br>
			}else{<br>
				dc.setDetail("查询结果的记录数为0");<br>
				System.out.println("查询结果的记录数为0");<br>
			}<br>
			 <div dojoType="unieap.form.Button" label="drm测试" onClick="testDrm"></div>
		</div>
		 <div dojoType="unieap.layout.TitlePane" title="pojo实现将查询结果写入DataStore测试">
			dc1 = dao.query(dc1);<br>
			dc1= dao.count(dc1);<br>
			ds1 = (DataStore) dc1.getDataStore("dept");<br>
			if(ds1.getRecordCount()>0){<br>
				if(ds1.getRowDatas().size()==0){<br>
					System.out.println("PoJo方式DataStore中无查询结果");<br>
					dc1.setDetail("PoJo方式DataStore中无查询结果");<br>
				}else{<br>
					System.out.println("PoJo方式查询结果已放入DataStore中");<br>
					dc1.setDetail("PoJo方式查询结果已放入DataStore中");<br>
				}<br>
			}else{<br>
				dc1.setDetail("查询结果的记录数为0");<br>
				System.out.println("查询结果的记录数为0");<br>
			}<br>
			 <div dojoType="unieap.form.Button" label="pojo测试" onClick="testPojo"></div>
		</div>  
			
    </body>
</html>