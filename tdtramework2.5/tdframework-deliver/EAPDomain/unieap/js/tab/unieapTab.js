function TabManager(){//�����������ھ���tab�����в���ֱ�����á���ͨ������window����
    this.tabsContainer = new Array();
    this.activeTab = null;
}
//����
TabManager.prototype.addTab = function(objTabS){
   
  /* for(var i=0;i<this.tabsContainer.length;i++){
       if(this.tabsContainer[i].id==objTabS.id){
           this.activeTab = objTabS;
           this.tabsContainer[i] = objTabS;
           return;
       }
    }*/

    this.tabsContainer[this.tabsContainer.length] = objTabS;
  
}

TabManager.prototype.empty=function(){
  return this.tabsContainer.length==0;
}




//ȡ��
TabManager.prototype.getTab = function(id){
   if(typeof id =="undefined"){
        if(this.activeTab)
           return this.activeTab;
        else{
           alert("û��ָ�����Tabҳ��");
           return null;
        }   
    } 
    for(var i=0;i<this.tabsContainer.length;i++){
         
       if(this.tabsContainer[i].controlid==id){
           this.activeTab = this.tabsContainer[i];
           return this.activeTab;
       }
    }
    alert("�����ڽ���"+id+"����Tabҳ��");
    return null;
}
//�Ƴ�
TabManager.prototype.removeTab = function(id){
   for(var i=0;i<this.tabsContainer.length;i++){
       if(this.tabsContainer[i].id==id){
           this.tabsContainer[i]=this.tabsContainer[this.tabsContainer.length-1];
           this.tabsContainer.pop();
           return true;
       }
    }
    return false;
}

TabManager.prototype.clearlaunch=function(){
    objTab = new Tab();
    __aAllTabComponents = new Array();
    code="";
    controlID=""
    P6o2$ = null
}

//У������
TabManager.prototype.checkLogical=function(tab){
   if(tab.tabMode==2){//ȷ����tab��ģʽ2�в�������
      tab.maxTabItemsPerRow = 100;
  }else{
    
     //tab.cellWidth=0;
  }
   var items=tab.aItems;
   var num=0;
   for(var i=0;i<items.length;i++){
     if(items[i].withoutURL){
       items[i].url="";//���û��ڱ�ǩ�䶨��HTMLʱ�������û�������ҳ
     }
     /*У��activeһ������ֻ��һ���������漰������Ȩ�����*/
    if(items[i].active==true){
       if(num==0){
          num++;
       }else{
         items[i].active=false;
         num++
      }
     }
   }
   if(num==0){
    for(var i=0;i<items.length;i++){
       if(items[i].visible&&items[i].enabled){
            items.active=true;
            break;
       }
    }
   }
   
   this.preHandle(tab); 
   
   var aVisibleItem=objTab.aVisibleItem;
  
   var num=0;
   for(var i=0;i<aVisibleItem.length;i++){
      if(aVisibleItem[i].active && aVisibleItem[i].enabled==true){
          num++;
      }
   }

   if(num!=1){
      for(var i=0;i<aVisibleItem.length;i++){
       if(aVisibleItem[i].active){
          aVisibleItem[i].active=false;
       }
      }
      
      
      for(var i=0;i<aVisibleItem.length;i++){
      
      if(aVisibleItem[i].enabled){
         aVisibleItem[i].active=true;
          break;
       }
      }
     
   }
   ///////////////////////////////////////////////////////////////////////////////////////////
   //����tab����ֻ��һ��tabҳʱ��Ҫ����ʾ
   if(aVisibleItem.length==1 && aVisibleItem[0].visible && aVisibleItem[0].enabled){
       aVisibleItem[0].active=true;
   }
   
   for(var i=0;i<aVisibleItem.length;i++){
     
      if(aVisibleItem[i].active && aVisibleItem[i].enabled){
        document.all(objTab.controlid).style.height=aVisibleItem[i].height;
        break;
      }
   }
   
   
   
   if(aVisibleItem.length==1&&aVisibleItem[0].visible){
     objTab.onlyOne=true;//��ʾֻ��һ��tabҳ
   }
   
 
}


/*Ϊ������mode1ʱ��������ǰ����һЩ׼��*/
TabManager.prototype.preHandle=function(tab){

 /* tab.frameWidth=tab.width;
  if(tabWidth.indexOf("%")!="-1){
     tab.width=
  }*/

 var ispercent=false;
 constant=30;
  objTab=tab;
   objTab.currentBeginIndex=0;
   objTab.currentEndIndex=-100;

  if((objTab.width+"").indexOf("%")!=-1){
     ispercent=true;
     objTab.width=document.all(objTab.controlid).offsetWidth;
    objTab.ispercent=true;
    }else{
     objTab.ispercent=false;
    
    }
   var aVisibleItem = new Array();
   __aAllTabComponents=document.all(tab.controlid).contentWindow. __aAllTabComponents;
    for (var j = 0;j < __aAllTabComponents.length;j++) {
            if (__aAllTabComponents[j].visible)
                aVisibleItem[aVisibleItem.length] = __aAllTabComponents[j];
    }
   objTab.aVisibleItem=aVisibleItem;//�ɼ�����

  
 
   if(tab.tabMode==2){
     if(ispercent){
      
   objTab.cellWidth="100%";
     }
       return;
   }
   /*�����һ�����û��ͼƬ��ȫû��ͼƬ*/
   var hasimg=aVisibleItem[0].image==""?false:true;
   var isOK=true;
   for(var j = 0;j < aVisibleItem.length;j++){
      if(hasimg){
          if(aVisibleItem[j].image==""){
             isOK=false;
              break;
          }
      }else{
         if(aVisibleItem[j].image!=""){
             isOK=false;
             break;
          }
      }
   }
   if(!isOK){
      for(var j = 0;j < aVisibleItem.length;j++){
         aVisibleItem[j].image="";
      }
   }
   //��ȫû��ͼƬʱ�̶�������һ���ı䣬ȥ��ͼ�󲿷�
   if(aVisibleItem[0].image==""){
     constant=constant-imgconstant;
     document.all(objTab.controlid).contentWindow.constant=constant-imgconstant;
   }
   
   objTab.aVisibleItem=aVisibleItem;//�ɼ�����
   
   /*ȷ���ֲ���ز���*/
   var per=constant+parseInt(tab.cellWidth);//Ԥ��ÿ����Ԫ�ı�����
  
    if(objTab.aVisibleItem.length*(constant+objTab.cellWidth)<=objTab.getWidth(true)){//����Ҫ����
       objTab.countRow=1;
       return;
   }

  
   var totalwidth=per*aVisibleItem.length;//Ԥ���ܳ���
  
   var rowcounts=Math.ceil(totalwidth/objTab.getWidth(true));//��������

   var residue=aVisibleItem.length%rowcounts;//����

   var displaycount;//=Math.ceil(aVisibleItem.length/rowcounts)//�׶�ÿ�е�Ԫ�ĸ�������β�ζ�1�򲻶ࣩ
   var lastrowcount;//=aVisibleItem.length-displaycount*(rowcounts-1);//β��ÿ�е�Ԫ�ĸ���
   lastrowcount=parseInt(aVisibleItem.length/rowcounts);
  if(residue==0){
     displaycount=lastrowcount;
   }else{
     objTab.keypoint=rowcounts-residue-1;
     displaycount=lastrowcount+1;
   }
 
   

   //β�η����Ԫ�ı�����
   var lastTextWidth=parseInt((objTab.getWidth(true)-constant*lastrowcount-constant)/lastrowcount);//������һ��������
   objTab.cellWidth=parseInt(objTab.getWidth(true)/displaycount-constant);//�׶η����Ԫ�ı��������Է�������������
   /*var displaycount=parseInt(objTab.getWidth(true)/per);
   var lastrowcount;
   var lastTextWidth;
   var rowcounts;
   

      var total=aVisibleItem.length;
      objTab.cellWidth=objTab.getWidth(true)/displaycount-constant;
      rowcounts=Math.ceil(total/displaycount);
      lastrowcount=total-displaycount*(rowcounts-1);
      lastTextWidth=(objTab.getWidth(true)-constant*lastrowcount)/lastrowcount;
    */  
      
   objTab.lastrowcount=lastrowcount;//β���и���
   objTab.displaycount=displaycount;//�׶��и���
   objTab.maxTabItemsPerRow =lastrowcount;//һ��������ɵĸ���
   objTab.lastTextWidth=lastTextWidth;//���һ�е�text�Ŀ��
  
   objTab.countRow=rowcounts;//������ʾ������
   objTab.currentRow=-1;
   objTab.nolastrowlast=objTab.getWidth(true)-(objTab.cellWidth+constant)*(objTab.displaycount-1)-constant;//�׶�ÿ�����Ԫ����
   objTab.lastrowlast=objTab.getWidth(true)-(objTab.lastTextWidth+constant)*(objTab.lastrowcount-1)-constant;//β��ÿ�����Ԫ����
  
  
  
   if(residue==0){//���������������ʱ���ֵ�offset
   objTab.nolastrowlast=objTab.lastrowlast;
   objTab.cellWidth=objTab.lastTextWidth;
    }
  

  //////////////////////////////////////////////////////////////////////
  if(ispercent){
  objTab.ispercentCellWidth=true;
 var percentCellWidth=(((objTab.width-13*(objTab.lastrowcount+1))/(objTab.width))/objTab.lastrowcount)*10000;
 objTab.lastmidlastcol=Math.floor(percentCellWidth)/100;
 objTab.lastmid=Math.floor(percentCellWidth)/100+"%";

 
 
 percentCellWidth=(((objTab.width-13*(objTab.displaycount+1))/(objTab.width))/objTab.displaycount)*10000;
 objTab.midlastcol=Math.floor(percentCellWidth)/100;
 
 objTab.mid=Math.floor(percentCellWidth)/100+"%";
 
 var percentInner=17*objTab.lastrowcount/(objTab.width-13-30*(objTab.lastrowcount));
 objTab.lastTextWidth=objTab.lastrowlast=(1-percentInner)*100+"%";
 objTab.lastimglastWidth=percentInner*100+"%";
 
 percentInner=17*objTab.displaycount/(objTab.width-13-30*(objTab.displaycount));
 
 
 objTab.cellWidth=objTab.nolastrowlast="100%";
 objTab.lastTextWidth=objTab.lastrowlast="100%"

 objTab.imglastWidth=percentInner*100+"%";

 objTab.sideimgWidth=Math.floor(((13/(objTab.width))*10000))/100;


 objTab.lastmidlastcol=(100-((objTab.sideimgWidth+objTab.lastmidlastcol)*(objTab.lastrowcount-1)+(2*objTab.sideimgWidth)))+"%";


 objTab.midlastcol=(100-((objTab.sideimgWidth+objTab.midlastcol)*(objTab.displaycount-1)+(2*objTab.sideimgWidth)))+"%";

 objTab.sideimgWidth=objTab.sideimgWidth+"%";
 
 //alert(objTab.lastmidlastcol+":"+objTab.midlastcol+":"+objTab.lastTextWidth+":"+objTab.imglastWidth+":"+objTab.cellWidth+":"+objTab.lastimglastWidth+":"+objTab.sideimgWidth);
 
 }else{
  objTab.ispercentCellWidth=false;
  objTab.mid="";
  objTab.midlastcol="";
  
  objTab.lastmid=""; 
  objTab.lastmidlastcol=""; 
  objTab.imglastWidth=objTab.lastimglastWidth=17;
  objTab.sideimgWidth=13;
 }
  
  
  
  
   //alert(lastTextWidth+":"+objTab.cellWidth);
   //alert((displaycount-1)*objTab.cellWidth+ objTab.nolastrowlast-(lastrowcount-1)*objTab.lastTextWidth-objTab.lastrowlast);
}



TabManager.prototype.checkLogocalAtEnd=function(tab){
  
 /* if(tab.tabMode==1&& tab.countRow!=1){//���ģʽһ����Ҫ��������Ҫ������һ�к�����һ�л���
   
      var frame= document.all(tab.controlid).contentWindow.document;
       var first=frame.all("row"+tab.controlid+"0");
       var last=frame.all("row"+tab.controlid+(tab.countRow-1));
       var temp=first.innerHTML;
       first.innerHTML=last.innerHTML;
       last.innerHTML=temp; 
    
      
  
       
    }*/
}

