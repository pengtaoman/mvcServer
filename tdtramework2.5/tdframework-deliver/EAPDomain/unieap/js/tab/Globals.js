/**
//��������Ҽ���Ctrl+n��shift+F10��F5ˢ�¡��˸��
//Author: meizz(÷����) 2002-6-18
document.oncontextmenu=function contextmenu(){
    event.returnValue=false;
}
document.onkeydown=function KeyDown(){
    //���� Alt+ ����� �� //���� Alt+ ����� ��
    if ((window.event.altKey) && ((window.event.keyCode==37) || (window.event.keyCode==39))){
        //alert("��׼��ʹ��ALT+�����ǰ���������ҳ��");
        event.returnValue=false;
    }

// ע���⻹�������������� Alt+ �������
//��Ϊ Alt+ ��������������ʱ����ס Alt �����ţ�
//�������������������η�����ʧЧ�ˡ��Ժ���
//����λ�������������� Alt ���ķ��������֪

    //�����˸�ɾ����
    //���� F5 ˢ�¼�
    //Ctrl + R
    if ((event.keyCode==8) || (event.keyCode==116) || (event.ctrlKey && event.keyCode==82)){
        event.keyCode=0;
        event.returnValue=false;
    }
    //���� Ctrl+n
    if ((event.ctrlKey) && (event.keyCode==78))
        event.returnValue=false;
    //���� shift+F10
    if ((event.shiftKey)&&(event.keyCode==121))
        event.returnValue=false;
    //���� shift ���������¿�һ��ҳ
    if (window.event.srcElement.tagName == "A" && window.event.shiftKey)
        window.event.returnValue = false;
    //����Alt+F4
    if ((window.event.altKey)&&(window.event.keyCode==115)){
        window.showModelessDialog("about:blank","","dialogWidth:1px;dialogheight:1px");
        return false;
    }
}

//����JavaScript����
window.onerror = function killErrors() {
    return true;
}
**/
/*
var statusmsg="��ӭ��Ĺ���"

function hidestatus(){
    window.status=statusmsg
    return true
}
function LEMIS(){
    this.WEB_APP_NAME  = "lemis";
}
var lemis = new LEMIS();*/

/**
 * @file globals.js
 * @desription
 */
//�õ����ϵ�����Ԫ�ص�ֵ
/*
function getAlldata(obj){
    var row="";
    var flag=0;
    if(obj.length){
        for (i=0; i<obj.length; i++ ){
            if ( obj(i).type != "submit" && obj(i).type != "reset" && obj(i).type != "button"){
                if(obj(i).type =="radio" || obj(i).type =="checkbox"){
                    if (obj(i).checked){
                        flag=1;
                    }else{
                        flag=0;
                    }
                }else{
                    if(flag==1){
                        var name=obj(i).name;
                        var value=obj(i).value;
                        row=row+name+"="+value+"&";
                    }
                }
            }
        }
    }else{
      if ( obj.type != "submit" && obj.type != "reset" && obj.type != "button"){
                if(obj.type =="radio" || obj.type =="checkbox"){
                    if (obj.checked){
                        flag=1;
                    }else{
                        flag=0;
                    }
                }else{
                    if(flag==1){
                        var name=obj.name;
                        var value=obj.value;
                        row=row+name+"="+value+"&";
                    }
                }
            }
    }
    //alert(row);
    return row;
}

//���ð�ť��js
function clearForm(obj){
  if(obj.length){
    for(var i = 0; i < obj.length; i++){
        if ( obj(i).type != "submit" && obj(i).type != "reset" && obj(i).type != "button" ){
          if(obj(i).type == "hidden"){
            if(obj(i).name == "aaa020" || obj(i).name == "aac010"){
                obj(i).value='';
            }
          }else{
            obj(i).value='';
          }
        }
    }
  }else{
    if (obj.type != "submit" && obj.type != "reset" && obj.type != "button" ){
            if(obj.type == "hidden"){
                if(obj.name == "aaa020" || obj.name == "aac010"){
                    obj.value='';
                }
            }else{
                obj.value='';
            }
    }
  }
}

function replaceStr(str)
{
    str = str.replace(/%/g,"%25");
    str = str.replace(/&/g,"%26");
    str = str.replace(/\\/g,"&#92;");
    str = str.replace(/</g,"&#60;");
    str = str.replace(/>/g,"&#62;");
    str = str.replace(/\"/g,"&#34;");
    str = str.replace(/ /g,"&nbsp;");

    return str;
}*/
/**
 * У��form���ύ
 */
/*function checkValue(formObj){
    var obj;
    var form = formObj;
    for(i=0;i<form.elements.length; i++){
      obj=form[i];
        if(obj.isEAF=="true"){
          if(obj.type != "submit" && obj.type != "reset" && obj.type != "button" )
             if(!validate(obj)){
                    return false;
             }
         }
    }
    return true;
}*/
/**
 * �ؼ�У��
 */
/*function validate(obj){
  if(!obj.validate()){
    try{
        obj.focus();
    }catch(e){
    }
    return false;
  }
  return true;
}*/
/**
 * �����ύ��ʱ�ڵ���CheckValue֮ǰ���ô˺���
 */
/*function preCheckForBatch(){
   var obj = document.all("tableform");
    if(obj.length){
        for (i=0; i<obj.length; i++ ){
            if ( obj(i).type != "submit" && obj(i).type != "reset" && obj(i).type != "button"){
                if(obj(i).type =="radio" || obj(i).type =="checkbox"){
                    if (obj(i).checked){
                        flag=1;
                    }else{
                        flag=0;
                    }
                }else{
                    if(1 == flag && "true" == obj(i).isEAF){
                         if(!validate(obj(i))){
                           return false;
                         }
                    }
                }
            }
        }
    }else{
      if ( obj.type != "submit" && obj.type != "reset" && obj.type != "button"){
                if(obj.type =="radio" || obj.type =="checkbox"){
                    if (obj.checked){
                        flag=1;
                    }else{
                        flag=0;
                    }
                }else{
                    if(1 == flag && "true" == obj.isEAF){
                         if(!validate(obj)){
                           return false;
                         }
                    }
                }
            }
    }
    return true;
}*/

/**
 * ���������ύ
 */
/*function newBatch(){
   var obj = document.all("tableform");
    if(obj.length){
        for (i=0; i<obj.length; i++ ){
            if ( obj(i).type != "submit" && obj(i).type != "reset" && obj(i).type != "button"){
                if(obj(i).type =="radio" || obj(i).type =="checkbox"){
                    if (obj(i).checked){
                        obj(i).checked = false;
                    }
                }else{
                  if("hidden" != obj(i).type){
                    obj(i).value='';
                  }
                }
            }
        }
    }else{
      if ( obj.type != "submit" && obj.type != "reset" && obj.type != "button"){
                if(obj.type =="radio" || obj.type =="checkbox"){
                    if (obj.checked){
                        obj.checked = false;
                    }
                }else{
                   if("hidden" != obj.type){
                    obj.value='';
                  }
                }
      }
    }
}*/
/**
 * ҳ����Ի�
 */
