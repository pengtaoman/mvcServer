package com.neusoft.uniflow.web.util;

import java.awt.Color;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Vector;

import javax.servlet.http.HttpSession;

import org.jfree.chart.ChartFactory;
import org.jfree.chart.ChartRenderingInfo;
import org.jfree.chart.ChartUtilities;
import org.jfree.chart.JFreeChart;
import org.jfree.chart.axis.NumberAxis;
import org.jfree.chart.entity.StandardEntityCollection;
import org.jfree.chart.labels.StandardCategoryItemLabelGenerator;
import org.jfree.chart.plot.CategoryPlot;
import org.jfree.chart.plot.PlotOrientation;
import org.jfree.chart.renderer.category.BarRenderer3D;
import org.jfree.chart.servlet.ServletUtilities;
import org.jfree.data.category.CategoryDataset;
import org.jfree.data.category.DefaultCategoryDataset;

import com.neusoft.org.NWOrg;
import com.neusoft.uniflow.api.NWSession;
import com.neusoft.uniflow.api.mgmt.NWOperationInfo;
import com.neusoft.uniflow.api.mgmt.service.NWOperationFilter;
import com.neusoft.uniflow.api.mgmt.service.NWOperationManager;
import com.neusoft.uniflow.common.NWMessageConst;

public class EngineChartFactory {

	private static String orgname = null;

	public static String generateEngineChart(String dataSrc, String title,
			HttpSession session, PrintWriter pw, Date begin, Date end) {
		//htttpsession = session;
		String filename = null;
		try {
			CategoryDataset dataset = null;
			JFreeChart chart = null;
			dataset = getMessageDataSet(begin, end,session);
			String pictitle = MessageUtil.getString("workflow.system.enginecap.bytime.pic.title", session);
			String xx= MessageUtil.getString("workflow.system.enginecap.time", session);
			chart = ChartFactory.createBarChart3D(pictitle, xx, "",
					dataset, PlotOrientation.VERTICAL, true, false, false);
			chart.setBackgroundPaint(java.awt.Color.white);
			CategoryPlot plot = chart.getCategoryPlot();
			
			//chart.setTitle(new TextTitle(pictitle, new Font("Simson", Font.BOLD, 12)));
			plot.setForegroundAlpha(0.9f);
			NumberAxis verticalAxis = (NumberAxis)plot.getRangeAxis();
			verticalAxis.setStandardTickUnits(NumberAxis.createIntegerTickUnits());
						
			BarRenderer3D renderer = new BarRenderer3D();
			renderer.setWallPaint(Color.lightGray);
			renderer.setItemLabelGenerator(new StandardCategoryItemLabelGenerator());
			//renderer.setItemLabelFont(new Font("Simson", Font.PLAIN, 12));
			renderer.setItemLabelsVisible(true);
			plot.setRenderer(renderer);
			
			ChartRenderingInfo info = new ChartRenderingInfo(new StandardEntityCollection());
			filename = ServletUtilities.saveChartAsPNG(chart, 800, 600, info,session);
			ChartUtilities.writeImageMap(pw, filename, info, true);
			pw.flush();
		} catch (Exception ex) {
			//System.out.println("error:" + ex.getMessage());
		}
		return filename;
	}

	public static String generateOrgChart(String dataSrc, String title,
			HttpSession session, PrintWriter pw, String id) {
		//htttpsession = session;
		String filename = null;
		try {
			CategoryDataset dataset = null;
			JFreeChart chart = null;
			dataset = getOrgDataSet(id,session);
			String pictitle = MessageUtil.getString("workflow.system.enginecap.bypsn.pic.title", session);
			String xx= MessageUtil.getString("workflow.system.enginecap.psn", session);
			String yy= MessageUtil.getString("workflow.system.enginecap.tasknum", session);
			chart = ChartFactory.createBarChart3D(pictitle, xx,
					yy, dataset, PlotOrientation.VERTICAL, true, false,
					false);
			chart.setBackgroundPaint(java.awt.Color.white);
			CategoryPlot plot = chart.getCategoryPlot();
			//chart.setTitle(new TextTitle(pictitle, new Font("Simson", Font.BOLD, 12)));
	        NumberAxis numberaxis = (NumberAxis)plot.getRangeAxis();//取得该类图形的范围数字轴,指纵坐标
	        //numberaxis.setTickLabelFont(new Font("Simson",Font.PLAIN,12));//设置纵坐标的字体,风格，大小
	        numberaxis.setStandardTickUnits(NumberAxis.createIntegerTickUnits());//设置纵坐标以标准整形为单位	        
			BarRenderer3D renderer = new BarRenderer3D();
			renderer.setItemLabelGenerator(new StandardCategoryItemLabelGenerator());
			//renderer.setItemLabelFont(new Font("Simson", Font.PLAIN, 12));
			renderer.setItemLabelsVisible(true);
			plot.setRenderer(renderer);
			ChartRenderingInfo info = new ChartRenderingInfo(
					new StandardEntityCollection());
			filename = ServletUtilities.saveChartAsPNG(chart, 800, 600, info,
					session);
			ChartUtilities.writeImageMap(pw, filename, info, false);
			pw.flush();
		} catch (Exception ex) {
			//System.out.println("error:" + ex.getMessage());
		}
		return filename;
	}

