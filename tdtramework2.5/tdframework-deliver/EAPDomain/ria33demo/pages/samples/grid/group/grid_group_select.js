function getSelected(){
    var select = unieap.byId("grid").managers.get("SelectionManager");
    var indexs = select.getSelectedRowIndexs();
    var data = [];
    indexs.length > 0 && (data["info"] = "rowset中选中的索引号为: " + indexs.join(","));
    dojo.forEach(indexs, function(index){
        data.push(unieap.byId("grid").getBinding().getRowSet().getRowData(index));
    })
    unieap.debug(data)
}


function setSelect(){
    var value = dijit.byId("selectInput").getValue();
    if (isNaN(value)) {
        alert("请输入数字");
    }
    else {
        value = Number(value);
        unieap.byId("grid").getManager("SelectionManager").setSelect(value, true);
    }
    
}

function setSelectType(){

    var type = dijit.byId("selectType").getValue();
    unieap.byId("grid").getManager("SelectionManager").setSelectType(type);
}

function setCheckedabled(){
    var value = dijit.byId("setcheckable").getValue();
    if (isNaN(value)) {
        alert("请输入数字");
    }
    else {
        value = Number(value);
        unieap.byId("grid").getManager("SelectionManager").setCheckabled(value, true);
    }
}

function setUncheckedabled(){
    var value = dijit.byId("setuncheckable").getValue();
    if (isNaN(value)) {
        alert("请输入数字");
    }
    else {
        value = Number(value);
        unieap.byId("grid").getManager("SelectionManager").setCheckabled(value, false);
    }
}
