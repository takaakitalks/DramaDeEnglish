var htmlTemplate = function(title, contents, opt_image) {
	var html = '<html><head></head><body>';
	html += '<div id="title">' + title + '</div>';
	html += '<div id="contents">' + contents + '</div>';
	html += '</body></html>';
	return html;
};
