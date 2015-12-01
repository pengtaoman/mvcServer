/**************************************************/
/* description:VMLFormManager
/* author     :muxg
/* version 2.0:2005.3
/* version 2.1:2005.10*****************************
/**************************************************/
var userid="";

/*******************************************************************************
*  OrgTree
*  2005.4.5
********************************************************************************/
var Img_Obj_L=new Image();
Img_Obj_L.src="css/images/L.gif";
var Img_Obj_T=new Image();
Img_Obj_T.src="css/images/T.gif";
var Img_Obj_personNode=new Image();
Img_Obj_personNode.src="css/images/personnel.gif";
 
var orgPanelHandler ={ 
	                 orgtreePanel   : null,
	                 orgActorPanel  : null,
	                 Img_personNode : "css/images/personnel.gif",//"css/images/personnode.gif",
	                 Img_roleNode   : "css/images/role.gif",//"css/images/rolenode.gif",
	                 Img_actor_close: "css/images/closefolder.gif",
	                 Img_actor_open : "css/images/openfolder.gif",
	                 Img_collapses  : "css/images/close.gif",
	                 Img_expanded   : "css/images/open.gif",
	                 Img_search     : "css/images/search.gif",
	                 Img_T          : "css/images/T.gif",
	                 Img_L          : "css/images/L.gif",
	                 Img_I          : "css/images/I.gif",
	                 addPNode_List  : null, //array
	                 addRNode_list  : null, //array
	                 delNode_List   : null,  //array
	                 orgDoc         : null,   //xml Document 
	                 orgXslDoc      : null,
	                 orgActorsDoc   : null,
	                 orgPersonsDoc  : null,   //persons of formrole tree
	                 orgXslUrl      : "xsllib/orgtree.xsl",
	                 orgxmlpath     :"xmllib/orgtree.xml",
	                 //formID       : "",
	                 servletPath    : "",
	                 currentCategoryId: null,
	                 pcurrentCategoryId: null,
	                 currentCategoryNode:null,
	                 pcurrentCategoryNode:null,
	                 initEnd        : false,  // boolean , set if initialization is end.
	                 orgIndex       :32,
	                 orgIndexTemp   :0,
	                 roleState      : false,
	                 personState    : false,
	                 scrollcount    :0
	             }

var orgPrivilgePanelHandler = {
	                         orgActorPanel : null,
	                         tempNode      : null
	                      }
//
/*-------------formManager--------------
*
*K_list        : !    form Figures List (Array)
*displayPageNo : !    current page number (int)
*privilegeDoc  : obj  privilege xml documnet
*formID        : str  form's id
*labelName     : obj  attribute panel,show the Figure's name
*visible       : obj  attribute panel,show the Figure's visible
*editable      : obj  attribute panel,show the Figure's editable
*formPage      : obj  privilege panel,show all pages and all Fifures;
*/
var formManager = {
                   K_list:new Array(),
                   displayPageNo:-1,
                   privilegeDoc:null,
                   formID:"",
                   prvID :"",
                   operators:"",
                   //labelName:null,
                   visible:null,
                   editable:null,
                   printable:null,
                   submitable:null,
                   formPage:null,
                   datasets:"",
                   author  :"",
                   description :"",
                   diaplayMax    :1,
                   startDisNo    :1,
                   endDisNo      :0,
                   maxNo         :0,
                   pageNoDIV     :null,
                   formpageOffsetWidth:0,
                   pageno_bg_url_1:"css/images/bg_on.gif",
                   pageno_bg_url_0:"css/images/bg_off.gif",
                   pageno_bg_url_check_1:"css/images/tab/main_checked_left.gif",
                   pageno_bg_url_check_class:"main_checked_center",
                   pageno_bg_url_check_2:"css/images/tab/main_checked_right.gif",
                   pageno_bg_url_uncheck_1:"css/images/tab/main_unchecked_left.gif",
                   pageno_bg_url_uncheck_class:"main_unchecked_center",
                   pageno_bg_url_uncheck_2:"css/images/tab/main_unchecked_right.gif"
	          }
	          
/**---------------selectRect
*
* @selRect  : object,the select rect object
* @rleft    : int   ,
* @rtop     : int
* @mousedown: bool  ,true id the left is down
* @fpLeft   : int 
* @fpLeft   : int
**/
var selectRect=  {
	           selRect:null,
	           rleft:-1,
	           rtop:-1,
	           mousedown:false,
	           fpLeft:-1,
	           fpLeft:-1
	         }
/*-----------init,the program start
*  @formpageid
*  @lablenameid
*  @visibleid
*  @editableid
*/
function init(formpageid,lablenameid,visibleid,editableid,printable,submitable)
    {
      formManager.formPage  = document.getElementById(formpageid)
      formManager.visible   = document.getElementById(visibleid)
      formManager.editable  = document.getElementById(editableid)
      formManager.printable  = document.getElementById(printable)
      formManager.submitable  = document.getElementById(submitable)
    }
    
function setIsView(boolvalue)
 {
   this.formManager.isView = boolvalue
 }
/*----------figure is clicked
* @Figureobj :current figure that is clicked
*/
function figure_click(Figureobj)
     {   //alert(Figureobj.outerHTML)
      //alert();
        if(Figureobj.childNodes[0]&&Figureobj.childNodes[0].name=="border_"+Figureobj.name)
          {//alert();
            figure_onfocus(Figureobj)
          } 
        showPrivilege(Figureobj.name);
     }
/*
* @Figureobj :current figure will be setted border
*/
function figure_setBorder(Figureobj)
     {
       Figureobj.childNodes[0].style.display='block'
     }
/*------------figure get the focus
*  @Figureobj
*/
function figure_onfocus(Figureobj)
    {  
       if(event.shiftKey)
        {  
          var indx=formManager.K_list.contain(Figureobj)
          if(indx==-1)
            { 
              Figureobj.childNodes[0].style.display="block"
              formManager.K_list[formManager.K_list.length]=Figureobj
            }
          else
            {
              Figureobj.childNodes[0].style.display="none"
              formManager.K_list.remove(indx)
            }
          if(formManager.K_list.length>1)
            {
              setAttributePanelNull()
            }
          return;
        }
       //alert(formManager.K_list) 
       for(i=0;i<formManager.K_list.length;i++)
         {
           formManager.K_list[i].childNodes[0].style.display="none"
         }
      formManager.K_list=null;formManager.K_list=new Array();
      formManager.K_list[0]=Figureobj
      
      Figureobj.childNodes[0].style.display="block"
    }

/*--------------function figure_onblur use to 
 the border 
*/
function figure_onblur()
    {
      if(!event.shiftKey)
        {
          for(i=0;i<formManager.K_list.length;i++)
            {
              formManager.K_list[i].childNodes[0].style.display="none"
            }
          formManager.K_list=null;formManager.K_list=new Array();
        }
      formManager.editable.setAttribute("disabled","true")
      formManager.visible.setAttribute("disabled","true")
    }
 
/*-----------change_visible
* @visible : obj, the chechbox obj
*/
function change_visible(visible)
    {
      var allK=this.formManager.K_list;
      var editable=formManager.editable
      if(!visible.checked)
        editable.checked=false
      var len=allK.length
      var name1;
      if(editable.checked)
        {
          for(var q=0;q<allK.length;q++)
            {
              name1=allK[q].name
              removeInvisiblePrivilege(name1,this.userid)
              addEditablePrivilege(this.userid,name1)
            }
        }
      else if(!visible.checked)
         {
           for(var j=0;j<allK.length;j++)
             {
                name1=allK[j].name
                removeEditablePrivilege(name1,this.userid)
                addInvisiblePrivilege(this.userid,name1)
             }
         }
      else if(visible.checked&&!editable.checked)
         { 
           for(var k=0;k<allK.length;k++)
             {
               name1=allK[k].name;
               removeEditablePrivilege(name1,this.userid)
               removeInvisiblePrivilege(name1,this.userid)	
             }
         }
      else if(!visible.checked&&!editable.checked)
         {
           for(var l=0;l<allK.length;l++)
             {
               name1=allK[l].name
               removeEditablePrivilege(name1,this.userid)
               addInvisiblePrivilege(this.userid,name1)
             }
         }
      //privilegeChangeEvent();
    }
/*----------change_editable
*@editable  :obj,the checkbox obj
*/
function change_editable(editable)
    {
      
      event.cancelBubble = true;
      var visible=formManager.visible
      if(editable.checked)
        visible.checked=true
      var allK=this.formManager.K_list
      var len=allK.length
      var name1;
      if(editable.checked&&visible.checked)
        {
          for(var w=0;w<len;w++)
            {
              name1=allK[w].name
              removeInvisiblePrivilege(name1,this.userid)
              addEditablePrivilege(this.userid,name1)
            }
        }
      else if(!visible.checked)
         {
           for(var k=0;k<len;k++)
             {
               name1=allK[k].name
               removeEditablePrivilege(name1,this.userid)
               addInvisiblePrivilege(this.userid,name1)
             }

         }
      else if(visible.checked&&!editable.checked)
         {
           for(var j=0;j<len;j++)
             {
               name1=allK[j].name
               removeEditablePrivilege(name1,this.userid)
               removeInvisiblePrivilege(name1,this.userid)
             }
         }
     else if(!visible.checked&&!editable.checked)
         {
           for(var l=0;l<len;l++)
             {
               name1=allK[l].name
               removeEditablePrivilege(name1,this.userid)
               addInvisiblePrivilege(this.userid,name1)
             }
         }
         
     //privilegeChangeEvent();
   }
/*----------change_editable
*@printable  :obj,the checkbox obj
*/
function change_printable(printable)
  {
    if(printable==null)return;
    if(this.userid==null||this.userid=="")return;
    if(printable.checked)
      {
        addPrintablePrivilege(this.userid);  	
      }
    else
      {
      	removePrintblePrivilege(this.userid);
      }
    //privilegeChangeEvent();
  }

/*----------add printable privilege to the actor where id = actorId
*/
function addPrintablePrivilege(actorId)
 {
    var root=formManager.privilegeDoc.selectSingleNode("//privilege")
    if(root==null)return;
    /*****/
    var printableNode = root.selectSingleNode("printable");
    
    if(printableNode==null)
      { 
        printableNode = formManager.privilegeDoc.createElement("printable")
        root.appendChild(printableNode)
      }
      
    var userid_text = ";"+actorId+";"
    var printable_text = ";"+printableNode.text+";"
    if(printable_text.indexOf(userid_text)==-1)
        {
         if(printableNode.text=="")
           {
         	printableNode.text = actorId
           }
         else
          {
               printableNode.text = printableNode.text+";"+actorId	
          }
        }
 }

/*-----------test if the role has printable privilege 
*/
function hasPrintablePrivilege(roleId)
  {
    var retValue = false;
    var printableNode = formManager.privilegeDoc.selectSingleNode("//printable");
    if(printableNode!=null)
      {
      	var txt = ";"+printableNode.text+";";
      	if(txt.indexOf(";"+roleId+";")!=-1)
      	  {
      	    retValue = true;
      	  }
      }
    return retValue;
  }

/*--------------test if the role has submitable privilege.
*/
function hasSubmitablePrivilege(roleId)
  {
    var retValue = false;
    var submitableNode = formManager.privilegeDoc.selectSingleNode("//submitable");
    if(submitableNode!=null)
      {
      	var txt = ";"+submitableNode.text+";";
      	if(txt.indexOf(";"+roleId+";")!=-1)
      	  {
      	    retValue = true;	
      	  }
      }
    return retValue;    
  }

/*--------------remove the role's printable privilege
*/
function removePrintblePrivilege(actorId)
 {
    var root=formManager.privilegeDoc.selectSingleNode("//privilege")
    if(root==null)return;
    /*****/
    var printableNode = root.selectSingleNode("printable");
    
    if(printableNode==null)
      { 
        printableNode = formManager.privilegeDoc.createElement("printable")
        root.appendChild(printableNode)
      }
     var userid_text = ";"+actorId+";"
      	var printable_text = ";"+printableNode.text+";"
        if(printable_text.indexOf(userid_text)!=-1)
          {
            var arr_ss = printable_text.split(";");
            var txtTemp="";
            for(var io=0;io<arr_ss.length;io++)
              {
              	if(arr_ss[io]!=actorId&&arr_ss[io]!='')
              	  {
              	    if(txtTemp=="")
              	      {
              	        txtTemp = arr_ss[io];	
              	      }
              	    else
              	      {
              	      	txtTemp = txtTemp+";"+arr_ss[io];
              	      }
              	  }
              }
            printableNode.text = txtTemp;
  
          }     	
 }
/*----------change_editable,when the Actor click the submitable checkbox
*@printable  :obj,the checkbox obj
*/
function change_submitable(submitable)
  {
    if(this.userid==null||this.userid=="")return;
    if(submitable.checked)
      {
       	addSubmitablePrivilege(this.userid);
      }
    else
      {
      	removeSubmitablePrivilege(this.userid);
      }
    //privilegeChangeEvent();
  }

/*----------grant submitable privilege to the role where id = actorId;
*/
function addSubmitablePrivilege(actorId)
  {
    var root=formManager.privilegeDoc.selectSingleNode("//privilege")
    if(root==null)return;
    var submitableNode = root.selectSingleNode("submitable");  	
    if(submitableNode==null)
      {
        submitableNode = formManager.privilegeDoc.createElement("submitable")
        root.appendChild(submitableNode)
      }
    var userid_text = ";"+actorId+";"
  
        var submitable_text = ";"+submitableNode.text+";"
        if(submitable_text.indexOf(userid_text)==-1)
          {
            if(submitableNode.text=="")
              {
              	submitableNode.text = actorId
              }
            else
              {
                submitableNode.text = submitableNode.text+";"+actorId
              }
          }
  }

/*---------------remove the role's submitable privilege.
*/
function removeSubmitablePrivilege(actorId)
  {
    var root=formManager.privilegeDoc.selectSingleNode("//privilege")
    if(root==null)return;
    /*****/
    var submitableNode = root.selectSingleNode("submitable");  	
    if(submitableNode==null)
      {
        submitableNode = formManager.privilegeDoc.createElement("submitable")
        root.appendChild(submitableNode)
      }
    var userid_text = ";"+actorId+";"
    var submitable_text = ";"+submitableNode.text+";"
        if(submitable_text.indexOf(userid_text)!=-1)
          {
             var array_users=submitable_text.split(";")
             var temp ="";
              for(var io=0;io<array_users.length;io++)
                 {
                   if(array_users[io]!=actorId&&array_users[io]!='')
                     {
                       if(temp=="")
                         {
                           temp=array_users[io]
                         }
                       else
                           temp=temp+";"+array_users[io]; 	
                     }
                 }
             submitableNode.text = temp;         
            
          }     	
  }

/*---------removeInvisiblePrivilege
*  @name :string, the figure's name 
*/
function removeInvisiblePrivilege(name,str_userid)
    {
      var thisUserId=""
      if(str_userid)
        {
          thisUserId=str_userid
        }
      else
        {
         thisUserId=this.userid
        }
      var root=formManager.privilegeDoc.selectSingleNode("//privilege")
      var ele=root.selectSingleNode("element[@name='"+name+"']")
      if(ele!=null)
        {
          var invi=ele.selectSingleNode("invisible")
          if(invi!=null)
            {
              var array_users=invi.text.split(";")
              invi.text="";
              for(var io=0;io<array_users.length;io++)
                 {
                   if(array_users[io]!=thisUserId)
                     {
                       if(invi.text=="")
                         {
                           invi.text=array_users[io]
                         }
                       else
                           invi.text=invi.text+";"+array_users[io]; 	
                     }
                 }
              
             if(invi.text=="")
                  ele.removeChild(invi)
            }
           if(!ele.hasChildNodes)
              root.removeChild(ele)
        }
       showWidgetUnEditableStyle(name);
    }

/*---------addInvisiblePrivilege
*  @name :string, the figure's name 
*/
function addInvisiblePrivilege(roleId,name)
    {
      var figure = document.getElementById(name)
      //datagrid is visible by default
      if(figure&&figure.getAttribute("figuretype")=="datagrid")
         return;
      //add end
      var root = formManager.privilegeDoc.selectSingleNode("//privilege")
      var ele  = root.selectSingleNode("element[@name='"+name+"']")
      if(ele==null)
        {
          ele=formManager.privilegeDoc.createElement("element")
          ele.setAttribute("name",name)
          root.appendChild(ele)
        }
      var invi = ele.selectSingleNode("invisible")
      if(invi==null)
        {
          invi = formManager.privilegeDoc.createElement("invisible")
          ele.appendChild(invi)
        }
      if(invi.text=="")
          invi.text=roleId;
      else
        {
           //var exist       = false
           var invi_text  =";"+invi.text+";"
           var userid_text=";"+roleId+";"
           if(invi_text.indexOf(userid_text)==-1)
             {
               invi.text=invi.text+";"+roleId
             }
       }
      showWidgetInvisibleStyle(name);
    }
/*------removeEditablePrivilege
*  @name :string, the figure's name 
*/
function removeEditablePrivilege(name,str_userid)
    {
      var thisUserId=""
      if(str_userid!=null&&str_userid!="")
       {
        thisUserId=str_userid
       }
      else
       {
        thisUserId=this.userid
       } 
      var root=formManager.privilegeDoc.selectSingleNode("//privilege")
      var ele =root.selectSingleNode("element[@name='"+name+"']")
      if(ele!=null)
        {
          var edit=ele.selectSingleNode("editable")
          if(edit!=null)
            {
             var array_users=edit.text.split(";")
             var temp ="";
              for(var io=0;io<array_users.length;io++)
                 {
                   if(array_users[io]!=str_userid)
                     {
                       if(temp=="")
                         {
                           temp=array_users[io]
                         }
                       else
                           temp=temp+";"+array_users[io]; 	
                     }
                 }
              edit.text = temp;
              if(edit.text=='')
                {
                  ele.removeChild(edit);
                }
            }
          if(!ele.hasChildNodes())
             root.removeChild(ele)
        }

      showWidgetUnEditableStyle(name);
}
/*------addEditablePrivilege
*  @name :string, the figure's name 
*/
function addEditablePrivilege(roleId,fname)
    {
       var root=formManager.privilegeDoc.selectSingleNode("//privilege")
       var ele=root.selectSingleNode("element[@name='"+fname+"']")
       if(ele==null)
         {
           ele=formManager.privilegeDoc.createElement("element")
           ele.setAttribute("name",fname)
           root.appendChild(ele)
         }
       var edit=ele.selectSingleNode("editable")
       if(edit==null)
         {
           edit=this.formManager.privilegeDoc.createElement("editable")
           ele.appendChild(edit)
         }
       if(edit.text==""||edit.text==null)
          edit.text=roleId
       else
         { 
           var edit_text = ";"+edit.text+";";
           var user_text =";" +roleId+";";
           if(edit_text.indexOf(user_text)==-1)
             {
             	edit.text = edit.text+";"+roleId;
             }
        }
      showWidgetEditabelStyle(fname);
    }