//����
TabManager.prototype.launch=function(){//������ڳ���

  
  if(document.readyState.toLowerCase()!="complete"){
 
  setTimeout("manager.launch()",50);
  return;
  }
  
  
  


   
   
   finishload=new Array();
   
   var tempContainer=new Array();
   var length=this.tabsContainer.length;

   for(var i=0;i<this.tabsContainer.length;i++){//�ڶ�tabҳʱ���밴��ԭ��˳�����������֣�����������ڶ��߳������˳����ҡ�
    tempContainer[i]="";
   } 
 
   for(var i=0;i<this.tabsContainer.length;i++){
      
      var index=this.tabsContainer[i].sequence;
     
      
    
      if(index==-1){
            alert("����tab����ڳ�����һ���ڲ�����ԭ����"+objTab.controlid+"��sequence��-1!");
            return;
       }
      tempContainer[index-1]=this.tabsContainer[i];
    
   }
    this.tabsContainer=tempContainer;

   
   
  

   for(var i=0;i<length;i++){
       objTab=this.tabsContainer[i];
       
      
       objTab=this.tabsContainer[objTab.sequence-1];
       if(objTab.launched){
        continue;
       }
       
       this.checkLogical(objTab);
       objTab.create();
       this.checkLogocalAtEnd(objTab);
       objTab=new Tab();//��ն��������Ա�����
  }
  constant=30;
  

}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//var finishload;
var controlID="";//tab�����ռ乫��tabid
var objTab;//tab�����ռ��������߶�������
var B2T = 100;//��ǩ��ֵ��Ϊÿ��tabҳ������
var browser = new Browser();
var P6o2$ = null;//�����tabҳ
var version = "2.0.0323";
var EW70c = 20;
var img_base = "../../images/tab/tabimg/"//ͼƬλ��
var __aAllTabComponents;//��ʱ���ԣ�������������tabҳ����
var totalbuttonwidth=34//ģʽ2��Ŧ��С

 var manager =new TabManager();//��ʱ����

var code="";
var displayfirstlabel='-1';
var imgconstant=17;//��ʾͼƬ���
var constant=30;//��ǩ���ҿ�Ⱥ�

/////////////////////////////////////////////////////////////////////

function Browser() {
    var agent = navigator.userAgent.toLowerCase();
    this.ns = ( (agent.indexOf("mozilla ") != -1) && ( (agent.indexOf("spoofer ") == -1) && (agent.indexOf("compatible ") == -1)));
    this.ie = (agent.indexOf("msie") != -1);
    this.opera = (agent.indexOf("opera") != -1);
}

function Tab() {
/*
�������ط�׷�ӵ����ԣ�
currentItem//��ǰ��ǩҳ
alload//ȫ����



*/
    this.submitCheckJSMethod="";
    this.sequence=-1;
    this.keypoint=1000;//��ģ��1����ʱ�ж��м��в���Ҫ��һ
    this.cellWidth=60//�ı����ȣ���mode1���к���Զ�����
    this.controlid="";//���������ʾ
    this.id = "";//������ʹ��,��ʹ��controlid
    this.design = "1";//��ʽ
    this.aItems = new Array();//�������ɵ�����tabҳ
    this.orientation = "0";//��ǩ����λ�ã��ϣ��£��ѷ���
    this.tabarea = true;//��Ҫ�޸�
    this.designmode = "IMAGE";//��Ҫ�޸�
    this.loadOnStartup = false;//ȫ���غͲ��ּ��Կ���
    this.lastTabItem = null;
    this.refreshAfterLoad = false;
    this.loadFinished = false;
    this.isHooverEnabled =true;//��껮����ǩЧ������
    this.standardstyle = "";
    this.hooverstyle = "";
    this.activestyle = "";
    this.separatorstyle = "";
    this.backgroundstyle = "";
    this.bodystyle = "";
    this.textstyle = "";
    this.activetextstyle = "";
    this.eventTabClick = "";
    this.tabAlignment = 1;//�ı�λ�ã�1����0����2���ҵȣ�
    this.add = _add;
    this.addDyn = _addDyn;
    
    //this.syn_create=_syn_create;
    this.create = _create;
    this.redraw = _redraw;
    this.createItem = _createItem;
    this.clear = _clear;
    this.getActiveTab = _getActiveTab;
    this.getActiveTabItem = _getActiveTabItem;
    this.getActiveTabDocument = _getActiveTabDocument;
    this.setActiveTab = _setActiveTab;
    this.showTab = _showTab;
    this.getItems = _getItems;
    this.__intisev = true;
    this.width =0;
    this.tabMode = 0;
    this.scrollPosition = -1;
    this.scrollButtonWidth = "55";
    this.scrollLeftAllowed = false;
    this.scrollRightAllowed = true;
    this.maxTabItemsPerRow = 100;
    this.textAlignment = 0;
    this.imageAlignment = 0;
    this.remove = remove;
    this.getItemByIndex = _getItemByIndex;
    this.getTabItems = _getTabItems;
    this.getTabItemByIndex = _getTabItemByIndex;
    this.getTabDocuementByIndex = _getTabDocuementByIndex;
    this.getWidth = _getWidth;
    this.loadTab = _loadTab;
    if (this.designmode == "IMAGE") {
        var s7n8 = new Image();
        s7n8.src = img_base + "style" + this.design + "/left.png";
        var I34 = new Image();
        I34.src = img_base + "style" + this.design + "/right.png";
        var GG68 = new Image();
        GG68.src = img_base + "style" + this.design + "/leftright.png";
        var _756 = new Image();
        _756.src = img_base + "style" + this.design + "/middle.png";
        var tjx = new Image();
        tjx.src = img_base + "style" + this.design + "/hoover_middle.png";
        var fO8f1 = new Image();
        fO8f1.src = img_base + "style" + this.design + "/sel_left.png";
        var H0a2 = new Image();
        H0a2.src = img_base + "style" + this.design + "/sel_right.png";
        var P82 = new Image();
        P82.src = img_base + "style" + this.design + "/left-sel_right.png";
        var PK$ = new Image();
        PK$.src = img_base + "style" + this.design + "/sel_right-left.png";
    }
}


Tab.prototype.convertToDIV=function (item,a){//a���ж��ǲ��ǲ��ǵ�һ�μ��أ���taglib��ǩ���HTML��ʾ��ҳ��
    
      var divobj=parent.document.all('temp_content_'+this.controlid+item.text);
      
     
     if(!a){
       document.getElementById(item.name).src="about:blank";
       document.getElementById(item.name).contentWindow.document.write("<html><head></head><body>"+divobj.innerHTML+"</body></html>");
      }else{
       document.getElementById(item.name).contentWindow.document.body.innerHTML="<html><head></head><body>"+divobj.innerHTML+"</body></html>";
     }
       document.getElementById(item.name).onload();
     
      //document.getElementById(item.name).outerHTML= parent.document.getElementById('temp_content_'+controlID+item.text).outerHTML;
      //document.getElementById('temp_content_'+controlID+item.text).id=item.name;
    
 }


function TabItem(text, image, active, url) {
/* ׷������
  inFirstLoad�Ƿ����
  withoutURL�û��ڱ�ǩ���ڶ�������
  ���������tabpages��taglib������ͬ
*/
    this.needCheckBeforeChangePage=true;//��ҳУ�鿪��
    this.autoCheckEAP=true;//��ҳ����eap�ؼ�ҳ����Ҫ�Զ�У��
    this.pageCheckFailPass=false;//�����ҳ��У��ʧ���Ƿ���Ի�ҳ
    this.checkOnTabMainJSMethod="";//�û��Զ���ҳ���ϵ�У�鷽��(��tabҳ����ҳ����)
    this.iframeid='';
    this.tab = null;
    this.text = text;
    this.image = image;
    this.active = active;
    this.index = 0;
    if (url != "")
        this.url = url;
    else
        this.url = "";
    this.iframe = null;
    this.design = "1";
    this.type = "ITEM";
    this.title = "";
    this.cached = true;
    this.tag = "";
    this.call = _call;
    this.html = "";
    this.pageLoaded = false;
    this.visible = true;
    this.enabled = true;
    this.setVisible = _setVisible;
    this.setEnabled = _setEnabled;
    this.netPostback = _netPostback;
    this.netValidate = _netValidate;
    this.refresh = _refresh;
    this.getDocument = __tabitem_getdoc;
    this.getWindow = _getWindow;
    this.setUrl = _setUrl;
    this.changeHeight = _changeHeight;
    this.height = 0;
}



/*var test=1;
function _syn_create(){
 
     try{
       this.create();
       }catch(e){
         alert('δ����������쳣');
         for(var j=0;j<1000;j++){
           
          }
         if(test<=20){ 
          this.syn_create();
          test++
         }else{
          alert("����20��û�н��������ʧ�ܣ�");
         } 
        
      }
}*/









function remove(index) {}

function _getItems() {
    return this.aItems
}

function _getItemByIndex(index) {
    var item = null;
    try {
        item = this.aItems[index];
    }
    catch (Error) {}
    return item;
}

function _getTabItems() {
    var aTabItems = new Array();
    try {
        for (var i = 0; i < this.aItems.length; i++) {
            var item = this.aItems[i];
            if (item.type == "ITEM") {
                aTabItems[aTabItems.length] = item;
            }
        }
    }
    catch (Error) {}
    return aTabItems;
}

function _getTabItemByIndex(index) {
    var nt1 = 0;
    try {
        for (var i = 0; i < this.aItems.length; i++) {
            var item = this.aItems[i];
            if (item.type == "ITEM") {
                if (nt1 == index)
                    return item;
                nt1++;
            }
        }
    }
    catch (Error) {}
}

function _getActiveTab() {
    var nt1 = 0;
    try {
        for (var i = 0; i < this.aItems.length; i++) {
            var item = this.aItems[i];
            if (item.type == "ITEM") {
                if (item.active)
                    return nt1;
                nt1++;
            }
        }
    }
    catch (Error) {}
    return 0;
}

function _getActiveTabItem() {
    try {
        for (var i = 0; i < this.aItems.length; i++) {
            var item = this.aItems[i];
            if (item.active)
                return item;
        }
    }
    catch (Error) {}
    return null;
}

function _getActiveTabDocument() {
    var item = this.getActiveTabItem();
    try {
        var doc = window.frames[item.name].document
    }
    catch (Error) {
        doc = null;
    }
    return doc;
}

function _getTabDocuementByIndex(index){
    var item = this.getTabItemByIndex(index);
    try {
        var doc = window.frames[item.name].document
    }
    catch (Error) {
        doc = null;
    }
    return doc;
}

function _setActiveTab(tabNo) {
    var nt1 = 0;
    for (var i = 0; i < this.aItems.length; i++) {
        var item = this.aItems[i];
        if (item.type == "ITEM") {
            if (nt1 == tabNo){
                this.aItems[i].active = true;
                        if(!this.loadOnStartup && !item.pageLoaded){
                              if(item.withoutURL){
                                document.getElementById(item.name).style.display='inline';
                                //document.getElementById(item.name).outerHTML=parent.getElementById('temp_content_'+this.id+item.text).outerHTML;
                                //document.getElementById('temp_content_'+this.controlID+item.text).id=item.name
                              }else{
                                document.getElementById(item.name).src = item.url;
                              }
                         }
             }
            else{
                this.aItems[i].active = false;
            }
            nt1++;
        }
    }
    this.create(true);
}

function _showTab(tabNo) {
    var nt1 = 0;
    for (var i = 0; i < this.aItems.length; i++) {
        var item = this.aItems[i];
        if (item.type == "ITEM") {
            if (nt1 == tabNo){
                this.aItems[i].active = true;
            }
            else{
                this.aItems[i].active = false;
            }
            nt1++;
        }
    }
    this.create(true);
}

function _clear() {
    B2T = 100;
    __aAllTabComponents = new Array();
    this.aItems = new Array();
}

function _createItem(type) {
    if (type == "TabSeparator")
        return new TabSeparator();
    else
        return new TabItem("", "", "", "");
}

function _add(na,item) {
    var id = this.aItems.length;
    this.aItems[id] = item;
    item.id = "tabitem"+na+ B2T;
   
    item.index = id;
    item.design = this.design;
    B2T++;
    item.tab = this;
    var id = __aAllTabComponents.length;
    __aAllTabComponents[id] = item;
}

function _addDyn(na,item) {
    var id = this.aItems.length;
    this.aItems[id] = item;
    item.id = "tabitem" +na+ B2T;
    item.index = id;
    item.design = this.design;
    B2T++;
    item.tab = this;
    var id = __aAllTabComponents.length;
    __aAllTabComponents[id] = item;
    item.name = "__tab_area" +na+ id;
    item.pageLoaded = true;
    try {
        var iframe = document.createElement("iframe");
        iframe.name = "__tab_area" +na+ id;
        iframe.id = "__tab_area"+na+ id;
        if (item.url != "")
            iframe.src = item.url;
        else
            iframe.src = "about:blank";
        iframe.frameBorder = 0;
        iframe.style.height = "100%";
        iframe.style.width = "100%";
        iframe.style.display = "none";
        document.getElementById("__container" +controlID+ this.orientation).appendChild(iframe);
        this.redraw()
    }
    catch (Error) {}
}

function _redraw() {

    this.create(true);
}

/*function restorePublicVar(na){//�ָ����б���
     var man=manager.empty
     if(manager.empity){
        man=parent.manager��
     }
     manager =man;
     controlID=man.controlID;
     objTab=man.getTab(na);
     P6o2$ = null;//�����tabҳ
    // __aAllTabComponents;
}*/


