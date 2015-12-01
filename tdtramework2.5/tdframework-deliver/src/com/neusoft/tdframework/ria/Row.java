package com.neusoft.tdframework.ria;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import com.neusoft.unieap.ria.IRow;

import net.sf.json.JSONObject;

public class Row implements IRow {

	 public Row()
	    {
	        index = -1;
	        rowObj = new JSONObject();
	    }

	    public Row(Map map)
	    {
	        index = -1;
	        rowObj = new JSONObject();
	        if(null == map)
	            map = new HashMap();
	        rowObj.putAll(map);
	    }

	    public Row(JSONObject jsonobject, int i)
	    {
	        index = -1;
	        rowObj = new JSONObject();
	        rowObj = jsonobject;
	        index = i;
	    }

	    public JSONObject getRowObj()
	    {
	        return rowObj;
	    }

	    public boolean isNewModify()
	    {
	        return checkStatus(1);
	    }

	    public boolean isModify()
	    {
	        return checkStatus(3);
	    }

	    private boolean checkStatus(int i)
	    {
	        if(!rowObj.containsKey("_t"))
	            return false;
	        int j = Integer.parseInt(rowObj.get("_t").toString());
	        return j == i;
	    }

	    public int getRowStatus()
	    {
	        if(!rowObj.containsKey("_t"))
	        {
	            return 2;
	        } else
	        {
	            int i = Integer.parseInt(rowObj.get("_t").toString());
	            return i;
	        }
	    }

	    public boolean isSeleted()
	    {
	        if(!rowObj.containsKey("_s"))
	        {
	            return false;
	        } else
	        {
	            boolean flag = rowObj.getBoolean("_s");
	            return flag;
	        }
	    }

	    public boolean isModify(String s)
	    {
	        if(!isModify())
	            return false;
	        JSONObject jsonobject = (JSONObject)rowObj.get("_o");
	        return jsonobject.containsKey(s);
	    }

	    public Object getItemValue(String s)
	    {
	        if(!rowObj.containsKey(s))
	            return null;
	        else
	            return rowObj.get(s);
	    }

	    public void setItemValue(String s, Object obj)
	    {
	        rowObj.put(s, obj);
	    }

	    public Object getOrigValue(String s)
	    {
	        if(!isModify())
	            return null;
	        JSONObject jsonobject = (JSONObject)rowObj.get("_o");
	        if(!jsonobject.containsKey(s))
	            return null;
	        else
	            return jsonobject.get(s);
	    }

	    public void setSelected(boolean flag)
	    {
	        rowObj.put("_s", Boolean.valueOf(flag));
	    }

	    public int getRowIndex()
	    {
	        return index;
	    }

	    public void setRowStatus(int i)
	    {
	        rowObj.put("_t", new Integer(i));
	    }

	    public void resetUpdate()
	    {
	        if(rowObj.containsKey("_t"))
	        {
	            String s = "_t";
	            rowObj.remove(s);
	        }
	        if(rowObj.containsKey("_s"))
	        {
	            String s1 = "_s";
	            rowObj.remove(s1);
	        }
	        if(rowObj.containsKey("_o"))
	        {
	            String s2 = "_o";
	            rowObj.remove(s2);
	        }
	    }

	    public boolean getBoolean(String s)
	    {
	        return rowObj.getBoolean(s);
	    }

	    public Date getDate(String s)
	    {
	        return new Date(getLong(s));
	    }

	    public double getDouble(String s)
	    {
	        return rowObj.getDouble(s);
	    }

	    public float getFloat(String s)
	    {
	        return Float.parseFloat(getDouble(s) + "");
	    }

	    public int getInt(String s)
	    {
	        return rowObj.getInt(s);
	    }

	    public String getString(String s)
	    {
	        return rowObj.getString(s);
	    }

	    public long getLong(String s)
	    {
	        return rowObj.getLong(s);
	    }

	    public void setBoolean(String s, boolean flag)
	    {
	        setItemValue(s, Boolean.valueOf(flag));
	    }

	    public void setDate(String s, Date date)
	    {
	        setItemValue(s, new Long(date.getTime()));
	    }

	    public void setDouble(String s, double d)
	    {
	        setItemValue(s, new Double(d));
	    }

	    public void setFloat(String s, float f)
	    {
	        setItemValue(s, new Float(f));
	    }

	    public void setInt(String s, int i)
	    {
	        setItemValue(s, new Integer(i));
	    }

	    public void setString(String s, String s1)
	    {
	        setItemValue(s, s1);
	    }

	    public void setLong(String s, long l)
	    {
	        setItemValue(s, new Long(l));
	    }

	    private int index;
	    private JSONObject rowObj;
		public JSONObject getJSONObject() {
			// TODO Auto-generated method stub
			return rowObj;
		}

}
