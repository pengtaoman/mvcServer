/*
 * Created on 2005-1-4
 *
 * TODO To change the template for this generated file go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
package com.neusoft.tdframework.chart;

/**
 * @author mdj
 * 柱形图数据类
 * 
 */
public final class BaseChartDataImpl implements BaseChartDataInter {

    /* (non-Javadoc)
     * @see com.neusoft.crm.retain.common.chart.BaseChartDataInter#getRowName()
     */
    private Comparable rowName=null;
    private Number colCount=null;
	private Comparable categoryName=null;
    
    public BaseChartDataImpl()
    {
        
    }
    public BaseChartDataImpl(Comparable rowName, Number colCount)
    {
        this.rowName = rowName;
        this.colCount = colCount;
    }
	public BaseChartDataImpl(Comparable rowName,Comparable categoryName,Number colCount)
	{
		this.rowName = rowName;
		this.categoryName = categoryName;
		this.colCount = colCount;
	}
    public Comparable getRowName() {
        // TODO Auto-generated method stub
        return this.rowName;
    }

    /* (non-Javadoc)
     * @see com.neusoft.crm.retain.common.chart.BaseChartDataInter#setRownName(java.lang.Comparable)
     */
    public void setRownName(Comparable rowName) {
        // TODO Auto-generated method stub
        this.rowName = rowName;
    }

    /* (non-Javadoc)
     * @see com.neusoft.crm.retain.common.chart.BaseChartDataInter#getColCount()
     */
    public Number getColCount() {
        // TODO Auto-generated method stub
        return colCount;
    }

    /* (non-Javadoc)
     * @see com.neusoft.crm.retain.common.chart.BaseChartDataInter#setColCount(java.lang.Number)
     */
    public void setColCount(Number colCount) {
        // TODO Auto-generated method stub
        this.colCount = colCount;
    }

	/**
	 * @return
	 */
	public Comparable getCategoryName() {
		return categoryName;
	}

	/**
	 * @param comparable
	 */
	public void setCategoryName(Comparable comparable) {
		categoryName = comparable;
	}

}
