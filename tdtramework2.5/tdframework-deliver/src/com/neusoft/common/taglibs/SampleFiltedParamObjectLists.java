package com.neusoft.common.taglibs;

/**
级别参数表的下拉框. taglib
*/

import java.io.IOException;

import javax.servlet.http.HttpSession;
import javax.servlet.jsp.JspException;
import javax.servlet.jsp.PageContext;
import javax.servlet.jsp.tagext.Tag;

import com.neusoft.common.ParamObject;
import com.neusoft.common.ParamObjectCollection;
import com.neusoft.common.SysMaint;
import com.neusoft.om.omutil.DataParamUtil;
import com.neusoft.tdframework.authorization.AuthorizeVO;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.log.SysLog;

public class SampleFiltedParamObjectLists implements Tag{
	
	////必有的属性//
	private PageContext pageContext;		//页面上下文
	private Tag parent;						//父标签
	
	////传入的属性//
	private String paramId = null;
	private int ifAll = 0; 		//是否有全部项
	private String tagName;	//标签的名称
	private String styleClass;	//标签的样式
	private int tabs = 0;		//推进几个tab
	private ParamObjectCollection paramObjectCollection=null;	//数据结果集
	
	private String account=null;		// 操作员帐户
	private String onkeydown=null;
	private String onchange=null;
	private String onclick=null;
	
	private AuthorizeVO vo = null;
	
	/**
	 * 设置onkeydown方法
	 */
	public void setOnkeydown(String onkeydown) {
		this.onkeydown = onkeydown;
	}
	
	/**
	 * 获取onkeydown方法
	 */
	public String getOnkeydown() {
		return this.onkeydown;
	}
	
	/**
	 * 设置onchange方法
	 */
	public void setOnchange(String onchange) {
		this.onchange = onchange;
	}
	
	/**
	 * 获取onchange方法
	 */
	public String getOnchange() {
		return this.onchange;
	}
	
	/**
	 * 设置onchange方法
	 */
	public void setOnclick(String onclick) {
		this.onclick = onclick;
	}
	
	/**
	 * 获取onclick方法
	 */
	public String getOnclick() {
		return this.onclick;
	}
	
	/**
	设置选中的项目
	*/
	public void setParamId(String paramId){
		this.paramId = paramId;	
	}

	/**
	获取选中的项目
	*/
	public String getParamId(){
		return this.paramId;	
	}
	
	/**
	设置是否有全部的
	@param ifAll 
		<br>0: 不添加任何额外选项 </br>
		<br>1: 添加全部选项: value = all. caption = 全部 </br>
		<br>2: 添加空选项: value = -200. caption = "" </br>
	*/
	public void setIfAll(int ifAll){
		this.ifAll = ifAll;	
	}
	
	/**
	获取是否有全部项目
	*/
	public int getIfAll(){
		return this.ifAll;	
	}
	
	/**
	设置标签名称
	*/
	public void setTagName(String tagName){
		this.tagName = tagName;
	}
	
	/**
	获取标签名称
	*/
	public String getTagName(){
		return this.tagName;	
	}
	
	/**
	设置标签名称
	*/
	public void setStyleClass(String styleClass){
		this.styleClass = styleClass;
	}
	/**
	获取标签名称
	*/
	public String getStyleClass(){
		return this.styleClass;	
	}
	/**
		几个tab推进
	*/
	public void setTabs(int tabs){
		this.tabs = tabs;	
	}
	
	/**
		几个tab推进
	*/
	public int getTabs(){
		return this.tabs;	
	}
	
	/**
	设置参数列表结果集
	*/
	public void setParamObjectCollection(ParamObjectCollection paramObjectColl){
		this.paramObjectCollection = paramObjectColl;	
	}
	
	/**
	获取参数列表结果集
	*/	
	public ParamObjectCollection getParamObjectCollection(){
		return this.paramObjectCollection;	
	}
	
	/**
	构造函数
	*/
	public SampleFiltedParamObjectLists(){}
	
	/** 
	@exception JspException 
	*/
	public int doStartTag() throws JspException{
	   return 0;
	}
	
