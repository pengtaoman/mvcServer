package com.neusoft.uniflow.web.management.organization.beans;


import java.util.Vector;

public class Translation {
  public Translation() {
  }

  public static Vector strToVector(String sourceStr,
                                   String flag) {
    Vector objVector = new Vector();
    int strCount = sourceStr.length();
    if (strCount > 0) {
      int beginIndex = 0;
      int endIndex = 0;
      int tempEndIndex = endIndex;
      int tempBeginIndex = 0;
      for (int i = 0; i < strCount; i++) {
        tempBeginIndex = i;
        tempEndIndex = i + 1;
        String subStr;
        if (tempEndIndex >= strCount) {
          subStr = sourceStr.substring(beginIndex, tempEndIndex - 1);
          objVector.addElement(subStr);
          continue;
        }
        subStr = sourceStr.substring(tempBeginIndex, tempEndIndex);
        if (subStr.compareTo(flag) == 0) {
          subStr = sourceStr.substring(beginIndex, tempBeginIndex);
          objVector.addElement(subStr);
          beginIndex = tempEndIndex;
        }
      }
    }
    return objVector;
  }

  public static String vectorToStr(Vector objVector, String flag) {
    String endStr = "";
    for (int i = 0; i < objVector.size(); i++) {
      endStr = endStr + objVector.elementAt(i) + flag;
    }
    return endStr;
  }

}