
dojo.addOnLoad(function(){
    dp.SyntaxHighlighter.HighlightAll('code');
});

function beforeSendQuery(params, dc){
    params.info = "Welcome to PSD";
}

function beforeSend(params, dc){
    params.info = "";
}

function afterSendQuery(dc){
    setTimeout(function(){
        unieap.debug(dc)
    }, 1000);
}
