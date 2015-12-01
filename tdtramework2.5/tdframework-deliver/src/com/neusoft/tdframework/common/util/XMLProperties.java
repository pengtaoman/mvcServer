package com.neusoft.tdframework.common.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.StringWriter;
import java.util.List;
import java.util.StringTokenizer;
import java.util.Properties;
import java.util.Enumeration;

import org.jdom.Document;
import org.jdom.Element;
import org.jdom.input.SAXBuilder;
import org.jdom.output.XMLOutputter;
import org.jdom.CDATA;

/** <p>Title: XMLProperties</p>
  * <p>Description: ����XML����Ĺ�����</p>
  * <p>Date: 2004-10-12</p>
  * <p>Company: neusoft</p>
  * @author liyj
  * @version 1.0 
*/

public class XMLProperties {
	
	private String xPath = null; //���õ�XML������·��
	private static String ROOT_PROPERTY = "xml_root_name";
	private static String ROOT_VALUE = "xml_root_value";

	public XMLProperties() {

	}
	
	/**
	 * ͨ���ļ���ȡXML����
	 * @param file-�ļ�·������(E:\\***\\����\\***\\***.xml)
	 * @return
	 */
	public Document getDocument(String file) {
		Document doc = null;
		try {
			SAXBuilder builder = new SAXBuilder();
			// Strip formatting
			FileInputStream in = new FileInputStream(new File(file));
			//������һ��Document����ʹ��jdom������xml�ļ���
			doc = builder.build(in);
			in.close();
		} catch (Exception e) {
			System.err.println(
				"Error creating XML parser in " + "XMLProperties.java");
			e.printStackTrace();
		}
		return doc;
	}

	/**
	 * ����ָ�����ƵĽڵ��ֵ��
	 * @param element-��Ҫ�����xml����
	 * @param name �������ʽ��"node1.node2.����",����node2��node1���ӽڵ�
	 * @return String
	 */
	public String getProperty(Element element,String _name) {

		//	��nameǰ���·����Ϣ
		String name = _name;
		if (this.xPath != null)
			name = this.xPath + "." + name;

		String[] propName = parsePropertyName(name);
		// Search for this property by traversing down the XML heirarchy.
		
		for (int i = 0; i < propName.length; i++) {
			element = element.getChild(propName[i]);
			if (element == null) {
				// This node doesn't match this part of the property name which
				// indicates this property doesn't exist so return null.
				return null;
			}
		}
		// At this point, we found a matching property, so return its value.
		// Empty strings are returned as null.
		String value = element.getText();
		if ("".equals(value.trim())) {
			return null;
		} else {
			// Add to cache so that getting property next time is fast.
			return value.trim();
		}
	}

	/**
	 * ���ظ��ڵ����ơ�
	 * @param element-��Ҫ�����xml����
	 * @return String
	 * add by liyj
	 */
	public String getRootProperty(Element element) {

		// At this point, we found a matching property, so return its value.
		// Empty strings are returned as null.
		String value = element.getName();
		if ("".equals(value.trim())) {
			return null;
		} else {
			// Add to cache so that getting property next time is fast.
			return value.trim();
		}
	}

	/**
	 * ���ظ��ڵ�ֵ
	 * @param element-��Ҫ�����xml����
	 * @return String
	 * add by liyj
	 */
	public String getRootValue(Element element) {
		// At this point, we found a matching property, so return its value.
		// Empty strings are returned as null.
		String value = element.getText();
		if ("".equals(value.trim())) {
			return null;
		} else {
			// Add to cache so that getting property next time is fast.
			return value.trim();
		}
	}

	/**
	 * ����ָ���ڵ�����е��ӽڵ�����ơ�
	 * @param element-��Ҫ�����xml����
	 * @param parent
	 * @return String[]
	 */
	public String[] getChildrenProperties(Element element,String _parent) {

		//�ﾶ·����Ϣ
		String parent = _parent;

		if (this.xPath != null)
			if (parent.intern() != "".intern())
				parent = this.xPath + "." + parent;
			else
				parent = this.xPath;

		//��ȡ����
		String[] propName = parsePropertyName(parent);
		// Search for this property by traversing down the XML heirarchy.

		for (int i = 0; i < propName.length; i++) {
			element = element.getChild(propName[i]);
			if (element == null) {
				// This node doesn't match this part of the property name which
				// indicates this property doesn't exist so return empty array.
				return new String[] {
				};
			}
		}
		// We found matching property, return names of children.
		List children = element.getChildren();
		int childCount = children.size();
		String[] childrenNames = new String[childCount];
		for (int i = 0; i < childCount; i++) {
			childrenNames[i] = ((Element) children.get(i)).getName();
		}
		return childrenNames;
	}