/*------------remove the role's all privilege
*/
function removeAllPrivilege(roleid)
  {
    removePrintblePrivilege(roleid);
    removeSubmitablePrivilege(roleid);
    //remove all editable and invisible privilege
    var elementNodes = this.formManager.privilegeDoc.selectNodes("//element");
    if(elementNodes==null||elementNodes.length < 0)
      {
      	return;
      }
    var fname;
    for(var z=0;z<elementNodes.length;z++)
      {
         fname = elementNodes[z].getAttribute("name");
         removeEditablePrivilege(fname,roleid);
         removeInvisiblePrivilege(fname,roleid);
      }
    setCurrentUser(roleid);
  }


function privilegeChangeEvent()
 { 
   if(orgPanelHandler.currentPCategoryId!=null&&orgPanelHandler.currentCategoryId!="")
     {
     	if(orgPanelHandler.orgActorsDoc!=null)
     	  {
     	     var rolesNode = orgPanelHandler.orgActorsDoc.selectSingleNode("//roles[@frm_roleid='"+orgPanelHandler.currentPCategoryId+"']");	
     	     if(rolesNode!=null)
     	       {
     	         var tex = rolesNode.text;
     	         var tex_arr = 	rolesNode.text.split(";");
     	         for(var md=0;md<tex_arr.length;md++)
     	           {
     	             if(tex_arr[md]!=this.userid)
     	               {
     	                 copyPrivilege(tex_arr[md],this.userid);
     	               }
     	           }
     	       }
     	  }
     }
 }

function doCopyPrivilege(roleId)
 {
   var bobj = document.getElementById("CATEGORY_"+orgPanelHandler.currentCategoryId);
   if(bobj&&bobj.hasChildNodes())
    {
      copyPrivilege(roleId,bobj.childNodes[0].id.replace("ACT_",""));
    }
 }
/*
*
*   copy privilege where targetId has to cId.
*
*/
function copyPrivilege(cId,targetId)
  {
     if(cId==null||cId==""||targetId==null||targetId=="")
       return;
     var eleNodes = this.formManager.privilegeDoc.selectNodes("//element");
     if(eleNodes!=null&&eleNodes.length > 0)
       {
       	  removeAllPrivilege(cId);
       	  var fname;
       	  //add editable and invisible privilege
       	  for(var ge=0;ge<eleNodes.length;ge++)
       	    {
       	      fname = eleNodes[ge].getAttribute("name");
       	      if(hasEditablePrivilege(targetId,fname))
       	        {
       	          addEditablePrivilege(cId,fname);
       	        }
       	      else if(hasInvisiblePrivilege(targetId,fname))
       	        {
       	          addInvisiblePrivilege(cId,fname);
       	        }
       	    }
       	  //add printable and submitable privilege
       	  if(hasPrintablePrivilege(targetId))
       	    {
       	      addPrintablePrivilege(cId);
       	    }
       	  if(hasSubmitablePrivilege(targetId))
       	    {
       	      addSubmitablePrivilege(cId);
       	    }
       }
  }

/*************
P:test if the id has editable privilege to the widget

return true if has editable privilege,else return fasle
*************/

function hasEditablePrivilege(roleId,eleName)
  {
    var retValue=false;
    var eleNode = this.formManager.privilegeDoc.selectSingleNode("//element[@name='"+eleName+"']");
    if(eleNode!=null)
      {
      	 var editableNode = eleNode.selectSingleNode("editable");
      	 //vat txt = ";"+editableNode.text+";"
      	 if(editableNode!=null&&(";"+editableNode.text+";").indexOf(";"+roleId+";")!=-1)
      	   {
	      retValue = true;
      	   }
      }
    return retValue;
  }
/*************

P:test if the id has invisible privilege to the widget

return true if has invisible privilege,else return fasle
*************/
function hasInvisiblePrivilege(roleId,eleName)
  {
    var retValue = false;
    var eleNode = this.formManager.privilegeDoc.selectSingleNode("//element[@name='"+eleName+"']");
    if(eleNode!=null)
      {
        var invisibleNode = eleNode.selectSingleNode("invisible");	
        if(invisibleNode!=null&&(";"+invisibleNode.text+";").indexOf(";"+roleId+";")!=-1)
          {
            retValue = true;
          }
      }
    return retValue;
  }

/*------------LoadAttribute
* @formID :string, current form's id
*/
var person;
function LoadAttribute(formId,prvId,workflow)
    {
      this.formManager.prvID=prvId
      this.formManager.formID=formId
      //trim
      if(this.formManager.prvID){
      		this.formManager.prvID = this.formManager.prvID.replace(/(^\s*)|(\s*$)/g, "");
      }
      if(this.formManager.formID){
      		this.formManager.formID = this.formManager.formID.replace(/(^\s*)|(\s*$)/g, "");
      }
      var xmlhttp=new ActiveXObject("Microsoft.XMLHTTP")
      var url="http://"+document.location.host+"/"+getServletPath()+"/formmanagerlistener?formcommand=loadformprivilege&formID="+formId+"&prvID="+prvId
      xmlhttp.open("POST",url,false)
      
      xmlhttp.onreadystatechange=function()
          { 
            if(xmlhttp.readyState==4)
              {
                if (xmlhttp.status == 200)
                  {
                    if(xmlhttp.responseText.indexOf("<error-message>")!=-1)
                         {
                           alert("\u9519\u8bef:"+xmlhttp.responseText.replace("<error-message>","").replace("</error-message>",""));
                           return history.go(-1);
                         } 
                         //get role and person's privilege from backConsole :added by fuqiang
                         //var respone_array = xmlhttp.responseText.split("||");
                         var prv = xmlhttp.responseText;
                         //alert(prv)
                         var xmlDoc=new ActiveXObject("MSXML2.DOMDocument.4.0");
					     xmlDoc.async=false;
                         xmlDoc.loadXML(prv);
                         this.formManager.privilegeDoc=xmlDoc;
                         //alert(xmlDoc.xml)
                       //todo 
                       //person = respone_array[1];
                       //setPersonTree(person);
                         //get role and person's privilege from backConsole   
                   //this.formManager.privilegeDoc=xmlhttp.responseXML   //get xmlDoc
                   //alert(xmlhttp.responseText)
                   if(this.formManager.privilegeDoc==null||this.formManager.privilegeDoc.xml=="") 
                     {
                       this.formManager.privilegeDoc=getPrivilegeDoc();
                     }
                   //alert(formId+this.formManager.privilegeDoc.xml)   
                   //(workflow)                  
                   if(workflow!=null&&workflow!="undefined"&&workflow!="")
                     {
                       LoadOrgActors(formId,prvId,workflow);
                     }
                   else
                    {  
                       //add 2005.09.19
                      if(orgPanelHandler.orgActorPanel!=null&&orgPrivilgePanelHandler.orgActorPanel!=null)
                         {
                           orgPanelHandler.orgActorPanel.innerHTML ="";
                           orgPrivilgePanelHandler.orgActorPanel.innerHTML="";
                         }
                      var versionNode = this.formManager.privilegeDoc.selectSingleNode("//version");
                      //alert(versionNode.text)
                      if(versionNode!=null&&versionNode.text=="2.0.1")
                        {
                          versionNode.text="2.1.0";
                          organiseOrgActors(this.formManager.privilegeDoc.selectSingleNode("//collection").text.split(";"));
                        }
                      else if(versionNode!=null&&versionNode.text=="2.1.0")
                         {
                           LoadOrgActors(formId,prvId);
                         }
                       else
                       	 {
                       	   versionNode = this.formManager.privilegeDoc.createElement("version");
                       	   versionNode.text="2.1.0";
                       	   organiseOrgActors(this.formManager.privilegeDoc.selectSingleNode("//collection").text.split(";"));
                       	 }
                       //add end
                    }
                  }
               else 
               	 {
                   alert("\u8bfb\u53d6\u6570\u636e\u5931\u8d25\uff01\n" +xmlhttp.statusText+"\n"+xmlhttp.responseText);
                 }
             }
          }
      xmlhttp.send(null);
      loadFormActorTree(formId,prvId,workflow)
      setOrgActors(workflow);
      
   }
   

function LoadCollections(formId,prvId)
  {
    
    if(formId==null||formId==""||prvId==null||prvId=="")
      return "";
    var xmlhttp=new ActiveXObject("Microsoft.XMLHTTP")
    var url="http://"+document.location.host+"/"+getServletPath()+"/loadcollections?formID="+formId+"&prvID="+prvId
      xmlhttp.open("POST",url,false)
      
      xmlhttp.onreadystatechange=function()
          { 
            if(xmlhttp.readyState==4)
              {
                if (xmlhttp.status == 200)
                  {
                    xmlhttp.responseXML   //get xmlDoc
                  }
               else 
               	 {
                   alert("\u8bfb\u53d6\u53c2\u4e0e\u8005\u5931\u8d25\uff01\n" +xmlhttp.statusText+"\n"+xmlhttp.responseText);
                 }
             }
          }
      xmlhttp.send(null);
  }
/*-----------loadFormPage
* 
*
*/
function loadFormPage()
    {
      if(this.formManager.formPage!=null)
        {
         this.formManager.formPage.innerHTML="<b style='font-size:15px'>\u8f7d\u5165\u4e2d...</b>";  	
        }
      var formId = this.formManager.formID
      if(formId==null||formId=="")
        {
          alert("\u8868\u5355ID\u4e3a\u7a7a\uff01");
          return;
        }
       
      var xmlhttp=new ActiveXObject("Microsoft.XMLHTTP")
      var url="http://"+document.location.host+"/"+getServletPath()+"/formmanagerlistener?formcommand=loadformpage&formID="+formId
      
      xmlhttp.open("POST",url,true)
      xmlhttp.onreadystatechange=function()
                                     {
                                       if(xmlhttp.readyState==4)
                                         {
                                           if (xmlhttp.status == 200)
                                             {
                                               if(xmlhttp.responseText==""||xmlhttp.responseText.replace(/(^\s*)|(\s*$)/g, "").length==0)
                                                 {
                                                 
                                                 alert('\u8bfb\u53d6\u8868\u5355\u5931\u8d25\uff01')
                                                 return history.go(-1)
                                                 //return;
                                                 }
                                               if(xmlhttp.responseText.indexOf("<error-message>")!=-1)
                                                 {
                                                   alert("\u9519\u8bef:"+xmlhttp.responseText.replace("<error-message>","").replace("</error-message>",""));
                                                   return history.go(-1)
                                                 }
                                                
                                               showFormPage(xmlhttp.responseText)
                                                
                                             }
                                           else if(xmlhttp.status == 404)
                                             {
                                               
                                               alert("\u8bfb\u53d6\u8868\u5355\u6a21\u677f\u5931\u8d25\uff01\n" + url +"\u4e0d\u5b58\u5728."+"\n"+xmlhttp.responseText);	
                                               formManager.formPage.innerHTML=""
                                             }
                                           else 
                                             {
                                               alert("\u8bfb\u53d6\u8868\u5355\u6a21\u677f\u5931\u8d25\uff01\n" +xmlhttp.statusText+"\n"+xmlhttp.responseText);
                                               formManager.formPage.innerHTML=""
                                             }
                                         }
                                      }
     xmlhttp.send(null);
     //alert(formManager.formPage);
}

/*
*showPrivilege()
*/
function showPrivilege(id)
    {
      //alert(id)
      if(formManager.editable==null)
        {
          formManager.editable=document.all.editable	
        }
      if(formManager.visible==null)
        {
         formManager.visible=document.all.visible	
        }
      if(formManager.editable==null)
        {
          return;
        }
      if(formManager.visible==null)
        {
          return;
        }
      var editable = formManager.editable
      var visible=formManager.visible
      
      if(this.userid==null||this.userid==""||this.userid=="undefined")
        {
          editable.checked=false
      	  visible.checked=false
          editable.setAttribute("disabled","true")
          visible.setAttribute("disabled","true")
          return;
        }
      if(this.formManager.K_list.length==1)
          id=this.formManager.K_list[0].name
      else if(this.formManager.K_list.length==0)
        {
          editable.checked=false
          visible.checked=false
          //formManager.labelName.innerText="";
          return;
        }
     else
        {
      	  var readonly=false;
      	  var hasdatagrid =false
          for(j=0;j<formManager.K_list.length;j++)
      	    {
      	      var ro=formManager.K_list[j].getAttribute("readonly")
      	      if(ro=='true')
      	       {
      	         readonly=true
      	         break;
      	       }	
      	    }
      	 if(readonly)
      	   {
             editable.setAttribute("disabled","true")
           }
         else
           {
             if(this.formManager.isView)
               {
               }
             else
             editable.removeAttribute("disabled")	
           }
             if(this.formManager.isView)
               {
               }
             else         
         visible.removeAttribute("disabled")
      	 editable.checked=false
      	 visible.checked=false
      	 return;
      }
   var ro=formManager.K_list[0].getAttribute("readonly")
   var figuretype = formManager.K_list[0].getAttribute("figuretype")
   
   if(ro=='true')
     {
       editable.setAttribute("disabled","true");
       editable.checked=false;	
     }
   else   
     {
             if(this.formManager.isView)
               {
               }
             else     	
       editable.removeAttribute("disabled")	
     }
      
   if(figuretype=="datagrid")
     {
       visible.setAttribute("disabled","true")     	
     }
   else
   	{
             if(this.formManager.isView)
               {
               }
             else   		
   visible.removeAttribute("disabled")		
   }
     
   var f=this.formManager.privilegeDoc.selectSingleNode("//element[@name='"+id+"']")// 
   
   if(f==null)
     {
      visible.checked=true
      editable.checked=false
      return;
     }
   var ed=f.selectSingleNode("editable")
   var inv=f.selectSingleNode("invisible")
   var exist = false
   if(ed!=null)
     {
       var str_users=ed.text
       var array_users=str_users.split(";")
       for(i=0;i<array_users.length;i++)
         {
           if(this.userid==array_users[i])
             {
               visible.checked=true
               if(ro)
                { 
                  editable.checked=true
                }
               else
               	 editable.checked=true
               exist = true;
               break;
             }
         }
       if(exist)
          return;	
     }
    if(inv!=null)
      {
        var str_users=inv.text
        var array_users=str_users.split(";")
        for(i=0;i<array_users.length;i++)
          {
            if(this.userid==array_users[i])
              {
                visible.checked=false
                editable.checked=false
                exist =true
                break;
              }
          }
        if(exist)
           return;	
      }
    if(!exist)
      {
        visible.checked=true
        editable.checked=false	
      }
}

/*---------------------------------
*/
function showPrintablePrivilege(uid)
  {
    //
    if(formManager.printable==null)
      return;
    if(uid!=null&&uid!="")
      {
             if(this.formManager.isView)
               {
               }
             else 
              {
      	        formManager.printable.removeAttribute("disabled")
              }
      	var printable = formManager.privilegeDoc.selectSingleNode("//printable")
      	if(printable!=null)
      	  {
      	    var printable_text = ";"+printable.text+";"
      	    var uid_text = ";"+uid+";"
      	    if(printable_text.indexOf(uid_text)!=-1)
      	       {
      	         formManager.printable.checked = true
      	       }
      	    else
      	       {
      	       	formManager.printable.checked = false
      	       }
      	  }
      }
     else
      {
      	formManager.printable.setAttribute("checked",false)
      	formManager.printable.setAttribute("disabled","true")
      }
  }

/*----------------------------------
*/
function showSubmitablePrivilege(uid)
  {
    if(formManager.submitable==null)
      return;
    if(uid!=null&&uid!="")
      {
             if(this.formManager.isView)
               {
               }
             else
              {
                formManager.submitable.removeAttribute("disabled");
              }
        var submitable = formManager.privilegeDoc.selectSingleNode("//submitable")
      	if(submitable!=null)
      	  {
            var submitable_text =";"+submitable.text+";"
            var uid_text = ";"+uid+";"
            if(submitable_text.indexOf(uid_text)!=-1)
              {
              	formManager.submitable.checked = true
              }
            else
              {
              	formManager.submitable.checked = false
              }
      	  }
      }
     else
      {
      	formManager.submitable.setAttribute("checked",false)
        formManager.submitable.setAttribute("disabled","true")	
      }
  }
  
function saveFormRoles()
 {
       formManager.saveFormRoleSuccess = false;
       var url="http://"+document.location.host+"/"+getServletPath()+"/formmanagerlistener?formcommand=saveformroles"
       
       //var req = null;
       if(window.XMLHttpRequest){
         //If IE7, Mozilla, Safari, etc: Use native object
         req = new XMLHttpRequest();
       }else
       if(window.ActiveXObject){
          // ...otherwise, use the ActiveX control for IE5.x and IE6
          isIE = true;
          req = new ActiveXObject("Microsoft.XMLHTTP");
       }
       if(req){
        	req.onreadystatechange = processReqChange_saveFormRoles;
            req.open("POST", url, false);
            req.setRequestHeader("Content-Type","text/xml;charset=utf-8");
            //alert(this.orgPanelHandler.orgActorsDoc.xml)
            req.send(this.orgPanelHandler.orgActorsDoc.xml);
       }
 /*      // branch for native XMLHttpRequest object
       if (window.XMLHttpRequest) 
         {
           //req = new XMLHttpRequest();
           req = new XMLHttpRequest();
           
           req.onreadystatechange = processReqChange_saveFormRoles;
           
           req.setRequestHeader("Content-Type","text/xml;charset=utf-8")
           
           req.open("POST", url, false);
           req.send(this.orgPanelHandler.orgActorsDoc.xml);
      // branch for IE/Windows ActiveX version
        }
       else if (window.ActiveXObject)
        {
          isIE = true;
          req = new ActiveXObject("Microsoft.XMLHTTP");
          if (req) 
            { 
              req.onreadystatechange = processReqChange_saveFormRoles;
              req.open("POST", url, false);
              req.setRequestHeader("Content-Type","text/xml;charset=utf-8");
              //alert(this.orgPanelHandler.orgActorsDoc.xml)
              req.send(this.orgPanelHandler.orgActorsDoc);
            }
        }*/
        return formManager.saveFormRoleSuccess;  	
 }

function processReqChange_saveFormRoles()
   {
      
      if(req.readyState==4)
         {  
           if (req.status == 200) 
             { 
               if(req.responseText=="OK")
                  formManager.saveFormRoleSuccess = true;
               else
                 alert("\u9519\u8bef:"+req.responseText.replace("<error-message>","").replace("</error-message>",""));
             }
           else 
             { 
               alert("\u4fdd\u5b58\u5931\u8d25\uff01\n" +req.statusText+"\n"+req.responseText+"!");
             }
         }
   } 
 

