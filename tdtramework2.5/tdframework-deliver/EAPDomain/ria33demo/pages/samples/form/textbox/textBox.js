
dojo.addOnLoad(function(){
    dojo.style(unieap.byId('filterBox').inputNode, "imeMode", "disabled");
    dp.SyntaxHighlighter.HighlightAll('code');
    
});

//点击前事件
function evt_beforeClick(){
    animate("点击控件前触发");
    return true;
}

//点击事件
function evt_click(){
    animate("您点击了控件");
}

//onChange事件
function evt_change(value){
    animate("数据的值发生了变化,当前值为" + value);
}

//onBlur事件
function evt_blur(){
    animate("控件失去了焦点");
}

//onFocus事件
function evt_focus(){
    animate("控件获得了焦点");
}

//onEnter事件
function evt_enter(){
    animate("您按下了回车键");
    return false;
}

//onTab事件
function evt_tab(){
    animate('触发了onTab事件');
}

//onCopy事件
function evt_copy(){
    animate('您复制了文本');
}

//onCut事件
function evt_cut(){
    animate('您剪切了文本');
}

//onPaste事件
function evt_paste(){
    animate('您粘贴了文本');
}

function animate(str){
    dojo.animateProperty({
        node: 'info',
        properties: {
            backgroundColor: {
                start: 'yellow',
                end: 'white'
            }
        },
        duration: 2000
    }).play();
    
    dojo.byId('info').innerHTML = '<strong>' + str + '</strong>';
}
