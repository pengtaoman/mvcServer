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
 * ������ͼ���ݼ��ӿ� 
 */
public interface BaseChartDataSetInter {
    public void addBaseChartData(BaseChartDataInter baseChartData);
    public Object getBaseChartData(int pos);
    public Object []getBaseChartDatas();
    public ArrayList getBaseDataSet();
}