/*--------------save privilege to the database
*/
function savePrivilege()
    {
       var saveseccess = saveFormRoles();
       if(!saveseccess)
         return;
       var node = this.formManager.privilegeDoc.selectSingleNode("//collection")
       if(node!=null)
         {
           node.text = getActualCollection();
           node.text = replaceSE(node.text,";","");
           var array_collection = node.text.split(";")
           var str_actors = node.text;
           var invisibleNodes = this.formManager.privilegeDoc.selectNodes("//invisible");
           if(invisibleNodes.length>0)
           {
              for(var j=0;j<invisibleNodes.length;j++)
               {
               	   var figureName = invisibleNodes[j].parentNode.getAttribute("name")
                   //remove not exist element privilege
                   var figure_obj = document.getElementById(figureName);
                   if(figure_obj==null)
                     {
                       var privilegeNode = this.formManager.privilegeDoc.selectSingleNode("//privilege")
                       if(privilegeNode!=null)
                         {
                           var elementNode   = privilegeNode.selectSingleNode("element[@name='"+figureName+"']")
                           if(elementNode!=null)
                             {
                               privilegeNode.removeChild(elementNode)
                               j--;
                               continue;
                             }
                         }
                     }
                   var array_invi = invisibleNodes[j].text.split(";")
                   for(var i=0;i<array_invi.length;i++)
                    {
                      var indx = array_collection.contain(array_invi[i])
                      if(indx==-1)
                       {
                         //removeInvisiblePrivilege(figureName,array_invi[i]);
                         removeAllPrivilege(array_invi[i]);
                       }
                    }
                   if(invisibleNodes[j])
                   invisibleNodes[j].text =  replaceSE(invisibleNodes[j].text,";","");
                   
              }
           }
           
           var editableNodes = this.formManager.privilegeDoc.selectNodes("//editable");
           if(editableNodes.length>0)
           {
              for(var m=0;m<editableNodes.length;m++)
               {
                   if(editableNodes[m].parentNode==null)
                     {
                       continue;
                     }
                   var figureName = editableNodes[m].parentNode.getAttribute("name");
                   //remove not exist element privilege
                   var figure_obj = document.getElementById(figureName);
                   if(figure_obj==null)
                     { 
                       var privilegeNode = this.formManager.privilegeDoc.selectSingleNode("//privilege")
                       if(privilegeNode!=null)
                         {
                           var elementNode   = privilegeNode.selectSingleNode("element[@name='"+figureName+"']")
                           if(elementNode!=null)
                             {
                               privilegeNode.removeChild(elementNode)
                               //m--;
                               continue;
                             }
                         }
                     }
                   //remove editable privilege when element add readOnly attribute
                  else if(figure_obj.getAttribute("readonly")=="true")
                    {
                    	
                        var elementNode    = this.formManager.privilegeDoc.selectSingleNode("//element[@name='"+figureName+"']");
                        var editableNode   = elementNode.selectSingleNode("editable");
                        if(editableNode!=null)
                           {
                             elementNode.removeChild(editableNode)
                             //m--;
                             continue;
                           }                     
                         
                    }
                   var array_edi = editableNodes[m].text.split(";")
                   if(editableNodes[m].text!='')
                   for(var kkk=0;kkk<array_edi.length;kkk++)
                    {
                      var indx = array_collection.contain(array_edi[kkk]);
                      if(indx==-1)
                       {
                         //removeEditablePrivilege(figureName,array_edi[k]);
                         removeAllPrivilege(array_edi[kkk]);
                       }
                    }
                  if(editableNodes[m])
                    editableNodes[m].text = replaceSE(editableNodes[m].text,";","");
              }
           }
           var printableNode = this.formManager.privilegeDoc.selectSingleNode("//printable");
           if(printableNode!=null)
            {
              var array_printIds = printableNode.text.split(";");
              for(var pr=0;pr<array_printIds.length;pr++)
                {
                  if(str_actors.indexOf(array_printIds[pr])==-1)
                    {  
                       removePrintblePrivilege(array_printIds[pr]);
                    }
                  if(array_printIds[pr])
                  array_printIds[pr].text =  replaceSE(array_printIds[pr].text,";","");
                }
            }
           
           var submitableNode = this.formManager.privilegeDoc.selectSingleNode("//submitable");
           if(submitableNode!=null)
            {
              var array_submitIds = submitableNode.text.split(";");
              for(var sb=0;sb<array_submitIds.length;sb++)
                {
                  
                  if(array_submitIds[sb]!=""&&str_actors.indexOf(array_submitIds[sb])==-1)
                    { 
                       removeSubmitablePrivilege(array_submitIds[sb]);
                    }
                }
              if(array_submitIds[sb])
              array_submitIds[sb].text =  replaceSE(array_submitIds[sb].text,";","");
            }
         }

       var url="http://"+document.location.host+"/"+getServletPath()+"/formmanagerlistener?formcommand=saveformprivilege"

       if(window.XMLHttpRequest){
         //If IE7, Mozilla, Safari, etc: Use native object
         req = new XMLHttpRequest();
       }else
       if(window.ActiveXObject){
          // ...otherwise, use the ActiveX control for IE5.x and IE6
          isIE = true;
          req = new ActiveXObject("Microsoft.XMLHTTP");
       }
       if(req){
        	req.onreadystatechange = processReqChange;
            req.open("POST", url, false);
            req.setRequestHeader("Content-Type","text/xml;charset=utf-8");
            //alert(this.orgPanelHandler.orgActorsDoc.xml)
            req.send(this.formManager.privilegeDoc.xml);
       }
              
      /* // branch for native XMLHttpRequest object
       if (window.XMLHttpRequest) 
         {
           req = new XMLHttpRequest();
           req.onreadystatechange = processReqChange;
           req.open("POST", url, true);
           req.setRequestHeader("Content-Type","text/xml;charset=utf-8")     
           req.send(this.formManager.privilegeDoc.xml);
      // branch for IE/Windows ActiveX version
        }
       else if (window.ActiveXObject)
        {
          isIE = true;
          req = new ActiveXObject("Microsoft.XMLHTTP");
          if (req) 
            { 
              req.onreadystatechange = processReqChange;
              req.open("POST", url, true);
              req.setRequestHeader("Content-Type","text/xml;charset=utf-8")
              req.send(this.formManager.privilegeDoc);
            }
        }*/

}


function processReqChange()
   {
      if(req.readyState==4)
         {
           if (req.status == 200) 
             { 
               if(req.responseText.indexOf("<error-message>")!=-1)
                    {
                      alert("\u9519\u8bef:"+req.responseText.replace("<error-message>","").replace("</error-message>",""));
                    }
               else if(req.responseText=="OK")
                 {
                   alert("\u4fdd\u5b58\u6210\u529f\uff01");
                 }
             }
           else 
             {
                alert("\u4fdd\u5b58\u5931\u8d25\uff01\n" +req.statusText+"\n"+req.responseText);
             }
         }
   }
/*------------showFormPage
*
* @htmltext :string,all pages outerHTML
*/
function showFormPage(htmltext){
  
  if(formManager.formPage==null)
    { //alert('aaaaa')
      formManager.formPage = document.getElementById("form_page")
      //alert(document.getElementById("form_page"));
      if(formManager.formPage==null)
         return;
    }
    
  this.formManager.formPage.innerHTML=""; 
  formManager.formPage.insertAdjacentHTML("afterBegin",htmltext)
  //alert(formManager.formPage);
  selectDatasets()
  showPage(1);
  showPageForNumber(formManager.formPage)
  //alert();
}

/*----------------------
*/
function selectDatasets()
{
   var len = formManager.formPage.childNodes.length
   if(len==0)
      return;
   var datasets = formManager.formPage.childNodes[len - 1]
   if(datasets&&datasets.hasChildNodes()&&datasets.childNodes[0].id=="datasets"&&datasets.childNodes[0].type=="hidden")
     {
       formManager.datasets=datasets.childNodes[0].value.replace(/(^\s*)|(\s*$)/g, "");
       formManager.formPage.removeChild(datasets);
     }
}
/*
*  Array.remove(dx)
*/

Array.prototype.remove = function(dx)
  {
    if(isNaN(dx)||dx>this.length){return false;}
    this.splice(dx,1);
  }

/*
*  Array.contain(obj)
**/
Array.prototype.contain = function(obj)
  {
    var rv=-1//returnValue
    for(i=0;i<this.length;i++)
      {
        if(this[i]==obj)
          {
            rv=i;
            break;
          }
      }
    return rv;
  }
/*
*function:setAttributePanelNull()
*
*
*/
function setAttributePanelNull()
   {
     formManager.visible.checked=false
     formManager.editable.checked=false
   }

/*function:showPageForNumber()
*
*@formpage :object,the form page number DIV
*/
function showPageForNumber(formpage)
   {
     var pageNo=formpage.childNodes.length
     formManager.maxNo = pageNo
     //var pageNoDIV=formpage.previousSibling
     var pageNoDIV = document.getElementById("page_number");
     var width = formpage.childNodes[0].style.posWidth
     //pageNoDIV.style.width= width
     //pageNoDIV.style.marginLeft="0"
     var tabstr = "<table border='0' cellpadding='0'  cellspacing='0' class='main_tab_table_head_my'><tr><td valign='bottom' nowrap >";
     
     for(i=1;i<=pageNo;i++)
       {

         if(i==1)
           {
              tabstr = tabstr + "<table height='27' border='0' cellpadding='0' cellspacing='0' class='table_base' onclick = 'showPageNo()'>"
         		+ "<tr><td width='5'><img src='css/images/tab/main_checked_left.gif' width='20' height='27'></td>"
         		+ "<td align='center' nowrap class='main_tab_checked_center' no="+i+">"+formpage.childNodes[i-1].name+"</td>"
         		+ "<td width='5' align='right'><img src='css/images/tab/main_checked_right.gif' width='20' height='27'></td>"
         		+ "</tr></table>"
           }
         else
          {
             tabstr = tabstr + "<table height='27' border='0' cellpadding='0' cellspacing='0' class='table_base'  onclick = 'showPageNo()'>"
         		+ "<tr><td width='5'><img src='css/images/tab/main_unchecked_left.gif' width='20' height='27'></td>"
         		+ "<td align='center' nowrap class='main_tab_unchecked_center' no="+i+">"+formpage.childNodes[i-1].name+"</td>"
         		+ "<td width='5' align='right'><img src='css/images/tab/main_unchecked_right.gif' width='20' height='27'></td>"
         		+ "</tr></table>"
          }
         
         tabstr = tabstr + "</td><td align='left' valign='bottom' nowrap >";
        }
       tabstr = tabstr + "</td></tr></table>";
       
       pageNoDIV.innerHTML = tabstr;
       formManager.pageNoDIV = pageNoDIV;
       
       var pagenowidth = pageNoDIV.offsetWidth - 200;//formpage.offsetWidth-40
       formManager.formpageOffsetWidth=pagenowidth
       
       //alert(pageNoDIV.offsetWidth)
       var tempwidth=0;
       
       var stopno=0;
       var tempobj = pageNoDIV.childNodes[0].childNodes[0].childNodes[0];
       
       for(var i=1;i<tempobj.childNodes.length-1;i++)
       {
         tempwidth = tempwidth+tempobj.childNodes[i].offsetWidth
         if(tempwidth > pagenowidth)
         {
           stopno =i-1;
           break;
         }
       } 
       //alert(tempwidth+":"+pagenowidth+":"+stopno)
       if(tempwidth > pagenowidth)
       {
         var lastwidth=tempwidth - pagenowidth;
         for(var i=stopno;i<tempobj.childNodes.length;i++)
           {
             tempobj.childNodes[i].style.display="none"
           }
          
          formManager.endDisNo=stopno-1
          document.getElementById("turnleft").style.visibility = "visible";
          document.getElementById("turnright").style.visibility = "visible";
       }
}
function MyScroll_Change2(no)
{ 
  var startDisNo  = formManager.startDisNo
  var endDisNo    = formManager.endDisNo
  var ctrlWidth   = 20
  var tempobj = formManager.pageNoDIV.childNodes[0].childNodes[0].childNodes[0];
  if(no==1)
    {
      if(endDisNo==formManager.maxNo-1)
      {
        return;
      }
      else
      {  //alert()
         formManager.endDisNo = endDisNo+1
         tempobj.childNodes[formManager.endDisNo].style.display="inline"
         tempobj.childNodes[startDisNo-1].style.display="none"
         startDisNo = startDisNo+1;
         formManager.startDisNo = startDisNo
      }
    }
  if(no==-1)
    {
      if(startDisNo==1)
       {
         return;
       }
       else
       {
            tempobj.childNodes[formManager.endDisNo].style.display="none"
            formManager.endDisNo = endDisNo-1
            tempobj.childNodes[startDisNo-2].style.display="inline"
            startDisNo = startDisNo-1;
            formManager.startDisNo = startDisNo
       }
    }
}

function showPageNo()
   {
     var page=event.srcElement

     if(page.tagName=="IMG"){
        	page = page.parentElement.parentElement.childNodes[1];	 
     } 
     //alert(page.no)
     showPage(page.no)
     
     var pare=page.parentElement;
     var tab_table = pare.parentElement.parentElement.parentElement.parentElement;
     var len = tab_table.childNodes.length-1;
     var temp ;
     
     for(i=0;i<len;i++){
        if(len=='1') break;
        temp = tab_table.childNodes[i].childNodes[0].childNodes[0].childNodes[0];
        temp.childNodes[0].childNodes[0].src="css/images/tab/main_unchecked_left.gif";//"url("+formManager.pageno_bg_url_check_1+")";
     	temp.childNodes[1].className = "main_tab_unchecked_center";
     	temp.childNodes[2].childNodes[0].src="css/images/tab/main_unchecked_right.gif";
     }
     pare.childNodes[0].childNodes[0].src="css/images/tab/main_checked_left.gif";//"url("+formManager.pageno_bg_url_check_1+")";
     pare.childNodes[1].className = "main_tab_checked_center";
     pare.childNodes[2].childNodes[0].src="css/images/tab/main_checked_right.gif";

     showAllWidgetsStyle(this.userid);
   }
function showPage(no)
   {
     var len=formManager.formPage.childNodes.length
     
     for(i=0;i<len;i++)
       {
        formManager.formPage.childNodes[i].style.display="none"
       }
     formManager.formPage.childNodes[no - 1].style.display="block"
     this.formManager.displayPageNo=no;
}
/***********************************/

/*---------------------
*/
function main_mousedown()
   {
    if(event.button==2)
      return;
    selectRect.mousedown=true;
    this.selectRect.selRect=null;
    var formpage=formManager.formPage
    //var selRect=document.all("selRect")[this.formManager.displayPageNo-1]
           //selRect=document.getElementById("selRect")
    var selRect = event.srcElement;//.lastChild
    if(selRect==null||selRect.tagName!="DIV"||!selRect.hasChildNodes())
       return;
    selRect = selRect.lastChild

    selectRect.fpLeft=formpage.style.posLeft;
    selectRect.fpLeft =formpage.style.posTop;
    this.selectRect.selRect=selRect
    selRect.style.posLeft=event.offsetX
    selRect.style.posTop=event.offsetY
    selRect.style.posWidth=0;
    selRect.style.posHeight=0;
    this.selectRect.rleft=event.screenX;
    this.selectRect.rtop=event.screenY;
    this.selectRect.selRect.style.display="block";
  }

function main_mousemove()
  {
    if(selectRect.mousedown)
      {
      	if(this.selectRect.selRect==null)
      	  return;
        var width=event.screenX-this.selectRect.rleft
        var height=event.screenY-this.selectRect.rtop
        this.selectRect.selRect.style.posWidth=width
        this.selectRect.selRect.style.posHeight=height
      }
  }
function main_mouseup()
  {
   if(event.button==2)
     return;
   selectRect.mousedown=false;
   if(this.selectRect.selRect==null)
    return;
   if(this.selectRect.selRect.style.display=="none")
    return;
   this.selectRect.selRect.style.display="none";
   var objA=getSelectObject()
   if(objA!=null)
     showAllBorder(objA)
  }
//
function getSelectObject()
   {
     var page=formManager.formPage.childNodes[this.formManager.displayPageNo-1]
     var len=page.childNodes.length
     var retV=new Array()
     for(i=0;i<len-1;i++)
        {
          var obj=page.childNodes[i]
          if(obj.childNodes[0]==null||obj.childNodes[0].name!="border_"+obj.name)
             continue;
          var st=obj.style
          var rl,rt,rlw,rlh;
          if(this.selectRect.selRect.style.posWidth<0)
            {
              rl=this.selectRect.selRect.style.posLeft+this.selectRect.selRect.style.posWidth
              rlw=this.selectRect.selRect.style.posLeft
            }
          else
            {
              rl=this.selectRect.selRect.style.posLeft
              rlw=this.selectRect.selRect.style.posLeft+this.selectRect.selRect.style.posWidth	
            }
          if(this.selectRect.selRect.style.posHeight<0)
            {
              rt=this.selectRect.selRect.style.posTop+this.selectRect.selRect.style.posHeight
              rlh=this.selectRect.selRect.style.posTop
            }
          else
            {
              rt=this.selectRect.selRect.style.posTop	
              rlh=this.selectRect.selRect.style.posTop+this.selectRect.selRect.style.posHeight
            }
          var ol=st.posLeft+st.posWidth
          var ot=st.posTop+st.posHeight
          if(ol<rl||ot<rt||rlw<st.posLeft||st.posTop>rlh)
           {
           } 
         else
           {
            retV[retV.length]=obj;
           }
        }
  return retV;
}


function showAllBorder(objA)
   {
     figure_onblur();
     for(m=0;m<objA.length;m++)
        {
          figure_setBorder(objA[m])
          if(formManager.K_list.contain(objA[m])==-1)
            {
              formManager.K_list[formManager.K_list.length]=objA[m]
            } 
        }
     showPrivilege()
}

function getPrivilegeDoc()
    {
       if(this.formManager.privilegeDoc==null||this.formManager.privilegeDoc.xml=="") // 
         { 
           var str_xml='<?xml version="1.0" encoding="UTF-8"?>'+
                       '<privilege><privilegeID>'+this.formManager.prvID+'</privilegeID>'+
                       '<formID>'+this.formManager.formID+'</formID>'+
                       '<description></description>'+
                       '<author></author>'+
	               '<creationTime></creationTime>'+
	               '<modifyTime></modifyTime>'+
                       '<collection></collection>'+
                       '<datasets></datasets>'+
                       '<printable></printable>'+
                       '<submitable></submitable>'+
                       '<version>2.0.1</version>'+
                       '</privilege>'
          formManager.privilegeDoc = new ActiveXObject("MSXML2.DOMDocument.4.0");
          formManager.privilegeDoc.async = false;
          formManager.privilegeDoc.loadXML(str_xml)
         }
       return this.formManager.privilegeDoc;
    }


