package com.neusoft.tdframework.print;

public final class TextElement implements ReportElement  {
	
	private TextElement() {
		
	}
	
	/**
	 * @param textContent ��������
	 * @param offsetX ������
	 * @param offsetY ������
	 * @param width ���
	 * @param height �߶�
	 */
	public TextElement(String textContent, double offsetX, double offsetY, double width, double height) {
		this.textContent = textContent;
		this.x = offsetX;
		this.y = offsetY;
		this.width = width;
		this.height = height;
	}
	
	/**
	 * @param textContent ��������
	 * @param offsetX ������
	 * @param offsetY ������
	 * @param width ���
	 * @param height �߶�
	 */
	public TextElement(String textContent, double offsetX, double offsetY) {
		this.textContent = textContent;
		this.x = offsetX;
		this.y = offsetY;
	}
	
	public String toString() {
		StringBuilder strBuilder = new StringBuilder();
		strBuilder.append("<text textAlignment=\"");
		strBuilder.append(textAlignment);
		strBuilder.append("\" verticalAlignment=\"");
		strBuilder.append(verticalAlignment);
		strBuilder.append("\">");
		
		strBuilder.append("<reportElement x=\"");
		strBuilder.append(x);
		strBuilder.append("\" y=\"");
		strBuilder.append(y);
		strBuilder.append("\"");
		if (width != 0L) {
			strBuilder.append("width=\"");
			strBuilder.append(width);
			strBuilder.append("\" ");
		} else {
			width = ((double)size/(double)12)*(textContent.getBytes().length)*10;
			//System.out.println("----------------" + width + "===" + textContent.getBytes().length + "===" +(9.0/12.0));
			strBuilder.append("width=\"");
			strBuilder.append(width);
			strBuilder.append("\" ");
		}
		if (height != 0L) {
			strBuilder.append(" height=\"");
			strBuilder.append(height);
			strBuilder.append("\"");
		} else {
			height = ((double)size/(double)12)*20;
			strBuilder.append(" height=\"");
			strBuilder.append(height);
			strBuilder.append("\"");
		}
//		strBuilder.append(" forecolor=\"");
//		strBuilder.append(forecolor);
//		strBuilder.append("\" backcolor=\"");
//		strBuilder.append(backcolor);
//		strBuilder.append(" />");
		if (!"".equals(forecolor)) {
		    strBuilder.append(" forecolor=\"");
		    strBuilder.append(forecolor);
		    strBuilder.append("\"");
		}
		if (!"".equals(backcolor)) {
		    strBuilder.append(" backcolor=\"");
		    strBuilder.append(backcolor);
		    strBuilder.append("\"");
		}
		strBuilder.append(" />");
		strBuilder.append("<font size=\"");
		strBuilder.append(size);
		strBuilder.append("\" ");
		strBuilder.append(" fontName=\"");
		strBuilder.append(fontName);
		strBuilder.append("\" ");
		strBuilder.append(" />");
		
		strBuilder.append("<textContent><![CDATA[");
		strBuilder.append(textContent);
		strBuilder.append("]]>");
		strBuilder.append("</textContent>");
		
		strBuilder.append("</text>");
		
		return strBuilder.toString();
	}
	
	private String textContent = "";
	
	public TEXT_ALIGN textAlignment = TEXT_ALIGN.Left;
	
	public VERTICAL_ALIGN verticalAlignment = VERTICAL_ALIGN.Middle;
	
	private double x = 0L;
	
	private double y = 0L;
	
	private double width = 0L;
	
	private double height = 0L;
	
	public String forecolor = "#000000";
	
	public String backcolor = "";
	
	public double size = 9.0;
	
	public String fontName = "����";

}