/*function page_init(){
  //�ر�tabҳ�ĵȴ���Ϣ
  if(parent != null){
      if(parent.document.all.PendingMessage != null){
         parent.document.all.PendingMessage.style.display="none";
      }
  }
}

function selectall(obj){
    if(null ==obj) return false;
    var num=obj.length;
    if(document.all("checkall").checked){
        if(num==null){
            obj.checked=true;
        }
        else{
           for (var i=0;i<num;i++){
             if(!obj[i].disabled){
                obj[i].checked=true;
             }
           }
        }
      }
      else {
           if(num==null){
               obj.checked=false;
           }
           else{
             for (var i=0;i<num;i++)
              obj[i].checked=false;
          }
      }
}
//�ж��Ƿ�ȫѡ��������������checkboxȫ��ѡ�У����޸�checkall��״̬
function checkItem(checkListName, controlCheck)
{
 var aryChecked = document.all(checkListName);
 if (aryChecked != null)
 {
  if (aryChecked.length != null && aryChecked.length > 0)
  {
   var nCount = 0;
   for (var i = 0; i < aryChecked.length; i ++)
   {
    if (aryChecked[i].checked)
        nCount ++;
   }
   if (nCount == aryChecked.length) {
       controlCheck.checked = true;
    }  else{
       controlCheck.checked = false;
    }
  }
  else
  {
   controlCheck.checked = aryChecked.checked;
  }
 }
}

//ֻ��ѡ��һ��
function editObj(name) {
    var checkObj = document.all(name);
    if (checkObj) {
      if (checkObj.length) {
        for (var i=0,j=0;i<checkObj.length && j<=2;i++) {
          if (checkObj[i].checked) {
            j++;
          }
        }
        if (j > 1) {
          alert("ֻ��ѡ��һ��ҵ�����ݣ�");
          return false;
        } else if (j == 0) {
          alert("��ѡ��ҵ�����ݣ�");
          return false;
        }
      } else {
        if (! checkObj.checked) {
          alert("��ѡ��ҵ������");
          return false;
        }
      }
    } else {
      alert("��ǰû�пɲ���ҵ�����ݣ�");
      return false;
    }
    return true;
  }

//����iframe����ĵ�lemisTable�б��б�����ѡ�е�����
function editFrameObj(frameName,msg) {
    var checkObj=document.all(frameName).contentWindow.document.all("chk");
    if (checkObj) {
      if (checkObj.length) {
        for (var i=0,j=0;i<checkObj.length && j<=2;i++) {
          if (checkObj[i].checked) {
            j++;
          }
        }
        if (j > 1) {
          alert("ֻ��ѡ��һ��ҵ�����ݣ�");
          return false;
        } else if (j == 0) {
          alert(msg);
          return false;
        }
      } else {
        if (! checkObj.checked) {
          alert(msg);
          return false;
        }
      }
    } else {
      alert("��ǰû�пɲ���ҵ�����ݣ�");
      return false;
    }
    return true;
  }
//������ѡ��
function delObj(name) {
    var checkObj = document.all(name);   //��ѡ�����
    if (checkObj) {
      if (checkObj.length) {
        for (var i=0,j=0;i<checkObj.length;i++) {
          if (checkObj[i].checked) {
            j++;
            break;
          }
        }
        if (j == 0) {
          alert("��ѡ��ҵ�����ݣ�");
          return false;
        }
      } else {
        if (!checkObj.checked) {
          alert("��ѡ��ҵ�����ݣ�");
          return false;
        }
      }
    } else {
      alert("��ǰû�пɲ�����ҵ�����ݣ�");
      return false;
    }
     return true;
  }*/

/**�õ���ǰ�е�����
*@param obj object
*/
/*
function getRowData(obj){
    //get the parent element(TD)
    var obj_col=obj.parentElement;
    if (obj_col==null)
    {
        return;
    }
    //get the parent element again(TR)
    var obj_row=obj_col.parentElement;
    if (obj_row==null)
    {
        return;
    }
    //keep the data of the current line
    var rowData=new Array();
    var iLength=obj_row.childNodes.length;
    var iNum=0;
    for (var i=0;i<iLength;i++)
    {
        //rowData[iNum]=obj_row.childNodes(i).childNodes(0).value;
        rowData[iNum]=obj_row.childNodes(i).innerText;
        iNum++;
    }
    return rowData;
}

//�õ�Ҫ�༭�����ݣ�1����name:checkbox��name
function getEditData(name){
  var obj=document.all.tags("input");
  var rowdata = null;
    var str="";
    for(var i=0;i<obj.length;i++)
    {
      if(obj[i].type == "checkbox"){

        if( obj[i].name == name && obj[i].checked){
            rowdata = getRowData(obj[i]);
              break;
        }
      }
    }
  return rowdata;
}*/

/**У��ͬ����radio�Ƿ��б�ѡ��
*  @param objRadio ͬ����radio
*  @return true/false/null �б�ѡ��/û�б�ѡ��/���󲻴���
*  @author zhouzm
*/
/*
function checkRadio(objRadio){
    if(objRadio==undefined)
    return null;
    if(objRadio.length==undefined){
        return objRadio.checked;
    }else{
        for(var i=0;i<objRadio.length;i++){
         if(objRadio[i].checked)
            return true;
        }
        return false;
    }
}*/

/**У��ͬ����radio�Ƿ��б�ѡ��
*  @param objRadio ͬ����radio
*  @return true/false/null �б�ѡ��/û�б�ѡ��/���󲻴���
*  @author zhouzm
*/
/*
function checkRadio(objRadio){
    if(objRadio==undefined)
    return true;
    if(objRadio.length==undefined){
        return objRadio.checked;
    }else{
        for(var i=0;i<objRadio.length;i++){
         if(objRadio[i].checked)
            return true;
        }
        return false;
    }
}*/