function initorg(orgTreePanelid,orgActorPanelid,privilegeOrgPanelid)
{
  this.orgPanelHandler.orgtreePanel    = document.getElementById(orgTreePanelid)
  this.orgPanelHandler.orgActorPanel   = document.getElementById(orgActorPanelid)
  this.orgPanelHandler.addPNode_List    = new Array();
  this.orgPanelHandler.delNode_List    = new Array();
  this.orgPrivilgePanelHandler.orgActorPanel =document.getElementById(privilegeOrgPanelid)
  
  
  //add 2005.04.20
  //this.orgPanelHandler.orgtreePanel.innerHTML="<b>\u8f7d\u5165\u4e2d...</b>"
  //end
}
 
/**
*  get org form server
*!XMLHttp
**/ 
function loadRoleOrg(type,Bool_reload)
{     
      var xmlhttp=new ActiveXObject("Microsoft.XMLHTTP")
      var formId = location.search.replace('?formID=', ''); 
      if(formId==null||formId=="")
        return;
      this.formManager.formID=formId    
      var b_reload
      if(!Bool_reload)
        {
          b_reload= '';
        }
      else
      	b_reload= 'true'
      var url="http://"+document.location.host+"/"+getServletPath()+"/formmanagerlistener?formcommand=loadorgtree&reload="+b_reload;
      xmlhttp.open("POST",url,false)
      xmlhttp.onreadystatechange=function()
                                     {
                                       //alert(xmlhttp.status)
                                       if(xmlhttp.readyState==4)
                                         {
                                           if (xmlhttp.status == 200)
                                             {
                                                 if(xmlhttp.responseText.indexOf("<error-message>")!=-1)
                                                    {
                                                       alert("\u9519\u8bef:"+xmlhttp.responseText.replace("<error-message>","").replace("</error-message>",""));
                                                       return history.go(-1);
                                                     }
                                               //Get role and firstPerson's information from backConsle
                                               var respone_array = xmlhttp.responseText.split("||");
                                               var rxml = respone_array[0];
                                               var fpxml = respone_array[4];
                                               //alert(orgPanelHandler.roleState);
                                               //if(orgPanelHandler.roleState==false){
                                               	    showRoleTree(rxml);
                                               		//orgPanelHandler.roleState = true;
                                               //}
                                               if(type=="privilege")
                                               	  showPersonTree(fpxml);   
                                              
                                             }
                                           else if(xmlhttp.status == 404)
                                             {
                                             	alert("\u7ec4\u7ec7\u673a\u6784\u8bfb\u53d6\u5931\u8d25\uff01\n" + url +"\u4e0d\u5b58\u5728"+xmlhttp.responseText);
                                             	this.orgPanelHandler.orgtreePanel.innerHTML="";
                                             }
                                           else 
                                             {
                                                alert("\u7ec4\u7ec7\u673a\u6784\u8bfb\u53d6\u5931\u8d25\uff01\n" + xmlhttp.status +"\n"+ xmlhttp.responseText);
                                                this.orgPanelHandler.orgtreePanel.innerHTML="";
                                             }
                                         }
                                      }
     xmlhttp.send(null);
     
}
//*********************************
//**** load formroles tree*********
//********add by liuying 2007-1-11*********** 
function loadFormActorTree(formID,prvID,workflow){
      
	  if(workflow!=null&&workflow!=""&&workflow!="undefined")
      return;
      var xmlhttp=new ActiveXObject("Microsoft.XMLHTTP")
	  var url="http://"+document.location.host+"/"+getServletPath()+"/formmanagerlistener?formcommand=loadformactors&formID="+formID+"&prvID="+prvID;
      xmlhttp.open("POST",url,false)
      xmlhttp.onreadystatechange=function()
                                     {
                                       if(xmlhttp.readyState==4)
                                         {
                                           if (xmlhttp.status == 200)
                                             {
                                                 if(xmlhttp.responseText.indexOf("<error-message>")!=-1)
                                                    {
                                                       alert("\u9519\u8bef:"+xmlhttp.responseText.replace("<error-message>","").replace("</error-message>",""));
                                                       return history.go(-1);
                                                     }
                                             
                                                 var personsdoc = xmlhttp.responseText;
						                         var xmlDoc=new ActiveXObject("MSXML2.DOMDocument.4.0");
											     xmlDoc.async=false;
						                         xmlDoc.loadXML(personsdoc);
						                         orgPanelHandler.orgPersonsDoc=xmlDoc;
						                        
                                             }
                                           else if(xmlhttp.status == 404)
                                             {
                                             	alert("\u7ec4\u7ec7\u673a\u6784\u8bfb\u53d6\u5931\u8d25\uff01\n" + url +"\u4e0d\u5b58\u5728"+xmlhttp.responseText);
                                             }
                                           else 
                                             {
                                                alert("\u7ec4\u7ec7\u673a\u6784\u8bfb\u53d6\u5931\u8d25\uff01\n" + xmlhttp.status +"\n"+ xmlhttp.responseText);
                                             }
                                         }
                                      }
     xmlhttp.send(null);
}

function loadPersonOrg(Bool_reload)
{
      if(orgPanelHandler.orgIndexTemp==orgPanelHandler.orgIndex){
         return;
      }
      orgPanelHandler.orgIndexTemp = orgPanelHandler.orgIndex;
      var xmlhttp=new ActiveXObject("Microsoft.XMLHTTP")
      var formId = location.search.replace('?formID=', ''); 
      if(formId==null||formId=="")
        return;
      this.formManager.formID=formId    
      var b_reload
      if(!Bool_reload)
        {
          b_reload= '';
        }
      else
      	b_reload= 'true'
     
      var url="http://"+document.location.host+"/"+getServletPath()+"/formmanagerlistener?formcommand=loadorgtree&reload="+b_reload+"&index="+orgPanelHandler.orgIndex;
      xmlhttp.open("POST",url,false)
      xmlhttp.onreadystatechange=function()
                                     {
                                       //alert(xmlhttp.status)
                                       if(xmlhttp.readyState==4)
                                         {
                                           if (xmlhttp.status == 200)
                                             {
                                                 if(xmlhttp.responseText.indexOf("<error-message>")!=-1)
                                                    {
                                                       alert("\u9519\u8bef:"+xmlhttp.responseText.replace("<error-message>","").replace("</error-message>",""));
                                                       return history.go(-1);
                                                     }
                                               //Get Person's information from backConsle  
                                               var respone_array = xmlhttp.responseText.split("||");
                                               var index = respone_array[2];
                                               var xml = respone_array[1];
                                               var personSize = respone_array[3];
                                               orgPanelHandler.orgIndex = orgPanelHandler.orgIndex + parseInt(index);
                                               if(orgPanelHandler.personState==false){
                                                 showPersonTree(xml);
                                                 if(orgPanelHandler.orgIndex==personSize){
                                                  orgPanelHandler.personState = true;     
                                                  }
                                               }  
                                                 
                                              }
                                           else if(xmlhttp.status == 404)
                                             {
                                             	alert("\u7ec4\u7ec7\u673a\u6784\u8bfb\u53d6\u5931\u8d25\uff01\n" + url +"\u4e0d\u5b58\u5728"+xmlhttp.responseText);
                                             	this.orgPanelHandler.orgtreePanel.innerHTML="";
                                             }
                                           else 
                                             {
                                                alert("\u7ec4\u7ec7\u673a\u6784\u8bfb\u53d6\u5931\u8d25\uff01\n" + xmlhttp.status +"\n"+ xmlhttp.responseText);
                                                this.orgPanelHandler.orgtreePanel.innerHTML="";
                                             }
                                         }
                                      }
     xmlhttp.send(null);
     
}
/**2006.11.22
*author fuqiang
*when you input what you want to search person's or role's name then click the search button ,it will quickly show the person and role 
*/
function showField(selfobj)
{   
    var next1 = selfobj.nextSibling
    if(next1.innerHTML=="")
       {
       	 if(selfobj.id=="roleparent")
       	  {
       	        if(orgPanelHandler.orgDoc!=null)
       	          {
       	            var crolelen = orgPanelHandler.orgDoc.selectNodes("//roles/role").length
       	            var inhtml = "";
       	            for(var i=0;i<crolelen;i++)
       	             {
       	     	      inhtml=inhtml+orgPanelHandler.orgDoc.selectNodes("//roles/role")[i].transformNode(orgPanelHandler.orgXslDoc)
       	             }
       	             next1.innerHTML=inhtml
       	          }
       	  }
       	 else if(selfobj.id=="personparent")
       	  {
       	        if(orgPanelHandler.orgDoc!=null)
       	          {
       	           
       	           var crolelen = orgPanelHandler.orgDoc.selectSingleNode("//persons")
       	           var inhtml=crolelen.transformNode(orgPanelHandler.orgXslDoc)
       	           next1.innerHTML=inhtml
       	           
       	             for(var j=0;j<next1.childNodes.length;j++)
       	              { 
       	              	next1.childNodes[j].childNodes[0].childNodes[0].setAttribute("src",Img_Obj_T.src)
       	              	next1.childNodes[j].childNodes[0].childNodes[0].style.visibility="hidden";
       	              	next1.childNodes[j].childNodes[0].childNodes[1].setAttribute("src",Img_Obj_personNode.src)
       	              }
       	             next1.lastChild.childNodes[0].childNodes[0].src=Img_Obj_L.src  
       	             next1.lastChild.childNodes[0].childNodes[0].style.visibility="hidden"     	           
       	          }       	  
       	  }
       	 else 
       	  {
       	 var node = orgPanelHandler.orgDoc.selectSingleNode("//role[@id='"+selfobj.id+"']")
       	 if(node!=null)
       	  {
       	    var crolelen = node.selectNodes("role").length
       	    var inhtml = "";
       	    for(var i=0;i<crolelen;i++)
       	     {
       	     	inhtml=inhtml+node.selectNodes("role")[i].transformNode(orgPanelHandler.orgXslDoc)
       	     }
       	    next1.innerHTML=inhtml
       	  }
         }
       }
    var isRoot = false;
    if(next1&&(event.srcElement.tagName=="IMG"||event.srcElement.tagName=="INPUT"))
       {  
       	  if(selfobj.name == 'actor_root')
       	     isRoot=true
          if(next1.style.display=="block")
            {
              next1.style.display="block"
              if(isRoot)
                event.srcElement.src=orgPanelHandler.Img_actor_open
              else
              	event.srcElement.src=orgPanelHandler.Img_search
            }
         else
            {
            //???????????????????????????????????????????????????????????????????????????????????????????????????????????????orgtree.xsl????????????????????????<span>???
            if(next1.innerHTML!=null&&next1.innerHTML!="")
             {
	         	next1.style.display="block"
         	 }

         	if(isRoot)
         	{
                  event.srcElement.src=orgPanelHandler.Img_actor_open         	
         	}
            else{
                  event.srcElement.src=orgPanelHandler.Img_search
            }
            }
       }
}
var timer;
function time(){
    timer = window.setInterval(loadPersonOrg,4000);
}
function getIE(e){
if(e==null)
{
  return;
}
var t=e.offsetTop;
var l=e.offsetLeft;
//while(e=e.offsetParent){
//t+=e.offsetTop;
//l+=e.offsetLeft;
//} 
document.all.orgTreeSelectPanel.scrollTop = t
document.all.orgTreeSelectPanel.scrollLeft = l
}
var selectedItem = [];

function search() {
   if(selectedItem.length!=0){
    	for(var i=0;i<selectedItem.length;i++){
	    	turnOffLight(selectedItem[i]);
    	}
    }
    var str=document.getElementById("searchstr").value;
    if(str=="") return;
    var rNode2 = orgPanelHandler.orgDoc.selectNodes("//role[starts-with(@name,'"+str+"')]");
    var pNode2 = orgPanelHandler.orgDoc.selectNodes("//persons/span[starts-with(@fullname,'"+str+"')]");
    if(rNode2!=null){    
    var firstRoleId; 
    for(var k=0;k<rNode2.length;k++){  
    var stack= [];
       var rNode = rNode2(k);
       var rId=rNode.getAttribute("id");
       if(k==0){
       firstRoleId = rId;
       }
       stack.push(rId);
       while(rNode.parentNode!=null){
        var parent=rNode.parentNode;
        
        if(parent==orgPanelHandler.orgDoc)
          break;
        if(parent.getAttribute("id")!=null){
           stack.push(parent.getAttribute("id"));
        }

         rNode=parent;
      }
      //show
      stack.push("roleparent");
      var nodeId;
      var spanObj;
      for(i=stack.length-1;i>=0;i--)
      {
        nodeId = stack.pop();
        spanObj= document.getElementById(nodeId);
        if(spanObj!=null)
        { 
           showField(spanObj);
        }
        if(i==0){
            var labelObj =  spanObj.childNodes[0].childNodes[2];
            if(labelObj.tagName=="IMG")
             {
                labelObj = labelObj.parentNode.childNodes[3];
                
             }
            if(labelObj.tagName=="LABEL"){
                turnLight(labelObj)
                getIE(labelObj)
            }
    		selectedItem[selectedItem.length] = labelObj;
        }
      }
    }
    if(firstRoleId!=null){
    var firstPersonObj = document.getElementById(firstRoleId)
    if(firstPersonObj!=null){
     getIE(firstPersonObj)
    }
    }
    }
    if(pNode2!=null){    
     var firstPersonId;
     for(var k=0;k<pNode2.length;k++){  
     var stack= [];
       var pNode = pNode2(k);     
      var pId=pNode.getAttribute("id");
       if(k==0){
        firstPersonId = pId;
       }
       stack.push(pId);
      var parent=pNode.parentNode;
           stack.push(parent.getAttribute("id"));
      stack.push("personparent");
      var nodeId;
      var spanObj;
      for(i=stack.length-1;i>=0;i--)
      {
        nodeId = stack.pop();
        spanObj= document.getElementById(nodeId);
        if(spanObj!=null)
        { 
           showField(spanObj);
        }
        if(i==0){
            var labelObj =  spanObj.childNodes[0].childNodes[2];     
    		turnLight(labelObj)
    		selectedItem[selectedItem.length] = labelObj;
        }

      }
    }
     if(firstPersonId!=null){
       var firstRoleObj = document.getElementById(firstPersonId);
       if(firstRoleObj!=null){
         getIE(firstRoleObj);
       }
     }
    }
    if(this.orgPanelHandler.addPNode_List==null||this.orgPanelHandler.addPNode_List.length==0)
       return;
     var roleid = this.orgPanelHandler.addPNode_List[0].split(";")[0];
     clear_List(this.orgPanelHandler.addPNode_List);   
}
function turnLight(obj){
    obj.style.color="#FFFFFF"
    obj.style.backgroundColor="background"
}
function turnOffLight(obj){
    obj.style.color=""
    obj.style.backgroundColor=""
}
/**2006.11.22
*author fuqiang
*when click the showText button ,it will show textbox 
*/
function showText(){
var flag = searchstr.style.visibility;
if(flag=="visible")
  {
    search();
    searchstr.style.visibility = "hidden";
  }
else
{
  searchstr.style.visibility = "visible";
}
}
function clickScroll(){
	var d=orgTreeSelectPanel.scrollHeight-orgTreeSelectPanel.clientHeight
	if((orgTreeSelectPanel.scrollTop==d)||(orgTreeSelectPanel.scrollHeight-orgTreeSelectPanel.scrollTop-orgTreeSelectPanel.clientHeight)>15){
        loadPersonOrg()    
        this.orgPanelHandler.scrollcount=0
	}
}
//2005.04.13/16:44
/**
* Fires when click the fresh button,this will reload the org tree.
*/
function refreshOrgTree(type)
{
  //this.orgPanelHandler.orgtreePanel.innerHTML="<b>\u8f7d\u5165\u4e2d...</b>"
  //this.orgPanelHandler.orgDoc=null
  this.orgPanelHandler.orgXslDoc=null
  loadRoleOrg(type,true)
}

/**
* insert html text to org DIV
*
**/
function showRoleTree(roleTree)
{
     var xmlDoc=new ActiveXObject("MSXML2.DOMDocument.4.0");
     xmlDoc.async=false;
     xmlDoc.loadXML(roleTree);
     if(xmlDoc==null)
         return;
     this.orgPanelHandler.orgDoc = xmlDoc
     
     
     if(orgPanelHandler.orgXslDoc==null)
       {
         var orgXslDoc=new ActiveXObject("MSXML2.DOMDocument.4.0");
         orgXslDoc.async = false;
         orgXslDoc.load(orgPanelHandler.orgXslUrl)
         if(orgXslDoc==null)
          return;
         else
           this.orgPanelHandler.orgXslDoc = orgXslDoc;
      }
      
    var orgtreeHTML = this.orgPanelHandler.orgDoc.transformNode(this.orgPanelHandler.orgXslDoc)  
    
    // remove by liuying
    //orgPanelHandler.orgtreePanel.insertAdjacentHTML("beforeEnd",orgtreeHTML);
    //orgPanelHandler.orgtreePanel.childNodes[0].childNodes[1].insertAdjacentHTML("beforeEnd",orgtreeHTML);
    //LoadAttribute(formManager.formID,formManager.formID);
    //alert(this.orgPanelHandler.orgDoc.xml)
    //alert(formManager.formID)
    if(!loading){
       loading = true;
	   LoadAttribute(formManager.formID,formManager.formID);
	 }
}
var loading = false;
function setPersonTree(personTree)
{    
     var xmlDoc=new ActiveXObject("MSXML2.DOMDocument.4.0");
     xmlDoc.async=false;
     xmlDoc.loadXML(personTree);
     if(xmlDoc==null)
         return;
     var orgNode = this.orgPanelHandler.orgDoc.selectSingleNode("org");
     if(orgNode==null)
	     var newDoc=new ActiveXObject("MSXML2.DOMDocument.4.0");
	     newDoc.async=false;
	     var firstXml = xmlDoc.xml
	     if((firstXml+"").indexOf(person+"")!=-1){
	     newDoc.loadXML("<org>"+this.orgPanelHandler.orgDoc.xml+xmlDoc.xml+"</org>");
	     }else{
	     newDoc.loadXML("<org>"+this.orgPanelHandler.orgDoc.xml+xmlDoc.xml+person+"</org>");
	     }
	     if(xmlDoc==null)
	         return;
	     this.orgPanelHandler.orgDoc = newDoc;

}
function showPersonTree(personTree)
{    
     var xmlDoc=new ActiveXObject("MSXML2.DOMDocument.4.0");
     xmlDoc.async=false;
     xmlDoc.loadXML(personTree);
     if(xmlDoc==null)
         return;
     var orgNode = this.orgPanelHandler.orgDoc.selectSingleNode("org");
     //alert(xmlDoc.xml)
     if(orgNode==null){
	     var newDoc=new ActiveXObject("MSXML2.DOMDocument.4.0");
	     newDoc.async=false;
	     //??????????????????????????????????????????doc?????????
	     newDoc.loadXML("<org>"+this.orgPanelHandler.orgDoc.xml+xmlDoc.xml+"</org>");
	     if(xmlDoc==null)
	         return;
	     this.orgPanelHandler.orgDoc = newDoc;
	     //LoadAttribute(formManager.formID,formManager.formID);
     }else{
          var nodes = xmlDoc.selectNodes("//persons/span");
          var pnode = orgNode.selectSingleNode("persons");
          if(pnode==null){
             pnode = this.orgPanelHandler.orgDoc.createElement("persons");
             orgNode.appendChild(pnode);
          }
          if(nodes!=null&&pnode!=null)
          for(var i=0;i<nodes.length;i++){
             pnode.appendChild(nodes[i]);
          }
     }
     
    //2007-11-02 modify by ly_liuy@neusoft.com
    //under Jboss4.0.0 wrong,and replace with the next line
    //var nodes = personTree;

    var nodes = xmlDoc.childNodes[0].xml;        
    //alert(personTree.xml);
    orgPanelHandler.orgtreePanel.childNodes[0].childNodes[3].insertAdjacentHTML("beforeEnd",nodes);
    //alert();
    
}


