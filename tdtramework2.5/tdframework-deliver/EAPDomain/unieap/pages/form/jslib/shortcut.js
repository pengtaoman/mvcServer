
/**********************
*   shortcut set privilege ,import by shortcut.jsp
*   author:muxg
*   date:2005.09.14
**********************/

var shortcutHandler = {
	                parentWin :null,
	                roleSelect:null,
	                radioGroupId:"",
	                radiosGroup1:null
	              }

function init(curuserId,allroleslistId,radioGroupId)
 {
   this.shortcutHandler.parentWin = window.dialogArguments;
   this.shortcutHandler.roleSelect = document.getElementById(allroleslistId);
   this.shortcutHandler.radioGroupId = radioGroupId;
   this.shortcutHandler.radiosGroup1 = document.getElementsByName(radioGroupId);
   var span = document.getElementById(curuserId);
   if(span!=null)
     {
       var roleName = this.shortcutHandler.parentWin.getCurrentRoleLabel(this.shortcutHandler.parentWin.userid);
       if(roleName==""||roleName==null)
         {
           span.innerHTML = ""//
         } 
       else
       	 {
           span.innerHTML = roleName;	 	
       	 }
     }
   if(this.shortcutHandler.roleSelect!=null)
      {
        setSelectOptions();
        if(this.shortcutHandler.roleSelect.childNodes.length<=1)
          {
            this.shortcutHandler.radiosGroup1[0].setAttribute("disabled","true");
          }
      }
 }
 
function setSelectOptions()
 {
    var collections = shortcutHandler.parentWin.getCollections();
    if(collections!=null&&collections!="")
      {
         var actors = collections.split(";");
         var text1;
         for(var i in actors)
           {
              if(actors[i]!=this.shortcutHandler.parentWin.userid)
                {
                  text1 = this.shortcutHandler.parentWin.getCurrentRoleLabel(actors[i]);
                  if(text1!=null&&text1!="")
                    {
                      shortcutHandler.roleSelect.appendChild(createOption(actors[i],text1));  	
                    }
                }	
           }
      }
 }

function createOption(value,txt)
{
  var newOption = document.createElement("OPTION");
  newOption.setAttribute("value",value);
  newOption.innerHTML = txt
  return  newOption;
}

function changeSelect(radioObj)
 {
   if(radioObj.value==0)
     {
       for(var r=0;r<shortcutHandler.radiosGroup1.length;r++)
         {
           if(shortcutHandler.radiosGroup1[r].value==1)	
             {
                this.shortcutHandler.roleSelect.setAttribute("disabled","true");
                break;
             }
         }
     }
   else if(radioObj.value==1)
     {
     	this.shortcutHandler.roleSelect.removeAttribute("disabled");
     }
 }
function setValidate()
  {
     var selectval = getRadioSelectedValue(this.shortcutHandler.radiosGroup1);
     if(selectval==0)
       {
       	 this.shortcutHandler.parentWin.removeAllPrivilege(shortcutHandler.parentWin.userid);
       	 
       }
     else if(selectval==1)
       {
         this.shortcutHandler.parentWin.copyPrivilege(shortcutHandler.parentWin.userid,getSelectedValue(shortcutHandler.roleSelect));
         this.shortcutHandler.parentWin.setCurrentUser(shortcutHandler.parentWin.userid);
       }
  }
  
function getRadioSelectedValue(radiosGroup)
  {
     var retvalue;
     for(var a=0;a<radiosGroup.length;a++)
       {
          if(radiosGroup[a].checked)
            {
              retvalue =  radiosGroup[a].value;
              break;
            }
       }
     return retvalue;
  }

function getSelectedValue(selectObj)
  {
     return selectObj.options[selectObj.selectedIndex].value;
  }