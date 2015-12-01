dojo.addOnLoad(function() {
	var store = unieap.getDataStore('empDataStore', 'dataCenter', false);
//	store.getRowSet().getData()[1]["_s"] = true;
	logger.profile("grid");
	dojo.parser.parse();
	logger.profile("grid");
	dp.SyntaxHighlighter.HighlightAll('code');
});
function getCascade(item) {
	if (item.CODEVALUE==11) {
		return "c2";
	} else if (item.CODEVALUE==12) {
		return "c1";
	}
	return null;
}