function LoadOrgActors(formId,prvId,workflow)
{  
   var xmlhttp=new ActiveXObject("Microsoft.XMLHTTP")
   var url="http://"+document.location.host+"/"+getServletPath()+"/formmanagerlistener?formcommand=loadorgactors&formID="+formId+"&prvID="+prvId;
   xmlhttp.open("POST",url,false)
   xmlhttp.onreadystatechange=function()
                                     {
                                       if(xmlhttp.readyState==4)
                                         {
                                           if (xmlhttp.status == 200)
                                             {
                                              if(xmlhttp.responseText.indexOf("<error-message>")!=-1)
                                                 {
                                                   alert("\u9519\u8bef:"+xmlhttp.responseText.replace("<error-message>","").replace("</error-message>",""));
                                                   return history.go(-1)
                                                 }
                                               
                                               else
                                               	{   
                                               	  //if(workflow==null)
                                               	   orgPanelHandler.orgActorsDoc = xmlhttp.responseXML;
                                               	   //setCollectionsAsXml(xmlhttp.responseXML);
                                               	}
                                             }
                                           else 
                                             {
                                               alert("\u83b7\u53d6\u8868\u5355\u53c2\u4e0e\u8005\u5931\u8d25\uff01\n" +xmlhttp.statusText+"\n"+xmlhttp.responseText);
                                             }
                                         }
                                      }
     xmlhttp.send(null);	
}

function setCollectionsAsXml(doc)
 {
   //alert(formManager.privilegeDoc.xml)
   //alert(doc.xml)
   //alert()
   orgPanelHandler.orgActorsDoc = doc;
   var roleNodes = doc.selectNodes("//roles");
   var collections = "";
   if(roleNodes!=null&&roleNodes.length>0)
     {
      for(var ksk=0;ksk<roleNodes.length;ksk++)
       {
       var frm_roleId = roleNodes[ksk].getAttribute("frm_roleid");
       if(collections=="")
         {
           collections=	frm_roleId;
         }
       else
       	 {
       	   collections = collections + ";" + frm_roleId;
       	 }
       }
     }
   setCollections(collections);
   //alert(orgPanelHandler.orgActorsDoc.xml)
 }

/**
*  show tree's childNodes 
**/
function showBranch(selfobj)
{   
    //alert(this.orgPanelHandler.orgDoc.xml)
    var next1 = selfobj.nextSibling
    if(next1.innerHTML=="")
       { 
       	 if(selfobj.id=="roleparent")
       	  {
       	        if(orgPanelHandler.orgDoc!=null)
       	          {
       	            var crolelen = orgPanelHandler.orgDoc.selectNodes("//roles/role").length
       	            var inhtml = "";
       	            for(var i=0;i<crolelen;i++)
       	             {
       	              
       	     	      inhtml=inhtml+orgPanelHandler.orgDoc.selectNodes("//roles/role")[i].transformNode(orgPanelHandler.orgXslDoc)
       	             }
       	             next1.innerHTML=inhtml
       	          }
       	  }
       	 else if(selfobj.id=="personparent")
       	  {  
       	        if(orgPanelHandler.orgDoc!=null)
       	          {
       	           
       	           var crolelen = orgPanelHandler.orgDoc.selectSingleNode("//persons")
       	           var inhtml=crolelen.transformNode(orgPanelHandler.orgXslDoc)
       	           next1.innerHTML=inhtml
       	           
       	             for(var j=0;j<next1.childNodes.length;j++)
       	              { 
       	              	next1.childNodes[j].childNodes[0].childNodes[0].setAttribute("src",Img_Obj_T.src)
       	              	next1.childNodes[j].childNodes[0].childNodes[0].style.visibility="hidden"
       	              	next1.childNodes[j].childNodes[0].childNodes[1].setAttribute("src",Img_Obj_personNode.src)
       	              }
       	            next1.lastChild.childNodes[0].childNodes[0].src=Img_Obj_L.src 
       	            next1.lastChild.childNodes[0].childNodes[0].style.visibility="hidden";     	           
       	             
       	            /*
       	            var crolelen = orgPanelHandler.orgDoc.selectNodes("//person").length
       	            var inhtml = "";
       	            for(var i=0;i<crolelen;i++)
       	             {
       	     	      inhtml=inhtml+orgPanelHandler.orgDoc.selectNodes("//person")[i].transformNode(orgPanelHandler.orgXslDoc)
       	             }
       	             next1.innerHTML=inhtml

       	             for(var j=0;j<next1.childNodes.length;j++)
       	              { 
       	              	next1.childNodes[j].childNodes[0].childNodes[0].setAttribute("src",Img_Obj_T.src)
       	              	next1.childNodes[j].childNodes[0].childNodes[1].setAttribute("src",Img_Obj_personNode.src)
       	              }
       	             next1.lastChild.childNodes[0].childNodes[0].src=Img_Obj_L.src
       	            */
       	          }       	  
       	  }
       	 else 
       	  {
       	 //alert(orgPanelHandler.orgDoc.xml)
       	 var node = orgPanelHandler.orgDoc.selectSingleNode("//role[@id='"+selfobj.id+"']")
       	 if(node!=null)
       	  {
       	    var crolelen = node.selectNodes("role").length
       	    var inhtml = "";
       	    for(var i=0;i<crolelen;i++)
       	     {  
       	     	inhtml=inhtml+node.selectNodes("role")[i].transformNode(orgPanelHandler.orgXslDoc)
       	     }
       	    next1.innerHTML=inhtml
       	  }
         }
       }
      
    var isRoot = false
    if(next1&&event.srcElement.tagName=="IMG")
       {  
       	  if(selfobj.name == 'actor_root')
       	     isRoot=true
          if(next1.style.display=="block")
            {
              next1.style.display="none"
              if(isRoot)
                event.srcElement.src=orgPanelHandler.Img_actor_close
              else
              	event.srcElement.src=orgPanelHandler.Img_collapses
            }
         else
            {
         	next1.style.display="block"
         	if(isRoot)
                  event.srcElement.src=orgPanelHandler.Img_actor_open
                else
                  event.srcElement.src=orgPanelHandler.Img_expanded
            }
       }
}

/**
* Fires when mouse click the person!
*
*/
function personOnclick(personid,fullname,account)
{
   var obj = event.srcElement
   if(obj==null)
      return;
   if(!event.ctrlKey&&!event.shiftKey)
     {
        clear_List(this.orgPanelHandler.addPNode_List)
        //cancel hightlight
        if(selectedItem.length!=0){
    	for(var i=0;i<selectedItem.length;i++){
	    	turnOffLight(selectedItem[i]);
    	    }
          }
        //
        obj.style.color="#FFFFFF"
        obj.style.backgroundColor="background"
        orgPanelHandler.addPNode_List==null
        this.orgPanelHandler.addPNode_List=new Array();
        this.orgPanelHandler.addPNode_List[0] = personid+";"+fullname+";"+account
     }
   else
     {
       if(event.ctrlKey)
          { 
            if(orgPanelHandler.addPNode_List.contain(personid+";"+fullname+";"+account)==-1)
               { 
                setNodeStyle(obj,personid,fullname,account)
               }
            else
              { 
              	obj.style.color="navy"
              	obj.style.backgroundColor="transparent"
              	orgPanelHandler.addPNode_List.remove(orgPanelHandler.addPNode_List.contain(personid+";"+fullname+";"+account))
              }
          }
       else if(event.shiftKey)
          {  
             if(orgPanelHandler.addPNode_List==null||orgPanelHandler.addPNode_List.length==0)
                return;
             var startElement = document.getElementById(orgPanelHandler.addPNode_List[orgPanelHandler.addPNode_List.length - 1].split(";")[0]);
             if(startElement == null)
               {
                 setNodeStyle(obj,personid,fullname,account) 
               }
             else if(startElement == obj)
               {
               }
             else if(startElement.offsetTop < obj.offsetTop)
               { 
               	 var ele = startElement.nextSibling
               	 var label=null
               	 while(ele!=null)
               	   {
               	      for(var i=0;i<ele.childNodes[0].childNodes.length;i++)
               	       {
               	         if(ele.childNodes[0].childNodes[i].tagName=="LABEL")
               	           {
               	             label = ele.childNodes[0].childNodes[i]
               	             break;
               	           }
               	       }
               	      if(label)
              	          setNodeStyle(label,ele.id,ele.fullname,ele.account)	
               	      if(ele.id == personid)
                	  break;
               	      ele = ele.nextSibling
               	   }
               }
             else if(startElement.offsetTop > obj.offsetTop)
               { 
               	 var ele = startElement.previousSibling
               	 while(ele)
               	   {
               	      for(var i=0;i<ele.childNodes[0].childNodes.length;i++)
               	       {
               	         if(ele.childNodes[0].childNodes[i].tagName=="LABEL")
               	           {
               	             label = ele.childNodes[0].childNodes[i]	
               	             break;
               	           }
               	       }
               	      if(label)
              	          setNodeStyle(label,ele.id,ele.fullname,ele.account)	
               	      if(ele.id == personid)
                	  break;
               	      ele = ele.previousSibling
               	   }
               }
          }
     }
}

function setNodeStyle(obj,personid,fullname,account)
{
      obj.style.color="#FFFFFF"
      obj.style.backgroundColor="background"
      if(orgPanelHandler.addPNode_List==null)
         {
            this.orgPanelHandler.addPNode_List=new Array();
         }
      if(this.orgPanelHandler.addPNode_List.contain(personid+";"+fullname+";"+account) == -1)
         {
            this.orgPanelHandler.addPNode_List[orgPanelHandler.addPNode_List.length] = personid+";"+fullname+";"+account
         }
}

function setRoleNodeStyle(obj,roleid,rolename)
{
      obj.style.color="#FFFFFF"
      obj.style.backgroundColor="background"
      if(orgPanelHandler.addPNode_List==null)
         {
            this.orgPanelHandler.addPNode_List=new Array();
         }
      if(this.orgPanelHandler.addPNode_List.contain(roleid+";"+rolename) == -1)
         {
            this.orgPanelHandler.addPNode_List[orgPanelHandler.addPNode_List.length] = roleid+";"+rolename
         }
}

/**
* Fires when mouse click the role!
*
*/
function roleOnclick(roleId,roleName)
{
  
   var obj = event.srcElement
   if(obj==null)
      return;
   if(!event.ctrlKey&&!event.shiftKey)
     {
        clear_List(this.orgPanelHandler.addPNode_List)
        //cancel hightlight
        if(selectedItem.length!=0){
    	for(var i=0;i<selectedItem.length;i++){
	    	turnOffLight(selectedItem[i]);
    	    }
          }
        //
        obj.style.color="#FFFFFF"
        obj.style.backgroundColor="background"
        orgPanelHandler.addPNode_List==null
        this.orgPanelHandler.addPNode_List=new Array();
        this.orgPanelHandler.addPNode_List[0] = roleId+";"+roleName
     }
   else
     {
       if(event.ctrlKey)
          {
            if(orgPanelHandler.addPNode_List.contain(roleId+";"+roleName)==-1)
               { 
                setRoleNodeStyle(obj,roleId,roleName)
               }
            else
              { 
              	obj.style.color="navy"
              	obj.style.backgroundColor="transparent"
              	orgPanelHandler.addPNode_List.remove(orgPanelHandler.addPNode_List.contain(roleId+";"+roleName))
              }
          }
       else if(event.shiftKey)
          { 
             if(orgPanelHandler.addPNode_List==null||orgPanelHandler.addPNode_List.length==0)
                return;
             var startElement = document.getElementById(orgPanelHandler.addPNode_List[orgPanelHandler.addPNode_List.length - 1].split(";")[0]);
             if(startElement == null)
               {
                 setRoleNodeStyle(obj,roleId,roleName)
               }
             else if(startElement == obj)
               {
               }
             else if(startElement.offsetTop < obj.offsetTop)
               { 
               	 var ele   = startElement//.nextSibling.nextSibling
               	 var label = null
               	 while(ele)
               	   {  
               	      for(var i=0;i<ele.childNodes[0].childNodes.length;i++)
               	       {
               	         if(ele.childNodes[0].childNodes[i].tagName=="LABEL")	
               	           {
               	             label = ele.childNodes[0].childNodes[i]
               	             break;
               	           }
               	       }
               	      if(label)
              	          setRoleNodeStyle(label,ele.id,ele.name)	
               	      if(ele.id == roleId)
                	  break;
                      ele = getNextElement(ele)
               	   }
               }
             else if(startElement.offsetTop > obj.offsetTop)
               {
               	  var ele   = obj.parentNode.parentNode//.nextSibling.nextSibling
               	  var label = null
               	  while(ele)
               	   {  
               	      for(var i=0;i<ele.childNodes[0].childNodes.length;i++)
               	       {
               	         if(ele.childNodes[0].childNodes[i].tagName=="LABEL")	
               	           {
               	             label = ele.childNodes[0].childNodes[i]
               	             break;
               	           }
               	       }
               	      if(label)
              	          setRoleNodeStyle(label,ele.id,ele.name)	
               	      if(ele.id == startElement.id)
                	  break;
                      ele = getNextElement(ele)
               	   }
               }
          }
     }
}

////////////////////////2005.04.07/11:03
function getNextElement(ele)
{
  if(ele.nextSibling&&ele.nextSibling.style!=""&&ele.nextSibling.style.display=="block" && ele.nextSibling.hasChildNodes())
    {
      ele = ele.nextSibling.childNodes[0]
      return ele;
    }
  if(ele&&ele.nextSibling&&ele.nextSibling.style)
  if(ele.nextSibling.style.display=="none"||ele.nextSibling.style.display=="")
   {
     if(ele.nextSibling.nextSibling)	
       {
         ele = ele.nextSibling.nextSibling	
         return ele
       }
   }
  if(ele.nextSibling.nextSibling==null)
   { 
     var returnV
     while(ele)
       {
   	if(ele.parentNode.nextSibling)
   	  {
   	    returnV = ele.parentNode.nextSibling
   	    break;
   	  }
   	else
   	  ele = ele.parentNode
       }
       return returnV
   }
  return null;
}


function clear_addPNode_List()
{
  clear_List(this.orgPanelHandler.addPNode_List)
  this.orgPanelHandler.addPNode_List=null
  this.orgPanelHandler.addPNode_List=new Array()
}

function clear_delNode_List()
{
  clear_List(this.orgPanelHandler.delNode_List)	
  this.orgPanelHandler.delNode_List=null
  this.orgPanelHandler.delNode_List=new Array()
}
//////////////////////////////end

function clear_List(list)
{
  if(list.length==0)
     return;
  var obj = null;
  for(var i=0;i<list.length;i++)
    {
      obj = document.getElementById(list[i].split(";")[0])
      personOnfocusout(obj)
    }
  list = null
  //list =new Array()
}

function personOnfocusout(obj)
{
  if(obj==null)
    return;
  for(var i=0;i<obj.childNodes.length;i++)
     {
     	if(obj.childNodes[i].tagName=="LABEL")
     	     {  
                obj.childNodes[i].style.color="navy"
                obj.childNodes[i].style.backgroundColor="transparent"   	  	
            	break;
     	      }
     	else if(obj.childNodes[i].tagName=="NOBR")
     	  { 
     	    var nobr=obj.childNodes[i]
     	    for(var j=0;j<nobr.childNodes.length;j++)
               {
             	if(nobr.childNodes[j].tagName=="LABEL")
     	         { 
                   nobr.childNodes[j].style.color="navy"
            	   nobr.childNodes[j].style.backgroundColor="transparent"   	  	
            	   break;
     	  	 }
     		}
            //obj.childNodes[i].style.color="navy"
            //obj.childNodes[i].style.backgroundColor="transparent"   	  	
            break;
     	  }
     }
}

function roleOnfocusout(obj)
{
  personOnfocusout(obj)
} 