	/**
	 * ����xPath�����е��ӽڵ������
	 * @param element-��Ҫ�����xml����
	 * @return String[]
	 */
	public String[] getChildrenProperties(Element element) {
		return getChildrenProperties(element,"");
	}

	/**
	 * ���ָ���ڵ�����е��ӽڵ��ֵ
	 * @param element-��Ҫ�����xml����
	 * @param parent
	 * @return String[]
	 */
	public String[] getChildrenValues(Element element,String _parent) {

		//�ﾶ·����Ϣ
		String parent = _parent;

		if (this.xPath != null)
			if (parent.intern() != "".intern())
				parent = this.xPath + "." + parent;
			else
				parent = this.xPath;

		String[] propName = parsePropertyName(parent);
		// Search for this property by traversing down the XML heirarchy.
		
		for (int i = 0; i < propName.length; i++) {
			element = element.getChild(propName[i]);
			if (element == null) {
				// This node doesn't match this part of the property name which
				// indicates this property doesn't exist so return empty array.
				return new String[] {
				};
			}
		}
		// We found matching property, return names of children.
		List children = element.getChildren();
		int childCount = children.size();
		String[] childrenNames = new String[childCount];
		for (int i = 0; i < childCount; i++) {
			childrenNames[i] = ((Element) children.get(i)).getText();
		}
		return childrenNames;
	}

	/**
	 * ����xPath�����е��ӽڵ��ֵ
	 * @param element-��Ҫ�����xml����
	 * @param parent
	 * @return String[]
	 */
	public String[] getChildrenValues(Element element) {
		return getChildrenValues(element,"");
	}

	/**
	 * ����ָ���ڵ��ֵ��
	 * @param element-��Ҫ�����xml����
	 * @param name
	 * @param value
	 */
	public void setProperty(Element element,String _name, String value) {

		//	��nameǰ���·����Ϣ
		String name = _name;
		if (this.xPath != null)
			name = this.xPath + "." + name;

		String[] propName = parsePropertyName(name);
		// Search for this property by traversing down the XML heirarchy.
		
		for (int i = 0; i < propName.length; i++) {
			// If we don't find this part of the property in the XML heirarchy
			// we add it as a new node
			if (element.getChild(propName[i]) == null) {
				element.addContent(new Element(propName[i]));
			}
			element = element.getChild(propName[i]);
		}
		// Set the value of the property in this node.
		element.setText(value);
	}

	/**
	 * ��xml��������һ���µĽڵ�
	 * @param ele-��Ҫ�����xml����
	 * @param _pName ��Ҫ�����ӽڵ�ĸ��ڵ�����
	 * @param _name ��Ҫ���ӵ��ӽڵ�����
	 * @param value ��Ҫ���ӵ��ӽڵ�ֵ
	 * add by liyj
	 */
	public void addProperty(Element ele,String _pName, String _name, String value) {

		//	��nameǰ���·����Ϣ
		String pName = _pName;
		if (this.xPath != null) {
			if (_pName.equals(""))
				pName = this.xPath;
			else
				pName = this.xPath + "." + _pName;
		}

		String[] propName = parsePropertyName(pName);
		Element ele_m = null;
		for (int i = 0; i < propName.length; i++) {
			ele_m = ele.getChild(propName[i]);
			if (ele_m == null) {
				// This node doesn't match this part of the property name which
				// indicates this property doesn't exist so return empty array.
				System.err.println(
				"Error creating XML parser in " + "XMLProperties.java");
			}
		}
		Element ele_a = new Element(_name);
		ele_a.setText(value);
		ele_m.addContent(ele_a);
	}

	/**
	 * ��xml����ĸ��ڵ�����һ���µĽڵ�
	 * @param ele-��Ҫ�����xml����
	 * @param _name ��Ҫ���ӵ��ӽڵ�����
	 * @param value ��Ҫ���ӵ��ӽڵ�ֵ
	 * add by liyj
	 */
	public Element addRootProperty(Element ele,String _name, String value) {
		Element ele_a = new Element(_name);
		ele_a.setText(value);
		ele.addContent(ele_a);
		return ele;
	}

