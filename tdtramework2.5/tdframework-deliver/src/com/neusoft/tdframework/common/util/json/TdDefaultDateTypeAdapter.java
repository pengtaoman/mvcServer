package com.neusoft.tdframework.common.util.json;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import com.google.gson.Gson;
import com.google.gson.TypeAdapter;
import com.google.gson.TypeAdapterFactory;
import com.google.gson.reflect.TypeToken;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonToken;
import com.google.gson.stream.JsonWriter;

public class TdDefaultDateTypeAdapter extends TypeAdapter<Date> {

	public TdDefaultDateTypeAdapter() {
	}

	public void write(JsonWriter out, Date value) throws IOException {
		if (value == null || "".equals(value)) {
			out.nullValue();
		} else {
			Date date = (Date) value;
			out.value(date.getTime());
		}
	}

	public Date read(JsonReader reader) throws IOException {

		JsonToken jk = reader.peek();
		if (jk == JsonToken.NULL) {

			reader.nextNull();
			return null;
		} else {
			String dateStr = reader.nextString();
			if (dateStr == null || "".equals(dateStr)) {
				return null;
			}

			Date returnDate = null;
			try {
				returnDate = new Date(Long.valueOf(dateStr));
			} catch (Exception ex) {
				ex.printStackTrace();
			}
			return returnDate;
		}
	}

}
