
dojo.addOnLoad(function(){
    dp.SyntaxHighlighter.HighlightAll('code');
    unieap.byId("refreshNode").expandNodeByPath("/1231035443386");
});

function refresh(){
    //在RowSet中新增两条记录
    treeStorePart.getRowSet().addRow({
        id: (new Date()),
        label: "新增节点1",
        "parentID": "1231035443386",
        leaf: true
    });
    treeStorePart.getRowSet().addRow({
        id: (new Date()),
        label: "新增节点2",
        "parentID": "1231035443386",
        leaf: true
    });
    //刷新节点
    unieap.byId('refreshNode').getNodeById("1231035443386").refresh();
}
