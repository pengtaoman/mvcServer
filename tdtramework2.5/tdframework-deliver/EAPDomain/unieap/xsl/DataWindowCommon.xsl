<?xml version="1.0" encoding="GBK" standalone="no"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<!-- ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+
+	�ļ�˵���� ���ݴ��ڽ���ģ�弯���������κ����͵����ݴ��ڡ�
+   		   ����������Ϊ��template_common_��������
+   ����  �ˣ� ���⻪ hugh@neusoft.com
+   ����ʱ�䣺 2003-04-30
+   �޸�������
+
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->
	<!-- �ؼ���ͷģ�� -->
	<xsl:template name="template-common-header">
		<xsl:variable name="sortedIndex">
			<xsl:value-of select="/dataWindow/orderInfo/@attrIndex"/>
		</xsl:variable>
		<xsl:variable name="order">
			<xsl:value-of select="/dataWindow/orderInfo/@order"/>
		</xsl:variable>
		<xsl:element name="tr">
			<xsl:attribute name="style">height:27</xsl:attribute>			
			<th width="10" class="NEUDwListTH" align="left">
			  <xsl:choose>
				<xsl:when test="/dataWindow/@type != 'READ_ONLY'">
					<xsl:element name="input">
						<xsl:attribute name="id"><xsl:value-of select="$DW_CHECKBOX_BEGIN"/><xsl:value-of select="/dataWindow/@name"/></xsl:attribute>
						<xsl:attribute name="class">NEUDwCheckBox</xsl:attribute>
						<xsl:attribute name="value">checked</xsl:attribute>
						<xsl:attribute name="type">checkBox</xsl:attribute>					
						<xsl:if test="/dataWindow/@checkBoxStatus = 'true'">
							<xsl:attribute name="checked"/>
						</xsl:if>
						<!--<xsl:attribute name="style">background-color:#BFDDF4;height:90%</xsl:attribute>-->
						<xsl:attribute name="onclick">dwManager.getDW('<xsl:value-of select="/dataWindow/@name"/>').checkBoxOnclick(this)</xsl:attribute>
					</xsl:element>
				</xsl:when>
				<!-- ���������checkbox����ӿո� -->
				<xsl:otherwise>&#160;</xsl:otherwise>
			  </xsl:choose>
			</th>
			<xsl:for-each select="/dataWindow/headers/header[@isHidden='false']">
				<xsl:variable name="attrIndex">
					<xsl:value-of select="@attrIndex"/>
				</xsl:variable>
				<xsl:for-each select="/dataWindow/attributes/attribute[@index=$attrIndex]">
					<th align="left" nowrap="nowrap" >
						<xsl:choose>
							<xsl:when test="$attrIndex = $sortedIndex">
								<xsl:attribute name="class">NEUDwListSortedTH</xsl:attribute>
							</xsl:when>
							<xsl:otherwise>
								<xsl:attribute name="class">NEUDwListTH</xsl:attribute>
							</xsl:otherwise>
						</xsl:choose>
						<xsl:attribute name="onclick">dwManager.getDW('<xsl:value-of select="/dataWindow/@name"/>').headerOnClick(<xsl:value-of select="@index"/>)</xsl:attribute>
						<font class="NEUDwListHeaderFont">
							<xsl:value-of select="@title"/>
						</font>
						<xsl:if test="$attrIndex = $sortedIndex">
						  <xsl:choose>
							<xsl:when test="$order = 'ascending'">
								<span class="NEUAscending"/>
							</xsl:when>
							<xsl:otherwise>
								<span class="NEUDescending"/>
							</xsl:otherwise>
						 </xsl:choose>
						</xsl:if>
					</th>
				</xsl:for-each>
			</xsl:for-each>
		</xsl:element>
		<xsl:element name="tr">
			<xsl:attribute name="style">height:22</xsl:attribute>
			<td width="10"/>
			<xsl:for-each select="/dataWindow/headers/header[@isHidden='false']">
				<td nowrap="nowrap">
					<input type="button" style="height:10;width:{@width};" tabindex="-1"/>
				</td>
			</xsl:for-each>
		</xsl:element>
	</xsl:template>
	<!-- begin -->
	<xsl:template name="template-one-order-buttons">
	    <xsl:param name="id"/>
	    <xsl:param name="name"/>
		<xsl:param name="value"/>
		<xsl:param name="onclick"/>
		<xsl:param name="type"/>
		<xsl:param name="class"/>
		<xsl:param name="boControllerName"/>
		<xsl:param name="boControllerMethod"/>
		<xsl:param name="actionName"/>
		<xsl:param name="actionMethod"/>
		<xsl:param name="isPartlyRefresh"/>
		<xsl:param name="title"/>
		<xsl:param name="disabled" />
		<xsl:element name="input">				
				<xsl:attribute name="name"><xsl:value-of select="$name"/></xsl:attribute>
				<xsl:attribute name="type">button</xsl:attribute>
				<xsl:choose>
					<xsl:when test="$class!='' and $disabled!='true' ">					
						<xsl:attribute name="class"><xsl:value-of select="$class"/></xsl:attribute>
					</xsl:when>
					<xsl:when test="$class!='' and $disabled='true' ">					
						<xsl:attribute name="class"><xsl:value-of select="$class"/>_Disabled</xsl:attribute>
					</xsl:when>					
					<xsl:otherwise>
						<xsl:attribute name="class">NEUDwButton</xsl:attribute>
					</xsl:otherwise>
				</xsl:choose>
				<xsl:attribute name="boControllerName"><xsl:value-of select="$boControllerName"/></xsl:attribute>
				<xsl:attribute name="boControllerMethod"><xsl:value-of select="$boControllerMethod"/></xsl:attribute>
				<xsl:attribute name="actionName"><xsl:value-of select="$actionName"/></xsl:attribute>
				<xsl:attribute name="actionMethod"><xsl:value-of select="$actionMethod"/></xsl:attribute>
				<xsl:attribute name="isPartlyRefresh"><xsl:value-of select="$isPartlyRefresh"/></xsl:attribute>
				<xsl:attribute name="title"><xsl:value-of select="$title"/></xsl:attribute>
				<xsl:attribute name="value"/>		
				<xsl:choose>
				   <xsl:when test="$type=$DW_BUTTON_CUSTOM_TYPE">
				    <xsl:attribute name="id"><xsl:value-of select="$id"/></xsl:attribute>
				    <xsl:attribute name="onclick"><xsl:value-of select="$onclick"/></xsl:attribute>
				    <xsl:attribute name="value"><xsl:value-of select="$value"/></xsl:attribute>	
				    </xsl:when>
			    <xsl:otherwise>
			        <xsl:attribute name="id"><xsl:value-of select="$id"/><xsl:value-of select="/dataWindow/@name"/></xsl:attribute>
				    <xsl:if test="$onclick != '' ">
					   <xsl:attribute name="onclick">dwManager.getDW('<xsl:value-of select="/dataWindow/@name"/>').<xsl:value-of select="$onclick"/></xsl:attribute>
				   </xsl:if>						
			   </xsl:otherwise>
			   </xsl:choose>
				   <xsl:if test="$disabled='true'">
				   				<xsl:attribute name="disabled"><xsl:value-of select="$disabled"/></xsl:attribute>		   
				   	</xsl:if>
	      

	      </xsl:element>
	</xsl:template>
	<!-- end -->
	<!-- ���ð�ťģ�壺ִ�з�ҳ�Ĳ�����ť -->
	<xsl:template name="template-common-buttons">
		<td align="right">
		  <table cellspacing="0" ><tr align="right"><td class="icon2_td">
			<xsl:call-template name="template-common-one-button">
				<xsl:with-param name="id">
					<xsl:value-of select="$DW_BUTTON_QUERY_BEGIN"/>
					<xsl:value-of select="/dataWindow/@name"/>
				</xsl:with-param>
				<xsl:with-param name="value"/>
				<xsl:with-param name="onclick">query()</xsl:with-param>
				<xsl:with-param name="type">
					<xsl:value-of select="$DW_BUTTON_QUERY_TYPE"/>
				</xsl:with-param>
				<xsl:with-param name="class">NEUDwButton_Query</xsl:with-param>
				<xsl:with-param name="title">��ѯ</xsl:with-param>
			</xsl:call-template>
			</td>
			<xsl:for-each select="/dataWindow/buttons/button[@type=$DW_BUTTON_PAGE_TYPE]">
			    <td class="icon2_td"><input type="button" title="��һҳ" id="{$DW_BUTTON_FIRSTPAGE_BEGIN}{/dataWindow/@name}" class="NEUDwButton_FirstPage" onclick="dsSessionMgr('loadFirstPage','{$DW_FORM_NAME}','{/dataWindow/@name}')"/></td>
				<td class="icon2_td"><input type="button" title="��һҳ" id="{$DW_BUTTON_PREPAGE_BEGIN}{/dataWindow/@name}" class="NEUDwButton_PreviousPage" onclick="dsSessionMgr('loadPreviousPage','{$DW_FORM_NAME}','{/dataWindow/@name}')"/></td>
				<td style="height: 22px; width: 27px;"><font class="NEUDwListDodyFont"><xsl:value-of select="/dataWindow/dataObjs/@pageNo"/>/<xsl:value-of select="/dataWindow/dataObjs/@pageCount"/></font></td>
				<td class="icon2_td"><input type="button" title="��һҳ" id="{$DW_BUTTON_NEXTPAGE_BEGIN}{/dataWindow/@name}" class="NEUDwButton_NextPage" onclick="dsSessionMgr('loadNextPage','{$DW_FORM_NAME}','{/dataWindow/@name}')"/></td>
				<td class="icon2_td"><input type="button" title="���һҳ" id="{$DW_BUTTON_LASTPAGE_BEGIN}{/dataWindow/@name}" class="NEUDwButton_LastPage" onclick="dsSessionMgr('loadLastPage','{$DW_FORM_NAME}','{/dataWindow/@name}')"/></td>
				<td style="height: 22px; width: 27px;"><input type="text" id="turn_pages_{/dataWindow/@name}" name="turn_pages_{/dataWindow/@name}" value="{/dataWindow/dataObjs/@pageNo}" style="width:25;ime-mode:disabled" JSObjName="Number" onkeydown="eapObjsMgr.getEAPObj(this).getBaseObj().enterToTab()" onkeypress="eapObjsMgr.getEAPObj(this).OnlyNumber()" minlength="1"/></td>
				<td class="icon2_td"><input type="button" title="��ת��ָ��ҳ" id="btnCertainPage_{/dataWindow/@name}" class="NEUDwButton_GoPage" value="" onclick="dsSessionMgr('loadCertainPage','{$DW_FORM_NAME}','{/dataWindow/@name}',null,'turn_pages_{/dataWindow/@name}')"/></td>
				<xsl:if test="/dataWindow/dataObjs/@rsCount != '-1'">
				<td style="height: 22px;">
					<font class="NEUDwListDodyFont">
			    	&#160;��<xsl:value-of select="/dataWindow/dataObjs/@rsCount"/>����¼&#160;
			    </font></td>
				</xsl:if>				
			</xsl:for-each>
			</tr></table>
		</td>
	</xsl:template>
	<!-- ���ð�ťģ�壺��һ����ť(��Ҫ��ʱ�������Ļ�) -->
	<xsl:template name="template-common-one-button">
		<xsl:param name="id"/>
		<xsl:param name="value"/>
		<xsl:param name="onclick"/>
		<xsl:param name="type"/>
		<xsl:param name="class"/>
		<xsl:param name="title"/>
		<xsl:for-each select="/dataWindow/buttons/button[@type=$type]">
			<xsl:element name="input">
				<xsl:attribute name="id"><xsl:value-of select="$id"/></xsl:attribute>
				<xsl:attribute name="type">button</xsl:attribute>
				<xsl:choose>
					<xsl:when test="$class!=''">
						<xsl:attribute name="class"><xsl:value-of select="$class"/></xsl:attribute>
					</xsl:when>
					<xsl:otherwise>
						<xsl:attribute name="class">NEUDwButton</xsl:attribute>
					</xsl:otherwise>
				</xsl:choose>
				<xsl:attribute name="boControllerName"><xsl:value-of select="@boControllerName"/></xsl:attribute>
				<xsl:attribute name="boControllerMethod"><xsl:value-of select="@boControllerMethod"/></xsl:attribute>
				<xsl:attribute name="actionName"><xsl:value-of select="@actionName"/></xsl:attribute>
				<xsl:attribute name="actionMethod"><xsl:value-of select="@actionMethod"/></xsl:attribute>
				<xsl:attribute name="isPartlyRefresh"><xsl:value-of select="@isPartlyRefresh"/></xsl:attribute>
				<xsl:attribute name="title"><xsl:value-of select="$title"/></xsl:attribute>
				<xsl:attribute name="value"/>
			
				<xsl:if test="$onclick != '' ">
					<xsl:attribute name="onclick">dwManager.getDW('<xsl:value-of select="/dataWindow/@name"/>').<xsl:value-of select="$onclick"/></xsl:attribute>
				</xsl:if>
			</xsl:element>
		</xsl:for-each>
	</xsl:template>
	<!-- ���ð�ťģ�壺���Զ��尴ť -->
	<xsl:template name="template-common-custom-button">
		<xsl:for-each select="/dataWindow/buttons/button[@type=$DW_BUTTON_CUSTOM_TYPE]">
			<xsl:element name="input">
				<xsl:attribute name="id"><xsl:value-of select="@id"/></xsl:attribute>
				<xsl:attribute name="name"><xsl:value-of select="@name"/></xsl:attribute>
				<xsl:attribute name="type">button</xsl:attribute>
				<xsl:attribute name="class">NEUDwButton</xsl:attribute>
				<xsl:attribute name="boControllerName"><xsl:value-of select="@boControllerName"/></xsl:attribute>
				<xsl:attribute name="boControllerMethod"><xsl:value-of select="@boControllerMethod"/></xsl:attribute>
				<xsl:attribute name="actionName"><xsl:value-of select="@actionName"/></xsl:attribute>
				<xsl:attribute name="actionMethod"><xsl:value-of select="@actionMethod"/></xsl:attribute>
				<xsl:attribute name="isPartlyRefresh"><xsl:value-of select="@isPartlyRefresh"/></xsl:attribute>
				<xsl:attribute name="value"><xsl:value-of select="@value"/></xsl:attribute>
				<xsl:attribute name="onclick"><xsl:value-of select="@onclick"/></xsl:attribute>
			</xsl:element>
		</xsl:for-each>
	</xsl:template> 
	<!-- ��¼��ģ�壺����dataWindow/headers/header����dataOjbs/dataObj/attribute�������б�Ԫ -->
	<xsl:template name="template-common-attributes">
		<xsl:param name="onDblClick">dwManager.getDW('<xsl:value-of select="/dataWindow/@name"/>').cell_onDblClick()</xsl:param>
		<xsl:param name="dataObjIndex">1</xsl:param>
		<xsl:for-each select="/dataWindow/headers/header[@isHidden='false']">
			<xsl:variable name="attrIndex">
				<xsl:value-of select="@attrIndex"/>
			</xsl:variable>
			<xsl:for-each select="/dataWindow/dataObjs/dataObj[number($dataObjIndex)]/attribute[number($attrIndex)]">
			  <!--wanghx begin-->
		          <xsl:variable name="var_united"><xsl:value-of select="/dataWindow/dataObjs/dataObj[number($dataObjIndex)]/attribute[number($attrIndex)]/@unitedcol"/></xsl:variable>
		          <xsl:choose>
		           <xsl:when test="$var_united='0'">
		           </xsl:when>
	               <xsl:when test="$var_united >'0'">
			  <!-- wanghx end-->
				<td nowrap="nowrap">
			  		<!--wanghx begin-->
                              <xsl:attribute name="rowspan"><xsl:value-of select="$var_united"/></xsl:attribute>
			  		<!-- wanghx end-->
					<!-- ΪTD����һ������css-->
				    <xsl:if test="@tdcss">
						<xsl:attribute name="class"><xsl:value-of select="@tdcss"/></xsl:attribute>
				    </xsl:if>
					<!-- ΪTD����һ������index -->
					<xsl:attribute name="index"><xsl:value-of select="@index"/></xsl:attribute>
					<!-- ΪTD����һ������onDblClick -->
					<xsl:attribute name="onDblClick"><xsl:value-of select="$onDblClick"/></xsl:attribute>
					<xsl:variable name="columnText">
						<xsl:value-of select="." />
					</xsl:variable>
					<xsl:for-each select="/dataWindow/attributes/attribute[@index=$attrIndex]">
					<!-- ΪTD����һ������align-->
					 <xsl:attribute name="align"><xsl:value-of select="@align"/></xsl:attribute>
					
					   <font class="NEUDwListDodyFont">						
							<xsl:choose>
								<xsl:when test="@isLink='true'">
									<xsl:element name="a">
										<xsl:attribute name="href"><xsl:value-of select="@href"/>&amp;dwid=<xsl:value-of select="/dataWindow/@dwid"/>&amp;rowIndex=<xsl:value-of select="$dataObjIndex"/>&amp;columnIndex=<xsl:value-of select="$attrIndex"/></xsl:attribute>
										<xsl:attribute name="target"><xsl:value-of select="@target"/></xsl:attribute>
										<xsl:attribute name="class">NEUDwListLink</xsl:attribute>
										<xsl:attribute name="class"><xsl:value-of select="@linkClass"/></xsl:attribute>
										<xsl:call-template name="br">
									<xsl:with-param name="string">
									<xsl:call-template name="nbsp">
									  <xsl:with-param name="string"><xsl:value-of select="$columnText"/></xsl:with-param> 
									  </xsl:call-template>
									  </xsl:with-param> 
							    </xsl:call-template>&#160;
									</xsl:element>
								</xsl:when>
								<xsl:when test="@isImage='true'">
									<xsl:element name="a">
										<xsl:attribute name="href">/example/dealImageAction.do?method=deal&amp;dwid=<xsl:value-of select="/dataWindow/@dwid"/>&amp;rowIndex=<xsl:value-of select="$dataObjIndex"/>&amp;columnIndex=<xsl:value-of select="$attrIndex"/></xsl:attribute>
										<xsl:attribute name="target">_Blank</xsl:attribute>
										<xsl:attribute name="class">NEUDwListLink</xsl:attribute>
										<xsl:attribute name="class"><xsl:value-of select="@linkClass"/></xsl:attribute>
									�޸�ͼƬ
								</xsl:element>
								</xsl:when>
								<xsl:when test="@JSObjName='Password'">
									    <xsl:call-template name="passwordChar">
									        <xsl:with-param name="length"  select="string-length(normalize-space($columnText))"/>
								        </xsl:call-template>								
								 </xsl:when>								
								<xsl:otherwise>
								    <xsl:call-template name="br">
									<xsl:with-param name="string">
									<xsl:call-template name="nbsp">
									  <xsl:with-param name="string"><xsl:value-of select="$columnText"/></xsl:with-param> 
									  </xsl:call-template>
									  </xsl:with-param> 
							    </xsl:call-template>&#160;</xsl:otherwise>
							</xsl:choose>						
					   </font>
					</xsl:for-each>
				</td>
			  <!--wanghx begin-->	
			  </xsl:when>
			  <xsl:otherwise>
				<td nowrap="nowrap">
				    <xsl:variable name="columnText">				        		      					
						 <xsl:value-of select="." disable-output-escaping="no"/>				                 					
					</xsl:variable>					
					<!-- ΪTD����һ������index -->
					<xsl:attribute name="index"><xsl:value-of select="@index"/></xsl:attribute>
					<!-- ΪTD����һ������index -->
					<xsl:attribute name="onDblClick"><xsl:value-of select="$onDblClick"/></xsl:attribute>					
					<xsl:for-each select="/dataWindow/attributes/attribute[@index=$attrIndex]">
					   <!-- ΪTD����һ������align-->
					   <xsl:attribute name="align"><xsl:value-of select="@align"/></xsl:attribute>
					   <!-- ΪTD����һ������tdcss-->
					   <xsl:attribute name="class"><xsl:value-of select="@tdcss"/></xsl:attribute>
					   <font class="NEUDwListDodyFont">						
							<xsl:choose>
								<xsl:when test="@isLink='true'">
									<xsl:element name="a">
										<xsl:attribute name="href"><xsl:value-of select="@href"/>&amp;dwid=<xsl:value-of select="/dataWindow/@dwid"/>&amp;rowIndex=<xsl:value-of select="$dataObjIndex"/>&amp;columnIndex=<xsl:value-of select="$attrIndex"/></xsl:attribute>
										<xsl:attribute name="target"><xsl:value-of select="@target"/></xsl:attribute>
										<xsl:attribute name="class">NEUDwListLink</xsl:attribute>
										<xsl:attribute name="class"><xsl:value-of select="@linkClass"/></xsl:attribute>
										<xsl:call-template name="br">
									<xsl:with-param name="string">
									<xsl:call-template name="nbsp">
									  <xsl:with-param name="string"><xsl:value-of select="$columnText"/></xsl:with-param> 
									  </xsl:call-template>
									  </xsl:with-param> 
							    </xsl:call-template>&#160;</xsl:element>
								</xsl:when>
								<xsl:when test="@isImage='true'">
									<xsl:element name="a">
										<xsl:attribute name="href">/example/dealImageAction.do?method=deal&amp;dwid=<xsl:value-of select="/dataWindow/@dwid"/>&amp;rowIndex=<xsl:value-of select="$dataObjIndex"/>&amp;columnIndex=<xsl:value-of select="$attrIndex"/></xsl:attribute>
										<xsl:attribute name="target">_Blank</xsl:attribute>
										<xsl:attribute name="class">NEUDwListLink</xsl:attribute>
										<xsl:attribute name="class"><xsl:value-of select="@linkClass"/></xsl:attribute>
									�޸�ͼƬ
								</xsl:element>
								</xsl:when>
								<xsl:when test="@JSObjName='Password'">
									    <xsl:call-template name="passwordChar">
									        <xsl:with-param name="length"  select="string-length(normalize-space($columnText))"/>
								        </xsl:call-template>								
								 </xsl:when>								
								<xsl:otherwise>								
								 <xsl:call-template name="br">
									<xsl:with-param name="string">
									<xsl:call-template name="nbsp">
									  <xsl:with-param name="string"><xsl:value-of select="$columnText"/></xsl:with-param> 
									  </xsl:call-template>
									  </xsl:with-param> 
							    </xsl:call-template>&#160;</xsl:otherwise>
							</xsl:choose>						
					    </font>
					</xsl:for-each>   
				</td>
			  </xsl:otherwise>
			 </xsl:choose>
			  <!--wanghx end-->
			</xsl:for-each>
		</xsl:for-each>
	</xsl:template>
	<!-- �س����� -->
	