//====================================���� js====================================================
//==================================================== �����趨���� =======================================================
/*var bMoveable=true;     //���������Ƿ�����϶�
var regionTree=false;
var workTypeTree=false;
var countryTree=false;
var calendar=false;
var _VersionInfo="Version:2.0&#13;2.0����:walkingpoison&#13;1.0����: F.R.Huang(meizz)&#13;MAIL: meizz@hzcnc.com"    //�汾��Ϣ

//==================================================== WEB ҳ����ʾ���� =====================================================
var strFrame;       //����������HTML����
document.writeln('<iframe id=meizzDateLayer Author=wayx frameborder=0 style="position: absolute; width: 144; height: 211; z-index: 9998; display: none"></iframe>');
strFrame='<style>';
strFrame+='INPUT.button{BORDER-RIGHT: #8FB1F3 1px solid;BORDER-TOP: #8FB1F3 1px solid;BORDER-LEFT: #8FB1F3 1px solid;';
strFrame+='BORDER-BOTTOM: #8FB1F3 1px solid;BACKGROUND-COLOR: #fff8ec;font-family:����;}';
strFrame+='TD{FONT-SIZE: 9pt;font-family:����;}';
strFrame+='</style>';
strFrame+='<scr' + 'ipt>';
strFrame+='var datelayerx,datelayery; */  /*��������ؼ������λ��*/';
/*
strFrame+='var bDrag;   ����Ƿ�ʼ�϶�*/';
/*strFrame+='function document.onmousemove()  ������ƶ��¼��У������ʼ�϶����������ƶ�����*/';
/*strFrame+='{if(bDrag && window.event.button==1)';
strFrame+=' {var DateLayer=parent.document.all.meizzDateLayer.style;';*/
/*strFrame+='     DateLayer.posLeft += window.event.clientX-datelayerx;����ÿ���ƶ��Ժ����λ�ö��ָ�Ϊ��ʼ��λ�ã����д����div�в�ͬ*/';
/*srFrame+='     DateLayer.posTop += window.event.clientY-datelayery;}}';
strFrame+='function DragStart()     ��ʼ�����϶�*/';
/*strFrame+='{var DateLayer=parent.document.all.meizzDateLayer.style;';
strFrame+=' datelayerx=window.event.clientX;';
strFrame+=' datelayery=window.event.clientY;';
strFrame+=' bDrag=true;}';*/
/*strFrame+='function DragEnd(){      ���������϶�*/';
/*strFrame+=' bDrag=false;}';
strFrame+='</scr' + 'ipt>';
strFrame+='<div style="z-index:9999;position: absolute; left:0; top:0;" onselectstart="return false"><span id=tmpSelectYearLayer Author=wayx style="z-index: 9999;position: absolute;top: 3; left: 19;display: none"></span>';
strFrame+='<span id=tmpSelectMonthLayer Author=wayx style="z-index: 9999;position: absolute;top: 3; left: 78;display: none"></span>';
strFrame+='<table border=1 cellspacing=0 cellpadding=0 width=142 height=160 bordercolor=#8FB1F3 bgcolor=#8FB1F3 Author="wayx">';
strFrame+='  <tr Author="wayx"><td width=142 height=23 Author="wayx" bgcolor=#FFFFFF><table border=0 cellspacing=1 cellpadding=0 width=140 Author="wayx" height=23>';
strFrame+='      <tr align=center Author="wayx"><td width=16 align=center bgcolor=#8FB1F3 style="font-size:12px;cursor: hand;color: #ffffff" ';
strFrame+='        onclick="parent.meizzPrevM()" title="��ǰ�� 1 ��" Author=meizz><b Author=meizz>&lt;</b>';
strFrame+='        </td><td width=60 align=center style="font-size:12px;cursor:default" Author=meizz ';
strFrame+='onmouseover="style.backgroundColor=\'#FFD700\'" onmouseout="style.backgroundColor=\'white\'" ';
strFrame+='onclick="parent.tmpSelectYearInnerHTML(this.innerText.substring(0,4))" title="�������ѡ�����"><span Author=meizz id=meizzYearHead></span></td>';
strFrame+='<td width=48 align=center style="font-size:12px;cursor:default" Author=meizz onmouseover="style.backgroundColor=\'#FFD700\'" ';
strFrame+=' onmouseout="style.backgroundColor=\'white\'" onclick="parent.tmpSelectMonthInnerHTML(this.innerText.length==3?this.innerText.substring(0,1):this.innerText.substring(0,2))"';
strFrame+='        title="�������ѡ���·�"><span id=meizzMonthHead Author=meizz></span></td>';
strFrame+='        <td width=16 bgcolor=#8FB1F3 align=center style="font-size:12px;cursor: hand;color: #ffffff" ';
strFrame+='         onclick="parent.meizzNextM()" title="��� 1 ��" Author=meizz><b Author=meizz>&gt;</b></td></tr>';
strFrame+='    </table></td></tr>';
strFrame+='  <tr Author="wayx"><td width=142 height=18 Author="wayx">';
strFrame+='<table border=1 cellspacing=0 cellpadding=0 bgcolor=#8FB1F3 ' + (bMoveable? 'onmousedown="DragStart()" onmouseup="DragEnd()"':'');
strFrame+=' BORDERCOLORLIGHT=#8FB1F3 BORDERCOLORDARK=#FFFFFF width=140 height=20 Author="wayx" style="cursor:' + (bMoveable ? 'move':'default') + '">';
strFrame+='<tr Author="wayx" align=center valign=bottom><td style="font-size:12px;color:#FFFFFF" Author=meizz>��</td>';
strFrame+='<td style="font-size:12px;color:#FFFFFF" Author=meizz>һ</td><td style="font-size:12px;color:#FFFFFF" Author=meizz>��</td>';
strFrame+='<td style="font-size:12px;color:#FFFFFF" Author=meizz>��</td><td style="font-size:12px;color:#FFFFFF" Author=meizz>��</td>';
strFrame+='<td style="font-size:12px;color:#FFFFFF" Author=meizz>��</td><td style="font-size:12px;color:#FFFFFF" Author=meizz>��</td></tr>';
strFrame+='</table></td></tr><!-- Author:F.R.Huang(meizz) http://www.meizz.com/ mail: meizz@hzcnc.com 2002-10-8 -->';
strFrame+='  <tr Author="wayx"><td width=142 height=120 Author="wayx">';
strFrame+='    <table border=1 cellspacing=2 cellpadding=0 BORDERCOLORLIGHT=#8FB1F3 BORDERCOLORDARK=#FFFFFF bgcolor=#fff8ec width=140 height=120 Author="wayx">';
var n=0; for (j=0;j<5;j++){ strFrame+= ' <tr align=center Author="wayx">'; for (i=0;i<7;i++){
strFrame+='<td width=20 height=20 id=meizzDay'+n+' style="font-size:12px" Author=meizz onclick=parent.meizzDayClick(this.innerText,0)></td>';n++;}
strFrame+='</tr>';}
strFrame+='      <tr align=center Author="wayx">';
for (i=35;i<39;i++)strFrame+='<td width=20 height=20 id=meizzDay'+i+' style="font-size:12px" Author=wayx onclick="parent.meizzDayClick(this.innerText,0)"></td>';
strFrame+='        <td colspan=3 align=right Author=meizz><span onclick=parent.closeLayer() style="font-size:12px;cursor: hand"';
strFrame+='         Author=meizz title="' + _VersionInfo + '"><u>�ر�</u></span>&nbsp;</td></tr>';
strFrame+='    </table></td></tr><tr Author="wayx"><td Author="wayx">';
strFrame+='        <table border=0 cellspacing=1 cellpadding=0 width=100% Author="wayx" bgcolor=#FFFFFF>';
strFrame+='          <tr Author="wayx"><td Author=meizz align=left><input Author=meizz type=button class=button value="<<" title="��ǰ�� 1 ��" onclick="parent.meizzPrevY()" ';
strFrame+='             onfocus="this.blur()" style="font-size: 12px; height: 20px"><input Author=meizz class=button title="��ǰ�� 1 ��" type=button ';
strFrame+='             value="< " onclick="parent.meizzPrevM()" onfocus="this.blur()" style="font-size: 12px; height: 20px"></td><td ';
strFrame+='             Author=meizz align=center><input Author=meizz type=button class=button value=���� onclick="parent.meizzToday()" ';
strFrame+='             onfocus="this.blur()" title="��ǰ����" style="font-size: 12px; height: 20px; cursor:hand"></td><td ';
strFrame+='             Author=meizz align=right><input Author=meizz type=button class=button value=" >" onclick="parent.meizzNextM()" ';
strFrame+='             onfocus="this.blur()" title="��� 1 ��" class=button style="font-size: 12px; height: 20px"><input ';
strFrame+='             Author=meizz type=button class=button value=">>" title="��� 1 ��" onclick="parent.meizzNextY()"';
strFrame+='             onfocus="this.blur()" style="font-size: 12px; height: 20px"></td>';
strFrame+='</tr></table></td></tr></table></div>';

window.frames.meizzDateLayer.document.writeln(strFrame);
window.frames.meizzDateLayer.document.close();      //���ie������������������

//==================================================== WEB ҳ����ʾ����

var outObject;
var outButton;      //����İ�ť
var outDate="";     //��Ŷ��������
var odatelayer=window.frames.meizzDateLayer.document.all;       //�����������
function setday(tt,obj) //��������
{
    if (arguments.length >  2){alert("�Բ��𣡴��뱾�ؼ��Ĳ���̫�࣡");return;}
    if (arguments.length == 0){alert("�Բ�����û�д��ر��ؼ��κβ�����");return;}
   calendar=true;       //��ʾ�Ѿ���������
   lemisTree=false;     //lemisTree
//   alert("lemisTree:"+lemisTree);
//   alert("calendar:"+calendar);
    var dads  = document.all.meizzDateLayer.style;
    var th = tt;
    var ttop  = tt.offsetTop;     //TT�ؼ��Ķ�λ���
    var thei  = tt.clientHeight;  //TT�ؼ�����ĸ�
    var tleft = tt.offsetLeft;    //TT�ؼ��Ķ�λ���
    var ttyp  = tt.type;          //TT�ؼ�������
    while (tt = tt.offsetParent){ttop+=tt.offsetTop; tleft+=tt.offsetLeft;}
    //dads.top  =  (ttyp=="image")? ttop+thei : ttop+thei+6;
    //dads.left = tleft;
    dads.top  = getPopY( (ttyp=="image")? ttop+thei : ttop+thei+6);
    dads.left = getPopX(tleft);
    outObject = (arguments.length == 1) ? th : obj;
    outButton = (arguments.length == 1) ? null : th;    //�趨�ⲿ����İ�ť
    //���ݵ�ǰ������������ʾ����������
    var reg = /^(\d+)-(\d{1,2})-(\d{1,2})$/;
    var r = outObject.value.match(reg);
    if(r!=null){
        r[2]=r[2]-1;
        var d= new Date(r[1], r[2],r[3]);
        if(d.getFullYear()==r[1] && d.getMonth()==r[2] && d.getDate()==r[3]){
            outDate=d;      //�����ⲿ���������
        }
        else outDate="";
            meizzSetDay(r[1],r[2]+1);
    }
    else{
        outDate="";
        meizzSetDay(new Date().getFullYear(), new Date().getMonth() + 1);
    }
    dads.display = '';

    event.returnValue=false;
}

var MonHead = new Array(12);               //����������ÿ���µ��������
    MonHead[0] = 31; MonHead[1] = 28; MonHead[2] = 31; MonHead[3] = 30; MonHead[4]  = 31; MonHead[5]  = 30;
    MonHead[6] = 31; MonHead[7] = 31; MonHead[8] = 30; MonHead[9] = 31; MonHead[10] = 30; MonHead[11] = 31;

var meizzTheYear=new Date().getFullYear(); //������ı����ĳ�ʼֵ
var meizzTheMonth=new Date().getMonth()+1; //�����µı����ĳ�ʼֵ
var meizzWDay=new Array(39);               //����д���ڵ�����

function document.onclick(){ //������ʱ�رոÿؼ�   //ie6�����������������л����㴦�����
      with(window.event)
      {
          if(workTypeTree){
              if (srcElement != workType_outObject1){
                  regionTree=false;
                  workTypeTree=false;
                  calendar=false;
                  countryTree=false;
                  workTypeTree_close();
             }
          }
          if(regionTree){
              if (srcElement != region_outObject1){
                  regionTree=false;
                  workTypeTree=false;
                  calendar=false;
                  countryTree=false;
                  regionTree_close();
             }
          }
          if(countryTree){
              if (srcElement != country_outObject1){
                  regionTree=false;
                  workTypeTree=false;
                  calendar=false;
                  countryTree=false;
                  countryTree_close();
              }
          }
          if(calendar){
              if (srcElement != outObject && srcElement != outButton)
              {
                  regionTree=false;
                  workTypeTree=false;
                  calendar=false;
                  countryTree=false;
                  closeLayer();
              }
          }
      }
  }

function document.onkeyup()     //��Esc���رգ��л�����ر�
  {
    if (window.event.keyCode==27){
        if(outObject)outObject.blur();
        closeLayer();
    }
    else if(document.activeElement)
        if(document.activeElement.getAttribute("Author")==null && document.activeElement != outObject && document.activeElement != outButton)
        {
            closeLayer();
        }
  }

function meizzWriteHead(yy,mm)  //�� head ��д�뵱ǰ��������
  {
    odatelayer.meizzYearHead.innerText  = yy + " ��";
    odatelayer.meizzMonthHead.innerText = mm + " ��";
  }

function tmpSelectYearInnerHTML(strYear) //��ݵ�������
{
  if (strYear.match(/\D/)!=null){alert("�����������������֣�");return;}
  var m = (strYear) ? strYear : new Date().getFullYear();
  if (m < 1000 || m > 9999) {alert("���ֵ���� 1000 �� 9999 ֮�䣡");return;}
  var n = m - 100;
  if (n < 1000) n = 1000;
  if (n + 26 > 9999) n = 9974;
  var s = "<select Author=meizz name=tmpSelectYear style='font-size: 12px' "
     s += "onblur='document.all.tmpSelectYearLayer.style.display=\"none\"' "
     s += "onchange='document.all.tmpSelectYearLayer.style.display=\"none\";"
     s += "parent.meizzTheYear = this.value; parent.meizzSetDay(parent.meizzTheYear,parent.meizzTheMonth)'>\r\n";
  var selectInnerHTML = s;
  for (var i = n; i < n + 150; i++)
  {
    if (i == m)
       {selectInnerHTML += "<option Author=wayx value='" + i + "' selected>" + i + "��" + "</option>\r\n";}
    else {selectInnerHTML += "<option Author=wayx value='" + i + "'>" + i + "��" + "</option>\r\n";}
  }
  selectInnerHTML += "</select>";
  odatelayer.tmpSelectYearLayer.style.display="";
  odatelayer.tmpSelectYearLayer.innerHTML = selectInnerHTML;
  odatelayer.tmpSelectYear.focus();
}

function tmpSelectMonthInnerHTML(strMonth) //�·ݵ�������
{
  if (strMonth.match(/\D/)!=null){alert("�·���������������֣�");return;}
  var m = (strMonth) ? strMonth : new Date().getMonth() + 1;
  var s = "<select Author=meizz name=tmpSelectMonth style='font-size: 12px' "
     s += "onblur='document.all.tmpSelectMonthLayer.style.display=\"none\"' "
     s += "onchange='document.all.tmpSelectMonthLayer.style.display=\"none\";"
     s += "parent.meizzTheMonth = this.value; parent.meizzSetDay(parent.meizzTheYear,parent.meizzTheMonth)'>\r\n";
  var selectInnerHTML = s;
  for (var i = 1; i < 13; i++)
  {
    if (i == m)
       {selectInnerHTML += "<option Author=wayx value='"+i+"' selected>"+i+"��"+"</option>\r\n";}
    else {selectInnerHTML += "<option Author=wayx value='"+i+"'>"+i+"��"+"</option>\r\n";}
  }
  selectInnerHTML += "</select>";
  odatelayer.tmpSelectMonthLayer.style.display="";
  odatelayer.tmpSelectMonthLayer.innerHTML = selectInnerHTML;
  odatelayer.tmpSelectMonth.focus();
}

function closeLayer()               //�����Ĺر�
{
    regionTree=false;
    workTypeTree=false;
    calendar=false;
    document.all.meizzDateLayer.style.display="none";
}

function IsPinYear(year)            //�ж��Ƿ���ƽ��
  {
    if (0==year%4&&((year%100!=0)||(year%400==0))) return true;else return false;
  }

function GetMonthCount(year,month)  //�������Ϊ29��
  {
    var c=MonHead[month-1];if((month==2)&&IsPinYear(year)) c++;return c;
  }

function GetDOW(day,month,year)     //��ĳ������ڼ�
  {
    var dt=new Date(year,month-1,day).getDay()/7; return dt;
  }

function meizzPrevY()  //��ǰ�� Year
  {
    if(meizzTheYear > 999 && meizzTheYear <10000){meizzTheYear--;}
    else{alert("��ݳ�����Χ��1000-9999����");}
    meizzSetDay(meizzTheYear,meizzTheMonth);
  }
function meizzNextY()  //���� Year
  {
    if(meizzTheYear > 999 && meizzTheYear <10000){meizzTheYear++;}
    else{alert("��ݳ�����Χ��1000-9999����");}
    meizzSetDay(meizzTheYear,meizzTheMonth);
  }
function meizzToday()  //Today Button
  {
    var today;
    meizzTheYear = new Date().getFullYear();
    meizzTheMonth = new Date().getMonth()+1;
    today=new Date().getDate();
//    if (meizzTheMonth < 10){meizzTheMonth = "0" + meizzTheMonth;}
//    if (today < 10){today = "0" + today;}
//    if(meizzTheMonth.length==1)meizzTheMonth="0"+meizzTheMonth;
//    if(today.length==1)today="0"+today;
//    parent.alert(meizzTheMonth);
//    parent.alert(today);
    meizzSetDay(meizzTheYear,meizzTheMonth);
    if(outObject){
//        if((meizzTheMonth < 10)and(!(today < 10))){
//          outObject.value=meizzTheYear + "-0" + meizzTheMonth + "-" + today;
//        }else if((!(meizzTheMonth < 10))and(today < 10)){
//            outObject.value=meizzTheYear + "-" + meizzTheMonth + "-0" + today;
//        }else if((meizzTheMonth < 10)and(today < 10)){
//            outObject.value=meizzTheYear + "-0" + meizzTheMonth + "-0" + today;
//        }else{
            if(meizzTheMonth < 10)
                meizzTheMonth = "0" + meizzTheMonth;
            if(today < 10)
                today = "0" + today;
            outObject.value=meizzTheYear + "-" + meizzTheMonth + "-" + today;
//        }
    }
    closeLayer();
  }
function meizzPrevM()  //��ǰ���·�
  {
    if(meizzTheMonth>1){meizzTheMonth--}else{meizzTheYear--;meizzTheMonth=12;}
    meizzSetDay(meizzTheYear,meizzTheMonth);
  }
function meizzNextM()  //�����·�
  {
    if(meizzTheMonth==12){meizzTheYear++;meizzTheMonth=1}else{meizzTheMonth++}
    meizzSetDay(meizzTheYear,meizzTheMonth);
  }

function meizzSetDay(yy,mm)   //��Ҫ��д����**********
{
  meizzWriteHead(yy,mm);
  //���õ�ǰ���µĹ�������Ϊ����ֵ
  meizzTheYear=yy;
  meizzTheMonth=mm;

  for (var i = 0; i < 39; i++){meizzWDay[i]=""};  //����ʾ�������ȫ�����
  var day1 = 1,day2=1,firstday = new Date(yy,mm-1,1).getDay();  //ĳ�µ�һ������ڼ�
  for (i=0;i<firstday;i++)meizzWDay[i]=GetMonthCount(mm==1?yy-1:yy,mm==1?12:mm-1)-firstday+i+1  //�ϸ��µ������
  for (i = firstday; day1 < GetMonthCount(yy,mm)+1; i++){meizzWDay[i]=day1;day1++;}
  for (i=firstday+GetMonthCount(yy,mm);i<39;i++){meizzWDay[i]=day2;day2++}
  for (i = 0; i < 39; i++)
  { var da = eval("odatelayer.meizzDay"+i)     //��д�µ�һ���µ�������������
    if (meizzWDay[i]!="")
      {
        //��ʼ���߿�
        da.borderColorLight="#8FB1F3";
        da.borderColorDark="#FFFFFF";
        if(i<firstday)      //�ϸ��µĲ���
        {
            da.innerHTML="<b><font color=gray>" + meizzWDay[i] + "</font></b>";
            da.title=(mm==1?12:mm-1) +"��" + meizzWDay[i] + "��";
            da.onclick=Function("meizzDayClick(this.innerText,-1)");
            if(!outDate)
                da.style.backgroundColor = ((mm==1?yy-1:yy) == new Date().getFullYear() &&
                    (mm==1?12:mm-1) == new Date().getMonth()+1 && meizzWDay[i] == new Date().getDate()) ?
                     "#FFD700":"#e0e0e0";
            else
            {
                da.style.backgroundColor =((mm==1?yy-1:yy)==outDate.getFullYear() && (mm==1?12:mm-1)== outDate.getMonth() + 1 &&
                meizzWDay[i]==outDate.getDate())? "#00ffff" :
                (((mm==1?yy-1:yy) == new Date().getFullYear() && (mm==1?12:mm-1) == new Date().getMonth()+1 &&
                meizzWDay[i] == new Date().getDate()) ? "#FFD700":"#e0e0e0");
                //��ѡ�е�������ʾΪ����ȥ
                if((mm==1?yy-1:yy)==outDate.getFullYear() && (mm==1?12:mm-1)== outDate.getMonth() + 1 &&
                meizzWDay[i]==outDate.getDate())
                {
                    da.borderColorLight="#FFFFFF";
                    da.borderColorDark="#8FB1F3";
                }
            }
        }
        else if (i>=firstday+GetMonthCount(yy,mm))      //�¸��µĲ���
        {
            da.innerHTML="<b><font color=gray>" + meizzWDay[i] + "</font></b>";
            da.title=(mm==12?1:mm+1) +"��" + meizzWDay[i] + "��";
            da.onclick=Function("meizzDayClick(this.innerText,1)");
            if(!outDate)
                da.style.backgroundColor = ((mm==12?yy+1:yy) == new Date().getFullYear() &&
                    (mm==12?1:mm+1) == new Date().getMonth()+1 && meizzWDay[i] == new Date().getDate()) ?
                     "#FFD700":"#e0e0e0";
            else
            {
                da.style.backgroundColor =((mm==12?yy+1:yy)==outDate.getFullYear() && (mm==12?1:mm+1)== outDate.getMonth() + 1 &&
                meizzWDay[i]==outDate.getDate())? "#00ffff" :
                (((mm==12?yy+1:yy) == new Date().getFullYear() && (mm==12?1:mm+1) == new Date().getMonth()+1 &&
                meizzWDay[i] == new Date().getDate()) ? "#FFD700":"#e0e0e0");
                //��ѡ�е�������ʾΪ����ȥ
                if((mm==12?yy+1:yy)==outDate.getFullYear() && (mm==12?1:mm+1)== outDate.getMonth() + 1 &&
                meizzWDay[i]==outDate.getDate())
                {
                    da.borderColorLight="#FFFFFF";
                    da.borderColorDark="#8FB1F3";
                }
            }
        }
        else        //���µĲ���
        {
            da.innerHTML="<b>" + meizzWDay[i] + "</b>";
            da.title=mm +"��" + meizzWDay[i] + "��";
            da.onclick=Function("meizzDayClick(this.innerText,0)");     //��td����onclick�¼��Ĵ���
            //����ǵ�ǰѡ������ڣ�����ʾ����ɫ�ı���������ǵ�ǰ���ڣ�����ʾ����ɫ����
            if(!outDate)
                da.style.backgroundColor = (yy == new Date().getFullYear() && mm == new Date().getMonth()+1 && meizzWDay[i] == new Date().getDate())?
                    "#FFD700":"#e0e0e0";
            else
            {
                da.style.backgroundColor =(yy==outDate.getFullYear() && mm== outDate.getMonth() + 1 && meizzWDay[i]==outDate.getDate())?
                    "#00ffff":((yy == new Date().getFullYear() && mm == new Date().getMonth()+1 && meizzWDay[i] == new Date().getDate())?
                    "#FFD700":"#e0e0e0");
                //��ѡ�е�������ʾΪ����ȥ
                if(yy==outDate.getFullYear() && mm== outDate.getMonth() + 1 && meizzWDay[i]==outDate.getDate())
                {
                    da.borderColorLight="#FFFFFF";
                    da.borderColorDark="#8FB1F3";
                }
            }
        }
        da.style.cursor="hand"
      }
    else{da.innerHTML="";da.style.backgroundColor="";da.style.cursor="default"}
  }
}

function meizzDayClick(n,ex)  //�����ʾ��ѡȡ���ڣ������뺯��*************
{
  var yy=meizzTheYear;
  var mm = parseInt(meizzTheMonth)+ex;  //ex��ʾƫ����������ѡ���ϸ��·ݺ��¸��·ݵ�����
    //�ж��·ݣ������ж�Ӧ�Ĵ���
    if(mm<1){
        yy--;
        mm=12+mm;
    }
    else if(mm>12){
        yy++;
        mm=mm-12;
    }

  if (mm < 10){mm = "0" + mm;}
  if (outObject)
  {
    if (!n) {//outObject.value="";
      return;}
    if ( n < 10){n = "0" + n;}
    outObject.value= yy + "-" + mm + "-" + n ; //ע�����������������ĳ�����Ҫ�ĸ�ʽ
    closeLayer();
  }
  else {closeLayer(); alert("����Ҫ����Ŀؼ����󲢲����ڣ�");}
}

function getPopX(element_left){
    var calandor_width = 144;
    var frame_width = document.body.scrollWidth;
    var frame_scroll_left = document.body.scrollLeft;
    var frame_scroll_width = document.body.clientWidth;
    if(frame_scroll_left == "NaN")
        frame_scroll_left = 0;
    var element_distance_to_frame_left = element_left - frame_scroll_left;
    var element_distance_to_frame_right = frame_scroll_left + frame_scroll_width - element_left;
    if(element_distance_to_frame_right > calandor_width){
       return element_left;
    }
    else if(element_distance_to_frame_left >calandor_width){
        return frame_scroll_width - calandor_width;
    }
    else{
        return element_left;
    }
}

function getPopY(element_top){
    var calandor_height = 211;
    var element_height = 24;
    var frame_height = document.body.scrollHeight;
    var frame_scroll_top = document.body.scrollTop;
    var frame_scroll_height = document.body.clientHeight;
    if(frame_scroll_top == "NaN")
        frame_scroll_top = 0;
    var element_distance_to_frame_top = element_top - frame_scroll_top;
    var element_distance_to_frame_bottom = frame_scroll_top + frame_scroll_height - element_top - element_height;
    if(element_distance_to_frame_bottom > calandor_height){
       return element_top;
    }
    else if(element_distance_to_frame_top >calandor_height + element_height){
        return element_top - calandor_height - element_height;
    }
    else if(element_distance_to_frame_top>element_distance_to_frame_bottom && element_distance_to_frame_top>180 ){
        return element_top - calandor_height - element_height;
    }
    else{
        return element_top;
    }
}*/



