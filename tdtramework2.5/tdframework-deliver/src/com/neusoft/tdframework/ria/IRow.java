package com.neusoft.tdframework.ria;

import java.util.Date;

import net.sf.json.JSONObject;

public interface IRow {

	 public abstract boolean isNewModify();

	    public abstract boolean isModify();

	    public abstract int getRowStatus();

	    public abstract boolean isSeleted();

	    public abstract boolean isModify(String s);

	    public abstract Object getItemValue(String s);

	    public abstract void setItemValue(String s, Object obj);

	    public abstract Object getOrigValue(String s);

	    public abstract void setSelected(boolean flag);

	    public abstract int getRowIndex();

	    public abstract void setRowStatus(int i);

	    public abstract void resetUpdate();

	    public abstract int getInt(String s);

	    public abstract float getFloat(String s);

	    public abstract double getDouble(String s);

	    public abstract Date getDate(String s);

	    public abstract String getString(String s);

	    public abstract boolean getBoolean(String s);

	    public abstract long getLong(String s);

	    public abstract void setInt(String s, int i);

	    public abstract void setFloat(String s, float f);

	    public abstract void setDouble(String s, double d);

	    public abstract void setDate(String s, Date date);

	    public abstract void setString(String s, String s1);

	    public abstract void setBoolean(String s, boolean flag);

	    public abstract void setLong(String s, long l);
	    
	    public abstract JSONObject getJSONObject(); 
}