	/** 
	@exception JspException 
	*/
	public int doEndTag() throws JspException{
		StringBuffer ret = new StringBuffer("");
		
		//构造推进的tabs
		String str_tab=SysMaint.tabs(this.tabs);		
		
		ret.append(str_tab).append("	").append("<select name=\"" + tagName + "\"");
		
		if(styleClass != null && !styleClass.trim().equals("")){
            ret.append(" style=\""+styleClass+"\"");
        }
		if(onclick != null && !onclick.trim().equals("")){
            ret.append(" onclick=\""+onclick+"\"");
        }
		if(onchange != null && !onchange.trim().equals("")){
            ret.append(" onchange=\""+onchange+"\"");
        }
        if(onkeydown != null && !onkeydown.trim().equals("")){
            ret.append(" onkeydown=\""+onkeydown+"\"");
        }
        ret.append("> \n");
       
		//构造全部选中
		if(this.getIfAll() == 1){
			ret.append(str_tab).append("	").append("<option value='all'>\n");
			ret.append(str_tab).append("		").append("<caption>全部</caption>\n");
			ret.append(str_tab).append("	").append("</option>");
		}else if(this.getIfAll() == 2){
			ret.append(str_tab).append("	").append("<option value=''>\n");
			ret.append(str_tab).append("		").append("<caption></caption>\n");
			ret.append(str_tab).append("	").append("</option>");
		}else if(this.getIfAll() == 3){
			ret.append(str_tab).append("	").append("<option value=''>\n");
			ret.append(str_tab).append("		").append("<caption>请选择</caption>\n");
			ret.append(str_tab).append("	").append("</option>");
		}else if(this.getIfAll() == 4){
			ret.append(str_tab).append("	").append("<option value=''>\n");
			ret.append(str_tab).append("		").append("<caption>不区分</caption>\n");
			ret.append(str_tab).append("	").append("</option>");
		}
		
		//构造数据
		if(this.paramObjectCollection == null){
			ret.append(str_tab).append("	").append("<option value=''>\n");
			ret.append(str_tab).append("		").append("<caption>无数据</caption>\n");
			ret.append(str_tab).append("	").append("</option>");
			
			SysLog.writeLogs("om",GlobalParameters.WARN,
				"SampleFiltedParamObjectLists--doEndTag():标签"+this.tagName+"中的传入参数Collection对象为空");
		}else if(this.paramObjectCollection.getRowCount() == 0){
			ret.append(str_tab).append("	").append("<option value=''>\n");
			ret.append(str_tab).append("		").append("<caption>无数据</caption>\n");
			ret.append(str_tab).append("	").append("</option>");
			
			SysLog.writeLogs("om",GlobalParameters.WARN,
				"SampleFiltedParamObjectLists--doEndTag():标签"+this.tagName+"中的传入参数Collection对象无数据");
		}else{
			HttpSession session = pageContext.getSession();
			vo = (AuthorizeVO)session.getAttribute(GlobalParameters.SESSION_INFO);
			account = vo.getEmployeeId();
			String table_name = this.paramObjectCollection.getParamTableName();
			if(table_name==null || table_name.equals("")){
				table_name = this.paramObjectCollection.getTable_name();
				SysLog.writeLogs("om",GlobalParameters.ERROR,
						"SampleFiltedParamObjectLists--doEndTag():标签"+this.tagName+"中的传入参数Collection对象没有设置过滤数据源表名");

			}else{
				try{
					ParamObjectCollection selectColl = DataParamUtil.getInstance().doParamFiltrate(this.paramObjectCollection,account,table_name);
					//过滤后无数据显示,默认显示
		            if(selectColl.getRowCount() == 0){
		                 ret.append(str_tab).append("	").append("<option value=''>\n");
		     			 ret.append(str_tab).append("		").append("<caption>无权查看</caption>\n");
		     			 ret.append(str_tab).append("	").append("</option>");
		     			 
		     			SysLog.writeLogs("om",GlobalParameters.WARN,
		     				"SampleFiltedParamObjectLists--doEndTag():标签"+this.tagName+"经过参数过滤后用户无权查看任何数据信息");
		            }else{               
		                for(int i=0; i<selectColl.getRowCount(); i++){   
		                	ParamObject vo =(ParamObject)selectColl.getElement(i);
		                    if(paramId!= null && paramId.equals(vo.getIds())){
		                    	ret.append(" <option value=\""+vo.getIds()+"\" selected> \n");
		                    	ret.append("     <caption>"+vo.getName()+"</caption> \n");
		                        ret.append(" </option> \n");
		                        continue;
		                    }
		                    
		                    ret.append("<option value=").append(vo.getIds()).append(">\n");
		                    ret.append("<caption>").append(vo.getName()).append("</caption>\n");
		                    ret.append("</option>\n");
		                }
		            }
				}catch(Exception e){
			           SysLog.writeLogs("DataParamSelectTag",GlobalParameters.ERROR, 
			        		   "SampleFiltedParamObjectLists--doEndTag():生成标签"+this.tagName+"时出现异常，原因:" + e.getMessage());
		        }
			}	
		}
		ret.append("</select>\n");		
				
		try {
		   pageContext.getOut().write(ret.toString());
		} catch (IOException ioexception) {
		   throw new JspException("IO Error: " + ioexception.getMessage());
		}
		return 6;
	}
	
	/**
	获取父标签
	*/	
	public Tag getParent(){
		return parent;
	}
	
	/** 
	设置父标签
	@param tag 
	*/
	public void setParent(Tag tag){
	   parent = tag;
	}
	
	/**
	释放
	*/
	public void release(){}
	
	/**
	获取页面上下文
	*/
	public PageContext getPageContext(){
	   return pageContext;
	}
	
	/** @param pagecontext */
	public void setPageContext(PageContext pagecontext){
	   pageContext = pagecontext;
	}

}