//====================================punblic js====================================================
/**
 * �ýű��ļ��ṩһЩ���õĺ���
 * @copyright bjlbs 2004
 * @author zhouzm
 * @date 2004-3-10

*/


/**ȥ���ַ����е����пո�
 * @param str Ҫȥ���ո���ַ���
 */
/*function replaceBlankAll(str){
    str=str.toString();
    if (str=="")
    {
        return;
    }
    var reg=/ /gi;
    return str.replace(reg, "");

}*/

/**ȥ���ַ����е����пո�
 * @param str Ҫȥ���ո���ַ���
 */
/*
function replaceBlank(str){
    str=str.toString();
    if (str=="")
    {
        return;
    }
    var reg=/(^\s*|\s*$)/g;
    return str.replace(reg, "");

}*/

/**�Ƚ��������ڴ�С,2004-12-01 > 2004-11-08�᷵��true
 * @param max ���������д������
 * @param min ����������С������
 * @return true/false max����min/maxС��min
 */
/*
function compareDate(max,min){
    var newMax = strToDate(max);
    var newMin = strToDate(min);
    if (newMax >= newMin){
        return true;
    }else{
        return false;
    }
}*/

/**���ڰ�һ������string ת����һ�� Date ���͵�ֵ
*  @param strDate Ҫת�����ַ��� ��20020303�� �� ��2002-3-3�� �� ��2002.3.3��
*  @return 8λ�ַ�������
*/
/*
function strToDate(strDate) {
    var tempDate = strDate;
    var index1 = tempDate.indexOf(".");
    if(-1 == index1)
        index1 = tempDate.indexOf("-");

    var index2 = tempDate.lastIndexOf(".");
    if(-1 == index2)
        index2 = tempDate.lastIndexOf("-");

    //��ʽ��2002-2-2,2002.2.3�Ľ���
    if ((-1 != index1) || (-1 != index2)) {
        var year = tempDate.substring(0, index1);

        var m = parseInt(tempDate.substring(index1 + 1, index2),10);
        var month = "" + m;
        if(m < 10)
            month = "0" + m;

        var d = parseInt(tempDate.substring(index2 + 1, tempDate.length),10);
        var day = "" + d;
        if(d < 10)
            day = "0" + d;

        tempDate = year + month + day;
    }
    return tempDate;
}*/

