<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8" %>
<html>
       <head>
           <title>异常规则管理</title>
           <%@ include file="/unieap/ria3.3/pages/config.jsp" %>
		   
		   
		   
		 <script type="text/javascript" src="/eapdomain33/ria33demo/pages/samples/form/combobox/comboBox.js"/>
         <script>
         	var city = new unieap.ds.DataStore('city_store', [{
    CODEVALUE: 1,
    CODENAME: '宁波'
}, {
    CODEVALUE: 2,
    CODENAME: '宁海'
}, {
    CODEVALUE: 3,
    CODENAME: '温州'
}, {
    CODEVALUE: 4,
    CODENAME: '沈阳'
}, {
    CODEVALUE: 15,
    CODENAME: '大连'
}, {
    CODEVALUE: 16,
    CODENAME: '金州'
}]);
		</script>
       </head>
       <body class="unieap">
           <div dojoType="unieap.layout.TitlePane" title="系统管理 &gt; 业务规则管理 &gt; 异常规则管理" style="height: 22%;width: 100%">
		            <form id="formQuery" dojoType="unieap.form.Form">
						<div dojoType="unieap.form.FieldSet" title="查询条件">
							<table width="100%">
							    <tr>
									<td align="right" nowrap><label for="BUS_ABNORMITY_RULE_DianLeiXing" > 店面类型： </label></td>
									<td align="left"><div id="BUS_ABNORMITY_RULE_DianLeiXing" dataProvider="{'store':'dsST'}" 
									dojoType="unieap.form.ComboBox" ></div></td>
									<td align="right" nowrap><label for="BUS_ABNORMITY_RULE_ChengShiJiBie" > 城市级别： </label></td>
									<td align="left"><div id="BUS_ABNORMITY_RULE_ChengShiJiBie" dataProvider="{'store':'dsTier'}" 
									dojoType="unieap.form.ComboBox"  ></div></td>	
								</tr>
								<tr>
									<td align="right"><label for="BUS_ABNORMITY_RULE_WeiZhiJiBie" > 位置级别： </label></td>
									<td align="left"><div id="BUS_ABNORMITY_RULE_WeiZhiJiBie" dataProvider="{'store':'dsSOT'}" 
									dojoType="unieap.form.ComboBox"  ></div></td>
									<td align="right"><label for="BUS_ABNORMITY_RULE_JinZuanDian" > 金钻店： </label></td>
									<td align="left"><div id="BUS_ABNORMITY_RULE_JinZuanDian" dataProvider="{'store':'city_store'}"
									dojoType="unieap.form.ComboBox"   hasDefault="false" ></div></td>	
									<td align="right" nowrap>
										<div style="text-align: right">
									 	   <button id="btnQuery" dojoType="unieap.form.Button" label="查询" class="formfield">
					                       </button>
					                       &nbsp;
					                       <button id="btnReset" dojoType="unieap.form.Button" label="重置" class="formfield">
					                       </button>
			                   			</div>
		                   			</td>
								</tr>
							</table>
		
	                    	</div>
					 </form>
           </div>
				<div dojoType="unieap.layout.TitlePane" title="结果列表" style="height: 76%; width: 100%">
	               <div id="yichangGrid" jsId="yichangGrid"  dojoType="unieap.grid.Grid"  width="100%" height="100%" 
	               views="{rowNumber:false,rowBar:true}" selection="{selectType:'m'}" edit="{editType:'rowEdit',singleClickEdit:false}">
	                   <hidden>
	                       <cell id="cellId" name="BUS_ABNORMITY_RULE_ID" label="ID"></cell>
	                   </hidden>
	                   <header>
	                   <row>
	                       <cell width="15%" name="BUS_ABNORMITY_RULE_DianLeiXing" label="店面类型" rowSpan="2" styles="color:green;"
	                       editor="{editorClass:'unieap.form.ComboBox',editorProps:{dataProvider:{store: 'dsST'},
                           decoder:{valueAttr:'CODEVALUE',displayAttr:'CODENAME'}}}"  >
	                       </cell>
	                       <cell width="15%" name="BUS_ABNORMITY_RULE_ChengShiJiBie" label="城市级别"  rowSpan="2" styles="color:green;"
                           editor="{editorClass:'unieap.form.ComboBox',editorProps:{dataProvider:{store: 'dsTier'},
                           decoder:{valueAttr:'CODEVALUE',displayAttr:'CODENAME'}}}" >
                           </cell>
	                       <cell width="15%" name="BUS_ABNORMITY_RULE_WeiZhiJiBie" label="位置级别" rowSpan="2" styles="color:green;"
                           editor="{editorClass:'unieap.form.ComboBox',editorProps:{dataProvider:{store: 'dsSOT'},
                           decoder:{valueAttr:'CODEVALUE',displayAttr:'CODENAME'}}}" >
	                       </cell>
	                       <cell width="15%" name="BUS_ABNORMITY_RULE_JinZuanDian" label="金钻店" rowSpan="2" styles="color:green;"
                           editor="{editorClass:'unieap.form.ComboBox',editorProps:{dataProvider:{store: 'dsShop'},
                           decoder:{valueAttr:'CODEVALUE',displayAttr:'CODENAME'}}}" >
	                       </cell>
	                       <cell label="SO异常" isMulTitle="true" colSpan="2"></cell>
	                       <cell label="SO禁止" isMulTitle="true" colSpan="2"></cell>
	                   </row>
	                   <row> 
	                   	   <cell name="BUS_ABNORMITY_RULE_SOYiChangShangXian" label="上限(%)" width="10%" styles="color:green;"
	                   	   editor="{editorClass:'unieap.form.NumberTextBox',editorProps:{textAlign:'left',inputFilter:{filterRule:/[0-9]/}}}">
	                   	   </cell> 
						   <cell name="BUS_ABNORMITY_RULE_SOYiChangXiaXian" label="下限(%)" width="10%" styles="color:green;"
	                       editor="{editorClass:'unieap.form.NumberTextBox',editorProps:{textAlign:'left',inputFilter:{filterRule:/[0-9]/}}}">
	                       </cell>
	                       <cell name="BUS_ABNORMITY_RULE_SOJinZhiShangXian" label="上限(%)" width="10%" styles="color:green;"
	                       editor="{editorClass:'unieap.form.NumberTextBox',editorProps:{textAlign:'left',inputFilter:{filterRule:/[0-9]/}}}">>
	                       </cell>
	                       <cell name="BUS_ABNORMITY_RULE_SOJinZhiXiaXian" label="下限(%)" width="10%" styles="color:green;"
	                       editor="{editorClass:'unieap.form.NumberTextBox',editorProps:{textAlign:'left',inputFilter:{filterRule:/[0-9]/}}}">
	                       </cell> 
	                   </row>
	                   </header>
	                   <toolbar export="true" print="true">
	                       <button id="btnAdd" dojoType="unieap.form.Button" label="新增">
	                       </button>
	                       &nbsp;
	                       <button id="btnDelete" dojoType="unieap.form.Button" label="删除">
	                       </button>
	                       &nbsp;
	                       <button id="btnSubmit" dojoType="unieap.form.Button" label="保存" >
	                       </button>
	                   </toolbar>
	               </div>
	            </div>
       </body>
   </html>