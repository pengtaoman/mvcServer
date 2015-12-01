<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8" %>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        </meta>
        <title>样例展现</title>
        <%@ include file="/unieap/ria3.3/pages/config.jsp" %>
		<style type="text/css">
			@import "/EAPDomain/ria33demo/pages/samples/syntaxHighlighter/Styles/SyntaxHighlighter.css";
		</style>
		<script type="text/javascript" src="/EAPDomain/ria33demo/pages/samples/syntaxHighlighter/Scripts/shCore.js"></script>
		<script type="text/javascript" src="/EAPDomain/ria33demo/pages/samples/syntaxHighlighter/Scripts/shBrushXml.js"></script>
		<script type="text/javascript" src="/EAPDomain/ria33demo/pages/samples/sample.js"></script>
	</head>
    <body class="unieap">
		<div dojoType="unieap.layout.TitlePane" title="样例说明"  open=true>
     	  	本样例介绍了统一的样例实现方式，主要有以下几个功能点：<br>
			·脚本引入<br>
			·页面展现形式<br>
			·代码说明注意事项
		 </div>
		 <div  style="height:300px;width:100%;border:1px ">
		 	 · 这里是样例展现区<br> 
			 ·根据样例的复杂情况考虑是否采用Tab页的方式<br>
		 </div>
			 按钮区样式展现，根据需要增减
		 <table border="1" width="100%" cellspacing="0" cellpadding="0">
			<tr>
				<th >输入</th>
				<th >操作</th>
				<th >说明</th>
			</tr>
			<tr>
				<td ><div dojoType="unieap.form.TextBox" width="100%" value="此列可根据需要增减。"></div></td>
				<td width="33%"><div dojoType="unieap.form.Button" label="功能一" width="100%"></div></td>
				<td width="33%">功能一：页面脚本引入。</td>
			</tr>
			<tr>
				<td ><div dojoType="unieap.form.TextBox" width="100%" ></div></td>
				<td ><div dojoType="unieap.form.Button" label="功能二" width="100%"></div></td>
				<td >功能二：页面展现。</td>
			</tr>
			<tr>
				<td ><div dojoType="unieap.form.TextBox" width="100%" ></div></td>
				<td ><div dojoType="unieap.form.Button" label="功能三" width="100%"></div></td>
				<td >功能三：代码说明注意事项。</td>
			</tr>
		</table>
		<br/>
		<div dojoType="unieap.layout.TitlePane" title="代码说明区" open=false>
			 <div dojoType="unieap.layout.TabContainer" style="height:350px;width:100%;float:left">
			 <div dojoType="unieap.layout.ContentPane" title="说明">
					相对于样例的展现，用户同样关心样例的文字说明部分，所以文字说明一定要同功能相对应。<br>
					
			 	</div>
			 	<div dojoType="unieap.layout.ContentPane" title="功能一代码说明" style="height:100%;width:100%">
			 		页面脚本引入：<br>
					·统一引入config.jsp，不建议使用dojo.require()方法引入脚本
						<textarea name="code" class="html">
							 &lt%@ include file="/unieap/ria3.3/pages/config.jsp" %&gt
						</textarea>
					·引入代码高亮脚本与样式，用来展示代码说明
					<textarea name="code" class="html">
						 &lt style type="text/css"&gt
							@import "&lt%=appPath%&gt/pages/samples/syntaxHighlighter/Styles/SyntaxHighlighter.css";
						 &lt /style&gt
						&lt script type="text/javascript" src="&lt%=appPath%&gt/pages/samples/syntaxHighlighter/Scripts/shCore.js" &gt &lt  /script&gt
						&lt script type="text/javascript" src="&lt%=appPath%&gt/pages/samples/syntaxHighlighter/Scripts/shBrushXml.js" &gt &lt /script&gt
					</textarea>
					·如果需要js脚本或者css样式，css、js脚本和jsp名称一致，不建议在jsp文件中写js脚本。
					<textarea name="code" class="html">
						 &lt script type="text/javascript" src="<%=appPath%>/pages/samples/sample.js" &gt &lt/script &gt
					</textarea>
			 	</div>
			 	<div dojoType="unieap.layout.ContentPane" title="功能二代码说明">
			 		页面展现：<br>
					·页面展现部分尽量简洁，如果展现功能多，建议用tab页形式。<br>
					·如果有按钮一定要和文字说明对应起来。
					
			 	</div>
				<div dojoType="unieap.layout.ContentPane" title="功能三代码说明">
					·代码说明区需要展现的是功能点对应的代码片段，而不是要将所有源码都展示<br>
					·代码说明和功能点要对应，如果功能点较多建议用tab页展示<br>
					·如果有需要将所有逻辑都展示，可标注样例路径。<br>
					·代码片段同样要有代码说明，类似代码注释。
			 	</div>
			 </div>
		</div>

    </body>
</html>