/**�õ�һ���ַ����ĳ���(��Ӣ�����)
 * @param str �ַ���
 * return �ַ�������
 */
/*function getStrLength(str){
    var num = str.length;
    var arr = str.match(/[^\x00-\x80]/ig)
    if(arr!=null)num+=arr.length;
    return num
}*/


/**ͨ�����֤����õ�����������
*@param str ���֤����
*return 20000101/19990101 ����������
*/
/*
function getDateForCard(str){
     var inputStr=str.toString().replace("_","");
    var year;
    var month;
    var day;
    if (inputStr.length==18)
    {
        year=parseInt(inputStr.substring(6,10),10).toString();
        month=parseInt(inputStr.substring(10,12),10).toString();
        day=parseInt(inputStr.substring(12,14),10).toString();
    }else{
        year=parseInt(inputStr.substring(6,8),10).toString();
        year="19"+year;
        month=parseInt(inputStr.substring(8,10),10).toString();
        day=parseInt(inputStr.substring(10,12),10).toString();
    }
    if (month.length==1)
    {
        month="0"+month;
    }
    if (day.length==1)
    {
        day="0"+day;
    }

        return year+"-"+month+"-"+day;
}
*/
/**ͨ�����֤����õ��Ա�
*@param str ���֤����
*return 1/2 ��/Ů
*/
/*
function getSexForCard(str){
    var inputStr=str.toString();
    var sex;
    if (inputStr.length==18)
    {
        sex=inputStr.charAt(16);
        if (sex%2==0)
        {
            return 2;
        }else{
            return 1;
        }
    }else{
        sex=inputStr.charAt(14);
        if (sex%2==0)
        {
            return 2;
        }else{
            return 1;
        }
    }

}*/