function _create(redraw) {//���ַ���

    if(this.launched) return;
    this.launched=true;
    //parent.finishload[parent.finishload.length]=this.controlid;
    controlID=this.controlid;
    objTab=this;//����������objTab���豾��objTab
    manager=parent.manager;//����������manager���豾��manager
    redraw = (redraw == null) ? false : true;
    /*
     ������Ҫ��ʱʹ�õ�װHTML����ı���
    */
    var _TPa$ = "";
    var gggV4 = "";
    var oriPrefix = "";
    var isSeparator = false;
    var events = "";
    this.id = controlID;
    if (this.orientation == "1")
        oriPrefix = "B";
    if (this.designmode == "IMAGE") {
        var backClass ="";//"TabBack";
        var bodyClass ="TabBody";
    }
    else {
        var backClass ="" //"TabColorBack";
        var bodyClass ="TabColorBody";
    }
    try {
        this.width = this.getWidth();
       
    }
    catch (Error) {}
    if (this.tabMode == 2 && (!this.ispercent) ) {//Ϊģ��2���ɻ�����ǩ
        _TPa$ += "<div unselectable='on' id='modeimg"+this.controlid+"' style='z-Index:1001;position:absolute;width:" +  this.scrollButtonWidth + "px;height:20px;left:" + (this.width - this.scrollButtonWidth) + "px;top:1px;'>";
        _TPa$ += "<input type='image' id='__tab_scroll_left"+controlID+"'   type=image src='" + img_base + "arrow_left.gif' value='<' onclick=\"__tab_scroll(0,'"+controlID+"')\">";
        _TPa$ += "<input type='image' id='__tab_scroll_right"+controlID+"'  type=image src='" + img_base + "arrow_right.gif' value='>' onclick=\"__tab_scroll(1,'"+controlID+"')\">";
        _TPa$ += "</div>";
    }else if(this.tabMode == 2 && (this.ispercent) ){
       
    }
    /*���־���tabHTML���룬ע��Ȩ���Լ�������ʱ������⴦��*/
    if (this.backgroundstyle != "")
        _TPa$ += "<table oncontextmenu='return false;' unselectable='on' style='" + this.backgroundstyle + "' width='100%' height='100%' cellpadding='0' cellspacing='0' border='0'>";
    else{
        _TPa$ += "<table oncontextmenu='return false;' unselectable='on' class='"+ oriPrefix + backClass + this.design + "' width='100%' height='100%' cellpadding='0' cellspacing='0' border='0'>";
    }
    if (!redraw) {
        if (this.orientation == "1") {
            if (this.tabarea) {
                _TPa$ += "<tr unselectable='on'>";
                _TPa$ += "<td id='__container1"+controlID+"' unselectable='on' style='height:100%' class='" + oriPrefix + bodyClass + this.design + "' colspan='" + (this.aItems.length * 2 + 2) + "'>";
                for (var i = 0; i < this.aItems.length; i++) {
                    var item = this.aItems[i];
                    if (item.type == "ITEM") {
                        if (item.active)
                      
                            _TPa$ += "<iframe onload=\"javascript:__tab_doc_loaded(" + i + ",'__tab_area"+controlID + i + "')\"  src='about:blank' style='height:100%;width:"+100%+";' name='" +item.iframeid+ "'  id='__tab_area" + controlID+i + "' frameborder=0 ></iframe>";
                        else
                             
                            _TPa$ += "<iframe onload=\"javascript:__tab_doc_loaded(" + i + ",'__tab_area"+controlID+ i + "')\"  src='about:blank' style='display:none;height:100%;width:"+100%+";' name='"+item.iframeid+ "'  id='__tab_area" + controlID+ i + "' frameborder=0 ></iframe>";
                        item.name = "__tab_area"+ controlID+ i;
                    }
                }
                _TPa$ += "</td>";
                _TPa$ += "</tr>"
            }
            else {
                _TPa$ += "<tr>";
                _TPa$ += "<td height='100%' colspan='" + (this.aItems.length * 2 + 2) + "'>";
                _TPa$ += "</td>";
                _TPa$ += "</tr>";
            }
        }
    }
    var aVisibleItem = new Array();
    for (var i = 0; i < this.aItems.length; i++) {
        if (this.aItems[i].visible)
            aVisibleItem[aVisibleItem.length] = this.aItems[i];
        else
            this.aItems[i].active = false;
    }
    this.visibleItems = aVisibleItem.length;
    var nt1 = 0;
    var isFirst = false;
    var isMiddle = false;
    var lastRowItemCount = aVisibleItem.length % this.maxTabItemsPerRow;
    this.currentRow=-1;
    while (nt1 < aVisibleItem.length) {
       
        _TPa$ += "<tr unselectable='on'>";
        _TPa$ += "<td unselectable='on' style='width:100%'>";
        _TPa$ += "<div  unselectable='on' id='row"+(controlID+(this.currentRow+1))+"'>";
        gggV4 = "";
        if (this.tabMode == 2) {
            gggV4 += "<div style='height:22px'></div>";
            if((this.ispercent) ){
            gggV4 += "<div id='scroll"+ controlID+"' style=''><table CELLPADDING='0' CELLSPACING='0' width='100%'><tr><td><table width='100%' cellpadding='0' cellspacing='0' border='0'><tr>";
             }else{
            gggV4 += "<div id='scroll"+ controlID+"' style='position:absolute;left:0px;top:0px;'><table width='100%' cellpadding='0' cellspacing='0' border='0'><tr>";
            }
       }
        else {
            if(objTab.mid!=""){
            gggV4 += "<table width='100%'   cellpadding='0' cellspacing='0' border='0'><tr>"
            }else{
            gggV4 += "<table   cellpadding='0' cellspacing='0' border='0'><tr>"
            }
        }
        
        this.currentRow++;
        //һ��������
   //this.keypoint�Ǹ��ٽ�ֵ��������ʹ�����жϺ�ʱ�ı䵥�е�Ԫ����
       if(this.tabMode==1&&this.currentRow>this.keypoint&&this.countRow!=1){
            this.maxTabItemsPerRow=objTab.displaycount;
        }
       
        for (var i = 0; i < this.maxTabItemsPerRow; i++) {
           var flag=false;
           if(this.currentRow==this.countRow-1&&this.countRow!=1){
                if(this.tabMode==1){
                 flag=true;
                 lastRowItemCount=objTab.lastrowcount;
                }
            }
        
            if (nt1 == aVisibleItem.length)
                break;
            var item = aVisibleItem[nt1];
               
            var isLastItemSeparator = false;
            isFirst = (i == 0) ? true : false;
            isMiddle = (i > 0 && nt1 < aVisibleItem.length - 1 && i < this.maxTabItemsPerRow - 1) ? true : false;
            isLastRow = (nt1 >= (aVisibleItem.length - lastRowItemCount)) ? true : false;
     
            
            /*if(this.tabMode==1&&this.countRow!=1){
              isLastRow=flag;
              
           objTab.lastTextWidth=objTab.lastrowlast=(1-percentInner)*100+"%";
 objTab.imglastWidth=percentInner*100+"%";
 
 percentInner=17*objTab.displaycount/(objTab.width-13-30*(objTab.displaycount));
 objTab.cellWidth=objTab.nolastrowlast=(1-percentInner)*100+"%";
 objTab.lastimglastWidth=percentInner*100+"%";
 
 objTab.sideimgWidth=(13/objTab.width)*100+"%";
            }*/
            var alignwidth;
            if (!this.ispercent) {
                alignwidth ="";
                var tdimgWidth="";
                imgconstant=17+"px";
            }else if(this.tabMode==2){
                alignwidth ="";
                var tdimgWidth="";
                imgconstant=17+"px";
            } else {
             var tdimgWidth="width='13px'";
                if (this.currentRow!=0){
                   imgconstant=17+"px";
                    if(i==this.maxTabItemsPerRow-1){
                     alignwidth =" width="+this.midlastcol+" ";
                    }else{
                     alignwidth =" width="+this.mid+" ";
                    }
                 }
                else{
                  imgconstant=17+"px";
                  if(i==this.maxTabItemsPerRow-1){
                     alignwidth =" width="+this.lastmidlastcol+" ";
                    }else{
                     alignwidth =" width="+this.lastmid+" ";
                    }
                   
                 }
            }
            if(this.tabMode==1){
                alignwidth ="";//�������Ϊ�Ժ���չ������׼����������ʱû�����κ�����
            }
            if (i > 0) {
                isLastItemSeparator = aVisibleItem[nt1 - 1].type == "SEPARATOR" ? true : false;
            }
            var textAlignment = "";
            if (this.textAlignment == 0)
                textAlignment = "left";
            else if (this.textAlignment == 1)
                textAlignment = "middle";
            else
                textAlignment = "right";
                events = "";
           /*events = " onmouseover='__tab_direct(\"" + item.id + "\",\"OVER\")'";//tr�¼�
            events += " onmouseout='__tab_direct(\"" + item.id + "\",\"OUT\")'";*/
    
            events += " onmousedown='__tab_direct(\"" + item.id + "\",\"DOWN\",\"row"+this.controlid+this.currentRow+"\")'";
            events += " onmouseup='__tab_direct(\"" + item.id + "\",\"UP\")'>";
            
            if (browser.ie)
                events += "<table unselectable='on' title='" + item.title + "' width='100%' height='100%' cellpadding='0' cellspacing='0' border='0' style='padding-top: 4px;'><tr unselectable='on'>";
            else
                events += "<a style='text-decoration: none' href='javascript: void(0);'><table unselectable='on' title='" + item.title + "' width='100%' height='100%' cellpadding='0' cellspacing='0' border='0'><tr unselectable='on'>";
            var imageCell = "<td id='"+item.id+"textCellIMG'  onmouseenter='__tab_direct(\"" + item.id + "\",\"OVER\")' onmouseleave='__tab_direct(\"" + item.id + "\",\"OUT\")' width='"+imgconstant+"'><img  unselectable='on' src='" + item.image + "' ></td>";
       
            var tempwidth;
           
            if(this.tabMode==1&&this.currentRow>this.keypoint&&this.countRow!=1){
                if(i==(this.maxTabItemsPerRow-1)&&this.tabMode==1){
                  
                  tempwidth=this.nolastrowlast;
                 
                  
                }else{
                  tempwidth=this.cellWidth;
                 
                  //var textCell1 = "<td align='" + textAlignment + "' 	width='"+this.cellWidth+"'  nowrap><span id='" + item.id + "_text' " + (item.enabled ? "" : "style='color:gray'") + " unselectable='on' ";
                }
            }else if(this.tabMode==1&&this.currentRow<=this.keypoint&&this.countRow!=1){
              if(i==(this.maxTabItemsPerRow-1)&&this.tabMode==1){
                  tempwidth=this.lastrowlast;
               }else{
                  tempwidth=this.lastTextWidth;
               }
              //var textCell1 = "<td align='" + textAlignment + "' 	width='"+this.lastTextWidth+"'  nowrap><span id='" + item.id + "_text' " + (item.enabled ? "" : "style='color:gray'") + " unselectable='on' ";
            }else{
               tempwidth=this.cellWidth;
            }
            var textCell1 = "<td id='"+item.id+"textCellTD'   align='" + textAlignment + "' 	width='"+tempwidth+"'  nowrap onmouseenter='__tab_direct(\"" + item.id + "\",\"OVER\")' onmouseleave='__tab_direct(\"" + item.id + "\",\"OUT\")'><span id='" + item.id + "_text' " + (item.enabled ? "" : "style='color:gray'") + " unselectable='on' ";
            
            var textCell2 = item.text + "</span></td>";
        
            if (browser.ie)
                var closeTags = "</tr></table></td>";
            else
                var closeTags = "</tr></table></a></td>";
            var textClass = "";
            if (item.active)
                textClass = ( (this.activetextstyle == "") ? (" class='" + oriPrefix + "TabItemTextSelected" + this.design + "' ") : (" style='" + this.activetextstyle + "' ")) + ">";
            else
                textClass = ( (this.textstyle == "") ? (" class='" + oriPrefix + "TabItemText" + this.design + "' ") : (" style='" + this.textstyle + "' ")) + ">";
            var imagetext = "";
            if (this.imageAlignment == 0) {
                if (item.image)
                    imagetext = imageCell;
                if (item.text)
                    imagetext += textCell1 + textClass + textCell2;
            }
            else {
                if (item.text)
                    imagetext += textCell1 + textClass + textCell2;
                if (item.image)
                    imagetext = imageCell;
            }
           
          
           
           
            if (this.designmode == "IMAGE") {
                if (item.type == "ITEM") {
                    item.isFirst = false;
                    item.isMiddle = false;
                    item.isLast = false;
                    /////////////////////////////////////////////////
                    if(isLastRow&&lastRowItemCount==1&&aVisibleItem.length!=1){
                           item.spec=true;
                           item.isFirst = true;
                        if (item.active) {
                          
                            var leftClass = oriPrefix + "TabItemSelectedLeft" + this.design;
                            var middleClass = oriPrefix + "TabItemSelectedMiddle" + this.design;
                            gggV4 += "<td unselectable='on'  "+tdimgWidth+"><div unselectable='on' id='" +item.id+ "_1' class='" + leftClass + "'></div></td>";
                            gggV4 += "<td unselectable='on' " + alignwidth + " id='" + item.id + "' class='" + middleClass + "'";
                            gggV4 += events;
                            gggV4 += imagetext;
                            gggV4 += closeTags;
                            gggV4 += "<td><div  unselectable='on' id='" + item.id + "_2' class='" + oriPrefix + "TabItemSelectedRight" + this.design + "'></div></td>"
                        }
                        else {
                      
                            var leftClass = oriPrefix + "TabItemLeft" + this.design;
                            var middleClass = oriPrefix + "TabItemMiddle" + this.design;
                            gggV4 += "<td  "+tdimgWidth+"><div unselectable='on' class='" + leftClass + "' id='" + item.id + "_1'></div></td>";
                            gggV4 += "<td " + alignwidth + " id='" + item.id + "' class='" + middleClass + "'";
                            gggV4 += events;
                            gggV4 += imagetext;
                            gggV4 += closeTags;
                            gggV4 += "<td><div id='" + item.id + "_2' class='" + oriPrefix + "TabItemRight" +
                            this.design + "'></div></td>"
                        }
                    }
                   /////////////////////////////////////////////////////////// 
                    
                    
                    else if (isFirst) {
                        item.isFirst = true;
                        if (item.active) {
                       
                            var leftClass = oriPrefix + "TabItemSelectedLeft" + this.design;
                            var middleClass = oriPrefix + "TabItemSelectedMiddle" + this.design;
                            gggV4 += "<td unselectable='on' "+tdimgWidth+"><div  unselectable='on' id='" +item.id+ "_1' class='" + leftClass + "'></div></td>";
                            gggV4 += "<td unselectable='on' " + alignwidth + " id='" + item.id + "' class='" + middleClass + "'";
                            gggV4 += events;
                            gggV4 += imagetext;
                            gggV4 += closeTags;
                            
                            if (this.maxTabItemsPerRow == 1)
                                gggV4 += "<td "+tdimgWidth+"><div  unselectable='on' id='" + item.id + "_2' class='" + oriPrefix + "TabItemSelectedRight" + this.design + "'></div></td>"
                        }
                        else {
                      
                            var leftClass = oriPrefix + "TabItemLeft" + this.design;
                            var middleClass = oriPrefix + "TabItemMiddle" + this.design;
                            gggV4 += "<td "+tdimgWidth+"><div  unselectable='on' class='" + leftClass + "' id='" + item.id + "_1'></div></td>";
                            gggV4 += "<td " + alignwidth + " id='" + item.id + "' class='" + middleClass + "'";
                            gggV4 += events;
                            gggV4 += imagetext;
                            gggV4 += closeTags;
                        }
                         if(objTab.onlyOne && item.enabled){
                            
                           gggV4 += "<td "+tdimgWidth+"><div   unselectable='on' id='" + item.id + "_2' class='" +
                                        oriPrefix + "TabItemSelectedRight" + this.design + "'></div></td>"
                         }
                        
                         if(objTab.onlyOne && !item.enabled){
                                gggV4 += "<td "+tdimgWidth+"><div   unselectable='on' id='" + item.id + "_2' class='" + oriPrefix +
                                    "TabItemRight" + this.design + "'></div></td>"
                         }
                    }
                    else if (isMiddle) {
                        item.isMiddle = true;
                        if (aVisibleItem[nt1 - 1].type == "ITEM") {
                            if (aVisibleItem[nt1 - 1].active) {
                                gggV4 += "<td "+tdimgWidth+"><div    unselectable='on' id='" + item.id + "_1' class='" + oriPrefix +
                                    "TabItemRightSelectedLeft" + this.design + "'></div></td>";
                                gggV4 += "<td " + alignwidth + "  id='" + item.id  + "' class='" + oriPrefix +
                                    "TabItemMiddle" + this.design + "'";
                                gggV4 += events;
                                gggV4 += imagetext;
                                gggV4 += closeTags;
                                
                            }
                            else {
                                if (item.active) {
                                    gggV4 += "<td "+tdimgWidth+"><div   unselectable='on' id='" + item.id + "_1' class='" +
                                        oriPrefix + "TabItemLeftSelectedRight" + this.design + "'></div></td>";
                                    gggV4 += "<td " + alignwidth + " id='" + item.id + "' class='" + oriPrefix +
                                        "TabItemSelectedMiddle" + this.design + "'";
                                    gggV4 += events;
                                    gggV4 += imagetext;
                                    gggV4 += closeTags
                                }
                                else {
                                    gggV4 += "<td "+tdimgWidth+"><div   unselectable='on' id='" + item.id + "_1' class='" +
                                        oriPrefix + "TabItemLeftRight" + this.design + "'></div></td>";
                                    gggV4 += "<td " + alignwidth + " id='" + item.id + "' class='" + oriPrefix +
                                        "TabItemMiddle" + this.design + "'";
                                    gggV4 += events;
                                    gggV4 += imagetext;
                                    gggV4 += closeTags
                                }
                            }
                        }
                        else {
                            if (item.active) {
                                gggV4 += "<td "+tdimgWidth+"><div    unselectable='on' id='" + item.id + "_1' class='" + oriPrefix +
                                    "TabItemSelectedLeft" + this.design + "'></div></td>";
                                gggV4 += "<td " + alignwidth + " id='" + item.id + "' class='" + oriPrefix +
                                    "TabItemSelectedMiddle" + this.design + "'";
                                gggV4 += events;
                                gggV4 += imagetext;
                                gggV4 += closeTags
                            }
                            else {
                                gggV4 += "<td "+tdimgWidth+" ><div    unselectable='on' id='" + item.id + "_1' class='" + oriPrefix +
                                    "TabItemLeft" + this.design + "'></div></td>";
                                gggV4 += "<td " + alignwidth +"  id='" + item.id + "'  class='" + oriPrefix +
                                    "TabItemMiddle" + this.design + "'";
                                gggV4 += events;
                                gggV4 += imagetext;
                                gggV4 += closeTags
                            }
                        }
                    }
                    
                    
                    else {
                      item.isLast = true;
                        if (aVisibleItem[nt1 - 1].type == "ITEM") {
                            if (aVisibleItem[nt1 - 1].active) {
                                gggV4 += "<td "+tdimgWidth+"><div   unselectable='on' id='" + item.id + "_1' class='" + oriPrefix +
                                    "TabItemRightSelectedLeft" + this.design + "'></div></td>";
                                gggV4 += "<td " + alignwidth+"  id='" + item.id + "' class='" + oriPrefix +
                                    "TabItemMiddle" + this.design + "'";
                                gggV4 += events;
                                gggV4 += imagetext;
                                gggV4 += closeTags;
                                gggV4 += "<td "+tdimgWidth+"><div     id='" + item.id + "_2' class='" + oriPrefix + "TabItemRight" +
                                    this.design + "'></div></td>"
                            }
                            else {
                                if (item.active) {
                                    gggV4 += "<td "+tdimgWidth+"><div    unselectable='on' id='" + item.id + "_1' class='" +
                                        oriPrefix + "TabItemLeftSelectedRight" + this.design + "'></div></td>";
                                    gggV4 += "<td " + alignwidth + "  id='" + item.id + "' class='" + oriPrefix +
                                        "TabItemSelectedMiddle" + this.design + "'";
                                    gggV4 += events;
                                    gggV4 += imagetext;
                                    gggV4 += closeTags;
                                    gggV4 += "<td  "+tdimgWidth+"><div     unselectable='on' id='" + item.id + "_2' class='" +
                                        oriPrefix + "TabItemSelectedRight" + this.design + "'></div></td>"
                                }
                                else {
                                    gggV4 += "<td "+tdimgWidth+"><div    unselectable='on' id='" + item.id + "_1' class='" +
                                        oriPrefix + "TabItemLeftRight" + this.design + "'></div></td>";
                                    gggV4 += "<td " + alignwidth + "  id='" + item.id + "' class='" + oriPrefix +
                                        "TabItemMiddle" + this.design + "'";
                                    gggV4 += events;
                                    gggV4 += imagetext;
                                    gggV4 += closeTags;
                                    gggV4 += "<td "+tdimgWidth+"><div   unselectable='on' id='" + item.id + "_2' class='" +
                                        oriPrefix + "TabItemRight" + this.design + "'></div></td>"
                                }
                            }
                        }
                        else {
                            if (item.active) {
                                gggV4 += "<td "+tdimgWidth+" ><div   unselectable='on' id='" + item.id + "_1' class='" + oriPrefix +
                                    "TabItemSelectedLeft" + this.design + "'></div></td>";
                                gggV4 += "<td " + alignwidth + "  id='" + item.id + "' class='" + oriPrefix +
                                    "TabItemSelectedMiddle" + this.design + "'";
                                gggV4 += events;
                                gggV4 += imagetext;
                                gggV4 += closeTags;
                                gggV4 += "<td "+tdimgWidth+"><div   unselectable='on' id='" + item.id + "_2' class='" + oriPrefix +
                                    "TabItemSelectedRight" + this.design + "'></div></td>"
                            }
                            else {
                                gggV4 += "<td  "+tdimgWidth+"><div  unselectable='on' id='" + item.id + "_1' class='" + oriPrefix +
                                    "TabItemLeft" + this.design + "'></div></td>";
                                gggV4 += "<td " + alignwidth + "  id='" + item.id + "' class='" + oriPrefix +
                                    "TabItemMiddle" + this.design + "'";
                                gggV4 += events;
                                gggV4 += imagetext;
                                gggV4 += closeTags;
                                gggV4 += "<td   "+tdimgWidth+"><div   unselectable='on' id='" + item.id + "_2' class='" + oriPrefix +
                                    "TabItemRight" + this.design + "'></div></td>"
                            }
                        }
                    }
                    
                    
                    
                    
                    
                }
                else {
               
                    isSeparator = true;
                    if (i > 0) {
                        if (aVisibleItem[nt1 - 1].active) {
                            gggV4 += "<td><div unselectable='on' id='" + item.id + "_1' class='" + oriPrefix +
                                "TabItemSelectedRight" + this.design + "'></div></td>"
                        }
                        else {
                            gggV4 += "<td><div unselectable='on' id='" + item.id + "_1' class='" + oriPrefix +
                                "TabItemRight" + this.design + "'></div></td>"
                        }
                    }
                    gggV4 += "<td  style='width:" + item.width + "' nowrap class='" + oriPrefix + "TabLine" +
                        this.design + "'><div style='width:" + item.width + "' id='" + item.id +
                        "_text' unselectable='on' class='" + oriPrefix + "TabItemText" + this.design + "'>" +
                        item.text + "</div></td>";
                }
            }
            else {
                if (item.type == "ITEM") {
                    var textClass = "";
                    var textStyle = "";
                    gggV4 += "<td  title='" + item.title + "' class='TabColorSeparator" + this.design + "'";
                    /*gggV4 += " onmouseover='__tab_direct(\"" + item.id + "\",\"OVER\")'";
                    gggV4 += " onmouseout='__tab_direct(\"" + item.id + "\",\"OUT\")'";*/
                    gggV4 += " onmousedown='__tab_direct(\"" + item.id + "\",\"DOWN\")'";
                    gggV4 += " onmouseup='__tab_direct(\"" + item.id + "\",\"UP\")'>";
                    if (item.active) {
                        textClass = "TabColorTextSelected" + this.design;
                        textStyle = this.activetextstyle;
                        if (this.activestyle != "")
                            gggV4 +=
                                "<a style='text-decoration: none' href='javascript: void(0);'><table width='100%' unselectable='on'  id='" +
                                item.id + "' style='" + this.activestyle + "' cellpadding='0' cellspacing='0'><tr>";
                        else
                            gggV4 +=
                                "<a style='text-decoration: none' href='javascript: void(0);'><table width='100%' unselectable='on'  id='" +
                                item.id + "' class='TabColorSelected" + this.design +
                                "' cellpadding='0' cellspacing='0'><tr>";
                    }
                    else {
                        textClass = "TabColorText" + this.design;
                        textStyle = this.textstyle;
                        if (this.standardstyle != "")
                            gggV4 +=
                                "<a style='text-decoration: none' href='javascript: void(0);'><table width='100%' unselectable='on'  id='" +
                                item.id + "' style='" + this.standardstyle +
                                "' cellpadding='0' cellspacing='0'><tr>";
                        else
                            gggV4 +=
                                "<a style='text-decoration: none' href='javascript: void(0);'><table width='100%' unselectable='on'  id='" +
                                item.id + "' class='TabColorStandard" + this.design +
                                "' cellpadding='0' cellspacing='0'><tr>"
                    }
                    if (item.image)
                        gggV4 += "<td><span style='margin-left:2px;' width='"+imgconstant+"'><img unselectable='on'  src='" + item.image +
                            "' border=0></span></td>";
                     
                    if (item.text) {
                        if (this.textstyle != "")
                            gggV4 += "<td nowrap><span id='" + item.id + "_text' unselectable='on' style='" +
                                textStyle + "'>" + item.text + "</span></td>";
                        else
                            gggV4 += "<td nowrap><span id='" + item.id + "_text' unselectable='on' class='" +
                                textClass + "'>" + item.text + "</span></td>"
                    }
                    gggV4 += "</tr></table></a></td>"
                }
                else {
                    isSeparator = true;
                    if (this.separatorstyle != "")
                        gggV4 += "<td style='" + this.separatorstyle + "' width='100%'>&nbsp;</td>";
                    else
                        gggV4 += "<td class='" + oriPrefix + "TabColorSeparator" + this.design +
                            "' width='100%'>&nbsp;</td>"
                }
            }
            nt1++
            
        }


/******** for���� ******///


        if (!isSeparator) {//β���Ĵ���
            if (true) {
               
                if (this.designmode == "IMAGE"&&(this.tabMode==2||objTab.countRow==1)){
                   
                    
                    gggV4 += "<td class='" + oriPrefix + "TabLine" + this.design + "' width='100%'>&nbsp;</td>";
                  }
                else if(!this.designmode == "IMAGE"){}
                    //gggV4 += "<td class='" + oriPrefix + "TabColorSeparator" + this.design +
                       // "' width='100%'>&nbsp;</td>"
            }
        }
        if (this.tabMode == 2){
         if( this.ispercent){
         var tempscroll= "<div unselectable='on' id='modeimg"+this.controlid+"' width='100%'>";
        tempscroll += "<input type='image' id='__tab_scroll_left"+this.controlid+"'   type=image src='" + img_base + "arrow_left.gif' value='<' onclick=\"__tab_scroll(0,'"+this.controlid+"')\">";
        tempscroll += "<input type='image' id='__tab_scroll_right"+this.controlid+"'  type=image src='" + img_base + "arrow_right.gif' value='>' onclick=\"__tab_scroll(1,'"+this.controlid+"')\">";
        tempscroll += "</div>";
        gggV4 += "</tr></table></td><td width='"+totalbuttonwidth+"px' class='TabLine"+this.design+"'>"+tempscroll+"</td></tr></table></div>";
         }else{
            gggV4 += "</tr></table></div>";
          }  
        }
        else
            gggV4 += "</tr></table>";
        _TPa$ += gggV4;
        _TPa$ += "</div></td></tr>";
        this.html = gggV4
        
         
    }
    
///////////////////��while����////////////////////////////
    if (!redraw) {
        if (this.orientation == "0") {
            if (this.tabarea) {
                _TPa$ += "<tr>";
                _TPa$ += "<td id='__container0"+ controlID+"' style='height:100%;width:100%' class='" + oriPrefix + bodyClass +
                    this.design + "'>";
                for (var i = 0;
                     i < this.aItems.length; i++) {
                    var item = this.aItems[i];
                    if (item.type == "ITEM") {
                        if (item.active)
                            _TPa$ += "<iframe onload=\"javascript:__tab_doc_loaded(" + i + ",'__tab_area" +  controlID+i +
                                "')\" src='about:blank' style='height:100%;width:"+"100%"+";' name='" +item.iframeid+ 
                                "'  id='__tab_area" + controlID+ i + "' frameborder=0 ></iframe>";
                        else
                            _TPa$ += "<iframe onload=\"javascript:__tab_doc_loaded(" + i + ",'__tab_area" +  controlID+i +
                                "')\" src='about:blank' style='display:none;height:100%;width:"+"100%"+";' name='" +item.iframeid+
                               "'  id='__tab_area" +controlID+ i + "' frameborder=0 ></iframe>";
                        item.name = "__tab_area" +controlID+i
                    }
                }
                _TPa$ += "</td>";
                _TPa$ += "</tr>"
            }
            else {
                _TPa$ += "<tr>";
                _TPa$ += "<td height='100%' colspan='" + (this.maxTabItemsPerRow * 2 + 2) + "'>";
                _TPa$ += "</td>";
                _TPa$ += "</tr>"
            }
        }
    }
    _TPa$ += "</table>";
    
    
    
    
    if (redraw) {
        document.getElementById("row").innerHTML = this.html;
        for (var W2K = 0;W2K < objTab.aItems.length;W2K++) {
            var item = objTab.aItems[W2K];
            if (item.type == "ITEM" && item.visible) {
                if (item.active) {
                    document.getElementById(item.name).style.display = "inline";
                    parent.document.getElementById(controlID).style.height = item.height;
                }
                else {
                    if (document.getElementById(item.name).style.display != "none")
                        document.getElementById(item.name).style.display = "none";
                }
            }
        }
    }
    else {
        code = _TPa$;
        __tab_delay();
    }
    
 
  
}

