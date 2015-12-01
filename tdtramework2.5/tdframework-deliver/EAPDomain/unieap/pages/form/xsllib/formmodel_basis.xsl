<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet
	version="2.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:v="urn:schemas-microsoft-com:vml"
	xmlns="http://www.w3.org/TR/REC-html40">

   <xsl:param name="servletPicPath" select="''" />
   <xsl:output method="html" indent="yes"/>
   <xsl:variable name="formID" select="/form/id" />
   <xsl:variable name="fontUnit" select="/form/fontunit" />
   <xsl:template match="/">
         <xsl:apply-templates select="/form"/>
   </xsl:template>
   <xsl:template match="/form">
        <xsl:apply-templates select="page"/>
        <xsl:apply-templates select="datasets"/>
   </xsl:template>
   <xsl:template match="page">
     <xsl:param name="name" select="./name"/>
     <xsl:param name="id" select="./id"/>
     <div id="{$id}" name="{$name}" onmousedown="main_mousedown()" onselectstart="return false" ondragstart="return false" onmousemove="main_mousemove()" onmouseup="main_mouseup()" onmouseleave="main_mouseup()">
       <xsl:attribute name="style">width:<xsl:value-of select="./width"/>;
                                   height:<xsl:value-of select="./height"/>;
                         background-color:<xsl:value-of select="./bgcolor"/>;
                         cursor:default;
                         overflow:hidden;
                         <xsl:if test="./background != ''">
                         background-image:url('<xsl:value-of select="$servletPicPath"/>?src=<xsl:value-of select="./background"/>&amp;formID=<xsl:value-of select="$formID"/>');
                         </xsl:if>
       </xsl:attribute>
         <xsl:call-template name="testK">
         </xsl:call-template>
       <v:rect filled="false" onmouseup="main_mouseup()" coordsize ="21600,21600" style="position:absolute;z-index:102" strokecolor="green">
       </v:rect>
     </div>
   </xsl:template>
   <!-- datasource start -->
   <xsl:template match="datasets">
      <form>
      <input id="datasets" type="hidden">
         <xsl:attribute name="value">
            <xsl:for-each select="./databind">
               <xsl:variable name="name" select="./name"/>
               <xsl:choose>
                 <xsl:when test="position() = last()"><xsl:value-of select="$name"/></xsl:when>
                 <xsl:otherwise><xsl:value-of select="$name"/>;</xsl:otherwise>
               </xsl:choose>
            </xsl:for-each>
         </xsl:attribute>
      </input>
      </form>
   </xsl:template>
   <!-- datasource end -->

   <!-- draw the border -->
   <xsl:template name="border">
     <xsl:param name="name"/>
     <xsl:param name="width"/>
     <xsl:param name="height"/>
       <v:group name="border_{$name}" coordsize="{$width},{$height}" style="position:absolute;top:0;left:0;width:{$width};height:{$height};z-index:2008;display:none;">
         <v:rect strokecolor="#000000" fillcolor="#7FFF00" style="position:absolute;width:5;height:5;left:-2.5;top:-2.5;" />
         <v:rect strokecolor="#000000" fillcolor="#7FFF00" style="position:absolute;width:5;height:5;left:{$width div 2 - 2.5};top:-2.5;" />
         <v:rect strokecolor="#000000" fillcolor="#7FFF00" style="position:absolute;width:5;height:5;left:{$width - 2.5};top:-2.5;" />
         <v:rect strokecolor="#000000" fillcolor="#7FFF00" style="position:absolute;width:5;height:5;left:-2.5;top:{$height div 2 - 2.5}" />
         <v:rect strokecolor="#000000" fillcolor="#7FFF00" style="position:absolute;width:5;height:5;left:-2.5;top:{$height - 2.5}" />
         <v:rect strokecolor="#000000" fillcolor="#7FFF00" style="position:absolute;width:5;height:5;left:{$width div 2 - 2.5};top:{$height - 2.5}" />
         <v:rect strokecolor="#000000" fillcolor="#7FFF00" style="position:absolute;width:5;height:5;left:{$width - 2.5};top:{$height - 2.5}" />
         <v:rect strokecolor="#000000" fillcolor="#7FFF00" style="position:absolute;width:5;height:5;left:{$width - 2.5};top:{$height div 2 - 2.5}" />
       </v:group>
   </xsl:template>
   <!-- draw the border end -->
   
   <!-- groupborder start -->          
     <xsl:template name="groupborder">
     <xsl:param name="name"/>
     <xsl:param name="width"/>
     <xsl:param name="height"/>
       <v:group>
        <xsl:attribute name="style">
            position:absolute;top:0;left:0;z-index:4008;display:none;
            width:<xsl:value-of select="$width"/>;
            height:<xsl:value-of select="$height"/>;
         </xsl:attribute>
         <xsl:attribute name="name">border_<xsl:value-of select="$name"/></xsl:attribute>
         <xsl:attribute name="coordsize">
           <xsl:value-of select="$width"/>,<xsl:value-of select="$height"/>
         </xsl:attribute>
         <v:rect>
           <xsl:attribute name="style">
              position:absolute;
              width:5;
              height:5;
              left:-2.5;
              top:-2.5;
           </xsl:attribute>
           <xsl:attribute name="strokecolor">#000000</xsl:attribute>
           <xsl:attribute name="fillcolor">#D8BFD8</xsl:attribute>
         </v:rect>
         <v:rect>
           <xsl:attribute name="style">
              position:absolute;
              width:5;
              height:5;
              left:<xsl:value-of select="$width div 2 - 2.5"/>;
              top:-2.5;
           </xsl:attribute>
           <xsl:attribute name="strokecolor">#000000</xsl:attribute>
           <xsl:attribute name="fillcolor">#D8BFD8</xsl:attribute>
         </v:rect>
         <v:rect>
           <xsl:attribute name="style">
              position:absolute;
              width:5;
              height:5;
              left:<xsl:value-of select="$width - 2.5"/>;
              top:-2.5;
           </xsl:attribute>
           <xsl:attribute name="strokecolor">#000000</xsl:attribute>
           <xsl:attribute name="fillcolor">#D8BFD8</xsl:attribute>
         </v:rect>
         <v:rect>
           <xsl:attribute name="style">
              position:absolute;
              width:5;
              height:5;
              left:-2.5;
              top:<xsl:value-of select="$height div 2 - 2.5"/>;
           </xsl:attribute>
           <xsl:attribute name="strokecolor">#000000</xsl:attribute>
           <xsl:attribute name="fillcolor">#D8BFD8</xsl:attribute>
         </v:rect>
         
         <v:rect>
           <xsl:attribute name="style">
              position:absolute;
              width:5;
              height:5;
              left:-2.5;
              top:<xsl:value-of select="$height - 2.5"/>;
           </xsl:attribute>
           <xsl:attribute name="strokecolor">#000000</xsl:attribute>
           <xsl:attribute name="fillcolor">#D8BFD8</xsl:attribute>
         </v:rect>
         
         <v:rect>
           <xsl:attribute name="style">
              position:absolute;
              width:5;
              height:5;
              left:<xsl:value-of select="$width div 2 - 2.5"/>;
              top:<xsl:value-of select="$height - 2.5"/>;
           </xsl:attribute>
           <xsl:attribute name="strokecolor">#000000</xsl:attribute>
           <xsl:attribute name="fillcolor">#D8BFD8</xsl:attribute>
         </v:rect>
         
         <v:rect>
           <xsl:attribute name="style">
              position:absolute;
              width:5;
              height:5;
              left:<xsl:value-of select="$width - 2.5"/>;
              top:<xsl:value-of select="$height - 2.5"/>;
           </xsl:attribute>
           <xsl:attribute name="strokecolor">#000000</xsl:attribute>
           <xsl:attribute name="fillcolor">#D8BFD8</xsl:attribute>
         </v:rect>
         
         <v:rect>
           <xsl:attribute name="style">
              position:absolute;
              width:5;
              height:5;
              left:<xsl:value-of select="$width - 2.5"/>;
              top:<xsl:value-of select="$height div 2 - 2.5"/>;
           </xsl:attribute>
           <xsl:attribute name="strokecolor">#000000</xsl:attribute>
           <xsl:attribute name="fillcolor">#D8BFD8</xsl:attribute>
         </v:rect>
        </v:group>
   </xsl:template>
   
   <!-- groupborder end -->   
   
   <!-- text model start-->
   <xsl:template name="text">
   <xsl:param name="name" select="./name"/>
   <xsl:param name="width" select="./style/width"/>
   <xsl:param name="height" select="./style/height"/>
   <xsl:param name="left" select="./position/left"/>
   <xsl:param name="top" select="./position/top"/>
   <xsl:param name="border" select="./style/border"/>
   <xsl:param name="font-family" select="./style/font-family"/>
   <xsl:param name="font-size" select="./style/font-size"/>
   <xsl:param name="color" select="./style/color"/>
   <xsl:param name="value" select="./value"/>
   <xsl:param name="border-color" select="./style/border-color"/>
   <xsl:param name="border-width" select="./style/border-width"/>
   <xsl:param name="border-left" select="./style/border-left"/>
   <xsl:param name="border-right" select="./style/border-right"/>
   <xsl:param name="border-top" select="./style/border-top"/>
   <xsl:param name="border-bottom" select="./style/border-bottom"/>
   <xsl:param name="value" select="./value"/>
   <xsl:param name="background-color" select="./style/background-color"/>
   <xsl:param name="text-align" select="./style/text-align"/>
   <xsl:param name="title" select="./title"/>
   <xsl:param name="readonly" select="./readonly"/>
   <xsl:param name="K_name" select="K_name"/>
   <xsl:param name="font-style" select="./style/font-style"/>
   <xsl:param name="font-weight" select="./style/font-weight"/>
   <xsl:param name="bgcolor" select="../bgcolor"/>
   <xsl:param name="privilege"/>

     <div id="{$name}">
       <xsl:if test="$privilege != 'noprivilege'">
        <xsl:attribute name="onmousedown">event.cancelBubble='true';figure_click(this)</xsl:attribute>
       </xsl:if>
       <xsl:attribute name="name">
         <xsl:value-of select="$name"/>
       </xsl:attribute>
       <xsl:attribute name="value">
         <xsl:value-of select="./value"/>
       </xsl:attribute>
       <xsl:attribute name="style">
          position:absolute;
          top:<xsl:value-of select="$top"/>;
          left:<xsl:value-of select="$left"/>;
          width:<xsl:value-of select="$width"/>;
          height:<xsl:value-of select="$height"/>;
          z-index:100;
       </xsl:attribute>
       <xsl:attribute name="readonly">
         <xsl:value-of select="$readonly"/>
       </xsl:attribute>
       <xsl:attribute name="title">
         <xsl:value-of select="$title"/>
       </xsl:attribute>
       <!-- draw the border start -->
       <xsl:call-template name="border">
         <xsl:with-param name="name" select="$name"/>
         <xsl:with-param name="width" select="$width"/>
         <xsl:with-param name="height" select="$height"/>
       </xsl:call-template>
       <!-- draw the border end -->
       <div>
          <xsl:attribute name="style">
            position:absolute;top:0;left:0;
            width:<xsl:value-of select="$width + 5"/>;
            height:<xsl:value-of select="$height + 5"/>;
            <xsl:call-template name="filter-readonly">
              <xsl:with-param name="readonly" select="$readonly" />
            </xsl:call-template>            
          </xsl:attribute>
       <v:group>
         <xsl:attribute name="style">
            position:absolute;top:0;left:0;
            width:<xsl:value-of select="$width"/>;
            height:<xsl:value-of select="$height"/>;
         </xsl:attribute>
         <xsl:attribute name="coordsize">
           <xsl:value-of select="$width"/>,<xsl:value-of select="$height"/>
         </xsl:attribute>
         <xsl:call-template name="textrect">
            <xsl:with-param name="width" select="$width"/>
            <xsl:with-param name="height" select="$height"/>
            <xsl:with-param name="title" select="$title"/>
            <xsl:with-param name="border" select="$border"/>
            <xsl:with-param name="border-left" select="$border-left"/>
            <xsl:with-param name="border-width" select="$border-width"/>
            <xsl:with-param name="border-right" select="$border-right"/>
            <xsl:with-param name="border-top" select="$border-top"/>
            <xsl:with-param name="border-bottom" select="$border-bottom"/>
            <xsl:with-param name="border-color" select="$border-color"/>
            <xsl:with-param name="background-color" select="$background-color"/>
            <xsl:with-param name="bgcolor" select="$bgcolor"/>
         </xsl:call-template>
       </v:group>
       <table>
         <xsl:attribute name="style">
               position:absolute;
               width:<xsl:value-of select="$width"/>;
               height:<xsl:value-of select="$height"/>;
               font-family:<xsl:value-of select="$font-family"/>;
               font-size:<xsl:value-of select="concat($font-size,$fontUnit)"/>;
               font-style:<xsl:value-of select="$font-style"/>;
               font-weight:<xsl:value-of select="$font-weight"/>;
               color:<xsl:value-of select="$color"/>;
               text-overflow:ellipsis;
               text-align:<xsl:value-of select="$text-align"/>;
         </xsl:attribute>
         <tr>
           <td>
            <nobr>
             <xsl:attribute name="style">
               overflow:hidden;
               text-overflow:ellipsis;
               width:<xsl:value-of select="$width"/>
             </xsl:attribute>
             <xsl:choose>
             <xsl:when test="$K_name='password'">
               <xsl:if test="string-length($value) &gt; 0 ">
                ******
               </xsl:if>
             </xsl:when>
             <xsl:otherwise>
              <xsl:if test="string-length($value) = 0">
               &#160;
              </xsl:if>
              <xsl:value-of select="$value"/>
             </xsl:otherwise>
             </xsl:choose>
            </nobr>
           </td>
         </tr>
       </table>
      </div>
     </div>
   </xsl:template>
   <!-- text model end-->

   <!-- radio model start -->
   <xsl:template name="radio">
   <xsl:param name="name" select="./name"/>
   <xsl:param name="value" select="./caption"></xsl:param>
   <xsl:param name="width" select="./style/width"/>
   <xsl:param name="height" select="./style/height"/>
   <xsl:param name="font-family" select="./style/font-family"/>
   <xsl:param name="font-size" select="./style/font-size"/>
   <xsl:param name="top" select="./position/top"/>
   <xsl:param name="left" select="./position/left"/>
   <xsl:param name="readonly" select="./readonly"/>
   <xsl:param name="text-align" select="./style/text-align"/>
   <xsl:param name="color" select="./style/color"/>
   <xsl:param name="background-color" select="./style/background-color"/>
   <xsl:param name="textposition" select="./textposition"/>
   <xsl:param name="title" select="./title"/>
   <xsl:param name="font-style" select="./style/font-style"/>
   <xsl:param name="font-weight" select="./style/font-weight"/>
      <div id="{$name}">
          <xsl:attribute name="onmousedown">event.cancelBubble='true';figure_click(this);</xsl:attribute>
          <xsl:attribute name="name">
             <xsl:value-of select="$name"/>
          </xsl:attribute>
          <xsl:attribute name="readonly">
             <xsl:value-of select="$readonly" />
          </xsl:attribute>
          <xsl:attribute name="title">
            <xsl:value-of select="$title"/>
          </xsl:attribute>
          <xsl:attribute name="style">
             position:absolute;
             top:<xsl:value-of select="$top"/>;
             left:<xsl:value-of select="$left"/>;
             width:<xsl:value-of select="$width"/>;
             height:<xsl:value-of select="$height"/>;
             z-index:100;
          </xsl:attribute>
       <!-- draw the border start -->
       <xsl:call-template name="border">
         <xsl:with-param name="name" select="$name"/>
         <xsl:with-param name="width" select="$width"/>
         <xsl:with-param name="height" select="$height"/>
       </xsl:call-template>
       <!-- draw the border end -->
       <div>
          <xsl:attribute name="style">
            position:absolute;top:0;left:0;
            width:<xsl:value-of select="$width + 5"/>;
            height:<xsl:value-of select="$height + 5"/>;
            <xsl:call-template name="filter-readonly">
               <xsl:with-param name="readonly" select="$readonly" />
            </xsl:call-template>
       </xsl:attribute>
      <table style="position:absolute;top:0;left:0;width:{$width};height:{$height};font-family:{$font-family};font-size:{$font-size};font-style:{$font-style};font-weight:{$font-weight};background-color:{$background-color};">
        <tr>
         <xsl:choose>
           <xsl:when test="$textposition=0">
            <td>
             <nobr>
             <xsl:attribute name="style">
             width:<xsl:value-of select="number($width) - 20"/>;
             overflow:hidden;
             text-overflow:ellipsis;
             text-align:<xsl:value-of select="$text-align"/>;
             color:<xsl:value-of select="$color"/>
             </xsl:attribute>
             <xsl:value-of select="$value"/>
             </nobr>
           </td>
           <td style="width:15;height:15;">
              <input type="radio">
                 <xsl:if test="./checked[text()='true']">
                     <xsl:attribute name="checked">true</xsl:attribute>
                  </xsl:if>
              </input>               
              <!-- 
              <v:group style="width:15;height:15;" coordsize="15,15">
              <v:arc style="LEFT:0;WIDTH:12;POSITION:absolute;TOP:0px;HEIGHT:12px;">
               <xsl:attribute name="StartAngle">225</xsl:attribute>
               <xsl:attribute name="EndAngle">405</xsl:attribute>
               <xsl:attribute name="fillcolor">white</xsl:attribute>
               <xsl:attribute name="strokecolor">inactivecaption</xsl:attribute>
               <xsl:attribute name="strokeweight">1</xsl:attribute>
             </v:arc>
             <v:oval fillcolor="white" strokecolor="#dcdcdc" style="LEFT:1;WIDTH:10px;POSITION:absolute;TOP:1px;HEIGHT:10px;"/>
             <v:arc>
               <xsl:attribute name="style">
                LEFT:1;WIDTH:10px;POSITION:absolute;TOP:1px;HEIGHT:10px
               </xsl:attribute>
               <xsl:attribute name="StartAngle">225</xsl:attribute>
               <xsl:attribute name="EndAngle">405</xsl:attribute>
               <xsl:attribute name="fillcolor">white</xsl:attribute>
               <xsl:attribute name="strokecolor">#000000</xsl:attribute>
             </v:arc>

             <xsl:if test="./checked[text()='true']">
               <v:oval>
                <xsl:attribute name="style">
                  LEFT:4;WIDTH:5px;POSITION:absolute;TOP:3px;HEIGHT:5px
                </xsl:attribute>
                <xsl:attribute name="fillcolor">#000000</xsl:attribute>
                <xsl:attribute name="strokecolor">#dcdcdc</xsl:attribute>
              </v:oval>
             </xsl:if>
             </v:group>
             -->
             </td>
           </xsl:when>
           
           <xsl:otherwise>
             <td style="width:15;height:15;">
               <input type="radio">
                  <xsl:if test="./checked[text()='true']">
                     <xsl:attribute name="checked">true</xsl:attribute>
                  </xsl:if>
               </input>
             <!-- 
              <v:group style="width:15;height:15;" coordsize="15,15">
              <v:arc style="LEFT:0;WIDTH:12;POSITION:absolute;TOP:0px;HEIGHT:12px;">
               <xsl:attribute name="StartAngle">225</xsl:attribute>
               <xsl:attribute name="EndAngle">405</xsl:attribute>
               <xsl:attribute name="fillcolor">white</xsl:attribute>
               <xsl:attribute name="strokecolor">inactivecaption</xsl:attribute>
               <xsl:attribute name="strokeweight">1</xsl:attribute>
             </v:arc>
             <v:oval>
               <xsl:attribute name="style">
                 LEFT:1;WIDTH:10px;POSITION:absolute;TOP:1px;HEIGHT:10px
               </xsl:attribute>
               <xsl:attribute name="fillcolor">white</xsl:attribute>
               <xsl:attribute name="strokecolor">#dcdcdc</xsl:attribute>
             </v:oval>
             <v:arc>
               <xsl:attribute name="style">
                LEFT:1;WIDTH:10px;POSITION:absolute;TOP:1px;HEIGHT:10px
               </xsl:attribute>
               <xsl:attribute name="StartAngle">225</xsl:attribute>
               <xsl:attribute name="EndAngle">405</xsl:attribute>
               <xsl:attribute name="fillcolor">white</xsl:attribute>
               <xsl:attribute name="strokecolor">#000000</xsl:attribute>
             </v:arc>

             <xsl:if test="./checked[text()='true']">
               <v:oval>
                <xsl:attribute name="style">
                  LEFT:4;WIDTH:5px;POSITION:absolute;TOP:3px;HEIGHT:5px
                </xsl:attribute>
                <xsl:attribute name="fillcolor">#000000</xsl:attribute>
                <xsl:attribute name="strokecolor">#dcdcdc</xsl:attribute>
              </v:oval>
             </xsl:if>
             </v:group>
             -->
             </td>
            <!-- text -->
            <td>
             <nobr>
             <xsl:attribute name="style">
             width:<xsl:value-of select="number($width) - 20"/>;
             overflow:hidden;
             text-overflow:ellipsis;
             text-align:<xsl:value-of select="$text-align"/>;
             color:<xsl:value-of select="$color"/>
             </xsl:attribute>
             <xsl:value-of select="$value"/>
             </nobr>
           </td>
          </xsl:otherwise>
         </xsl:choose>
        </tr>
      </table>
     </div>
     </div>
   </xsl:template>

   <!-- ardio model end -->

   <!-- checkbox start -->
   <xsl:template name="checkbox">
       <xsl:param name="name" select="./name"/>
       <xsl:param name="value" select="./caption"/>
       <xsl:param name="width" select="./style/width"/>
       <xsl:param name="height" select="./style/height"/>
       <xsl:param name="font-family" select="./style/font-family"/>
       <xsl:param name="font-size" select="./style/font-size"/>
       <xsl:param name="font-style" select="./style/font-style"/>
       <xsl:param name="font-weight" select="./style/font-weight"/>
       <xsl:param name="top" select="./position/top"/>
       <xsl:param name="left" select="./position/left"/>
       <xsl:param name="readonly" select="./readonly"/>
       <xsl:param name="text-align" select="./style/text-align"/>
       <xsl:param name="color" select="./style/color"/>
       <xsl:param name="background-color" select="./style/background-color"/>
       <xsl:param name="textposition" select="./textposition"/>
       <xsl:param name="letter-spacing" select="./style/letter-spacing"/>
      <div id="{$name}">
         <xsl:attribute name="onmousedown">event.cancelBubble='true';figure_click(this)</xsl:attribute>
         <xsl:attribute name="name">
          <xsl:value-of select="$name"/>
         </xsl:attribute>
         
         <xsl:attribute name="style">
             position:absolute;
             top:<xsl:value-of select="$top"/>;
             left:<xsl:value-of select="$left"/>;
             width:<xsl:value-of select="$width"/>;
             height:<xsl:value-of select="$height"/>;
             z-index:100;
         </xsl:attribute>
         <xsl:attribute name="readonly">
          <xsl:value-of select="$readonly"/>
         </xsl:attribute>
       <!-- draw the border start -->
       <xsl:call-template name="border">
         <xsl:with-param name="name" select="$name"/>
         <xsl:with-param name="width" select="$width"/>
         <xsl:with-param name="height" select="$height"/>
       </xsl:call-template>
       <!-- draw the border end -->              
       <div>
          <xsl:attribute name="style">
            position:absolute;top:0;left:0;
            width:<xsl:value-of select="$width + 5"/>;
            height:<xsl:value-of select="$height + 5"/>;          
            <xsl:call-template name="filter-readonly">
              <xsl:with-param name="readonly" select="$readonly" />
            </xsl:call-template>            
          </xsl:attribute>
        <table>
          <xsl:attribute name="style">
            position:absolute;
            width:<xsl:value-of select="$width"/>;
            height:<xsl:value-of select="$height"/>;
            font-family:<xsl:value-of select="$font-family"/>;
            font-size:<xsl:value-of select="concat($font-size,$fontUnit)"/>;
            font-style:<xsl:value-of select="$font-style"/>;
            font-weight:<xsl:value-of select="$font-weight"/>;
            background-color:<xsl:value-of select="$background-color"/>;
          </xsl:attribute>
        <tr>
          <xsl:choose>
            <xsl:when test="$textposition = 0">
               <td>
                 <nobr>
                 <xsl:attribute name="style">
                  width:<xsl:value-of select="number($width) - 20"/>;
                  overflow:hidden;
                  text-overflow:ellipsis;
                  text-align:<xsl:value-of select="$text-align"/>;
                  letter-spacing:<xsl:value-of select="$letter-spacing"/>;
                  color:<xsl:value-of select="$color"/>;
                  line-height:<xsl:value-of select="$height"/>px;
                  </xsl:attribute>
                  <xsl:value-of select="$value"/>
                 </nobr>
               </td>
                <td>
                 <v:group>
                   <xsl:attribute name="style">
                    width:12;height:12;
                   </xsl:attribute>
               <xsl:attribute name="coordsize">12,12</xsl:attribute>
          <v:rect>
            <xsl:attribute name="fillcolor">inactivecaption</xsl:attribute>
            <xsl:attribute name="strokecolor">inactivecaption</xsl:attribute>
            <xsl:attribute name="strokeweight">1</xsl:attribute>
            <xsl:attribute name="style">
              position:absolute;width:12;height:12;left:0;top:0;
            </xsl:attribute>
          </v:rect>

          <v:rect>
            <xsl:attribute name="strokecolor">#dcdcdc</xsl:attribute>
            <xsl:attribute name="strokeweight">1</xsl:attribute>
            <xsl:attribute name="fillcolor">#dcdcdc</xsl:attribute>
            <xsl:attribute name="style">
              position:absolute;width:11;height:11;left:1;top:1;
            </xsl:attribute>
          </v:rect>

          <v:rect>
            <xsl:attribute name="strokecolor">#000000</xsl:attribute>
            <xsl:attribute name="fillcolor">#000000</xsl:attribute>
            <xsl:attribute name="strokewidth">1</xsl:attribute>
            <xsl:attribute name="style">
              position:absolute;left:1;top:1;width:10;height:10;
            </xsl:attribute>
          </v:rect>

          <v:rect>
            <xsl:attribute name="strokecolor">#ffffff</xsl:attribute>
            <xsl:attribute name="fillcolor">#ffffff</xsl:attribute>
            <xsl:attribute name="strokewidth">1</xsl:attribute>
            <xsl:attribute name="style">
              position:absolute;left:2;top:2;width:9;height:9; 
            </xsl:attribute>
          </v:rect>

          <xsl:if test="./checked[text()='true']">
              <v:polyline id="check" points="3,5 5,8 10,3" strokecolor="#000000" strokeweight="1.5"></v:polyline>
          </xsl:if>
        </v:group>
         </td>
            </xsl:when>
              <xsl:otherwise>
               <td>
                 <v:group>
                   <xsl:attribute name="style">
                    width:12;height:12;
                   </xsl:attribute>
               <xsl:attribute name="coordsize">12,12</xsl:attribute>
          <v:rect>
            <xsl:attribute name="fillcolor">inactivecaption</xsl:attribute>
            <xsl:attribute name="strokecolor">inactivecaption</xsl:attribute>
            <xsl:attribute name="strokeweight">1</xsl:attribute>
            <xsl:attribute name="style">
              position:absolute;width:12;height:12;left:0;top:0;
            </xsl:attribute>
          </v:rect>

          <v:rect>
            <xsl:attribute name="strokecolor">#dcdcdc</xsl:attribute>
            <xsl:attribute name="strokeweight">1</xsl:attribute>
            <xsl:attribute name="fillcolor">#dcdcdc</xsl:attribute>
            <xsl:attribute name="style">
              position:absolute;width:11;height:11;left:1;top:1;
            </xsl:attribute>
          </v:rect>

          <v:rect>
            <xsl:attribute name="strokecolor">#000000</xsl:attribute>
            <xsl:attribute name="fillcolor">#000000</xsl:attribute>
            <xsl:attribute name="strokewidth">1</xsl:attribute>
            <xsl:attribute name="style">
              position:absolute;left:1;top:1;width:10;height:10;
            </xsl:attribute>
          </v:rect>

          <v:rect>
            <xsl:attribute name="strokecolor">#ffffff</xsl:attribute>
            <xsl:attribute name="fillcolor">#ffffff</xsl:attribute>
            <xsl:attribute name="strokewidth">1</xsl:attribute>
            <xsl:attribute name="style">
              position:absolute;left:2;top:2;width:9;height:9; 
            </xsl:attribute>
          </v:rect>

          <xsl:if test="./checked[text()='true']">
             <v:polyline id="check" points="3,5 5,8 10,3" strokecolor="#000000" strokeweight="1.5"></v:polyline>
          </xsl:if>
        </v:group>
         </td>
         <td>
          <nobr>
          <xsl:attribute name="style">
             width:<xsl:value-of select="number($width) - 20"/>;
             overflow:hidden;
             text-overflow:ellipsis;
             text-align:<xsl:value-of select="$text-align"/>;
             letter-spacing:<xsl:value-of select="$letter-spacing"/>;             
             color:<xsl:value-of select="$color"/>;
             line-height:<xsl:value-of select="$height"/>px;
          </xsl:attribute>
          <xsl:value-of select="$value"/>
          </nobr>
          </td>
        </xsl:otherwise>
      </xsl:choose>
     </tr>
    </table>
    </div>
  </div>

   </xsl:template>
   
    <!-- password model start-->
   <xsl:template name="password">
   <xsl:param name="name" select="./name"/>
   <xsl:param name="width" select="./style/width"/>
   <xsl:param name="height" select="./style/height"/>
   <xsl:param name="left" select="./position/left"/>
   <xsl:param name="top" select="./position/top"/>
   <xsl:param name="border" select="./style/border"/>
   <xsl:param name="font-family" select="./style/font-family"/>
   <xsl:param name="font-size" select="./style/font-size"/>
   <xsl:param name="color" select="./style/color"/>
   <xsl:param name="value" select="./value"/>
   <xsl:param name="border-color" select="./style/border-color"/>
   <xsl:param name="border-width" select="./style/border-width"/>
   <xsl:param name="value" select="./value"/>
   <xsl:param name="readonly" select="./readonly"/>
 
     <xsl:call-template name="text">
       <xsl:with-param name="K_name">password</xsl:with-param>
     </xsl:call-template>

   </xsl:template>
   <!-- password model end-->


  <!-- hline start -->
  
  <xsl:template name="hline">
  
  <xsl:param name="name" select="./name"/>
  <xsl:param name="width" select="./style/width"/>
  <xsl:param name="height" select="./style/height"/>
  <xsl:param name="color" select="./style/color"/>
  <xsl:param name="top" select="./position/top"/>
  <xsl:param name="left" select="./position/left"/>
  
   <div id="{$name}">
     <xsl:attribute name="name"><xsl:value-of select="$name"/></xsl:attribute>
     <xsl:attribute name="onmousedown">event.cancelBubble='true';</xsl:attribute>
     <xsl:attribute name="style">
        position:absolute;
        left:<xsl:value-of select="$left"/>;
        top:<xsl:value-of select="$top"/>;
        width:<xsl:value-of select="$width+5"/>;
        height:<xsl:value-of select="$height+4"/>;
        z-index:100;
     </xsl:attribute>
     <!-- transparent line -->
     <xsl:choose>
        <xsl:when test="$color = 'transparent'">&#160;</xsl:when>
        <xsl:otherwise>
         <v:line>
         <xsl:attribute name="from">0,0</xsl:attribute> 
         <xsl:attribute name="to"><xsl:value-of select="$width"/>,0</xsl:attribute> 
         <xsl:attribute name="strokecolor"><xsl:value-of select="$color"/></xsl:attribute>
         <xsl:attribute name="strokeweight"><xsl:value-of select="$height"/></xsl:attribute>
        </v:line>
        </xsl:otherwise>
     </xsl:choose>
   </div>
  </xsl:template>
  
  <!-- hline end -->
  
  <!-- vline start -->
  
  <xsl:template name="vline">
  
   <xsl:param name="name" select="./name"/>
   <xsl:param name="color" select="./style/background-color"/>
   <xsl:param name="width" select="./style/width"/>
   <xsl:param name="height" select="./style/height"/>
   <xsl:param name="top" select="./position/top"/>
   <xsl:param name="left" select="./position/left"/>
   
     <div>
       <xsl:attribute name="name">
         <xsl:value-of select="$name"/>
       </xsl:attribute>
       <xsl:attribute name="onmousedown">event.cancelBubble='true';</xsl:attribute>
       <xsl:attribute name="style">
         position:absolute;
         top:<xsl:value-of select="$top"/>px;
         left:<xsl:value-of select="$left"/>px;
         width:<xsl:value-of select="$width+5"/>px;
         height:<xsl:value-of select="$height+5"/>px;
         z-index:100;
       </xsl:attribute>
       <xsl:choose>
         <xsl:when test="$color = 'transparent'">&#160;</xsl:when>
         <xsl:otherwise>
         <v:line>
        	 <xsl:attribute name="from">0,0</xsl:attribute>
     	     <xsl:attribute name="to">0,<xsl:value-of select="$height"/></xsl:attribute>
	         <xsl:attribute name="strokecolor"><xsl:value-of select="$color"/></xsl:attribute>
	         <xsl:attribute name="strokeweight"><xsl:value-of select="$width"/></xsl:attribute>
         </v:line>         
         </xsl:otherwise>
       </xsl:choose>

     </div>
  </xsl:template>
  
  <!-- vline end -->
  
  <!-- label start -->
  
  <xsl:template name="label">
   <xsl:param name="name" select="./name"/>
   <xsl:param name="value" select="./value"/>
   <xsl:param name="color" select="./style/color"/>
   <xsl:param name="background-color" select="./style/background-color"/>
   <xsl:param name="font-family" select="./style/font-family"/>
   <xsl:param name="font-size" select="./style/font-size"/>
   <xsl:param name="font-weight" select="./style/font-weight"/>
   <xsl:param name="font-style" select="./style/font-style"/>
   <xsl:param name="text-align" select="./style/text-align"/>
   <xsl:param name="width" select="./style/width"/>
   <xsl:param name="height" select="./style/height"/>
   <xsl:param name="top" select="./position/top"/>
   <xsl:param name="left" select="./position/left"/>
   <xsl:param name="readonly" select="./readonly"/>
   <xsl:param name="letter-spacing" select="./style/letter-spacing"/>
   
   <div>
     <xsl:attribute name="name">
       <xsl:value-of select="$name"/>
     </xsl:attribute>
     <!--  xsl:attribute name="onmousedown">event.cancelBubble='true';figure_click(this)</xsl:attribute -->
     <xsl:attribute name="style"> 
        position:absolute; 
        left:<xsl:value-of select="$left"/>; 
        top:<xsl:value-of select="$top"/>; 
        width:<xsl:value-of select="$width"/>; 
        height:<xsl:value-of select="$height"/>; 
        background-color:<xsl:value-of select="$background-color"/>;
        z-index:70;
     </xsl:attribute>
     <xsl:attribute name="readonly">true</xsl:attribute>
       <!-- draw the border start
       <xsl:call-template name="border">
         <xsl:with-param name="name" select="$name"/>
         <xsl:with-param name="width" select="$width"/>
         <xsl:with-param name="height" select="$height"/>
       </xsl:call-template>
       draw the border end -->
       
       <!-- draw the text start -->
      <span>
        <xsl:attribute name="style">
            position:absolute;
            width:<xsl:value-of select="$width"/>;
            height:<xsl:value-of select="$height"/>;
            font-family:<xsl:value-of select="$font-family"/>;
            font-size:<xsl:value-of select="concat($font-size,$fontUnit)"/>;
            font-style:<xsl:value-of select="$font-style"/>;
            font-weight:<xsl:value-of select="$font-weight"/>;
            color:<xsl:value-of select="$color"/>;
            text-align:<xsl:value-of select="$text-align"/>;
        </xsl:attribute>
        <nobr>
           <xsl:attribute name="style">
            width:<xsl:value-of select="$width"/>;
            height:<xsl:value-of select="$height"/>;
            line-height:<xsl:value-of select="$height"/>px;
            overflow:hidden;
            text-overflow:ellipsis;
            letter-spacing:<xsl:value-of select="$letter-spacing"/>;
           </xsl:attribute>
           <xsl:value-of select="$value"/>
        </nobr>
       </span>
      <!-- draw the text end -->
   </div>
  </xsl:template>
  
  <!-- label end -->
  
  <!-- button start -->
  
  <xsl:template name="button">
    <xsl:param name="name" select="./name"/>
    <xsl:param name="value" select="./value"/>
    <xsl:param name="top" select="./position/top"/>
    <xsl:param name="left" select="./position/left"/>
    <xsl:param name="width" select="./style/width"/>
    <xsl:param name="height" select="./style/height"/>
    <xsl:param name="background-color" select="./style/background-color"/>
    <xsl:param name="font-family" select="./style/font-family"/>
    <xsl:param name="font-size" select="./style/font-size"/>
    <xsl:param name="font-style" select="./style/font-style"/>
    <xsl:param name="font-weight" select="./style/font-weight"/>
    <xsl:param name="text-align" select="./style/text-align"/>
    <xsl:param name="color" select="./style/color"/>
    <xsl:param name="readonly" select="./readonly"/>
    
    <div id="{$name}">
      <xsl:attribute name="name">
        <xsl:value-of select="$name"/>
      </xsl:attribute>
      <xsl:attribute name="onmousedown">event.cancelBubble='true';figure_click(this)</xsl:attribute>
      <xsl:attribute name="style">
        position:absolute;
        left:<xsl:value-of select="$left"/>;
        top:<xsl:value-of select="$top"/>;
        width:<xsl:value-of select="$width"/>;
        height:<xsl:value-of select="$height"/>;
        z-index:100;
      </xsl:attribute>
      <xsl:attribute name="readonly">
       <xsl:value-of select="$readonly"/>
      </xsl:attribute>
      
        <!-- draw the border start -->
       <xsl:call-template name="border">
         <xsl:with-param name="name" select="$name"/>
         <xsl:with-param name="width" select="$width"/>
         <xsl:with-param name="height" select="$height"/>
       </xsl:call-template>
       <!-- draw the border end -->
       <div>
          <xsl:attribute name="style">
            position:absolute;top:0;left:0;
            width:<xsl:value-of select="$width + 5"/>;
            height:<xsl:value-of select="$height + 5"/>;
            <xsl:call-template name="filter-readonly">
              <xsl:with-param name="readonly" select="$readonly" />
            </xsl:call-template>                              
          </xsl:attribute>       
             <xsl:choose>
                <xsl:when test="$background-color='' or not($background-color)">
                  <v:rect fillcolor="#ffffff">
                    <xsl:attribute name="style">
                    position:absolute;
                    left:1;
                    top:1;
                    width:<xsl:value-of select="$width - 2"/>;
                    height:<xsl:value-of select="$height - 2"/>;
                   </xsl:attribute>
                  </v:rect>
                </xsl:when>
                <xsl:when test="$background-color='transparent'">
                </xsl:when>                
                <xsl:otherwise>
                  <v:rect fillcolor="{$background-color}" strokecolor="{$background-color}">
                <xsl:attribute name="style">
                 position:absolute;
                 left:1;
                 top:1;
                 width:<xsl:value-of select="$width - 2"/>;
                 height:<xsl:value-of select="$height - 2"/>;
               </xsl:attribute>
             </v:rect>
                </xsl:otherwise>
             </xsl:choose>
            <!-- draw K start -->
             <v:line from="0,0" to="{$width - 1},0" strokecolor="#ffffff"/>
             <v:line from="0,0" to="0,{$height - 1}" strokecolor="#ffffff"/>
             <v:line from="{$width},0" to="{$width},{$height}" strokecolor="black"/>
             <v:line from="0,{$height}" to="{$width},{$height}" strokecolor="black"/>
             <v:line from="{$width - 1},1" to="{$width - 1},{$height - 1}" strokecolor="#645A5A"/>
             <v:line from="1,{$height - 1}" to="{$width - 1},{$height - 1}" strokecolor="#645A5A"/>
            <!-- draw K end -->
      <span>
        <xsl:attribute name="style">
            position:absolute;
            width:<xsl:value-of select="$width"/>;
            height:<xsl:value-of select="$height"/>;
            font-family:<xsl:value-of select="$font-family"/>;
            font-size:<xsl:value-of select="concat($font-size,$fontUnit)"/>;
            font-style:<xsl:value-of select="$font-style"/>;
            font-weight:<xsl:value-of select="$font-weight"/>;
            color:<xsl:value-of select="$color"/>;
            text-align:<xsl:value-of select="$text-align"/>;
            text-overflow:ellipsis;
            line-height:<xsl:value-of select="$height"/>px;
        </xsl:attribute>
           <nobr style="width:{$width};overflow:hidden;text-overflow:ellipsis"><xsl:value-of select="$value"/></nobr>
      </span>
     </div>
    </div>
  </xsl:template>
  
  <!-- button end -->

  <!-- anchor start -->
  
   <xsl:template name="anchor">
     <xsl:param name="name" select="./name"/>
     <xsl:param name="value" select="./value"/>
     <xsl:param name="href" select="./href"/>
     <xsl:param name="width" select="./style/width"/>
     <xsl:param name="height" select="./style/height"/>
     <xsl:param name="top" select="./position/top"/>
     <xsl:param name="left" select="./position/left"/>
     <xsl:param name="font-family" select="./style/font-family"/>
     <xsl:param name="font-size" select="./style/font-size"/>
     <xsl:param name="font-style" select="./style/font-style"/>
     <xsl:param name="font-weight" select="./style/font-weight"/>
     <xsl:param name="text-align" select="./style/text-align"/>
     <xsl:param name="letter-spacing" select="./style/letter-spacing"/>
     <xsl:param name="readonly" select="./readonly"/>
     <div id="{$name}">
       <xsl:attribute name="name">
         <xsl:value-of select="$name"/>
       </xsl:attribute>
       <!-- xsl:attribute name="onmousedown">event.cancelBubble='true';figure_click(this)</xsl:attribute -->
       <xsl:attribute name="style">
         position:absolute;
         left:<xsl:value-of select="$left"/>;
         top:<xsl:value-of select="$top"/>;
         width:<xsl:value-of select="$width"/>;
         height:<xsl:value-of select="$height"/>;
         z-index:100;
       </xsl:attribute>
       <xsl:attribute name="readonly">
        <xsl:value-of select="readonly"/>
       </xsl:attribute>
       <!-- draw the border start
       <xsl:call-template name="border">
         <xsl:with-param name="name" select="$name"/>
         <xsl:with-param name="width" select="$width"/>
         <xsl:with-param name="height" select="$height"/>
       </xsl:call-template>
        draw the border end -->
       <div>
          <xsl:attribute name="style">
            position:absolute;top:0;left:0;
            width:<xsl:value-of select="$width + 5"/>;
            height:<xsl:value-of select="$height + 5"/>;          
            <!-- xsl:call-template name="filter-readonly">
              <xsl:with-param name="readonly" select="$readonly" />
            </xsl:call-template -->                    
          </xsl:attribute>              
       <span>
         <xsl:attribute name="style">
            position:absolute;
            width:<xsl:value-of select="$width"/>;
            height:<xsl:value-of select="$height"/>;
            font-family:<xsl:value-of select="$font-family"/>;
            font-size:<xsl:value-of select="concat($font-size,$fontUnit)"/>;
            font-style:<xsl:value-of select="$font-style"/>;
            font-weight:<xsl:value-of select="$font-weight"/>;
            text-align:<xsl:value-of select="$text-align"/>;
            text-justify: distribute-all-lines;
            border-bottom:solid blue 1;
         </xsl:attribute>
            <nobr>
             <xsl:attribute name="style">
               overflow:hidden;
               text-overflow:ellipsis;
               width:<xsl:value-of select="$width"/>;
               height:<xsl:value-of select="$height"/>;
               color:blue;
               text-justify: distribute-all-lines;
               line-height:<xsl:value-of select="$height"/>px;
               letter-spacing:<xsl:value-of select="$letter-spacing"/>;
             </xsl:attribute>
             <xsl:value-of select="value"/> 
            </nobr>
       </span>
     </div>
     </div>
   </xsl:template>
  
  <!-- anchor end -->
  
  <!-- table start -->
  
    <xsl:template name="table">
      <xsl:param name="name" select="./name"/>
      <xsl:param name="left" select="./position/left"/>
      <xsl:param name="top" select="./position/top"/>
      <xsl:param name="width" select="./style/width"/>
      <xsl:param name="height" select="./style/height"/>
      <xsl:param name="background-color" select="./style/background-color"/>
      <xsl:param name="border" select="./style/border"/>
      <xsl:param name="border-width" select="./style/border-width"/>
      <xsl:param name="border-collapse" select="./style/border-collapse"/>
      <xsl:param name="cellpadding" select="./cellpadding"/>
      <xsl:param name="cellspacing" select="./cellspacing"/>
      <xsl:param name="bgcolor" select="../bgcolor"/>
      <div id="{$name}">
        <xsl:attribute name="name">
          <xsl:value-of select="$name"/>
        </xsl:attribute>
        <xsl:attribute name="onmousedown">event.cancelBubble='true';</xsl:attribute>
        <xsl:attribute name="style">
          position:absolute;
          left:<xsl:value-of select="$left"/>;
          top:<xsl:value-of select="$top"/>;
          z-index:70;
        </xsl:attribute>
        <table>
          <xsl:attribute name="cellpadding">
            <xsl:value-of select="$cellpadding"/>
          </xsl:attribute>
          <xsl:attribute name="cellspacing">
            <xsl:value-of select="$cellspacing"/>
          </xsl:attribute>
          <xsl:attribute name="style">
            width:<xsl:value-of select="$width"/>;
            height:<xsl:value-of select="$height"/>;
            background-color:<xsl:value-of select="$background-color"/>;
            border-collapse:<xsl:value-of select="$border-collapse"/>;
            border-style:none;
            padding:0;
          </xsl:attribute>
           <xsl:for-each select="./row">
             <xsl:variable name="cellCount" select="count(./cell)"/>
             <tr>
               <xsl:for-each select="./cell">
                 <xsl:variable name="rowspan" select="./rowspan"/>
                 <xsl:variable name="colspan" select="./colspan"/>
                 <td style="font-size:14;color:#00b200">
                   <xsl:attribute name="width">
                     <xsl:value-of select="./width"/>
                   </xsl:attribute>
                   <xsl:attribute name="height">
                     <xsl:value-of select="./height"/>
                   </xsl:attribute>
                   <xsl:attribute name="rowspan">
                     <xsl:value-of select="$rowspan"/>
                   </xsl:attribute>
                   <xsl:attribute name="colspan">
                     <xsl:value-of select="$colspan"/>
                   </xsl:attribute>
                   <xsl:attribute name="class">
                     <xsl:value-of select="./class"/>
                   </xsl:attribute>
                   <xsl:if test="./expr">
                    =<xsl:value-of select="./expr"/>
                   </xsl:if>
                 </td>
               </xsl:for-each>
             </tr>
           </xsl:for-each>
        </table>
      </div>
      <xsl:for-each select="./row/cell/*">
         <xsl:call-template name="testKN">
           <xsl:with-param name="left" select="$left"/>
           <xsl:with-param name="width" select="$width"/>
           <xsl:with-param name="top" select="$top"/>
           <xsl:with-param name="bgcolor">
               <xsl:choose>
                  <xsl:when test="$background-color = 'transparent'">
                     <xsl:value-of select="$bgcolor"/> 
                  </xsl:when>
                  <xsl:otherwise>
                      <xsl:value-of select="$background-color"/> 
                  </xsl:otherwise>
               </xsl:choose> 
           </xsl:with-param>
         </xsl:call-template>
      </xsl:for-each>
    
    </xsl:template>
     
  <!-- table end -->
  
  <!-- textarea start -->
  <xsl:template name="textarea">
    <xsl:param name="name" select="./name"/>
    <xsl:param name="width" select="./style/width"/>
    <xsl:param name="height" select="./style/height"/>
    <xsl:param name="left" select="./position/left"/>
    <xsl:param name="top" select="./position/top"/>
    <xsl:param name="border" select="./style/border"/>
    <xsl:param name="font-family" select="./style/font-family"/>
    <xsl:param name="font-size" select="./style/font-size"/>
    <xsl:param name="font-style" select="./style/font-style"/>
    <xsl:param name="font-weight" select="./style/font-weight"/>
    <xsl:param name="color" select="./style/color"/>
    <xsl:param name="value" select="./value"/>
    <xsl:param name="title" select="./title"/>
    <xsl:param name="border-color" select="./style/border-color"/>
    <xsl:param name="border-width" select="./style/border-width"/>
    <xsl:param name="value" select="./value"/>
    <xsl:param name="background-color" select="./style/background-color"/>
    <xsl:param name="bgcolor" select="../bgcolor"/>
    <xsl:param name="readonly" select="./readonly"/>
    <xsl:param name="text-align" select="./style/text-align"/>

     <div id="{$name}">
       <xsl:attribute name="onmousedown">event.cancelBubble='true';figure_click(this)</xsl:attribute>
       <xsl:attribute name="name">
         <xsl:value-of select="$name"/>
       </xsl:attribute>
       <xsl:attribute name="value">
         <xsl:value-of select="./value"/>
       </xsl:attribute>
       <xsl:attribute name="style">
          position:absolute;
          top:<xsl:value-of select="$top"/>;
          left:<xsl:value-of select="$left"/>;
          width:<xsl:value-of select="$width"/>;
          height:<xsl:value-of select="$height"/>;
          z-index:100;
       </xsl:attribute>
       <xsl:attribute name="readonly">
         <xsl:value-of select="$readonly"/>
       </xsl:attribute>
       
       <!-- draw the border start -->
       <xsl:call-template name="border">
         <xsl:with-param name="name" select="$name"/>
         <xsl:with-param name="width" select="$width"/>
         <xsl:with-param name="height" select="$height"/>
       </xsl:call-template>
       <!-- draw the border end -->              
       <div>
          <xsl:attribute name="style">
            position:absolute;top:0;left:0;
            width:<xsl:value-of select="$width + 5"/>;
            height:<xsl:value-of select="$height + 5"/>;          
            <xsl:call-template name="filter-readonly">
              <xsl:with-param name="readonly" select="$readonly" />
            </xsl:call-template>            
          </xsl:attribute>       
       <v:group>
         <xsl:attribute name="style">
            position:absolute;top:0;left:0;
            width:<xsl:value-of select="$width"/>;
            height:<xsl:value-of select="$height"/>;
         </xsl:attribute>
         <xsl:attribute name="coordsize">
           <xsl:value-of select="$width"/>,<xsl:value-of select="$height"/>
         </xsl:attribute>
         
        <xsl:call-template name="textrect">
            <xsl:with-param name="width" select="$width"/>
            <xsl:with-param name="height" select="$height"/>
            <xsl:with-param name="title" select="$title"/>
            <xsl:with-param name="border" select="$border"/>
            <xsl:with-param name="border-width" select="$border-width"/>
            <xsl:with-param name="border-color" select="$border-color"/>
            <xsl:with-param name="background-color" select="$background-color"/>
            <xsl:with-param name="bgcolor" select="$bgcolor"/>
         </xsl:call-template>
         
         <!-- 
         <v:rect>
           <xsl:attribute name="style">
              width:<xsl:value-of select="$width"/>;
              height:<xsl:value-of select="$height"/>;
           </xsl:attribute>
           <xsl:attribute name="strokecolor">
             <xsl:choose>
              <xsl:when test="$border = 'none'">
                #FFFFFF
              </xsl:when>
              <xsl:otherwise>
               <xsl:value-of select="$border-color"/> 
              </xsl:otherwise>
             </xsl:choose>
           </xsl:attribute>
           <xsl:if test="$background-color!=''">
           <xsl:attribute name="fillcolor">
             <xsl:value-of select="$background-color"/>
           </xsl:attribute>
           </xsl:if>
           <xsl:attribute name="strokeWeight">
            <xsl:value-of select="$border-width"/>
           </xsl:attribute>
         </v:rect>
         <xsl:if test="not($border)">
             <v:rect>
                <xsl:attribute name="style">
                  position:absolute;
                  top:1;
                  left:1;
                  width:<xsl:value-of select="number($width) - 1"/>;
                  height:<xsl:value-of select="number($height) - 1"/>;
                </xsl:attribute>
                <xsl:attribute name="strokecolor">
                 inactivecaption
                </xsl:attribute>
                <xsl:if test="$background-color!=''">
                   <xsl:attribute name="fillcolor">
                   <xsl:value-of select="$background-color"/>
                </xsl:attribute>
               </xsl:if>
             </v:rect>                          
           </xsl:if>
           -->
       </v:group>
        <span>
             <xsl:attribute name="style">
               position:absolute;
               z-index:1001;
               margin-top:1px;
               width:<xsl:value-of select="$width"/>;
               height:<xsl:value-of select="$height"/>;
               font-family:<xsl:value-of select="$font-family"/>;
               font-size:<xsl:value-of select="concat($font-size,$fontUnit)"/>;
               font-style:<xsl:value-of select="$font-style"/>;
               font-weight:<xsl:value-of select="$font-weight"/>;
               color:<xsl:value-of select="$color"/>;
               text-align:<xsl:value-of select="$text-align"/>;
               word-wrap:break-word;
               overflow:hidden;
             </xsl:attribute>
            <xsl:call-template name="paragraphValue">
              <xsl:with-param name="value">
               <xsl:choose>
                 <xsl:when test="$value=''">
                   &#160;
                 </xsl:when>
                 <xsl:otherwise>
                  <xsl:value-of select="$value" />    
                 </xsl:otherwise>
               </xsl:choose>
               
              </xsl:with-param>
            </xsl:call-template>
         </span>
       </div>
      </div>         
  </xsl:template>
  <!-- textarea end -->
  
  <!-- combobox start -->
  <xsl:template name="combobox">
    <xsl:param name="name" select="./name"/>
    <xsl:param name="width" select="./style/width"/>
    <xsl:param name="height" select="./style/height"/>
    <xsl:param name="left" select="./position/left"/>
    <xsl:param name="top" select="./position/top"/>
    <xsl:param name="border" select="./style/border"/>
    <xsl:param name="font-family" select="./style/font-family"/>
    <xsl:param name="font-size" select="./style/font-size"/>
    <xsl:param name="color" select="./style/color"/>
    <xsl:param name="value" select="./value"/>
    <xsl:param name="border-color" select="./style/border-color"/>
    <xsl:param name="border-width" select="./style/border-width"/>
    <xsl:param name="value" select="./value"/>
    <xsl:param name="background-color" select="./style/background-color"/>
    <xsl:param name="bgcolor" select="../bgcolor"/>
    <xsl:param name="readonly" select="./readonly"/>
    <xsl:param name="title" select="./title"/>

     <div id="{$name}">
       <xsl:attribute name="onmousedown">event.cancelBubble='true';figure_click(this)</xsl:attribute>
       <xsl:attribute name="name">
         <xsl:value-of select="$name"/>
       </xsl:attribute>
       <xsl:attribute name="value">
         <xsl:value-of select="./value"/>
       </xsl:attribute>
       <xsl:attribute name="style">
          position:absolute;
          top:<xsl:value-of select="$top"/>;
          left:<xsl:value-of select="$left"/>;
          width:<xsl:value-of select="$width"/>;
          height:<xsl:value-of select="$height"/>;
          z-index:100;
       </xsl:attribute>
       <xsl:attribute name="readonly">
        <xsl:value-of select="readonly"/>
       </xsl:attribute>
       <xsl:attribute name="title">
         <xsl:value-of select="$title"/>
       </xsl:attribute>
       <!-- draw the border start -->
       <xsl:call-template name="border">
         <xsl:with-param name="name" select="$name"/>
         <xsl:with-param name="width" select="$width"/>
         <xsl:with-param name="height" select="$height"/>
       </xsl:call-template>
       <!-- draw the border end -->
       <div>
          <xsl:attribute name="style">
            position:absolute;top:0;left:0;
            width:<xsl:value-of select="$width + 5"/>;
            height:<xsl:value-of select="$height + 5"/>;
            <xsl:call-template name="filter-readonly">
              <xsl:with-param name="readonly" select="$readonly" />
            </xsl:call-template>                              
          </xsl:attribute>              
       <v:group>
         <!--xsl:attribute name="id">
           <xsl:value-of select="$name"/>
         </xsl:attribute-->
         <xsl:attribute name="style">
            position:absolute;top:0;left:0;
            width:<xsl:value-of select="$width"/>;
            height:<xsl:value-of select="$height"/>;
         </xsl:attribute>
         <xsl:attribute name="coordsize">
           <xsl:value-of select="$width"/>,<xsl:value-of select="$height"/>
         </xsl:attribute>

         <v:rect>
           <xsl:attribute name="style">
              width:<xsl:value-of select="$width"/>;
              height:<xsl:value-of select="$height"/>;
              border:<xsl:value-of select="$border"/>
                     <xsl:value-of select="$border-color"/>
                     <xsl:value-of select="$border-width"/>;
           </xsl:attribute>
           <xsl:attribute name="strokecolor">
             <xsl:value-of select="$border-color"/>
           </xsl:attribute>
           <xsl:if test="$background-color = 'transparent'">
             <xsl:attribute name="filled">false</xsl:attribute>
           </xsl:if>
           <xsl:if test="$background-color">
             <xsl:attribute name="fillcolor">
                <xsl:value-of select="$background-color"/>
             </xsl:attribute>
           </xsl:if>
         </v:rect>
         
         <v:rect>
            <xsl:attribute name="style">
               position:absolute;
               left:<xsl:value-of select="$width - $height"/>;
               top:1;
               bottom:1;
               width:<xsl:value-of select="$height - 2"/>;
               height:<xsl:value-of select="$height - 2"/>;
            </xsl:attribute>
            <xsl:attribute name="strokecolor">
              #DCDCDC
            </xsl:attribute>
            <xsl:attribute name="fillcolor">
              #DCDCDC
            </xsl:attribute>
         </v:rect>
         
         <v:rect>
            <xsl:attribute name="style">
               position:absolute;
               left:<xsl:value-of select="$width - $height + 1"/>;
               top:2;
               width:<xsl:value-of select="$height - 3"/>;
               height:<xsl:value-of select="$height - 4"/>;
            </xsl:attribute>
            <xsl:attribute name="strokecolor">
              inactivecaption
            </xsl:attribute>
            <xsl:attribute name="fillcolor">
              inactivecaption
            </xsl:attribute>
         </v:rect>
         
         <v:rect>
            <xsl:attribute name="style">
               position:absolute;
               left:<xsl:value-of select="$width - $height + 1"/>;
               top:2;
               width:<xsl:value-of select="$height - 4"/>;
               height:<xsl:value-of select="$height - 5"/>;
            </xsl:attribute>
            <xsl:attribute name="strokecolor">
              #FFFFFF
            </xsl:attribute>
            <xsl:attribute name="fillcolor">
              #FFFFFF
            </xsl:attribute>
         </v:rect>
         <v:rect>
            <xsl:attribute name="style">
               position:absolute;
               left:<xsl:value-of select="$width - $height + 2"/>;
               top:3;
               width:<xsl:value-of select="$height - 5"/>;
               height:<xsl:value-of select="$height - 6"/>;
            </xsl:attribute>
            <xsl:attribute name="strokecolor">
              buttonface
            </xsl:attribute>
            <xsl:attribute name="fillcolor">
              buttonface
            </xsl:attribute>
         </v:rect>
         
         <v:shapetype id="arrowDown" coordsize="6 6">
            <v:path v="m 0,0 l 3,6,6,0,0,0 x e" />
         </v:shapetype>
         <v:shape fillcolor="#000000" type="#arrowDown">
           <xsl:variable name="left1" select="$width - $height + 1"/>
           <xsl:variable name="height1" select="($height - 2)"/>
           <xsl:attribute name="style">
             postion:absolute;
             left:<xsl:value-of select="$left1 + ($height - 2)* 0.2"/>;
             top :<xsl:value-of select="2 + ($height - 2)* 0.3"/>;
             width:<xsl:value-of select="$height1 * 0.6"/>;
             height:<xsl:value-of select="$height1 * 0.4"/>;
           </xsl:attribute>
         </v:shape>
       </v:group>
       </div>
      </div>
  </xsl:template>
  <!-- combobox end -->
  
  <!-- calendar start -->
  <xsl:template name="calendar">
    <xsl:param name="name" select="./name"/>
    <xsl:param name="width" select="./style/width"/>
    <xsl:param name="height" select="./style/height"/>
    <xsl:param name="left" select="./position/left"/>
    <xsl:param name="top" select="./position/top"/>
    <xsl:param name="border" select="./style/border"/>
    <xsl:param name="font-family" select="./style/font-family"/>
    <xsl:param name="font-size" select="./style/font-size"/>
    <xsl:param name="color" select="./style/color"/>
    <xsl:param name="value" select="./value"/>
    <xsl:param name="title" select="./title"/>
    <xsl:param name="border-color" select="./style/border-color"/>
    <xsl:param name="border-width" select="./style/border-width"/>
    <xsl:param name="border-left" select="./style/border-left"/>
    <xsl:param name="border-top" select="./style/border-top"/>
    <xsl:param name="border-right" select="./style/border-right"/>
    <xsl:param name="border-bottom" select="./style/border-bottom"/>
    <xsl:param name="value" select="./value"/>
    <xsl:param name="background-color" select="./style/background-color"/>
    <xsl:param name="readonly" select="./readonly"/>
    <xsl:param name="bgcolor" select="../bgcolor"/>
    <xsl:param name="privilege"/>

     <div id="{$name}">
       <xsl:if test="$privilege != 'noprivilege'">
         <xsl:attribute name="onmousedown">event.cancelBubble='true';figure_click(this)</xsl:attribute>
       </xsl:if>
       <xsl:attribute name="name">
         <xsl:value-of select="$name"/>
       </xsl:attribute>
       <xsl:attribute name="value">
         <xsl:value-of select="./value"/>
       </xsl:attribute>
       <xsl:attribute name="style">
          position:absolute;
          top:<xsl:value-of select="$top"/>;
          left:<xsl:value-of select="$left"/>;
          width:<xsl:value-of select="$width"/>;
          height:<xsl:value-of select="$height"/>;
          z-index:100;
       </xsl:attribute>
       <xsl:attribute name="readonly">
        <xsl:value-of select="readonly"/>
       </xsl:attribute>
       
       <!-- draw the border start -->
       <xsl:call-template name="border">
         <xsl:with-param name="name" select="$name"/>
         <xsl:with-param name="width" select="$width"/>
         <xsl:with-param name="height" select="$height"/>
       </xsl:call-template>
       <!-- draw the border end -->
       <div>
          <xsl:attribute name="style">
            position:absolute;top:0;left:0;
            width:<xsl:value-of select="$width + 5"/>;
            height:<xsl:value-of select="$height + 5"/>;
            <xsl:call-template name="filter-readonly">
              <xsl:with-param name="readonly" select="$readonly" />
            </xsl:call-template>            
          </xsl:attribute>       
       <v:group>
         <!--xsl:attribute name="id">
           <xsl:value-of select="$name"/>
         </xsl:attribute-->
         <xsl:attribute name="style">
            position:absolute;top:0;left:0;
            width:<xsl:value-of select="$width"/>;
            height:<xsl:value-of select="$height"/>;
         </xsl:attribute>
         <xsl:attribute name="coordsize">
           <xsl:value-of select="$width"/>,<xsl:value-of select="$height"/>
         </xsl:attribute>
         <xsl:call-template name="textrect">
            <xsl:with-param name="width" select="$width - $height - 1"/>
            <xsl:with-param name="height" select="$height - 1"/>
            <xsl:with-param name="title" select="$title"/>
            <xsl:with-param name="border" select="$border"/>
            <xsl:with-param name="border-left" select="$border-left"/>
            <xsl:with-param name="border-width" select="$border-width"/>
            <xsl:with-param name="border-right" select="$border-right"/>
            <xsl:with-param name="border-top" select="$border-top"/>
            <xsl:with-param name="border-bottom" select="$border-bottom"/>
            <xsl:with-param name="border-color" select="$border-color"/>
            <xsl:with-param name="background-color" select="$background-color"/>
            <xsl:with-param name="bgcolor" select="$bgcolor"/>
         </xsl:call-template>
     <!-- set value  -->
    <xsl:if test="$value !=''">
    <table>
         <xsl:attribute name="style">
               position:absolute;
               width:<xsl:value-of select="$width - $height - 1"/>;
               height:<xsl:value-of select="$height"/>;
               font-family:<xsl:value-of select="$font-family"/>;
               font-size:<xsl:value-of select="concat($font-size,$fontUnit)"/>;
               color:<xsl:value-of select="$color"/>;
               text-overflow:ellipsis;
         </xsl:attribute>
         <tr>
           <td>
            <nobr>
             <xsl:attribute name="style">
               overflow:hidden;
               text-overflow:ellipsis;
               width:<xsl:value-of select="$width - $height - 1"/>
             </xsl:attribute>
              <xsl:if test="string-length($value) = 0">
               &#160;
              </xsl:if>
              <xsl:value-of select="$value"/>
            </nobr>
           </td>
         </tr>
       </table>
       </xsl:if>
