package com.neusoft.uniflow.web.util;

/**
 * <p>Title: uniflow 3.5 web client</p>
 * <p>Description: </p>
 * <p>Copyright: Copyright (c) 2003</p>
 * <p>Company: neusoft</p>
 * @author wangwb
 * @version 1.0
 */
import java.io.CharArrayWriter;
import java.util.ArrayList;
import java.util.Hashtable;
import java.util.Stack;

import org.xml.sax.Attributes;
import org.xml.sax.SAXException;
import org.xml.sax.helpers.DefaultHandler;




public class CustomParser
    extends DefaultHandler {

  private Hashtable props;
  private String name;
  private ArrayList elements;
  private String DEFAULT = "";
  private CharArrayWriter contents = new CharArrayWriter();
  private Stack tagStack = new Stack();
  private boolean flag = false;

  public CustomParser() {
    this.props = new Hashtable();
  }

  public Hashtable getProps() {
    return this.props;
  }
  public String getDefault(){
    return this.DEFAULT;
  }

  public void startDocument() throws SAXException {
  //  System.out.println("SAX Event: START DOCUMENT");
  }

  public void endDocument() throws SAXException {
  //  System.out.println("SAX Event: END DOCUMENT");
  }

  public void startElement(String namespaceURI,
                           String localName,
                           String qName,
                           Attributes attr) throws SAXException {
    contents.reset();
    tagStack.push(qName);
    if (qName.equals("elements")) {
      for (int i = 0; i < attr.getLength(); i++) {
        if (attr.getQName(i).equals("name")) {
          name = attr.getValue(i);
          elements = new ArrayList();
          flag = true;
          DEFAULT = DEFAULT+name+":";
        }
      }
    }
  }

  public void characters(char buf[], int offset, int len) throws SAXException {

    contents.write(buf, offset, len);
  }

  public void endElement(String namespaceURI,
                         String localName,
                         String qName) throws SAXException {
    String value = contents.toString().trim();
    if (qName.equals("elements")) {
      flag = false;
      props.put(name, elements);
      DEFAULT = DEFAULT+CustomHandler.strSeparator;
      //System.out.println(DEFAULT) ;
    }
    if (flag == true) {
      elements.add(qName);
      if (value.equals("true")) {
        DEFAULT = DEFAULT + "1";
      }
      else {
        DEFAULT = DEFAULT + "0";
      }
      //System.out.println(qName);
    }
    tagStack.pop();

  }

}