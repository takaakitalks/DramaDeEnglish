Titanium.UI.setBackgroundColor('#999');
Titanium.include("template.js");

var win = Titanium.UI.currentWindow;
var webView = Titanium.UI.createWebView();
var query = 'SELECT * FROM xml WHERE url="http://drama-de-english-test.blogspot.com/feeds/posts/default"';

var getNewEntry = function(){
	Titanium.Yahoo.yql(query, function(e){
		try{
			var entries = e.data.feed.entry;
			var newentry;
			if (entries.length) {
				newentry = entries[0]
			}else{
				newentry = entries;
			}
			Titanium.API.info(newentry.content.content);
			webView.html = htmlTemplate(newentry.title.content, newentry.content.content);
		} catch (error) {
			Titanium.API.error('YQL failed: ' + error);
		}
	});
};

win.add(webView);
