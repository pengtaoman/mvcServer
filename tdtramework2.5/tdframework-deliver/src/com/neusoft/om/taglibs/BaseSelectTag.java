/*
 * <p>Title:       简单的标题</p>
 * <p>Description: 稍详细的说明</p>
 * <p>Copyright:   Copyright (c) 2004</p>
 * <p>Company:     东软软件股份有限公司</p>
 */
package com.neusoft.om.taglibs;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.tagext.TagSupport;

import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.common.data.ParamObjectCollection;
import com.neusoft.tdframework.common.data.ParamObject;
import com.neusoft.tdframework.common.util.NullProcessUtil;
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
public class BaseSelectTag extends TagSupport {

    /**
     * Comment for <code>serialVersionUID</code>
     */
    private static final long serialVersionUID = 1L;
    /**
     * 
     */
    public BaseSelectTag() {
        super();
    }

        private String tagName= null;//下拉列表的名字 
        private String selectFlag=null;//是否有”请选择“一项
        private ParamObjectCollection selectColl=null;//选择字段
        private String selectvalue=null;//显示项     
        private String selectType= null;
        private String fixlength; //固定长度
        private String onclick; //onclick的响应方法
        private String onchange; //onchange的响应方法
        private String disabled; //不能改变
        private String isAcceptServiceKind; //是否受理缴费的服务类型
        
        
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
            buf.append("<SELECT name='" + tagName + "'");
            if(fixlength != null && !fixlength.trim().equals("")){
                buf.append(" style='width:"+fixlength+"'");
            }
            if(onclick != null && !onclick.trim().equals("")){
                buf.append(" onclick='"+onclick+"'");
            }
            if(onchange != null && !onchange.trim().equals("")){
                buf.append(" onchange='"+onchange+"'");
            }
            if(disabled != null && !disabled.trim().equals("")){
                buf.append(" disabled='"+disabled+"'");
            }
            buf.append("> \n");
            try{
                if(selectFlag.equals("true")){
                    buf.append("<option value=''>\n<caption>请选择</caption>\n</option>");
                }
                if(isAcceptServiceKind!= null && isAcceptServiceKind.equals("true"))
                {
                    buf.append("<option value='15'>\n<caption>CDMA1X业务</caption>\n</option>");                
                }
                if(selectColl == null )
                {
                     buf.append("<option><value></value><caption></caption></option>");
                }else{               
                    for(int i=0; i<selectColl.getRowCount(); i++)
                    {   
                        ParamObject vo =(ParamObject)selectColl.getElement(i);
                        if(selectvalue!= null &&selectvalue.length()!=0&& selectvalue.equals(vo.getId()))
                        {
                            buf.append(" <option value='"+vo.getId()+"' selected> \n");
                            buf.append("     <caption>" + vo.getName() + "</caption> \n");
                            buf.append(" </option> \n");
                            continue;
                        }
                        buf.append("<option value=");
                        buf.append(vo.getId()); 
                        buf.append(">\n");
                        buf.append("<caption>");                    
                        buf.append(vo.getName());
                        buf.append("</caption>\n");
                        buf.append("</option>\n");
                    }
                    buf.append("</SELECT> \n");
                }
            }catch(Exception e){
               SysLog.writeLogs("point",GlobalParameters.ERROR, "getItemInfoXml" + e.getMessage());
            }
            
            return buf.toString();
        }
        
        /**
         * @return Returns the selectColl.
         */
        public ParamObjectCollection getSelectColl()
        {
            return selectColl;
        }
        /**
         * @param selectColl The selectColl to set.
         */
        public void setSelectColl(ParamObjectCollection selectColl)
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




        
}

