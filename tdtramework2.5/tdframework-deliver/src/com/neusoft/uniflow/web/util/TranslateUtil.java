package com.neusoft.uniflow.web.util;

import java.util.Hashtable;
import java.util.Vector;

import com.neusoft.uniflow.api.def.NWActDef;

public class TranslateUtil {
	public static int[] translateSVGpoint(int[] pointXY) {
		int minXY = 0;
		for (int i = 0; i < pointXY.length; i++) {
			if (pointXY[i] < minXY)
				minXY = pointXY[i];
		}
		if (minXY < 0) {
			for (int i = 0; i < pointXY.length; i++) {
				pointXY[i] = pointXY[i] - minXY + 50;
			}
		} else {
			for (int i = 0; i < pointXY.length; i++) {
				pointXY[i] = pointXY[i] + 50;
			}
		}
		return pointXY;
	}

	public static int getSVGpointMaxXY(int[] pointXY) {
		int maxXY = 0;
		for (int i = 0; i < pointXY.length; i++) {
			if (pointXY[i] > maxXY)
				maxXY = pointXY[i];
		}
		return maxXY + 150;
	}

	public static Hashtable translateSVGActivity(Vector activities) {
		Hashtable newActXY = new Hashtable();
		int minX = 0;
		int minY = 0;
		for (int i = 0; i < activities.size(); i++) {
			NWActDef actdef = (NWActDef) activities.elementAt(i);
			String actPosition = actdef.getPosition();
			String pos[] = actPosition.split(",");
			int x = Integer.valueOf(pos[0]).intValue();
			int y = Integer.valueOf(pos[1]).intValue();
			if (x < minX)
				minX = x;
			if (y < minY)
				minY = y;
		}
		for (int i = 0; i < activities.size(); i++) {
			NWActDef actdef = (NWActDef) activities.elementAt(i);
			String actPosition = actdef.getPosition();
			String pos[] = actPosition.split(",");
			int x = Integer.valueOf(pos[0]).intValue();
			int y = Integer.valueOf(pos[1]).intValue();
			if (minX < 0)
				x = x - minX + 50;
			else
				x = x + 50;
			if (minY < 0)
				y = y - minY + 50;
			else
				y = y + 50;
			String value = String.valueOf(x) + "," + String.valueOf(y) + ","
					+ String.valueOf(actdef.getType());
			newActXY.put(actdef.getID(), value);
		}

		return newActXY;
	}
}