/**
 *�Ƚ�ǰ�Ĵ�С�����maxMoney > minMoney����true�����򷵻�false��
 * reurn true/false maxMoney > minMoney / maxMoney < minMoney
 */
 /*
function compareMoney(maxMoney,minMoney){
  var max = 0;
  var min = 0;
  maxMoney = replaceBlank(maxMoney);
  minMoney = replaceBlank(minMoney);
  if(null != maxMoney && "" != maxMoney){
     max = parseInt(maxMoney.replace("��","").replace(".",""));
  }

  if(null != minMoney && "" != minMoney){
     min = parseInt(minMoney.replace("��","").replace(".",""));
  }
  if(max >= min){
    return true;
  }else{
    return false;
  }
}*/
/**
 * ��ѡ�е������ߵĶ�ѡoption���Ƶ��ұߵĶ�ѡoption��
* @param form ��ѡoption�����ڵ�
* @param leftOption ��ߵĶ�ѡoption��
* @param rightOption �ұߵĶ�ѡoption��
* @param �Ƿ�ȫѡ
 */
/*function moveRight(form,leftOption,rightOption,isAll) {
 //alert(isAll);
 var leftSelect  = document.all(form).all(leftOption);
 var rightSelect = document.all(form).all(rightOption);
 move(leftSelect,rightSelect,isAll);
}*/
/**
 * ��ѡ�е�����ұߵĶ�ѡoption���Ƶ���ߵĶ�ѡoption��
* @param form ��ѡoption�����ڵ�
* @param leftOption ��ߵĶ�ѡoption��
* @param rightOption �ұߵĶ�ѡoption��
* @param �Ƿ�ȫѡ
 */
