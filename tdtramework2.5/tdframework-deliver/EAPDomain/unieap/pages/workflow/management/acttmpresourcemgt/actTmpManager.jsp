<%@ page contentType="text/html;charset=UTF-8" %>
<!-- ============== actTmpManager Start ============== -->
 	<%@include file="css.jsp" %> 
 	<script type="text/javascript">
 	   var contextPath ="<%=request.getContextPath()%>";
 	</script>
 	<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/unieap/pages/workflow/stylesheet/acttmpresourcemgt/actTmpManager.css" />
	<%@include file="ext-js.jsp" %> 
    <script type="text/javascript" src="<%=request.getContextPath()%>/unieap/pages/workflow/js/ActTempletResource-JS/actTmpManager.js"></script>	

    
    
    <% String addNewNodeText="新增一个节点"; 													//新增一个节      									
       String notNullInputText="带*为必填项";													//带*为必填项
       String categoryNameText="分类名称";													//分类名称
       String categoryTitleText="分类标题";													//分类标题 										
       String tooLongText="输入过长";															//输入过长
	   String longBeyondText="长度超过";														//长度超过
	   String byteLimitText="字节限制";														//字节限制	
      %>
      <script language="javascript">     		
      			var limitProcess=function(value,text,limitNum)
      			{       
      					    	
	      			var length=0;		      		
	      			for(var i=0;i<value.length;i++)
	      			{
	      				if(value.charCodeAt(i)>255)
	      				{
	      					length+=2;
	      				}
	      				else
	      				{
	      					length++;
	      				}
	      			}  
	      				  					
	      			if(length>limitNum)
	      			{   
	      				Ext.MessageBox.alert(text+"<%=tooLongText%>","<%=longBeyondText%>"+limitNum+"<%=byteLimitText%>");	      						
	      				return false;
	      			}		
	      			else
	      			{	      				
	      				return true;
	      			}	      			    				
	      		}      			
    	
      			
      			function categoryNameLimit()
      			{      				
      				return limitProcess(document.getElementById("categoryname").value,"<%=categoryNameText%>",40);
      			} 
      			
      			function categoryTitleLimit()
      			{      			
      				return limitProcess(document.getElementById("categorytitle").value,"<%=categoryTitleText%>",40);
      			}       		
			
      				
      </script>

<div id="Layer1" class="main-layer">
  <div id="tree" class="categorytreemanager"></div>
</div>

 <div id="addcategory-dlg" class="add-dialog" style="position:absolute;left=-200px;top=-200;">
    <div class="x-dlg-hd"><%=addNewNodeText%></div>
    <div class="x-dlg-bd">   
        
                  <form action="" method="post" id="addcategory-form" onsubmit="return false;">
                    <input id="categorytypeid" type="hidden" name="categorytypeid" value="1" />
                    <fieldset style="height:60px; padding-bottom:1px;margin-bottom:0px;">
                    <br>
                     
                    <label for="categoryname" class="labelStyle"><small><%=categoryNameText%>:</small></label>
                    <input class="textinput" type="text" name="categoryname" id="categoryname" value="" size="10" maxlength="40" /><span class="remindtext">*</span>       
                    <label for="categoryCategoryType" class="labelStyle"></label>
                    <input type="hidden" name="categoryCategoryType" id="categoryCategoryType" value=""  size="10" readonly="true"   class="readonlytext" onFocus="this.blur();"  />
                                                               
                    </fieldset>
                    <span class="remindtext"><%=notNullInputText%></span>
              </form>
                        
   </div>
</div>
<!-- ============== actTmpManager  End  ============== -->