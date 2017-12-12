
(function() {
var proto = (("https:" == document.location.protocol) ? "https:" : "http:");
var url = proto + "//s3-eu-west-1.amazonaws.com/sc-widgets/scLabelLoader.js?";
url += new Date().getTime();
document.write(unescape("%3Cscript src='" + url + "' type='text/javascript' charset='utf-8'%3E%3C/script%3E"));
})();


