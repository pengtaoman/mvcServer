<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8" %>
<%@ include file="/unieap/ria3.3/pages/config.jsp" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		</meta>
		<title>BorderContainer样例</title>
		<style type="text/css">
			@import "<%=appPath%>/pages/samples/syntaxHighlighter/Styles/SyntaxHighlighter.css";
			@import "<%=appPath%>/pages/samples/blackbird/blackbird.css";
		</style>
		<script type="text/javascript" src="<%=appPath%>/pages/samples/blackbird/blackbird.js">
		</script>
		<script type="text/javascript" src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shCore.js">
		</script>
		<script type="text/javascript" src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shBrushXml.js">
		</script>
		<script type="text/javascript" src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shBrushJScript.js">
		</script>
		<script type="text/javascript">
			dojo.addOnLoad(function(){
				dp.SyntaxHighlighter.HighlightAll('code');
			});
			dojo.addOnLoad(function() {
				//测试隐藏、显示
				unieap.byId('bc1').hide();
				unieap.byId('bc1').show();
			});
		</script>
	</head>
	<body class="unieap">
		<div dojoType="unieap.layout.TitlePane" title="说明" style="line-height:20px;font-size: 13px;font-family: 宋体">
			方位布局组件：<br/>
			1.支持标题布局和边栏布局<br/>
			2.包含上、下、左、右、中五个布局面板，至少有一个中面板，上、下、左、右四个面板可选，上、下面板只需配置高度，左、右面板只需配置宽度，中面板宽高自适应<br/>
			3.支持分割条拖动，拖动时，支持对面板最大、最小宽度或高度的设置<br/>
			4.支持面板收缩<br/>
			5.支持是否显示标题条，是否显示分割条等属性配置<br/>	
		</div>
		<div id="bc1" dojoType="unieap.layout.BorderContainer" height="400px" width="48%" style="float:left">
			<div dojoType="unieap.layout.BorderPane" title="left,width:20%" id="left1" region="left" fixed="true" style="width:20%">
				不可拖动
			</div>
			<div dojoType="unieap.layout.BorderPane" title="right,width:30%" id="right1" region="right" width="30%" wrap="false">
				不可收缩
			</div>
			<div dojoType="unieap.layout.BorderPane" title="center" id="center1" region="center">
				标题布局
			</div>
			<div dojoType="unieap.layout.BorderPane" title="top,height:20%" id="top1" region="top" height="20%">
				拖动置顶，自动关闭
			</div>
			<div dojoType="unieap.layout.BorderPane" title="bottom,height:150px" id="bottom1" region="bottom" height="150px" minSize="100" maxSize="200">
				拖动限制,minSize=100 maxSize=200
			</div>
		</div>
		
		<div id="bc2" dojoType="unieap.layout.BorderContainer" height="400px" width="50%" design="sidebar" style="float:right">
			<div dojoType="unieap.layout.BorderPane" title="left" id="left2" region="left" style="width:20%">
				left
			</div>
			<div dojoType="unieap.layout.BorderPane" title="right" id="right2" region="right" width="30%">
				right 不显示标题条
			</div>
			<div dojoType="unieap.layout.BorderPane" title="center" id="center2" region="center">
				 边栏布局
			</div>
			<div dojoType="unieap.layout.BorderPane" title="top" id="top2" region="top" height="20%" onOpen="alert('onOpen');" onClose="alert('onClose');">
				onOpen事件，onClose事件
			</div>
			<div dojoType="unieap.layout.BorderPane" title="bottom" id="bottom2" region="bottom" height="20%" showTitleBar="false">
				bottom,不显示标题条
			</div>
		</div>
		<div style="clear:both;height:20px"></div>
		
		<div id="bc3" dojoType="unieap.layout.BorderContainer" height="200px" width="48%" splitLine="false" showTitleBar="false" style="float:left">
			<div dojoType="unieap.layout.BorderPane" title="left,width:20%" id="left3" region="left" style="width:20%">
				left
			</div>
			<div dojoType="unieap.layout.BorderPane" title="right,width:30%" id="right3" region="right" width="30%">
				right
			</div>
			<div dojoType="unieap.layout.BorderPane" title="center" id="center3" region="center">
				不显示分割条和标题条
			</div>
			<div dojoType="unieap.layout.BorderPane" title="top,height:20%" id="top3" region="top" height="20%">
				top
			</div>
			<div dojoType="unieap.layout.BorderPane" title="bottom,height:150px" id="bottom3" region="bottom" height="20%">
				left
			</div>
		</div>
		
		<div id="bc4" dojoType="unieap.layout.BorderContainer" height="200px" width="50%" design="sidebar" style="float:right">
			<div dojoType="unieap.layout.BorderPane" title="left" id="left4" region="left" style="width:20%">
				left
			</div>
			<div dojoType="unieap.layout.BorderPane" title="right" id="right4" region="right" width="30%">
				right 
			</div>
			<div dojoType="unieap.layout.BorderPane" title="center" id="center4" region="center">
				 不配置top和bottom面板，形成的左、中、右布局
			</div>
		</div>
		
		<div dojoType="unieap.layout.TitlePane" title="代码说明" style="clear:both">
			<textarea name="code" class="html">
				//左上  标题布局 BorderContainer
				<div id="bc1" dojoType="unieap.layout.BorderContainer" height="400px" width="48%" style="float:left">
					<div dojoType="unieap.layout.BorderPane" title="left,width:20%" id="left1" region="left" fixed="true" style="width:20%">
						不可拖动
					</div>
					<div dojoType="unieap.layout.BorderPane" title="right,width:30%" id="right1" region="right" width="30%" wrap="false">
						不可收缩
					</div>
					<div dojoType="unieap.layout.BorderPane" title="center" id="center1" region="center">
						标题布局
					</div>
					<div dojoType="unieap.layout.BorderPane" title="top,height:20%" id="top1" region="top" height="20%">
						拖动置顶，自动关闭
					</div>
					<div dojoType="unieap.layout.BorderPane" title="bottom,height:150px" id="bottom1" region="bottom" height="150px" minSize="100" maxSize="200">
						拖动限制,minSize=100 maxSize=200
					</div>
				</div>
				
				//右上  边栏布局BorderContainer
				<div id="bc2" dojoType="unieap.layout.BorderContainer" height="400px" width="50%" design="sidebar" splitLine="false" style="float:right">
					<div dojoType="unieap.layout.BorderPane" title="left" id="left2" region="left" style="width:20%">
						left
					</div>
					<div dojoType="unieap.layout.BorderPane" title="right" id="right2" region="right" width="30%">
						right 不显示标题条
					</div>
					<div dojoType="unieap.layout.BorderPane" title="center" id="center2" region="center">
						 边栏布局
					</div>
					<div dojoType="unieap.layout.BorderPane" title="top" id="top2" region="top" height="20%" onOpen="alert('onOpen');" onClose="alert('onClose');">
						onOpen事件，onClose事件
					</div>
					<div dojoType="unieap.layout.BorderPane" title="bottom" id="bottom2" region="bottom" height="20%" showTitleBar="false">
						bottom,不显示标题条
					</div>
				</div>
				
				//左下  不显示分割条和标题的BorderContainer
				<div id="bc3" dojoType="unieap.layout.BorderContainer" height="200px" width="48%" splitLine="false" showTitleBar="false" style="float:left">
					<div dojoType="unieap.layout.BorderPane" title="left,width:20%" id="left3" region="left" style="width:20%">
						left
					</div>
					<div dojoType="unieap.layout.BorderPane" title="right,width:30%" id="right3" region="right" width="30%">
						right
					</div>
					<div dojoType="unieap.layout.BorderPane" title="center" id="center3" region="center">
						不显示分割条和标题
					</div>
					<div dojoType="unieap.layout.BorderPane" title="top,height:20%" id="top3" region="top" height="20%">
						top
					</div>
					<div dojoType="unieap.layout.BorderPane" title="bottom,height:150px" id="bottom3" region="bottom" height="20%">
						left
					</div>
				</div>
				
				//右下   不配置top和bottom面板，形成的左、中、右布局
				<div id="bc4" dojoType="unieap.layout.BorderContainer" height="200px" width="50%" design="sidebar" style="float:right">
					<div dojoType="unieap.layout.BorderPane" title="left" id="left4" region="left" style="width:20%">
						left
					</div>
					<div dojoType="unieap.layout.BorderPane" title="right" id="right4" region="right" width="30%">
						right 
					</div>
					<div dojoType="unieap.layout.BorderPane" title="center" id="center4" region="center">
						 不配置top和bottom面板，形成的左、中、右布局
					</div>
				</div>
			</textarea>
		</div>
		
	</body>
</html>