	private static CategoryDataset getMessageDataSet(Date begin, Date end,HttpSession session) {
		DefaultCategoryDataset dataset = new DefaultCategoryDataset();
		SimpleDateFormat df = new SimpleDateFormat("dd");
		long[] message = getMessage(begin, end);
		Date tmp = new Date();
		tmp.setTime(begin.getTime());
		Date tmp2 = new Date();
		for (int i = 0; i < message.length; i++) {
			dataset
					.addValue(message[i], MessageUtil.getString("workflow.system.enginecap.bytime.message", session), String
							.valueOf(df.format(tmp)));
			tmp2 = tmp;
			tmp = new Date();
			tmp.setTime(tmp2.getTime() + 24 * 60 * 60 * 1000);
		}
		return dataset;
	}

	private static CategoryDataset getOrgDataSet(String id,HttpSession session) {
		DefaultCategoryDataset dataset = new DefaultCategoryDataset();
		int[] message = getMessage(id);
        
		for (int i=0;i<=13;i++){
			dataset.addValue(message[i], MessageUtil.getString("workflow.system.enginecap.bypsn.msg"+i, session), orgname);	
		}

		return dataset;
	}

	private static int[] getMessage(String id) {
		NWOperationManager engineOpt = null;
		int[] count = new int[14];
		NWSession nwsession = WorkflowManager.getSysNWSession();
		boolean flag = true;
		try {
			engineOpt = nwsession.getOperationManager();
			NWOperationFilter filter = engineOpt.getOperFilter();
			if (id != null && id.indexOf('p') > 0) {
				filter.setKind(NWOperationFilter.QUERY_PERSON);
				id = id.substring(0, id.indexOf('p'));
				filter.setPid(id);
			} else if (id != null && id.indexOf('r') > 0) {
				filter.setKind(NWOperationFilter.QUERY_ROLE);
				id = id.substring(0, id.indexOf('r'));
				filter.setRoleId(id);
				flag = false;
			}
			if (id != null) {
				Vector v = (Vector) (engineOpt.getResult());
				NWOrg org = WorkflowManager.getNWOrg();
				orgname = flag ? org.getPerson(id).getName() : org.getRole(id)
						.getName();

				int type = 0;
				NWOperationInfo info = null;
				for (int i = 0; i < v.size(); i++) {
					info = (NWOperationInfo) v.elementAt(i);
					type = info.getOperName();
					// System.out.println(type);
					switch (type) {

					case NWMessageConst.MR_CREATEANDSTARTPROCESSSUCCESS:
						count[0]++;
						break;
					case NWMessageConst.MR_ABORTPROCESSSUCCESS:
						count[1]++;
						break;
					case NWMessageConst.MR_SUSPENDPROCESSSUCCESS:
						count[2]++;
						break;
					case NWMessageConst.MR_RESUMEPROCESSSUCCESS:
						count[3]++;
						break;
					case NWMessageConst.MR_RESTARTPROCESSSUCCESS:
						count[4]++;
						break;
					case NWMessageConst.MR_COMPLETEPROCESSSUCCESS:
						count[5]++;
						break;

					case NWMessageConst.MR_OPENWORKITEMSUCCESS:
						count[6]++;
						break;
					case NWMessageConst.MR_CLOSEWORKITEMSUCCESS:
						count[7]++;
						break;
					case NWMessageConst.MR_COMPLETEWORKITEMSUCCESS:
						count[8]++;
						break;
					case NWMessageConst.MR_DELETEPROCESSSUCCESS:
						count[9]++;
						break;
					case NWMessageConst.MR_ROLLBACKACTIVITYSUCCESS:
						count[10]++;
						break;
					case NWMessageConst.MR_STARTPROCESSSUCCESS:
						count[11]++;
						break;
					case NWMessageConst.MR_COMPLETEACTIVITYSUCCESS:
						count[12]++;
						break;
					default:
						count[13]++;
						break;
					}
				}
			}
		} catch (Exception e) {
		}

		return count;
	}

	private static long[] getMessage(Date b, Date e) {
		NWOperationManager engineOpt = null;
		long[] message = null;
		NWSession nwsession = WorkflowManager.getSysNWSession();
		try {
			engineOpt = nwsession.getOperationManager();
			NWOperationFilter filter = engineOpt.getOperFilter();
			Date begin = b;
			Date end = e;
			int days = (int) ((e.getTime() - b.getTime()) / (24 * 60 * 60 * 1000));
			end.setTime(b.getTime() + 24 * 60 * 60 * 1000);
			message = new long[days + 1];
			for (int i = 0; i <= days; i++) {
				filter.setKind(NWOperationFilter.STAT_OPER);
				filter.setDates(begin, end);
				filter.setOper(-1);
				Long a = (Long) (engineOpt.getResult());
				message[i] = a.longValue();
				begin = new Date();
				begin.setTime(end.getTime());
				end.setTime(begin.getTime() + 24 * 60 * 60 * 1000);
			}
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return message;
	}

}
