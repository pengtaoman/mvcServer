package com.neusoft.tdframework.print;

import java.util.ArrayList;
import java.util.List;

public class PrintReport {
	
	
	
	private List<ReportPage> pageLst = new ArrayList<ReportPage>();
	
	public double pageWidth = 0L;
	public double pageHeight = 0L;
	
	/**
	 * ���ֻ��һҳ��Ҫ��ӡ����ʹ�øù�������
	 */
	public PrintReport() {
		
		pageLst.add(new ReportPage());
	}
	
	/**
	 * @param reportName ��������
	 * @param pageNumber ����ҳ��
	 */
	public PrintReport(String reportName, int pageNumber) {
		
	    for (int i = 0; i < pageNumber; i++) {
	    	pageLst.add(new ReportPage());
	    }
	}
	
	/**
	 * @param reportName ��������
	 * @param pageNumber ����ҳ��
	 * @param pageWidth  ������
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
	 * @param pageNumber ҳ�������Ѵ�ӡԪ�ؼӵ��ڼ���ҳ��
	 * @param reportElement ��ӡԪ��
	 * @throws Exception 
	 */
	public void addPrintElementToReport(int pageNumber, ReportElement reportElement) throws Exception {
		try {
		    pageLst.get(pageNumber).addElementToPage(reportElement);
		} catch (Exception ex) {
			ex.printStackTrace();
			throw new Exception("��ӡԪ�ؼ���ʧ�ܣ���鿴���õĴ�ӡҳ����Ϣ�ʹ����pageNumber�������Ƿ��������Խ������");
		}
	}
	
	/**
	 * ���ֻ��һҳ��ӡҳ�����
	 * @param reportElement ��ӡԪ��
	 * @throws Exception
	 */
	public void addPrintElementToReport(ReportElement reportElement) throws Exception  {
		try {
		    pageLst.get(0).addElementToPage(reportElement);
		} catch (Exception ex) {
			ex.printStackTrace();
			throw new Exception("��ӡԪ�ؼ���ʧ�ܣ���鿴���õĴ�ӡҳ����Ϣ�ʹ����pageNumber�������Ƿ��������Խ������");
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
		
		TextElement textElement = new TextElement("��˹�ٷ�������",290.0, 348.0, 400.0, 128.0);
		
		textElement.textAlignment = ReportElement.TEXT_ALIGN.Right;
		textElement.verticalAlignment = ReportElement.VERTICAL_ALIGN.Top;
		
		TextElement textElement01 = new TextElement("asdgfa�������ķ� ˮ��ѹػ�����ż����ż uyerbuhgb ���������������ķ��չ�����",00.0, 148.0);
		
		textElement01.textAlignment = ReportElement.TEXT_ALIGN.Center;
		textElement01.verticalAlignment = ReportElement.VERTICAL_ALIGN.Middle;
		//textElement01.fontName = "�����п�";
		textElement01.backcolor = "#fff000";
		textElement01.size = 24;
		PrintReport printReport = new PrintReport("���Դ�ӡ����",2,500,400);
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
