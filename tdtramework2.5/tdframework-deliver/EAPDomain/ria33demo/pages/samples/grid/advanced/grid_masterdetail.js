dojo.addOnLoad(function(){
    dp.SyntaxHighlighter.HighlightAll('code');
});

function getMasterDetail(inRowIndex){
    var store = dataCenter.getDataStore("empDataStore");
    
    var result = ["<div style=\"width:auto;border-top:1px solid #dddddd;height:120px\">"];
    result.push("<table width=\"469\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\"><tr>  <td width=\"124\" rowspan=\"4\">");
    
    result.push("<img  border=0 src=\"");
    result.push(unieap.appPath + "/pages/samples/grid/advanced/images/");
    result.push(inRowIndex % 4);
    result.push(".jpeg\"></img>");
    
    result.push("</td>  <td width=\"85\" align=\"center\">工作单位：</td>  <td width=\"252\"><strong>东软集团</strong></td></tr><tr>  <td align=\"center\">政治面貌：</td>  <td>");
    var mianmao = getMianmao(inRowIndex);
    result.push(mianmao);
    result.push("</td></tr><tr>  <td align=\"center\">家庭住址：</td>  <td><u>");
    var addr = getAddress(inRowIndex);
    result.push(addr);
    result.push("</u></td></tr><tr>  <td align=\"center\"><em>联系电话：</em></td>  <td style=\"color:blue;\">");
    result.push("13322299999");
    result.push("</td></tr></table>");
    
    result.push("</div>");
    
    return result.join("");
}

function getMianmao(inRowIndex){
    switch (inRowIndex % 4) {
        case 0:
            return "团员";
        case 1:
            return "党员";
        case 2:
            return "群众";
        case 3:
            return "群众";
        default:
            return "党员";
    }
}

function getAddress(inRowIndex){
    switch (inRowIndex % 4) {
        case 0:
            return "辽宁 大连  沙河口区 XX路901号";
        case 1:
            return "辽宁 大连  中山区 YY路251号";
        case 2:
            return "辽宁 大连  甘井子区 ZZ路71号";
        case 3:
            return "辽宁 大连  西岗区 XXX路202号";
        default:
            return "辽宁 大连  沙河口区 XX路901号";
    }
}


function getMasterDetailGrid(){
    var grid = new unieap.grid.Grid({
        layout: {
            structure: [{
                rows: [[{
                    label: "员工编号",
                    name: "attr_empno",
                    width: "150px",
                    editor: {
                        editorClass: 'unieap.form.TextBox'
                    }
                }, {
                    label: "员工姓名",
                    name: "NAME",
                    width: "150px",
                    editor: {
                        editorClass: 'unieap.form.TextBox'
                    }
                }]]
            }]
        },
        edit: {
            editType: 'rowEdit',
            singleClickEdit: false
        },
        binding: {
            store: 'empFilterDataStore'
        },
        height: '145px',
        width: '326px'
    });
    return grid.domNode;
}

function getMasterDetailForm(index){
	var f=dojo.create('div',{
	innerHTML:"<div dojoType='unieap.form.Form' binding='{store:\"empFilterDataStore2\",bindIndex:"+index+"}'>"+
	"<div dojoType='unieap.form.FieldSet' title='编辑' style='width:512px;' >"+
		"<table><tr>"+
			"<td>工资</td><td><div dojoType='unieap.form.TextBox' binding='{name:\"attr_sal\"}'></div></td>"+
				"<td>入职日期</td><td><div dojoType='unieap.form.DateTextBox' binding='{name:\"attr_hiredate\"}'></div></td>"+
				"</tr></table>"+
					"</div>"+
				"</div>"
	});
	dojo.parser.parse(f);
	return f;
};
				
