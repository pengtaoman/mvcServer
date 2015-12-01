/*
 * Created on 2005-1-6
 *
 * TODO To change the template for this generated file go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
package com.neusoft.tdframework.chart;

import java.util.StringTokenizer;

/**
 * @author mdj
 *
 * TODO To change the template for this generated type comment go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
public final class ChartData {
    private String [][]args = {{"<","&lt;"},{">","&gt;"}};
    
    private String chartFileName = null;
    private String chartMap = null;
    public ChartData()
    {
        
    }
    public ChartData(String chartFileName, String chartMap)
    {
        this.chartFileName = chartFileName;
        this.chartMap = chartMap;
    }
    /**
     * @return Returns the chartFileName.
     */
    public String getChartFileName() {
        return chartFileName;
    }
    /**
     * @param chartFileName The chartFileName to set.
     */
    public void setChartFileName(String chartFileName) {
        this.chartFileName = chartFileName;
    }
    /**
     * @return Returns the chartMap.
     */
    public String getChartMap() {
        return chartMap;
    }
    /**
     * @param chartMap The chartMap to set.
     */
    public void setChartMap(String chartMap) {
        this.chartMap = chartMap;
    }	
    public String getChanageChartMap()
    {
        if( this.chartMap == null)return null;
        return changeString(args[1],changeString(args[0],chartMap,0),1);
    }
    private String changeString(String []sepArgs, String mainStr, int pos)
    {
        StringTokenizer tokens = new StringTokenizer(mainStr,sepArgs[0]);
        StringBuffer buf = new StringBuffer();
        while( tokens.hasMoreElements())
        {
            if( pos == 0)
                buf.append(sepArgs[1]);
            buf.append((String)tokens.nextElement());
            if( pos == 1)
                buf.append(sepArgs[1]);
        }
        return buf.toString();
    }
    public static void  main(String []args)
    {
        ChartData data = new ChartData();
        data.setChartMap("<test>test>");
        
        System.out.println(data.getChanageChartMap());
    }
}
