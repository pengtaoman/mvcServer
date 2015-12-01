package com.neusoft.tdframework.web.taglibs;

import java.io.IOException;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.tagext.TagSupport;

import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.common.data.ParamObject;
import com.neusoft.tdframework.common.data.ParamObjectCollection;
import com.neusoft.tdframework.common.util.NullProcessUtil;
import com.neusoft.tdframework.common.util.StringUtil;
import com.neusoft.tdframework.common.util.XMLProperties;
import com.neusoft.tdframework.log.SysLog;

/**
 * <p>Date       : 2005-1-20</p>
 * <p>Module     : 框架公用程序</p>
 * <p>Description: 生成两个下拉菜单关联显示所需的xml格式的数据</p>
 * <p>Remark     : </p>
 * @author liyj
 * @version 
 * <p>------------------------------------------------------------</p>
 * <p> 修改历史</p>
 * <p>  序号		日期		修改人			修改原因</p>
 * <p>   1                                       </p>
 */
public class SelectRelateTaglib extends TagSupport {
	//标签名字
	public String tagName = "";  
	//字典表数据集合对象，需要把关联的字典表的id值存放到coll对象的preserve_1属性上
	public ParamObjectCollection coll = null;
	//需要缩进的tab数目  
	public int tabs;  

	/**
	 * description: 
	 * @param collection
	 */
	public void setColl(ParamObjectCollection collection) {
		coll = collection;
	}

	/**
	 * description: 
	 * @return
	 */
	public ParamObjectCollection getColl() {
		return coll;
	}	

	/**
	 * description: 
	 * @param string
	 */
	public void setTagName(String string) {
		tagName = string;
	}

	/**
	 * description: 
	 * @return
	 */
	public String getTagName() {
		return tagName;
	}

	/**
	 * description: 
	 * @param i
	 */
	public void setTabs(int i) {
		tabs = i;
	}

	/**
	 * description: 
	 * @return
	 */
	public int getTabs() {
		return tabs;
	}
	
	public int doEndTag() throws JspException{
		if(coll != null && coll.getRowCount() > 0){
			StringBuffer buf = new StringBuffer();
			String slip1 = ":";
			String slip2 = "`";
			
			//构造推进的tabs
			String strTab=StringUtil.tabs(this.tabs);	
			buf.append(strTab).append("<").append(tagName).append(">");
			for(int i=0; i<coll.getRowCount(); i++){
				ParamObject obj = coll.getParamObjectByIndex(i);
				
				if(obj != null){
					if((obj.getPreserve_1() != null) && ("".intern() != obj.getPreserve_1().intern())){
						buf.append(obj.getPreserve_1());
						buf.append(slip1);
					}
					buf.append(obj.getId());
					buf.append(slip1);
					buf.append(XMLProperties.prepareXml(NullProcessUtil.nvlToString(obj.getName(),"")));
					buf.append(slip2);
				}
			}
			buf.append("</").append(tagName).append(">");
			
			try {
				pageContext.getOut().write(buf.toString());
			} catch (IOException e) {
				SysLog.writeLogs("tdframework",GlobalParameters.ERROR,"SelectRelateTaglib-doEndTag:"+e.getMessage());
			}
		}
		return super.doEndTag();
	}
	
	public int doStartTag() throws JspException{
		return super.doStartTag();
	}
}
