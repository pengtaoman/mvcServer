package com.neusoft.om.taglibs;

//import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.servlet.jsp.JspException;
import javax.servlet.jsp.tagext.TagSupport;

import com.neusoft.om.omutil.DataParamUtil;
import com.neusoft.tdframework.authorization.AuthorizeVO;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.common.ParamObject;
import com.neusoft.common.ParamObjectCollection;
import com.neusoft.tdframework.log.SysLog;

public class DataParamSelectTag extends TagSupport {
	private static final long serialVersionUID = 1L;
	
	private String tagName;      //�����б������ 
	private String firstValue;   //�Զ�����ʾ��Ϣ
	private String selectValue;  //Ĭ��ѡ�нڵ���Ϣ
	private String disabled;     //���ܸı�
	private String styleClass;   //��ʾ��Ϣ
    private String extraInfo;    //������Ϣ
    private String title;        //��ʾ��Ϣ  
    private String longOption;   //�Ƿ���ʾ������ID�ֶ�
    
    private String specialId;    //����������������Ϣ
    private String specialValue; //����������������Ϣ
    
    private String onclick;      //onclick����Ӧ����
    private String onchange;     //onchange����Ӧ����
    private String onkeydown;    //onkeydown����Ӧ����
    private String onfocus;      //�õ�����
    private String onblur;		 //ʧȥ����
    
    private ParamObjectCollection dataColl;  //ԭʼ������Ϣ
    private String paramTable;   //�����������ݿ����Ϣ
    //private String needFiltrate;   //�����������ݿ����Ϣ
	/**
     * 
     */
//   public String getNeedFiltrate() {
//		return needFiltrate;
//	}
//
//	public void setNeedFiltrate(String needFiltrate) {
//		this.needFiltrate = needFiltrate;
//	}
	
    public DataParamSelectTag() {
        super();
    }
	
	public String getDisabled() {
		return disabled;
	}
	public void setDisabled(String disabled) {
		this.disabled = disabled;
	}
	
	public String getOnchange() {
		return onchange;
	}
	public void setOnchange(String onchange) {
		this.onchange = onchange;
	}
	
	public String getOnclick() {
		return onclick;
	}
	public void setOnclick(String onclick) {
		this.onclick = onclick;
	}
	
	public String getSelectValue() {
		return selectValue;
	}
	public void setSelectValue(String selectValue) {
		this.selectValue = selectValue;
	}
	
	public String getTagName() {
		return tagName;
	}
	public void setTagName(String tagName) {
		this.tagName = tagName;
	}
	
	public int doEndTag() throws JspException {        
        try{
            pageContext.getOut().write(getSelectInfo());
        }
        catch(Exception e){
            e.printStackTrace();                
        }
        
        return super.doEndTag();
    }

