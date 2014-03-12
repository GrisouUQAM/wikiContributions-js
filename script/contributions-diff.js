// Copyright VOGG 2013
function strip_tags(input, allowed) {
  // http://kevin.vanzonneveld.net
  allowed = (((allowed || "") + "").toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join(''); // making sure the allowed arg is a string containing only tags in lowercase (<a><b><c>)
  var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi, commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
  return input.replace(commentsAndPhpTags, '').replace(tags, function ($0, $1) {
    return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
  });
}

function getDiff(text1, text2) {
  var dmp = new diff_match_patch();
  var res = dmp.diff_main(strip_tags(text1), strip_tags(text2));
  dmp.diff_cleanupSemantic(res);
  $("#contr_value").text("Levenshtein distance value: " + dmp.diff_levenshtein(res));
  return dmp.diff_prettyHtml(res);
}
