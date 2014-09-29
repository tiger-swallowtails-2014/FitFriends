Handlebars.registerHelper('getuser', function(options) {
  return new Handlebars.SafeString(options.fn(options.data.root.users[$(options.data.root.challenges).index(this)]));
});

Handlebars.registerHelper('tagsHelper', function(options){
    var ret = "<div class='tags'> Tags: "
  for(var i = 0; i < options.data.root.challenges[$(options.data.root.challenges).index(this)].tagged.length; i++) {
        var tag_word = options.data.root.challenges[$(options.data.root.challenges).index(this)].tagged[i].name
        var link = "/challenges/search/" + tag_word
        ret = ret + "<a href = " + link + ">" + tag_word + "</a>" + " ";
  }
    return ret + "</div>"
});