/**
*  Fires when mouse 2 click the person,
*  Add one person to the actorPanel
*
*  orgPanelHandler.orgActorPanel.childNodes[0] : roles's  parent
*  orgPanelHandler.orgActorPanel.childNodes[1] : roles's  tree span
*  
*  orgPanelHandler.orgActorPanel.childNodes[2] : person's parent
*  orgPanelHandler.orgActorPanel.childNodes[3] : person's tree span
**/
function addPerson(personid,fullName,account)
{
  if(this.orgPanelHandler.orgActorPanel==null)
    return;
  
  var actor  = document.getElementById("CATEGORY_"+orgPanelHandler.currentCategoryId);//this.orgPanelHandler.orgActorPanel.childNodes[3]
  var pactor = document.getElementById("PCATEGORY_"+orgPanelHandler.currentCategoryId);//this.orgPrivilgePanelHandler.orgActorPanel.childNodes[3]

  var existNode =false
  if(actor.innerHTML!="")
    {
      existNode=containsRole(personid);
  /*
  for(var i=0;i<actor.childNodes.length;i++)
     {
       if(actor.childNodes[i].getAttribute('id') == "ACT_"+personid)
         {
           existNode=true
           break;
         }
     }
  */
  }
  if(existNode)
    return;
  var pspan = document.createElement("SPAN")
  var ppspan= document.createElement("SPAN")
  
  pspan.setAttribute("id","ACT_"+personid)
  ppspan.setAttribute("id","PACT_"+personid)
  
  var img_L   = document.createElement("IMG")
      img_L.src   =orgPanelHandler.Img_L
      img_L.className='imgalign'
      img_L.style.visibility = 'hidden';
  var img   = document.createElement("IMG")
      img.src   =orgPanelHandler.Img_personNode
      img.className ='imgalign'
      
  var pimg_L   = document.createElement("IMG")
      pimg_L.className='imgalign'
      pimg_L.src   =orgPanelHandler.Img_L
      pimg_L.style.visibility = 'hidden';

  var pimg   = document.createElement("IMG")
      pimg.src   =orgPanelHandler.Img_personNode
      pimg.className="imgalign"

  pspan.appendChild(img_L)
  pspan.appendChild(img)
  
  ppspan.appendChild(pimg_L)
  ppspan.appendChild(pimg)
  
  var a     = document.createElement("LABEL")
  var pa    = document.createElement("LABEL")
  
  a.attachEvent("onclick",function(){  
  	                               actorPersonOnClick("ACT_"+personid);
  	                            });
  pa.attachEvent("onclick",function(){ 
  	                               if(orgPrivilgePanelHandler.tempNode!=null)
  	                                   {
  	                                     this.orgPrivilgePanelHandler.tempNode.style.color = "navy"
  	                                     this.orgPrivilgePanelHandler.tempNode.style.backgroundColor = "transparent"
  	                                   }
  	                               this.orgPrivilgePanelHandler.tempNode = pa
  	                               this.userid=personid
  	                               pa.style.color="#FFFFFF"
  	                               pa.style.backgroundColor="background"
  	                               showPrivilege()
  	                            });  	                            
  a.attachEvent("onfocusout",function()
                                  {
  	                               a.style.color ="navy" 
  	                               a.style.backgroundColor="transparent"
  	                          });
  pa.attachEvent("onfocusout",function()
                                  { 
                                     pa.style.color ="navy"
                                     pa.style.backgroundColor="transparent"
  	                          });
  //a.attachEvent("ondblclick",removeActorNode);
  
  a.innerHTML=   fullName + "<br/>"//"("+account+")"+"<br/>"
  pa.innerHTML=   fullName + "<br/>"//"("+account+")"+"<br/>"
  pspan.appendChild(a)
  ppspan.appendChild(pa)
  
  //pspan.innerHTML="<NOBR onclick=actorPersonOnClick('ACT_"+personid+"') ondblclick=removeActorNode()>"+pspan.innerHTML+"</NOBR>"
  pspan.innerHTML="<NOBR onclick=actorPersonOnClick('ACT_"+personid+"')>"+pspan.innerHTML+"</NOBR>"
  //ppspan.innerHTML="<NOBR onclick=nobrPersonOnclick(this.childNodes[2],'"+personid+"')>"+ppspan.innerHTML+"</NOBR>"
  ppspan.innerHTML="<NOBR>"+ppspan.innerHTML+"</NOBR>"
  
  actor.appendChild(pspan)
  pactor.appendChild(ppspan)

  if(pspan.previousSibling)
     {
       //pspan.previousSibling.childNodes[0].childNodes[0].src=orgPanelHandler.Img_T
       //ppspan.previousSibling.childNodes[0].src=orgPanelHandler.Img_T
     }
  
  if(ppspan.previousSibling)
     { 
      //ppspan.previousSibling.childNodes[0].childNodes[0].src=orgPanelHandler.Img_T
     }
  if(actor.childNodes.length==1)
    {
      if(actor.style.display=="none"||actor.style.display=="")
        { 
          actor.previousSibling.childNodes[0].src=orgPanelHandler.Img_collapses
        }
      if(pactor.style.display=="none"||pactor.style.display=="")
        { 
         pactor.previousSibling.childNodes[0].src=orgPanelHandler.Img_collapses
        }
     }
  //add id to the privilegeDoc
  //addCollection(personid);
  //var 
  doCopyPrivilege(personid);
  
}

function containsRole(roleId)
 {
   var returnV = false;
   var coll=","+formManager.privilegeDoc.selectSingleNode("//collection").text+","; 
   if(coll.indexOf(","+roleId+",")!=-1)
    {
      returnV = true;
    }
   //alert(returnV)
   return returnV;
 }

function nobrPersonOnclick(obj,personid)
 {
  pa =obj
  if(orgPrivilgePanelHandler.tempNode!=null)
      {
        this.orgPrivilgePanelHandler.tempNode.style.color = "navy"
        this.orgPrivilgePanelHandler.tempNode.style.backgroundColor = "transparent"
      }
  this.orgPrivilgePanelHandler.tempNode = pa
  pa.style.color="#FFFFFF"
  pa.style.backgroundColor="background"
  setCurrentUser(personid);
 }

function addRole(roleid,roleName)
{
 if(this.orgPanelHandler.orgActorPanel==null)
    return;
  
  var actor  = document.getElementById("CATEGORY_"+orgPanelHandler.currentCategoryId);//this.orgPanelHandler.orgActorPanel.childNodes[1]
  var pactor = document.getElementById("PCATEGORY_"+orgPanelHandler.currentCategoryId);//this.orgPrivilgePanelHandler.orgActorPanel.childNodes[1]
  if(actor==null||pactor==null)
    return;
  var existNode =false
  if(actor.innerHTML!="")
    {
      existNode=containsRole(roleid);
    }
  /*
  for(var i=0;i<actor.childNodes.length;i++)
     { 
       if(actor.childNodes[i].getAttribute('id')=="ACT_"+roleid)
         {
           existNode=true
           break;
         }
     }
  */
  if(existNode)
    return;
  var pspan = document.createElement("SPAN")
  var ppspan= document.createElement("SPAN")
  
  pspan.setAttribute("id","ACT_"+roleid)
  ppspan.setAttribute("id","PACT_"+roleid)
  
  //pspan.attachEvent("ondblclick",removeActorNode);
  
  var img     = document.createElement("IMG")
      img.src = orgPanelHandler.Img_roleNode
      img.className="imgalign"
      
  var imgL     = document.createElement("IMG")
      imgL.src = orgPanelHandler.Img_L
      imgL.className="imgalign"
  	  imgL.style.visibility = "hidden";
  
  var pimgL    = document.createElement("IMG")
      pimgL.src= orgPanelHandler.Img_L
      pimgL.className="imgalign"
      pimgL.style.visibility = "hidden";
      
  var pimg    = document.createElement("IMG")
      pimg.src= orgPanelHandler.Img_roleNode
      pimg.className="imgalign"
	  
  pspan.appendChild(imgL)
  pspan.appendChild(img)
  
  ppspan.appendChild(pimgL)
  ppspan.appendChild(pimg)
  
  var a     = document.createElement("LABEL")
  var pa     = document.createElement("LABEL")
  
  a.attachEvent("onclick",function(){
  	                               actorRoleOnClick("ACT_"+roleid)
  	                            });
  	                            
  pa.attachEvent("onclick",function(){ 
  	                              if(orgPrivilgePanelHandler.tempNode!=null)
  	                                   {
  	                                     this.orgPrivilgePanelHandler.tempNode.style.color = "navy"
  	                                     this.orgPrivilgePanelHandler.tempNode.style.backgroundColor = "transparent"
  	                                   }
  	                               this.orgPrivilgePanelHandler.tempNode = pa
  	                               this.userid=roleid
  	                               pa.style.color="#FFFFFF"
  	                               pa.style.backgroundColor="background"
  	                               showPrivilege()
  	                               
  	                            });  	                            
  a.attachEvent("onfocusout",function()
                                  {
  	                               a.style.color ="navy" 
  	                               a.style.backgroundColor="transparent"
  	                          });

  a.innerHTML=   roleName + "<br/>"
  pa.innerHTML=   roleName + "<br/>"
  pspan.appendChild(a)
  ppspan.appendChild(pa)
  
  //pspan.innerHTML="<NOBR onclick=actorPersonOnClick('ACT_"+roleid+"') ondblclick=removeActorNode()>"+pspan.innerHTML+"</NOBR>"
  pspan.innerHTML="<NOBR onclick=actorPersonOnClick('ACT_"+roleid+"')>"+pspan.innerHTML+"</NOBR>"
  //ppspan.innerHTML="<nobr onclick=nobrRoleOnclick(this.childNodes[2],'"+roleid+"')>"+ppspan.innerHTML+"</nobr>"
  ppspan.innerHTML="<nobr>"+ppspan.innerHTML+"</nobr>"
  
  actor.appendChild(pspan)
  pactor.appendChild(ppspan)
  if(pspan.previousSibling)
    {
      //pspan.previousSibling.childNodes[0].childNodes[0].src=orgPanelHandler.Img_T	
      //ppspan.previousSibling.childNodes[0].childNodes[0].src=orgPanelHandler.Img_T	
    }
  if(actor.childNodes.length ==1)
     {
        if(actor.style.display=="none"||actor.style.display=="")
          { 
            actor.previousSibling.childNodes[0].src=orgPanelHandler.Img_collapses
          }
        if(pactor.style.display=="none"||pactor.style.display=="")
          { 
            pactor.previousSibling.childNodes[0].src=orgPanelHandler.Img_collapses
          }
    }
  //05.04.11/10:52 //add id to the privilegeDoc
  //addCollection(roleid);
  doCopyPrivilege(roleid);
}



function nobrRoleOnclick(obj,roleid)
 {
  if(orgPrivilgePanelHandler.tempNode!=null)
       {
         this.orgPrivilgePanelHandler.tempNode.style.color = "navy"
         this.orgPrivilgePanelHandler.tempNode.style.backgroundColor = "transparent"
       }
   this.orgPrivilgePanelHandler.tempNode = obj
   //this.userid=roleid
   setCurrentUser(roleid);
   obj.style.color="#FFFFFF"
   obj.style.backgroundColor="background"
   //showPrivilege()
   //showPrintablePrivilege(roleid)
   //showSubmitablePrivilege(roleid)
 }
/**
*  Fires when mouse 2 click the node where at the ActorPanel
*  Remove one Node form the panel
*
**/
function removeActorNode()
{
  deleteActorNode()
}

function addActorNode()
{
  var len = this.orgPanelHandler.addPNode_List.length
  if(len==0)
     return;
  if(orgPanelHandler.currentCategoryId==null||orgPanelHandler.currentCategoryId=="")
    return;
  
  var collectionNode = orgPanelHandler.orgActorsDoc.selectSingleNode("//collection");
  var user  = "";
  var uid   = "";
  var uname = "";
  var uacc  = "";
  for(var i=0;i<len;i++)
    {
      user = this.orgPanelHandler.addPNode_List[i].split(";")
      uid  = user[0]
      uname= user[1]
      if(user[2])
         uacc = user[2]
     //alert(uid)
      if(user[2])
         {
           if((";"+collectionNode.text+";").indexOf(";"+uid+";")!=-1)
      	     {
      	      return;
       	     }      
           addPerson(uid,uname,uacc)
         }
      else
      	{  
           if((";"+collectionNode.text+";").indexOf(";"+uid+";")!=-1)
      	     {
      	      return;	
       	     }            		
      	   addRole(uid,uname)
      	}
      addToCategoryDoc(orgPanelHandler.currentCategoryId,uid);
     //addRoleToCategory(uid,uname);
    }
}



function addToCategoryDoc(frm_roleId,uid)
  {
    if(orgPanelHandler.orgActorsDoc!=null&&orgPanelHandler.orgActorsDoc.xml!="")
      {
      	var existUid = false;
      	var collectionNode = orgPanelHandler.orgActorsDoc.selectSingleNode("//collection");
      	if((";"+collectionNode.text+";").indexOf(";"+uid+";")!=-1)
      	 {
      	  return;	
      	 }
        var rolesNode = orgPanelHandler.orgActorsDoc.selectSingleNode('//roles[@frm_roleid = "'+frm_roleId+'"]');
        if(rolesNode!=null)
          {
            var tex = ";"+rolesNode.text+";"
            if(tex.indexOf(";"+uid+";")==-1)
              {
                if(rolesNode.text!="")
                  {
                    rolesNode.text = rolesNode.text + ";" +uid;
                  }
                else
                  {
                    rolesNode.text = uid;	
                  }
              }
             else
              {
                existUid = true;	
              }
          }
       
       if(!existUid)
         {
             
             if(collectionNode!=null)
               {
                 if(collectionNode.text!="")
                   {
              	     collectionNode.text = collectionNode.text + ";" +uid;
                   }
                 else
                   {
             	     collectionNode.text = uid;
                   }
                }
          }
      }
  }

/**
*  Fires when 2 click one node (personNode or roleNode)
* 
**/
function deleteActorNode()
{
   var len = this.orgPanelHandler.delNode_List.length
   if(len==0)
     return;
   var obj=null;
   var pobj=null;
   var node=null;
   var parentN=null;
   var pparentN=null;
   if(this.orgPanelHandler.delNode_List[0]!=null&&this.orgPanelHandler.delNode_List[0]!="")
     {
      node=document.getElementById(this.orgPanelHandler.delNode_List[0])
      pnode=document.getElementById("P"+this.orgPanelHandler.delNode_List[0])
     }
   if(node)
     {
      parentN =node.parentNode 
      pparentN=pnode.parentNode 	
     }
   for(var i=0;i<len;i++)
      {
          obj  = document.getElementById(this.orgPanelHandler.delNode_List[i])
          pobj = document.getElementById("P"+this.orgPanelHandler.delNode_List[i])
          if(obj!=null)
           {
             obj.parentNode.removeChild(obj)
             pobj.parentNode.removeChild(pobj)
             removeCollection(this.orgPanelHandler.delNode_List[i].replace("ACT_",""))
           }
      }
  if(parentN.hasChildNodes())
    { 
      if(parentN.childNodes[parentN.childNodes.length - 1].hasChildNodes()&&parentN.childNodes[parentN.childNodes.length - 1].childNodes[0].tagName=="NOBR")
        {
          //parentN.childNodes[parentN.childNodes.length - 1].childNodes[0].childNodes[0].src=orgPanelHandler.Img_L
          //pparentN.childNodes[pparentN.childNodes.length - 1].childNodes[0].childNodes[0].src=orgPanelHandler.Img_L
        }
      else
      	{ 
          //parentN.childNodes[parentN.childNodes.length - 1].childNodes[0].src=orgPanelHandler.Img_L	
          //pparentN.childNodes[pparentN.childNodes.length - 1].childNodes[0].src=orgPanelHandler.Img_L
      	}
    }
  else
    {
      parentN.previousSibling.childNodes[0].src=orgPanelHandler.Img_expanded
      pparentN.previousSibling.childNodes[0].src=orgPanelHandler.Img_expanded
    }
  this.orgPanelHandler.delNode_List = null 
  this.orgPanelHandler.delNode_List =new Array();
}
/*
*  Array.remove(dx)
*/
Array.prototype.remove = function(dx)
{
    if(isNaN(dx)||dx>this.length){return false;}
    this.splice(dx,1);
}
/*
*  Array.contain(obj)
**/
Array.prototype.contain = function(obj)
{
    var rv=-1//returnValue
    for(i=0;i<this.length;i++)
      {
        if(this[i]==obj)
          {
            rv=i;
            break;
          }
      }
    return rv;
}
/**
*  show or unshow the form page view 
*  show or unshow the orgTree page view
**/
function goToFormPagePanel(formpagepanelid,orgpagepanelid)
{  
  if(this.formManager.formPage.innerHTML=="")
    {
      loadFormPage()
    }
  document.getElementById(orgpagepanelid).style.display="none"
  document.getElementById(formpagepanelid).style.display="block"
  clear_userid()
}

function getServletPath()
{
  if(orgPanelHandler.servletPath=="")
     {
        var path = location.pathname
        if(path.indexOf("/")==0)
          {
            path= path.substring(1)
          }
        orgPanelHandler.servletPath = path.substring(0,path.indexOf("/"))   	
     }
  
  return orgPanelHandler.servletPath;	
}

/******************************
* collections role or person
*
*******************************/
function actorPersonOnClick(personid)
{  
   if(event.srcElement.tagName=="IMG")return;
   var obj = event.srcElement
   if(obj==null)
      return;
   if(!event.ctrlKey&&!event.shiftKey)
     {
        clear_List(this.orgPanelHandler.delNode_List)
        obj.style.color="#FFFFFF"
        obj.style.backgroundColor="background"
        orgPanelHandler.delNode_List==null
        this.orgPanelHandler.delNode_List=new Array();
        this.orgPanelHandler.delNode_List[0] = personid
     }
   else
     {
       if(event.ctrlKey)
          {
            if(orgPanelHandler.delNode_List.contain(personid)==-1)
               { 
                 obj.style.color = '#FFFFFF'
                 obj.style.backgroundColor='background'
                 orgPanelHandler.delNode_List[orgPanelHandler.delNode_List.length] = personid
               }
            else
               {
              	  obj.style.color="navy"
              	  obj.style.backgroundColor="transparent"
              	  orgPanelHandler.delNode_List.remove(orgPanelHandler.delNode_List.contain(personid))
               }
          }
       else if(event.shiftKey)
          { 
             if(orgPanelHandler.delNode_List==null||orgPanelHandler.delNode_List.length==0)
                return;
             var startElement = document.getElementById(orgPanelHandler.delNode_List[orgPanelHandler.delNode_List.length - 1].split(";")[0]);
             if(startElement == null)
               {
                 obj.style.color = '#FFFFFF'
                 obj.style.backgroundColor='background'
                 orgPanelHandler.delNode_List[orgPanelHandler.delNode_List.length] = personid
               }
             else if(startElement == obj)
               {
               }
             else if(startElement.offsetTop < obj.offsetTop)
               { 
               	 var ele = startElement.nextSibling
               	 while(ele)
               	   {
               	      for(var i=0;i<ele.childNodes[0].childNodes.length;i++)
               	         {
               	           if(ele.childNodes[0].childNodes[i].tagName=="LABEL")
               	             {
               	             	ele.childNodes[0].childNodes[i].style.color='#FFFFFF'
               	             	ele.childNodes[0].childNodes[i].style.backgroundColor='background'
               	             	orgPanelHandler.delNode_List[orgPanelHandler.delNode_List.length] = ele.id
               	             	break;
               	             }	
               	         }
               	      if(ele.id == personid)
                	  break;
               	      ele = ele.nextSibling
               	   }
               }
             else if(startElement.offsetTop > obj.offsetTop)
               { 
               	 var ele = startElement.previousSibling
               	 while(ele)
               	   {
               	      for(var i=0;i<ele.childNodes[0].childNodes.length;i++)
               	         {
               	           if(ele.childNodes[0].childNodes[i].tagName=="LABEL")
               	             {
               	             	ele.childNodes[0].childNodes[i].style.color='#FFFFFF'
               	             	ele.childNodes[0].childNodes[i].style.backgroundColor='background'
               	             	orgPanelHandler.delNode_List[orgPanelHandler.delNode_List.length] = ele.id
               	             	break;
               	             }	
               	         }	
               	      if(ele.id == personid)
                	  break;
               	      ele = ele.previousSibling
               	   }
               }
          }
     }
}

function actorRoleOnClick(roleId)
{
  actorPersonOnClick(roleId)
}


