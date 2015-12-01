dojo.addOnLoad(function(){
    dp.SyntaxHighlighter.HighlightAll('code');
    dp.SyntaxHighlighter.HighlightAll('code2');
    dp.SyntaxHighlighter.HighlightAll('code3');
    dp.SyntaxHighlighter.HighlightAll('code4');
    dp.SyntaxHighlighter.HighlightAll('code5');
});

var ds = {
    header: {
        code: 0,
        message: {
            title: "null",
            detail: "null"
        }
    },
    body: {
        parameters: {},
        dataStores: {
            empDataStore: {
                metaData: {
                    attr_empno: {
                        dataType: 4
                    },
                    NAME: {
                        dataType: 12
                    },
                    attr_hiredate: {
                        dataType: 93
                    }
                },
                pageSize: 30,
                pageNumber: 1,
                recordCount: 5,
                dataSetName: "ria.empDataStore",
                name: "empDataStore",
                order: "",
                condition: "",
                rowSet: [{
                    attr_empno: "250",
                    NAME: "杨作仲",
                    attr_job: "项目经理",
                    attr_sal: "1080",
                    attr_deptno: "10"
                }, {
                    attr_empno: "319",
                    NAME: "赵斌",
                    attr_job: "软件工程师",
                    attr_hiredate: "1205917947270",
                    attr_sal: "50000",
                    attr_deptno: "10"
                }, {
                    attr_empno: "216",
                    NAME: "陈旭杰",
                    attr_job: "软件工程师",
                    attr_hiredate: "1205917947270",
                    attr_sal: "3200",
                    attr_deptno: "40",
                    attr_unitid: "0711281110"
                }, {
                    attr_empno: "100",
                    NAME: "张卫滨",
                    attr_job: "RIA主架构师",
                    attr_hiredate: "1205917947270",
                    attr_sal: "5432",
                    attr_deptno: "30",
                    attr_unitid: "0711281110"
                }, {
                    attr_empno: "10000",
                    NAME: "赵磊",
                    attr_job: "产品经理",
                    attr_hiredate: "1205917947270",
                    attr_sal: "2222",
                    attr_deptno: "30",
                    attr_unitid: "0711281110"
                }]
            },
            DEPT: {
                pageSize: -1,
                pageNo: 1,
                count: 4,
                metaData: {
                    name: {
                        dataType: 1
                    }
                },
                rowSet: [{
                    CODEVALUE: "10",
                    CODENAME: "财务部"
                }, {
                    CODEVALUE: "20",
                    CODENAME: "采购部"
                }, {
                    CODEVALUE: "30",
                    CODENAME: "销售部"
                }, {
                    CODEVALUE: "40",
                    CODENAME: "开发部"
                }]
            },
            DEPT3: {
                pageSize: -1,
                pageNo: 1,
                count: 4,
                metaData: {
                    name: {
                        dataType: 1
                    }
                },
                rowSet: [{
                    CODEVALUE: "10",
                    CODENAME: "财务部3"
                }, {
                    CODEVALUE: "20",
                    CODENAME: "采购部3"
                }, {
                    CODEVALUE: "30",
                    CODENAME: "销售部3"
                }, {
                    CODEVALUE: "40",
                    CODENAME: "开发部3"
                }]
            },
            DEPT2: {
                pageSize: -1,
                pageNo: 1,
                count: 4,
                metaData: {
                    name: {
                        dataType: 1
                    }
                },
                rowSet: [{
                    CODEVALUE: "10",
                    CODENAME: "财务部2"
                }, {
                    CODEVALUE: "20",
                    CODENAME: "采购部2"
                }, {
                    CODEVALUE: "30",
                    CODENAME: "销售部2"
                }, {
                    CODEVALUE: "40",
                    CODENAME: "开发部2"
                }]
            }
        }
    }
};

dataCenter = new unieap.ds.DataCenter(ds);

var storeChanged = false;
var asc = 1;
function setDataStore(){
    if (storeChanged) {
        unieap.byId('grid').getBinding().setDataStore(unieap.getDataStore("largedata"));
    }
    else {
        unieap.byId('grid').getBinding().setDataStore(unieap.getDataStore("empDataStore"));
    }
    storeChanged = !storeChanged;
}

function getRowCount(){
    alert("表格共有 " + unieap.byId('grid').getBinding().getRowCount() + " 行数据。");
}

function setSelect(){
    var value = unieap.byId("selectInput").getValue();
    if (isNaN(value)) {
        alert("请输入数字");
    }
    else {
        value = Number(value);
        unieap.byId('grid').getManager("SelectionManager").setSelect(value, true);
    }
}

function setSelectType(){
    var type = unieap.byId("selectType").getValue();
    unieap.byId('grid').getManager("SelectionManager").setSelectType(type);
}

function getSelected(){
    var c = unieap.byId('grid').getManager("SelectionManager").getSelectedRowIndexs();
    if (c <= 0) {
        alert("当前没有数据被选中。");
    }
    else 
        if (c > 0 && c < 50) {
            alert(unieap.byId('grid').getManager("SelectionManager").getSelectedRowIndexs());
        }
        else {
            var rows = unieap.byId('grid').getManager("SelectionManager").getSelectedRowIndexs();
            var indexs = [];
            for (var i = 0; i < rows.length; i++) {
                indexs.push(rows[i]);
                if (i >= 20) {
                    indexs.push("...");
                    indexs.push("共" + rows.length + "条记录被选中");
                    break;
                }
            }
            alert(indexs)
        }
}

function setCheckedabled(){
    var value = unieap.byId("setcheckable").getValue();
    if (isNaN(value)) {
        alert("请输入数字");
    }
    else {
        value = Number(value);
        if (value >= unieap.getDataStore("empDataStore").getRecordCount()) {
            alert("您输入的数字大于总记录数。");
        }
        else {
            unieap.byId('grid').getManager("SelectionManager").setCheckabled(value, true);
        }
    }
}

function setUncheckedabled(){
    var value = unieap.byId("setuncheckable").getValue();
    if (isNaN(value)) {
        alert("请输入数字");
    }
    else {
        value = Number(value);
        if (value >= unieap.getDataStore("empDataStore").getRecordCount()) {
            alert("您输入的数字大于总记录数。");
        }
        else {
            unieap.byId('grid').getManager("SelectionManager").setCheckabled(value, false);
        }
        
    }
}

function beforeSelectHandler(){
    alert("onBeforeSelect方法被调用。");
    return true;
}

function beforeDeselectHandler(){
    alert("onBeforeDeselect方法被调用。");
    return true;
}

function afterSelectHandler(){
    alert("onAfterSelect方法被调用。");
}

function afterDeselectHandler(){
    alert("onAfterDeselect方法被调用。");
}

function beforeAllSelectHandler(){
    alert("onBeforeAllSelect方法被调用。");
    return true;
}

function afterAllSelectHandler(){
    alert("onAfterAllSelect方法被调用。");
}
