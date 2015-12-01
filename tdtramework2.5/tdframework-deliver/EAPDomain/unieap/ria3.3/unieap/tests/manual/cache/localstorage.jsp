<%@ page contentType="text/html; charset=UTF-8" %>
<%@ include file="/unieap/ria3.3/pages/config.jsp" %>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        </meta>
        <title>测试cache</title>
        <style>
        	.unieap div{
        		margin: 5px 5px;
        	}
        	.unieap span{
        		color:#FF0000;
        	}
        </style>
		<script type="text/javascript">
			dojo.addOnLoad(function(){
				dojo.connect(unieap.byId("clear"),"onClick",function(){
					unieap.cache.clear();
					unieap.debug(window.localStorage);
				});
				dojo.connect(unieap.byId("put"),"onClick",function(){
					var value = "[{CODEVALUE:'1',CODENAME:'One'},{CODEVALUE:'2',CODENAME:'Two'},{CODEVALUE:'3',CODENAME:'Tree'}]";
					unieap.cache.put("ds",value,String(new Date().getTime()));
					unieap.cache.put("ds1","I am Frederick",String(new Date().getTime()));
					unieap.debug(window.localStorage);
				});
				dojo.connect(unieap.byId("getKeys"),"onClick",function(){
					var keys = unieap.cache.getKeys();
					unieap.debug(keys);
				});
				dojo.connect(unieap.byId("putMultiple"),"onClick",function(){
					var values=[],timestamps=[],keys=[];
					for(var j = 0; j < 5; j++){
						keys.push(j);
						values.push(j);
						timestamps.push(String(new Date().getTime()));
					}
					unieap.cache.putMultiple(keys,values,timestamps);
					unieap.debug(window.localStorage);
				});
				dojo.connect(unieap.byId("getCount"),"onClick",function(){
					alert(unieap.cache.getCount());
				});
				dojo.connect(unieap.byId("getAllTimestamps"),"onClick",function(){
					var timestamps = unieap.cache.getAllTimeStamps();
					unieap.debug(timestamps);
				});
			});
		</script>
	</head>
   <body class="unieap">
   	<div>
   		<div id="clear" dojoType="unieap.form.Button" label="清除缓存"></div>&nbsp;&nbsp;&nbsp;&nbsp;<span>（描述：清除缓存中的信息）</span>
   	</div>
   	<div>
 		<div id="put" dojoType="unieap.form.Button" label="添加ds和ds1"></div>&nbsp;&nbsp;&nbsp;&nbsp;<span>（描述：向缓存中添加ds和ds1）</span>	
   	</div>
   	<div>
   		<div id="getKeys" dojoType="unieap.form.Button" label="获得所有key"></div>&nbsp;&nbsp;&nbsp;&nbsp;<span>（描述：获得缓存中所有的key值）</span>
   	</div>
   	<div>
   		<div id="putMultiple" dojoType="unieap.form.Button" label="添加多个"></div>&nbsp;&nbsp;&nbsp;&nbsp;<span>（描述：一次性向缓存中添加多条记录）</span>
   	</div>
   	<div>
   		<div id="getCount" dojoType="unieap.form.Button" label="获得缓存个数"></div>&nbsp;&nbsp;&nbsp;&nbsp;<span>（描述：获得缓存记录数）</span>
   	</div>
    <div>
    	<div id="getAllTimestamps" dojoType="unieap.form.Button" label="获得所有时间戳"></div>&nbsp;&nbsp;&nbsp;&nbsp;<span>（描述：获得缓存记录的所有时间戳信息）</span>
    </div>
   </body>
</html>