
dojo.addOnLoad(function(){
    dp.SyntaxHighlighter.HighlightAll('code');
});

function expandNodeByPath(){
    unieap.byId('tree4expand').collapseAllNodes();
    unieap.byId('tree4expand').expandNodeByPath("/1213062976264/1229578772421");
}

function showNodesById(){
    unieap.byId('tree4expand').collapseAllNodes();
    unieap.byId('tree4expand').showNodesById('query');
}

function expandNodeByLevel(){
    unieap.byId('tree4expand').expandNodeByLevel(1);
}