function setOrgActors(workflow)
{
  if(workflow!=null&&workflow!=""&&workflow!="undefined")
    return;
  if(orgPanelHandler.orgActorsDoc==null)
    return;
  var collections = orgPanelHandler.orgActorsDoc.selectSingleNode("//collection");//this.formManager.privilegeDoc.selectSingleNode("//collection");
  if(collections==null)
  	return;
  
  if(collections.text!="")
    {
      this.orgPanelHandler.initEnd = false;
      
      var frmRoleNodes = orgPanelHandler.orgActorsDoc.selectNodes("//roles");
      
      for(var rn=0;rn<frmRoleNodes.length;rn++)
        {  
          var span = document.createElement('<DIV onclick=if(this.nextSibling.innerHTML!="")showBranch(this) style="font-size:12">');
          span.innerHTML = '<img src="css/images/open.gif"/>&#160;<LABEL onclick=setCurrentCategory(this,\"'+frmRoleNodes[rn].getAttribute("frm_roleid")+'\") style="vertical-align:middle;text-align:center">'+frmRoleNodes[rn].getAttribute("frm_rolename")+'</LABEL>';
          var spanNSib = document.createElement('<span class="branch2" id="CATEGORY_'+frmRoleNodes[rn].getAttribute("frm_roleid")+'"></span>')
          orgPanelHandler.orgActorPanel.appendChild(span);
          orgPanelHandler.orgActorPanel.appendChild(spanNSib);
          /**********copy to privilege panel ***********///pcurrentCategoryId
          var pspan = document.createElement('<DIV onclick=if(this.nextSibling.innerHTML!="")showBranch(this) style="font-size:12">');
          pspan.innerHTML = '<img src="css/images/open.gif"/>&#160;<LABEL onclick=setCurrentPCategory(this,\"'+frmRoleNodes[rn].getAttribute("frm_roleid")+'\") style="vertical-align:middle;text-align:center">'+frmRoleNodes[rn].getAttribute("frm_rolename")+'</LABEL>';
          var pspanNSib = document.createElement('<span id="PCATEGORY_'+frmRoleNodes[rn].getAttribute("frm_roleid")+'"class="branch2"></span>')
          orgPrivilgePanelHandler.orgActorPanel.appendChild(pspan);
          orgPrivilgePanelHandler.orgActorPanel.appendChild(pspanNSib);
     
     var actors = frmRoleNodes[rn].text.split(";")
      for(var i=0;i<actors.length;i++)
        {
          var hasIt = false;
          //node=orgPanelHandler.orgDoc.selectSingleNode("//span[@id='"+actors[i]+"']")
          node=orgPanelHandler.orgPersonsDoc.selectSingleNode("//span[@id='"+actors[i]+"']")
          if(node!=null)
            {   
                hasIt = true;
                addSourceActors(spanNSib,pspanNSib,node.getAttribute("id"),node.getAttribute("fullname"),'person');
                //spanNSib.innerHTML = node.getAttribute("fullname")
                //addPerson(node.getAttribute("id"),node.getAttribute("fullname"),node.getAttribute("account"))
            }
          else{
             node=orgPanelHandler.orgDoc.selectSingleNode("//role[@id='"+actors[i]+"']")
             if(node!=null)
                { 
                  hasIt = true;
                  addSourceActors(spanNSib,pspanNSib,node.getAttribute("id"),node.getAttribute("name"),'role');
                  //spanNSib.innerHTML = node.getAttribute("name")
             	  //addRole(node.getAttribute("id"),node.getAttribute("name"))
             	}
          }
          /**add 2005.09.01 remove no exist roles*/
          
          if(!hasIt)
            {
              removeCollection(actors[i]);
            }
        }          
       }
    }
    this.orgPanelHandler.initEnd = true;
}

function setCurrentCategory(eventObj,categoryId)
 {
   if(eventObj==orgPanelHandler.currentCategoryNode)
     return;
   setUnselectedNodeStyle(orgPanelHandler.currentCategoryNode);
   orgPanelHandler.currentCategoryNode = eventObj
   orgPanelHandler.currentCategoryId = categoryId
   setSelectedNodeStyle(eventObj);
 }

function setCurrentPCategory(eventObj,pcategoryId)
 {
   if(eventObj==orgPanelHandler.currentPCategoryNode)
     return;
   setUnselectedNodeStyle(orgPanelHandler.currentPCategoryNode);
   orgPanelHandler.currentPCategoryNode = eventObj
   orgPanelHandler.currentPCategoryId = pcategoryId
   setSelectedNodeStyle(eventObj);
   //show privilege
   /*
   var pc = document.getElementById("PCATEGORY_"+pcategoryId);
   if(pc&&pc.hasChildNodes())
     {
       var roleId = pc.childNodes[0].id.replace("PACT_","");
       setCurrentUser(roleId)
     }
   */
   
   setCurrentUser(pcategoryId);
 }
 
function setSelectedNodeStyle(obj)
{
      obj.style.color="#FFFFFF"
      obj.style.backgroundColor="background"
}

function setUnselectedNodeStyle(obj)
 {
   if(obj!=null)
     {
       obj.style.color="navy";
       obj.style.backgroundColor="transparent";
     }	
 }

function addSourceActors(actor,pactor,personid,fullName,nodeType)
{ 
  //var actor      = this.orgPanelHandler.orgActorPanel.childNodes[3]
  //var pactor     = this.orgPrivilgePanelHandler.orgActorPanel.childNodes[3]

  var pspan = document.createElement("SPAN")
  var ppspan= document.createElement("SPAN")
  
  pspan.setAttribute("id","ACT_"+personid)
  ppspan.setAttribute("id","PACT_"+personid)
  
  var nodeImage = orgPanelHandler.Img_personNode;
  if(nodeType=='role')
    {
      nodeImage = orgPanelHandler.Img_roleNode;
    }
  
  var img_L   = document.createElement("IMG")
      img_L.src   =orgPanelHandler.Img_L
      img_L.className='imgalign'
      img_L.style.visibility = 'hidden';
  var img   = document.createElement("IMG")
      img.src   =nodeImage
      img.className ='imgalign'
     
  var pimg_L   = document.createElement("IMG")
      pimg_L.className='imgalign'
      pimg_L.src   =orgPanelHandler.Img_L
      pimg_L.style.visibility = 'hidden';

  var pimg   = document.createElement("IMG")
      pimg.src   =nodeImage
      pimg.className="imgalign"

  pspan.appendChild(img_L)
  pspan.appendChild(img)
  
  ppspan.appendChild(pimg_L)
  ppspan.appendChild(pimg)
  
  var a     = document.createElement("LABEL")
  var pa    = document.createElement("LABEL")
  
  
  a.attachEvent("onclick",function(){  
  	                               actorPersonOnClick("ACT_"+personid);
  	                            });
  /*
  pa.attachEvent("onclick",function(){ 
  	                               if(orgPrivilgePanelHandler.tempNode!=null)
  	                                   {
  	                                     this.orgPrivilgePanelHandler.tempNode.style.color = "navy"
  	                                     this.orgPrivilgePanelHandler.tempNode.style.backgroundColor = "transparent"
  	                                   }
  	                               this.orgPrivilgePanelHandler.tempNode = pa
  	                               this.userid=personid
  	                               pa.style.color="#FFFFFF"
  	                               pa.style.backgroundColor="background"
  	                               showPrivilege()
  	                            });  	                            
 */  	                           
  a.attachEvent("onfocusout",function()
                                  {
  	                               a.style.color ="navy" 
  	                               a.style.backgroundColor="transparent"
  	                          });
  pa.attachEvent("onfocusout",function()
                                  { 
                                     pa.style.color ="navy"
                                     pa.style.backgroundColor="transparent"
  	                          });
  //a.attachEvent("ondblclick",removeActorNode);
  a.innerHTML=   fullName +"<br/>" //+ "("+account+")"+"<br/>"
  pa.innerHTML=   fullName +"<br/>" // + "("+account+")"+"<br/>"
  
  pspan.appendChild(a)
  ppspan.appendChild(pa)
  
  pspan.innerHTML="<NOBR onclick=actorPersonOnClick('ACT_"+personid+"')>"+pspan.innerHTML+"</NOBR>"
  //ppspan.innerHTML="<NOBR onclick=nobrPersonOnclick(this.childNodes[2],'"+personid+"')>"+ppspan.innerHTML+"</NOBR>"
  ppspan.innerHTML="<NOBR>"+ppspan.innerHTML+"</NOBR>"
  
  actor.appendChild(pspan)
  pactor.appendChild(ppspan)

 if(pspan.previousSibling)
    {
      //pspan.previousSibling.childNodes[0].childNodes[0].src=orgPanelHandler.Img_T	
      //ppspan.previousSibling.childNodes[0].childNodes[0].src=orgPanelHandler.Img_T	
    }
  
  if(ppspan.previousSibling)
     { 
      //ppspan.previousSibling.childNodes[0].childNodes[0].src=orgPanelHandler.Img_T
     }
  if(actor.childNodes.length==1)
    {
      if(actor.style.display=="none"||actor.style.display=="")
        { 
          actor.previousSibling.childNodes[0].src=orgPanelHandler.Img_collapses
        }
      
      if(pactor.style.display=="none"||pactor.style.display=="")
        { 
         pactor.previousSibling.childNodes[0].src=orgPanelHandler.Img_collapses
        }
      
     }
  //add id to the privilegeDoc
  //addCollection(personid)
}

/**
*  add actor's id to the privilege document
**/
function addCollection(actorId)
{
  //if(this.orgPanelHandler.current)
  if(!this.orgPanelHandler.initEnd)
     return;
  if(getCollections()=="")
     this.formManager.privilegeDoc.selectSingleNode("//collection").text = actorId
  else
     this.formManager.privilegeDoc.selectSingleNode("//collection").text = this.formManager.privilegeDoc.selectSingleNode("//collection").text+";"+actorId
  removeAllPrivilege(actorId);
}
/**
*  remove actor from the xmlDoc 
**/
function removeCollection(actorId)
{
  var actors = this.formManager.privilegeDoc.selectSingleNode("//collection").text.split(";")
  var newText = "";
  for(var i=0;i<actors.length;i++)
    {
      if(actors[i]!=actorId)
        {
          if(i==0)
            newText=actors[0]
          else
      	    newText = newText +";" + actors[i]  	
        }
    }
 
  this.formManager.privilegeDoc.selectSingleNode("//collection").text = newText;
  
  //
  removeFromCategory(actorId)
  //
  removeAllPrivilege(actorId);
}

function removeFromCategory(actorId)
  {
    if(orgPanelHandler.orgActorsDoc!=null&&orgPanelHandler.orgActorsDoc.xml!="")
      {
      	var rolesNodes = orgPanelHandler.orgActorsDoc.selectNodes("//roles");
        for(var rs=0;rs<rolesNodes.length;rs++)
          {
          	
            var tex = ";"+rolesNodes[rs].text+";"
            if(tex.indexOf(";"+actorId+";")!=-1)
              {
              	
              	var text_arr = rolesNodes[rs].text.split(";");
              	var newText = "";
              	for(var yy=0;yy<text_arr.length;yy++)
              	 {
              	   if(text_arr[yy]!=actorId)
              	    {
              	      if(newText=="")
              	         newText = text_arr[yy];
              	      else
              	      	 newText = newText + ";" + text_arr[yy];
              	    }
              	 }
              	rolesNodes[rs].text = newText;
                break;
              }
          }
         var collectionNode = orgPanelHandler.orgActorsDoc.selectSingleNode("//collection");
         if(collectionNode!=null)
           {
            var tex = ";"+collectionNode.text+";";
            if(tex.indexOf(";"+actorId+";")!=-1)
              {
              	var text_arr = collectionNode.text.split(";");
              	var newText = "";
              	for(var yy=0;yy<text_arr.length;yy++)
              	 {
              	   if(text_arr[yy]!=actorId)
              	    {
              	      if(newText=="")
              	         newText = text_arr[yy];
              	      else
              	      	 newText = newText + ";" + text_arr[yy];
              	    }
              	 }
              	collectionNode.text = newText;
              }             
           }
      }
  }

//2005.04.15
//set data source
function setDataSource()
{
  var styles="dialogWidth:572px;dialogHeight:362px;help:no;status:no;resizable:no;scroll:no"
  var strWin="" //dialog returnValue
  var oldDatasets = this.formManager.privilegeDoc.selectSingleNode("//datasets")
  if(oldDatasets==null)
      {
         var root = formManager.privilegeDoc.selectSingleNode("//privilege")
         oldDatasets=formManager.privilegeDoc.createElement("datasets")
         root.appendChild(oldDatasets)
      }
  if(formManager.datasets=="")
     {
       strWin = window.showModalDialog("datasource.jsp",null,styles)
     }
  else
    { 
      strWin = window.showModalDialog("datasource.jsp",formManager.datasets+"&"+oldDatasets.text,styles)
    }
  if(strWin=="undefined"||strWin==null)
     return;
     //strWin="";
  this.formManager.privilegeDoc.selectSingleNode("//datasets").text = strWin
}

//2005.09.13
/*
* set privilege ShortCut make current role the same as aother role.
*/

function setShortCut()
 {
  if(this.formManager.privilegeDoc==null)
    return; 
  var styles="dialogWidth:452px;dialogHeight:212px;help:no;status:no;resizable:no;scroll:no"
  var strWin="" //dialog returnValue
  if(this.userid==null||userid=="")
    {
      alert("\u8bf7\u9009\u62e9\u4e00\u4e2a\u89d2\u8272\uff01");
      /*styles="dialogWidth:426px;dialogHeight:240px;help:no;status:no;resizable:no"
      var msg = "\u8bf7\u9009\u62e9\u4e00\u4e2a\u8868\u5355\u89d2\u8272";
      window.showModalDialog("formWarnPage.jsp",msg,styles);*/
      return;
    }
  window.showModalDialog("shortcut.jsp",window,styles);
 }

function getCurrentRoleLabel(roleid)
 {
  var retValue="";
  //alert(orgPanelHandler.orgActorsDoc.xml)
  if(orgPanelHandler.orgActorsDoc!=null)
    {
      var node = orgPanelHandler.orgActorsDoc.selectSingleNode("//roles[@frm_roleid='"+roleid+"']");
      if(node!=null)
        {
          retValue = node.getAttribute("frm_rolename");	
        }
    }
  /*
  if(orgPanelHandler.orgDoc!=null)
    {
      var node = orgPanelHandler.orgDoc.selectSingleNode("//span[@id='"+roleid+"']");
      if(node==null)
        {
          node = orgPanelHandler.orgDoc.selectSingleNode("//role[@id='"+roleid+"']");
          if(node!=null)
            {
              retValue = node.getAttribute("name");
            }
         }
      else
         {
           retValue = node.getAttribute("fullname") + " (" + node.getAttribute("account") + ")";
         }
     }
   */
   return retValue;
 }
 
 function getCollections()
   {
     return this.formManager.privilegeDoc.selectSingleNode("//collection").text;
   }

//2005.04.18
/**
*  set some others attribute ,such as author,description,......
*
**/
function setOtherAttribute()
{
  if(this.formManager.privilegeDoc==null)
    return;
  var styles="dialogWidth:295px;dialogHeight:218px;help:no;status:no;scroll:no"
  var arrayWin=new Array() //dialog returnValue
  var author = this.formManager.privilegeDoc.selectSingleNode("//author")
  if(author==null)
    {
        var root = formManager.privilegeDoc.selectSingleNode("//privilege")
        author=formManager.privilegeDoc.createElement("author")
        root.appendChild(author)
    }
  var descriptions= this.formManager.privilegeDoc.selectSingleNode("//description")
  if(descriptions==null)
    {
       var root = formManager.privilegeDoc.selectSingleNode("//privilege")
       descriptions=formManager.privilegeDoc.createElement("description")
       root.appendChild(descriptions)
    }
  var args = new Array();
  args[0] = author.text;
  args[1] = descriptions.text;
  arrayWin = window.showModalDialog("othersets.jsp",args,styles)
  if(arrayWin!=null)
    {
       this.formManager.privilegeDoc.selectSingleNode("//author").text = arrayWin[0]
       this.formManager.privilegeDoc.selectSingleNode("//description").text = arrayWin[1]
    }
}
//
function setCurrentUser(userid)
 {
      //alert(userid+"---"+formManager.formID+"=="+formManager.prvID)
      //alert(this.formManager.privilegeDoc.xml)
      this.userid = userid;
      showPrivilege();
      showPrintablePrivilege(userid);
      showSubmitablePrivilege(userid);
      //add fillters in widget
      showAllWidgetsStyle(userid);
      //add end
 }

//add by muxg at 2005.09.15
function showAllWidgetsStyle(roleId)
 {
   if(roleId==null||roleId=="")
     return;
   if(this.formManager.formPage==null)
     return; 
   var nodes = this.formManager.formPage.childNodes[this.formManager.displayPageNo - 1];
   if(nodes==null)
      return;
   var widgetName;
   for(var i=0;i<nodes.childNodes.length;i++)
     {
     	widgetName = nodes.childNodes[i].id;
     	if(widgetName!="")
     	  {
     	     if(hasEditablePrivilege(roleId,widgetName))
     	       {
     	       	  showWidgetEditabelStyle(widgetName);
     	       }
     	     else if(hasInvisiblePrivilege(roleId,widgetName))
     	       {
                  showWidgetInvisibleStyle(widgetName);
     	       }
     	     else
     	       {
     	          showWidgetUnEditableStyle(widgetName);
     	       }
     	  }
     }
 }

function showWidgetEditabelStyle(fname)
 {
    var widget = document.getElementById(fname);
    if(widget!=null)
      {
        if(widget.childNodes[1]&&widget.childNodes[1].filters.length>0)
          {
            widget.childNodes[1].filters[0].opacity=100;	
          }
      }
 }

function showWidgetUnEditableStyle(fname)
 {
    var widget = document.getElementById(fname);
    if(widget!=null)
      {
        if(widget.childNodes[1]&&widget.childNodes[1].filters.length>0)
          {
            widget.childNodes[1].filters[0].opacity=60;	
          }
      }   
 }
 
function showWidgetInvisibleStyle(fname)
 {
    var widget = document.getElementById(fname);
    if(widget!=null)
      {
        if(widget.childNodes[1].filters.length>0)
          {
            widget.childNodes[1].filters[0].opacity=20;
          }
      }      	
 }

function setCollections(collections_text)
 {
   if(formManager.privilegeDoc!=null)
   {
     formManager.privilegeDoc.selectSingleNode("//collection").text = collections_text;	
   }
   //organiseOrgActors(collections_text.split(";"));
 }
 
//add by 2005.06.10
function clear_userid()
 {
   if(orgPrivilgePanelHandler.tempNode!=null)
     {
       orgPrivilgePanelHandler.tempNode.style.color="navy"
       orgPrivilgePanelHandler.tempNode.style.backgroundColor="transparent"
     }
   orgPrivilgePanelHandler.tempNode=null
   clearCurrentPCategoryNode();
   setCurrentUser("");
   //this.userid=""
   //showPrivilege();
   //showSubmitablePrivilege();
   //showPrintablePrivilege();
 }

function clearCurrentPCategoryNode()
 {
   setUnselectedNodeStyle(orgPanelHandler.currentPCategoryNode);
   orgPanelHandler.currentPCategoryNode = null;
 }
//add end


/***************-----------TOOL FUNCTIONS----------------------************/

/*********** replace old string to new string in the source **************/
function replaceAll(str_source,str_old,str_new)
 {
    return str_source.replace(eval("/"+str_old+"/g"), str_new);
 }