	/**
	 * ��Document��������ĳЩ�����󣬰����ս�����ص�xml�ļ���
	 * @param doc-�������xml����
	 * @param file-�ļ�·������(E:\\***\\����\\***\\***.xml)
	 * @author liyj
	 */
	public void updateXMLFile(Document doc,String file) {
		XMLOutputter xmlout = new XMLOutputter();
		FileOutputStream output;
		try {
			output = new FileOutputStream(new File(file));
			xmlout.output(doc, output);
			output.close();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e1) {
			e1.printStackTrace();
		}
	}

	/**
	 * ����һ���µ�����(ֻ��������Ŀ¼)
	 * @param doc ��Ҫ�����xml����
	 * @param name
	 * @param value
	 * from kjava 
	 * author dongzg
	 */
	public void addProperty(Document doc,String _name, String value) {

		//	��nameǰ���·����Ϣ
		String name = _name;
		if (this.xPath != null)
			name = this.xPath + "." + name;

		String[] propName = parsePropertyName(name);
		// Search for this property by traversing down the XML heirarchy.
		//    Element element = doc.getRootElement();
		org.jdom.Element words = new Element("words");
		//    words.setName(name);
		words.setText(value);
		Element badwords = new Element("badwords");
		badwords.addContent(words);
		Element root = doc.getRootElement();
		Element first = root.getChild("badwords");
		List children = first.getChildren();
		children.add(children.indexOf(first), words);
		// write the XML properties to disk
	}

	/**
	 * ɾ��ָ���Ľڵ㡣
	 * @param element-��Ҫ�����xml����
	 * @param name
	 */
	public void deleteProperty(Element element,String _name) {

		//	��nameǰ���·����Ϣ
		String name = _name;
		if (this.xPath != null)
			name = this.xPath + "." + name;

		String[] propName = parsePropertyName(name);
		// Search for this property by traversing down the XML heirarchy.
		
		for (int i = 0; i < propName.length - 1; i++) {
			element = element.getChild(propName[i]);
			// Can't find the property so return.
			if (element == null) {
				return;
			}
		}
		// Found the correct element to remove, so remove it...
		element.removeChild(propName[propName.length - 1]);
	}

	/**
	 * ���ַ�������.�ָ���������еĵ�������
	 * @param name
	 * @return String[]
	 */
	private String[] parsePropertyName(String name) {
		// Figure out the number of parts of the name (this becomes the size
		// of the resulting array).
		int size = 1;
		for (int i = 0; i < name.length(); i++) {
			if (name.charAt(i) == '.') {
				size++;
			}
		}
		String[] propName = new String[size];
		// Use a StringTokenizer to tokenize the property name.
		StringTokenizer tokenizer = new StringTokenizer(name, ".");
		int i = 0;
		while (tokenizer.hasMoreTokens()) {
			propName[i] = tokenizer.nextToken();
			i++;
		}
		return propName;
	}

	/**
	 * ���÷���:��Document�͵���Ϣת��ΪXML�ַ���
	 * @param  Element ��Ҫת���ַ�����Element����
	 * @return String
	 * @author liyj
	 */
	public String xmlToString(Document docXML) {
		String r = null;
		try {
			StringWriter sw = new StringWriter();
			XMLOutputter outputter = new XMLOutputter("  ", true);
			outputter.setEncoding("UTF-8");
			outputter.output(docXML, sw);
			r = sw.toString();
			sw.close();
		} catch (java.io.IOException e) {
			r = "";
			e.printStackTrace();
		}
		return r;
	}

	/**
	 * ���÷���:��Element�͵���Ϣת��ΪXML�ַ���
	 * @param  Element ��Ҫת���ַ�����Element����
	 * @return String
	 * @author liyj
	 */
	public String xmlToString(Element el) {
		String r = null;
		try {
			StringWriter sw = new StringWriter();
			XMLOutputter outputter = new XMLOutputter("  ", true);
			outputter.setEncoding("UTF-8");
			outputter.output(el, sw);
			r = sw.toString();
			sw.close();
		} catch (java.io.IOException e) {
			r = "";
			e.printStackTrace();
		}
		return r;
	}

