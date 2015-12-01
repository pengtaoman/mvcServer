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
<div dojoType="unieap.layout.AdaptiveContainer">

<div dojoType="unieap.layout.AdaptivePane">

<div dojoType="unieap.layout.TitlePane" title="段落标题(※收起这个pane，下面的‘结果列表’会自适应高度)" style="width:420;margin-bottom:3px;'">
    <div type="buttons"><a href="#">更多..</a></div>
    <form id='form' jsId="form" dojoType="unieap.form.Form" style="margin:0px;">	
        <table style="table-layout:fixed;font-size:12px;height:68px;">
			<tr>
				<td width="12%" align="right">客户姓名：</td>
				<td width="21%"><div dojoType="unieap.form.NumberTextBox" id="customerName" required="true"></div></td>
				<td width="12%" align="right">电子邮箱：</td>
  				<td width="21%"><div dojoType="unieap.form.NumberTextBox" id="email" ></div></td>
				<td width="12%" align="right">注册日期：</td>
  				<td><div dojoType="unieap.form.DateTextBox" id="regDate" displayFormatter="{dataFormat:'yyyy-MM-dd'}"></div></td>
			</tr>
			<tr>
				<td width="12%" align="right">详细描述：</td>
  				<td colspan=5><div dojoType="unieap.form.Textarea" width="480" required="true"></div></td>
			</tr>
	    	<tr>
				<td width="12%" ></td>
				<td colspan=5 ><div dojoType="unieap.form.Button" label=" 查 询 " ></div> <div dojoType="unieap.form.Button" label=" 重 置 "></div></td>
            </tr>
		</table>
	</form>
</div>
</div>
<div dojoType="unieap.layout.AdaptivePane"  autoHeight="true">
<div dojoType="unieap.layout.TitlePane" title="结果列表" style="width:100%;margin-bottom:3px;height:100%">
<div dojoType="unieap.form.Button" label=" 查 看 "></div><div  dojoType="unieap.form.Button" label=" 修 改 "></div><div  dojoType="unieap.form.Button" label=" 删 除 "></div>
 <div id="grid" jsId="grid" dojoType="unieap.grid.Grid" height="95%"
			binding="{store:'grid_data'}"
			rows="{defaultRowHeight:21}"
			views="{rowBar:true}"
			selection="{selectType:'multiple'}">
			
			<header>
				<row>
					<cell label="员工编号"  name="attr_empno"></cell>
					<cell label="姓名" name="NAME"  styles="text-align: center;"></cell>
					<cell label="工资" name="attr_sal" styles="text-align: center;"></cell>
					<cell label="职务"  name="attr_job" styles="text-align: center;"></cell>
					<cell label="入司时间"  name="attr_hiredate" styles="text-align: center;"></cell>
				    <cell label="操作" name="edit"></cell>
				</row>
			</header>

			<foot style="text-align:center;">
			最大薪资：<span  express="max(attr_sal)"></span>
			最小薪资：<span  express="min(attr_sal)"></span>
			行数：<span  express="getRowCount()"></span>
			自定义数据：<span  express="getData()"></span>
			测试上下文：<span style="color: #2748c2" express="${testContext}" context="myContext"></span>
		   </foot>
		<div>
			<toolbar export='{}'>
			
		    </toolbar>
		</div>
	</div>
</div>
</div>
</div>
</div>


</body>
</html>	
	