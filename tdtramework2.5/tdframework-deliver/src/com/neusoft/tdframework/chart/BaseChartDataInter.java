/*
 * Created on 2005-1-4
 *
 * TODO To change the template for this generated file go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
package com.neusoft.tdframework.chart;

/**
 * @author mdj
 *
 * 基本画图数据接口 
 */
public interface BaseChartDataInter {
    public Comparable getRowName();
    public void   setRownName(Comparable rowName);
    public Number getColCount();
    public void   setColCount(Number colCount);
	public Comparable getCategoryName();
	public void  setCategoryName(Comparable categoryName);
}