<xsl:template name="br">
<xsl:param name="string"/>
<xsl:choose>
<xsl:when test="contains($string,'&#10;')">
 <xsl:value-of select="substring-before($string,'&#10;')"/><br/>
 <xsl:call-template name="br">
 <xsl:with-param name="string" select="substring-after($string,'&#10;')"/>
 </xsl:call-template>
</xsl:when>
<xsl:otherwise>
 <xsl:value-of select="$string"/>
</xsl:otherwise>
</xsl:choose>
</xsl:template>
<xsl:template name="nbsp">
 <xsl:param name="string"/>
 <xsl:choose>
<xsl:when test="contains($string,' ')">
 <xsl:value-of select="substring-before($string,' ')"/>&#160;<xsl:call-template name="nbsp">
 <xsl:with-param name="string" select="substring-after($string,' ')"/>
 </xsl:call-template>
</xsl:when>
<xsl:otherwise>
 <xsl:value-of select="$string"/>
</xsl:otherwise>
</xsl:choose>
</xsl:template>
	<!-- ���ر༭��: -->
	<xsl:template name="template-hiddenEditer" match="/dataWindow/attributes/attribute">
		<xsl:element name="div">
			<xsl:attribute name="id">hiddenEditer_div_<xsl:value-of select="/dataWindow/@name"/></xsl:attribute>
			<xsl:attribute name="style">display:'none'</xsl:attribute>
			<table>
				<xsl:for-each select="/dataWindow/attributes/attribute">
					<tr>
						<td align="right" width="50%">
							<xsl:value-of select="@title"/>
						</td>
						<td align="left" width="50%">
							<xsl:element name="{@type}">
								<xsl:attribute name="colIndex"><xsl:value-of select="@index"/></xsl:attribute>
								<xsl:attribute name="id"><xsl:value-of select="$DW_HIDDEN_EDITER_BEGIN"/><xsl:value-of select="/dataWindow/@name"/>_<xsl:value-of select="@index"/></xsl:attribute>
								<xsl:attribute name="style">width:<xsl:value-of select="@width"/>;<xsl:value-of select="@style"/></xsl:attribute>
                                <xsl:if test="@hasAidBtn='true'">
                                   <xsl:attribute name="style">width:<xsl:value-of select="number(@width)-20"/>;<xsl:value-of select="@style"/></xsl:attribute>
                                </xsl:if>								
								<xsl:attribute name="class"><xsl:value-of select="@class"/></xsl:attribute>
								<xsl:attribute name="name"><xsl:value-of select="$DW_HIDDEN_EDITER_BEGIN"/><xsl:value-of select="/dataWindow/@name"/>_<xsl:value-of select="@index"/></xsl:attribute>
								<!-- �������Ϳؼ����Կ�ʼ -->
								<xsl:attribute name="isreadonly"><xsl:value-of select="@isreadonly"/></xsl:attribute>
								<xsl:attribute name="prompt"><xsl:value-of select="@title"/></xsl:attribute>
								<xsl:attribute name="minlength"><xsl:value-of select="@minlength"/></xsl:attribute>
								<xsl:attribute name="fixlength"><xsl:value-of select="@fixlength"/></xsl:attribute>
								<xsl:attribute name="maxlength"><xsl:value-of select="@maxlength"/></xsl:attribute>
								<xsl:attribute name="dateformat"><xsl:value-of select="@dateformat"/></xsl:attribute>
								<xsl:attribute name="precision"><xsl:value-of select="@precision"/></xsl:attribute>
								<xsl:attribute name="onchange"><xsl:value-of select="@onchange"/></xsl:attribute>
								<xsl:attribute name="onblur"><xsl:value-of select="@onblur"/></xsl:attribute>
								<xsl:attribute name="onkeydown"><xsl:value-of select="@onkeydown"/></xsl:attribute>
								<xsl:attribute name="onkeypress"><xsl:value-of select="@onkeypress"/></xsl:attribute>
								<xsl:attribute name="onfocus"><xsl:value-of select="@onfocus"/></xsl:attribute>
								<xsl:attribute name="isNullable"><xsl:value-of select="@isNullable"/></xsl:attribute>
								<xsl:attribute name="JSObjName"><xsl:value-of select="@JSObjName"/></xsl:attribute>								
								<xsl:attribute name="popup"><xsl:value-of select="@popup"/></xsl:attribute>
								<xsl:attribute name="pattern"><xsl:value-of select="@pattern"/></xsl:attribute>
								<xsl:attribute name="align"><xsl:value-of select="@align"/></xsl:attribute>
								<xsl:if test="@JSObjName='Password'">
								<xsl:attribute name="type">password</xsl:attribute>
								</xsl:if>	

								<!-- �������Ϳؼ����Խ��� -->
								<xsl:if test="@type='select'">
									<xsl:attribute name="size">1</xsl:attribute>
									<xsl:attribute name="isNotInDW">true</xsl:attribute>
									
									<option value="">��ѡ��</option>
									
									<xsl:for-each select="option">
										<xsl:element name="option">
											<xsl:attribute name="value"><xsl:value-of select="@value"/></xsl:attribute>
											<xsl:attribute name="isSelectedInDW"><xsl:value-of select="@selected"/></xsl:attribute>
											<xsl:value-of select="."/>
										</xsl:element>
									</xsl:for-each>
								</xsl:if>
							</xsl:element>
						</td>
					</tr>
				</xsl:for-each>
			</table>
		</xsl:element>
	</xsl:template>
	
	
	<!-- �ɼ��༭������ģ��: ������ȡ������Ҫ����PopWin�ı༭�� -->
	<xsl:template name="template-displayEditer-core">
		<xsl:for-each select="editers/editer">
			<xsl:if test="@isRowBegin = 'true'">
				<xsl:text disable-output-escaping="yes">&lt;tr class="NEUDwCommon"&gt;</xsl:text>
			</xsl:if>
			<xsl:variable name="attrIndex">
				<xsl:value-of select="@attrIndex"/>
			</xsl:variable>
			<xsl:variable name="prompt">
				<xsl:value-of select="@prompt"/>
			</xsl:variable>
			<xsl:variable name="editerWidth">
				<xsl:value-of select="@width"/>
			</xsl:variable>
			<!-- ����ӳ�䵽��Ӧ��attribute�ڵ� -->
			<xsl:choose>
			<xsl:when test="@isBand">
				<td align="left" class="{@tdcss}" colspan="{@colspan}">
					<xsl:choose>
						<xsl:when test="@isNullable='false' or @isnullable='false'">
							<font class="NEUDwListDodyNotNullFont">
								<xsl:value-of select="$prompt"/>
							</font>
						</xsl:when>
						<xsl:otherwise>
							<font class="NEUDwListDodyFont">
								<xsl:value-of select="$prompt"/>
							</font>
						</xsl:otherwise>
					</xsl:choose>
				</td>
			</xsl:when>
			<xsl:otherwise>
			<xsl:for-each select="/dataWindow/attributes/attribute[@index=$attrIndex]">
				<td align="left" class="NEUDwSearchTitleTD">
					<xsl:choose>
						<xsl:when test="@isNullable='false' or @isnullable='false'">
							<font class="NEUDwListDodyNotNullFont">
								<xsl:value-of select="$prompt"/>
							</font>
						</xsl:when>
						<xsl:otherwise>
							<font class="NEUDwListDodyFont">
								<xsl:value-of select="$prompt"/>
							</font>
						</xsl:otherwise>
					</xsl:choose>
				</td>
				<td align="left" colspan="{@colspan}">
					<xsl:choose>
						<xsl:when test="@isImage='true'">
							<xsl:element name="img">
								<xsl:attribute name="id"><xsl:value-of select="$DW_DISPLAY_EDITER_BEGIN"/><xsl:value-of select="/dataWindow/@name"/>_<xsl:value-of select="@index"/></xsl:attribute>
								<xsl:attribute name="src"/>
								<xsl:attribute name="style">width:100;height:100</xsl:attribute>
								<xsl:attribute name="alt">����Ŵ�ͼƬ</xsl:attribute>
							</xsl:element>
						</xsl:when>
						<xsl:otherwise>
							<xsl:element name="{@type}">
								<xsl:attribute name="id"><xsl:value-of select="$DW_DISPLAY_EDITER_BEGIN"/><xsl:value-of select="/dataWindow/@name"/>_<xsl:value-of select="@index"/></xsl:attribute>
								<xsl:attribute name="style">width:<xsl:value-of select="$editerWidth"/>;<xsl:value-of select="@style"/></xsl:attribute>
								<xsl:attribute name="class"><xsl:value-of select="@class"/></xsl:attribute>
								<xsl:attribute name="name"><xsl:value-of select="$DW_DISPLAY_EDITER_BEGIN"/><xsl:value-of select="/dataWindow/@name"/>_<xsl:value-of select="@index"/></xsl:attribute>
								<!-- �������Ϳؼ����Կ�ʼ -->
								<xsl:attribute name="isreadonly"><xsl:value-of select="@isreadonly"/></xsl:attribute>
								<xsl:attribute name="prompt"><xsl:value-of select="@title"/></xsl:attribute>
								<xsl:attribute name="minlength"><xsl:value-of select="@minlength"/></xsl:attribute>
								<xsl:attribute name="fixlength"><xsl:value-of select="@fixlength"/></xsl:attribute>
								<xsl:attribute name="maxlength"><xsl:value-of select="@maxlength"/></xsl:attribute>
								<xsl:attribute name="dateformat"><xsl:value-of select="@dateformat"/></xsl:attribute>
								<xsl:attribute name="precision"><xsl:value-of select="@precision"/></xsl:attribute>
								<xsl:attribute name="onchange"><xsl:value-of select="@onchange"/></xsl:attribute>
								<xsl:attribute name="onblur"><xsl:value-of select="@onblur"/></xsl:attribute>
								<xsl:attribute name="onfocus"><xsl:value-of select="@onfocus"/></xsl:attribute>
								<xsl:attribute name="onkeydown"><xsl:value-of select="@onkeydown"/></xsl:attribute>
								<xsl:attribute name="onkeypress"><xsl:value-of select="@onkeypress"/></xsl:attribute>
								<xsl:attribute name="isNullable"><xsl:value-of select="@isNullable"/></xsl:attribute>
								<xsl:attribute name="JSObjName"><xsl:value-of select="@JSObjName"/></xsl:attribute>
								<xsl:attribute name="popup"><xsl:value-of select="@popup"/></xsl:attribute>
								<xsl:attribute name="pattern"><xsl:value-of select="@pattern"/></xsl:attribute>
								<xsl:attribute name="align"><xsl:value-of select="@align"/></xsl:attribute>
								<!-- �������Ϳؼ����Խ��� -->
								<xsl:if test="@JSObjName='Password'">
								<xsl:attribute name="type">password</xsl:attribute>
								</xsl:if>	
								<xsl:if test="@type='textarea'">
									<xsl:attribute name="type">textarea</xsl:attribute>
									<xsl:attribute name="rows"><xsl:value-of select="@rows"/></xsl:attribute>
								</xsl:if>
								<xsl:if test="@type='select'">
									<xsl:attribute name="size">1</xsl:attribute>
									<xsl:attribute name="isNotInDW">true</xsl:attribute>
									
									<option value="">��ѡ��</option>
									
									<xsl:for-each select="option">
										<xsl:element name="option">
											<xsl:attribute name="value"><xsl:value-of select="@value"/></xsl:attribute>
											<xsl:attribute name="isSelectedInDW"><xsl:value-of select="@selected"/></xsl:attribute>
											<xsl:value-of select="."/>
										</xsl:element>
									</xsl:for-each>
								</xsl:if>
							</xsl:element>
							<xsl:if test="@hasAidBtn='true'">
								<xsl:element name="input">
									<xsl:attribute name="type">button</xsl:attribute>
									<xsl:attribute name="value"><xsl:value-of select="@aidBtnValue"/></xsl:attribute>
									<xsl:attribute name="class">NEUDwButton_INNER</xsl:attribute>
									<xsl:if test="@aidBtnClass!=''">
										<xsl:attribute name="class"><xsl:value-of select="@aidBtnClass"/></xsl:attribute>
									</xsl:if>
									<xsl:attribute name="onclick"><xsl:value-of select="@aidBtnOnclick"/></xsl:attribute>
									<xsl:attribute name="title">������ť</xsl:attribute>
								</xsl:element>
							</xsl:if>
						</xsl:otherwise>
					</xsl:choose>
				</td>
			</xsl:for-each>
			</xsl:otherwise>
			</xsl:choose>

			<xsl:if test="@isRowEnd = 'true'">
				<xsl:text disable-output-escaping="yes">&lt;/tr&gt;</xsl:text>
			</xsl:if>
		</xsl:for-each>
	</xsl:template>
	<!-- �ɼ��༭������ģ�壨��ͼƬ�� -->
	<xsl:template name="template-displayEditer-core-hasImage">
		<xsl:for-each select="editers/editer">
			<xsl:if test="@isRowBegin = 'true'">
				<xsl:text disable-output-escaping="yes">&lt;tr class="NEUDwCommon"&gt;</xsl:text>
			</xsl:if>
			<xsl:variable name="attrIndex">
				<xsl:value-of select="@attrIndex"/>
			</xsl:variable>
			<xsl:variable name="prompt">
				<xsl:value-of select="@prompt"/>
			</xsl:variable>
			<xsl:variable name="editerWidth">
				<xsl:value-of select="@width"/>
			</xsl:variable>
			<xsl:variable name="editerHeight">
				<xsl:value-of select="@height"/>
			</xsl:variable>
			<xsl:variable name="colspan">
				<xsl:value-of select="@colspan"/>
			</xsl:variable>
			<xsl:variable name="rowspan">
				<xsl:value-of select="@rowspan"/>
			</xsl:variable>
			<!-- ����ӳ�䵽��Ӧ��attribute�ڵ� -->
			<xsl:for-each select="/dataWindow/attributes/attribute[@index=$attrIndex]">
				<td align="left" class="NEUDwBlobTitleTD" rowspan="{$rowspan}">
					<xsl:choose>
						<xsl:when test="@isNullable='false' or @isnullable='false'">
							<font class="NEUDwListDodyNotNullFont">
								<xsl:value-of select="$prompt"/>
							</font>
						</xsl:when>
						<xsl:otherwise>
							<font class="NEUDwListDodyFont">
								<xsl:value-of select="$prompt"/>
							</font>
						</xsl:otherwise>
					</xsl:choose>
				</td>
				<td align="left" colspan="{$colspan}" rowspan="{$rowspan}">
					<xsl:choose>
						<xsl:when test="@isImage='true'">
							<xsl:element name="img">
								<xsl:attribute name="id"><xsl:value-of select="$DW_DISPLAY_EDITER_BEGIN"/><xsl:value-of select="/dataWindow/@name"/>_<xsl:value-of select="@index"/></xsl:attribute>
								<xsl:attribute name="src"/>
								<xsl:attribute name="style">cursor:hand;width:<xsl:value-of select="$editerWidth"/>;height:<xsl:value-of select="$editerHeight"/></xsl:attribute>
								<xsl:attribute name="alt">������Ŵ�ͼƬ</xsl:attribute>
								<xsl:attribute name="onclick">display_picture(this.src)</xsl:attribute>
							</xsl:element>
						</xsl:when>
						<xsl:otherwise>
							<xsl:element name="{@type}">
								<xsl:attribute name="id"><xsl:value-of select="$DW_DISPLAY_EDITER_BEGIN"/><xsl:value-of select="/dataWindow/@name"/>_<xsl:value-of select="@index"/></xsl:attribute>
								<xsl:attribute name="style">width:<xsl:value-of select="$editerWidth"/>;height:<xsl:value-of select="$editerHeight"/>;<xsl:value-of select="@style"/></xsl:attribute>
								<xsl:attribute name="class"><xsl:value-of select="@class"/></xsl:attribute>
								<xsl:attribute name="name"><xsl:value-of select="$DW_DISPLAY_EDITER_BEGIN"/><xsl:value-of select="/dataWindow/@name"/>_<xsl:value-of select="@index"/></xsl:attribute>
								<!-- �������Ϳؼ����Կ�ʼ -->
								<xsl:attribute name="isreadonly"><xsl:value-of select="@isreadonly"/></xsl:attribute>
								<xsl:attribute name="prompt"><xsl:value-of select="@title"/></xsl:attribute>
								<xsl:attribute name="minlength"><xsl:value-of select="@minlength"/></xsl:attribute>
								<xsl:attribute name="fixlength"><xsl:value-of select="@fixlength"/></xsl:attribute>
								<xsl:attribute name="maxlength"><xsl:value-of select="@maxlength"/></xsl:attribute>
								<xsl:attribute name="dateformat"><xsl:value-of select="@dateformat"/></xsl:attribute>
								<xsl:attribute name="precision"><xsl:value-of select="@precision"/></xsl:attribute>
								<xsl:attribute name="onchange"><xsl:value-of select="@onchange"/></xsl:attribute>
								<xsl:attribute name="onblur"><xsl:value-of select="@onblur"/></xsl:attribute>
								<xsl:attribute name="onfocus"><xsl:value-of select="@onfocus"/></xsl:attribute>
								<xsl:attribute name="onkeydown"><xsl:value-of select="@onkeydown"/></xsl:attribute>
								<xsl:attribute name="onkeypress"><xsl:value-of select="@onkeypress"/></xsl:attribute>
								<xsl:attribute name="isNullable"><xsl:value-of select="@isNullable"/></xsl:attribute>
								<xsl:attribute name="JSObjName"><xsl:value-of select="@JSObjName"/></xsl:attribute>
								<xsl:attribute name="popup"><xsl:value-of select="@popup"/></xsl:attribute>
								<xsl:attribute name="pattern"><xsl:value-of select="@pattern"/></xsl:attribute>
								<xsl:attribute name="align"><xsl:value-of select="@align"/></xsl:attribute>
								<xsl:if test="@JSObjName='Password'">
								<xsl:attribute name="type">password</xsl:attribute>
								</xsl:if>																
								<!-- �������Ϳؼ����Խ��� -->
								<xsl:choose>
								   <xsl:when test="@type='text'">
								      <xsl:attribute name="type">text</xsl:attribute>
								   </xsl:when>
								   <xsl:when test="@type='select'">
								      <xsl:attribute name="size">1</xsl:attribute>
									  <xsl:attribute name="isNotInDW">true</xsl:attribute>
									 
									    <option value="">��ѡ��</option>
									 
									  <xsl:for-each select="option">
										<xsl:element name="option">
											<xsl:attribute name="value"><xsl:value-of select="@value"/></xsl:attribute>
											<xsl:attribute name="isSelectedInDW"><xsl:value-of select="@selected"/></xsl:attribute>
											<xsl:value-of select="."/>
										</xsl:element>
									  </xsl:for-each>
								   </xsl:when>
								   <xsl:when test="textarea">
								      <xsl:attribute name="type">textarea</xsl:attribute>
									  <xsl:attribute name="rows"><xsl:value-of select="@rows"/></xsl:attribute>
								   </xsl:when>
								</xsl:choose>
							</xsl:element>
							<xsl:if test="@hasAidBtn='true'">
								<xsl:element name="input">
									<xsl:attribute name="type">button</xsl:attribute>
									<xsl:attribute name="value"><xsl:value-of select="@aidBtnValue"/></xsl:attribute>
									<xsl:attribute name="class">NEUDwButton_INNER</xsl:attribute>
									<xsl:if test="@aidBtnClass!=''">
										<xsl:attribute name="class"><xsl:value-of select="@aidBtnClass"/></xsl:attribute>
									</xsl:if>
									<xsl:attribute name="onclick"><xsl:value-of select="@aidBtnOnclick"/></xsl:attribute>
								</xsl:element>
							</xsl:if>
						</xsl:otherwise>
					</xsl:choose>
				</td>
			</xsl:for-each>
			<xsl:if test="@isRowEnd = 'true'">
				<xsl:text disable-output-escaping="yes">&lt;/tr&gt;</xsl:text>
			</xsl:if>
		</xsl:for-each>
	</xsl:template>
	<!-- �ɼ��༭��: -->
	
	
	<xsl:template name="template-displayEditer" match="editers">
		<xsl:element name="div">
			<xsl:attribute name="id">displayEditer_div_<xsl:value-of select="/dataWindow/@name"/></xsl:attribute>
			<table class="NEUDwListTableback" border="1" cellpadding="2" cellspacing="0" bordercolordark="#FFFFFF" bordercolorlight="#848284" bgcolor="#F4F4F4">
				<tr>
					<td>
						<table width="{/dataWindow/@width}" border="1"  bordercolordark="#FFFFFF" bordercolorlight="#848284" cellpadding="2" cellspacing="0" bgcolor="#FFFFFF" class="NEUDwListTable">
							<xsl:choose>
								<xsl:when test="/dataWindow/editers/@hasImage='false'">
									<!-- ���ÿɼ��༭������ģ��  -->
									<xsl:call-template name="template-displayEditer-core"/>
								</xsl:when>
								<xsl:otherwise>
									<!-- ���ÿɼ��༭������ģ��(��ͼƬ)  -->
									<xsl:call-template name="template-displayEditer-core-hasImage"/>
								</xsl:otherwise>
							</xsl:choose>
							<tr align="right" class="NEUDwCommon">
								<td colspan="{2 * /dataWindow/editers/@colsInOneRow }">
									<!-- ���ù���ģ�壬���ɰ�ť -->
									<xsl:if test="/dataWindow/@type != 'FREE_EDIT' ">
				<!-- new add-->
				<xsl:for-each select="/dataWindow/buttons/button">
        		     <xsl:choose>
					  <xsl:when test="@type=$DW_BUTTON_ADD_TYPE">
						  <xsl:call-template name="template-one-order-buttons">
						     <xsl:with-param name="id"><xsl:value-of select="$DW_BUTTON_ADD_BEGIN"/><xsl:value-of select="/dataWindow/@name"/></xsl:with-param>
	            		     <xsl:with-param name="value">����</xsl:with-param>
	            		     <xsl:with-param name="onclick">addRow()</xsl:with-param>
	            		     <xsl:with-param name="type"><xsl:value-of select="$DW_BUTTON_ADD_TYPE"/></xsl:with-param>
	            		     <xsl:with-param name="class">NEUDwButton_Add</xsl:with-param>
                             <xsl:with-param name="boControllerName"><xsl:value-of select="@boControllerName"/></xsl:with-param>
                             <xsl:with-param name="boControllerMethod"><xsl:value-of select="@boControllerMethod"/></xsl:with-param>
                             <xsl:with-param name="actionName"><xsl:value-of select="@actionName"/></xsl:with-param>
                             <xsl:with-param name="actionMethod"><xsl:value-of select="@actionMethod"/></xsl:with-param>
                             <xsl:with-param name="isPartlyRefresh"><xsl:value-of select="@isPartlyRefresh"/></xsl:with-param>
                             <xsl:with-param name="title"><xsl:value-of select="@title"/></xsl:with-param>
                             <xsl:with-param name="disabled"><xsl:value-of select="@disabled"/></xsl:with-param>
                         
					     </xsl:call-template>
					 </xsl:when>
					  <xsl:when test="@type=$DW_BUTTON_MODIFY_TYPE">
						  <xsl:call-template name="template-one-order-buttons">
						     <xsl:with-param name="id"><xsl:value-of select="$DW_BUTTON_MODIFY_BEGIN"/><xsl:value-of select="/dataWindow/@name"/></xsl:with-param>
	            		     <xsl:with-param name="value">�޸�</xsl:with-param>
	            		     <xsl:with-param name="onclick">modifySelectedRow()</xsl:with-param>
	            		     <xsl:with-param name="type"><xsl:value-of select="$DW_BUTTON_MODIFY_TYPE"/></xsl:with-param>
	            		     <xsl:with-param name="class">NEUDwButton_Modify</xsl:with-param>
                             <xsl:with-param name="boControllerName"><xsl:value-of select="@boControllerName"/></xsl:with-param>
                             <xsl:with-param name="boControllerMethod"><xsl:value-of select="@boControllerMethod"/></xsl:with-param>
                             <xsl:with-param name="actionName"><xsl:value-of select="@actionName"/></xsl:with-param>
                             <xsl:with-param name="actionMethod"><xsl:value-of select="@actionMethod"/></xsl:with-param>
                             <xsl:with-param name="isPartlyRefresh"><xsl:value-of select="@isPartlyRefresh"/></xsl:with-param>
                             <xsl:with-param name="title"><xsl:value-of select="@title"/></xsl:with-param>
                              <xsl:with-param name="disabled"><xsl:value-of select="@disabled"/></xsl:with-param>                           
					     </xsl:call-template>
					 </xsl:when>
					 <xsl:when test="@type=$DW_BUTTON_DEL_TYPE">
						  <xsl:call-template name="template-one-order-buttons">
						     <xsl:with-param name="id"><xsl:value-of select="$DW_BUTTON_DEL_BEGIN"/><xsl:value-of select="/dataWindow/@name"/></xsl:with-param>
	            		     <xsl:with-param name="value">ɾ��</xsl:with-param>
	            		     <xsl:with-param name="onclick">deleteSelectedRow()</xsl:with-param>
	            		     <xsl:with-param name="type"><xsl:value-of select="$DW_BUTTON_DEL_TYPE"/></xsl:with-param>
	            		     <xsl:with-param name="class">NEUDwButton_Delete</xsl:with-param>
                             <xsl:with-param name="boControllerName"><xsl:value-of select="@boControllerName"/></xsl:with-param>
                             <xsl:with-param name="boControllerMethod"><xsl:value-of select="@boControllerMethod"/></xsl:with-param>
                             <xsl:with-param name="actionName"><xsl:value-of select="@actionName"/></xsl:with-param>
                             <xsl:with-param name="actionMethod"><xsl:value-of select="@actionMethod"/></xsl:with-param>
                             <xsl:with-param name="isPartlyRefresh"><xsl:value-of select="@isPartlyRefresh"/></xsl:with-param>
                             <xsl:with-param name="name"></xsl:with-param>
                             <xsl:with-param name="title"><xsl:value-of select="@title"/></xsl:with-param>
                             <xsl:with-param name="disabled"><xsl:value-of select="@disabled"/></xsl:with-param>                             
					     </xsl:call-template>
					 </xsl:when>
					 <xsl:when test="@type=$DW_BUTTON_SAVE_TYPE">
						  <xsl:call-template name="template-one-order-buttons">
						     <xsl:with-param name="id"><xsl:value-of select="$DW_BUTTON_SAVE_BEGIN"/><xsl:value-of select="/dataWindow/@name"/></xsl:with-param>
	            		     <xsl:with-param name="value">����</xsl:with-param>
	            		     <xsl:with-param name="onclick">save()</xsl:with-param>
	            		     <xsl:with-param name="type"><xsl:value-of select="$DW_BUTTON_SAVE_TYPE"/></xsl:with-param>
	            		     <xsl:with-param name="class">NEUDwButton_Save</xsl:with-param>
                             <xsl:with-param name="boControllerName"><xsl:value-of select="@boControllerName"/></xsl:with-param>
                             <xsl:with-param name="boControllerMethod"><xsl:value-of select="@boControllerMethod"/></xsl:with-param>
                             <xsl:with-param name="actionName"><xsl:value-of select="@actionName"/></xsl:with-param>
                             <xsl:with-param name="actionMethod"><xsl:value-of select="@actionMethod"/></xsl:with-param>
                             <xsl:with-param name="isPartlyRefresh"><xsl:value-of select="@isPartlyRefresh"/></xsl:with-param>
                             <xsl:with-param name="name"></xsl:with-param>
                             <xsl:with-param name="title"><xsl:value-of select="@title"/></xsl:with-param>
                             <xsl:with-param name="disabled"><xsl:value-of select="@disabled"/></xsl:with-param>                             
					     </xsl:call-template>
					 </xsl:when>
					 <xsl:when test="@type=$DW_BUTTON_CUSTOM_TYPE">
						  <xsl:call-template name="template-one-order-buttons">
						     <xsl:with-param name="id"><xsl:value-of select="@id"/></xsl:with-param>
	            		     <xsl:with-param name="value"><xsl:value-of select="@value"/></xsl:with-param>
	            		     <xsl:with-param name="onclick"><xsl:value-of select="@onclick"/></xsl:with-param>
	            		     <xsl:with-param name="type"><xsl:value-of select="$DW_BUTTON_CUSTOM_TYPE"/></xsl:with-param>
	            		     <xsl:with-param name="class"></xsl:with-param>
                             <xsl:with-param name="boControllerName"><xsl:value-of select="@boControllerName"/></xsl:with-param>
                             <xsl:with-param name="boControllerMethod"><xsl:value-of select="@boControllerMethod"/></xsl:with-param>
                             <xsl:with-param name="actionName"><xsl:value-of select="@actionName"/></xsl:with-param>
                             <xsl:with-param name="actionMethod"><xsl:value-of select="@actionMethod"/></xsl:with-param>
                             <xsl:with-param name="isPartlyRefresh"><xsl:value-of select="@isPartlyRefresh"/></xsl:with-param>
                             <xsl:with-param name="name"><xsl:value-of select="@name"/></xsl:with-param>
                             <xsl:with-param name="title"><xsl:value-of select="@title"/></xsl:with-param>
                              <xsl:with-param name="disabled"><xsl:value-of select="@disabled"/></xsl:with-param>                            
					     </xsl:call-template>
					 </xsl:when>					
				    </xsl:choose>
        		   </xsl:for-each>
        		   </xsl:if>
        		   <xsl:if test="/dataWindow/@type = 'FREE_EDIT' ">
        		   <xsl:for-each select="/dataWindow/buttons/button">
        		     <xsl:choose>
					  <xsl:when test="@type=$DW_BUTTON_ADD_TYPE">
						  <xsl:call-template name="template-one-order-buttons">
						     <xsl:with-param name="id"><xsl:value-of select="$DW_BUTTON_ADD_BEGIN"/><xsl:value-of select="/dataWindow/@name"/></xsl:with-param>
	            		     <xsl:with-param name="value">����</xsl:with-param>
	            		     <xsl:with-param name="onclick">addRow()</xsl:with-param>
	            		     <xsl:with-param name="type"><xsl:value-of select="$DW_BUTTON_ADD_TYPE"/></xsl:with-param>
	            		     <xsl:with-param name="class">NEUDwButton_Add</xsl:with-param>
                             <xsl:with-param name="boControllerName"><xsl:value-of select="@boControllerName"/></xsl:with-param>
                             <xsl:with-param name="boControllerMethod"><xsl:value-of select="@boControllerMethod"/></xsl:with-param>
                             <xsl:with-param name="actionName"><xsl:value-of select="@actionName"/></xsl:with-param>
                             <xsl:with-param name="actionMethod"><xsl:value-of select="@actionMethod"/></xsl:with-param>
                             <xsl:with-param name="isPartlyRefresh"><xsl:value-of select="@isPartlyRefresh"/></xsl:with-param>
                             <xsl:with-param name="title"><xsl:value-of select="@title"/></xsl:with-param>
                             <xsl:with-param name="disabled"><xsl:value-of select="@disabled"/></xsl:with-param>                             
					     </xsl:call-template>
					 </xsl:when>
					
					 <xsl:when test="@type=$DW_BUTTON_SAVE_TYPE">
						  <xsl:call-template name="template-one-order-buttons">
						     <xsl:with-param name="id"><xsl:value-of select="$DW_BUTTON_SAVE_BEGIN"/><xsl:value-of select="/dataWindow/@name"/></xsl:with-param>
	            		     <xsl:with-param name="value">����</xsl:with-param>
	            		     <xsl:with-param name="onclick">save()</xsl:with-param>
	            		     <xsl:with-param name="type"><xsl:value-of select="$DW_BUTTON_SAVE_TYPE"/></xsl:with-param>
	            		     <xsl:with-param name="class">NEUDwButton_Save</xsl:with-param>
                             <xsl:with-param name="boControllerName"><xsl:value-of select="@boControllerName"/></xsl:with-param>
                             <xsl:with-param name="boControllerMethod"><xsl:value-of select="@boControllerMethod"/></xsl:with-param>
                             <xsl:with-param name="actionName"><xsl:value-of select="@actionName"/></xsl:with-param>
                             <xsl:with-param name="actionMethod"><xsl:value-of select="@actionMethod"/></xsl:with-param>
                             <xsl:with-param name="isPartlyRefresh"><xsl:value-of select="@isPartlyRefresh"/></xsl:with-param>
                             <xsl:with-param name="title"><xsl:value-of select="@title"/></xsl:with-param>
                             <xsl:with-param name="disabled"><xsl:value-of select="@disabled"/></xsl:with-param>                             
					     </xsl:call-template>
					 </xsl:when>
					 <xsl:when test="@type=$DW_BUTTON_PREROW_TYPE">
						  <xsl:call-template name="template-one-order-buttons">
						     <xsl:with-param name="id"><xsl:value-of select="$DW_BUTTON_PREROW_BEGIN"/></xsl:with-param>
	            		     <xsl:with-param name="value">��һ��</xsl:with-param>
	            		     <xsl:with-param name="onclick">preRowOnclick_freeEdit()</xsl:with-param>
	            		     <xsl:with-param name="type"><xsl:value-of select="$DW_BUTTON_PREROW_TYPE"/></xsl:with-param>
	            		     <xsl:with-param name="class">NEUDwButton_Pre</xsl:with-param>
                             <xsl:with-param name="boControllerName"><xsl:value-of select="@boControllerName"/></xsl:with-param>
                             <xsl:with-param name="boControllerMethod"><xsl:value-of select="@boControllerMethod"/></xsl:with-param>
                             <xsl:with-param name="actionName"><xsl:value-of select="@actionName"/></xsl:with-param>
                             <xsl:with-param name="actionMethod"><xsl:value-of select="@actionMethod"/></xsl:with-param>
                             <xsl:with-param name="isPartlyRefresh"><xsl:value-of select="@isPartlyRefresh"/></xsl:with-param>
                             <xsl:with-param name="title"><xsl:value-of select="@title"/></xsl:with-param>
                             <xsl:with-param name="disabled"><xsl:value-of select="@disabled"/></xsl:with-param>                             
					     </xsl:call-template>
					 </xsl:when>
					 <xsl:when test="@type=$DW_BUTTON_NEXTROW_TYPE">
						  <xsl:call-template name="template-one-order-buttons">
						     <xsl:with-param name="id"><xsl:value-of select="$DW_BUTTON_NEXTROW_BEGIN"/></xsl:with-param>
	            		     <xsl:with-param name="value">��һ��</xsl:with-param>
	            		     <xsl:with-param name="onclick">nextRowOnclick_freeEdit()</xsl:with-param>
	            		     <xsl:with-param name="type"><xsl:value-of select="$DW_BUTTON_NEXTROW_TYPE"/></xsl:with-param>
	            		     <xsl:with-param name="class">NEUDwButton_Next</xsl:with-param>
                             <xsl:with-param name="boControllerName"><xsl:value-of select="@boControllerName"/></xsl:with-param>
                             <xsl:with-param name="boControllerMethod"><xsl:value-of select="@boControllerMethod"/></xsl:with-param>
                             <xsl:with-param name="actionName"><xsl:value-of select="@actionName"/></xsl:with-param>
                             <xsl:with-param name="actionMethod"><xsl:value-of select="@actionMethod"/></xsl:with-param>
                             <xsl:with-param name="isPartlyRefresh"><xsl:value-of select="@isPartlyRefresh"/></xsl:with-param>
                             <xsl:with-param name="title"><xsl:value-of select="@title"/></xsl:with-param>
                              <xsl:with-param name="disabled"><xsl:value-of select="@disabled"/></xsl:with-param>                            
					     </xsl:call-template>
					 </xsl:when>
					 <xsl:when test="@type=$DW_BUTTON_QUERY_TYPE">
						  <xsl:call-template name="template-one-order-buttons">
						     <xsl:with-param name="id"><xsl:value-of select="$DW_BUTTON_QUERY_BEGIN"/></xsl:with-param>
	            		     <xsl:with-param name="value">��ѯ</xsl:with-param>
	            		     <xsl:with-param name="onclick">query()</xsl:with-param>
	            		     <xsl:with-param name="type"><xsl:value-of select="$DW_BUTTON_QUERY_TYPE"/></xsl:with-param>
	            		     <xsl:with-param name="class">NEUDwButton_Query</xsl:with-param>
                             <xsl:with-param name="boControllerName"><xsl:value-of select="@boControllerName"/></xsl:with-param>
                             <xsl:with-param name="boControllerMethod"><xsl:value-of select="@boControllerMethod"/></xsl:with-param>
                             <xsl:with-param name="actionName"><xsl:value-of select="@actionName"/></xsl:with-param>
                             <xsl:with-param name="actionMethod"><xsl:value-of select="@actionMethod"/></xsl:with-param>
                             <xsl:with-param name="isPartlyRefresh"><xsl:value-of select="@isPartlyRefresh"/></xsl:with-param>
                             <xsl:with-param name="title"><xsl:value-of select="@title"/></xsl:with-param>
                             <xsl:with-param name="disabled"><xsl:value-of select="@disabled"/></xsl:with-param>                             
					     </xsl:call-template>
					 </xsl:when>
					 <xsl:when test="@type=$DW_BUTTON_CUSTOM_TYPE">
						  <xsl:call-template name="template-one-order-buttons">
						     <xsl:with-param name="id"><xsl:value-of select="@id"/></xsl:with-param>
	            		     <xsl:with-param name="value"><xsl:value-of select="@value"/></xsl:with-param>
	            		     <xsl:with-param name="onclick"><xsl:value-of select="@onclick"/></xsl:with-param>
	            		     <xsl:with-param name="type"><xsl:value-of select="$DW_BUTTON_CUSTOM_TYPE"/></xsl:with-param>
	            		     <xsl:with-param name="class"></xsl:with-param>
                             <xsl:with-param name="boControllerName"><xsl:value-of select="@boControllerName"/></xsl:with-param>
                             <xsl:with-param name="boControllerMethod"><xsl:value-of select="@boControllerMethod"/></xsl:with-param>
                             <xsl:with-param name="actionName"><xsl:value-of select="@actionName"/></xsl:with-param>
                             <xsl:with-param name="actionMethod"><xsl:value-of select="@actionMethod"/></xsl:with-param>
                             <xsl:with-param name="isPartlyRefresh"><xsl:value-of select="@isPartlyRefresh"/></xsl:with-param>
                             <xsl:with-param name="title"><xsl:value-of select="@title"/></xsl:with-param>
                             <xsl:with-param name="disabled"><xsl:value-of select="@disabled"/></xsl:with-param>                             
					     </xsl:call-template>
					 </xsl:when>					
				    </xsl:choose>
        		   </xsl:for-each>
        		   </xsl:if>
        		   <!-- end add-->
        		   
								</td>
							</tr>
						</table>
					</td>
				</tr>
			</table>
		</xsl:element>
	</xsl:template>
	<!-- �γɲ�ѯ�����ı༭������ -->
	<xsl:template name="template-common-filters-core" match="filters">
		<xsl:for-each select="filters/filter">
        <xsl:choose>
        <xsl:when test="@modeInQueryWin = 'hidden'"/>
        <xsl:otherwise>		
			<tr>
				<td align="left" width="30%" class="NEUDwSearchTitleTD">
					<font class="NEUDwListDodyFont">
						<xsl:value-of select="@title"/>
					</font>
				</td>
				<td align="left" width="30%" class="NEUDwSearchTitleTD">
					<font class="NEUDwListDodyFont">
						<xsl:choose>
							<xsl:when test="@isOpeSelect = 'true'">
								<xsl:call-template name="template-common-operator-select">
									<xsl:with-param name="index">
										<xsl:value-of select="@index"/>
									</xsl:with-param>
									<xsl:with-param name="style">
										<xsl:value-of select="@operatorStyle"/>
									</xsl:with-param>
									<xsl:with-param name="class">
										<xsl:value-of select="@operatorClass"/>
									</xsl:with-param>
									<xsl:with-param name="operator">
										<xsl:value-of select="@operator"/>
									</xsl:with-param>
								</xsl:call-template>
							</xsl:when>
							<xsl:when test="@isCustomer= 'true'">
								<xsl:value-of select="@operateTitle"/>
							</xsl:when>
							<xsl:otherwise>
								<xsl:call-template name="template-common-operator">
									<xsl:with-param name="operator">
										<xsl:value-of select="@operator"/>
									</xsl:with-param>
								</xsl:call-template>
							</xsl:otherwise>
						</xsl:choose>
					</font>
				</td>
				<td align="left" width="40%">				    
					<xsl:element name="{@type}">
						<xsl:attribute name="id"><xsl:value-of select="$DW_QUERYCONDITION_EDITER_BEGIN"/><xsl:value-of select="/dataWindow/@name"/>_<xsl:value-of select="@index"/></xsl:attribute>
						<xsl:attribute name="style">width:<xsl:value-of select="@width"/>;<xsl:value-of select="@style"/></xsl:attribute>
						<xsl:attribute name="class"><xsl:value-of select="@class"/></xsl:attribute>
						<xsl:attribute name="value"><xsl:value-of select="@defaultValue"/></xsl:attribute>
						<!-- �������Ϳؼ����Կ�ʼ -->
						<xsl:attribute name="isreadonly"><xsl:value-of select="@isreadonly"/></xsl:attribute>
						<xsl:attribute name="prompt"><xsl:value-of select="@title"/></xsl:attribute>
						<xsl:attribute name="minlength"><xsl:value-of select="@minlength"/></xsl:attribute>
						<xsl:attribute name="fixlength"><xsl:value-of select="@fixlength"/></xsl:attribute>
						<xsl:attribute name="maxlength"><xsl:value-of select="@maxlength"/></xsl:attribute>
						<xsl:attribute name="dateformat"><xsl:value-of select="@dateformat"/></xsl:attribute>
						<xsl:attribute name="precision"><xsl:value-of select="@precision"/></xsl:attribute>
						<xsl:attribute name="onchange"><xsl:value-of select="@onchange"/></xsl:attribute>
						<xsl:attribute name="onblur"><xsl:value-of select="@onblur"/></xsl:attribute>
						<xsl:attribute name="onkeydown"><xsl:value-of select="@onkeydown"/></xsl:attribute>
						<xsl:attribute name="onkeypress"><xsl:value-of select="@onkeypress"/></xsl:attribute>
						<xsl:attribute name="onfocus"><xsl:value-of select="@onfocus"/></xsl:attribute>
						<xsl:attribute name="isNullable"><xsl:value-of select="@isNullable"/></xsl:attribute>
						<xsl:attribute name="JSObjName"><xsl:value-of select="@JSObjName"/></xsl:attribute>
						<xsl:attribute name="popup"><xsl:value-of select="@popup"/></xsl:attribute>
						<xsl:attribute name="pattern"><xsl:value-of select="@pattern"/></xsl:attribute>
						<xsl:attribute name="align"><xsl:value-of select="@align"/></xsl:attribute>
						<!-- �������Ϳؼ����Խ��� -->
						<xsl:if test="@type='select'">
							<xsl:attribute name="size">1</xsl:attribute>
							<xsl:attribute name="isNotInDW">true</xsl:attribute>
							
							<option value="">��ѡ��</option>
							
							<xsl:for-each select="option">
								<xsl:element name="option">
									<xsl:attribute name="value"><xsl:value-of select="@value"/></xsl:attribute>
									<xsl:attribute name="isSelectedInDW"><xsl:value-of select="@selected"/></xsl:attribute>
									<xsl:value-of select="."/>
								</xsl:element>
							</xsl:for-each>
						</xsl:if>
						<xsl:if test="@hasAidBtn='true'">
							<xsl:element name="input">
								<xsl:attribute name="type">button</xsl:attribute>
								<xsl:attribute name="value"><xsl:value-of select="@aidBtnValue"/></xsl:attribute>
								<xsl:attribute name="class">NEUDwButton_INNER</xsl:attribute>
								<xsl:if test="@aidBtnClass!=''">
									<xsl:attribute name="class"><xsl:value-of select="@aidBtnClass"/></xsl:attribute>
								</xsl:if>
								<xsl:attribute name="onclick"><xsl:value-of select="@aidBtnOnclick"/></xsl:attribute>
							</xsl:element>
						</xsl:if>
						&#160;
					</xsl:element>
				</td>
			</tr>
          </xsl:otherwise>
          </xsl:choose>			
		</xsl:for-each>
	</xsl:template>
	<!-- ���ݲ������Ŵ���ת�������Ľ��� -->
	<xsl:template name="template-common-operator">
		<xsl:param name="operator">''</xsl:param>
		<xsl:choose>
			<xsl:when test="$operator = '='">����</xsl:when>
			<xsl:when test="$operator = '!='">������</xsl:when>
			<xsl:when test="$operator = '&gt;'">����</xsl:when>
			<xsl:when test="$operator = '&lt;'">С��</xsl:when>
			<xsl:when test="$operator = '&lt;='">С�ڵ���</xsl:when>
			<xsl:when test="$operator = '&gt;='">���ڵ���</xsl:when>
			<xsl:when test="$operator = 'like'">����</xsl:when>
			<xsl:when test="$operator = 'left_like'">�����</xsl:when>
			<xsl:when test="$operator = 'right_like'">�Ұ���</xsl:when>
			<xsl:when test="$operator = 'not like'">�ǰ���</xsl:when>
			<xsl:when test="$operator = 'not left_like'">�������</xsl:when>
			<xsl:when test="$operator = 'not right_like'">���Ұ���</xsl:when>
			<xsl:when test="$operator = 'exists'">������</xsl:when>
			<xsl:when test="$operator = 'not exists'">��������</xsl:when>
			<xsl:when test="$operator = 'in'">��</xsl:when>
			<xsl:when test="$operator = 'not in'">����</xsl:when>
			<xsl:when test="$operator = 'is'">��</xsl:when>
			<xsl:otherwise>
				<xsl:value-of select="$operator"/>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>
	<!-- ���������������� -->
	<xsl:template name="template-common-operator-select">
		<xsl:param name="index">''</xsl:param>
		<xsl:param name="style">''</xsl:param>
		<xsl:param name="class">''</xsl:param>
		<xsl:param name="value">''</xsl:param>
		<xsl:param name="operator">''</xsl:param>
		<xsl:element name="select">
			<xsl:attribute name="id"><xsl:value-of select="$DW_QUERYCONDITION_OPERATOR_EDITER_BEGIN"/><xsl:value-of select="/dataWindow/@name"/>_<xsl:value-of select="$index"/></xsl:attribute>
			<xsl:attribute name="style"><xsl:value-of select="$style"/></xsl:attribute>
			<xsl:attribute name="class"><xsl:value-of select="$class"/></xsl:attribute>
			<xsl:call-template name="template-common-option">
				<xsl:with-param name="value">=</xsl:with-param>
				<xsl:with-param name="comparyValue">
					<xsl:value-of select="$operator"/>
				</xsl:with-param>
				<xsl:with-param name="text">����</xsl:with-param>
			</xsl:call-template>
			<xsl:call-template name="template-common-option">
				<xsl:with-param name="value">!=</xsl:with-param>
				<xsl:with-param name="comparyValue">
					<xsl:value-of select="$operator"/>
				</xsl:with-param>
				<xsl:with-param name="text">������</xsl:with-param>
			</xsl:call-template>
			<xsl:call-template name="template-common-option">
				<xsl:with-param name="value">&lt;</xsl:with-param>
				<xsl:with-param name="comparyValue">
					<xsl:value-of select="$operator"/>
				</xsl:with-param>
				<xsl:with-param name="text">С��</xsl:with-param>
			</xsl:call-template>
			<xsl:call-template name="template-common-option">
				<xsl:with-param name="value">&lt;=</xsl:with-param>
				<xsl:with-param name="comparyValue">
					<xsl:value-of select="$operator"/>
				</xsl:with-param>
				<xsl:with-param name="text">С�ڵ���</xsl:with-param>
			</xsl:call-template>
			<xsl:call-template name="template-common-option">
				<xsl:with-param name="value">&gt;</xsl:with-param>
				<xsl:with-param name="comparyValue">
					<xsl:value-of select="$operator"/>
				</xsl:with-param>
				<xsl:with-param name="text">����</xsl:with-param>
			</xsl:call-template>
			<xsl:call-template name="template-common-option">
				<xsl:with-param name="value">&gt;=</xsl:with-param>
				<xsl:with-param name="comparyValue">
					<xsl:value-of select="$operator"/>
				</xsl:with-param>
				<xsl:with-param name="text">���ڵ���</xsl:with-param>
			</xsl:call-template>
			<xsl:call-template name="template-common-option">
				<xsl:with-param name="value">like</xsl:with-param>
				<xsl:with-param name="comparyValue">
					<xsl:value-of select="$operator"/>
				</xsl:with-param>
				<xsl:with-param name="text">����</xsl:with-param>
			</xsl:call-template>
			<xsl:call-template name="template-common-option">
				<xsl:with-param name="value">left_like</xsl:with-param>
				<xsl:with-param name="comparyValue">
					<xsl:value-of select="$operator"/>
				</xsl:with-param>
				<xsl:with-param name="text">�����</xsl:with-param>
			</xsl:call-template>
			<xsl:call-template name="template-common-option">
				<xsl:with-param name="value">right_like</xsl:with-param>
				<xsl:with-param name="comparyValue">
					<xsl:value-of select="$operator"/>
				</xsl:with-param>
				<xsl:with-param name="text">�Ұ���</xsl:with-param>
			</xsl:call-template>
			<xsl:call-template name="template-common-option">
				<xsl:with-param name="value">is</xsl:with-param>
				<xsl:with-param name="comparyValue">
					<xsl:value-of select="$operator"/>
				</xsl:with-param>
				<xsl:with-param name="text">��</xsl:with-param>
			</xsl:call-template>
		</xsl:element>
	</xsl:template>
	<!-- ��option -->
	<xsl:template name="template-common-option">
		<xsl:param name="value">''</xsl:param>
		<xsl:param name="comparyValue">''</xsl:param>
		<xsl:param name="text">''</xsl:param>
		<xsl:element name="option">
			<xsl:attribute name="value"><xsl:value-of select="$value"/></xsl:attribute>
			<xsl:if test="$comparyValue = $value">
				<xsl:attribute name="selected"/>
			</xsl:if>
			<xsl:value-of select="$text"/>
		</xsl:element>
	</xsl:template>
	
	
	
	
