package com.neusoft.om.taglibs;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.PageContext;
import javax.servlet.jsp.tagext.TagSupport;

import com.neusoft.om.dao.duty.DutyColl;
import com.neusoft.om.dao.duty.DutyVO;
import com.neusoft.om.dao.organkind.OrganKindColl;
import com.neusoft.tdframework.log.*;
import com.neusoft.tdframework.common.GlobalParameters;

/**
 * 
 * @author renh
 *
 * To change the template for this generated type comment go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
public class OrganKindDutyTag extends TagSupport {

	private String queryFlag;
	private String organKindSelected;
	private String dutySelected=null;
	private String listName= null;
	private OrganKindColl organKindColl;
	private DutyColl dutyColl;
	private PageContext pageContext;
	
	public OrganKindDutyTag()
		{
			queryFlag = null;
			organKindSelected=null;
			dutySelected=null;
			listName= null;
			organKindColl = new OrganKindColl();
			dutyColl = new DutyColl();   	
		}
	
	public int doEndTag() throws JspException {
		try
		{
			if(queryFlag.equals("0"))
			{
				pageContext.getOut().write(getOrganKindXml()); //组织机构类型
			}
			else							//组织机构类型和职务的关联
			{
				
				pageContext.getOut().write(getOrganKindXml()+getOrganKindAndDuty());
			}
		}
		catch(Exception e)
		{
			e.printStackTrace();
			//SysLog.writeLogs("om",GlobalParameters.ERROR,"method--doEndTag()-1:"+e.getMessage());
		}
		return super.doEndTag();
	}
	
	public int doStartTag() throws JspException {
		
		return super.doStartTag();
	}
	
	private String getDutyInfo(){
		if(dutyColl==null)
		return null;
		StringBuffer buf = new StringBuffer();
		for(int i=0; i<dutyColl.getRowCount(); i++)
		{
			DutyVO dutyVO = (DutyVO)dutyColl.getElement(i);
			buf.append(dutyVO.getOrganKind()+":");
			buf.append(dutyVO.getDutyId()+":");
			buf.append(dutyVO.getDutyName());
			buf.append("`");
		}
		return buf.toString();
	}
	
	private String getOrganKindXml(){
		StringBuffer buf = new StringBuffer();
		buf.append("<"+listName+">\n");
		
		if( organKindColl == null )
		{
			buf.append("</"+listName+">\n");
			return buf.toString();
		}
		for(int i=0; i<organKindColl.getRowCount(); i++)
		{
			buf.append("<option>\n");
			buf.append("<value>");
			buf.append(organKindColl.getOrganKind(i).getOrganKind());
			buf.append("</value>\n");
			buf.append("<caption>");
			buf.append(organKindColl.getOrganKind(i).getKindDesc());
			buf.append("</caption>\n");
			buf.append("</option>\n");
		}

		if( organKindSelected!=null && organKindSelected.length()!=0)
			buf.append("<selected>"+organKindSelected+"</selected>\n");
		if( dutySelected !=null && dutySelected.length()!=0)
			buf.append("<selectedQ>"+dutySelected+"</selectedQ>\n");		
		buf.append("</"+listName+">\n");
		return buf.toString();
	}
	private String getOrganKindAndDuty()
	{
	
		StringBuffer buf = new StringBuffer("");
		String kindStr = getDutyInfo();

		if( kindStr == null )return buf.toString();
		buf.append("<OrganKindDutyStr>");
		buf.append(kindStr);
		buf.append("</OrganKindDutyStr>\n");
		return buf.toString();
	}	
	
	/**
	 * @return
	 */
	public String getOrganKindSelected() {
		return organKindSelected;
	}

	/**
	 * @return
	 */
	public String getListName() {
		return listName;
	}

	/**
	 * @return
	 */
	public String getQueryFlag() {
		return queryFlag;
	}

	/**
	 * @return
	 */
	public String getDutySelected() {
		return dutySelected;
	}
	/**
	 * 
	 * @return
	 */
	public OrganKindColl getOrganKindColl(){
		return organKindColl;
	}
	/**
	 * 
	 * @return
	 */
	public DutyColl getDutyColl() {
		return dutyColl;
	}
	/**
	 * @param string
	 */
	public void setOrganKindSelected(String string) {
		organKindSelected = string;
	}
	/**
	 * @param string
	 */
	public void setListName(String string) {
		listName = string;
	}

	/**
	 * @param string
	 */
	public void setQueryFlag(String string) {
		queryFlag = string;
	}

	/**
	 * @param string
	 */
	public void setDutySelected(String string) {
		dutySelected = string;
	}
	/**
	 * 
	 * @param organKindColl
	 */
	public void setOrganKindColl(OrganKindColl organKindColl){
		this.organKindColl = organKindColl;
	}
	/**
	 * 
	 * @param dutyColl
	 */
	public void setDutyColl(DutyColl dutyColl){
		this.dutyColl = dutyColl;
	}
	/**
	 * 
	 */
	public void setPageContext(PageContext pagecontext)
		{
		   pageContext = pagecontext;
		}

}
