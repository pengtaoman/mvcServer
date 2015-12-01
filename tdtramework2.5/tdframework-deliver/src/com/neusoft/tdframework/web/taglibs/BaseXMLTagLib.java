/*
 * Created on 2005-1-19
 *
 * Ӧ��������XML TAGLIB�Ļ��࣬��Ϊ������XML��Ԫ��JSP����װ��XML�ļ��� 
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
 * ����XML��TABLIB�Ļ�����
 * 
 */
public abstract class BaseXMLTagLib extends TagSupport{
	
	//protected JspWriter writer = null;
	protected Writer writer = null;
	/**
	 * ��дdoStartTag������ǿ�Ƶ���init
	 */
	public int doStartTag() {
		//����дҳ�����
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
	 * ���ݳ�ʼ��TABLIB��ͨ���������ȡ��ض��������
	 * @param request
	 */
	protected abstract void init(HttpServletRequest request);
	
	/**
	 * ��ȡ�������
	 * @return
	 */
	protected HttpServletRequest getRequest() {
		return (HttpServletRequest)pageContext.getRequest();
	}
	
	/**
	 * ��ȡ��Ӧ��BO
	 * @param beanName
	 * @return
	 */
	protected Object getObjectBO(String beanName) {
		return FrameAppContext.getBean(pageContext.getServletContext(),beanName);
	}
	
	/**
	 * ����TABLIB���������
	 *
	 */
	protected abstract void createTagBody() throws IOException;
	
	/**
	 * дBODY��Ϣ
	 * @param info
	 * @throws IOException
	 */
	protected void write(String info) throws IOException{
		if(info==null) return;
		writer.write(info);
	}
	
	/**
	 * дBODY��Ϣ,����Ϊ��������
	 * @param info
	 * @throws IOException
	 */
	protected void write(int _int) throws IOException{
		writer.write(String.valueOf(_int));
	}	
	
	/**
	 * дXML������Ϣ
	 * @param tagName
	 * @param tagValue
	 * @param attr
	 */
	protected void writeXMLTag(String tagName,String value,Map attr,boolean endTag) throws IOException {
		write("<");write(tagName);write(getAttrs(attr));write(">");write(value);
		if(endTag) {write("</");write(tagName);write(">\n");} 
	}
	
	/**
	 * ���ɵ�ֵ�ı�ǩ
	 * @param tagName
	 * @param value
	 * @throws IOException
	 */
	protected void writeXMLTag(String tagName,String value) throws IOException{
		write("<");write(tagName);write(">");write(value);write("</");write(tagName);write(">\n");
	}
	
	/**
	 * ֻ������ʼ��ǩ
	 * @param tagName
	 * @throws IOException
	 */
	protected void writeXMLTag(String tagName) throws IOException{
		write("<");write(tagName);write(">\n");
	}
	
	/**
	 * ֻ���ɽ�����ǩ
	 * @param tagName
	 * @throws IOException
	 */
	protected void writeXMLEndTag(String tagName) throws IOException{
		write("</");write(tagName);write(">\n");
	}
	
	/**
	 * ��ֵת��
	 * @param obj
	 * @return
	 */
	protected static String nvl(Object obj) {
		if(obj==null) return "";
		else return obj.toString();
	}
	
	/**
	 * ��XML��value�е�&,<,>,",' ��ʶ����ת��
	 * @param value
	 * @return
	 */
	protected static String prepareXML(String value) {
		return XMLProperties.prepareXml(value);
	}
	
	/**
	 * ��Map������ת��ΪXML����
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
	 * �Ƿ�Ϊ����ģʽ
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
	 * ����ҵ���쳣
	 * @param e
	 */
	protected void processServiceException(ServiceException e) {
		OMLogger.error(e.getMessage(),e);
		ControllerData controllerData = (ControllerData)getRequest().getAttribute(ControllerData.REQUEST_NAME);
		controllerData.setAlertMessage("TAGLIB ����ʧ��: " + e.getMessage());
	}
	
	/**
	 * ��ӡtld������Ϣ������ӡ����Ϣֱ��copy��tld�������ļ���
	 * @param name
	 * @param _class
	 */
	public static void printTagConfig(String name,Class _class) {
		System.out.println("<tag>");
		System.out.println("	<name>" + name + "</name>");
		System.out.println("	<tagclass>" + _class.getName() + "</tagclass>");
		System.out.println("</tag>");
	}
	
	//�������������������Բ��Թ���.
	public void setVMDebug(boolean debug) {
		if(debug) {
			writer = new MyTestWriter();
		}
	}
}
