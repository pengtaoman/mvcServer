
dojo.addOnLoad(function(){
    dp.SyntaxHighlighter.HighlightAll('code');
});
function doGroup(){
    var value = String(dojo.byId("nameInput").value);
    value = value.split(",");
    unieap.byId('grid').getManager("GroupManager").setName(value);
}

function getGroup(){
    alert(unieap.byId('grid').getManager("GroupManager").getName());
}

function cancelGroup(){
    var group = unieap.byId('grid').getManager("GroupManager");
    group.clear();
}
