/*
 * Created on 2005-1-19
 *
 * 应用于生成XML TAGLIB的基类，作为基本的XML单元，JSP负责装配XML文件。 
 * 
 */
package com.neusoft.tdframework.web.taglibs;

import java.io.IOException;
import java.io.Writer;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.jsp.JspException;
import javax.servlet.jsp.tagext.TagSupport;

import com.neusoft.om.OMLogger;
import com.neusoft.tdframework.common.util.XMLProperties;
import com.neusoft.tdframework.context.FrameAppContext;
import com.neusoft.tdframework.exception.ServiceException;
import com.neusoft.tdframework.web.controller.ControllerData;

/**
 * @author Administrator
 *
 * 生成XML的TABLIB的基础类
 * 
 */
public abstract class BaseXMLTagLib extends TagSupport{
	
	//protected JspWriter writer = null;
	protected Writer writer = null;
	/**
	 * 重写doStartTag方法，强制调研init
	 */
	public int doStartTag() {
		//构造写页面对象
		writer = pageContext.getOut();
		init(getRequest());
		return SKIP_BODY; 
	}
	
	/* (non-Javadoc)
	 * @see javax.servlet.jsp.tagext.TagSupport#doEndTag()
	 */
	public int doEndTag() throws JspException {
		try {
			createTagBody();
		} catch (IOException e) {
			throw new JspException(e.getMessage());
		}
		return super.doEndTag();
	}

	/**
	 * 根据初始化TABLIB，通常从请求获取相关对象的数据
	 * @param request
	 */
	protected abstract void init(HttpServletRequest request);
	
	/**
	 * 获取请求对象
	 * @return
	 */
	protected HttpServletRequest getRequest() {
		return (HttpServletRequest)pageContext.getRequest();
	}
	
	/**
	 * 获取相应的BO
	 * @param beanName
	 * @return
	 */
	protected Object getObjectBO(String beanName) {
		return FrameAppContext.getBean(pageContext.getServletContext(),beanName);
	}
	
	/**
	 * 生成TABLIB输出的内容
	 *
	 */
	protected abstract void createTagBody() throws IOException;
	
	/**
	 * 写BODY信息
	 * @param info
	 * @throws IOException
	 */
	protected void write(String info) throws IOException{
		if(info==null) return;
		writer.write(info);
	}
	
	/**
	 * 写BODY信息,参数为整型数字
	 * @param info
	 * @throws IOException
	 */
	protected void write(int _int) throws IOException{
		writer.write(String.valueOf(_int));
	}	
	
	/**
	 * 写XML数据信息
	 * @param tagName
	 * @param tagValue
	 * @param attr
	 */
	protected void writeXMLTag(String tagName,String value,Map attr,boolean endTag) throws IOException {
		write("<");write(tagName);write(getAttrs(attr));write(">");write(value);
		if(endTag) {write("</");write(tagName);write(">\n");} 
	}
	
	/**
	 * 生成单值的标签
	 * @param tagName
	 * @param value
	 * @throws IOException
	 */
	protected void writeXMLTag(String tagName,String value) throws IOException{
		write("<");write(tagName);write(">");write(value);write("</");write(tagName);write(">\n");
	}
	
	/**
	 * 只生成起始标签
	 * @param tagName
	 * @throws IOException
	 */
	protected void writeXMLTag(String tagName) throws IOException{
		write("<");write(tagName);write(">\n");
	}
	
	/**
	 * 只生成结束标签
	 * @param tagName
	 * @throws IOException
	 */
	protected void writeXMLEndTag(String tagName) throws IOException{
		write("</");write(tagName);write(">\n");
	}
	
	/**
	 * 空值转换
	 * @param obj
	 * @return
	 */
	protected static String nvl(Object obj) {
		if(obj==null) return "";
		else return obj.toString();
	}
	
	/**
	 * 将XML的value中的&,<,>,",' 可识别性转换
	 * @param value
	 * @return
	 */
	protected static String prepareXML(String value) {
		return XMLProperties.prepareXml(value);
	}
	
	/**
	 * 把Map的内容转换为XML属性
	 * @param attr
	 * @return
	 */
	private String getAttrs(Map attr) {
		if(attr==null) return "";
		
		Object objs[] = attr.keySet().toArray();
		
		String rest = " ";
		for(int i=0;i<objs.length;i++) {
			rest = rest + "," + objs[i].toString();
		}
		
		return rest;
	}
	
	/**
	 * 是否为调试模式
	 * @return
	 */
	protected boolean isDebug() {
		String _debug = (String)getRequest().getAttribute("debug");
		if(_debug==null) return false;
		
		if(_debug.intern()=="true".intern())
			return true;
		else
			return false;
	}
	
	/**
	 * 处理业务异常
	 * @param e
	 */
	protected void processServiceException(ServiceException e) {
		OMLogger.error(e.getMessage(),e);
		ControllerData controllerData = (ControllerData)getRequest().getAttribute(ControllerData.REQUEST_NAME);
		controllerData.setAlertMessage("TAGLIB 调用失败: " + e.getMessage());
	}
	
	/**
	 * 打印tld配置信息，将打印的信息直接copy到tld的配置文件。
	 * @param name
	 * @param _class
	 */
	public static void printTagConfig(String name,Class _class) {
		System.out.println("<tag>");
		System.out.println("	<name>" + name + "</name>");
		System.out.println("	<tagclass>" + _class.getName() + "</tagclass>");
		System.out.println("</tag>");
	}
	
	//开发完后在虚拟上完成自测试功能.
	public void setVMDebug(boolean debug) {
		if(debug) {
			writer = new MyTestWriter();
		}
	}
}
