package com.neusoft.tdframework.common.util;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.PageContext;
import javax.servlet.jsp.tagext.Tag;
import javax.servlet.jsp.tagext.TagSupport;

import org.apache.commons.lang.StringEscapeUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.taglibs.standard.lang.support.ExpressionEvaluatorManager;


/**
 * @author Wei Zijun
 *
 */

public final class TagUtil {
    private static Log logger = LogFactory.getLog(TagUtil.class);
    
    public final static String ESCAPE_PREFIX="#_ESCAPE:";

    public final static Map escape_REX=new HashMap();
    
    private TagUtil() {
    }
    
    static {
    	escape_REX.put("html", new String[] {
    			"#\\[(ESC_HTML:)([^\\]]+)\\]*", 
    			"#\\^(ESC_HTML:)([^\\^]+)\\^*", 
    			"#~(ESC_HTML:)([^~]+~)*" 
    		});
    	escape_REX.put("xml", new String[] {
    			"#\\[(ESC_XML:)([^\\]]+)\\]*", 
    			"#\\^(ESC_XML:)([^\\^]+)\\^*", 
    			"#~(ESC_XML:)([^~]+)~*" 
    		});
    	escape_REX.put("js", new String[] {
    			"#\\[(ESC_JS:)([^\\]]+)\\]*", 
    			"#\\^(ESC_JS:)([^\\^]+)\\^*", 
    			"#~(ESC_JS:)([^~]+)~*" 
    		});    	
    	
    }    
    
	public static void main(String[] args) {
//		String attributeS=null;
//		System.out.println(attributeS instanceof String);
//		System.out.println(TagUtils.escapeExpression("aaa#[ESC_HTML:bnm]zzzzz#^ESC_HTML:<td>asd^vvvvv", "html"));
//		System.out.println(TagUtils.escapeExpression("111", "html"));
//		System.out.println(TagUtils.escapeExpression("aaa#[ESC_HTML:bnm]zzzzz#[ESC_HTML:asd]vvvvv",escape_HTML));
//		System.out.println(TagUtils.escapeExpression("aaa#{ESC_HTML:bnm}zzzzz#{ESC_HTML:asd}vvvvv",escape_HTML1));
//		System.out.println(TagUtils.escapeExpression("aaa#^ESC_HTML:bnm^zzzzz#^ESC_HTML:asd^vvvvv",escape_HTML2));
//		System.out.println(TagUtils.escapeExpression("aaa#~ESC_HTML:bnm~zzzzz#~ESC_HTML:asd~vvvvv",escape_HTML3));
	}
	
	public final static String escapeString(String value, String escapeType){
		if ("html".equals(escapeType)){
			value=StringEscapeUtils.escapeHtml(value);
		}else if ("xml".equals(escapeType)){
			value=StringEscapeUtils.escapeXml(value);
		}else if ("js".equals(escapeType)){
			value=StringEscapeUtils.escapeJavaScript(value);
		}
		return value;
	}
    public final static String escapeExpression(String attribute,String escapeType){
    	String[] escapeRexs=(String[])escape_REX.get(escapeType);
    	for (int i=0;i<escapeRexs.length;i++){
    		Pattern pattern = Pattern.compile(escapeRexs[i]);
    		Matcher matcher = pattern.matcher(attribute);
    		StringBuffer attributeBuffer=new StringBuffer();
    		int lastIndex=0;
    		while (matcher.find()){
    			String pEsc=matcher.group(0);
//    			String pEscType=matcher.group(1);
    			String pEscValue=matcher.group(2);
    			pEscValue=escapeString(pEscValue,escapeType);
    			int start=matcher.start(0);
    			attributeBuffer.append(attribute.substring(lastIndex, start));
    			attributeBuffer.append(pEscValue);
    			lastIndex=start+pEsc.length();
    		}
    		attributeBuffer.append(attribute.substring(lastIndex));
    		attribute=attributeBuffer.toString();
    	}
    	return attribute;
    }
    
    public final static String evaluateExpressionAsString(String attributeName, String attribute, Tag tag, PageContext pageContext) {
        try {
            if (attribute != null) {
                attribute = (String) ExpressionEvaluatorManager.evaluate(attributeName, attribute, String.class, tag, pageContext);
                if (attribute!=null && attribute.startsWith(ESCAPE_PREFIX) ){
                	attribute=attribute.substring(ESCAPE_PREFIX.length());
                	attribute=escapeExpression(attribute,"html");
                	attribute=escapeExpression(attribute,"xml");
                	attribute=escapeExpression(attribute,"js");
                }
            }
        } catch (JspException e) {
            logger.error("Could not resolve EL for [" + attributeName + "] - " + e.getMessage());
        }

        return attribute;
    }

    public final static Object evaluateExpressionAsObject(String attributeName, Object attribute, Tag tag, PageContext pageContext) {
        try {
            if (attribute != null) {
                attribute = ExpressionEvaluatorManager.evaluate(attributeName, attribute.toString(), Object.class, tag, pageContext);
            }
            if (attribute instanceof String){
	            String attributeS=attribute.toString();
	            if (attributeS.startsWith(ESCAPE_PREFIX) ){
	            	attributeS=attributeS.substring(ESCAPE_PREFIX.length());
	            	attributeS=escapeExpression(attributeS,"html");
	            	attributeS=escapeExpression(attributeS,"xml");
	            	attributeS=escapeExpression(attributeS,"js");
	            	attribute=attributeS;
	            }
            }
        } catch (JspException e) {
            logger.error("Could not resolve EL for [" + attributeName + "] - " + e.getMessage());
        }

        return attribute;
    }

    public final static Collection evaluateExpressionAsCollection(String attributeName, Object attribute, Tag tag, PageContext pageContext) {
        attribute = evaluateExpressionAsObject(attributeName, attribute, tag, pageContext);

        if (attribute == null || !(attribute instanceof Collection)) {
            if (logger.isDebugEnabled()) {
                logger.debug("The attribute [" + attributeName  + "] is null or not a Collection.");
            }
            return null;
        }

        return (Collection)attribute;
    }

    public final static Boolean evaluateExpressionAsBoolean(String attributeName, String attribute, Tag tag, PageContext pageContext) {
        attribute = evaluateExpressionAsString(attributeName, attribute, tag, pageContext);

        if (attribute == null) {
            return null;
        }

        return Boolean.valueOf(attribute);
    }

    public final static int evaluateExpressionAsInt(String attributeName, String attribute, Tag tag, PageContext pageContext) {
        attribute = evaluateExpressionAsString(attributeName, attribute, tag, pageContext);

        if (attribute == null) {
            return 0;
        }

        return new Integer(attribute).intValue();
    }

}

