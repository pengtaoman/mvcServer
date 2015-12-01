package com.neusoft.uniflow.web.util;

/**
 * <p>Title: uniflow 3.5 web client</p>
 * <p>Description: </p>
 * <p>Copyright: Copyright (c) 2003</p>
 * <p>Company: neusoft</p>
 * @author wangwb
 * @version 1.0
 */

import java.io.InputStream;
import java.util.Hashtable;

import javax.xml.parsers.SAXParser;
import javax.xml.parsers.SAXParserFactory;

import com.neusoft.uniflow.service.cfg.io.IOUtil;




public class ParseXML {

  private Hashtable props;
  private String DEFAULT;

  public Hashtable getProps() {
    return this.props;
  }
  public String getDefault(){
    return this.DEFAULT;
  }

  public void parse(String confURL) throws Exception {

    InputStream inputStream=IOUtil.read(confURL);
    parse(inputStream);
  }
  
  private  void parse(InputStream in) throws Exception {

	    CustomParser handler = new CustomParser();
	    SAXParserFactory factory = SAXParserFactory.newInstance();
	    factory.setNamespaceAware(false);
	    factory.setValidating(false);

	    SAXParser parser = factory.newSAXParser();
	    try {
	      parser.parse(in, handler);
	      props = handler.getProps();
	      DEFAULT = handler.getDefault();
	    }
	    finally {
	      factory = null;
	      parser = null;
	      handler = null;
	      in.close();
	    }

}

}