	/**
	 * ��XML�����γ�CDATA����ָ����XML������
	 * @param Element ele_p��Ҫ����CDATA�ĸ�XML����
	 * @param Element ele��Ҫת��CDATA��Element����
	 * @param String newNodeName ���ӵ�CDATA�Ľڵ����ƣ�����Ϊ�մ�""
	 * @param String parent ��Ҫ����CDATA�ĸ��ڵ�����
	 * @author liyj
	 */
	public Element addCDATA(
		Element ele_p,
		Element ele,
		String newNodeName,
		String parent) {

		//	��nameǰ���·����Ϣ
		String pname = parent;
		if (this.xPath != null)
			pname = this.xPath + "." + parent;

		if(pname.equals("")){
			if (newNodeName.equals("")) {
				ele_p.addContent(new CDATA(xmlToString(ele)));
			} else {
				Element ele_a = new Element(newNodeName);
				ele_a.addContent(new CDATA(xmlToString(ele)));
				ele_p.addContent(ele_a);
			}
		}
		else{
			//��ȡ����
			String[] propName = parsePropertyName(pname);
			// Search for this property by traversing down the XML heirarchy.

			Element ele_proc = null;

			for (int i = 0; i < propName.length; i++) {
				ele_proc = ele_p.getChild(propName[i]);
				if (ele_proc == null) {
					//			   This node doesn't match this part of the property name which
					//			   indicates this property doesn't exist so return empty array.
					System.out.println("XMLProperties.addCDATA is error ....");
				}
			}

			if (newNodeName.equals("")) {
				ele_proc.addContent(new CDATA(xmlToString(ele)));
			} else {
				Element ele_a = new Element(newNodeName);
				ele_a.addContent(new CDATA(xmlToString(ele)));
				ele_proc.addContent(ele_a);
			}
		}
		return ele_p;
	}

	/**
	 * ��xml�����е�CDATA����ת����String����
	 * @param element ��Ҫ���л�ȡCDATA���ݵ�XML����
	 * @param _name �ڵ�����
	 * @return  
	 * @author liyj
	 */
	public String getCDATAtoString(Element element,String _name) {

		//	��nameǰ���·����Ϣ
		String name = _name;
		if (this.xPath != null)
			name = this.xPath + "." + name;

		String[] propName = parsePropertyName(name);
		// Search for this property by traversing down the XML heirarchy.
		
		for (int i = 0; i < propName.length; i++) {
			element = element.getChild(propName[i]);
			if (element == null) {
				// This node doesn't match this part of the property name which
				// indicates this property doesn't exist so return null.
				return null;
			}
		}

		return element.getText().trim();
	}

	/**
	 * ���ò����Ľڵ�·����
	 * ��get���ԣ�����set���ԣ�delete���Ե�ʱ�򣬴���Ľڵ�ǰ�����xPath��
	 * @param path The xPath to set.
	 */
	public void setXPath(String path) {
		xPath = path;
	}
	
	/**
		�л�XML��ʽ����Ϊ��ʶ�����ȷ��ʽ(XSL�ɶ���ʽ)
	*/
	public static String prepareXml(String s){
		if(s == null || s.length() == 0) return "";
		
		StringBuffer stringbuffer = new StringBuffer(s.length() + 50);
		for(int i = 0; i < s.length(); i++){
			char c = s.charAt(i);			
			if('>' == c){
				stringbuffer.append("&gt;");
				continue;	
			}else if('<' == c){
				stringbuffer.append("&lt;");
				continue;
			}else if('&' == c){
				stringbuffer.append("&amp;");
				continue;
			}else if(c == '"'){
				stringbuffer.append("&quot;");
				continue;
			}else if('\'' == c){
				stringbuffer.append("&apos;");
				continue;
			}else
				stringbuffer.append(c);
		}
		return stringbuffer.toString();
	}

	/**
	 * ��Properties��������XML������.
	 * @param props
	 * 	Properties ����.
	 */
	
	public static String getXML(Properties props){
		
		if(props==null) return "";
		
		StringBuffer strBuff = new StringBuffer();
		
		Enumeration keys = props.keys();
		while(keys.hasMoreElements()){
			String key = (String)keys.nextElement();
			strBuff.append("<").append(key).append(">")
					.append(props.getProperty(key))
					.append("</").append(key).append(">\n");
		}
		
		return strBuff.toString();
	}

	/**
	 * ����
	 * @param args
	 */
	public static void main(String[] args) {
		XMLProperties prop = new XMLProperties();
		Document doc_proc = prop.getDocument("E:"+File.separator+"liyj"+File.separator+"mytest.xml");
		System.out.println(prop.getCDATAtoString(doc_proc.getRootElement(),"RspTransID.add"));
		
	}
}
