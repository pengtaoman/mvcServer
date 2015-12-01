<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8" %>
<%@ include file="/unieap/ria3.3/pages/config.jsp" %>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        </meta>
        <title>带右键菜单的树</title>
        <style type="text/css">
            @import "<%=appPath%>/pages/samples/syntaxHighlighter/Styles/SyntaxHighlighter.css";
        </style>
        <script type="text/javascript" src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shCore.js">
        </script>
        <script type="text/javascript" src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shBrushXml.js">
        </script>
        <script type="text/javascript" src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shBrushJScript.js">
        </script>
        <script type="text/javascript" src="<%=appPath%>/pages/samples/tree/js/collapseAllNodesData.js">
        </script>
        <script type="text/javascript" src="<%=appPath%>/pages/samples/tree/basicTree/withmenuTree.js">
        </script>
    </head>
    <body class="unieap">
        <div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="树控件说明">
            .本样例展示了一个带有右键菜单的树
            <br>
            .通过菜单控件和树的domNode相绑定可以实现此功能
        </div>
        <div dojoType="unieap.layout.TitlePane" title="树控件样例" style="width: 100%;">
            <table width="100%">
                <tr>
                    <td>
                        <div dojoType="unieap.tree.Tree" label="UniEAP" id="tree" onContextMenu="nodeContextMenu" binding = "{'leaf':'leaf','store':treeStorePart,'label':'label','parent':'parentID',query:{name:'parentID',relation:'=',value:'1212403325756'}}">
                        </div>
                    </td>
                </tr>
            </table>
        </div>
        <div dojoType="unieap.menu.Menu" id="menu" style="display:none">
            <div dojoType="unieap.menu.MenuItem" id ="expand" iconClass="plusIcon" onClick="expand" label="展开">
            </div>
            <div dojoType="unieap.menu.MenuItem" id="collapse" disabled="true" onClick="collapse" label="关闭">
            </div>
            <div dojoType="unieap.menu.MenuSeparator">
            </div>
            <div dojoType="unieap.menu.PopupMenuItem">
                <span>说明</span>
                <div dojoType="unieap.menu.Menu">
                    <div dojoType="unieap.menu.MenuItem" label="目录节点右键展开">
                    </div>
                    <div dojoType="unieap.menu.MenuSeparator">
                    </div>
                    <div dojoType="unieap.menu.MenuItem" label="叶子节点右键收缩">
                    </div>
                </div>
            </div>
        </div>
        <div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="树控件源码">
            <textarea name="code" class="html">
            <div dojoType="unieap.menu.Menu" id="menu" style="display:none">
                <div dojoType="unieap.menu.MenuItem" id ="expand" iconClass="plusIcon" onClick="expand" label="展开">
                </div>
                <div dojoType="unieap.menu.MenuItem" id="collapse" disabled="true" onClick="collapse" label="关闭">
                </div>
                <div dojoType="unieap.menu.MenuSeparator">
                </div>
                <div dojoType="unieap.menu.PopupMenuItem">
                    <span>说明</span>
                    <div dojoType="unieap.menu.Menu">
                        <div dojoType="unieap.menu.MenuItem" label="目录节点右键展开">
                        </div>
                        <div dojoType="unieap.menu.MenuSeparator">
                        </div>
                        <div dojoType="unieap.menu.MenuItem" label="叶子节点右键收缩">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </textarea>
        <textarea name="code" class="js">
            dojo.addOnLoad(function(){
            unieap.byId("menu").bindDomNode(unieap.byId("tree").domNode);
            });
            function nodeContextMenu(node){
            opernode=node;
            if(node.isLeaf()){
            unieap.byId("expand").setDisabled(true);
            unieap.byId("collapse").setDisabled(false);
            }else{
            unieap.byId("expand").setDisabled(false);
            unieap.byId("collapse").setDisabled(true);
            }
            }
        </textarea>
    </div>
    </body>
</html>