<!-- set value end -->
<!-- img background -->
         <v:rect fillcolor="buttonface" strokecolor="buttonface">
                <xsl:attribute name="style">
                 position:absolute;
                 left:<xsl:value-of select="$width - $height+2"/>;
                 top:1;
                 width:<xsl:value-of select="$height - 2"/>;
                 height:<xsl:value-of select="$height - 2"/>;
               </xsl:attribute>
               </v:rect>
            <!-- draw K start -->
             <v:line from="{$width - $height},0" to="{$width - 1},0" strokecolor="#ffffff"/>
             <v:line from="{$width - $height},0" to="{$width - $height},{$height - 1}" strokecolor="#ffffff"/>
             <v:line from="{$width},0" to="{$width},{$height}" strokecolor="black"/>
             <v:line from="{$width - $height},{$height}" to="{$width},{$height}" strokecolor="black"/>
             <v:line from="{$width - 1},1" to="{$width - 1},{$height - 1}" strokecolor="#645A5A"/>
             <v:line from="{$width - $height + 1},{$height - 1}" to="{$width - 1},{$height - 1}" strokecolor="#645A5A"/>
            <!-- draw K end -->
         <!-- img background end -->
       </v:group>
       <table>
         <xsl:attribute name="style">
              position:absolute;
              left:<xsl:value-of select="$width - $height +1 "/>;
              width:<xsl:value-of select="$height"/>;
              height:<xsl:value-of select="$height - 2"/>;
              text-align:center;
           </xsl:attribute>
           <tr>
             <td>
               <img src="css/images/calendar.gif"></img>
             </td>
           </tr>
       </table>
      </div>
     </div>
  </xsl:template>
  <!-- calendar end -->
  
  <!-- list start -->
  <xsl:template name="list">
    <xsl:call-template name="text"/>
  </xsl:template>
  <!-- list end -->
  
  <!-- file start -->
  <xsl:template name="file">
    <xsl:param name="name" select="./name"/>
    <xsl:param name="width" select="./style/width"/>
    <xsl:param name="height" select="./style/height"/>
    <xsl:param name="left" select="./position/left"/>
    <xsl:param name="top" select="./position/top"/>
    <xsl:param name="border" select="./style/border"/>
    <xsl:param name="font-family" select="./style/font-family"/>
    <xsl:param name="font-size" select="./style/font-size"/>
    <xsl:param name="font-style" select="./style/font-style"/>
    <xsl:param name="font-weight" select="./style/font-weight"/>
    <xsl:param name="color" select="./style/color"/>
    <xsl:param name="value" select="./value"/>
    <xsl:param name="border-color" select="./style/border-color"/>
    <xsl:param name="border-width" select="./style/border-width"/>
    <xsl:param name="value" select="./value"/>
    <xsl:param name="background-color" select="./style/background-color"/>
    <xsl:param name="readonly" select="./readonly"/>
    <xsl:param name="text-align" select="./style/text-align"/>

     <div id="{$name}">
       <xsl:attribute name="onmousedown">event.cancelBubble='true';figure_click(this)</xsl:attribute>
       <xsl:attribute name="name">
         <xsl:value-of select="$name"/>
       </xsl:attribute>
       <xsl:attribute name="value">
         <xsl:value-of select="./value"/>
       </xsl:attribute>
       <xsl:attribute name="style">
          position:absolute;
          top:<xsl:value-of select="$top"/>;
          left:<xsl:value-of select="$left"/>;
          width:<xsl:value-of select="$width"/>;
          height:<xsl:value-of select="$height"/>;
          z-index:100;
       </xsl:attribute>
       <xsl:attribute name="readonly">
        <xsl:value-of select="$readonly"/>
       </xsl:attribute>
       
       <!-- draw the border start -->
       <xsl:call-template name="border">
         <xsl:with-param name="name" select="$name"/>
         <xsl:with-param name="width" select="$width"/>
         <xsl:with-param name="height" select="$height"/>
       </xsl:call-template>
       <!-- draw the border end -->
       <div>
          <xsl:attribute name="style">
            position:absolute;top:0;left:0;
            width:<xsl:value-of select="$width + 5"/>;
            height:<xsl:value-of select="$height + 5"/>;
            <xsl:call-template name="filter-readonly">
              <xsl:with-param name="readonly" select="$readonly" />
            </xsl:call-template>                              
          </xsl:attribute>                     
       <v:group>
         <xsl:attribute name="style">
            position:absolute;top:0;left:0;
            width:<xsl:value-of select="$width"/>;
            height:<xsl:value-of select="$height"/>;
         </xsl:attribute>
         <xsl:attribute name="coordsize">
           <xsl:value-of select="$width"/>,<xsl:value-of select="$height"/>
         </xsl:attribute>

         <v:rect>
           <xsl:attribute name="style">
              width:<xsl:value-of select="$width * 0.65"/>;
              height:<xsl:value-of select="$height"/>;
              border:<xsl:value-of select="$border"/>
                     <xsl:value-of select="$border-color"/>
                     <xsl:value-of select="$border-width"/>;
           </xsl:attribute>
           <xsl:attribute name="strokecolor">
             <xsl:value-of select="$border-color"/>
           </xsl:attribute>
           <xsl:if test="$background-color = 'transparent'">
             <xsl:attribute name="filled">false</xsl:attribute>
           </xsl:if>
           <xsl:if test="$background-color!=''">
             <xsl:attribute name="fillcolor">
               <xsl:value-of select="$background-color"/>
             </xsl:attribute>
           </xsl:if>
         </v:rect>
         <v:rect>
           <xsl:attribute name="style">
              position:absolute;
              left:<xsl:value-of select="$width * 0.66"/>;
              width:<xsl:value-of select="$width * 0.32"/>;
              height:<xsl:value-of select="$height"/>;
              border:<xsl:value-of select="$border"/>
                     <xsl:value-of select="$border-color"/>
                     <xsl:value-of select="$border-width"/>;
           </xsl:attribute>
           <xsl:attribute name="strokecolor">
             <xsl:value-of select="$border-color"/>
           </xsl:attribute>
           <xsl:attribute name="fillcolor">buttonface</xsl:attribute>

         </v:rect>
       </v:group>
     <span>
      <xsl:attribute name="style">
        position:absolute;
        left:<xsl:value-of select="$width * 0.66"/>;
        width:<xsl:value-of select="$width * 0.32"/>;
        height:<xsl:value-of select="$height"/>;
      </xsl:attribute>
         <nobr>
          <xsl:attribute name="style">
             width:<xsl:value-of select="$width * 0.32"/>;
             height:<xsl:value-of select="$height"/>;
             line-height:<xsl:value-of select="$height"/>px;
             overflow:hidden;
             text-overflow:ellipsis;
             text-align:center;
             font-size:<xsl:value-of select="concat($font-size,$fontUnit)"/>;
             font-family:<xsl:value-of select="$font-family"/>;
             font-style:<xsl:value-of select="$font-style"/>;
             font-weight:<xsl:value-of select="$font-weight"/>;
          </xsl:attribute>
            濠电姷鏁搁崑娑㈡偤閵娧勬殰妞ゅ繐鐗嗙粻顖炴煟閹达絽袚闁绘挶鍎甸弻锝夊即閻愯鎷烽崷顓ㄦ嫹濮樼偓瀚�..
          </nobr>
     </span>
      </div>
    </div>
  </xsl:template>
  <!-- file end -->
  
  <!-- appendtable start -->
  <xsl:template name="appendtable">
    <xsl:param name="name" select="./name"/>
    <xsl:param name="headerheight" select="./headerheight"/>
    <xsl:param name="headerfont" select="./headerfont"/>
    <xsl:param name="headerbackground" select="./headerbackground"/>
    <xsl:param name="headerforeground" select="./headerforeground"/>
    <xsl:param name="rowheight" select="./rowheight"/>
    <xsl:param name="left" select="./position/left"/>
    <xsl:param name="top" select="./position/top"/>
    <xsl:param name="width" select="./style/width"/>    
    <xsl:param name="height" select="./style/height"/>
    <xsl:param name="font-size" select="./style/font-size"/>
    <xsl:param name="font-family" select="./style/font-mamily"/>
    <xsl:param name="background-color" select="./style/background-color"/>
    <xsl:param name="readonly" select="./readonly"/>
    
    <div id="{$name}">
      <xsl:attribute name="onmousedown">event.cancelBubble='true';figure_click(this)</xsl:attribute>
      <xsl:attribute name="name">
        <xsl:value-of select="$name"/>
      </xsl:attribute>
      <xsl:if test="readonly!=''">
        <xsl:attribute name="readonly">
           <xsl:value-of select="$readonly" />
        </xsl:attribute>
      </xsl:if>
      <xsl:attribute name="style">
        position:absolute;
        z-index:100;
        top:<xsl:value-of select="$top"/>;
        left:<xsl:value-of select="$left"/>;
        width:<xsl:value-of select="$width"/>;
        height:<xsl:value-of select="$height"/>;
      </xsl:attribute>
       <!-- draw the border start -->
       <xsl:call-template name="border">
         <xsl:with-param name="name" select="$name"/>
         <xsl:with-param name="width" select="$width"/>
         <xsl:with-param name="height" select="$height"/>
       </xsl:call-template>
       <!-- draw the border end -->
       <div>
          <xsl:attribute name="style">
            position:absolute;top:0;left:0;
            width:<xsl:value-of select="$width"/>;
            height:<xsl:value-of select="$height"/>;
            <xsl:call-template name="filter-readonly">
              <xsl:with-param name="readonly" select="$readonly" />
            </xsl:call-template>
          </xsl:attribute>       
       <table>
         <xsl:attribute name="style">
           position:absolute;
           font-size:<xsl:value-of select="concat($font-size,$fontUnit)"/>;
           font-family:<xsl:value-of select="$font-family"/>;
           width:100%;
           height:<xsl:value-of select="$height"/>;
           border-collapse:collapse;
           border:none;
           padding:0;
         </xsl:attribute>
         <xsl:attribute name="border">
          1
         </xsl:attribute>
         <xsl:attribute name="bordercolor">
          #000000
         </xsl:attribute>
         <xsl:attribute name="cellpadding">0</xsl:attribute>
         <xsl:attribute name="cellspacing">0</xsl:attribute>
         <xsl:attribute name="width">
          100%
         </xsl:attribute>
         <xsl:attribute name="height">
           <xsl:value-of select="$height"/>
         </xsl:attribute>
         <tr>
           <xsl:attribute name="width">
            <xsl:value-of select="$width"/>
           </xsl:attribute>
           <xsl:attribute name="height">
             <xsl:value-of select="$headerheight"/>
           </xsl:attribute>
           <xsl:attribute name="style">
               text-align:center;
               align:center;
               color:<xsl:value-of select="$headerforeground"/>;
               background-color:<xsl:value-of select="$headerbackground"/>;
             <xsl:call-template name="parse-font">
               <xsl:with-param name="form-define-font" select="$headerfont"/>
             </xsl:call-template>               
             </xsl:attribute>
           <td>
             <xsl:variable name="indexcolumnname" select="./indexcolumn/name"/>
             <xsl:variable name="indexcolumnwidth" select="./indexcolumn/width"/>
             <xsl:variable name="indexcolumnleft" select="./indexcolumn/position/left"/>
             <xsl:variable name="indexcolumntop" select="./indexcolumn/position/top"/>
             <xsl:attribute name="onmousedown">event.cancelBubble='true';figure_click(this)</xsl:attribute>
             <xsl:attribute name="name">
              <xsl:value-of select="$indexcolumnname"/>
             </xsl:attribute>
             <xsl:attribute name="width">
               <xsl:value-of select="$indexcolumnwidth"/>
             </xsl:attribute>
             <xsl:attribute name="height">
               <xsl:value-of select="$headerheight"/>
             </xsl:attribute>
             <xsl:attribute name="style">
               left:<xsl:value-of select="$indexcolumnleft"/>;
               top:<xsl:value-of select="$indexcolumntop"/>;
               width:<xsl:value-of select="$indexcolumnwidth"/>;
            </xsl:attribute>
             <!-- draw the border start 
             <xsl:call-template name="appendtableborder">
             <xsl:with-param name="name" select="$indexcolumnname"/>
             <xsl:with-param name="width" select="$indexcolumnwidth"/>
             <xsl:with-param name="height" select="$headerheight"/>
             <xsl:with-param name="left" select="$indexcolumnleft"/>
             <xsl:with-param name="top" select="$indexcolumntop"/>
             </xsl:call-template>
               draw the border end -->
             <xsl:value-of select="./indexcolumn/displayname"/>
           </td>
           <xsl:for-each select="./gridcolumn">
             <td>
              <xsl:attribute name="onmousedown">event.cancelBubble='true';figure_click(this)</xsl:attribute>
               <xsl:attribute name="name">
                 <xsl:value-of select="./name"/>
               </xsl:attribute>
               <xsl:attribute name="width">
                 <xsl:value-of select="./width"/>
               </xsl:attribute>
              <!-- draw the border start   
               <xsl:call-template name="appendtableborder">
               <xsl:with-param name="name" select="./name"/>
               <xsl:with-param name="width" select="./width"/>
               <xsl:with-param name="height" select="$headerheight"/>
               <xsl:with-param name="left" select="./position/left"/>
               <xsl:with-param name="top" select="./position/top"/>
               </xsl:call-template>
                draw the border end -->
              <nobr>
               <xsl:attribute name="style">
                 width:<xsl:value-of select="./width"/>;
                 align:center;
                 text-align:center;
                 overflow:hidden;
                 text-overflow:ellipsis;
                  <xsl:call-template name="parse-font">
                     <xsl:with-param name="form-define-font" select="$headerfont"/>
                 </xsl:call-template>
               </xsl:attribute>
               <xsl:value-of select="./displayname"/>
               </nobr>
             </td>
           </xsl:for-each>
         </tr>
         <tr>
           <xsl:attribute name="height">
             <xsl:value-of select="$rowheight"/>
           </xsl:attribute>
           <xsl:attribute name="style">
              background-color:<xsl:value-of select="$background-color"/>;
           </xsl:attribute>
             <td>
             &#160;
             </td>
           <xsl:for-each select="./gridcolumn">
             <td>&#160;</td>
           </xsl:for-each>
         </tr>
         <tr>
           <xsl:attribute name="style">
              background-color:<xsl:value-of select="$background-color"/>;
           </xsl:attribute>
           <td>&#160;</td>
           <xsl:for-each select="./gridcolumn">
            <td>&#160;</td>
           </xsl:for-each>
         </tr>
       </table>
      </div>
     </div>
  </xsl:template>
  <!-- appendtable end -->
  
  <!-- appendtableborder start -->          
     
     <xsl:template name="appendtableborder">
     <xsl:param name="name"/>
     <xsl:param name="width"/>
     <xsl:param name="height"/>
     <xsl:param name="left"/>
     <xsl:param name="top"/>
       <v:group>
        <xsl:attribute name="style">
            position:absolute;
            top:<xsl:value-of select="$top"/>;
            left:<xsl:value-of select="$left"/>;
            z-index:2008;display:none;
            width:<xsl:value-of select="$width"/>;
            height:<xsl:value-of select="$height"/>;
         </xsl:attribute>
         <xsl:attribute name="name">border_<xsl:value-of select="$name"/></xsl:attribute>
         <xsl:attribute name="coordsize">
           <xsl:value-of select="$width"/>,<xsl:value-of select="$height"/>
         </xsl:attribute>
         <v:rect>
           <xsl:attribute name="style">
              position:absolute;
              width:5;
              height:5;
              left:-2.5;
              top:-2.5;
           </xsl:attribute>
           <xsl:attribute name="strokecolor">#000000</xsl:attribute>
           <xsl:attribute name="fillcolor">#DCDCDC</xsl:attribute>
         </v:rect>
         <v:rect>
           <xsl:attribute name="style">
              position:absolute;
              width:5;
              height:5;
              left:<xsl:value-of select="$width div 2 - 2.5"/>;
              top:-2.5;
           </xsl:attribute>
           <xsl:attribute name="strokecolor">#000000</xsl:attribute>
           <xsl:attribute name="fillcolor">#DCDCDC</xsl:attribute>
         </v:rect>
         <v:rect>
           <xsl:attribute name="style">
              position:absolute;
              width:5;
              height:5;
              left:<xsl:value-of select="$width - 2.5"/>;
              top:-2.5;
           </xsl:attribute>
           <xsl:attribute name="strokecolor">#000000</xsl:attribute>
           <xsl:attribute name="fillcolor">#DCDCDC</xsl:attribute>
         </v:rect>
         
         <v:rect>
           <xsl:attribute name="style">
              position:absolute;
              width:5;
              height:5;
              left:-2.5;
              top:<xsl:value-of select="$height div 2 - 2.5"/>;
           </xsl:attribute>
           <xsl:attribute name="strokecolor">#000000</xsl:attribute>
           <xsl:attribute name="fillcolor">#DCDCDC</xsl:attribute>
         </v:rect>
         
         <v:rect>
           <xsl:attribute name="style">
              position:absolute;
              width:5;
              height:5;
              left:-2.5;
              top:<xsl:value-of select="$height - 2.5"/>;
           </xsl:attribute>
           <xsl:attribute name="strokecolor">#000000</xsl:attribute>
           <xsl:attribute name="fillcolor">#DCDCDC</xsl:attribute>
         </v:rect>
         
         <v:rect>
           <xsl:attribute name="style">
              position:absolute;
              width:5;
              height:5;
              left:<xsl:value-of select="$width div 2 - 2.5"/>;
              top:<xsl:value-of select="$height - 2.5"/>;
           </xsl:attribute>
           <xsl:attribute name="strokecolor">#000000</xsl:attribute>
           <xsl:attribute name="fillcolor">#DCDCDC</xsl:attribute>
         </v:rect>
         
         <v:rect>
           <xsl:attribute name="style">
              position:absolute;
              width:5;
              height:5;
              left:<xsl:value-of select="$width - 2.5"/>;
              top:<xsl:value-of select="$height - 2.5"/>;
           </xsl:attribute>
           <xsl:attribute name="strokecolor">#000000</xsl:attribute>
           <xsl:attribute name="fillcolor">#DCDCDC</xsl:attribute>
         </v:rect>
         
         <v:rect>
           <xsl:attribute name="style">
              position:absolute;
              width:5;
              height:5;
              left:<xsl:value-of select="$width - 2.5"/>;
              top:<xsl:value-of select="$height div 2 - 2.5"/>;
           </xsl:attribute>
           <xsl:attribute name="strokecolor">#000000</xsl:attribute>
           <xsl:attribute name="fillcolor">#DCDCDC</xsl:attribute>
         </v:rect>
        </v:group>
   </xsl:template>
   
   <!-- appendtableborder end -->   

  <!-- rect start -->
  <xsl:template name="rect">
    <xsl:param name="name" select="./name"/>
    <xsl:param name="top" select="./position/top"/>
    <xsl:param name="left" select="./position/left"/>
    <xsl:param name="width" select="./style/width"/>
    <xsl:param name="height" select="./style/height"/>
    <xsl:param name="border" select="./style/border"/>
    <xsl:param name="border-width" select="./style/border-width"/>
    <xsl:param name="border-color" select="./style/border-color"/>
    <xsl:param name="fillcolor"/>

    <div id="{$name}">
       <xsl:attribute name="onmousedown">event.cancelBubble='true'</xsl:attribute>
       <xsl:attribute name="name">
         <xsl:value-of select="$name"/>
       </xsl:attribute>
       <xsl:attribute name="style">
          position:absolute;
          top:<xsl:value-of select="$top"/>;
          left:<xsl:value-of select="$left"/>;
          width:<xsl:value-of select="$width"/>;
          height:<xsl:value-of select="$height"/>;
          z-index:20;
       </xsl:attribute>
       <!-- draw the border start -->
       <!-- xsl:call-template name="border">
         <xsl:with-param name="name" select="$name"/>
         <xsl:with-param name="width" select="$width"/>
         <xsl:with-param name="height" select="$height"/>
       </xsl:call-template -->
       <!-- draw the border end -->              
       <v:group>

         <xsl:attribute name="style">
            position:absolute;top:0;left:0;
            width:<xsl:value-of select="$width"/>;
            height:<xsl:value-of select="$height"/>;
         </xsl:attribute>
         <xsl:attribute name="coordsize">
           <xsl:value-of select="$width"/>,<xsl:value-of select="$height"/>
         </xsl:attribute>
         <!-- v:PolyLine filled="false" Points ="0,0 {$width},0 {$width},{$height} 0,{$height} 0,0" / -->
         <v:rect>
           <xsl:attribute name="style">
              width:<xsl:value-of select="$width"/>;
              height:<xsl:value-of select="$height"/>;
           </xsl:attribute>
           <xsl:attribute name="strokecolor">
             <xsl:value-of select="$border-color"/>
           </xsl:attribute>
           <xsl:attribute name="strokeweight">
             <xsl:value-of select="$border-width"/>
           </xsl:attribute>
           <xsl:choose>
             <xsl:when test="$fillcolor">
               <xsl:attribute name="fillcolor">
                 <xsl:value-of select="$fillcolor"/>
               </xsl:attribute>
             </xsl:when>
             <xsl:otherwise>
               <xsl:attribute name="filled">false</xsl:attribute>
             </xsl:otherwise>
           </xsl:choose>
         </v:rect>
       </v:group>
     </div>
  </xsl:template>
  <!-- rect end -->
  
  <!-- datagrid start -->
  <xsl:template name="datagrid">
    <xsl:param name="name" select="./name"/>
    <xsl:param name="datasource" select="./datasource"/>
    <xsl:param name="expressions" select="./expressions"/>
    <xsl:param name="pagesize" select="./pagesize"/>
    <xsl:param name="headerheight" select="./headerheight"/>
    <xsl:param name="headerfont" select="./headerfont"/>
    <xsl:param name="headerbackground" select="./headerbackground"/>
    <xsl:param name="headerforeground" select="./headerforeground"/>
    <xsl:param name="rowheight" select="./rowheight"/>
    <xsl:param name="rowaccess" select="./rowaccess"/>
    <xsl:param name="datahandler" select="./datahandler"/>
    <xsl:param name="left" select="./position/left"/>
    <xsl:param name="top" select="./position/top"/>
    <xsl:param name="width" select="./style/width"/>
    <xsl:param name="height" select="./style/height"/>
    <xsl:param name="font-family" select="./style/font-family"/>
    <xsl:param name="font-size" select="./style/font-size"/>
    <xsl:param name="indexcolumnName" select="./indexcolumn/name"/>
    <xsl:param name="background-color" select="./style/background-color"/>
    <xsl:param name="columns" select="count(./bindedcolumn)"/>
    <xsl:param name="readonly" select="./readonly" />
     <div id="{$name}">
       <xsl:attribute name="onmousedown">event.cancelBubble='true';figure_click(this)</xsl:attribute>
       <xsl:attribute name="name">
         <xsl:value-of select="$name"/>
       </xsl:attribute>
       <xsl:attribute name="id">
         <xsl:value-of select="$name"/>
       </xsl:attribute>
       <xsl:attribute name="figuretype">datagrid</xsl:attribute>
       <xsl:attribute name="style">
          position:absolute;
          top:<xsl:value-of select="$top"/>;
          left:<xsl:value-of select="$left"/>;
          width:<xsl:value-of select="$width"/>;
          height:<xsl:value-of select="$height"/>;
          z-index:101;
       </xsl:attribute>
       <!-- draw the border start -->
       <xsl:call-template name="border">
         <xsl:with-param name="name" select="$name"/>
         <xsl:with-param name="width" select="$width"/>
         <xsl:with-param name="height" select="$height"/>
       </xsl:call-template>
       <!-- draw the border end -->
       <div>
          <xsl:attribute name="style">
            position:absolute;top:0;left:0;
            width:<xsl:value-of select="$width + 5"/>;
            height:<xsl:value-of select="$height + 5"/>;
            <xsl:call-template name="filter-readonly">
              <xsl:with-param name="readonly" select="$readonly" />
            </xsl:call-template>                       
          </xsl:attribute>              
       <xsl:choose>
         <xsl:when test="not($indexcolumnName)">
             <xsl:call-template name="table-rect">
               <xsl:with-param name="left" select="0"/>
               <xsl:with-param name="top" select="0"/>
               <xsl:with-param name="width" select="$width"/>
               <xsl:with-param name="height" select="$height"/>
               <xsl:with-param name="fillcolor" select="$background-color"/>
             </xsl:call-template>
         </xsl:when>
       <xsl:otherwise>
         <xsl:variable name="indexcolumnname" select="./indexcolumn/name"/>
         <xsl:variable name="indexcolumnleft" select="./indexcolumn/position/left"/>
         <xsl:variable name="indexcolumntop" select="./indexcolumn/position/top"/>
         <xsl:variable name="indexcolumnwidth" select="./indexcolumn/width"/>
        <!-- draw table start -->
         <xsl:if test="./indexcolumn/visible != 'false'">
           <xsl:call-template name="table-rect">
              <xsl:with-param name="left" select="$indexcolumnleft"/>
              <xsl:with-param name="top" select="$indexcolumntop"/>
              <xsl:with-param name="width" select="$indexcolumnwidth"/>
              <xsl:with-param name="height" select="$headerheight"/>
              <xsl:with-param name="fillcolor" select="$headerbackground"/>
           </xsl:call-template>
           <span>
              <!-- xsl:attribute name="onmousedown">event.cancelBubble='true';figure_click(this)</xsl:attribute -->
                 <xsl:attribute name="name">
                   <xsl:value-of select="$indexcolumnname"/>
                 </xsl:attribute>
                 <xsl:attribute name="style">
                    position:absolute;
                    text-align:center;
                    left:<xsl:value-of select="$indexcolumnleft"/>;
                    top:<xsl:value-of select="$indexcolumntop"/>;
                    width:<xsl:value-of select="$indexcolumnwidth"/>;
                    height:<xsl:value-of select="$headerheight"/>;
                    line-height:<xsl:value-of select="$headerheight"/>px;
                    z-index:100;
                    color:<xsl:value-of select="$headerforeground"/>;
                    overflow:hidden;
                    text-overflow:ellipsis;
                 </xsl:attribute>
                <!-- draw the border start>
                 <xsl:call-template name="groupborder">
                  <xsl:with-param name="name" select="$indexcolumnname"/>
                  <xsl:with-param name="width" select="$indexcolumnwidth"/>
                  <xsl:with-param name="height" select="$headerheight"/>
                 </xsl:call-template>
                draw the border end -->
               <nobr>
               <xsl:attribute name="style">
                 width:<xsl:value-of select="./width"/>;
                 height:<xsl:value-of select="$headerheight"/>;
                 line-height:<xsl:value-of select="$headerheight"/>px;                 
                 align:center;
                 text-align:center;
                 overflow:hidden;
                 text-overflow:ellipsis;
                 <xsl:call-template name="parse-font">
                     <xsl:with-param name="form-define-font" select="$headerfont"/>
                 </xsl:call-template>
                 </xsl:attribute>
                  <xsl:if test="./indexcolumn/displayname = ''">
                   <xsl:value-of select="' '"/>
                </xsl:if>
                 <xsl:value-of select="./indexcolumn/displayname"/>
               </nobr>
           </span>
          </xsl:if> 
           <xsl:for-each select="./bindedcolumn">
              <xsl:if test="./visible != 'false'">
              <xsl:call-template name="table-rect">
                <xsl:with-param name="left" select="./position/left"/>
                <xsl:with-param name="top" select="./position/top"/>
                <xsl:with-param name="width" select="./width"/>
                <xsl:with-param name="height" select="$headerheight"/>
                <xsl:with-param name="fillcolor" select="$headerbackground"/>
              </xsl:call-template>
              <span>
                <!--xsl:attribute name="onmousedown">event.cancelBubble='true';figure_click(this)</xsl:attribute-->
                <xsl:attribute name="name">
                   <xsl:value-of select="./name"/>
                </xsl:attribute>
                <xsl:attribute name="style">
                    position:absolute;
                    text-align:center;
                    left:<xsl:value-of select="./position/left"/>;
                    top:<xsl:value-of select="./position/top"/>;
                    width:<xsl:value-of select="./width"/>;
                    height:<xsl:value-of select="$headerheight"/>;
                    line-height:<xsl:value-of select="$headerheight"/>px;
                    z-index:100;
                    color:<xsl:value-of select="$headerforeground"/>;
                    overflow:hidden;
                    text-overflow:ellipsis;
                 <xsl:call-template name="parse-font">
                     <xsl:with-param name="form-define-font" select="$headerfont"/>
                 </xsl:call-template>
                </xsl:attribute>
                <xsl:if test="./displayname = ''">
                   <xsl:value-of select="' '"/>
                </xsl:if>
                <xsl:value-of select="./displayname"/>
                <!-- draw the border start 
                 <xsl:call-template name="groupborder">
                  <xsl:with-param name="name" select="./name"/>
                  <xsl:with-param name="width" select="./width"/>
                  <xsl:with-param name="height" select="$headerheight"/>
                 </xsl:call-template>
                draw the border end -->                        
           </span>
           </xsl:if>
          </xsl:for-each>
          
          <!-- draw exprcolumn header start -->
           <xsl:for-each select="./exprcolumn">
              <xsl:call-template name="table-rect">
                <xsl:with-param name="left" select="./position/left"/>
                <xsl:with-param name="top" select="./position/top"/>
                <xsl:with-param name="width" select="./width"/>
                <xsl:with-param name="height" select="$headerheight"/>
                <xsl:with-param name="fillcolor" select="$background-color"/>
              </xsl:call-template>
              <span>
                <xsl:attribute name="name">
                   <xsl:value-of select="./name"/>
                </xsl:attribute>
                <xsl:attribute name="style">
                    position:absolute;
                    text-align:center;
                    left:<xsl:value-of select="./position/left"/>;
                    top:<xsl:value-of select="./position/top"/>;
                    width:<xsl:value-of select="./width"/>;
                    height:<xsl:value-of select="$headerheight"/>;
                    line-height:<xsl:value-of select="$headerheight"/>px;
                    z-index:100;
                    color:<xsl:value-of select="$headerforeground"/>;
                    overflow:hidden;
                    text-overflow:ellipsis;
                 <xsl:call-template name="parse-font">
                     <xsl:with-param name="form-define-font" select="$headerfont"/>
                 </xsl:call-template>
                </xsl:attribute>
                 <xsl:if test="./displayname = ''">
                   <xsl:value-of select="' '"/>
                </xsl:if>
                <xsl:value-of select="./displayname"/>
           </span>
          </xsl:for-each>          
          <!-- draw exprcolumn header end -->
          
           <xsl:call-template name="table-rect">
              <xsl:with-param name="left" select="$indexcolumnleft"/>
              <xsl:with-param name="top" select="$headerheight + 1"/>
              <xsl:with-param name="width" select="$indexcolumnwidth"/>
              <xsl:with-param name="height" select="$rowheight"/>
              <xsl:with-param name="fillcolor" select="$background-color"/>
           </xsl:call-template>
           <xsl:for-each select="./bindedcolumn">
             <xsl:if test="./visible != 'false'">
              <xsl:call-template name="table-rect">
                <xsl:with-param name="left" select="./position/left"/>
                <xsl:with-param name="top" select="$headerheight + 1"/>
                <xsl:with-param name="width" select="./width"/>
                <xsl:with-param name="height" select="$rowheight"/>
                <xsl:with-param name="fillcolor" select="$background-color"/>
              </xsl:call-template>
             </xsl:if>
           </xsl:for-each>
          <!-- draw exprcolumn start -->
          <xsl:for-each select="./exprcolumn">
              <xsl:call-template name="table-rect">
                <xsl:with-param name="left" select="./position/left"/>
                <xsl:with-param name="top" select="$headerheight + 1"/>
                <xsl:with-param name="width" select="./width"/>
                <xsl:with-param name="height" select="$rowheight"/>
                <xsl:with-param name="fillcolor" select="$background-color"/>
              </xsl:call-template>
          </xsl:for-each>           
          <!-- draw exprcolumn end -->
           <xsl:call-template name="table-rect">
              <xsl:with-param name="left" select="$indexcolumnleft"/>
              <xsl:with-param name="top" select="$headerheight+$rowheight"/>
              <xsl:with-param name="width" select="$indexcolumnwidth"/>
                <xsl:with-param name="height">
                <xsl:choose>
                  <xsl:when test="./foottable">
                     <xsl:value-of select="$height - ($headerheight+$rowheight) - ./foottable/style/height"/>
                  </xsl:when>
                  <xsl:otherwise>
                     <xsl:value-of select="$height - ($headerheight+$rowheight)"/>
                  </xsl:otherwise>
                </xsl:choose>
                </xsl:with-param>
              <xsl:with-param name="fillcolor" select="$background-color"/>              
           </xsl:call-template>
            <xsl:for-each select="./bindedcolumn">
              <xsl:if test="./visible != 'false'">
              <xsl:call-template name="table-rect">
                <xsl:with-param name="left" select="./position/left"/>
                <xsl:with-param name="top" select="$headerheight+$rowheight"/>
                <xsl:with-param name="width" select="./width"/>
                <xsl:with-param name="height">
                <xsl:choose>
                  <xsl:when test="../foottable">
                     <xsl:value-of select="$height - ($headerheight+$rowheight) - ../foottable/style/height"/>
                  </xsl:when>
                  <xsl:otherwise>
                     <xsl:value-of select="$height - ($headerheight+$rowheight)"/>
                  </xsl:otherwise>
                </xsl:choose>
                </xsl:with-param>
                <xsl:with-param name="fillcolor" select="$background-color"/>                
              </xsl:call-template>
             </xsl:if>
           </xsl:for-each>
          <xsl:for-each select="./exprcolumn">
              <xsl:call-template name="table-rect">
                <xsl:with-param name="left" select="./position/left"/>
                <xsl:with-param name="top" select="$headerheight+$rowheight"/>
                <xsl:with-param name="width" select="./width"/>
                <xsl:with-param name="height">
                <xsl:choose>
                  <xsl:when test="../foottable">
                     <xsl:value-of select="$height - ($headerheight+$rowheight) - ../foottable/style/height"/>
                  </xsl:when>
                  <xsl:otherwise>
                     <xsl:value-of select="$height - ($headerheight+$rowheight)"/>
                  </xsl:otherwise>
                </xsl:choose>
                </xsl:with-param>
                <xsl:with-param name="fillcolor" select="$background-color"/>
              </xsl:call-template>
          </xsl:for-each>
          
          <!-- draw foottable start -->
          <xsl:if test="./foottable">
            <xsl:for-each select="./foottable">
               <xsl:call-template name="table" />
                <!-- 
                 <xsl:with-param name="background-color">
                  <xsl:choose>
                    <xsl:when test="./style/background-color = 'transparent' and not($background-color)">#FFFFFF</xsl:when>                  
                    <xsl:when test="./style/background-color = 'transparent'">
                      <xsl:value-of select="$background-color"/>
                    </xsl:when>
                    <xsl:otherwise>
                      <xsl:value-of select="./style/background-color"/>
                    </xsl:otherwise>
                  </xsl:choose>
                 </xsl:with-param>
                 <xsl:with-param name="width" select="$width + 1"/>
              </xsl:call-template>
              -->
            </xsl:for-each>
          </xsl:if>                     
          <!-- draw foottable end -->
        <!-- draw table end -->
       </xsl:otherwise>
       </xsl:choose>
       </div>
     </div>
     <xsl:for-each select="./bindedcolumn/*">
       <xsl:if test="./visible != 'false'">
         <xsl:variable name="left1" select="../position/left"/>
         <xsl:variable name="top1" select="../position/top"/>
         <xsl:call-template name="testKN">
           <xsl:with-param name="left" select="number($left1) + number($left)"/>
           <xsl:with-param name="top" select="$top1 + $top"/>
           <xsl:with-param name="privilege">noprivilege</xsl:with-param>
         </xsl:call-template>
       </xsl:if>
     </xsl:for-each>
  </xsl:template>
  <!-- datagrid end -->
  
  <!-- table-rect start -->
    <xsl:template name="table-rect">
      <xsl:param name="left"/>
      <xsl:param name="top"/>
      <xsl:param name="width"/>
      <xsl:param name="height"/>
      <xsl:param name="fillcolor"/>
      <v:group>
         <xsl:attribute name="style">
            position:absolute;
            top:<xsl:value-of select="$top"/>;
            left:<xsl:value-of select="$left"/>;
            width:<xsl:value-of select="$width"/>;
            height:<xsl:value-of select="$height"/>;
         </xsl:attribute>
         <xsl:attribute name="coordsize">
           <xsl:value-of select="$width"/>,<xsl:value-of select="$height"/>
         </xsl:attribute>
         <v:rect>
           <xsl:attribute name="style">
              width:<xsl:value-of select="$width"/>;
              height:<xsl:value-of select="$height"/>;
           </xsl:attribute>
           <xsl:if test="$fillcolor = 'transparent'">
             <xsl:attribute name="filled">false</xsl:attribute>
           </xsl:if>
           <xsl:if test="$fillcolor">
             <xsl:attribute name="fillcolor">
               <xsl:value-of select="$fillcolor"/>
             </xsl:attribute>
           </xsl:if>
         </v:rect>
       </v:group>
    </xsl:template>
  <!-- table-rect end -->
  
  <!-- radio-group start -->
    <xsl:template name="radio-group">
       <xsl:param name="name" select="./name"/>
       <xsl:param name="left" select="./position/left"/>
       <xsl:param name="top" select="./position/top"/>
       <xsl:param name="width" select="./style/width"/>
       <xsl:param name="height" select="./style/height"/>
       
      <xsl:for-each select="./radio">
        <xsl:variable name="rleft" select="./position/left"/>
        <xsl:variable name="rtop" select="./position/top"/>
        <xsl:call-template name="radio">
          <xsl:with-param name="left" select="$left + $rleft"/>
          <xsl:with-param name="top" select="$top + $rtop"/>
        </xsl:call-template>
     </xsl:for-each>
      <div>
       <xsl:attribute name="onmousedown">event.cancelBubble='true';figure_click(this)</xsl:attribute>
       <xsl:attribute name="name">
         <xsl:value-of select="$name"/>
       </xsl:attribute>
       <xsl:attribute name="style">
          position:absolute;
          top:<xsl:value-of select="$top"/>;
          left:<xsl:value-of select="$left"/>;
          width:<xsl:value-of select="$width"/>;
          height:<xsl:value-of select="$height"/>;
          z-index:100;
       </xsl:attribute>
       <xsl:attribute name="readonly">true</xsl:attribute>
       <!-- draw the border start -->
       <xsl:call-template name="groupborder">
         <xsl:with-param name="name" select="$name"/>
         <xsl:with-param name="width" select="$width"/>
         <xsl:with-param name="height" select="$height"/>
       </xsl:call-template>
       <!-- draw the border end -->
     </div>
    </xsl:template>  
  <!-- radio-group end -->
  
  <!-- group start  -->
  
  <xsl:template name="group">
    <xsl:param name="name" select="./name"/>
    <xsl:param name="left" select="./position/left"/>
    <xsl:param name="top" select="./position/top"/>
    <xsl:param name="width" select="./style/width"/>
    <xsl:param name="height" select="./style/height"/>
    <div id="{$name}">
       <xsl:attribute name="onmousedown">event.cancelBubble='true';figure_click(this)</xsl:attribute>
       <xsl:attribute name="name">
         <xsl:value-of select="$name"/>
       </xsl:attribute>
       <xsl:attribute name="style">
          position:absolute;
          top:<xsl:value-of select="$top"/>;
          left:<xsl:value-of select="$left"/>;
          width:<xsl:value-of select="$width"/>;
          height:<xsl:value-of select="$height"/>;
          z-index:100;
       </xsl:attribute>
       <xsl:attribute name="readonly">true</xsl:attribute>
       <!-- draw the border start -->
       <xsl:call-template name="groupborder">
         <xsl:with-param name="name" select="$name"/>
         <xsl:with-param name="width" select="$width"/>
         <xsl:with-param name="height" select="$height"/>
       </xsl:call-template>
       <!-- draw the border end -->
       <v:group>
         <xsl:attribute name="style">
            position:absolute;top:0;left:0;
            width:<xsl:value-of select="$width"/>;
            height:<xsl:value-of select="$height"/>;
         </xsl:attribute>
         <xsl:attribute name="coordsize">
           <xsl:value-of select="$width"/>,<xsl:value-of select="$height"/>
         </xsl:attribute>
       </v:group>
     </div>
     <xsl:for-each select="./*">
        <xsl:variable name="rleft" select="./position/left"/>
        <xsl:variable name="rtop" select="./position/top"/>
        <xsl:call-template name="testKN">
          <xsl:with-param name="left" select="$left"/>
          <xsl:with-param name="top" select="$top"/>
     </xsl:call-template>
     </xsl:for-each>
  </xsl:template>
  <!-- group end  -->
  
  <!-- paragraph start-->

  <xsl:template name="paragraph">
   <xsl:param name="name" select="./name"/>
   <xsl:param name="width" select="./style/width"/>
   <xsl:param name="height" select="./style/height"/>
   <xsl:param name="left" select="./position/left"/>
   <xsl:param name="top" select="./position/top"/>
   <xsl:param name="border" select="./style/border"/>
   <xsl:param name="font-family" select="./style/font-family"/>
   <xsl:param name="font-size" select="./style/font-size"/>
   <xsl:param name="color" select="./style/color"/>
   <xsl:param name="value" select="./value"/>
   <xsl:param name="border-color" select="./style/border-color"/>
   <xsl:param name="border-width" select="./style/border-width"/>
   <xsl:param name="value" select="./value"/>
   <xsl:param name="background-color" select="./style/background-color"/>
   <xsl:param name="text-align" select="./style/text-align"/>
   <xsl:param name="title" select="./title"/>
   <xsl:param name="readonly" select="./readonly"/>
   <xsl:param name="font-style" select="./style/font-style"/>
   <xsl:param name="font-weight" select="./style/font-weight"/>
   <xsl:param name="bgcolor" select="../bgcolor"/>
   <xsl:param name="text-valign" select="./valign"/>

     <div id="{$name}">
     <span type="paragraph" id="{$name}" value="{$value}">
       <table border="0">
          <xsl:attribute name="style">
             overflow:hidden;
             text-overflow:ellipsis;
             position:absolute;
             left:<xsl:value-of select="$left"/>;
             top:<xsl:value-of select="$top"/>;
             width:<xsl:value-of select="$width"/>;
             height:<xsl:value-of select="$height"/>;
             font-family:<xsl:value-of select="$font-family"/>;             
             font-size:<xsl:value-of select="concat($font-size,$fontUnit)"/>;
             font-weight:<xsl:value-of select="$font-weight"/>;
             font-style:<xsl:value-of select="$font-style"/>;
             color:<xsl:value-of select="$color"/>;
             word-wrap:break-word;
             text-align:<xsl:value-of select="$text-align"/>;
             background-color:<xsl:value-of select="$background-color"/>;  
             <xsl:choose>
	           <xsl:when test="$border = 'none'">
	            border-style:none;
	           </xsl:when>
	           <xsl:when test="not($border)">
	           	border-style:inset;
	           </xsl:when>
	           <xsl:when test="$border = 'bottom'">
	            border-style:bottom;
	            border-left:<xsl:value-of select="./style/border-left"/>;
	          	border-right:<xsl:value-of select="./style/border-right"/>;
	          	border-top:<xsl:value-of select="./style/border-top"/>;
	          	border-bottom:<xsl:value-of select="./style/border-bottom"/>;
	          	border-color:<xsl:value-of select="./style/border-color"/>;
	           </xsl:when>
	           <xsl:when test="$border = 'solid'">
                border-style:solid;
	            border-width:<xsl:value-of select="./style/border-width"/>;
	          	border-color:<xsl:value-of select="./style/border-color"/>;
	           </xsl:when>
	           <xsl:otherwise>
	           </xsl:otherwise>
	         </xsl:choose>
          </xsl:attribute>
          <tr>
          <td valign="{$text-valign}" align="{$text-align}">
          	 <!--xsl:value-of select="regexp:replace($value,'\n','g','&lt;br/&gt;')"/-->
         	 <xsl:variable name="temp" select="translate($value,' ','&#160;')"/> 
         	 <xsl:call-template name="paragraphValue">
          		<xsl:with-param name="value"><xsl:value-of select="$temp"/></xsl:with-param>
        	 </xsl:call-template>
          </td>
          </tr>
       </table>
     </span>  
     </div>
  </xsl:template>
  <!-- paragraph end -->
  <!-- paragraphValue start -->
  <xsl:template name="paragraphValue">
    <xsl:param name="value"/>
    <xsl:if test="string-length($value) &gt; 0">
      <xsl:choose>
      <xsl:when test="contains($value,'&#10;')">
      <xsl:value-of select="substring-before($value,'&#10;')"/><br/>
      <xsl:call-template name="paragraphValue">
        <xsl:with-param name="value" select="substring-after($value,'&#10;')"/>
      </xsl:call-template>
      </xsl:when>
      <xsl:otherwise>
       <xsl:value-of select="$value"/>
      </xsl:otherwise>
      </xsl:choose>
    </xsl:if>
  </xsl:template>
  <!-- paragraphValue end -->
  
  <!-- append start -->
  <xsl:template name="append">
    <xsl:param name="name" select="./name"/>
    <xsl:param name="left" select="./position/left"/>
    <xsl:param name="top" select="./position/top"/>
    <xsl:param name="height" select="./height"/>
    <xsl:param name="width" select="./style/width"/>
    <xsl:param name="font-size" select="./style/font-size"/>
    <xsl:param name="font-family" select="./style/font-family"/>
    <xsl:param name="font-style" select="./style/font-style"/>
    <xsl:param name="font-weight" select="./style/font-weight"/>
    <xsl:param name="seperate" select="./seperate"/>
    <xsl:param name="border" select="./style/border"/>
    <xsl:param name="border-width" select="./style/border-width"/>
    <xsl:param name="border-color" select="./style/border-color"/>
    <xsl:param name="background-color" select="./style/background-color"/>
    <xsl:param name="readonly" select="./readonly"/>
    <xsl:param name="value" select="./value"/>
    <xsl:param name="color" select="./style/color"/>
    
    <div id="{$name}">
       <xsl:attribute name="onmousedown">event.cancelBubble='true';figure_click(this)</xsl:attribute>
         <xsl:attribute name="name">
           <xsl:value-of select="$name"/>
         </xsl:attribute>
         <xsl:attribute name="style">
           position:absolute;
           top:<xsl:value-of select="$top"/>;
           left:<xsl:value-of select="$left"/>;
           width:<xsl:value-of select="$width"/>;
           height:<xsl:value-of select="$height"/>;
           z-index:100;
         </xsl:attribute>
       <xsl:attribute name="readonly">
          <xsl:value-of select="$readonly"/>
       </xsl:attribute>
       
       <!-- draw the border start -->
       <xsl:call-template name="border">
         <xsl:with-param name="name" select="$name"/>
         <xsl:with-param name="width" select="$width"/>
         <xsl:with-param name="height" select="$height"/>
       </xsl:call-template>
       <!-- draw the border end -->     
       <v:rect>
         <xsl:attribute name="style">
           position:absolute;
           width:<xsl:value-of select="$width"/>;
           height:<xsl:value-of select="$seperate"/>;
           border:none;
           border-bottom-style:none;
           border-bottom:none;
         </xsl:attribute>
         <xsl:attribute name="fillcolor">#D3D3D3</xsl:attribute>
        <v:textbox>
         <xsl:attribute name="style">
           font-size:<xsl:value-of select="concat($font-size,$fontUnit)"/>;
           font-family:<xsl:value-of select="$font-family"/>;
           font-style:<xsl:value-of select="$font-style"/>;
           font-weight:<xsl:value-of select="$font-weight"/>;
           color:<xsl:value-of select="$color"/>
         </xsl:attribute>
         <xsl:value-of select="$value"/>
        </v:textbox>
       </v:rect>
       <v:rect>
         <xsl:attribute name="style">
          position:absolute;
          top:<xsl:value-of select="$seperate"/>;
          width:<xsl:value-of select="$width"/>;
          height:<xsl:value-of select="$height - $seperate"/>;
          border:none;
          border-top-style:none;
          border-bottom:none;
         </xsl:attribute>
         <xsl:attribute name="fillcolor">
         <xsl:choose>
          <xsl:when test="not($background-color)">
           #FFFFFF
          </xsl:when>
          <xsl:otherwise>
          <xsl:value-of select="$background-color"/>
          </xsl:otherwise>
         </xsl:choose>
         </xsl:attribute>
         <v:textbox>
           <xsl:attribute name="style">
             font-size:<xsl:value-of select="concat($font-size,$fontUnit)"/>;
             font-family:<xsl:value-of select="$font-family"/>;
             font-style:<xsl:value-of select="$font-style"/>;
             font-weight:<xsl:value-of select="$font-weight"/>;
             color:<xsl:value-of select="$color"/>
           </xsl:attribute>
           婵犵绱曢崑娑橈耿闁单澶婎煥閸繃杈堝┑鐐叉閸旀垿宕戦敐澶嬬厵闁诡垎鍛喖闂佸摜鍠庣紞濠囧蓟閵堝洦鍠嗛柛鏇ㄥ幖瀵劌鈹戦悙宸闁瑰嚖鎷�
         </v:textbox>
       </v:rect>
    </div>
    
  </xsl:template>
  <!-- append end -->
  
  <!--  datatree start-->
  <xsl:template name="datatree">
    <xsl:param name="name" select="./name"/>
    <xsl:param name="width" select="./style/width"/>
    <xsl:param name="height" select="./style/height"/>
    <xsl:param name="left" select="./position/left"/>
    <xsl:param name="top" select="./position/top"/>
    <xsl:param name="border" select="./style/border"/>
    <xsl:param name="font-family" select="./style/font-family"/>
    <xsl:param name="font-size" select="./style/font-size"/>
    <xsl:param name="color" select="./style/color"/>
    <xsl:param name="value" select="./value"/>
    <xsl:param name="border-color" select="./style/border-color"/>
    <xsl:param name="border-width" select="./style/border-width"/>
    <xsl:param name="border-top" select="./style/border-top"/>
    <xsl:param name="border-right" select="./style/border-right"/>
    <xsl:param name="border-bottom" select="./style/border-bottom"/>
    <xsl:param name="border-left" select="./style/border-left"/>
    <xsl:param name="value" select="./value"/>
    <xsl:param name="title" select="./title"/>
    <xsl:param name="background-color" select="./style/background-color"/>
    <xsl:param name="bgcolor" select="../bgcolor"/>
    <xsl:param name="readonly" select="./readonly"/>

     <div id="{$name}">
       <xsl:attribute name="onmousedown">event.cancelBubble='true';figure_click(this)</xsl:attribute>
       <xsl:attribute name="name">
         <xsl:value-of select="$name"/>
       </xsl:attribute>
       <xsl:attribute name="value">
         <xsl:value-of select="./value"/>
       </xsl:attribute>
       <xsl:attribute name="style">
          position:absolute;
          top:<xsl:value-of select="$top"/>;
          left:<xsl:value-of select="$left"/>;
          width:<xsl:value-of select="$width"/>;
          height:<xsl:value-of select="$height"/>;
          z-index:100;
       </xsl:attribute>
       <xsl:attribute name="readonly">
        <xsl:value-of select="$readonly"/>
       </xsl:attribute>
       
       <!-- draw the border start -->
       <xsl:call-template name="border">
         <xsl:with-param name="name" select="$name"/>
         <xsl:with-param name="width" select="$width"/>
         <xsl:with-param name="height" select="$height"/>
       </xsl:call-template>
       <!-- draw the border end -->
       <div>
          <xsl:attribute name="style">
            position:absolute;top:0;left:0;
            width:<xsl:value-of select="$width + 5"/>;
            height:<xsl:value-of select="$height + 5"/>;
            <xsl:call-template name="filter-readonly">
              <xsl:with-param name="readonly" select="$readonly" />
            </xsl:call-template>            
          </xsl:attribute>            
       <v:group>
         <xsl:attribute name="style">
            position:absolute;top:0;left:0;
            width:<xsl:value-of select="$width"/>;
            height:<xsl:value-of select="$height"/>;
         </xsl:attribute>
         <xsl:attribute name="coordsize">
           <xsl:value-of select="$width"/>,<xsl:value-of select="$height"/>
         </xsl:attribute>

         <xsl:call-template name="textrect">
            <xsl:with-param name="width" select="$width - $height - 2"/>
            <xsl:with-param name="height" select="$height - 1"/>
            <xsl:with-param name="title" select="$title"/>
            <xsl:with-param name="border" select="$border"/>
            <xsl:with-param name="border-left" select="$border-left"/>
            <xsl:with-param name="border-width" select="$border-width"/>
            <xsl:with-param name="border-right" select="$border-right"/>
            <xsl:with-param name="border-top" select="$border-top"/>
            <xsl:with-param name="border-bottom" select="$border-bottom"/>
            <xsl:with-param name="border-color" select="$border-color"/>
            <xsl:with-param name="background-color" select="$background-color"/>
            <xsl:with-param name="bgcolor" select="$bgcolor"/>
         </xsl:call-template>
         <!-- draw background start-->
              <v:rect fillcolor="buttonface" strokecolor="buttonface">
                <xsl:attribute name="style">
                 position:absolute;
                 left:<xsl:value-of select="$width - $height"/>;
                 top:1;
                 width:<xsl:value-of select="$height - 2"/>;
                 height:<xsl:value-of select="$height - 2"/>;
               </xsl:attribute>
               </v:rect>
            <!-- draw K start -->
             <v:line from="{$width - $height},0" to="{$width - 1},0" strokecolor="#ffffff"/>
             <v:line from="{$width - $height},0" to="{$width - $height},{$height - 1}" strokecolor="#ffffff"/>
             <v:line from="{$width},0" to="{$width},{$height}" strokecolor="black"/>
             <v:line from="{$width - $height},{$height}" to="{$width},{$height}" strokecolor="black"/>
             <v:line from="{$width - 1},1" to="{$width - 1},{$height - 1}" strokecolor="#645A5A"/>
             <v:line from="{$width - $height + 1},{$height - 1}" to="{$width - 1},{$height - 1}" strokecolor="#645A5A"/>
            <!-- draw K end -->
         <!-- draw background end-->
         <table>
         <xsl:attribute name="style">
              position:absolute;
              left:<xsl:value-of select="$width - $height"/>;
              width:<xsl:value-of select="$height"/>;
              height:<xsl:value-of select="$height"/>;
              text-align:center;
           </xsl:attribute>
           <tr>
             <td>
               <img src="css/images/datatree.gif"></img>
             </td>
           </tr>
       </table>
       </v:group>
    </div>
   </div>
  </xsl:template>
  <!-- datatree end -->
    
  <!-- image start -->
   <xsl:template name="img">
    <xsl:param name="name" select="./name"/>
    <xsl:param name="src" select="./src"/>
    <xsl:param name="left" select="./position/left"/>
    <xsl:param name="top" select="./position/top"/>
    <xsl:param name="width" select="./style/width"/>
    <xsl:param name="height" select="./style/height"/>
    <xsl:param name="title" select="./alt"/>
     
     <div id="{$name}">
       <xsl:attribute name="onmousedown">event.cancelBubble='true';figure_click(this);</xsl:attribute>
       
       <xsl:attribute name="name">
         <xsl:value-of select="$name"/>
       </xsl:attribute>
       <xsl:attribute name="style">
          position:absolute;
          top:<xsl:value-of select="$top"/>;
          left:<xsl:value-of select="$left"/>;
          width:<xsl:value-of select="$width"/>;
          height:<xsl:value-of select="$height"/>;
          z-index:100;
       </xsl:attribute>
       <xsl:attribute name="title">
        <xsl:value-of select="$title"/>
       </xsl:attribute>
       <!-- draw the border start -->
       <xsl:call-template name="border">
         <xsl:with-param name="name" select="$name"/>
         <xsl:with-param name="width" select="$width"/>
         <xsl:with-param name="height" select="$height"/>
       </xsl:call-template>
       <!-- draw the border end --> 
       <div>
          <xsl:attribute name="style">
            filter:alpha(opacity:100);
            position:absolute;top:0;left:0;
            width:<xsl:value-of select="$width + 5"/>;
            height:<xsl:value-of select="$height + 5"/>;          
                      
          </xsl:attribute>       
       <v:group>
         <xsl:attribute name="style">
            position:absolute;top:0;left:0;
            width:<xsl:value-of select="$width"/>;
            height:<xsl:value-of select="$height"/>;
         </xsl:attribute>
         <xsl:attribute name="coordsize">
           <xsl:value-of select="$width"/>,<xsl:value-of select="$height"/>
         </xsl:attribute>

       </v:group> 

       <v:image>
         <xsl:attribute name="src">
           <xsl:value-of select="$servletPicPath"/>?src=<xsl:value-of select="$src"/>&amp;formID=<xsl:value-of select="$formID"/>
         </xsl:attribute>
         <xsl:attribute name="style">
            position:absolute;
            width:<xsl:value-of select="$width"/>;
            height:<xsl:value-of select="$height"/>;
         </xsl:attribute>
       </v:image>
     </div>
    </div> 
    
  </xsl:template>
  <!-- image end -->
  
   <!-- undefined start -->
   <xsl:template name="undefined">
    <xsl:param name="name" select="./name"/>
    <xsl:param name="left" select="./position/left"/>
    <xsl:param name="top" select="./position/top"/>
    <xsl:param name="width" select="./style/width"/>
    <xsl:param name="height" select="./style/height"/>
    <xsl:param name="readonly" select="./readonly" />
    
     <div id="{$name}">
       <xsl:attribute name="onmousedown">event.cancelBubble='true';figure_click(this)</xsl:attribute>
       <xsl:attribute name="name">
         <xsl:value-of select="$name"/>
       </xsl:attribute>
       <xsl:attribute name="style">
          position:absolute;
          top:<xsl:value-of select="$top"/>;
          left:<xsl:value-of select="$left"/>;
          width:<xsl:value-of select="$width"/>;
          height:<xsl:value-of select="$height"/>;
          z-index:100;
       </xsl:attribute>
       <!-- draw the border start -->
       <xsl:call-template name="border">
         <xsl:with-param name="name" select="$name"/>
         <xsl:with-param name="width" select="$width"/>
         <xsl:with-param name="height" select="$height"/>
       </xsl:call-template>
       <!-- draw the border end -->
      <div>
          <xsl:attribute name="style">
            position:absolute;top:0;left:0;
            width:<xsl:value-of select="$width + 5"/>;
            height:<xsl:value-of select="$height + 5"/>;
            <xsl:call-template name="filter-readonly">
              <xsl:with-param name="readonly" select="$readonly" />
            </xsl:call-template>                       
          </xsl:attribute>              
       <v:group>
         <xsl:attribute name="style">
            position:absolute;top:0;left:0;
            width:<xsl:value-of select="$width"/>;
            height:<xsl:value-of select="$height"/>;
         </xsl:attribute>
         <xsl:attribute name="coordsize">
           <xsl:value-of select="$width"/>,<xsl:value-of select="$height"/>
         </xsl:attribute>
         <!-- v:PolyLine filled="false" Points ="0,0 {$width},0 {$width},{$height} 0,{$height} 0,0" / -->
         <v:rect>
           <xsl:attribute name="style">
              width:<xsl:value-of select="$width"/>;
              height:<xsl:value-of select="$height"/>;
           </xsl:attribute>
           <xsl:attribute name="strokecolor">#000000</xsl:attribute>
           <xsl:attribute name="strokeweight">1pt</xsl:attribute>
           <xsl:attribute name="fillcolor">#ffffff</xsl:attribute>
           <xsl:attribute name="filled">true</xsl:attribute>
         </v:rect>
       </v:group>      
     </div>
    </div>
  </xsl:template>
  <!-- undefined end -->
  
  <!-- no border model start -->
  <xsl:template name="drawnoborder">
  <xsl:param name="width"/>
  <xsl:param name="height"/>
  <xsl:param name="background-color"/>
             <xsl:choose>
                <xsl:when test="$background-color='' or not($background-color)">
                  <v:rect fillcolor="#ffffff">
                    <xsl:attribute name="style">
                    position:absolute;
                    left:1;
                    top:1;
                    width:<xsl:value-of select="$width - 2"/>;
                    height:<xsl:value-of select="$height - 2"/>;
                   </xsl:attribute>
                  </v:rect>
                </xsl:when>
                <xsl:when test="$background-color='transparent'">
                </xsl:when>                
                <xsl:otherwise>
                  <v:rect fillcolor="{$background-color}">
                <xsl:attribute name="style">
                 position:absolute;
                 left:1;
                 top:1;
                 width:<xsl:value-of select="$width - 2"/>;
                 height:<xsl:value-of select="$height - 2"/>;
               </xsl:attribute>
             </v:rect>
                </xsl:otherwise>
             </xsl:choose>
             
            <!-- draw K start -->
             <v:line from="0,0" to="{$width - 1},0" strokecolor="gray"/>
             <v:line from="0,0" to="0,{$height - 1}" strokecolor="gray"/>
             <v:line from="1,1" to="{$width - 2},1" strokecolor="black"/>
             <v:line from="1,1" to="1,{$height - 2}" strokecolor="black"/>
             <v:line from="{$width - 2},1" to="{$width - 2},{$height - 2}" strokecolor="#D3D3D3"/>
             <v:line from="1,{$height - 2}" to="{$width - 2},{$height - 2}" strokecolor="#D3D3D3"/>
             <v:line from="{$width - 1},0" to="{$width - 1},{$height - 1}" strokecolor="#ffffff"/>
             <v:line from="0,{$height - 1}" to="{$width - 1},{$height - 1}" strokecolor="#ffffff"/>
            <!-- draw K end -->
  </xsl:template>
  <!-- no border model end -->
  	<xsl:template name="testK">
       <xsl:for-each select="./*">
           <xsl:choose>
             <xsl:when test="name(.) = 'text'">
                <xsl:call-template name="text"/>
             </xsl:when>
             <xsl:when test="name(.)='radio'">
               <xsl:call-template name="radio"/>
             </xsl:when>
             <xsl:when test="name(.)='checkbox'">
               <xsl:call-template name="checkbox"/>
             </xsl:when>
             <xsl:when test="name(.)='password'">
               <xsl:call-template name="password"/>
             </xsl:when>
             <xsl:when test="name(.)='hline'">
               <xsl:call-template name="hline"/>
             </xsl:when>
             <xsl:when test="name(.)='vline'">
              <xsl:call-template name="vline"/>
             </xsl:when>
             <xsl:when test="name(.)='label'">
               <xsl:call-template name="label"/>
             </xsl:when>
             <xsl:when test="name(.)='button'">
              <xsl:call-template name="button"/>
             </xsl:when>
             <xsl:when test="name(.)='submit'">
              <xsl:call-template name="button"/>
             </xsl:when>
             <xsl:when test="name(.)='reset'">
              <xsl:call-template name="button"/>
             </xsl:when>
             <xsl:when test="name(.)='anchor'">
               <xsl:call-template name="anchor"/>
             </xsl:when>
             <xsl:when test="name(.)='table'">
              <xsl:call-template name="table"/>
             </xsl:when>
             <xsl:when test="name(.)='textarea'">
              <xsl:call-template name="textarea"/>
             </xsl:when>
             <xsl:when test="name(.)='combobox'">
              <xsl:call-template name="combobox"/>
             </xsl:when>
             <xsl:when test="name(.)='calendar'">
              <xsl:call-template name="calendar"/>
             </xsl:when>
             <xsl:when test="name(.)='list'">
              <xsl:call-template name="list"/>
             </xsl:when>
             <xsl:when test="name(.)='file'">
              <xsl:call-template name="file"/>
             </xsl:when>
             <xsl:when test="name(.)='appendtable'">
              <xsl:call-template name="appendtable"/>
             </xsl:when>
             <xsl:when test="name(.)='rect'">
              <xsl:call-template name="rect"/>
             </xsl:when>
             <xsl:when test="name(.)='datagrid'">
              <xsl:call-template name="datagrid"/>
             </xsl:when>
             <xsl:when test="name(.)='radio-group'">
              <xsl:call-template name="radio-group"/>
             </xsl:when>
             <xsl:when test="name(.)='group'">
               <xsl:call-template name="group"/>
             </xsl:when>
              <xsl:when test="name(.)='paragraph'">
              <xsl:call-template name="paragraph"/>
             </xsl:when>
              <xsl:when test="name(.)='append'">
              <xsl:call-template name="append"/>
             </xsl:when>
             <xsl:when test="name(.)='datatree'">
              <xsl:call-template name="datatree"/>
             </xsl:when>
              <xsl:when test="name(.)='img'">
                <xsl:call-template name="img"/>
             </xsl:when>
             <xsl:when test="name(.)='hidden'">
             </xsl:when>
             <xsl:otherwise>
               <xsl:call-template name="undefined"/>
             </xsl:otherwise>
           </xsl:choose>
        </xsl:for-each>
   </xsl:template>
  
  <!-- testKN start -->
  <xsl:template name="testKN">
    <xsl:param name="left"/>
    <xsl:param name="top"/>
    <xsl:param name="bgcolor"/>
    <xsl:param name="privilege"/>
    <xsl:choose>
           <xsl:when test="name(.)='text'">
              <xsl:variable name="left1" select="./position/left"/>
              <xsl:variable name="top1" select="./position/top"/>
              <xsl:call-template name="text">
                <xsl:with-param name="left">
                  <xsl:value-of select="number($left) + number($left1)"/>
                </xsl:with-param>
                <xsl:with-param name="top">
                  <xsl:value-of select="number($top) + number($top1)"/>
                </xsl:with-param>
                <xsl:with-param name="privilege" select="$privilege"/>
                <xsl:with-param name="bgcolor" select="$bgcolor" />
              </xsl:call-template>
            </xsl:when>
            
            <xsl:when test="name(.)='radio'">
              <xsl:variable name="left1" select="./position/left"/>
              <xsl:variable name="top1" select="./position/top"/>
              <xsl:call-template name="radio">
                <xsl:with-param name="left">
                  <xsl:value-of select="number($left)+number($left1)"/>
                </xsl:with-param>
                <xsl:with-param name="top">
                  <xsl:value-of select="number($top)+number($top1)"/>
                </xsl:with-param>
                <xsl:with-param name="privilege" select="$privilege"/>
              </xsl:call-template>
            </xsl:when>
            
            <xsl:when test="name(.)='table'">
              <xsl:variable name="left1" select="./position/left"/>
              <xsl:variable name="top1" select="./position/top"/>
              <xsl:call-template name="table">
                <xsl:with-param name="left">
                  <xsl:value-of select="number($left)+number($left1)"/>
                </xsl:with-param>
                <xsl:with-param name="top">
                  <xsl:value-of select="number($top)+number($top1)"/>
                </xsl:with-param>
                <xsl:with-param name="bgcolor" select="$bgcolor"/>
              </xsl:call-template>
            </xsl:when>
            
            <xsl:when test="name(.)='checkbox'">
              <xsl:variable name="left1" select="./position/left"/>
              <xsl:variable name="top1" select="./position/top"/>
              <xsl:call-template name="checkbox">
                <xsl:with-param name="left">
                  <xsl:value-of select="number($left)+number($left1)"/>
                </xsl:with-param>
                <xsl:with-param name="top">
                  <xsl:value-of select="number($top)+number($top1)"/>
                </xsl:with-param>
              </xsl:call-template>
            </xsl:when>
            
             
            
            <xsl:when test="name(.)='label'">
              <xsl:variable name="left1" select="./position/left"/>
              <xsl:variable name="top1" select="./position/top"/>
              <xsl:call-template name="label">
                <xsl:with-param name="left">
                  <xsl:value-of select="number($left)+number($left1)"/>
                </xsl:with-param>
                <xsl:with-param name="top">
                  <xsl:value-of select="number($top)+number($top1)"/>
                </xsl:with-param>
              </xsl:call-template>
            </xsl:when>
            
           
            
            <xsl:when test="name(.)='hline'">
              <xsl:variable name="left1" select="./position/left"/>
              <xsl:variable name="top1" select="./position/top"/>
              <xsl:call-template name="hline">
                <xsl:with-param name="left">
                  <xsl:value-of select="number($left)+number($left1)"/>
                </xsl:with-param>
                <xsl:with-param name="top">
                  <xsl:value-of select="number($top)+number($top1)"/>
                </xsl:with-param>
              </xsl:call-template>
            </xsl:when>
            
            <xsl:when test="name(.)='vline'">
              <xsl:variable name="left1" select="./position/left"/>
              <xsl:variable name="top1" select="./position/top"/>
              <xsl:call-template name="vline">
                <xsl:with-param name="left">
                  <xsl:value-of select="number($left)+number($left1)"/>
                </xsl:with-param>
                <xsl:with-param name="top">
                  <xsl:value-of select="number($top)+number($top1)"/>
                </xsl:with-param>
              </xsl:call-template>
            </xsl:when>
            
             <xsl:when test="name(.)='button'">
              <xsl:variable name="left1" select="./position/left"/>
              <xsl:variable name="top1" select="./position/top"/>
              <xsl:call-template name="button">
                <xsl:with-param name="left">
                  <xsl:value-of select="number($left)+number($left1)"/>
                </xsl:with-param>
                <xsl:with-param name="top">
                  <xsl:value-of select="number($top)+number($top1)"/>
                </xsl:with-param>
              </xsl:call-template>
            </xsl:when>
            

            <xsl:when test="name(.)='submit'">
              <xsl:variable name="left1" select="./position/left"/>
              <xsl:variable name="top1" select="./position/top"/>
              <xsl:call-template name="button">
                <xsl:with-param name="left">
                  <xsl:value-of select="number($left)+number($left1)"/>
                </xsl:with-param>
                <xsl:with-param name="top">
                  <xsl:value-of select="number($top)+number($top1)"/>
                </xsl:with-param>
              </xsl:call-template>
            </xsl:when>
            
            <xsl:when test="name(.)='reset'">
              <xsl:variable name="left1" select="./position/left"/>
              <xsl:variable name="top1" select="./position/top"/>
              <xsl:call-template name="button">
                <xsl:with-param name="left">
                  <xsl:value-of select="number($left)+number($left1)"/>
                </xsl:with-param>
                <xsl:with-param name="top">
                  <xsl:value-of select="number($top)+number($top1)"/>
                </xsl:with-param>
              </xsl:call-template>
            </xsl:when>
            
            <xsl:when test="name(.)='anchor'">
              <xsl:variable name="left1" select="./position/left"/>
              <xsl:variable name="top1" select="./position/top"/>
              <xsl:call-template name="anchor">
                <xsl:with-param name="left">
                  <xsl:value-of select="number($left)+number($left1)"/>
                </xsl:with-param>
                <xsl:with-param name="top">
                  <xsl:value-of select="number($top)+number($top1)"/>
                </xsl:with-param>
              </xsl:call-template>
            </xsl:when>
            
            <xsl:when test="name(.)='password'">
              <xsl:variable name="left1" select="./position/left"/>
              <xsl:variable name="top1" select="./position/top"/>
              <xsl:call-template name="text">
                <xsl:with-param name="left">
                  <xsl:value-of select="number($left)+number($left1)"/>
                </xsl:with-param>
                <xsl:with-param name="top">
                  <xsl:value-of select="number($top)+number($top1)"/>
                </xsl:with-param>
                <xsl:with-param name="bgcolor" select="$bgcolor" />
              </xsl:call-template>
            </xsl:when>
            
            <xsl:when test="name(.)='group'">
              <xsl:variable name="left1" select="./position/left"/>
              <xsl:variable name="top1" select="./position/top"/>
              <xsl:call-template name="group">
                <xsl:with-param name="left">
                  <xsl:value-of select="number($left)+number($left1)"/>
                </xsl:with-param>
                <xsl:with-param name="top">
                  <xsl:value-of select="number($top)+number($top1)"/>
                </xsl:with-param>
              </xsl:call-template>
            </xsl:when>
            
            <xsl:when test="name(.)='radio-group'">
              <xsl:variable name="left1" select="./position/left"/>
              <xsl:variable name="top1" select="./position/top"/>
              <xsl:call-template name="radio-group">
                <xsl:with-param name="left">
                  <xsl:value-of select="number($left)+number($left1)"/>
                </xsl:with-param>
                <xsl:with-param name="top">
                  <xsl:value-of select="number($top)+number($top1)"/>
                </xsl:with-param>
              </xsl:call-template>
            </xsl:when>
            
            <xsl:when test="name(.)='appendtable'">
              <xsl:variable name="left1" select="./position/left"/>
              <xsl:variable name="top1" select="./position/top"/>
              <xsl:call-template name="appendtable">
                <xsl:with-param name="left">
                  <xsl:value-of select="number($left)+number($left1)"/>
                </xsl:with-param>
                <xsl:with-param name="top">
                  <xsl:value-of select="number($top)+number($top1)"/>
                </xsl:with-param>
              </xsl:call-template>
            </xsl:when>
            
            <xsl:when test="name(.)='img'">
              <xsl:variable name="left1" select="./position/left"/>
              <xsl:variable name="top1" select="./position/top"/>
              <xsl:call-template name="img">
                <xsl:with-param name="left">
                  <xsl:value-of select="number($left)+number($left1)"/>
                </xsl:with-param>
                <xsl:with-param name="top">
                  <xsl:value-of select="number($top)+number($top1)"/>
                </xsl:with-param>
              </xsl:call-template>
            </xsl:when>
            
            <xsl:when test="name(.)='calendar'">
              <xsl:variable name="left1" select="./position/left"/>
              <xsl:variable name="top1" select="./position/top"/>
              <xsl:call-template name="calendar">
                <xsl:with-param name="left">
                  <xsl:value-of select="number($left)+number($left1)"/>
                </xsl:with-param>
                <xsl:with-param name="top">
                  <xsl:value-of select="number($top)+number($top1)"/>
                </xsl:with-param>
                <xsl:with-param name="privilege" select="$privilege"/>
                <xsl:with-param name="bgcolor" select="$bgcolor" />
              </xsl:call-template>
            </xsl:when>
            
            <xsl:when test="name(.)='textarea'">
              <xsl:variable name="left1" select="./position/left"/>
              <xsl:variable name="top1" select="./position/top"/>
              <xsl:call-template name="textarea">
                <xsl:with-param name="left">
                  <xsl:value-of select="number($left)+number($left1)"/>
                </xsl:with-param>
                <xsl:with-param name="top">
                  <xsl:value-of select="number($top)+number($top1)"/>
                </xsl:with-param>
                <xsl:with-param name="bgcolor" select="$bgcolor" />
              </xsl:call-template>
            </xsl:when>
            
            <xsl:when test="name(.)='combobox'">
              <xsl:variable name="left1" select="./position/left"/>
              <xsl:variable name="top1" select="./position/top"/>
              <xsl:call-template name="combobox">
                <xsl:with-param name="left">
                  <xsl:value-of select="number($left)+number($left1)"/>
                </xsl:with-param>
                <xsl:with-param name="top">
                  <xsl:value-of select="number($top)+number($top1)"/>
                </xsl:with-param>
                <xsl:with-param name="bgcolor" select="$bgcolor" />
              </xsl:call-template>
            </xsl:when>
            
            <xsl:when test="name(.)='list'">
              <xsl:variable name="left1" select="./position/left"/>
              <xsl:variable name="top1" select="./position/top"/>
              <xsl:call-template name="text">
                <xsl:with-param name="left">
                  <xsl:value-of select="number($left)+number($left1)"/>
                </xsl:with-param>
                <xsl:with-param name="top">
                  <xsl:value-of select="number($top)+number($top1)"/>
                </xsl:with-param>
                <xsl:with-param name="bgcolor" select="$bgcolor" />
              </xsl:call-template>
            </xsl:when>
            
            <xsl:when test="name(.)='file'">
              <xsl:variable name="left1" select="./position/left"/>
              <xsl:variable name="top1" select="./position/top"/>
              <xsl:call-template name="file">
                <xsl:with-param name="left">
                  <xsl:value-of select="number($left)+number($left1)"/>
                </xsl:with-param>
                <xsl:with-param name="top">
                  <xsl:value-of select="number($top)+number($top1)"/>
                </xsl:with-param>
                <xsl:with-param name="bgcolor" select="$bgcolor" />
              </xsl:call-template>
            </xsl:when>
            
            <xsl:when test="name(.)='datatree'">
              <xsl:variable name="left1" select="./position/left"/>
              <xsl:variable name="top1" select="./position/top"/>
              <xsl:call-template name="datatree">
                <xsl:with-param name="left">
                  <xsl:value-of select="number($left)+number($left1)"/>
                </xsl:with-param>
                <xsl:with-param name="top">
                  <xsl:value-of select="number($top)+number($top1)"/>
                </xsl:with-param>
                <xsl:with-param name="bgcolor" select="$bgcolor" />
              </xsl:call-template>
            </xsl:when>
            
            <xsl:when test="name(.)='paragraph'">
              <xsl:variable name="left1" select="./position/left"/>
              <xsl:variable name="top1" select="./position/top"/>
              <xsl:call-template name="paragraph">
                <xsl:with-param name="left">
                  <xsl:value-of select="number($left)+number($left1)"/>
                </xsl:with-param>
                <xsl:with-param name="top">
                  <xsl:value-of select="number($top)+number($top1)"/>
                </xsl:with-param>
                <xsl:with-param name="bgcolor" select="$bgcolor" />
              </xsl:call-template>
            </xsl:when>
            
            <xsl:when test="name(.)='append'">
              <xsl:variable name="left1" select="./position/left"/>
              <xsl:variable name="top1" select="./position/top"/>
              <xsl:call-template name="append">
                <xsl:with-param name="left">
                  <xsl:value-of select="number($left)+number($left1)"/>
                </xsl:with-param>
                <xsl:with-param name="top">
                  <xsl:value-of select="number($top)+number($top1)"/>
                </xsl:with-param>
              </xsl:call-template>
            </xsl:when>
          </xsl:choose>
  </xsl:template>
  