function __tab_delay() {//���ڱ����е�HTML��������ִ�У��Ѳ���Ҫ��ʾ��ҳ����������
    document.body.innerHTML = code;
    if (!objTab.tabarea) {
        objTab.loadFinished = true;
        objTab.lastTabItem = objTab.getActiveTabItem();
        return
    }
 
    for (var i = 0; i < objTab.aItems.length; i++) {
        var item = objTab.aItems[i];
         
        if (objTab.loadOnStartup && item.type == "ITEM" && item.url != "" && !item.active&&!item.withoutURL) {
           document.getElementById(item.name).src = item.url;
        }
        
        if(!objTab.loadOnStartup && item.inFirstLoad&& item.type == "ITEM" && item.url != "" && !item.active&&!item.withoutURL){
          document.getElementById(item.name).src = item.url;
        }
        
        if(item.withoutURL){//����û�����bodycontent ���Զ�����
              objTab.convertToDIV(item);
         
             //document.getElementById(item.name).outerHTML= parent.document.all('temp_content_'+this.controlID+item.text).outerHTML;
             //document.getElementById('temp_content_'+this.controlID+item.text).id=item.name
          
        }
        if (item.type == "ITEM" && item.active) {
           objTab.currentItem=item;
            if (item.url != "") {
       
                document.getElementById(item.name).src = item.url;
              
             
            }else if(item.url==""&&item.withoutURL){
               document.getElementById(item.name).style.display='inline';
           /* document.getElementById(item.name).outerHTML= parent.getElementById('temp_content_'+this.controlID+item.text).outerHTML;
            document.getElementById('temp_content_'+this.controlID+item.text).id=item.name;
            document.getElementById(item.name).style.display='inline';*/
            }
            else {
                if (browser.ns)
                    window.frames[item.name].document.body.style.backgroundColor = "white";
            }
            objTab.lastTabItem = item;
        }
    }
   __tab_check_loaded();
}

