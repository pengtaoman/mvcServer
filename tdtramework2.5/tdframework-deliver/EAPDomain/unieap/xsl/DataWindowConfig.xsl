<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<!--  name rule used in datawindow -->
<xsl:param name="DW_TOP_DIV_BEGIN">dwDiv</xsl:param>
<xsl:param name="DW_XML_DIV_BEGIN">dwXmlDiv_</xsl:param>
<xsl:param name="DW_HEADER_DIV_BEGIN">dw_header_div_</xsl:param>
<xsl:param name="DW_HEADER_TABLE_BEGIN">dw_header_table_</xsl:param>
<xsl:param name="DW_BODY_DIV_BEGIN">dw_body_div_</xsl:param>
<xsl:param name="DW_BODY_TABLE_BEGIN">dw_body_table_</xsl:param>
<xsl:param name="DW_ROW_SELECTOR_BEGIN">dw_row_selector_</xsl:param>
<xsl:param name="DW_HIDDEN_EDITER_BEGIN">hiddenEditer_</xsl:param>
<xsl:param name="DW_DISPLAY_EDITER_BEGIN">editer_</xsl:param>
<xsl:param name="DW_QUERYCONDITION_EDITER_BEGIN">filter_</xsl:param>
<xsl:param name="DW_QUERYCONDITION_OPERATOR_EDITER_BEGIN">filter_operater_</xsl:param>
<xsl:param name="DW_CHECKBOX_BEGIN">checkbox_</xsl:param>

<xsl:param name="DW_BUTTON_ADD_BEGIN">btnAdd_</xsl:param>
<xsl:param name="DW_BUTTON_MODIFY_BEGIN">btnModify_</xsl:param>
<xsl:param name="DW_BUTTON_DEL_BEGIN">btnDel_</xsl:param>
<xsl:param name="DW_BUTTON_QUERY_BEGIN">btnQuery_</xsl:param>
<xsl:param name="DW_BUTTON_SAVE_BEGIN">btnSave_</xsl:param>
<xsl:param name="DW_BUTTON_PREROW_BEGIN">btnPreRow_</xsl:param>
<xsl:param name="DW_BUTTON_NEXTROW_BEGIN">btnNextRow_</xsl:param>
<xsl:param name="DW_BUTTON_FIRSTPAGE_BEGIN">btnFirstPage_</xsl:param>
<xsl:param name="DW_BUTTON_PREPAGE_BEGIN">btnPrePage_</xsl:param>
<xsl:param name="DW_BUTTON_NEXTPAGE_BEGIN">btnNextPage_</xsl:param>
<xsl:param name="DW_BUTTON_LASTPAGE_BEGIN">btnLastPage_</xsl:param>
<xsl:param name="DW_BUTTON_REFRESHPAGE_BEGIN">btnRefreshPage_</xsl:param>


<xsl:param name="DW_BUTTON_ADD_TYPE">insert</xsl:param>
<xsl:param name="DW_BUTTON_MODIFY_TYPE">update</xsl:param>
<xsl:param name="DW_BUTTON_DEL_TYPE">delete</xsl:param>
<xsl:param name="DW_BUTTON_QUERY_TYPE">query</xsl:param>
<xsl:param name="DW_BUTTON_SAVE_TYPE">submit</xsl:param>
<xsl:param name="DW_BUTTON_PAGE_TYPE">pagebutton</xsl:param>
<xsl:param name="DW_BUTTON_LASTPAGE_TYPE">lastpagebutton</xsl:param>
<xsl:param name="DW_BUTTON_CUSTOM_TYPE">custom</xsl:param>
<xsl:param name="DW_BUTTON_PREROW_TYPE">prerow</xsl:param>
<xsl:param name="DW_BUTTON_NEXTROW_TYPE">nextrow</xsl:param>
<xsl:param name="DW_BUTTON_RESET_TYPE">reset</xsl:param>


<xsl:param name="DW_FORM_NAME">EAPForm</xsl:param>

</xsl:stylesheet>