/*function moveLeft(form,leftOption,rightOption,isAll) {
 var leftSelect  = document.all(form).all(leftOption);
 var rightSelect = document.all(form).all(rightOption);
 move(rightSelect,leftSelect,isAll);
}*/
/**
  * �����ݴ�fromSelect��ѡoption���е����ݣ��ƶ���toSelect��ѡoption����
  * @param fromSelect �ṩ���ݵ�select
  * @param toSelect   �������ݵ�select
  * @param isAll      �Ƿ�ȫ���ƶ���Ĭ��Ϊ�ƶ�ѡ�����ݣ�true���ƶ���������
  * @return void
  */
/*function move(fromSelect,toSelect,isAll)  {
 //alert(isAll);
 fromOptions = fromSelect.options;
 //alert("optionsLength="+fromOptions.length);
 var toSelectLength = 0;
 if(toSelect.options) {
    toSelectLength = toSelect.options.length;
 }

if(fromOptions.length){
 if(isAll) {
   for(i=0;i<fromOptions.length;) {
       //alert(fromOptions.length+"="+fromOptions[i].value+"=["+i+"]="+fromOptions[i].text);
       var newOption = new Option(fromOptions[i].text,fromOptions[i].value,toSelectLength++);
       toSelect.add(newOption);
       fromSelect.remove(fromOptions[i].index);
   }
 } else {
   for(i=0;i<fromOptions.length;i++) {
      if(fromOptions[i].selected) {
          //alert(fromOptions.length+"="+fromOptions[i].value+"=["+i+"]="+fromOptions[i].text);
          var newOption =new Option(fromOptions[i].text,fromOptions[i].value,++toSelectLength);
          toSelect.add(newOption);
          fromSelect.remove(fromOptions[i].index);
          i = 0;
      }
   }
 }
}
}*/
/**
 * �õ�ѡ�еļ�¼
 */
 /*
function getSelectedData(form,selectedOption) {
  var selected = document.all(form).all(selectedOption);
  var resultList = "";
  if(selected.length){
   for(i = 0;i < selected.length; i++) {
          resultList += selected[i].value + ";";
   }
  }
  return resultList;
}*/

