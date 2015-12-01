/**
 * 
 */
package com.neusoft.tdframework.common.util;

/**
 * @author pengtao
 *
 */
public class PrintUtil {
	
	public static String transPrintXML(String printStr, String pageNumner) {
		StringBuilder sbu = new StringBuilder("<jasperPrint name=\"TDReport\" pageNumber=\"");
		sbu.append(pageNumner);
    	sbu.append("\" locale=\"uk_UA\" timezone=\"Europe/Helsinki\" pageWidth=\"2497\" pageHeight=\"3508\">");
    	
    	//String[] printData = printStr.split("~ ~");
    	StringBuilder sbPage = new StringBuilder("<page>");
    	//if (printData.length > 0 ) {
    		//for (int i = 0 ; i < printData.length; i++) {
    			//String[] printCols = printData[i].split("~");
    	        String[] printCols =printStr.split("~");
    			if (printCols.length > 0 && printCols.length%5 == 0) {
    				for (int j = 0; j <  printCols.length; j++) {
    					int colsCount = 0;
	    				sbPage.append( "<text textAlignment=\"Left\" verticalAlignment=\"Top\">")
	    				.append("<reportElement x=\"")
	    				.append(printCols[j + 0])
	    				.append("\" y=\"")
	    				.append(printCols[j + 1])
	    				.append("\" width=\"")
	    				.append(printCols[j + 2])
	    				.append("\" height=\"")
	    				.append(printCols[j + 3])
	    				.append("\" forecolor=\"#000000\" backcolor=\"#ffffff\"/>")
	    			    .append("<font size=\"9\"/><textContent><![CDATA[")
	    			    .append(printCols[j + 4])
	    			    .append("]]></textContent>")
	    			    .append("</text>");
	    				j = j + 4;
    				}
    			}
    		//}
    	//}
    	sbPage.append("</page>" );
    	return sbu.append(sbPage).append("</jasperPrint>").toString();
    	
	}

}
