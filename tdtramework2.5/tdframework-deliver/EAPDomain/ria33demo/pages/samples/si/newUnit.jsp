<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8" %>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
        </meta>
        <title>新参保</title>
		<script type="text/javascript">
    		var t = new Date().getTime();
    	</script>
		<%@ include file="/unieap/ria3.3/pages/config.jsp" %>
		
		<!-- script type="text/javascript" src="<%=request.getContextPath()%>/unieap/ria3.3/unieap/patch/plugin.js">
        </script -->
		
		<script type="text/javascript">
			dojo.addOnLoad(function(){
				window.status = new Date().getTime() - t;
				<!-- document.body.style.display = 'block'; -->
			});
    	</script>
		<script type="text/javascript" src="<%=appPath%>/pages/samples/si/newUnit.js">
        </script>
		<script type="text/javascript" src="<%=appPath%>/pages/samples/si/newUnitData.js">
        </script>
    </head>
    <body class="unieap"> <!-- style="display:none"-->
        <table style="height: 550px; width: 99%; table-layout:fixed;" cellspacing="0">
            <tr style="height:500px">
                <td>
                    <div dojoType="unieap.layout.TabContainer" style="height:510px;width:100%;">
                        <div dojoType="unieap.layout.ContentPane" title="单位基本信息及参保信息">
                            <table style="height:100px; width:100%; table-layout:fixed;" cellspacing="0">
                                <colgroup>
                                    <col style="width: 60%">
                                    </col><col style="width:1%">
                                    </col><col style="width:39%">
                                    </col>
                                    </colgroup>
                                    <tr valign = "top">
                                        <td>
                                            <form dojoType="unieap.form.Form" id="ab01form">
                                                <table style="height:100%; width:100%; table-layout:fixed;" cellspacing="0">
                                                    <colgroup>
                                                        <col style="width: 100%">
                                                        </col>
                                                    </colgroup>
                                                    <tr style="height:25%">
                                                        <td>
                                                            <div dojoType="unieap.form.FieldSet" title="基本信息">
                                                                <table style="height:100%; width:99%; table-layout:fixed;" cellspacing="2">
                                                                    <colgroup>
                                                                        <col style="width:10%">
                                                                        </col><col style="width:15%">
                                                                        </col><col style="width:10%">
                                                                        </col><col style="width:15%">
                                                                        </col><col style="width:10%">
                                                                        </col><col style="width:15%">
                                                                        </col>
                                                                        </colgroup>
                                                                        <tr>
                                                                            <td>
                                                                                <label for="AB01_AAB999" style=" width: 95%;">
                                                                                    <font size="2" face="宋体">
                                                                                        单位编号
                                                                                    </font>
                                                                                </label>
                                                                            </td>
                                                                            <td>
                                                                                <div dojoType="unieap.form.NumberTextBox" style=" width: 95%;" binding={name:'AB01_AAB999'}  id="AB01_AAB999" name="AB01_AAB999" tabindex="1" readonly="readonly">
                                                                                </div>
                                                                            </td>
                                                                            <td>
                                                                                <label for="AB01_AAB004" style=" width: 95%;">
                                                                                    <font size="2" face="宋体">
                                                                                        名称
                                                                                    </font>
                                                                                </label>
                                                                            </td>
                                                                            <td colspan="3">
                                                                                <div dojoType="unieap.form.TextBox" required="true" style=" width: 98%;" binding={name:'AB01_AAB004'}  id="AB01_AAB004" name="AB01_AAB004" tabindex="2" maxlength="100">
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                        <tr style="">
                                                                            <td>
                                                                                <label for="AB01_AAB019" style=" width: 95%;">
                                                                                    <font size="2" face="宋体">
                                                                                        单位类型
                                                                                    </font>
                                                                                </label>
                                                                            </td>
                                                                            <td>
                                                                                <div name="AB01_AAB019" id="AB01_AAB019" binding={name:'AB01_AAB019'} dojoType="unieap.form.ComboBox" dataProvider="{store:'comType'}" decoder="{displayAttr:'name',valueAttr:'code'}" style=" width: 95%;" tabindex="3">
                                                                                </div>
                                                                            </td>
                                                                            <td>
                                                                                <label for="AB01_AAB020" style=" width: 95%;">
                                                                                    <font size="2" face="宋体">
                                                                                        经济类型
                                                                                    </font>
                                                                                </label>
                                                                            </td>
                                                                            <td>
                                                                                <div name="AB01_AAB020" id="AB01_AAB020" binding={name:'AB01_AAB020'} dojoType="unieap.form.ComboBox" dataProvider="{store:'jingji'}" decoder="{valueAttr:'code',displayAttr:'name'}" style=" width: 95%;" tabindex="4">
                                                                                </div>
                                                                            </td>
                                                                            <td>
                                                                                <label for="AB01_AAB021" style=" width: 95%;">
                                                                                    <font size="2" face="宋体">
                                                                                        隶属关系
                                                                                    </font>
                                                                                </label>
                                                                            </td>
                                                                            <td>
                                                                                <div name="AB01_AAB021" id="AB01_AAB021" binding={name:'AB01_AAB021'} dataProvider="{store:'lishu'}" decoder="{valueAttr:'code',displayAttr:'name'}" dojoType="unieap.form.ComboBox" style=" width: 95%;" tabindex="5">
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                        <tr style="">
                                                                            <td>
                                                                                <label for="AB01_AAB022" style=" width: 95%;">
                                                                                    <font size="2" face="宋体">
                                                                                        行业代码
                                                                                    </font>
                                                                                </label>
                                                                            </td>
                                                                            <td>
                                                                                <div name="AB01_AAB022" id="AB01_AAB022" binding={name:'AB01_AAB022'}  dataProvider="{store:'code'}" decoder="{valueAttr:'code',displayAttr:'name'}" dojoType="unieap.form.ComboBox" style=" width: 95%;" tabindex="6">
                                                                                </div>
                                                                            </td>
                                                                            <td>
                                                                                <label for="AB01_AAB301" style=" width: 95%;">
                                                                                    <font size="2" face="宋体">
                                                                                        行政区划
                                                                                    </font>
                                                                                </label>
                                                                            </td>
                                                                            <td>
                                                                                <div name="AB01_AAB301" id="AB01_AAB301" required="true" binding={name:'AB01_AAB301'} dataProvider="{store:'area'}" decoder="{valueAttr:'code',displayAttr:'name'}" dojoType="unieap.form.ComboBox" style=" width: 95%; " tabindex="7">
                                                                                </div>
                                                                            </td>
                                                                            <td>
                                                                                <label for="AB01_AAE007" style=" width: 95%;">
                                                                                    <font size="2" face="宋体">
                                                                                        邮政编码
                                                                                    </font>
                                                                                </label>
                                                                            </td>
                                                                            <td>
                                                                                <div dojoType="unieap.form.NumberTextBox" style=" width: 95%;" binding={name:'AB01_AAE007'}  id="AB01_AAE007" name="AB01_AAE007" maxlength="6" tabindex="8" textAlign="right">
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                        <tr style="">
                                                                            <td>
                                                                                <label for="AB01_AAE053" style=" width: 95%;">
                                                                                    <font size="2" face="宋体">
                                                                                        组织机构代码
                                                                                    </font>
                                                                                </label>
                                                                            </td>
                                                                            <td>
                                                                                <div dojoType="unieap.form.TextBox" style=" width: 95%;" binding={name:'AB01_AAE053'}  id="AB01_AAE053" name="AB01_AAE053" tabindex="9" maxlength="10">
                                                                                </div>
                                                                            </td>
                                                                            <td>
                                                                                <label for="AB01_AAE006" style=" width: 95%;">
                                                                                    <font size="2" face="宋体">
                                                                                        地址
                                                                                    </font>
                                                                                </label>
                                                                            </td>
                                                                            <td colspan="3">
                                                                                <div dojoType="unieap.form.TextBox" style=" width: 98%;" binding={name:'AB01_AAE006'}  id="AB01_AAE006" name="AB01_AAE006" tabindex="10" maxlength="100">
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                    </div>
                                                                </td>
                                                                </tr>
                                                                <tr style="height: 20%">
                                                                    <td>
                                                                        <div dojoType="unieap.form.FieldSet" title="工商登记信息">
                                                                            <table style="width: 99%; height: 100%; table-layout:fixed" cellspacing="2">
                                                                                <colgroup>
                                                                                    <col style="width: 10%">
                                                                                    </col><col style="width: 15%">
                                                                                    </col><col style="width: 10%">
                                                                                    </col><col style="width: 15%">
                                                                                    </col><col style="width: 10%">
                                                                                    </col><col style="width: 15%">
                                                                                    </col>
                                                                                    </colgroup>
                                                                                    <tr style="">
                                                                                        <td>
                                                                                            <label for="AB01_AAB006" style=" width: 95%;">
                                                                                                <font size="2" face="宋体">
                                                                                                    执照种类
                                                                                                </font>
                                                                                            </label>
                                                                                        </td>
                                                                                        <td>
                                                                                            <div name="AB01_AAB006" id="AB01_AAB006" binding={name:'AB01_AAB006'} dataProvider="{store:'kind'}" decoder="{valueAttr:'code',displayAttr:'name'}" dojoType="unieap.form.ComboBox" style=" width: 95%; " tabindex="11">
                                                                                            </div>
                                                                                        </td>
                                                                                        <td>
                                                                                            <label for="AB01_AAB007" style=" width: 95%;">
                                                                                                <font size="2" face="宋体">
                                                                                                    执照号码
                                                                                                </font>
                                                                                            </label>
                                                                                        </td>
                                                                                        <td>
                                                                                            <div dojoType="unieap.form.TextBox" style=" width: 95%; " binding={name:'AB01_AAB007'}  id="AB01_AAB007" name="AB01_AAB007" tabindex="12">
                                                                                            </div>
                                                                                        </td>
                                                                                        <td>
                                                                                            <label for="AB01_AAB008" style=" width: 95%;">
                                                                                                <font size="2" face="宋体">
                                                                                                    发照日期
                                                                                                </font>
                                                                                            </label>
                                                                                        </td>
                                                                                        <td>
                                                                                            <div name="AB01_AAB008" id="AB01_AAB008" binding={name:'AB01_AAB008'}  dateFormat="YYYY-MM-dd" dojoType="unieap.form.DateTextBox" style=" width: 95%; " tabindex="13">
                                                                                            </div>
                                                                                        </td>
                                                                                    </tr>
                                                                                    <tr style="">
                                                                                        <td>
                                                                                            <label for="AB01_AAB009" style=" width: 95%;">
                                                                                                <font size="2" face="宋体">
                                                                                                    有效期限(年)
                                                                                                </font>
                                                                                            </label>
                                                                                        </td>
                                                                                        <td>
                                                                                            <div dojoType="unieap.form.NumberTextBox" style=" width: 95%;" binding={name:'AB01_AAB009'}  id="AB01_AAB009" name="AB01_AAB009" tabindex="14" maxlength="3">
                                                                                            </div>
                                                                                        </td>
                                                                                        <td>
                                                                                            <label for="AB01_BAB012" style=" width: 95%; ">
                                                                                                <font size="2" face="宋体">
                                                                                                    注册地址
                                                                                                </font>
                                                                                            </label>
                                                                                        </td>
                                                                                        <td colspan="3">
                                                                                            <div dojoType="unieap.form.TextBox" style=" width: 98%;" binding={name:'AB01_BAB012'}  id="AB01_BAB012" name="AB01_BAB012" tabindex="15" maxlength="80">
                                                                                            </div>
                                                                                        </td>
                                                                                    </tr>
                                                                                    <tr style="">
                                                                                        <td>
                                                                                            <label for="AB01_AAE048" style=" width: 95%;">
                                                                                                <font size="2" face="宋体">
                                                                                                    批准成立部门
                                                                                                </font>
                                                                                            </label>
                                                                                        </td>
                                                                                        <td>
                                                                                            <div dojoType="unieap.form.TextBox" style=" width: 95%;" binding={name:'AB01_AAE048'}  id="AB01_AAE048" name="AB01_AAE048" tabindex="16" maxlength="100">
                                                                                            </div>
                                                                                        </td>
                                                                                        <td>
                                                                                            <label for="AB01_AAE049" style=" width: 95%; ">
                                                                                                <font size="2" face="宋体">
                                                                                                    批准日期
                                                                                                </font>
                                                                                            </label>
                                                                                        </td>
                                                                                        <td>
                                                                                            <div name="AB01_AAE049" id="AB01_AAE049" binding={name:'AB01_AAE049'}  dateFormat="YYYY-MM-dd" dojoType="unieap.form.DateTextBox" style=" width: 95%; " tabindex="17">
                                                                                            </div>
                                                                                        </td>
                                                                                        <td>
                                                                                            <label for="AB01_AAE051" style=" width: 95%; ">
                                                                                                <font size="2" face="宋体">
                                                                                                    批准文号
                                                                                                </font>
                                                                                            </label>
                                                                                        </td>
                                                                                        <td>
                                                                                            <div dojoType="unieap.form.TextBox" style=" width: 95%;" binding={name:'AB01_AAE051'}  id="AB01_AAE051" name="AB01_AAE051" tabindex="18" maxlength="20">
                                                                                            </div>
                                                                                        </td>
                                                                                    </tr>
                                                                                </table>
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                        <tr style="height: 15%">
                                                                            <td style="">
                                                                                <div dojoType="unieap.form.FieldSet" title="法人登记信息">
                                                                                    <table style="width: 100%; height: 100%; table-layout:fixed" cellspacing="2">
                                                                                        <colgroup>
                                                                                            <col style="width: 10%">
                                                                                            </col><col style="width: 15%">
                                                                                            </col><col style="width: 10%">
                                                                                            </col><col style="width: 15%">
                                                                                            </col><col style="width: 10%">
                                                                                            </col><col style="width: 15%">
                                                                                            </col>
                                                                                            </colgroup>
                                                                                            <tr style="">
                                                                                                <td>
                                                                                                    <label for="AB01_AAE045" style=" width: 95%;">
                                                                                                        <font size="2" face="宋体">
                                                                                                            法人姓名
                                                                                                        </font>
                                                                                                    </label>
                                                                                                </td>
                                                                                                <td>
                                                                                                    <div dojoType="unieap.form.TextBox" style=" width: 95%;" binding={name:'AB01_AAE045'}  id="AB01_AAE045" name="AB01_AAE045" tabindex="19" maxlength="50">
                                                                                                    </div>
                                                                                                </td>
                                                                                                <td>
                                                                                                    <label for="AB01_AAE046" style=" width: 95%;">
                                                                                                        <font size="2" face="宋体">
                                                                                                            法人身份号码
                                                                                                        </font>
                                                                                                    </label>
                                                                                                </td>
                                                                                                <td>
                                                                                                    <div dojoType="unieap.form.TextBox" style=" width: 95%;" binding={name:'AB01_AAE046'}  id="AB01_AAE046" name="AB01_AAE046" validation="CheckIDCard" validatetime="false" tabindex="20" maxlength="18">
                                                                                                    </div>
                                                                                                </td>
                                                                                                <td>
                                                                                                    <label for="AB01_BAB015" style=" width: 95%; ">
                                                                                                        <font size="2" face="宋体">
                                                                                                            法人电话
                                                                                                        </font>
                                                                                                    </label>
                                                                                                </td>
                                                                                                <td>
                                                                                                    <div dojoType="unieap.form.TextBox" style=" width: 95%;" binding={name:'AB01_BAB015'}  id="AB01_BAB015" name="AB01_BAB015" tabindex="21" maxlength="20">
                                                                                                    </div>
                                                                                                </td>
                                                                                            </tr>
                                                                                            <tr style="">
                                                                                                <td>
                                                                                                    <label for="AB01_BAB016" style=" width: 95%;">
                                                                                                        <font size="2" face="宋体">
                                                                                                            发证日期
                                                                                                        </font>
                                                                                                    </label>
                                                                                                </td>
                                                                                                <td>
                                                                                                    <div name="AB01_BAB016" id="AB01_BAB016" binding={name:'AB01_BAB016'}  dateFormat="YYYY-MM-dd" dojoType="unieap.form.DateTextBox" style=" width: 95%;" tabindex="22">
                                                                                                    </div>
                                                                                                </td>
                                                                                                <td>
                                                                                                    <label for="AB01_BAB017" style=" width: 95%;">
                                                                                                        <font size="2" face="宋体">
                                                                                                            代码证编号
                                                                                                        </font>
                                                                                                    </label>
                                                                                                </td>
                                                                                                <td>
                                                                                                    <div dojoType="unieap.form.TextBox" style=" width: 95%; " binding={name:'AB01_BAB017'}  id="AB01_BAB017" name="AB01_BAB017" tabindex="23" maxlength="20">
                                                                                                    </div>
                                                                                                </td>
                                                                                                <td>
                                                                                                </td>
                                                                                                <td>
                                                                                                </td>
                                                                                            </tr>
                                                                                        </table>
                                                                                        </div>
                                                                                    </td>
                                                                                    </tr>
                                                                                    <tr style="height: 20%">
                                                                                        <td style="">
                                                                                            <div dojoType="unieap.form.FieldSet" title="  其他信息">
                                                                                                <table style="height: 100%;width: 99%;table-layout:fixed" cellspacing="2">
                                                                                                    <colgroup>
                                                                                                        <col style="width: 10%">
                                                                                                        </col><col style="width: 15%">
                                                                                                        </col><col style="width: 10%">
                                                                                                        </col><col style="width: 15%">
                                                                                                        </col><col style="width: 10%">
                                                                                                        </col><col style="width: 15%">
                                                                                                        </col>
                                                                                                        </colgroup>
                                                                                                        <tr style="">
                                                                                                            <td>
                                                                                                                <label for="AAB023" style=" width: 95%;">
                                                                                                                    <font size="2" face="宋体">
                                                                                                                        主管部门
                                                                                                                    </font>
                                                                                                                </label>
                                                                                                            </td>
                                                                                                            <td>
                                                                                                                <div dojoType="unieap.form.TextBox" style=" width: 95%;" binding={name:'AB01_AAB023'}  id="AB01_AAB023" name="AAB023" tabindex="24">
                                                                                                                </div>
                                                                                                            </td>
                                                                                                            <td>
                                                                                                                <label for="AAB002" style=" width: 95%;">
                                                                                                                    <font size="2" face="宋体">
                                                                                                                        社保登记证编码
                                                                                                                    </font>
                                                                                                                </label>
                                                                                                            </td>
                                                                                                            <td>
                                                                                                                <div dojoType="unieap.form.TextBox" style=" width: 95%;" binding={name:'AB01_AAB002'}  id="AB01_AAB002" name="AAB002" tabindex="25" maxlength="20">
                                                                                                                </div>
                                                                                                            </td>
                                                                                                            <td>
                                                                                                                <label for="BAE012" style=" width: 95%;">
                                                                                                                    <font size="2" face="宋体">
                                                                                                                        传真
                                                                                                                    </font>
                                                                                                                </label>
                                                                                                            </td>
                                                                                                            <td>
                                                                                                                <div dojoType="unieap.form.TextBox" style=" width: 95%;" binding={name:'AB01_BAE012'}  id="AB01_BAE012" name="BAE012" tabindex="26" maxlength="20">
                                                                                                                </div>
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                        <tr style="">
                                                                                                            <td>
                                                                                                                <label for="AAB030" style=" width: 95%;">
                                                                                                                    <font size="2" face="宋体">
                                                                                                                        税务登记号
                                                                                                                    </font>
                                                                                                                </label>
                                                                                                            </td>
                                                                                                            <td>
                                                                                                                <div dojoType="unieap.form.NumberTextBox" style=" width: 95%;" binding={name:'AB01_AAB030'}  id="AB01_AAB030" name="AAB030" tabindex="27" maxlength="20">
                                                                                                                </div>
                                                                                                            </td>
                                                                                                            <td>
                                                                                                                <label for="AAZ066" style=" width: 95%;">
                                                                                                                    <font size="2" face="宋体">
                                                                                                                        税务机构
                                                                                                                    </font>
                                                                                                                </label>
                                                                                                            </td>
                                                                                                            <td>
                                                                                                                <div name="AAZ066" id="AAZ066" binding={name:'AB01_AAZ066'}  dojoType="unieap.form.ComboBox" dataProvider="{store:'jigou'}" decoder="{valueAttr:'code',displayAttr:'name'}" style=" width: 95%;" tabindex="28">
                                                                                                                </div>
                                                                                                            </td>
                                                                                                            <td>
                                                                                                            </td>
                                                                                                            <td>
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                        <tr style="">
                                                                                                            <td>
                                                                                                                <label for="AAE013" style=" width: 95%;">
                                                                                                                    <font size="2" face="宋体">
                                                                                                                        备注
                                                                                                                    </font>
                                                                                                                </label>
                                                                                                            </td>
                                                                                                            <td colspan="5">
                                                                                                                <div dojoType="unieap.form.TextBox" style=" width: 98%;" binding={name:'AB01_AAE013'}  id="AB01_AAE013" name="AAE013" tabindex="29" maxlength="100">
                                                                                                                </div>
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                    </table>
                                                                                                    </div>
                                                                                                </td>
                                                                                            </tr>
                                                                                            </table>
                                                                                        </form>
                                                                                        </td>
																						<td>
																						</td>
                                                                                        <td>
                                                                                            <table style="height:430px; width: 100%; table-layout:fixed" cellspacing="0">
                                                                                                <colgroup>
                                                                                                    <col style="width:50%">
                                                                                                    </col><col style="width:25%">
                                                                                                    </col><col style="width:25%">
                                                                                                    </col>
                                                                                                </colgroup>
                                                                                                <tr style="height:420px" valign="top">
                                                                                                    <td colspan="3">
                                                                                                        <div id="AB02grid" dojoType="unieap.grid.Grid" edit="{editType:'cellEdit',singleClickEdit:false}" views="{rowBar:true,orderType:'none'}" selection="{selectType:'single'}" height="420px" width="100%" style="top:9px;">
                                                                                                            <header>
                                                                                                                <cell label="险种类型" name="AB02_AAE140" width="50%" decoder="{store:'AAE140'}" editor="{editorClass:'unieap.form.ComboBox',editorProps:{dataProvider:{store: 'AAE140'}}}">
                                                                                                                </cell>
                                                                                                                <cell label="本次参保日期" name="AB02_AAB050" width="50%" editor="{editorClass:'unieap.form.DateTextBox'}" displayFormatter="{declaredClass:'unieap.form.DateDisplayFormatter',dateFormat:'yyyy-MM-dd'}">
                                                                                                                </cell>
                                                                                                            </header>
                                                                                                        </div>
                                                                                                    </td>
                                                                                                </tr>
                                                                                                <tr style="height:50px">
                                                                                                    <td>
                                                                                                    </td>
                                                                                                    <td>
                                                                                                        <div dojoType="unieap.form.Button" id="addAB02" label="添加险种" style="width: 95%">
                                                                                                        </div>
                                                                                                    </td>
                                                                                                    <td>
                                                                                                        <div dojoType="unieap.form.Button" id="delAB02" label="删除险种" style="width: 95%">
                                                                                                        </div>
                                                                                                    </td>
                                                                                                </tr>
                                                                                                </table>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </table>
                                                                                </div>
                                                                                <div dojoType="unieap.layout.ContentPane" title="联系人信息" style="height:480px;width:100%">
                                                                                    <table style="height: 100%; width: 100%; table-layout:fixed; top:9px" cellspacing="0">
                                                                                        <colgroup>
                                                                                            <col style="width:10%">
                                                                                            </col><col style="width:10%">
                                                                                            </col><col style="width:20%">
                                                                                            </col><col style="width:20%">
                                                                                            </col><col style="width:20%">
                                                                                            </col><col style="width:20%">
                                                                                            </col>
                                                                                            </colgroup>
                                                                                            <tr style="height: 380px;width:100%">
                                                                                                <td colspan="6">
                                                                                                    <div id="AE06grid" dojoType="unieap.grid.Grid" edit="{editType:'cellEdit',singleClickEdit:false}" views="{rowBar:true,orderType:'none'}" selection="{selectType:'single'}" width="100%" height="420px">
                                                                                                        <header>
                                                                                                            <cell label="联系人类型" name="AE06_BAE018" width="20%" editor="{editorClass:'unieap.form.ComboBox',editorProps:{dataProvider:{store:'AAE140'}}}">
                                                                                                            </cell>
                                                                                                            <cell label="联系人姓名" name="AE06_AAE004" width="20%" editor="{editorClass:'unieap.form.TextBox'}">
                                                                                                            </cell>
                                                                                                            <cell label="办公电话" name="AE06_AAE005" width="20%" editor="{editorClass:'unieap.form.TextBox'}">
                                                                                                            </cell>
                                                                                                            <cell label="移动电话" name="AE06_BAE017" width="20%" editor="{editorClass:'unieap.form.TextBox'}">
                                                                                                            </cell>
                                                                                                            <cell label="所在部门" name="AE06_BAE009" width="20%" editor="{editorClass:'unieap.form.TextBox'}">
                                                                                                            </cell>
                                                                                                        </header>
                                                                                                    </div>
                                                                                                </td>
                                                                                            </tr>
                                                                                            <tr style="height: 50px">
                                                                                                <td>
                                                                                                </td>
                                                                                                <td>
                                                                                                </td>
                                                                                                <td>
                                                                                                </td>
                                                                                                <td>
                                                                                                </td>
                                                                                                <td>
                                                                                                    <div dojoType="unieap.form.Button" id="addAE06" label="添加联系人" style="width: 95%; height: 22px">
                                                                                                    </div>
                                                                                                </td>
                                                                                                <td>
                                                                                                    <div dojoType="unieap.form.Button" id="delAE06" label="删除联系人" style="width: 95%;height: 22px">
                                                                                                    </div>
                                                                                                </td>
                                                                                            </tr>
                                                                                        </table>
                                                                                        </div>
                                                                                        <div dojoType="unieap.layout.ContentPane" title="银行信息" style="height:480px;width:100%">
                                                                                            <table style="height: 100%; width: 100%; table-layout:fixed;" cellspacing="0">
                                                                                                <colgroup>
                                                                                                    <col style="width:10%">
                                                                                                    </col><col style="width:10%">
                                                                                                    </col><col style="width:20%">
                                                                                                    </col><col style="width:20%">
                                                                                                    </col><col style="width:20%">
                                                                                                    </col><col style="width:20%">
                                                                                                    </col>
                                                                                                </colgroup>
                                                                                                <tr style="height: 380px">
                                                                                                    <td colspan="6">
                                                                                                        <div id="AE03grid" dojoType="unieap.grid.Grid" edit="{editType:'cellEdit',singleClickEdit:false}" views="{rowBar:true,orderType:'none'}" selection="{selectType:'single'}" width="100%" height="420px">
                                                                                                            <header>
                                                                                                                <cell label="险种类型" name="AE03_AAE140" width="15%" editor="{editorClass:'unieap.form.ComboBox',editorProps:{dataProvider:{store:'AAE140'}}}">
                                                                                                                </cell>
                                                                                                                <cell label="银行账户类型" name="AE03_AAA082" width="15%" editor="{editorClass:'unieap.form.ComboBox',editorProps:{dataProvider:{store:'AAE140'}}}">
                                                                                                                </cell>
                                                                                                                <cell label="银行类别" name="AE03_BAE010" width="15%" editor="{editorClass:'unieap.form.ComboBox',editorProps:{dataProvider:{store:'AAE140'}}}">
                                                                                                                </cell>
                                                                                                                <cell label="银行名称" name="AE03_BAB024" width="15%" editor="{editorClass:'unieap.form.TextBox'}">
                                                                                                                </cell>
                                                                                                                <cell label="银行户名" name="AE03_AAE009" width="20%" editor="{editorClass:'unieap.form.TextBox'}">
                                                                                                                </cell>
                                                                                                                <cell label="银行帐号" name="AE03_AAE010" width="20%" editor="{editorClass:'unieap.form.TextBox'}">
                                                                                                                </cell>
                                                                                                            </header>
                                                                                                        </div>
                                                                                                    </td>
                                                                                                </tr>
                                                                                                <tr style="height:50px">
                                                                                                    <td>
                                                                                                    </td>
                                                                                                    <td>
                                                                                                    </td>
                                                                                                    <td>
                                                                                                    </td>
                                                                                                    <td>
                                                                                                    </td>
                                                                                                    <td>
                                                                                                        <div dojoType="unieap.form.Button" id="addAE03" label="添加银行信息" style=" width: 95%;">
                                                                                                        </div>
                                                                                                    </td>
                                                                                                    <td>
                                                                                                        <div dojoType="unieap.form.Button" id="delAE03" label="删除银行信息" style=" width: 95%;">
                                                                                                        </div>
                                                                                                    </td>
                                                                                                </tr>
                                                                                                </table>
                                                                                            </div>
                                                                                            </div>
                                                                                        </td>
                                                                                        </tr>
																						<tr style="height:50px">
																								<td style="">
																									<table
																										style="height: 100%;  width: 99%; table-layout:fixed;"
																										cellspacing="0">
																										<colgroup>
																											<col style=""></col>
																											<col style=""></col>
																											<col style=""></col>
																											<col style=""></col>
																											<col style=""></col>
																											<col style=""></col>
																											<col style=""></col>
																											<col style=""></col>
																										</colgroup>
																										<tr style="">
																											<td>
																												<input dojoType="unieap.form.Button"
																													id="reportPrint" label="报表测试"
																													style=" width: 95%">
																												</input>
																											</td>
																											<td>
																											<input dojoType="unieap.form.Button"
																													id="gridchange" label="表格变样" style=" width: 95%">
																											</input>
																											</td>
																											<td></td>
																											<td></td>
																											<td></td>
																											<td>
																											<input dojoType="unieap.form.Button"
																													id="unitSave" label="保存" style=" width: 95%" tabindex="30">
																												</input></td>
																											<td>
																												
																											<input dojoType="unieap.form.Button"
																													id="unitprint" label="打印" style=" width: 95%"
																													disabled="true">
																												</input>	
																											</td>
																											<td align=right>
																											</td>
																										</tr>
																									</table>
																								</td>
																							</tr>
                                                                                    </table>
																					<div>注：所有按钮均绑定空事件。</div>
                                                                                    </body>
                                                                                </html>