/**
replace word start and end
*/
function replaceSE(str_source,str_old,str_new)
 {
    if(str_source==null)
       return "";
    return str_source.replace(eval("/(^"+str_old+"*)|("+str_old+"*$)/g"), str_new)
 }
/*************************************************************************/

/********************* verion 2.1 *******************************/
function newActorNode()
 {
  var styles="dialogWidth:310px;dialogHeight:185px;help:no;status:no;scroll:no;"
  var newname="" //dialog returnValue
  newname = window.showModalDialog("newformrole.jsp",null,styles);
  //alert(orgPanelHandler.orgActorsDoc.xml)
  if(newname&&newname!=''&&newname.replace(/(^\s*)|(\s*$)/g, "").length>0)
   { 
     newname = newname.replace(/(^\s*)|(\s*$)/g, "");
     var exist = orgPanelHandler.orgActorsDoc.selectSingleNode("//roles[@frm_rolename='"+newname+"']");
     if(exist!=null)
      {
       alert("\u540d\u79f0\u91cd\u590d\uff01");
       return;
      }
     var uid = new Date().getTime();
     var span = document.createElement('<DIV onclick=if(this.nextSibling.innerHTML!="")showBranch(this) style="font-size:12">');
     span.innerHTML = '<img src="css/images/open.gif"/>&#160;<LABEL onclick=setCurrentCategory(this,\"'+uid+'\") style="vertical-align:middle;text-align:center">'+newname+'</LABEL>';
     var spanNSib = document.createElement('<span class="branch2" id="CATEGORY_'+uid+'"></span>')
     orgPanelHandler.orgActorPanel.appendChild(span);
     orgPanelHandler.orgActorPanel.appendChild(spanNSib);
     /**********copy to privilege panel ***********///pcurrentCategoryId
     var pspan = document.createElement('<DIV onclick=if(this.nextSibling.innerHTML!="")showBranch(this) style="font-size:12">');
     pspan.innerHTML = '<img src="css/images/open.gif"/>&#160;<LABEL onclick=setCurrentPCategory(this,\"'+uid+'\") style="vertical-align:middle;text-align:center">'+newname+'</LABEL>';
     var pspanNSib = document.createElement('<span id="PCATEGORY_'+uid+'"class="branch2"></span>')
     orgPrivilgePanelHandler.orgActorPanel.appendChild(pspan);
     orgPrivilgePanelHandler.orgActorPanel.appendChild(pspanNSib);
     addNewNodeToCategoryDoc(uid,newname);
   }
 }


function addNewNodeToCategoryDoc(frmid,frmName)
 {
   var same = orgPanelHandler.orgActorsDoc.selectSingleNode("//roles[@frm_roleid='"+frmid+"']");
   if(same==null)
     {
       	var newNode = orgPanelHandler.orgActorsDoc.createElement("roles");
       	newNode.setAttribute("frm_roleid",frmid);
       	newNode.setAttribute("frm_rolename",frmName);
       	orgPanelHandler.orgActorsDoc.selectSingleNode("//root").appendChild(newNode);
       	addCollection(frmid);
     }
 }
 
function deleteFormRoleNode()
 {
   if(orgPanelHandler.currentCategoryId!=null)
     {
       var branch = document.getElementById("CATEGORY_"+orgPanelHandler.currentCategoryId);
       var pbranch = document.getElementById("PCATEGORY_"+orgPanelHandler.currentCategoryId);
       if(branch!=null&&pbranch!=null)
         {
           branch.parentNode.removeChild(branch.previousSibling);
           branch.parentNode.removeChild(branch);
           removeNodeFromCategoryDoc(orgPanelHandler.currentCategoryId);
           //
           pbranch.parentNode.removeChild(pbranch.previousSibling);
           pbranch.parentNode.removeChild(pbranch);
           //
           //alert(orgPanelHandler.currentCategoryId)
           removeCollection(orgPanelHandler.currentCategoryId);
           orgPanelHandler.currentCategoryNode = null;
           orgPanelHandler.currentCategoryId ="";
         }
     }
 }

function removeNodeFromCategoryDoc(frmId)
 {
   if(orgPanelHandler.orgActorsDoc!=null)
    {
      var node = orgPanelHandler.orgActorsDoc.selectSingleNode("//roles[@frm_roleid='"+frmId+"']");
      if(node!=null)
       {
       	 if(node.text!="")
       	  {
       	   var arr = node.text.split(";");
       	   removeCategoryCollection(arr);
       	  }
         orgPanelHandler.orgActorsDoc.selectSingleNode("//root").removeChild(node);
       }
    }
 }
 
function removeCategoryCollection(roles)
 {
   if(roles==null)return;
   var roles_cp = roles;
   var collectionNode = orgPanelHandler.orgActorsDoc.selectSingleNode("//collection");
   if(collectionNode.text=="")
     return;
   var arr_roles = collectionNode.text.split(";");
   var collectionText = "";
   for(var gg=0;gg<arr_roles.length;gg++)
     {
        //alert(roles_cp.contain(arr_roles[gg]))
     	if(roles_cp.contain(arr_roles[gg])==-1)
     	  {
     	    if(collectionText=="")	
     	      {
     	        collectionText = arr_roles[gg];
     	      }
     	    else
     	      {
     	        collectionText = collectionText + ";" +arr_roles[gg];
     	      }
     	  }
     }
   collectionNode.text = collectionText;
   
 }

function organiseOrgActorsWorkflow(actors)
  {
  //alert(formManager.privilegeDoc.xml)
  if(orgPanelHandler.orgActorsDoc==null)return;
  var roleNode = orgPanelHandler.orgActorsDoc.selectSingleNode("//roles");
 if(roleNode!=null)
   { 
     var collection1 = orgPanelHandler.orgActorsDoc.selectSingleNode("//collection");
     if(collection1==null||collection1.text=="")
       return;
     
     var srcActors = collection1.text.split(";");
     //removeFromCategory();
     //copyPrivilege
     
     var ct=-1;
     for(var ll=0;ll<actors.length;ll++)
       {
          ct = srcActors.contain(actors[ll]);
          if(ct==-1)
            {
               var node=orgPanelHandler.orgDoc.selectSingleNode("//role[@id='"+actors[ll]+"']")
               var newRolesNode = orgPanelHandler.orgActorsDoc.createElement("roles");
               newRolesNode.setAttribute("frm_roleid",actors[ll]);
               newRolesNode.setAttribute("frm_rolename",node.getAttribute("name"));
               //alert(this.orgPanelHandler.orgDoc.xml)
               newRolesNode.text = actors[ll];
               orgPanelHandler.orgActorsDoc.selectSingleNode("//root").appendChild(newRolesNode);
            }
       }
      for(var tl=0;tl<srcActors.length;tl++)
       {
         ct = actors.contain(srcActors[tl]);
         if(ct==-1)
           {
             removeCollection(srcActors[tl]);
           }
       }
     var rolesNodes = orgPanelHandler.orgActorsDoc.selectNodes("//roles");
     //alert(orgPanelHandler.orgActorsDoc.xml)
     //alert(formManager.privilegeDoc.xml)
     for(var bl=0;bl<rolesNodes.length;bl++)
      {
        var roletextArray = rolesNodes[bl].text.split(";");
        if(roletextArray.length>1)
          {
            for(var el=1;el<roletextArray.length;el++)
              {  
                 if(roletextArray[el]!="")
                   {
                     var newRolesNode = orgPanelHandler.orgActorsDoc.createElement("roles");
                     var frm_roleId = (new Date()).getTime();
                     newRolesNode.setAttribute("frm_roleid",frm_roleId);
                     newRolesNode.text = roletextArray[el];
                     orgPanelHandler.orgActorsDoc.selectSingleNode("//root").appendChild(newRolesNode);
                     copyPrivilege(frm_roleId,rolesNodes[bl].getAttribute("frm_roleid"));
                   }
              }
            rolesNodes[bl].text = roletextArray[0];
          }
         
      }
     //set frm_name
     var nns = orgPanelHandler.orgActorsDoc.selectNodes("//roles");
     var roleNode = null;
     var roleName = "";
     for(var ia=0;ia<nns.length;ia++)
       {
         roleNode = orgPanelHandler.orgDoc.selectSingleNode("//role[@id='"+nns[ia].text+"']");
         if(roleNode!=null)
          {
           roleName = roleNode.getAttribute("name");
           roleNode = orgPanelHandler.orgActorsDoc.selectSingleNode("//roles[text()='"+nns[ia].text+"']");
           if(roleNode!=null)
            {
              roleNode.setAttribute("frm_rolename",roleName);
            }
          }
          //alert(roleName)
       }
     //set frm_name end
     setCollectionsAsXml(orgPanelHandler.orgActorsDoc);
     //alert(orgPanelHandler.orgActorsDoc.xml)
      //copyPrivilege
     //alert(formManager.privilegeDoc.xml)
   }
 else
 {
  var xml = "";
  xml='<?xml version="1.0"?><root>';
  var formId = formManager.privilegeDoc.selectSingleNode("//formID").text;
  var prvID = formManager.privilegeDoc.selectSingleNode("//privilegeID").text;
  xml = xml + "<formid>"+formId+"</formid>";
  xml = xml + "<privilegeid>"+prvID+"</privilegeid>";  
   //xml = xml + "";
   //xml = 
 if(actors==null||actors.length==0)
   {
     xml = xml + "<collection></collection><root>";
   }
 else
  {
     var collections="";
     for(var i=0;i<actors.length;i++)
        {
          var hasIt = false;
             node=orgPanelHandler.orgDoc.selectSingleNode("//role[@id='"+actors[i]+"']")
             if(node!=null)
                {
                  hasIt = true;
                  
                  xml = xml + '<roles frm_roleid="'+actors[i]+'" frm_rolename="'+node.getAttribute("name")+'">';
                  xml = xml + actors[i]+ '</roles>';                  
                  //addSourceActors(spanNSib,pspanNSib,node.getAttribute("id"),node.getAttribute("name"));
                  //spanNSib.innerHTML = node.getAttribute("name")
             	  //addRole(node.getAttribute("id"),node.getAttribute("name"))
             	}
          /**add 2005.09.01 remove no exist roles*/
          if(!hasIt)
            {
              removeCollection(actors[i]);
            }
          else
            {
            	if(collections=="")
            	 {
            	   collections = actors[i];	
            	 }
            	else
            	 {
            	   collections = collections + ";" + actors[i];
            	 }
            }
        }          
    xml = xml + "<collection>"+collections+"</collection></root>";             
   }
  
  var doc = new ActiveXObject("MSXML2.DOMDocument.4.0");
  doc.async = false;
  doc.loadXML(xml);

  setCollectionsAsXml(doc); 
  
   }
  }
function organiseOrgActors(actors)
 {
   //formM 
  var xml = "";
  xml='<?xml version="1.0"?><root>';
  var formId = formManager.privilegeDoc.selectSingleNode("//formID").text;
  var prvID = formManager.privilegeDoc.selectSingleNode("//privilegeID").text;
  xml = xml + "<formid>"+formId+"</formid>";
  xml = xml + "<privilegeid>"+prvID+"</privilegeid>";  
   //xml = xml + "";
   //xml = 
 if(actors==null||actors.length==0)
   {
     xml = xml + "<collection></collection><root>";
   }
 else
  {
     var collections="";
     for(var i=0;i<actors.length;i++)
        {
          var hasIt = false;
          node=orgPanelHandler.orgDoc.selectSingleNode("//span[@id='"+actors[i]+"']")
          if(node!=null)
            {
                hasIt = true;
                xml = xml + '<roles frm_roleid="'+actors[i]+'" frm_rolename="'+node.getAttribute("fullname")+'">';
                xml = xml + actors[i]+ '</roles>';
                //addSourceActors(spanNSib,pspanNSib,node.getAttribute("id"),node.getAttribute("fullname"));
                //spanNSib.innerHTML = node.getAttribute("fullname")
                //addPerson(node.getAttribute("id"),node.getAttribute("fullname"),node.getAttribute("account"))
            }
          else{
             node=orgPanelHandler.orgDoc.selectSingleNode("//role[@id='"+actors[i]+"']")
             if(node!=null)
                {
                  hasIt = true;
                  xml = xml + '<roles frm_roleid="'+actors[i]+'" frm_rolename="'+node.getAttribute("name")+'">';
                  xml = xml + actors[i]+ '</roles>';                  
                  //addSourceActors(spanNSib,pspanNSib,node.getAttribute("id"),node.getAttribute("name"));
                  //spanNSib.innerHTML = node.getAttribute("name")
             	  //addRole(node.getAttribute("id"),node.getAttribute("name"))
             	}
          }
          /**add 2005.09.01 remove no exist roles*/
          if(!hasIt)
            {
              removeCollection(actors[i]);
            }
          else
            {
            	if(collections=="")
            	 {
            	   collections = actors[i];	
            	 }
            	else
            	 {
            	   collections = collections + ";" + actors[i];
            	 }
            }
        }          
    xml = xml + "<collection>"+collections+"</collection></root>";             
   }
  
  var doc = new ActiveXObject("MSXML2.DOMDocument.4.0");
  doc.async = false;
  doc.loadXML(xml);
  //alert(xml)
  setCollectionsAsXml(doc);
 }
 
function getActualCollection()
 {
   var returnV ="";
   if(orgPanelHandler.orgActorsDoc!=null&&orgPanelHandler.orgActorsDoc.xml!='')
     {
       var roleNodes = orgPanelHandler.orgActorsDoc.selectNodes("//roles");
       for(var ss=0;ss<roleNodes.length;ss++)
         {
           if(roleNodes[ss].text!='')
             {
               	if(returnV=="")
               	  {
               	    returnV = roleNodes[ss].getAttribute("frm_roleid");
               	  }
               	else
               	  {
               	    returnV = returnV+";"+roleNodes[ss].getAttribute("frm_roleid");
               	  }
             }
         }
     }
   
   return returnV;
 }
 
 function modifyFormRoleNode()
  {
    if(orgPanelHandler.currentCategoryNode!=null&&orgPanelHandler.orgActorsDoc!=null&&orgPanelHandler.orgActorsDoc.xml!='')
      {
       var styles="dialogWidth:310px;dialogHeight:210px;help:no;status:no"
       var oldname=orgPanelHandler.currentCategoryNode.innerHTML;
       var newname="" //dialog returnValue
       newname = window.showModalDialog("modifyformrole.jsp",oldname,styles);
 
       if(newname&&newname!=''&&newname.replace(/(^\s*)|(\s*$)/g, "").length>0)
          {
             newname = newname.replace(/(^\s*)|(\s*$)/g, "");
             var exist = orgPanelHandler.orgActorsDoc.selectSingleNode("//roles[@frm_rolename='"+newname+"']");
             if(exist!=null)
              {
                alert("\u540d\u79f0\u91cd\u590d\uff01");//name repeate
                return;
              }
             var span = document.getElementById("PCATEGORY_"+orgPanelHandler.currentCategoryId);
             if(span!=null&&span.previousSibling!=null&&span.previousSibling.hasChildNodes())
               {
                 span.previousSibling.childNodes[2].innerHTML = newname;
                 changeFormRoleName(orgPanelHandler.currentCategoryId,newname);
                 orgPanelHandler.currentCategoryNode.innerHTML=newname;
               }
          }        
      }
  }
  
 function changeFormRoleName(frm_roleId,frm_roleName)
  {
    var node = orgPanelHandler.orgActorsDoc.selectSingleNode("//roles[@frm_roleid='"+frm_roleId+"']");
    if(node!=null)
      {
        node.setAttribute("frm_rolename",frm_roleName);
      }
  }
  
function getFormRoleId(roleid)
  {
     var returnValue="";
     if(roleid==null||roleid=="")return returnValue;
     var rolesNodes = orgPanelHandler.orgActorsDoc.selectNodes("//roles");
     for(var ml=0;ml<rolesNodes.length;ml++)     
       {
          if(rolesNodes[ml].text.split(";").contain(roleid)!=-1)
           {
             returnValue = rolesNodes[ml].getAttribute("frm_roleid");
             break;
           }
       }
     return returnValue;
  }
  
//interface for workflow
function setFormID(formId)
 {
   this.formManager.formID = formId
   //loadFormPage();
 }
function setPrivilegeID(formId,prvId)
 { 
   this.formManager.formID = formId
   this.formManager.prvID = prvId
 }
function loadForm(formpagepanelid){
    
    //alert(this.formManager.formID+"---"+this.formManager.prvID)
    if(this.formManager.formID!=null&&this.formManager.formID!=""&&this.formManager.prvID!=null&&this.formManager.formID!="")
      { 
        loadFormPage();
        //alert(formManager.formPage);
        LoadAttribute(this.formManager.formID,this.formManager.prvID,"uniflow");
        //alert();
      }
   else if(this.formManager.formID==null||this.formManager.formID=="")
      {
        alert("\u9519\u8bef\uff1a\u8868\u5355\u6807\u8bc6\uff08ID\uff09\u4e3a\u7a7a\uff01");//????????ID???
        return;
      }
   else if(this.formManager.prvID==null||this.formManager.prvID=="")
     {
       alert("\u9519\u8bef\uff1a\u6743\u9650\u6807\u8bc6\uff08ID\uff09\u4e3a\u7a7a\uff01");//????????ID???
       return;
     }
}
 
function setOperators(operators)
 {
   operators = replaceSE(operators,";","");
   var opers_array = operators.split(";");
   var opers="";
   var orgXml="<roles>";
   var temp;
   for(var op=0;op<opers_array.length;op++)
     {
     	temp = opers_array[op].split(",");
     	if(temp.length==1)
     	  {
            if(op==0)
              {
                 opers = temp[0];
              }
            else
              {
              	 opers = opers + ";" + temp[0];
              }
            orgXml = orgXml + "<role id='"+temp[0]+"' name='\u53d8\u91cf'/>";
     	  }
     	else if(temp.length==2)
          {
            if(op==0)
              {
                 opers = temp[1];
              }
            else
              {
              	 opers = opers + ";" + temp[1];
              }
            orgXml = orgXml + "<role id='"+temp[1]+"' name='"+ temp[0] +"'/>";
          }
        else{}
     }
   orgXml = orgXml + "</roles>";
   var xmlDoc=new ActiveXObject("MSXML2.DOMDocument.4.0");
   xmlDoc.async=false;
   xmlDoc.loadXML(orgXml);
   this.orgPanelHandler.orgDoc = xmlDoc
   this.formManager.operators = opers
   //setCollections(opers);
   formManager.privilegeDoc.selectSingleNode("//privilegeID").text = this.formManager.prvID
   organiseOrgActorsWorkflow(opers.split(";"));
 }
function setOrgElementName(orgname)
 {
  if(orgname!=null&&orgname!=""&&this.formManager.prvID!=""&&this.formManager.prvID!=null&&this.formManager.formPage!=null)
    {
      var formRoleId = getFormRoleId(orgname);
      setCurrentUser(formRoleId);
    }
 }
function savePolicies()
 {
   savePrivilege();   	
 }
//interface for workflow

