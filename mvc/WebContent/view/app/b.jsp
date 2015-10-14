<%
    String contextPath = request.getContextPath();
%>
<link rel="stylesheet" type="text/css" media="screen" href="<%=contextPath%>/resources/jqueryui/jquery-ui.css" />
<link rel="stylesheet" type="text/css" media="screen" href="<%=contextPath%>/resources/jquery-ui-bootstrap/css/custom-theme/jquery-ui-1.10.3.custom.css" />
<link rel="stylesheet" type="text/css" media="screen" href="<%=contextPath%>/resources/jqGrid/css/ui.jqgrid-bootstrap.css" />

    <table id="list"><tr><td></td></tr></table> 
    <div id="pager"></div> 
    
<script src="<%=contextPath%>/resources/jqGrid/js/i18n/grid.locale-cn.js" type="text/javascript"></script>
<script src="<%=contextPath%>/resources/jqGrid/js/jquery.jqGrid.min.js" type="text/javascript"></script>

<script type="text/javascript">
$(function () {
    $("#list").jqGrid({
        //url: "example.php",
        datatype: "xml",
        mtype: "GET",
        colNames: ["Inv No", "Date", "Amount", "Tax", "Total", "Notes"],
        colModel: [
            { name: "invid", width: 55 },
            { name: "invdate", width: 90 },
            { name: "amount", width: 80, align: "right" },
            { name: "tax", width: 80, align: "right" },
            { name: "total", width: 80, align: "right" },
            { name: "note", width: 150, sortable: false }
        ],
        pager: "#pager",
        rowNum: 10,
        rowList: [10, 20, 30],
        sortname: "invid",
        sortorder: "desc",
        viewrecords: true,
        gridview: true,
        autoencode: true,
        caption: "My first grid"
    }); 
}); 
</script>