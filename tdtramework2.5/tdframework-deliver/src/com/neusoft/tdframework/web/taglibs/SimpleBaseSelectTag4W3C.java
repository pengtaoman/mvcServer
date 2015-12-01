package com.neusoft.tdframework.web.taglibs;


import java.util.Iterator;
import java.util.List;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.tagext.TagSupport;

import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.common.data.BaseDictItem;
import com.neusoft.tdframework.log.SysLog;

/**brief description
 * <p>Date       : 2006-04-13</p>
 * <p>Module     : </p>
 * <p>Description: </p>
 * <p>Remark     : </p>
 * @author zhaof@neusoft.com
 * @version 
 * <p>------------------------------------------------------------</p>
 * <p> 修改历史</p>
 * <p>  序号      日期      修改人         修改原因</p>
 * <p>   1                                       </p>
 */
public class SimpleBaseSelectTag4W3C extends TagSupport {

    /**
     * Comment for <code>serialVersionUID</code>
     */
    private static final long serialVersionUID = 1L;
    /**
     * 
     */
    public SimpleBaseSelectTag4W3C() {
        super();
    }

        private String tagName= null;//下拉列表的名字 
        private String selectFlag=null;//是否有”请选择“一项
        private List selectColl=null;//选择字段
        private String selectvalue=null;//显示项     
        private String selectType= null;
        private String fixlength; //固定长度
        private String onclick; //onclick的响应方法
        private String onchange; //onchange的响应方法
        private String onkeydown;//onkeydown的响应方法
        private String disabled; //不能改变
        private String onfocus;//失去焦点
        private String extraInfo;//附加信息
        private String onblur;
        private String isAcceptServiceKind; //是否受理缴费的服务类型
        private String title;
        private String myOptionValue;
        
        public int doEndTag() throws JspException {
        
            try
            {
                pageContext.getOut().write(getSelectXML());
            }
            catch(Exception e)
            {
                e.printStackTrace();                
            }
            return super.doEndTag();
        }
    
        public int doStartTag() throws JspException {
        
            return super.doStartTag(); 
        }       
        private synchronized String getSelectXML()
        {
            StringBuffer buf = new StringBuffer();
            buf.append("<SELECT name=\"" + tagName + "\"");
            if(fixlength != null && !fixlength.trim().equals("")){
                buf.append(" style='width:"+fixlength+"'");
            }
            if(title != null && !title.trim().equals("")){
            	buf.append(" title=\""+title+"\"");
            }
            if(onclick != null && !onclick.trim().equals("")){
                buf.append(" onclick=\""+onclick+"\"");
            }
            if(onfocus != null && !onfocus.trim().equals("")){
                buf.append(" onfocus=\""+onfocus+"\"");
            }
            if(onblur != null && !onblur.trim().equals("")){
                buf.append(" onblur=\""+onblur+"\"");
            }
            if(onchange != null && !onchange.trim().equals("")){
                buf.append(" onchange=\""+onchange+"\"");
            }
            if(onkeydown != null && !onkeydown.trim().equals("")){
                buf.append(" onkeydown=\""+onkeydown+"\"");
            }
            if(disabled != null && !disabled.trim().equals("")){
                buf.append(" disabled=\""+disabled+"\"");
            }
            buf.append("> \n");
            try{
                if(selectFlag.equals("true")){
                    buf.append("<option value=''>\n<caption>请选择</caption>\n</option>");
                }else if(myOptionValue!= null && !myOptionValue.trim().equals("")){
                    buf.append("<option value=''>\n<caption>"+myOptionValue+"</caption>\n</option>");
                }
                if(isAcceptServiceKind!= null && isAcceptServiceKind.equals("true"))
                {
                    buf.append("<option value='15'>\n<caption>CDMA1X业务</caption>\n</option>");                
                }
                if(selectColl == null )
                {
                     buf.append("<option><value></value><caption></caption></option>");
                }else{   
                	Iterator it = selectColl.iterator();
                    while(it.hasNext())
                    {   
                    	BaseDictItem vo =(BaseDictItem)it.next();
                        if(selectvalue!= null &&selectvalue.length()!=0&& selectvalue.equals(vo.getId()))
                        {
                        	if(extraInfo != null && !extraInfo.trim().equals("")){
                        		buf.append(" <option value=\""+vo.getId()+"\" ");
                            	buf.append(" extraInfo=\""+vo.getPreserve_1()+"\"");
                            	buf.append(" selected> \n");
                            }else{
                            	buf.append(" <option value=\""+vo.getId()+"\" selected> \n");
                            }
                            buf.append("     <caption>" + vo.getName() + "</caption> \n");
                            buf.append(" </option> \n");
                            continue;
                        }
                        if(extraInfo != null && !extraInfo.trim().equals("")){
                    		buf.append(" <option value=\""+vo.getId()+"\" ");
                        	buf.append(" extraInfo=\""+vo.getPreserve_1()+"\"");
                        	buf.append(" > \n");
                        }else{
                        	buf.append("<option value=");
                            buf.append(vo.getId()); 
                            buf.append(">\n");
                        }
                        buf.append("<caption>");                    
                        buf.append(vo.getName());
                        buf.append("</caption>\n");
                        buf.append("</option>\n");
                    }
                    buf.append("</SELECT>\n");
                }
            }catch(Exception e){
               SysLog.writeLogs("point",GlobalParameters.ERROR, "getItemInfoXml" + e.getMessage());
            }
            
            return buf.toString();
        }
        