function __tab_doc_loaded(index, name) {//�¼��ļ���

    var item = objTab.getItemByIndex(index);
    if (item.url == ""){
      objTab.loadFinished = true;
    }
    if (document.getElementById(name).src.indexOf("about:blank") >= 0)
     return;
   
    for (var i = 0;
         i < objTab.aItems.length;
         i++) {
        if (i == index) {
            var item = objTab.aItems[i];
            item.pageLoaded = true;
            try {
                parent.tabEventPageLoaded(item, controlID)
            }
            catch (Error) {}
            if (item.active && item.refreshAfterLoad) {
                item.refresh()
            }
        }
    }
    var allLoaded = true;
    if (objTab.loadOnStartup) {
        if (!browser.opera) {
            for (var i = 0;
                 i < objTab.aItems.length;
                 i++) {
                var item = objTab.aItems[i];
                if (item.type == "ITEM" && item.url != "" && !item.pageLoaded&& !item.pageLoaded&&!item.withoutURL) {
                    allLoaded = false;
                }
            }
        }
        if (allLoaded) {
            objTab.loadFinished = true;
            try {
                parent.tabEventLoaded(controlID)
            }
            catch (Error) {}
        }
    }
    else {
        objTab.loadFinished = true;
        allLoaded = true;
        for (var i = 0;
             i < objTab.aItems.length;
             i++) {
            var item = objTab.aItems[i];
            if (item.type == "ITEM" && item.url != "" && !item.pageLoaded&&!item.withoutURL) {
                allLoaded = false;
            }
        }
        if (allLoaded) {
            try {
        parent.tabEventLoaded(controlID)
            }
            catch (Error) {}
        }
    }

}


function  extendHandle(){//��һ��������mode2ʱһЩ�������(�����ðٷֱ�)
/*????????*/
   var aVisibleItem = objTab.aVisibleItem;
  /*�����һ��������߼��������ڲ�����ʾ��ʱ��Ҫ����*/
   if(objTab.allTabItemsWidth<objTab.getWidth()){//���û�п��ܱ���������ס��򵥴���һ�·��أ����ػ�������
     document.all("__tab_scroll_left"+objTab.controlid).disabled=true;
     document.all("__tab_scroll_left"+objTab.controlid).src=img_base + "arrow_left_disabled.gif";
     document.all("__tab_scroll_right"+objTab.controlid).disabled=true;
     document.all("__tab_scroll_right"+objTab.controlid).src=img_base + "arrow_right_disabled.gif";
       return;
   }
   /*�ھ��崦�����һ��������߼�����֮ǰ��ȷ���ı���С����mode1ʱ�ܲ�һ����Ҫ�򵥵Ķ�*/
   var total=objTab.allTabItemsWidth;
   
   var button=objTab.scrollButtonWidth;
   var per=total/aVisibleItem.length;
 
   var displaycountwithbuttion=parseInt((objTab.getWidth()-button)/per);
   if(objTab.mode2displayCount>0 &&  displaycountwithbuttion>objTab.mode2displayCount){
       displaycountwithbuttion=objTab.mode2displayCount;
   }
   
   
   objTab.displaycountwithbuttion=displaycountwithbuttion;//�ڳ������ı�ǩ������ֹ����������ס
   var tostartlength=-1;
   var tempI=-1;
   /*��ʼ����*/
  for(var i=0;i<aVisibleItem.length;i++){
  
  
          
     
      if(aVisibleItem[i].active && aVisibleItem[i].enabled){
   
        if(i<displaycountwithbuttion){
          for(i=displaycountwithbuttion;i<aVisibleItem.length;i++){
          var name=aVisibleItem[i].id
            try{
            if(i!=displaycountwithbuttion){
            document.all(name + "_1").parentElement.style.display='none';
            }
            document.all(name).style.display='none';
            document.all(name + "_2").parentElement.style.display='none';
            }catch(e){
          
            }
           }
           document.all("__tab_scroll_left"+objTab.controlid).style.disabled=true;
           document.all("__tab_scroll_left"+objTab.controlid).src=img_base + "arrow_left_disabled.gif";
           
           document.all("__tab_scroll_right"+objTab.controlid).fireEvent("onclick");
           document.all("__tab_scroll_left"+objTab.controlid).fireEvent("onclick");
            break;
        }
        
        
       
        
       /* tostartlength=aVisibleItem[i-displaycountwithbuttion].right;
        tempI=i;
        document.getElementById("scroll"+objTab.controlid).style.left =-tostartlength;
        objTab.scrollPosition=i-displaycountwithbuttion;
        objTab.scrollLeftAllowed=true;
        if(i==aVisibleItem.length-1){
         objTab.scrollRightAllowed=false;
        }*/
        var virtulnumber=i-displaycountwithbuttion+1;
        
        for(var j=0;j<virtulnumber;j++){//ģ����������ȷ���û�����active��ǩ��ʾ
          document.all("__tab_scroll_right"+objTab.controlid).fireEvent("onclick");
        }
        if(virtulnumber<=0){
        document.all("__tab_scroll_right"+objTab.controlid).fireEvent("onclick");
        document.all("__tab_scroll_left"+objTab.controlid).fireEvent("onclick");
        }
        //document.all(aVisibleItem[i].id).fireEvent("onmousedown");
        break;
      }
 }  
 /* = for(i= (tempI==-1?displaycountwithbuttion:(tempI+1));i<aVisibleItem.length;i++){
      var name=aVisibleItem[i].id
      try{
      if(i!=(tempI==-1?displaycountwithbuttion:(tempI+1))){
      document.all(name + "_1").parentElement.style.display='none';
      }
      document.all(name).style.display='none';
      document.all(name + "_2").parentElement.style.display='none';
      }catch(e){
      }
   }
   if(!objTab.scrollLeftAllowed){
   document.all("__tab_scroll_left"+objTab.controlid).style.display='none';
   }
   if(!objTab.scrollRightAllowed){
    document.all("__tab_scroll_right"+objTab.controlid).style.display='none';
   }*/
   
  
  // alert(displaycount);
    
   /*var dispalycellcount=parseInt((total-button)/cell);
   alert(dispalycellcount);
   objTab.displaycount=dispalycellcount;
   objTab.displayarray=new Array();
   
   var aVisibleItem = new Array();
   for (var j = 0;j < __aAllTabComponents.length;j++) {
            if (__aAllTabComponents[i].visible)
                aVisibleItem[aVisibleItem.length] = __aAllTabComponents[i]
    }
   for(i=0;i<displaycount;i++){
     
       objTab.displayarray[i]=aVisibleItem[i];
   }*/
 
   /*for(i=displaycount;i<aVisibleItem.length;i++){
      var name=aVisibleItem[i].id
      try{
      document.all(name + "_1").style.display='none';
      document.all(name).style.display='none';
      document.all(name + "_2").style.display='none';
      }catch(e){
      }
   }*/
}



