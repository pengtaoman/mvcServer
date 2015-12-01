package com.neusoft.uniflow.web.util;

/**
 * <p>Title: uniflow 3.5 web client</p>
 * <p>Description: </p>
 * <p>Copyright: Copyright (c) 2003</p>
 * <p>Company: neusoft</p>
 * @author wangwb
 * @version 1.0
 */

public class CustomHandler {
  public final static String COOKIE_DEFAULT = "style:blue_style#number:16#";
  public final static String strSeparator = "#";
  public final static String CUSTOM_PROPS = "CUSTOM_PROPS";
  public final static String CUSTOM_DEFAULT = "CUSTOM_DEFAULT";
  public final static String PREFERENCE_SYTLE = "style";
  public final static String PREFERENCE_NUMBER ="number";
  public CustomHandler() {
  }

  public static String setElements(String name, String elements, String list) {
    String label = name+":";
    int startIndex = list.indexOf(label)+label.length();
    StringBuffer retVal = new StringBuffer();

    String temp = list.substring(startIndex);
    int endIndex = temp.indexOf(strSeparator) + startIndex;
    retVal.append(list.substring(0, startIndex));
    retVal.append(elements);
    retVal.append(list.substring(endIndex));
    return retVal.toString();

  }

  public static String getElements(String name, String list) {
    String label = name+":";
    int startIndex = list.indexOf(label)+label.length();
    String temp = list.substring(startIndex);
    int endIndex = temp.indexOf(strSeparator) + startIndex;
    return list.substring(startIndex,endIndex);
  }

}