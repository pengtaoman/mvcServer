<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ include file="/unieap/ria3.3/pages/config.jsp"%>
 
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		</meta>
		<title>datetextbox</title>
		<style type="text/css">
			@import "<%=appPath%>/pages/samples/syntaxHighlighter/Styles/SyntaxHighlighter.css";
		</style>
		<script type="text/javascript"
			src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shCore.js"></script>
		<script type="text/javascript"
			src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shBrushXml.js"></script>
		<script type="text/javascript">
			dojo.addOnLoad(function(){
				dp.SyntaxHighlighter.HighlightAll('code');
			});
			
			function evt_change(widget){
				alert(widget)
			}
		 </script>
	</head>
	<body class="unieap">
		<div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="表单日期文本框控件说明">
			·设定多种日期格式；<br>
			·am和pm时间格式；<br>
			·设置日期选择范围；<br>
			·两个时间段的比较。<br>
		</div>
		<div dojoType="unieap.layout.TitlePane" title="表单日期文本框控件样例" style="width: 100%;">
			<table style="width:100%;tab-layout:fixed;position:relative" >
				<tr>
					<td style="font-size: 13px;font-family: 宋体;width:100px;width:25%" >
						公元yyyy年MM月dd日:
					</td>
					<td>
						<div dojoType="unieap.form.DateTextBox"
						displayFormatter="{dataFormat:'公元yyyy年MM月dd日'}" width="300px"></div>
					</td>
				</tr>
				<tr>
					<td style="font-size: 13px;font-family: 宋体;width:100px;width:25%">
						yyyy年MM月dd日 HH时mm分ss秒:
					</td>
					<td>
						<div dojoType="unieap.form.DateTextBox" 
						displayFormatter="{dataFormat:'yyyy年MM月dd日 HH时mm分ss秒'}"
						popup="{showsTime:24}"
						width="300px"></div>
					</td>
				</tr>

				<tr>
					<td style="font-size: 13px;font-family: 宋体;width:25%">
						yyyy年MM月dd日 hh时mm分ss秒 pm/am:
					</td>
					<td>
						<div dojoType="unieap.form.DateTextBox" 
						displayFormatter="{dataFormat:'yyyy年MM月dd日 hh时mm分ss秒'}"
						popup="{showsTime:12}"
						width="300px"></div>
					</td>
				</tr>
				
				<tr>
					<td style="font-size: 13px;font-family: 宋体;width:25%">
						valueFormatter属性:
					</td>
					<td>
						<div dojoType="unieap.form.DateTextBox" 
						valueFormatter="{dataFormat:'yyyy/MM/dd'}"
						value="2009/08/01"
						width="300px"></div>
					</td>
				</tr>
				
				<tr>
					<td style="font-size: 13px;font-family: 宋体;width:25%">
						设置年份限制(2008～2010):
					</td>
					<td>
						<div dojoType="unieap.form.DateTextBox"
						range="{min:2008,max:2010}" 
						width="300px"></div>
					</td>
				</tr>
				
				<tr>
					<td style="font-size: 13px;font-family: 宋体;width:25%">
						设置周起始日为周一,默认是周日:
					</td>
					<td>
						<div dojoType="unieap.form.DateTextBox"
						popup="{firstDayOfWeek:1}"
						width="300px"></div>
					</td>
				</tr>
				
				<tr>
					<td style="font-size: 13px;font-family: 宋体;width:25%">
						后一个日期得晚于前一个日期:
					</td>
					<td>
						<div dojoType="unieap.form.DateTextBox" id="start_date" style="float:left;margin-right:5px" ></div>
						
						<div dojoType="unieap.form.DateTextBox" style="float:left"  validator="{preDate:'start_date'}"></div>
						
						<span clear="both"></span>
					</td>
				</tr>
				

			</table>
			
		</div>

		<div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="表单日期文本框控件源码">
			<textarea name="code" class="html">
				
				
				<div dojoType="unieap.form.DateTextBox" 
					 displayFormatter="{dataFormat:'公元yyyy年MM月dd日'}">
				</div>
				 
				<!--格式化日期并在下拉窗口底部显示时间 -->
				<div dojoType="unieap.form.DateTextBox" 
					 displayFormatter="{dataFormat:'yyyy年MM月dd日 HH时mm分ss秒'}"
				     popup="{showsTime:24}">
				</div>
				
				<!-- 显示am/pm -->
				<div dojoType="unieap.form.DateTextBox" 
					 displayFormatter="{dataFormat:'yyyy年MM月dd日 hh时mm分ss秒'}"
				     popup="{showsTime:12}">
				</div>
				
				<!-- valueFormatter属性  -->
				<div dojoType="unieap.form.DateTextBox" 
					 valueFormatter="{dataFormat:'yyyy/MM/dd'}"
				     value="2009/08/01">
				</div>
				
				<!-- preDate属性 -->
				<div dojoType="unieap.form.DateTextBox" id='start_date'></div>
				<div dojoType="unieap.form.DateTextBox" validator="{preDate:'start_date}"></div>
				 
			</textarea>
		</div>
	</body>
</html>