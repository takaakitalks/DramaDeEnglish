Titanium.UI.setBackgroundColor('#999');
Titanium.include("template.js");

var win = Titanium.UI.currentWindow;
var webView = Titanium.UI.createWebView(); 
var cacheFileName = 'entry.json';
var timeStamp = (new Date).getTime();
var query = 'SELECT * FROM xml WHERE url="http://drama-de-english-test.blogspot.com/feeds/posts/default#' + timeStamp + '"';

var cacheFilePath = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, cacheFileName)
Titanium.API.info(cacheFilePath);
Titanium.API.info(cacheFilePath.read());

// TODO(TakaakTalk): check update by time stamp interval.
if (cacheFilePath.read()) { 
    var entries = JSON.parse(cacheFilePath.read());
    if (entries.length) {
      webView.html = generateHtml(entries[0].title.content, entries[0].content.content);
    }else{
      webView.html = generateHtml(entries.title.content, entries.content.content);
    } 
} else {
  Titanium.Yahoo.yql(query, function(e) {
    try{
      var entries = e.data.feed.entry;
      if (entries.length) {
        webView.html = generateHtml(entries[0].title.content, entries[0].content.content);
      }else{
        webView.html = generateHtml(entries.title.content, entries.content.content);
      } 
      if (cacheFilePath.write(JSON.stringify(entries))) {
        //Titanium.API.info('saved entries in cache');
        data = JSON.parse(cacheFilePath.read());
      }; 
    } catch (error) {
      Titanium.API.error('記事の取得に失敗しました: ' + error);
    }
  });
}

win.add(webView);