<!-- unieap 2.x��������ģ��  :�ܽ���-->	
	
	
	
		<!-- С�ƺϼ�ģ�� -->
	<xsl:template name="template-common-sumcols">
	 <xsl:for-each select="/dataWindow/dataObjs[@sumcols!='']">
		<xsl:variable name="numcols">
			<xsl:value-of select="@numcols"/>
		</xsl:variable>	    	
		
		<xsl:element name="tr">
            <xsl:element name="td">
						<xsl:attribute name="class">NEUDwListSortedTH</xsl:attribute>
						<font class="NEUDwListDodyFont">	
						С��
					    </font>
	        </xsl:element>						            

			<xsl:for-each select="/dataWindow/headers/header[@isHidden='false']">
				<xsl:variable name="attrIndex">
					<xsl:value-of select="@attrIndex"/>
				</xsl:variable>		
				<xsl:for-each select="/dataWindow/attributes/attribute[@index=$attrIndex]">
		           <xsl:element name="td">
						<font class="NEUDwListDodyFont">	   
							<xsl:for-each select="/dataWindow/dataObjs/attribute::*[name()=concat('sumcol',$attrIndex)]">
					               <xsl:value-of select="sum(/dataWindow/dataObjs/dataObj/attribute[@index=$attrIndex and @newValue!='']/attribute::newValue)+sum(/dataWindow/dataObjs/dataObj/attribute[@index=$attrIndex and @newValue='' and @value!='']/attribute::value)" />
						    </xsl:for-each>
					    </font>&#160;
	            	</xsl:element>
				</xsl:for-each>
			</xsl:for-each>
		</xsl:element>
		
		<xsl:element name="tr">
            <xsl:element name="td">
						<font class="NEUDwListDodyFont">	
						�ϼ�
					    </font>
	        </xsl:element>	

			<xsl:for-each select="/dataWindow/headers/header[@isHidden='false']">
				<xsl:variable name="attrIndex">
					<xsl:value-of select="@attrIndex"/>
				</xsl:variable>
		
				<xsl:for-each select="/dataWindow/attributes/attribute[@index=$attrIndex]">
		           <xsl:element name="td">
						<xsl:attribute name="class">NEUDwListSortedTH</xsl:attribute>
						<font class="NEUDwListDodyFont">	   
							<xsl:for-each select="/dataWindow/dataObjs/attribute::*[name()=concat('sumcol',$attrIndex)]">
					            <xsl:value-of select="."/>
						    </xsl:for-each>
					    </font>&#160;
	            	</xsl:element>
				</xsl:for-each>			
			</xsl:for-each>
		</xsl:element>
       </xsl:for-each>
	</xsl:template>
	
	<!-- ������ģ�� -->
	<xsl:template name="template-common-title">

		<xsl:for-each select="titles/title">
			<xsl:if test="@isRowBegin = 'true'">
				<xsl:text disable-output-escaping="yes">&lt;tr class="NEUDwListSortedTH" height="18" &gt;</xsl:text>
				<th width="10" class="NEUDwTitleTH" >&#160;</th>				
			</xsl:if>
			<th align="left" colspan="{@colspan}" rowspan="{@rowspan}" class="NEUDwTitleTH">
            	 <xsl:value-of select="@value"/>
			</th>
			<xsl:if test="@isRowEnd = 'true'">
				<xsl:text disable-output-escaping="yes">&lt;/tr&gt;</xsl:text>
			</xsl:if>
		</xsl:for-each>

	</xsl:template>	

	<xsl:template name="passwordChar">
	  <xsl:param name="length"/>
	    <xsl:choose>
		    <xsl:when test="number($length)>1">*<xsl:call-template name="passwordChar">
			        <xsl:with-param name="length" select="number($length)-1"/>
		        </xsl:call-template>
	        </xsl:when>
		    <xsl:when test="number($length)=1">*&#160;</xsl:when>	        
	        <xsl:otherwise>&#160;</xsl:otherwise>
        </xsl:choose>
     </xsl:template>
		
	
</xsl:stylesheet>

