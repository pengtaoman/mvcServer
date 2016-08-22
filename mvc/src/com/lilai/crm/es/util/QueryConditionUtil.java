package com.lilai.crm.es.util;

import java.util.Arrays;

import org.elasticsearch.index.query.BoolQueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;

public class QueryConditionUtil {
	
	private static String[] BuildQuery(String queryString) {
		
		String cnAndDi = "[^(0-9\\u4e00-\\u9fa5)]";
		String cnAndNum = queryString.replaceAll(cnAndDi, " ");
		char[] chr = cnAndNum.toCharArray();
		String[] priArr = new String[queryString.length()];
		int inx = 0;
		for (char ch : chr) {
			// if (c == ' ') { //数字会连
			// continue;
			// }
			if (inx > 0 && priArr[inx - 1].matches("[(0-9)]\\d*") && Character.isDigit(ch)) {
				priArr[inx - 1] = priArr[inx - 1] + ch;
				continue;
			} else {
				priArr[inx] = String.valueOf(ch);
				inx++;
			}

		}
		System.out.println(Arrays.toString(priArr));
		return priArr;
	}
	
	public static BoolQueryBuilder BoolQueryBuilder(String field, String queryString) {
		
		BoolQueryBuilder boolQueryBuilder = QueryBuilders.boolQuery();
		String[] qStr = BuildQuery(queryString);
		for (String qs : qStr) {
			if (qs != null && !"".equals(qs.trim())) {
				boolQueryBuilder.must(QueryBuilders.termQuery(field, qs));
			}
		}
		return boolQueryBuilder;
	}
}