<!-- textrect model start -->
  <xsl:template name="textrect">
   <xsl:param name="width"/>
   <xsl:param name="height"/>
   <xsl:param name="title"/>
   <xsl:param name="border"/>
   <xsl:param name="border-color"/>
   <xsl:param name="border-width"/>
   <xsl:param name="border-left"/>
   <xsl:param name="border-right"/>
   <xsl:param name="border-top"/>
   <xsl:param name="border-bottom"/>   
   <xsl:param name="background-color"/>
   <xsl:param name="bgcolor"/>

   <xsl:choose>
       <xsl:when test="not($border) or border = ''">
           <xsl:call-template name="drawnoborder">
              <xsl:with-param name="width" select="$width"/>
              <xsl:with-param name="height" select="$height"/>
              <xsl:with-param name="background-color" select="$background-color"/>
           </xsl:call-template>
       </xsl:when>
       <xsl:otherwise>
          <v:rect>
             <xsl:attribute name="style">
                width:<xsl:value-of select="$width"/>;
                height:<xsl:value-of select="$height"/>;
                <xsl:if test="$border = 'bottom'">
                border-left:<xsl:value-of select="$border-left"/>;
                border-right:<xsl:value-of select="$border-right"/>;
                border-top:<xsl:value-of select="$border-top"/>;
                border-bottom:<xsl:value-of select="$border-bottom"/>;
                </xsl:if>
           </xsl:attribute>
           <xsl:attribute name="strokecolor">
               <xsl:choose>
                  <xsl:when test="$border = 'none' and $background-color ='transparent'"><xsl:value-of select="$bgcolor"/></xsl:when>
                  <xsl:when test="$border = 'none' and not($background-color)">#ffffff</xsl:when>
                  <xsl:when test="$border = 'none'"><xsl:value-of select="$background-color"/></xsl:when>               
                  <xsl:when test="$border = 'bottom'">#ffffff</xsl:when>
                  <xsl:otherwise><xsl:value-of select="$border-color"/></xsl:otherwise>
               </xsl:choose>
           </xsl:attribute>
           <xsl:if test="$background-color ='transparent'">
              <xsl:attribute name="filled">false</xsl:attribute>
           </xsl:if>
           <xsl:attribute name="fillcolor">
              <xsl:choose>
                 <xsl:when test="$background-color = '' or not($background-color)">#ffffff</xsl:when>
                 <xsl:otherwise><xsl:value-of select="$background-color"/></xsl:otherwise>
               </xsl:choose>
           </xsl:attribute>
           <xsl:attribute name="StrokeWeight">
               <xsl:value-of select="$border-width"/>
           </xsl:attribute>
           <xsl:attribute name="title">
               <xsl:value-of select="$title"/>
           </xsl:attribute>
         </v:rect>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>