    public int doStartTag() throws JspException {  
    	
        return super.doStartTag(); 
        
    }  
    /**
     * ͬ�����������򷽷�
     */
    private synchronized String getSelectInfo(){
    	StringBuffer buf = new StringBuffer();
    	
    	//HttpServletRequest request = (HttpServletRequest) pageContext.getRequest();
    	HttpSession session = pageContext.getSession();
    	AuthorizeVO authorizeVO = (AuthorizeVO)session.getAttribute(GlobalParameters.SESSION_INFO);
    	String employeeId = authorizeVO.getEmployeeId();
    	
    	//String table_names[] = this.paramTable.split(",");
    	ParamObjectCollection selectColl = null;
    	
    	try{
    		if(paramTable!=null && !paramTable.trim().equals("")){
    			//���ɲ������˺�Ľ������Ϣ
    			selectColl = DataParamUtil.getInstance().doParamFiltrate(dataColl,employeeId,this.paramTable); 
    		}else{
    			this.paramTable = dataColl.getParamTableName();
    			if(paramTable!=null && !paramTable.trim().equals("")){
    				selectColl = DataParamUtil.getInstance().doParamFiltrate(dataColl,employeeId,this.paramTable);
    			}else{
    				selectColl = new ParamObjectCollection();
    			}
    		} 		 		
    	}catch(Exception e){
           SysLog.writeLogs("DataParamSelectTag",GlobalParameters.ERROR, "error_message:" + e.getMessage());
        }
    	
        buf.append("<SELECT name='" + tagName + "'");
        if(styleClass!=null && !styleClass.trim().equals("")){
            buf.append(" style=\""+styleClass+"\"");
        }
        if(title!=null && !title.trim().equals("")){
        	buf.append(" title=\""+title+"\"");
        }
        if(onclick!=null && !onclick.trim().equals("")){
            buf.append(" onclick=\""+onclick+"\"");
        }
        if(onfocus!=null && !onfocus.trim().equals("")){
            buf.append(" onfocus=\""+onfocus+"\"");
        }
        if(onblur != null && !onblur.trim().equals("")){
            buf.append(" onblur=\""+onblur+"\"");
        }
        if(onchange!=null && !onchange.trim().equals("")){
            buf.append(" onchange=\""+onchange+"\"");
        }
        if(onkeydown!=null && !onkeydown.trim().equals("")){
            buf.append(" onkeydown=\""+onkeydown+"\"");
        }
        if(disabled!=null && !disabled.trim().equals("")){
            buf.append(" disabled='"+disabled+"'");
        }
        buf.append("> \n");
        try{
        	//��ʼ���������һ������
            if(firstValue.equals("true")){
            	buf.append("<option value=''>\n<caption>��ѡ��</caption>\n</option>");
            }else if(!firstValue.trim().equals("") && !firstValue.equals("false")){
            	buf.append("<option value=''>\n<caption>"+this.firstValue+"</caption>\n</option>");
            }
            //д���Զ�������������(�����ݿ�����)
            if(specialId!= null && specialValue!=null){
                buf.append("<option value='").append(this.specialId).append("'>\n");
                buf.append("<caption>").append(this.specialValue).append("</caption>\n</option>");                
            }
            //���˺���������ʾ,Ĭ����ʾ
            if(selectColl.getRowCount() == 0){
                 buf.append("<option><value></value><caption>��Ȩ�鿴</caption></option>");
            }else{               
                for(int i=0; i<selectColl.getRowCount(); i++)
                {   
                	ParamObject vo =(ParamObject)selectColl.getElement(i);
                    if(selectValue!= null && selectValue.length()!=0 && selectValue.equals(vo.getIds())){
                    	if(extraInfo != null && !extraInfo.trim().equals("")){
                    		buf.append(" <option value=\""+vo.getIds()+"\" ");
                        	buf.append(" extraInfo=\""+vo.getPreserve_1()+"\"");
                        	buf.append(" selected> \n");
                        }else{
                        	buf.append(" <option value=\""+vo.getIds()+"\" selected> \n");
                        }
                    	if(longOption!=null && longOption.trim().equals("true")){
                    		buf.append("     <caption>"+vo.getIds()+"|"+vo.getName()+"</caption> \n");
                    	}else{
                    		buf.append("     <caption>"+vo.getName()+"</caption> \n");
                    	}
                        buf.append(" </option> \n");
                        continue;
                    }
                    
                    if(extraInfo != null && !extraInfo.trim().equals("")){
                		buf.append(" <option value=\""+vo.getIds()+"\" ");
                    	buf.append(" extraInfo=\""+vo.getPreserve_1()+"\"");
                    	buf.append("> \n");
                    }else{
                    	buf.append("<option value=");
                        buf.append(vo.getIds()); 
                        buf.append(">\n");
                    }
                    
                    buf.append("<caption>");
                    if(longOption!=null && longOption.trim().equals("true")){
                		buf.append(vo.getIds()+"|"+vo.getName());
                	}else{
                		buf.append(vo.getName());
                	}
                    buf.append("</caption>\n");
                    buf.append("</option>\n");
                }
            }
            buf.append("</SELECT> \n");
        }catch(Exception e){
           SysLog.writeLogs("DataParamSelectTag",GlobalParameters.ERROR, "error_message:" + e.getMessage());
        }
        
        return buf.toString();
    }

	public String getSpecialId() {
		return specialId;
	}

	public void setSpecialId(String specialId) {
		this.specialId = specialId;
	}

	public String getSpecialValue() {
		return specialValue;
	}

	public void setSpecialValue(String specialValue) {
		this.specialValue = specialValue;
	}

	public String getLongOption() {
		return longOption;
	}

	public void setLongOption(String longOption) {
		this.longOption = longOption;
	}

	public String getOnfocus() {
		return onfocus;
	}

	public void setOnfocus(String onfocus) {
		this.onfocus = onfocus;
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

	public String getOnblur() {
		return onblur;
	}

	public void setOnblur(String onblur) {
		this.onblur = onblur;
	}

	public String getExtraInfo() {
		return extraInfo;
	}

	public void setExtraInfo(String extraInfo) {
		this.extraInfo = extraInfo;
	}

	public String getStyleClass() {
		return styleClass;
	}

	public void setStyleClass(String styleClass) {
		this.styleClass = styleClass;
	}

	public ParamObjectCollection getDataColl() {
		return dataColl;
	}

	public void setDataColl(ParamObjectCollection dataColl) {
		this.dataColl = dataColl;
	}

	public String getFirstValue() {
		return firstValue;
	}

	public void setFirstValue(String firstValue) {
		this.firstValue = firstValue;
	}

	public String getParamTable() {
		return paramTable;
	}

	public void setParamTable(String paramTable) {
		this.paramTable = paramTable;
	}

}