function __tab_check_loaded() {//����tabMode2���


   var allWidth = 0;
        var lastRight = 0;
  
    if (objTab.tabMode == 2 && (!objTab.ispercent)) {
          for (var i = 0;
             i < objTab.aItems.length;
             i++) {
            var item = objTab.aItems[i];
           if (item.visible) {
            
                var width = 0;
            /*   try {
                    width = width + parseInt(document.getElementById(objTab.aItems[i].id + "_1").offsetWidth)
                }
                catch (Error) {}
           
                width = width + parseInt(document.getElementById(objTab.aItems[i].id).offsetWidth);
               
                try {
                    width = width +
                        parseInt(document.getElementById(objTab.aItems[i].id + "_2").offsetWidth / 2)
                }
                catch (Error) {
                  width = width + 2;
                }*/
                /*��������ͼƬ���*/
                if(item.image==""){
                width=13+objTab.cellWidth;
                }else{
               
                width=30+objTab.cellWidth;
                }
                item.width = width;
                allWidth = allWidth + width;
                if (i > 0)
                    item.right = lastRight + width;
                else
                    item.right = width;
                lastRight = item.right;
            }
        }
        objTab.allTabItemsWidth = allWidth
        /*��һ������*/
        extendHandle();
        
    }else if(objTab.tabMode == 2 && objTab.ispercent){
      for (var i = 0;
             i < objTab.aItems.length;
             i++) {
            var item = objTab.aItems[i];
            var tem=item.id+"textCellTD";
            if (item.visible) {
              var realWidth=document.all(tem).offsetWidth;
              
                var width = 0;
                if(item.image==""){
                width=13+realWidth;
                }else{
                width=30+realWidth;
                }
                item.width = realWidth;
                allWidth = allWidth + width;
                if (i > 0)
                    item.right = lastRight + width;
                else
                    item.right = width;
                lastRight = item.right;
            }
      }
      objTab.allTabItemsWidth = allWidth;
      
      extendHandleWidthPercent();
       
  }
  /*  if (browser.opera) {
        objTab.loadFinished = true;
        try {
            parent.tabEventLoaded(controlID)
        }
        catch (Error) {}
    }*/
}


function extendHandleWidthPercent (){

   var aVisibleItem = objTab.aVisibleItem;
    document.all("__tab_scroll_left"+objTab.controlid).disabled=true;
    document.all("__tab_scroll_left"+objTab.controlid).src=img_base + "arrow_left_disabled.gif";

   if(objTab.allTabItemsWidth<objTab.getWidth()){
     document.all("__tab_scroll_left"+objTab.controlid).disabled=true;
     document.all("__tab_scroll_left"+objTab.controlid).src=img_base + "arrow_left_disabled.gif";
     document.all("__tab_scroll_right"+objTab.controlid).disabled=true;
     document.all("__tab_scroll_right"+objTab.controlid).src=img_base + "arrow_right_disabled.gif";
  
       return;
   }

     
   var total=objTab.getWidth();
   
   var button=objTab.scrollButtonWidth;
   var realLength=total-button;
    var displaycountwithbuttion=-1;
    for (var i = 0;
             i < objTab.aItems.length;
             i++) {
          var item = objTab.aItems[i];
         
      if (item.visible) {
          if(item.right>=realLength){
            
            displaycountwithbuttion=i;
              if(objTab.mode2displayCount>0 &&   displaycountwithbuttion>objTab.mode2displayCount){
                   displaycountwithbuttion=objTab.mode2displayCount;
              }
               break;
          }
      }
   
   
   }
   
   
  objTab.displaycountwithbuttion=displaycountwithbuttion;
  
  if(i==0){
   alert("���󣺵�һ��tabҳ̫����������ʾ�ķ�Χ��");
   throw new Exception();
  }
  
  for(i=displaycountwithbuttion;i<aVisibleItem.length;i++){
          var name=aVisibleItem[i].id
            try{
            if(i!=displaycountwithbuttion){
            document.all(name + "_1").parentElement.style.display='none';
            }
            document.all(name).style.display='none';
            document.all(name + "_2").parentElement.style.display='none';
            }catch(e){
          
            }
  }
  

  
   for (var i = 0;i < objTab.aItems.length; i++) {
       var item = objTab.aItems[i];
       if(item.active){
         var virtulnumber=i+1-displaycountwithbuttion;
         if(virtulnumber<=0){
         document.all("__tab_scroll_right"+objTab.controlid).fireEvent("onclick");
         document.all("__tab_scroll_left"+objTab.controlid).fireEvent("onclick");
         
           break;
         }
         for(var j=0;j<virtulnumber;j++){//ģ����������ȷ���û�����active��ǩ��ʾ
           document.all("__tab_scroll_right"+objTab.controlid).fireEvent("onclick");
         }
       }
   }     
}




function exchangeRow(id,elem){//ģ�͵���ǵ����������������
  /* alert(elem.outerHTML);
    var div=elem.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
   if(div.tagName!='div'){
      div=div.parentElement.parentElement;
   }
   alert(div.id);*/

while(elem.tagName.toLowerCase()!="div"){
     elem=elem.parentElement;
}
var div=elem;

var trs=div.parentElement.parentElement.parentElement.parentElement.rows;

var name='row'+objTab.controlid+(trs.length-2);

var entity=document.all(name);

var num=-1;//��һ��
 for(var i=0;i<trs.length;i++){
     if(trs[i].all(id+"_text")!=null){
         num=i;
         break;
     }
 }
 if(num==trs.length-2){
    return
 }
 var temp;
 temp=entity.innerHTML;
 entity.innerHTML=div.innerHTML;
 div.innerHTML=temp;

 
 
}
var cpass=true;

function checkBeforeChange(newid){
  var activeid;
  var activeItem;
   for(var i=0;i<__aAllTabComponents.length;i++){
     if(__aAllTabComponents[i].active){
       activeid=__aAllTabComponents[i].id;
       if(activeid==newid){
        
          return false;
       }
         
      
       activeItem=__aAllTabComponents[i];
       break;
     }
   }
   
   
   if(!activeItem.needCheckBeforeChangePage){
      return true;
   }
   
  cpass=true;
 
   var tabname= __aAllTabComponents[0].tab.controlid
   var len=("tabitem"+tabname).length
   var number=parseInt(activeid.substr(len));
   var frameid="__tab_area"+tabname+(parseInt(number)-100);
 
   if(activeItem.autoCheckEAP){
     try{
       cpass=document.all(frameid).contentWindow.checkValue();
       if((!cpass) && (!activeItem.pageCheckFailPass)){
          return false;
       }
     }catch(e){

     }  
 
      
   }
 
  if(activeItem.checkOnTabMainJSMethod!="" && cpass){
   try{
  
    var chec=eval("parent."+activeItem.checkOnTabMainJSMethod+"('"+activeItem.tab.controlid+"','"+activeItem.iframeid+"','"+getFrameIDFromEvent(activeItem.tab.controlid,event.srcElement)+"');");
  
    if(!chec && (!activeItem.pageCheckFailPass)){
      return false;
    }
    if(!chec){
     cpass=false;
    }
    }catch(e){
       alert("ִ���û���checkOnTabMainJSMethod����ķ�����������Ϊ:"+e.message);
       return false
    }
 
  }
   
 try{
   if(cpass){
    cpass= document.all(frameid).contentWindow.checkBeforeChangePage();
   }
 }catch(e){
 }

 if(!cpass && activeItem.pageCheckFailPass){
    alert(activeItem.text+"У��ʧ�ܣ�Ŀǰ�������Ա༭����ҳ");
    return true;
 }
 if(!cpass){
    //alert(activeItem.text+"У��ʧ�ܣ�Ŀǰ���������Ա༭����ҳ");
 }
  return cpass;
}

function getFrameIDFromEvent(tabname,element){
  var extendTextName="textCellTD";
   var extendImageName="textCellIMG";
   var tempname="tabitem"+tabname;
   

   if(element.tagName.toLowerCase()=="td" && element.id.indexOf(tempname)!=-1 && element.id.indexOf(extendTextName)==-1 && element.id.indexOf(extendImageName)==-1){
      var id='__tab_area'+tabname+(element.id.substr(tempname.length)-100);
      return  document.all(id).name;
    }
   return getFrameIDFromEvent(tabname,element.parentElement);
}

