package com.neusoft.tdframework.print;

import java.util.ArrayList;
import java.util.List;

public class PrintReport {
	
	
	
	private List<ReportPage> pageLst = new ArrayList<ReportPage>();
	
	public double pageWidth = 0L;
	public double pageHeight = 0L;
	
	/**
	 * 如果只有一页需要打印，可使用该构建方法
	 */
	public PrintReport() {
		
		pageLst.add(new ReportPage());
	}
	
	/**
	 * @param reportName 报表名称
	 * @param pageNumber 报表页数
	 */
	public PrintReport(String reportName, int pageNumber) {
		
	    for (int i = 0; i < pageNumber; i++) {
	    	pageLst.add(new ReportPage());
	    }
	}
	
	/**
	 * @param reportName 报表名称
	 * @param pageNumber 报表页数
	 * @param pageWidth  报表宽度
	 * @param pageHeight
	 */
	public PrintReport(String reportName, int pageNumber, double pageWidth, double pageHeight) {
		
	    for (int i = 0; i < pageNumber; i++) {
	    	pageLst.add(new ReportPage());
	    }
	    this.pageWidth = pageWidth;
	    this.pageHeight = pageHeight;
	}
	
	/**
	 * @param pageNumber 页数，即把打印元素加到第几个页上
	 * @param reportElement 打印元素
	 * @throws Exception 
	 */
	public void addPrintElementToReport(int pageNumber, ReportElement reportElement) throws Exception {
		try {
		    pageLst.get(pageNumber).addElementToPage(reportElement);
		} catch (Exception ex) {
			ex.printStackTrace();
			throw new Exception("打印元素加入失败，请查看设置的打印页数信息和传入的pageNumber参数，是否存在数组越界现象。");
		}
	}
	
	/**
	 * 针对只有一页打印页的情况
	 * @param reportElement 打印元素
	 * @throws Exception
	 */
	public void addPrintElementToReport(ReportElement reportElement) throws Exception  {
		try {
		    pageLst.get(0).addElementToPage(reportElement);
		} catch (Exception ex) {
			ex.printStackTrace();
			throw new Exception("打印元素加入失败，请查看设置的打印页数信息和传入的pageNumber参数，是否存在数组越界现象。");
		}
	}
	
	public String toString() {
		StringBuilder strBuilder = new StringBuilder();
		strBuilder.append("<jasperPrint name=\"TDReport\" pageNumber=\"");
		strBuilder.append(this.pageLst.size());
		strBuilder.append("\" locale=\"uk_UA\" timezone=\"Europe/Helsinki\" ");
		if (pageHeight != 0L) {
			strBuilder.append(" pageWidth=\"");
			strBuilder.append(pageWidth);
			strBuilder.append("\"");
		}
		
		if (pageHeight != 0L) {
			strBuilder.append(" pageHeight=\"");
			strBuilder.append(pageHeight);
			strBuilder.append("\"");
		}
		strBuilder.append(">");
		for (int i = 0; i < pageLst.size(); i++) {
			strBuilder.append(pageLst.get(i).toString());
		}
		
		strBuilder.append("</jasperPrint>");
		return strBuilder.toString();
		
	}
	
	
public static void main(String[] args) throws Exception {
		
		LineElement lineElement = new LineElement(90.0, 148.0, 400.0, 128.0);
		
		LineElement lineElement01 = new LineElement(290.0, 348.0, 400.0, 128.0);
		
		TextElement textElement = new TextElement("阿斯顿发撒旦法",290.0, 348.0, 400.0, 128.0);
		
		textElement.textAlignment = ReportElement.TEXT_ALIGN.Right;
		textElement.verticalAlignment = ReportElement.VERTICAL_ALIGN.Top;
		
		TextElement textElement01 = new TextElement("asdgfa撒旦法的发 水电费关机连接偶就奇偶 uyerbuhgb 吗，涅米宁将案件的烦恼过劲儿",00.0, 148.0);
		
		textElement01.textAlignment = ReportElement.TEXT_ALIGN.Center;
		textElement01.verticalAlignment = ReportElement.VERTICAL_ALIGN.Middle;
		//textElement01.fontName = "华文行楷";
		textElement01.backcolor = "#fff000";
		textElement01.size = 24;
		PrintReport printReport = new PrintReport("测试打印报告",2,500,400);
		printReport.pageHeight = 900;
		printReport.addPrintElementToReport(0, lineElement);
		printReport.addPrintElementToReport(0, lineElement01);
		printReport.addPrintElementToReport(0, textElement);
		
		printReport.addPrintElementToReport(1, lineElement);
		printReport.addPrintElementToReport(1, lineElement01);
		printReport.addPrintElementToReport(1, textElement01);
		
		System.out.println(printReport.toString());
		
		
	}

}
