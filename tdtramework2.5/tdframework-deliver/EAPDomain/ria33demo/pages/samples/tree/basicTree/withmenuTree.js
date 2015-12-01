var opernode;

dojo.addOnLoad(function(){
    dp.SyntaxHighlighter.HighlightAll('code');
    unieap.byId('menu').bindDomNode(unieap.byId("tree").domNode);
    
});

function expand(){
    unieap.byId("tree").expandNode(opernode);
}

function collapse(){
    unieap.byId("tree").collapseNode(opernode.getParent());
}

function nodeContextMenu(node){
    opernode = node;
    if (node.isLeaf()) {
        unieap.byId("expand").setDisabled(true);
        unieap.byId("collapse").setDisabled(false);
    }
    else {
        unieap.byId("expand").setDisabled(false);
        unieap.byId("collapse").setDisabled(true);
    }
}

dojo.addOnLoad(function(){
    unieap.byId("menu").bindDomNode(unieap.byId("tree").domNode);
});
