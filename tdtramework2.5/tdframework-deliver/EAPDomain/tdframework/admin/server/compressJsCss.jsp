<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8" %>
<%
    String json = (String)request.getAttribute("json");
%>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		</meta>
		<%@ include file="/unieap/ria3.3/pages/config.jsp" %>
		<contextPath value="<%=path%>"/>
		<script language="javascript" src="<%=path%>/common/js/td_common.js" ></script>
        <script language="javascript" src="<%=path%>/common/js/waitingbar.js" ></script>
		<script type="text/javascript">
	    dojo.require("dojox.json.query");
	    dojo.require("dojo.io.script");
		dojo.addOnLoad(function(){
		
		});
		 var newRowSet = <%=json%>;
		 var newtreeStorePart = new unieap.ds.DataStore("tree01",newRowSet);
		 dataCenter.addDataStore(newtreeStorePart);
		 
		 function doCompress() {
			 var tree = unieap.byId("serverTree");
			 dojo.byId("res").innerHTML = "";
			 var selected = tree.getCheckLogic().getSelectedItems(function(items){
				 var waitres = "";
				 dojo.forEach(items,function(ele){
					 var data = ele.data;
					 
					 if (data["parent"] != "") {
						 var evaluator = dojox.json.query("?id='"+ data["parent"]+"'");
						 var host = evaluator(newRowSet);
						 //alert(data["url"]);
						 var ret = "";
						 try {
							 /*
							 dojo.rawXhrPost({
									url : data["url"],
									sync : true,
									load : function(text, args) {
										ret = text;
										 
									}
								});
							 */
                             waitres = waitres + "<div id='div_"+host[0]["host"] + data["host"]+"'><font color='red'>" + host[0]["host"] + data["host"] + "正在压缩整合，请稍等.......</font></div><br>";

							 dojo.io.script.get({
								    url: data["url"],
								    jsonp: "callback", //由flickr指定
								    timeout: 15000,
									handleAs: "json",
									preventCache: true,
									handle: function(response, ioArgs){
										var res = "";
										if(response instanceof Error && response.dojoType == "timeout"){
                                            //alert(response);
											//res = "<font color='red'>" +res + host[0]["host"] + data["host"] + "  失败！</font><br>";
											dojo.byId("div_"+host[0]["host"] + data["host"]).innerHTML="<font color='red'>"+ host[0]["host"] + data["host"] + "  失败！</font><br>"; 
											
										}else{
											 //alert(response);
											if (response.indexOf('SUC') != -1) {
												 //res = "<font color='blue'>" + res + host[0]["host"] + data["host"] + "  成功！</font><br>";
												 dojo.byId("div_"+host[0]["host"] + data["host"]).innerHTML="<font color='blue'>" + host[0]["host"] + data["host"] + "  成功！</font><br>"; 
											} else {
												 //res = "<font color='red'>" +res + host[0]["host"] + data["host"] + "  失败！</font><br>";
												dojo.byId("div_"+host[0]["host"] + data["host"]).innerHTML="<font color='red'>" + host[0]["host"] + data["host"] + "  失败！</font><br>"; 
											 }
									    }
									}
								});
							 dojo.byId("res").innerHTML = waitres;

						 } catch (e) {
							 var res = "";
							 //res = "<font color='red'>" +res + host[0]["host"] + data["host"] + "  失败！ 原因："+e+"</font><br>";
							 dojo.byId("div_"+host[0]["host"] + data["host"]).innerHTML="<font color='red'>" + host[0]["host"] + data["host"] + "  失败！原因："+e+"</font><br>"; 
						 }
					 } 
				 });
				
			 });
			 //alert(selected.length);
		 }
		</script>
		
	</head>
<body class="unieap">
	<div dojoType="unieap.layout.TitlePane"
		title="框架整合压缩JS和CSS文件">
		<div dojoType='unieap.tree.Tree' label="服务器选择" checkLogic="{model:'halfChecked'}" 
			style='height: 60%; width: 100%; overflow-x: hidden; overflow-y: auto'
			id='serverTree' 
			" binding="{'leaf':'leaf','id':'id','store':'tree01','label':'host','parent':'parent',query:{name:'parent',relation:'=',value:''}}"></div>
	 <div align="center" width="400px">
	 <br></br><br></br><input type="button" onclick="doCompress();" value="整合压缩JS和CSS文件"/>
	 </div>
	 <div id='res'></div>
	</div>
         
</body>
</html>	
	