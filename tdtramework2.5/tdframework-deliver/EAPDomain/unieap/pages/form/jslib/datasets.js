var datasetHandler={
                      leftSelect  : null,//obj
                      rightSelect : null,//obj
                      leftList    : null,//Array
                      rightList   : null //array
                   }

function init(leftListId,rightListId)
{
  var datasets = window.dialogArguments
  if(datasets==null||datasets=="")
    return;
  this.datasetHandler.leftSelect = document.getElementById(leftListId)
  this.datasetHandler.rightSelect= document.getElementById(rightListId)
  
  var leftStr  = datasets.split("&")[0]
  var rightStr = datasets.split("&")[1]
  
  this.datasetHandler.leftList = leftStr.split(";")
  this.datasetHandler.rightList= rightStr.split(";")
  
  // when left contain right one ,remove
  var alen = datasetHandler.rightList.length
  for(var i=0;i<alen;i++)
   {
     var idx = this.datasetHandler.leftList.containToLowerCase(this.datasetHandler.rightList[i])
     if(idx!=-1)
       {
         //change to new case 
         this.datasetHandler.rightList[i] = datasetHandler.leftList[idx]
         //end
         this.datasetHandler.leftList.remove(idx)
       }
     else
       { 
         this.datasetHandler.rightList.remove(i)
         alen--;
         i--;
       }
   }
  if(leftStr!="")
    {
     var llist = datasetHandler.leftList
     var option=null
     for(var i=0;i<llist.length;i++)
       {
         option = createOption(llist[i])
         datasetHandler.leftSelect.appendChild(option)
       }
    }
  if(rightStr!="")
    {
     var rlist = datasetHandler.rightList
     var option= null
     for(var i=0;i<rlist.length;i++)
       {
         option=createOption(rlist[i])
         datasetHandler.rightSelect.appendChild(option)
       }
    }
}

function addDataSet()
{
  if(datasetHandler.leftSelect==null)return;
  var len = datasetHandler.leftSelect.options.length
  var txt ="";
  for(var i=0;i<datasetHandler.leftSelect.options.length;i++)
   {
     if(datasetHandler.leftSelect.options[i].selected)
       {
       	 var option_obj = datasetHandler.leftSelect.options[i]
         txt = option_obj.text
         /*
         var exist = false
         for(var j=0;j<datasetHandler.rightSelect.options.length;j++)
           {
             if(datasetHandler.rightSelect.options[j].text==txt)
               {
                 exist =true
                 break;	
               }
           }
         if(!exist)
         */
         datasetHandler.rightSelect.appendChild(createOption(txt))
         datasetHandler.leftSelect.removeChild(option_obj)
         i--
       }
   }
}

function addAllDataSet()
{
  if(datasetHandler.leftSelect==null)return;
  var len = datasetHandler.leftSelect.options.length
  var txt ="";
  for(var i=0;i<datasetHandler.leftSelect.options.length;i++)
   {
   	 var option_obj = datasetHandler.leftSelect.options[i]
         txt = option_obj.text
         /*
         var exist = false
         for(var j=0;j<datasetHandler.rightSelect.options.length;j++)
           {
             if(datasetHandler.rightSelect.options[j].text==txt)
               {
                 exist =true
                 break;	
               }	
           }
         if(!exist)
         */
         datasetHandler.rightSelect.appendChild(createOption(txt))
         //
         datasetHandler.leftSelect.removeChild(option_obj)
         i--
   }
}

function removeDataSet()
{
  if(datasetHandler.rightSelect==null)return;
  var selectedOption = null;
  for(var i=0;i<datasetHandler.rightSelect.options.length;i++)
    {
      selectedOption = datasetHandler.rightSelect.options[i]
      var txt= selectedOption.text
      if(selectedOption.selected)
        {
          datasetHandler.rightSelect.removeChild(selectedOption)
          datasetHandler.leftSelect.appendChild(createOption(txt))
          i--
        }
    }
}

function removeAllDataSet()
{
  if(datasetHandler.rightSelect==null)return;
  var selectedOption = null;
  for(var i=0;i<datasetHandler.rightSelect.options.length;i++)
    {
      selectedOption = datasetHandler.rightSelect.options[i]
      var txt= selectedOption.text
      datasetHandler.rightSelect.removeChild(selectedOption)
      datasetHandler.leftSelect.appendChild(createOption(txt))
      i--
    }
}

function createOption(txt)
{
  var newOption = document.createElement("OPTION")
  newOption.innerHTML = txt
  return  newOption;
}

/**
*  returnValue
* 
**/
function setValidate()
{
  if(!window.parent)
    return;
  var returnV=""
  
  
  if(datasetHandler.rightSelect&&datasetHandler.rightSelect.hasChildNodes())
    {
       var len = datasetHandler.rightSelect.options.length
       for(var i=0;i<len;i++)
         {
           if(i==0)
             returnV=datasetHandler.rightSelect.options[0].text
           else
      	     returnV=returnV+";"+datasetHandler.rightSelect.options[i].text
         }
    }
  window.returnValue = returnV
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

Array.prototype.containToLowerCase = function(obj)
  {
    var rv=-1//returnValue
    for(i=0;i<this.length;i++)
      {
        if(this[i].toLowerCase()==obj.toLowerCase())
          {
            rv=i;
            break;
          }
      }
    return rv;
  }