function __tab_direct(id, action) {//ע�������out��ָonmouseleave������onmouseout;over��ָonmouseenter������onmouseover;

 if(action == "DOWN"){

   if(!checkBeforeChange(id)){
    
     return;
   }
 } 
   try{
   if(window.event.button==2){
   return
   }
   }catch(e){
   }
   
   var extendTextName="textCellTD";
   var extendImageName="textCellIMG";
   if(action == "DOWN"){
	   
    document.getElementById(id+extendTextName).className='';
	try{
    document.getElementById(id+extendImageName).className='';
	}catch(e){}
   }
   if(action=="UP"){
    
     return
   }

    if(action == "DOWN"&&objTab.countRow!=1){
       exchangeRow(id,event.srcElement);
    }
    
    var oriPrefix = "";
    var hasTabArea = true;
    if (action == "OVER" && !objTab.isHooverEnabled) {
        if (browser.ie)
            document.getElementById(id).style.cursor = "hand";
        return
    }
    try {

        if (__aAllTabComponents.length > 0) {
            var component = __aAllTabComponents[0];
            
            hasTabArea = component.tab.tabarea;
            if (component.tab.orientation == "1")
           
                oriPrefix = "B"
        }
        
        if (!objTab.loadFinished){
           return;
         }   
        var aVisibleItem = new Array();
       for (var i = 0;
             i < __aAllTabComponents.length;
             i++) {
             
       
             
            if (__aAllTabComponents[i].visible){
                aVisibleItem[aVisibleItem.length] = __aAllTabComponents[i]
                 document.getElementById(__aAllTabComponents[i].id+extendTextName).className='';
                 try{
                 document.getElementById(__aAllTabComponents[i].id+extendImageName).className='';
				 }catch(e){
				
				 }
		    }		 
        }
        
    
     for (var nt1 = 0;nt1 < aVisibleItem.length;nt1++) {
           if(!aVisibleItem[nt1].visible){
              continue;
           }
        
            if (aVisibleItem[nt1].id == id) {
            
                var component = aVisibleItem[nt1];
                    if (action == "OUT") {
                    try {
                    
                        parent.tabEventItemOut(component,component.tab.id);
                    }
                    catch (Error) {}
                }
                if (action == "OVER") {
                  
                    try {
                        parent.tabEventItemOver(component,component.tab.id)
                    }
                    catch (Error) {}
                }
                if (action == "DOWN" && component.type == "ITEM") {
            
                try {
                        var $0m = false;
                        $0m = parent.tabEventBeforeTabClick(component,component.tab.id);
                        if ($0m)
                            return
                    }
                    catch (Error) {}
                }
                
                
                
                
                
                
                
//////////////////////////////////////////////////////////////////////////////////////////////////////////////                
                   
                if (component.enabled) {
                
                 
                /////////////image���
                    if (component.tab.designmode == "IMAGE") {
                         
                        if (action == "OVER" && component.type == "ITEM") {
                        
                            if (component.active) {
                                if (document.getElementById(id+extendTextName).className != oriPrefix + "TabItemSelectedMiddle" + component.design) {
                                    document.getElementById(id+extendTextName).className = oriPrefix + "TabItemSelectedMiddle" + component.design;
                                }
                            }
                            else {
                               if (document.getElementById(id+extendTextName).className != oriPrefix + "TabItemHoverMiddle" + component.design) {
                                   document.getElementById(id+extendTextName).className = oriPrefix + "TabItemHoverMiddle" + component.design;
                                     
                               }
                               
                            }
                           
                           if (component.active) {
                                if (document.getElementById(id+extendImageName).className != oriPrefix + "TabItemSelectedMiddle" + component.design) {
                                    document.getElementById(id+extendImageName).className = oriPrefix + "TabItemSelectedMiddle" + component.design;
                                }
                            }
                            else {
                               if (document.getElementById(id+extendImageName).className != oriPrefix + "TabItemHoverMiddle" + component.design) {
                                   document.getElementById(id+extendImageName).className = oriPrefix + "TabItemHoverMiddle" + component.design;
                                     
                               }
                               
                            }
                        
                        return;
                        }
                        if (action == "OUT" && component.type == "ITEM") {
                          
                            if (component.active) {
                                if (document.getElementById(id+extendTextName).className != oriPrefix + "TabItemSelectedMiddle" + component.design)
                                    document.getElementById(id+extendTextName).className = oriPrefix + "TabItemSelectedMiddle" + component.design;
                            }
                            else {
                                if (document.getElementById(id+extendTextName).className != oriPrefix + "TabItemMiddle" + component.design)
                                    document.getElementById(id+extendTextName).className = oriPrefix + "TabItemMiddle" + component.design;
                            }
                            
                             if (component.active) {
                                if (document.getElementById(id+extendImageName).className != oriPrefix + "TabItemSelectedMiddle" + component.design)
                                    document.getElementById(id+extendImageName).className = oriPrefix + "TabItemSelectedMiddle" + component.design;
                            }
                            else {
                                if (document.getElementById(id+extendImageName).className != oriPrefix + "TabItemMiddle" + component.design)
                                    document.getElementById(id+extendImageName).className = oriPrefix + "TabItemMiddle" + component.design;
                            }
                         return;
                        }
                        
                      
                        
                        
                        ////////////////////////////////////////////////////////
                        if (action == "DOWN" && component.type == "ITEM") {
                       
                        
                          ///////////////////////////////////////////���½���ۼ�ǰ������ǰ�ۼ��ڵ㡣
                            if (aVisibleItem.length > 1) {
                             for (var h6O9 = 0; h6O9 < aVisibleItem.length; h6O9++) {
                                 
                                    var item = aVisibleItem[h6O9];
                                   
                                    if (item.active) {
                                    
                                        if(item.id==id){
                                         
                                          return;
                                        }
                                     
                                        if (h6O9 == 0 || h6O9==objTab.currentBeginIndex) {
                                         
                                            document.getElementById(item.id + "_1").className = oriPrefix + "TabItemLeft" + component.design;
                                            document.getElementById(item.id).className = oriPrefix + "TabItemMiddle" + component.design;
                                            if (aVisibleItem[1].type == "ITEM")
                                                document.getElementById(aVisibleItem[h6O9 + 1].id + "_1").className = oriPrefix + "TabItemLeftRight" + component.design;
                                            else
                                                document.getElementById(aVisibleItem[h6O9 + 1].id + "_1").className = oriPrefix + "TabItemRight" + component.design;
                                           
                                        }
                                        else {
                                        
                                  
                                            if (aVisibleItem[h6O9 - 1].type == "ITEM"){
                                                document.getElementById(item.id + "_1").className = oriPrefix + "TabItemLeftRight" + component.design;
                                             }
                                            else
                                                document.getElementById(item.id + "_1").className = oriPrefix + "TabItemLeft" + component.design;
                                                
                                              
                                            document.getElementById(item.id).className = oriPrefix + "TabItemMiddle" + component.design;
                                      
                                            
                                            
                                            if (h6O9 == aVisibleItem.length - 1) {
                                                try{
                                                if(item.spec){
                                                document.getElementById(item.id + "_1").className = oriPrefix + "TabItemLeft" + component.design;
                                                }
                                                document.getElementById(item.id + "_2").className = oriPrefix + "TabItemRight" + component.design;
                                                }catch(e){
                                                }
                                            }
                                            
                                            
                                            
                                            
                                            
                                            
                                            else {
                                               if (item.isFirst) {
                                                    document.getElementById(item.id + "_1").className = oriPrefix + "TabItemLeft" + component.design;
                                                    document.getElementById(item.id).className = oriPrefix + "TabItemMiddle" + component.design;
                                                    if (aVisibleItem[1].type == "ITEM")
                                                        document.getElementById(aVisibleItem[h6O9 + 1].id + "_1").className = oriPrefix + "TabItemLeftRight" + component.design;
                                                    else
                                                        document.getElementById(aVisibleItem[h6O9 + 1].id + "_1").className = oriPrefix + "TabItemRight" + component.design;
                                                }
                                                else if (item.isLast) {
                                                    document.getElementById(item.id + "_2").className = oriPrefix + "TabItemRight" + component.design;
                                                }
                                                else {
                                                 
                                                    var id = aVisibleItem[h6O9 + 1].id;
                                                    if (aVisibleItem[h6O9 + 1].type == "ITEM"){
                                                     if(h6O9==objTab.currentEndIndex){
                                                        document.getElementById(id + "_1").className = oriPrefix + "TabItemRight" + component.design;
                                                     }else{
                                                      document.getElementById(id + "_1").className = oriPrefix + "TabItemLeftRight" + component.design;
                                                     } 
                                                    }
                                                    else
                                                        document.getElementById(id + "_1").className = oriPrefix + "TabItemRight" + component.design;
                                                }
                                            }
                                        }
                                        if (item.text)
                                            document.getElementById(item.id + "_text").className = oriPrefix + "TabItemText" + component.design;
                                        item.active = false;
                                        handleFocus(item,true);
                                       
                                        break
                                        
                                    }
                                }
                             }
                          ////////////////////////////////////////  
                            
                         
                            
                    
                            if (aVisibleItem.length > 1) {
                               
                                if (component.type == "ITEM") {
                                    component.active = true;
                                    if (nt1 == 0  || nt1==objTab.currentBeginIndex) {
                                        document.getElementById(component.id + "_1").className = oriPrefix + "TabItemSelectedLeft" + component.design;
                                        document.getElementById(component.id).className = oriPrefix + "TabItemSelectedMiddle" + component.design;
                                        if (aVisibleItem[nt1 + 1].type == "ITEM")
                                            document.getElementById(aVisibleItem[nt1 + 1].id + "_1").className = oriPrefix + "TabItemRightSelectedLeft" + component.design;
                                        else
                                            document.getElementById(aVisibleItem[nt1 + 1].id + "_1").className = oriPrefix + "TabItemSelectedRight" + component.design
                                    }
                                    else if (nt1 > 0 && nt1 < aVisibleItem.length - 1) {
                                        if (component.isFirst) {
                                            document.getElementById(component.id + "_1").className = oriPrefix + "TabItemSelectedLeft" + component.design;
                                            document.getElementById(component.id).className = oriPrefix + "TabItemSelectedMiddle" + component.design;
                                            if (aVisibleItem[nt1 + 1].type == "ITEM")
                                                document.getElementById(aVisibleItem[nt1 + 1].id + "_1").className = oriPrefix + "TabItemRightSelectedLeft" + component.design;
                                            else
                                                document.getElementById(aVisibleItem[nt1 + 1].id + "_1").className = oriPrefix + "TabItemSelectedRight" + component.design
                                        }
                                        else if (component.isLast) {
                                            if (aVisibleItem[nt1 - 1].type == "ITEM")
                                                document.getElementById(component.id + "_1").className = oriPrefix + "TabItemLeftSelectedRight" + component.design;
                                            else
                                                document.getElementById(component.id + "_1").className = oriPrefix + "TabItemSelectedLeft" + component.design;
                                            document.getElementById(component.id).className = oriPrefix + "TabItemSelectedMiddle" + component.design;
                                            document.getElementById(component.id + "_2").className = oriPrefix + "TabItemSelectedRight" + component.design
                                        }
                                        else {
                                            if (aVisibleItem[nt1 - 1].type == "ITEM")
                                                document.getElementById(component.id + "_1").className = oriPrefix + "TabItemLeftSelectedRight" + component.design;
                                            else
                                                document.getElementById(component.id + "_1").className = oriPrefix + "TabItemSelectedLeft" + component.design;
                                            document.getElementById(component.id).className = oriPrefix + "TabItemSelectedMiddle" + component.design;
                                            if (aVisibleItem[nt1 + 1].type == "ITEM"){
                                               if(nt1==objTab.currentEndIndex){
                                               document.getElementById(aVisibleItem[nt1 + 1].id + "_1").className = oriPrefix + "TabItemSelectedRight" + component.design;
                                               }else{
                                                document.getElementById(aVisibleItem[nt1 + 1].id + "_1").className = oriPrefix + "TabItemRightSelectedLeft" + component.design;
                                               }
                                            }
                                            else
                                                document.getElementById(aVisibleItem[nt1 + 1].id + "_1").className = oriPrefix + "TabItemSelectedRight" + component.design;
                                        }
                                    }
                                    else {//=���һ��
                                        if (aVisibleItem[nt1 - 1].type == "ITEM"){
                                         
                                          if(!component.spec){
                                                   document.getElementById(component.id + "_1").className = oriPrefix + "TabItemLeftSelectedRight" + component.design; 
                                                   document.getElementById(component.id + "_2").className = oriPrefix + "TabItemSelectedRight" + component.design;  
                                          }else{
                                                   document.getElementById(component.id + "_1").className = oriPrefix + "TabItemSelectedLeft" + component.design;
                                                   document.getElementById(component.id + "_2").className = oriPrefix + "TabItemSelectedRight" + component.design; 
                                          }
                                        }
                                        else{
                                         document.getElementById(component.id + "_1").className = oriPrefix + "TabItemSelectedLeft" + component.design;
                                         document.getElementById(component.id + "_2").className = oriPrefix + "TabItemSelectedRight" + component.design; 
                                        }    
                                        
                                         document.getElementById(component.id).className = oriPrefix + "TabItemSelectedMiddle" + component.design;  
                                      
                                    }
                                    if (item.text)
                                        document.getElementById(component.id + "_text").className = oriPrefix + "TabItemTextSelected" + component.design;
                                }
                            }
                        }
                       
                        /////////image�ھ۽�ǰ�������//////////////////
                    }
                    
                    
                    
        ///////////////////��image���/////////////////////////////////////////////////////////////////////////////////////////            
                    else {//no image
                 
                       if (action == "OVER" && component.type == "ITEM") {
                            if (!component.active) {
                                if (component.tab.hooverstyle != "") {
                                    document.getElementById(id).style.cssText = component.tab.hooverstyle;
                                }
                                else {
                                    document.getElementById(id).className = oriPrefix + "TabColorHover" + component.design;
                                }
                            }
                        }
                        if (action == "OUT" && component.type == "ITEM") {
                            if (component.active) {
                                if (component.tab.activestyle != "")
                                    document.getElementById(id).style.cssText = component.tab.activestyle;
                                else
                                    document.getElementById(id).className = oriPrefix + "TabColorSelected" + component.design;
                            }
                            else {
                                if (component.tab.standardstyle != "")
                                    document.getElementById(id).style.cssText = component.tab.standardstyle;
                                else
                                    document.getElementById(id).className = oriPrefix + "TabColorStandard" + component.design;
                            }
                        }
                        if (action == "DOWN" && component.type == "ITEM") {
                           
                            for (var h6O9 = 0; h6O9 < aVisibleItem.length; h6O9++) {
                                var item = aVisibleItem[h6O9];
                                if (item.active) {
                                    if (component.tab.standardstyle != "")
                                        document.getElementById(item.id).style.cssText = component.tab.standardstyle;
                                    else
                                        document.getElementById(item.id).className = oriPrefix + "TabColorStandard" + component.design;
                                    if (component.tab.textstyle != "")
                                        document.getElementById(item.id + "_text").style.cssText = component.tab.textstyle;
                                    else
                                        document.getElementById(item.id + "_text").className = oriPrefix + "TabColorText" + component.design;
                                    item.active = false
                                }
                            }
                            component.active = true;
                            if (component.tab.activestyle != "")
                                document.getElementById(id).style.cssText = component.tab.activestyle;
                            else
                                document.getElementById(id).className = oriPrefix + "TabColorSelected" + component.design;
                            if (component.tab.activetextstyle != "")
                                document.getElementById(id + "_text").style.cssText = component.tab.activetextstyle;
                            else
                                document.getElementById(id + "_text").className = oriPrefix + "TabColorTextSelected" + component.design;
                        }
                    }
                    ////////////��image�ھ۽�ǰ�������
                }
                
                
           ////////////////////////////////////////////////////////////////////////////////////////////////////////////////     
                
              
                
             
                
                
                if (action == "DOWN" && component.type == "ITEM" && component.enabled) {
                 
                    objTab.currentItem=component;
                   try {
                        if (component.tab.eventTabClick != "") {
                            eval("parent." + component.tab.eventTabClick + "()");
                            return;
                        }
                    }
                    catch (Error) {}
                    component.tab.lastTabItem = component;
                    if (hasTabArea) {

                      if (component.url != "") {
                            if (!component.cached) {
                                document.getElementById(component.name).src = component.url;
                            }
                            else {
                                if (!component.pageLoaded) {
                                    document.getElementById(component.name).src = component.url;
                                    P6o2$ = component;
                                }
                            }
                       
                        }else if(item.url==""&&item.withoutURL){
                           
                           objTab.convertToDIV(item,true);
                         // document.getElementById(item.name).outerHTML= parent.getElementById('temp_content_'+this.controlID+item.text).outerHTML;
                          //document.getElementById('temp_content_'+this.controlID+item.text).id=item.name;
                        }
                        else {
                            if (browser.ns)
                                window.frames[component.name].document.body.style.backgroundColor = "white";
                        }
                        for (var W2K = 0; W2K < objTab.aItems.length; W2K++) {
                            var curItem = objTab.aItems[W2K];
                            if (curItem.type == "ITEM" && curItem.visible) {
                                if (document.getElementById(curItem.name).style.display != "none")
                                    document.getElementById(curItem.name).style.display = "none";
                            }
                        }
                        document.getElementById(component.name).style.display = "inline";
                        parent.document.getElementById(controlID).style.height = component.height;
                        
                       
                        try {
                             if(parent.tabEventTabClick)
                                parent.tabEventTabClick(component, component.tab.id);
                            if(frames[component.name].document.forms[0].elements[0])
                               frames[component.name].document.focus();
                        }
                        catch (Error) {}
                        
                         handleFocus(component,false);//����������
                         if(objTab.tabMode==2){
                         //����ڵ��������ʱ���ֵı�ǩ˺�ѵ����
                        var len= ("tabitem"+objTab.controlid).length
                     
                          if((parseInt(component.id.substr(len))-101)==objTab.scrollPosition && (parseInt(component.id.substr(len))-101)!=-1){
                            document.all("__tab_scroll_left"+objTab.controlid).fireEvent("onclick");
                            document.all("__tab_scroll_right"+objTab.controlid).fireEvent("onclick");
                          } 
                         }
                    }
                }
               
                return ;
             
            }
            
        }
    }
    catch (Error) {}
    
}

