/*
 * Created on 2005-1-4
 *
 * TODO To change the template for this generated file go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
package com.neusoft.tdframework.chart;

import java.util.ArrayList;

/**
 * @author mdj
 *
 * 
 * 柱形图数据集实现
 */
public final class BaseChartDataSetImpl implements BaseChartDataSetInter {

    private ArrayList barDataSet=null;

    public void addBaseChartData(BaseChartDataInter baseChartData) {
        if( barDataSet == null )barDataSet=new ArrayList();
        barDataSet.add(baseChartData);
    }

    public Object getBaseChartData(int pos) {
        if( barDataSet == null || barDataSet.size() <= pos )return null;
        return barDataSet.get(pos);
    }

    public Object[] getBaseChartDatas() {
        if( barDataSet == null ) return null;
        return this.barDataSet.toArray();
    }

    public ArrayList getBaseDataSet() {
        return barDataSet;
    }

}
