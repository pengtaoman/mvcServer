package com.neusoft.tdframework.print;

public class LineElement implements ReportElement {

	

	private LineElement() {
		
	}
	
	/**
	 * @param offsetX 横坐标
	 * @param offsetY 纵坐标
	 * @param width 宽度
	 * @param height 高度
	 */
	public LineElement(double offsetX, double offsetY, double width, double height) {
		this.x = offsetX;
		this.y = offsetY;
		this.width = width;
		this.height = height;
	}
	
	/**
	 * @param offsetX 横坐标
	 * @param offsetY 纵坐标
	 * @param width 宽度
	 * @param height 高度
	 * @param isPrint 是否打印出来
	 */
	public LineElement(double offsetX, double offsetY, double width, double height, boolean isPrint) {
		this.x = offsetX;
		this.y = offsetY;
		this.width = width;
		this.height = height;
		this.isPrint = isPrint;
	}
	
	public String toString() {
		StringBuilder strBuilder = new StringBuilder();
		strBuilder.append("<line>");
		strBuilder.append("<reportElement x=\"");
		strBuilder.append(x);
		strBuilder.append("\" y=\"");
		strBuilder.append(y);
		strBuilder.append("\" width=\"");
		strBuilder.append(width);
		strBuilder.append("\" height=\"");
		strBuilder.append(height);
		strBuilder.append("\"");
		strBuilder.append(" isPrint=\"");
		if (isPrint) {
		    strBuilder.append("true");
		} else {
			strBuilder.append("false");
		}
		strBuilder.append("\" ");
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
		
		strBuilder.append("<graphicElement pen=\"");
		strBuilder.append(pen);
		strBuilder.append("Point\" fill=\"");
		strBuilder.append(fill);
		strBuilder.append("\" />");
	
		strBuilder.append("</line>");
		
		return strBuilder.toString();
	}
	
	private boolean isPrint = true;
	
	public int pen = 1;
	
	public String fill = "Solid";
	
	private double x = 0L;
	
	private double y = 0L;
	
	private double width = 0L;
	
	private double height = 0L;
	
	public String forecolor = "#000000";
	
	public String backcolor = "";
	
	public int size = 9;

}
