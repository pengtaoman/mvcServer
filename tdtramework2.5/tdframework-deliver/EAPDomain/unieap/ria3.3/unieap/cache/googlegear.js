dojo.require("unieap.global");
dojo.require("unieap.util.util");
dojo.provide("unieap.cache.googlegear");
/**
 * @declaredClass:
 * 		unieap.cache
 * @summary:
 * 		缓存操作底层接口,用于操作google gears
 * @example:
 * |<script type="text/javascript">
 * |	//判断google gears是否可用
 * |	var isCacheUsable=unieap.cache.isAvailable();
 * |	alert(isCacheUsable);
 * |</script>
 * @example:
 * |<script type="text/javascript">
 * |	//获得缓存在google gears中的总记录数
 * |	var totalCount=unieap.cache.getCount();
 * |</script>
 * @example:
 * |<script type="text/javascript">
 * |	//删除google gears中缓存的所有数据
 * |	unieap.cache.clear();
 * |</script>
 */
(function(){
	
	//gears中要创建的database的名字
	unieap.cache.DB_NAME = "com_neusoft_unieap_clientcache";
	//gears中要创建的table的名字
	unieap.cache.CODELIST_TABLE_NAME = "unieap_codelist_table";
	
	//gears db对象
	var _cache_db = null;


	//判断是否安装了goole gears插件
	unieap.cache._isInstalledGears = function() {
		if (window.google && google.gears) {
			return google.gears;
		}
		var factory = null;
		
		// Firefox
		if (typeof GearsFactory != 'undefined') {
			factory = new GearsFactory();
		} else {
			// IE
			try {
				factory = new ActiveXObject('Gears.Factory');
				if (factory.getBuildInfo().indexOf('ie_mobile') != -1) {
					factory.privateSetGlobalObject(this);
				}
			} catch (e) {
				// Safari
				if ((typeof navigator.mimeTypes != 'undefined')
						&& navigator.mimeTypes["application/x-googlegears"]) {
					factory = document.createElement("object");
					factory.style.display = "none";
					factory.width = 0;
					factory.height = 0;
					factory.type = "application/x-googlegears";
					document.documentElement.appendChild(factory);
				}
			}
		}
		if (!factory) {
			return null;
		}
		if (!window.google) {
			google = {};
		}
		if (!google.gears) {
			google.gears = {
				factory : factory
			};
		}
		return google.gears;
	}


	//初始化google gears的 database,创建一个db
	//如果用户没有安装googel gears提示用户安装,如果用户选择不安装,下次用户登入时
	unieap.cache._initDB = function() {
		if(!unieap.cache.isAvailable()){
			return null;
		}
		if (_cache_db) {
			return _cache_db;
		}
		try {
			_cache_db = google.gears.factory.create('beta.database');
			_cache_db.open(unieap.cache.DB_NAME);
			//_cache_db.execute('drop table '+unieap.cache.CODELIST_TABLE_NAME);
			_cache_db.execute("CREATE TABLE IF NOT EXISTS "
					+ unieap.cache.CODELIST_TABLE_NAME + "(key TEXT,value TEXT,timestamp INT)");
			_cache_db.execute("CREATE UNIQUE INDEX IF NOT EXISTS key_index"
					+ " ON " + unieap.cache.CODELIST_TABLE_NAME + " (key)");
		} catch (e) {
			//alert("必须设置Google Gears可以运行!");
			_cache_db=null;
		}
		return _cache_db;
	}

	/**
	 *@summary:
	 * 		判断goole gears是否可用
	 * @description:
	 * 		如果gears没有安装或者用户在gloabal.js中设置unieap.global.isUseClientCache为false，
	 * 		程序返回的也为false
	 */
	unieap.cache.isAvailable=function(){
		var topWin = unieap.getTopWin();
		topWin = topWin.unieap && topWin || window;
		return unieap.global.isUseClientCache && topWin.unieap.cache._isInstalledGears()!=null;
	}

	//清除gears中codelist_table表的所有记录
	/**
	 *@summary:
	 * 		清除gears中codelist_table表的所有记录
	 * @example:
	 * |<script>
	 * |	unieap.cache.clear();
	 * |</script> 	
	 * 通过unieap的debug工具查看缓存数据是否被清空	
	 */
	unieap.cache.clear = function() {
		var topWin = unieap.getTopWin();
		topWin = topWin.unieap && topWin || window;
		var db = topWin.unieap.cache._initDB();
		if (db == null) {
			return;
		}
		db.execute("DELETE FROM " + unieap.cache.CODELIST_TABLE_NAME);
	}

	//往codelist_table表中插入数据
	//unieap.cache.put('name','neusoft');
	//如果不设置timestamp,timestamp值为默认为1
	/**
	 *@summary:
	 * 		往codelist_table表中插入数据
	 * @param：
	 * 		{string} key  
	 * @param：
	 * 		{string} value 
	 * @param：
	 * 		{string} timestamp   
	 * @example:
	 * |<script>
	 * |	var value = "[
	 * |		{CODEVALUE:1,CODENAME:'汉族'},
	 * |		{CODEVALUE:2,CODENAME:'回族'},
	 * |		{CODEVALUE:3,CODENAME:'白族'}
	 * |	]";
	 * |	unieap.cache.put("dept",value,String(new Date().getTime()));
	 * |</script> 
	 * 通过unieap的debug工具查看缓存数据是否被清空
	 */
	unieap.cache.put = function(key, value,timestamp) {
		var topWin = unieap.getTopWin();
		topWin = topWin.unieap && topWin || window;
		var db = topWin.unieap.cache._initDB();
		if (db == null) {
			return;
		}
		db.execute("REPLACE INTO " + unieap.cache.CODELIST_TABLE_NAME
				+ " VALUES (?,?,?)", [key, value,timestamp||1]);
	}

	//往codelist_table表中插入数据
	//unieap.cache.putMultiple(['name','age'],['neusoft',20]);
	//如果不设置timestamp,timestamp值为默认为1
	unieap.cache.putMultiple = function(keys, values,timestamps) {
		var topWin = unieap.getTopWin();
		topWin = topWin.unieap && topWin || window;
		var db = topWin.unieap.cache._initDB();
		if (db == null) {
		
			return;
		}
		db.execute("BEGIN TRANSACTION");
		var _stmt = "REPLACE INTO " + unieap.cache.CODELIST_TABLE_NAME
				+ " VALUES (?, ?,?)";
		for (var i = 0,j = 0,k=0, key, value,timestamp; (key = keys[i++]) && (value = values[j++])&&(timestamp=timestamps&&timestamps[k++]||1);) {
		
			db.execute(_stmt, [key, value,timestamp]);
		}
		db.execute("COMMIT TRANSACTION");
	}

	//从codelist_table表中获取数据
	////unieap.cache.get('name')=>'neusoft'
	unieap.cache.get = function(key) {
		var topWin = unieap.getTopWin();
		topWin = topWin.unieap && topWin || window;
		var db = topWin.unieap.cache._initDB();
		var value = null;
		if (db == null) {
			return value;
		}
		var rs = db.execute("SELECT value FROM " + unieap.cache.CODELIST_TABLE_NAME
				+ " WHERE key = ?", [key]);
		while (rs.isValidRow()) {
			value = rs.field(0);
			rs.next();
		}
		rs.close();
		return value;
	}

	//删除codelist_table表中的一条记录
	//unieap.cache.remove('name')=>key为name的信息被删除了
	unieap.cache.remove = function(key) {
		var topWin = unieap.getTopWin();
		topWin = topWin.unieap && topWin || window;
		var db = topWin.unieap.cache._initDB();
		if (db == null) {
			return;
		}
		db.execute("DELETE FROM " + unieap.cache.CODELIST_TABLE_NAME
				+ " WHERE key = ?", [key]);
	}

	//获取codelist_table表中的所有keys值
	unieap.cache.getKeys = function(){
		var topWin = unieap.getTopWin();
		topWin = topWin.unieap && topWin || window;
	    var db = topWin.unieap.cache._initDB();
		var value = [];
		if (db == null) {
			return null;
		}
		var rs = db.execute("SELECT key FROM " + unieap.cache.CODELIST_TABLE_NAME);
		while (rs.isValidRow()) {
			value.push(rs.field(0));
			rs.next();
		}
		rs.close();
		return value;
	}

	//获取codelist_table表中的总记录数
	unieap.cache.getCount = function() {
		var db = unieap.cache._initDB();
		if (db == null) {
			return null;
		}
		var rs = db.execute("SELECT count(*) FROM " + unieap.cache.CODELIST_TABLE_NAME);
		return rs.field(0);
	}

	//获取codelist_table表中所有记录的timestamp
	//返回值为一个object,格式为obj[key]=timestamp
	//查找的时间戳大于2649600000,也就是大于1970年1月1日
	unieap.cache.getAllTimeStamps=function(){
		var topWin = unieap.getTopWin();
		topWin = topWin.unieap && topWin || window;
		var db = topWin.unieap.cache._initDB();
		if (db == null) {
			return null;
		}
		var rs = db.execute("SELECT key,timestamp FROM " + unieap.cache.CODELIST_TABLE_NAME+' WHERE timestamp>2649600000');
		var value={}
		while(rs.isValidRow()){
			value[rs.field(0)]=rs.field(1);
			rs.next();
		}
		return value;
	}
	
})();