<!-- textrect model end -->

<!-- filter-readonly model start -->
<xsl:template name="filter-readonly">
   <xsl:param name="readonly" />
   <xsl:choose>
       <xsl:when test="$readonly = 'true' or $readonly = 'readonly'">filter:alpha(opacity:60);</xsl:when>
       <xsl:otherwise>filter:alpha(opacity:100);</xsl:otherwise>       
   </xsl:choose>
</xsl:template>
<!-- filter-readonly model end -->
<!-- parse user-define-font -->
<xsl:template name="parse-font">
   <xsl:param name="form-define-font"/>
   <xsl:variable name="font-family" select="substring-before($form-define-font,',')"/>
   <xsl:variable name="font-x" select="substring-before(substring-after($form-define-font,','),',')"/>
   <xsl:variable name="font-size" select="substring-after($form-define-font,concat($font-x,','))"/>
   font-family:<xsl:value-of select="$font-family"/>;
   font-size:<xsl:value-of select="concat($font-size,$fontUnit)"/>;
   <xsl:choose>
     <xsl:when test="$font-x = 0">font-style:normal;font-weight:normal;</xsl:when>
     <xsl:when test="$font-x = 1">font-style:normal;font-weight:bold;</xsl:when>
     <xsl:when test="$font-x = 2">font-style:italic;font-weight:normal;</xsl:when>
     <xsl:when test="$font-x = 3">font-style:italic;font-weight:bold;</xsl:when>
     <xsl:otherwise>
     </xsl:otherwise>
   </xsl:choose>
</xsl:template>
</xsl:stylesheet>
