<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ include file="/unieap/ria3.3/pages/config.jsp"%>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		</meta>
		<style type="text/css">
			@import "<%=appPath%>/pages/samples/syntaxHighlighter/Styles/SyntaxHighlighter.css";
			@import "<%=appPath%>/pages/samples/blackbird/blackbird.css";
		</style>
		<script type="text/javascript" src="<%=appPath%>/pages/samples/blackbird/blackbird.js"></script>
		<script type="text/javascript" src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shCore.js"></script>
		<script type="text/javascript" src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shBrushXml.js"></script>
		<script type="text/javascript"
			src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shBrushJScript.js"></script>
		<script type="text/javascript" src="<%=appPath%>/pages/samples/layout/adaptcontainer/adaptivecontainer_callback.js"></script>
		<title>adaptcontainer</title>
	</head>
	<body class="unieap">
		<div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="说明">
			·自适应容器回调事件；<br>
			·在本例中收起或展开固定部分的TitlePane，将会自动调整自适应部分的高度，并触发对应的事件。<br>
		</div>
		<div dojoType="unieap.layout.AdaptiveContainer" title="自适应样例" height="90%" width="100%">
			<div dojoType="unieap.layout.AdaptivePane">
    			<div dojoType="unieap.layout.TitlePane" title="自适应容器包含多个自适应部分">
    				固定部分
    			</div>
    		</div>
    		<div dojoType="unieap.layout.AdaptivePane" autoHeight=true height="20%"  onContainerResize="heightChange">
    			<div style="height:99%;border:1px solid red;">
    				自适应部分一
    			</div>
    		</div>
    		<div dojoType="unieap.layout.AdaptivePane" autoHeight=true height="20%">
    			<div style="height:99%;border:1px solid red;">
    				自适应部分二
    			</div>
    		</div>
    	</div>	
       
    	<div dojoType="unieap.layout.TitlePane"  title="代码">
		  <textarea name="code" class="js">
			function heightChange(){
				if(this.isHidden())
					return ;
				alert("回调事件");
			}
			</textarea>
			<textarea name="code" class="html">			
			<div dojoType="unieap.layout.AdaptiveContainer" title="自适应样例" height="90%" width="100%">
				<div dojoType="unieap.layout.AdaptivePane">
					<div dojoType="unieap.layout.TitlePane" title="自适应容器包含多个自适应部分">
						固定部分
					</div>
				</div>
				<div dojoType="unieap.layout.AdaptivePane" autoHeight=true height="20%"  onContainerResize="heightChange">
					<div style="height:99%;border:1px solid red;">
						自适应部分一
					</div>
				</div>
				<div dojoType="unieap.layout.AdaptivePane" autoHeight=true height="20%">
					<div style="height:99%;border:1px solid red;">
						自适应部分二
					</div>
				</div>
			</div>
		  </textarea>
		</div>
    </div>
 </body>
</html>