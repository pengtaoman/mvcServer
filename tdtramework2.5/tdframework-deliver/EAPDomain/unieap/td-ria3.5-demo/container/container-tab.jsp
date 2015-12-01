<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		</meta>
		<%@ include file="/unieap/ria3.3/pages/config.jsp" %>
		<contextPath value="<%=path%>"/>
		<script type="text/javascript">
		</script>
		
	</head>
<body class="unieap">
	<div dojoType="unieap.layout.TitlePane" title="TabContainer ">
		<div dojoType="unieap.layout.TabContainer"  height="300px">
			<div dojoType="unieap.layout.ContentPane" title="TabContainer上">
				<div dojoType="unieap.layout.TabContainer"  height="100%" width="100%">
					<div dojoType="unieap.layout.ContentPane" title="内层一">
						<div dojoType="unieap.layout.TabContainer"  height="100%" width="100%" tabPosition="left-h">
							<div dojoType="unieap.layout.ContentPane" title="内层一的内层一">
								内层一的内层一
							</div>
							<div dojoType="unieap.layout.ContentPane" title="内层一的内层二" >
								内层一的内层二
							</div>
						</div>
					</div>
					<div dojoType="unieap.layout.ContentPane" title="内层二">
						内层二
					</div>
				</div>
			</div>
			<div dojoType="unieap.layout.ContentPane" title="TabContainer下">
				<div dojoType="unieap.layout.TabContainer"  style="height:200px" width="100%" tabPosition="bottom">
					<div dojoType="unieap.layout.ContentPane" title="内层一">
						内层一
					</div>
					<div dojoType="unieap.layout.ContentPane" title="内层二" >
						内层二
					</div>
				</div>
			</div>
			<div dojoType="unieap.layout.ContentPane" title="TabContainer左" >
				<div dojoType="unieap.layout.TabContainer"   height="50%" width="100%" tabPosition="left-h">
					<div dojoType="unieap.layout.ContentPane" title="内层一">
						内层一
					</div>
					<div dojoType="unieap.layout.ContentPane" title="内层二" >
						内层二
					</div>
				</div>
			</div>
			<div dojoType="unieap.layout.ContentPane" title="TabContainer右" >
				<div dojoType="unieap.layout.TabContainer" tabPosition="right-h">
					<div dojoType="unieap.layout.ContentPane" title="内层一">
						内层一
					</div>
					<div dojoType="unieap.layout.ContentPane" title="内层二" >
						内层二
					</div>
				</div>
			</div>
			<div dojoType="unieap.layout.ContentPane" title="嵌套TitlePane" >
				<div dojoType="unieap.layout.TitlePane" title="内置TitlePane" height="100%">
					内置TitlePane
				</div>
			</div>
		</div>
	</div>
</body>
</html>	
	