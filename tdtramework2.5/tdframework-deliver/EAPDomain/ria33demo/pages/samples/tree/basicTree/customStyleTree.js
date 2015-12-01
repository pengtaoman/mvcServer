
dojo.addOnLoad(function(){
    dp.SyntaxHighlighter.HighlightAll('code');
});

function selfDefineIconClass(item, opened, isExpandable){
    //对叶子节点设置自定义的样式
    if (item && this.isLeafByData(item)) {
        var id = this.getBinding().getId(item);
        if (id % 2 == 0) {
            return "testTreeIconForFemale";
        }
        else {
            return "testTreeIconForMale";
        }
    }
    var clsName = (!item || isExpandable) ? (opened ? "dijitFolderOpened" : "dijitFolderClosed") : "dijitLeaf";
    return clsName
}

function selfDefineLabelStyle(item, opened, isExpandable){
    //叶子节点的文字将设为斜体
    if (item && this.isLeafByData(item)) {
        return {
            fontStyle: "italic"
        };
    }
}