function handleFocus(item,isiframe){
  
  if(isiframe){
    parent.document.focus();
  // document.all(item.name).focus();
  }else{
   document.all(item.name).contentWindow.focus();
  }
}


function __tab_load_item() {
    try {
        var test = window.frames[P6o2$.name].document.body.innerHTML;
        if (test == "") {
            setTimeout("__tab_load_item()", 50);
            return;
        }
        P6o2$.pageLoaded = true;
        try {
            parent.tabEventPageLoaded(P6o2$, controlID)
        }
        catch (Error) {}
        if (P6o2$.refreshAfterLoad) {
            P6o2$.refresh()
        }
    }
    catch (Error) {
        setTimeout("__tab_load_item()",50);
        return;
    }
}

function _refresh() {
    try {
        window.frames[this.name].document.body.innerHTML = window.frames[this.name].document.body.innerHTML;
    }
    catch (Error) {}
}

function _setVisible(value) {
    this.visible = value;
    this.tab.create(true);
}

function _setEnabled(value) {
    this.enabled = value;
    this.tab.create(true);
}

function _getWindow() {
    var win = null;
    try {
        win = window.frames[this.name];
    }
    catch (Error) {}
    return win;
}

function __tabitem_getdoc() {
    var doc = null;
    try {
        doc = window.frames[this.name].document;
    }
    catch (Error) {}
    return doc;
}

function _call(name) {
    try {
        return eval("window.frames[this.name]." + name);
    }
    catch (Error) {
        return false;
    }
}

function _netPostback() {
    return this.call("__doPostBack('','')");
}

function _netValidate() {
    if (browser.ie)
        return this.call("Page_ClientValidate()");
    else
        return true;
}

function _setUrl(url) {
    try {
        document.getElementById(this.name).src = url;
        return true;
    }
    catch (Error) {
        return false;
    }
}

function _changeHeight(height) {
    try {
        parent.document.getElementById(controlID).style.height = height + "px";
        return true;
    }
    catch (Error) {
        return false;
    }
}

function TabSeparator() {
    this.type = "SEPARATOR";
    this.text = "";
    this.width = "100%";
    this.visible = true;
    this.enabled = true;
}





function _getWidth(flag) {

 
  
  if(flag){//����Ǽ���ÿ�и��������Ϊÿ�н�β����λ��(Ϊ����׼ȷ������һ��px)
     return this.width-13;
  }
    return this.width;
 }

function _loadTab(id){
    var item = this.getTabItemByIndex(id);
    window.frames[item.name].location = item.url;
    item.pageLoaded = true;
}

function __tab_scroll(direction,tabname) {

   if(!objTab.ispercent){
      scrollWithoutPercent(direction,tabname);
   }else{
    scrollWithPercent(direction,tabname);
   }   
}

function scrollWithoutPercent(direction,tabname){
 //  var objTab=parent.manager.getTab(tabname);
    if(objTab.allTabItemsWidth<=objTab.width){
    return
    }
    
    
    if(objTab.currentEndIndex==-100){
      objTab.currentEndIndex=objTab.displaycountwithbuttion-1;
    }else{
    restoreClass(objTab.currentBeginIndex,objTab.currentEndIndex);
    }
    
    document.all("__tab_scroll_left"+objTab.controlid).disabled=false;
     document.all("__tab_scroll_left"+objTab.controlid).src=img_base + "arrow_left.gif";
    document.all("__tab_scroll_right"+objTab.controlid).disabled=false;
    document.all("__tab_scroll_right"+objTab.controlid).src=img_base + "arrow_right.gif";
    
    for(var i=0;i<objTab.aVisibleItem.length;i++){
      var name=objTab.aVisibleItem[i].id
      try{

      document.all(name + "_1").parentElement.style.display='';
      document.all(name).style.display='';
      document.all(name + "_2").parentElement.style.display='';
     
      }catch(e){
      }
    } 
  
    

    if (direction == 0) {
     objTab.currentBeginIndex--;
   
      objTab.currentEndIndex--;
        if (objTab.scrollPosition >= 0) {
            if (objTab.scrollLeftAllowed){
                objTab.scrollPosition = objTab.scrollPosition - 1;
             }
        }
    }
    else {
     objTab.currentBeginIndex++;
   
      objTab.currentEndIndex++;
        if (objTab.scrollRightAllowed)
            objTab.scrollPosition = objTab.scrollPosition + 1;
    }
    var position = 0;
    var index=0;
    if (objTab.scrollPosition == -1) {
        position = 0;
    }
    else {
    
        var nt1 = 0;
        for (var i = 0;
             i < objTab.aItems.length;
             i++) {
         
            var item = objTab.aItems[i];
           
            if (item.visible) {
           
             if (nt1 == objTab.scrollPosition) {
             
                 if(item.active){//���ӻ����©��ֵ
                 
                     if(direction==1){
                       position = objTab.aItems[i].right-1-i;
                       index=i;
                       break;
                      }
                 }else{
                    if(objTab.aItems[i+1].active){
                    
                      position = objTab.aItems[i].right-1-i;
                        index=i;
                       break;
                    }
                  }
                  
                  if(direction == 0 ){
                    
                     if(objTab.aItems[i].active){
                       
                      position = objTab.aItems[i].right-1-i;
                        index=i;
                       break;
                     }
                  }
                 
                   position = objTab.aItems[i].right-1-i;
                   index=i;
                   break;
            }
                nt1++;
            }
        }
    }
   index++;
    document.getElementById("scroll"+tabname).style.left = -position;
 var templen="";
 var offset=0;

 if(objTab.aVisibleItem[0].image==""){
 templen=13;
  offset=13;
 }else{

 templen=30;
  offset=13;
 }
 
 
   if ((objTab.aVisibleItem.length-index)*(templen+objTab.cellWidth)+offset> (objTab.width-objTab.scrollButtonWidth))
        objTab.scrollRightAllowed = true;
    else{
       
       if(objTab.displaycountwithbuttion!=-1 && (objTab.aVisibleItem.length-index)>objTab.displaycountwithbuttion){
            objTab.scrollRightAllowed = true;
       }else{
        objTab.scrollRightAllowed = false;
        }
    }
    if (objTab.scrollPosition > -1)
        objTab.scrollLeftAllowed = true;
    else
        objTab.scrollLeftAllowed = false;
        
        
    //objTab.aVisibleItem[scrollPosition+1];
    if(!objTab.scrollRightAllowed){
      document.all("__tab_scroll_right"+objTab.controlid).disabled=true;
      document.all("__tab_scroll_right"+objTab.controlid).src=img_base + "arrow_right_disabled.gif";
    }
    if(!objTab.scrollLeftAllowed){
      document.all("__tab_scroll_left"+objTab.controlid).disabled=true;
      document.all("__tab_scroll_left"+objTab.controlid).src=img_base + "arrow_left_disabled.gif";
    }
    
    
    for(var i=objTab.scrollPosition+objTab.displaycountwithbuttion+1;i<objTab.aVisibleItem.length;i++){
      var name=objTab.aVisibleItem[i].id
      try{
      if(i!=objTab.scrollPosition+objTab.displaycountwithbuttion+1){
        document.all(name + "_1").parentElement.style.display='none';
      }
       document.all(name).style.display='none';
       document.all(name + "_2").parentElement.style.display='none';
      }catch(e){
      }
    } 
    //objTab.displaycount
    
    modifyClass();
}


//var objTab.currentBeginIndex=0;
//var objTab.currentEndIndex=-100;

function scrollWithPercent(direction,tabname){
// document.all("__tab_scroll_left"+objTab.controlid).disabled=true;
    if(objTab.allTabItemsWidth<=objTab.width){
    return
    }
      if(objTab.currentEndIndex==-100){
      objTab.currentEndIndex=objTab.displaycountwithbuttion-1;
 
    }else{
    restoreClass(objTab.currentBeginIndex,objTab.currentEndIndex);
    }
    if(direction==1){
    var beginItem=findItemByIndex(objTab.currentBeginIndex);
    var endItem=findItemByIndex(objTab.currentEndIndex+1);
      var name=beginItem.id;
       try{

      document.all(name + "_1").parentElement.style.display='none';
      document.all(name).style.display='none';
      document.all(name + "_2").parentElement.style.display='none';
     
      }catch(e){
      }
      
      var name=endItem.id;
       try{

      document.all(name + "_1").parentElement.style.display='';
      document.all(name).style.display='';
      document.all(name + "_2").parentElement.style.display='';
     
      }catch(e){
      }
     
      objTab.currentBeginIndex++;
   
      objTab.currentEndIndex++;
     
    }else{

      var beginItem=findItemByIndex(objTab.currentBeginIndex-1);
      
       var endItem=findItemByIndex(objTab.currentEndIndex);
   
      var name=beginItem.id;
       try{

      document.all(name + "_1").parentElement.style.display='';
      document.all(name).style.display='';
      document.all(name + "_2").parentElement.style.display='';
     
      }catch(e){
      }
      
      
       var name=endItem.id;
       try{
   
      
      document.all(name + "_1").parentElement.style.display='none';
      document.all(name).style.display='none';
      document.all(name + "_2").parentElement.style.display='none';
      
      }catch(e){
      }
   
      objTab.currentBeginIndex--;
     
      objTab.currentEndIndex--;
    
   }
  
   if(objTab.currentBeginIndex<=0){
      document.all("__tab_scroll_left"+objTab.controlid).disabled=true;
      document.all("__tab_scroll_left"+objTab.controlid).src=img_base + "arrow_left_disabled.gif";
   }else{
      document.all("__tab_scroll_left"+objTab.controlid).disabled=false;
      document.all("__tab_scroll_left"+objTab.controlid).src=img_base + "arrow_left.gif";
   }
   if( objTab.currentEndIndex>=objTab.aVisibleItem.length-1){
      document.all("__tab_scroll_right"+objTab.controlid).disabled=true;
      document.all("__tab_scroll_right"+objTab.controlid).src=img_base + "arrow_right_disabled.gif";
   }else{
    document.all("__tab_scroll_right"+objTab.controlid).disabled=false;
    document.all("__tab_scroll_right"+objTab.controlid).src=img_base + "arrow_right.gif";
   }
    modifyClass(objTab.currentBeginIndex,objTab.currentEndIndex);
   
}

function  restoreClass(currentBeginIndex,currentEndIndex){
   if(objTab.currentBeginIndex!=0){
     var beginItem=findItemByIndex(objTab.currentBeginIndex);
     var beforeItem=findItemByIndex(objTab.currentBeginIndex-1);
     var name=beginItem.id;

     var leftClass="";
     if(!beforeItem.active){
       if( beginItem.active){
       leftClass="TabItemLeftSelectedRight"+objTab.design;
       }else{
        leftClass="TabItemLeftRight"+objTab.design;
       }
     }else{
     leftClass="TabItemRightSelectedLeft"+objTab.design;
     }
     
     document.all(name + "_1").className=leftClass;
   }
   ////////////////////////////////////////////////////////////////
   if(objTab.currentEndIndex!=objTab.aVisibleItem.length-1){
    var endItem=findItemByIndex(objTab.currentEndIndex);
    var afterEndItem=findItemByIndex(objTab.currentEndIndex+1);
  
     var name=afterEndItem.id;
     var rightClass="";
     if(!endItem.active){
        if(afterEndItem.active){
        rightClass="TabItemLeftSelectedRight"+objTab.design;
        }else{
        
         rightClass="TabItemLeftRight"+objTab.design;
        }
     
     }else{
     rightClass="TabItemRightSelectedLeft"+objTab.design;
     }
     
     document.all(name + "_1").className=rightClass;
 
     document.all(name + "_1").parentElement.style.display='none';
   }
   
}

function  modifyClass(currentBeginIndex,currentEndIndex){

//TabItemSelectedLeft
if(objTab.currentBeginIndex>=0){
     var beginItem=findItemByIndex(objTab.currentBeginIndex);
     var name=beginItem.id;
     var leftClass="";
     if(!beginItem.active){
     leftClass="TabItemLeft"+objTab.design;
     }else{
     leftClass="TabItemSelectedLeft"+objTab.design;
     }
     
     document.all(name + "_1").className=leftClass;
 }
     //////////////////////////////////////////////////////////////////////
  if(objTab.currentEndIndex!=objTab.aVisibleItem.length-1){
     var endItem=findItemByIndex(objTab.currentEndIndex);
     var name=findItemByIndex(objTab.currentEndIndex+1).id;
     var rightClass="";
     if(!endItem.active){
     rightClass="TabItemRight"+objTab.design;
     }else{
     rightClass="TabItemSelectedRight"+objTab.design;
     }
     
     document.all(name + "_1").className=rightClass;
 
     document.all(name + "_1").parentElement.style.display='';
  }   
}


function findItemByIndex(index){

  return objTab.aVisibleItem[index];
             
}

