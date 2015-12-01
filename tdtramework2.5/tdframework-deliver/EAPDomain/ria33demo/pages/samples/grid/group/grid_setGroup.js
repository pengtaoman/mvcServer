
dojo.addOnLoad(function(){
   dp.SyntaxHighlighter.HighlightAll('code');
});

function getCascade(item){
    if (item.CODEVALUE == 11) {
        return "c2";
    }
    else 
        if (item.CODEVALUE == 12) {
            return "c1";
        }
    return null;
}

function doGroup(){
    var value = String(dojo.byId("nameInput").value);
    value = value.split(",");
    unieap.byId("grid").getManager("GroupManager").setName(value);
}

function getGroup(){
    var name = unieap.byId("grid").getManager("GroupManager").getName();
    if (name) {
        alert(name);
    }
}

function cancelGroup(){
    var group = unieap.byId("grid").getManager("GroupManager");
    group.clear();
}
