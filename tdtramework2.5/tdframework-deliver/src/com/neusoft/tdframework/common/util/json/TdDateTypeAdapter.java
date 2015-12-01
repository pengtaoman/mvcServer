package com.neusoft.tdframework.common.util.json;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

import com.google.gson.TypeAdapter;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonToken;
import com.google.gson.stream.JsonWriter;


public class TdDateTypeAdapter extends TypeAdapter<Date> {

	private final String dateFormat;

	public TdDateTypeAdapter(String dateFormat) {
		this.dateFormat = dateFormat;
	}

	public void write(JsonWriter out, Date value) throws IOException {
		if (value == null || "".equals(value)) {
			out.nullValue();
		} else {
			Date date = (Date) value;
			SimpleDateFormat simpleDateFormat = new SimpleDateFormat(dateFormat);
			out.value(simpleDateFormat.format(date));
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
			SimpleDateFormat simpleDateFormat = new SimpleDateFormat(dateFormat);
			Date returnDate = null;
			try {
				returnDate = simpleDateFormat.parse(dateStr);
			} catch (Exception ex) {
				ex.printStackTrace();
			}
			return returnDate;
		}
	}

}