        /**
         * @return Returns the selectColl.
         */
        public List getSelectColl()
        {
            return selectColl;
        }
        /**
         * @param selectColl The selectColl to set.
         */
        public void setSelectColl(List selectColl)
        {
            this.selectColl = selectColl;
        }
        /**
         * @return Returns the selectFlag.
         */
        public String getSelectFlag()
        {
            return selectFlag;
        }
        /**
         * @param selectFlag The selectFlag to set.
         */
        public void setSelectFlag(String selectFlag)
        {
            this.selectFlag = selectFlag;
        }
        /**
         * @return Returns the selectvalue.
         */
        public String getSelectvalue()
        {
            return selectvalue;
        }
        /**
         * @param selectvalue The selectvalue to set.
         */
        public void setSelectvalue(String selectvalue)
        {
            this.selectvalue = selectvalue;
        }
        /**
         * @return Returns the tagName.
         */
        public String getTagName()
        {
            return tagName;
        }
        /**
         * @param tagName The tagName to set.
         */
        public void setTagName(String tagName)
        {
            this.tagName = tagName;
        }
        /**
         * @return Returns the selectType.
         */
        public String getSelectType() {
            return selectType;
        }
        /**
         * @param selectType The selectType to set.
         */
        public void setSelectType(String selectType) {
            this.selectType = selectType;
        }

        public String getFixlength()
        {
            return fixlength;
        }

        public void setFixlength(String fixlength)
        {
            this.fixlength = fixlength;
        }

        public String getOnchange()
        {
            return onchange;
        }

        public void setOnchange(String onchange)
        {
            this.onchange = onchange;
        }
        
        public String getExtraInfo()
        {
            return extraInfo;
        }

        public void setExtraInfo(String extraInfo)
        {
            this.extraInfo = extraInfo;
        }
        
        public String getOnfocus()
        {
            return onfocus;
        }

        public void setOnfocus(String onfocus)
        {
            this.onfocus = onfocus;
        }
        
        public String getOnblur()
        {
            return onblur;
        }

        public void setOnblur(String onblur)
        {
            this.onblur = onblur;
        }

        public String getOnclick()
        {
            return onclick;
        }

        public void setOnclick(String onclick)
        {
            this.onclick = onclick;
        }

        public String getDisabled()
        {
            return disabled;
        }

        public void setDisabled(String disabled)
        {
            this.disabled = disabled;
        }

        public String getIsAcceptServiceKind()
        {
            return isAcceptServiceKind;
        }

        public void setIsAcceptServiceKind(String isAcceptServiceKind)
        {
            this.isAcceptServiceKind = isAcceptServiceKind;
        }

		public String getOnkeydown() {
			return onkeydown;
		}

		public void setOnkeydown(String onkeydown) {
			this.onkeydown = onkeydown;
		}

		public String getTitle() {
			return title;
		}

		public void setTitle(String title) {
			this.title = title;
		}

		public String getMyOptionValue() {
			return myOptionValue;
		}

		public void setMyOptionValue(String myOptionValue) {
			this.myOptionValue = myOptionValue;
		}    
}
