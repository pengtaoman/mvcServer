package com.neusoft.tdframework.print;

import java.util.ArrayList;
import java.util.List;

class ReportPage {
	
	private List<ReportElement> elementLst = new ArrayList<ReportElement>();
	
	public void addElementToPage (ReportElement reportElement) {
		elementLst.add(reportElement);
	}
	
	public String toString() {
		
		StringBuilder strBuilder = new StringBuilder();
		strBuilder.append("<page>");
		for (int i = 0; i < elementLst.size(); i++) {
			strBuilder.append(elementLst.get(i).toString());
		}
		strBuilder.append("</page>");
		return strBuilder.toString();
	}

}