/**
 * ����¼�����money��ȱʡ����
 * �����㷨���Լ���ҳ���жԴ˷���ʵ��
 */
/*function computeForBatchInput(objID){

}*/

/**
 * �������֤�Ż�ȡ������Ϣ��ȱʡ����
 * �����㷨���Լ���ҳ���жԴ˷���ʵ��
 */
/*function getInfoByCard(objID){

}*/

/**
 * ���㿪ʼ���º���ֹ����֮��
 */
/*function computeYearMonth(objID){

}*/
/**
 * �رմ���
 */
 /*
function closeWindow(formName){
   if(confirm("ȷ��Ҫ�رմ˴�����")){
    var XMLHTTP = new ActiveXObject("Microsoft.XMLHTTP");
    XMLHTTP.open("POST", "/" + lemis.WEB_APP_NAME + "/cleanSessionAction.do?name=" + formName, false);
    XMLHTTP.send("");
    location.href = "/" + lemis.WEB_APP_NAME + "/Main.htm";
   }
}
*/
/*
�л�tabpages��ǩ�ĺ���
add by wuhao
*/
/*
function changeTabs(n,src,showMsg){
 for(i=0;i<tabpages.cells.length;i++) {
    //show the waiting tips window
    if(showMsg == "true"){
      document.all.PendingMessage.style.display="";
    }
    //setTimeout('document.all.PendingMessage.style.display="none"',5000);

    //change the tab's style
    tabpages.cells[i].className="tabUnSelected";
    tabpages.cells[n].className="tabSelected";
    if(src != null){
      if(src.toLowerCase().indexOf("javascript:")==0){
        document.all.TabIframe.src = src;
      }else{
        document.all.TabIframe.src = "/"+lemis.WEB_APP_NAME+src;
      }
    }
  }
}
*/
/*
when no data found,this function will display the addsrc
iframe window
*/
/*
function addSrc(){
  if(document.all.addSrc.style.display == 'none'){
     document.all.addSrc.style.display = '';
  }else{
     document.all.addSrc.style.display = 'none';
  }
}*/
/**
 * ����/��ʾtable
 */
/* 
function SH_table(tableId){
var table_obj=document.getElementById(tableId);
if(table_obj.style.display=="none"){
	table_obj.style.display="";
}else{
	table_obj.style.display="none";
}
}

function SHS_table(tableId1,tableId2){
 var table_obj1=document.getElementById(tableId1);
 var table_obj2=document.getElementById(tableId2);
 table_obj1.style.display="none";
 table_obj2.style.display="";
}

function getQueryParameter(querystring,key){
  if(querystring.indexOf("?")>=0){
    querystring = querystring.split("?")[1];
  }
  var aQuery = querystring.split("&");
  for(var i=0; i<aQuery.length; i++){
    if(aQuery[i].indexOf(key)>=0){
      return aQuery[i].substr(aQuery[i].indexOf("=")+1);
    }
  }
  return "";
}

//����������¸�ʽ����ʱ������ʾ��Ϣ
function checkYMObj(obj,msg){
    alert ("ϵͳ��ʾ��"+msg);
    obj.clear();
    obj.focus();
}
function checkYMDObj(obj,msg){
    alert ("ϵͳ��ʾ��"+msg);
    obj.clear();
    obj.focus();
}
function check_keyDown(){
    alert ("��ֱ��ѡ�����ڼ���!");
    return false;
}

//ȡ����--para:"document.all.tableform";
function getRowSize(obj){
  var rowid = new Array();
  rowid = getRowID(obj);
  return rowid.length;
}

//��¼��ѡ��ID--para:"document.all.tableform";
function getRowID(obj){
  var row = new Array();
  var h=0;
  var x=0;
  if(obj.length){
    for (i=0; i<obj.length; i++ ){
      if ( obj(i).type != "submit" && obj(i).type != "reset" && obj(i).type != "button"){
        if (obj(i).type =="radio" || obj(i).type =="checkbox"){
           h++;
           if (obj(i).checked){
             row[x] = h;
             x++;
           }
        }
      }
    }
  }
  return row;
}
function monitorclipboard(act, obj){
    with(document.getElementById(obj)){
        if(act=="copy"){
            clipboardData.setData("Text", name + ":" + innerHTML);
        }
        else{
            var data = clipboardData.getData("Text");
            if(data.indexOf(name)==0){
                innerHTML = data.substr(name.length + 1);
            }
        }
    }
}
//���غ��ֻ��ַ��ĳ���
 function getStringLength( strVar )
 {
    var num = strVar.length ;
    var arr = strVar.match(/[^\x00-\x80]/ig);

    if( arr!=null)
       num+=arr.length ;

    return num ;
}
function countChineseCodeNum(str,startIndex,len){
    if(len>str.length) len=str.length;
    var i=len;
    for(; i >0; i--){
        var strLen=getStringLength(str.substring(0,i));
        if(strLen==len) break;
    }
    var num=len-i;
    return num;
}
function checkLength(obj,len){
    var str=obj.value;
    var strLen=getStringLength(str);
    if (strLen>len){
        var chineseNum=countChineseCodeNum(str,0,len-1);
        if(getStringLength(str.charAt(len-chineseNum-1))==2){
        alert(str.charAt(len-chineseNum-1));
        alert("");
        chineseNum+=1;
        }
        obj.value=str.substring(0,len-chineseNum);
        alert("���ȳ�����󳤶ȣ�");
        return false;
    }
}
function autoFitFrameHeight(f){
    parent.document.getElementById[f].height =
                    document.body.offsetHeight + document.body.borderTopWidth +
                    document.body.borderBottomWidth + document.body.marginTop +
                    document.body.marginBottom;
}
function mselectall(selectobj){
    for(var i=0; i<selectobj.options.length; i++){
        selectobj.options[i].selected = true;
    }
}*/

var controlID="";
var objTab;
var B2T = 100;
var browser = new Browser();
var P6o2$ = null;//�����tabҳ
var version = "2.0.0323";
var EW70c = 20;
var img_base = "../../images/tab/"
var __aAllTabComponents;
var manager =new TabManager();







