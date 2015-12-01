
dojo.addOnLoad(function(){
    dp.SyntaxHighlighter.HighlightAll('code');
});
function initSingle(){
    var nodes = unieap.byId("singleCascadeTree").getSelectedNodes();
    for (var i = 0; i < nodes.length; i++) {
        unieap.byId("singleCascadeTree").setChecked(nodes[i], false);
    }
    treeStorePart.getRowSet().selectRows(false, 0, treeStorePart.getRowSet().getRowCount());
}

function initChild(){
    var nodes = unieap.byId("childCascadeTree").getSelectedNodes();
    for (var i = 0; i < nodes.length; i++) {
        unieap.byId("childCascadeTree").setChecked(nodes[i], false);
    }
    treeStorePart.getRowSet().selectRows(false, 0, treeStorePart.getRowSet().getRowCount());
}

function initParent(){
    var nodes = unieap.byId("parentCascadeTree").getSelectedNodes();
    for (var i = 0; i < nodes.length; i++) {
        unieap.byId("parentCascadeTree").setChecked(nodes[i], false);
    }
    treeStorePart.getRowSet().selectRows(false, 0, treeStorePart.getRowSet().getRowCount());
}

function initHalf(){
    var nodes = unieap.byId("halfCheckedTree").getSelectedNodes();
    for (var i = 0; i < nodes.length; i++) {
        unieap.byId("halfCheckedTree").setChecked(nodes[i], false);
    }
    treeStorePart.getRowSet().selectRows(false, 0, treeStorePart.getRowSet().getRowCount());
}

function initAll(){
    var nodes = unieap.byId("cascadeTree").getSelectedNodes();
    for (var i = 0; i < nodes.length; i++) {
        unieap.byId("cascadeTree").setChecked(nodes[i], false);
    }
    treeStorePart.getRowSet().selectRows(false, 0, treeStorePart.getRowSet().getRowCount());
}
