Handlebars.registerHelper('getuser', function(options) {
  return new Handlebars.SafeString(options.fn(options.data.root.users[$(options.data.root.challenges).index(this)]));
});

Handlebars.registerHelper('tagsHelper', function(options){
    var ret = "<div class='tags'> Tags: "
  for(var i = 0; i < this.tags.length; i++) {
        var tag_word = this.tags[i].name
        var link = "/challenges/search/" + tag_word
        ret = ret + "<a class='tag' href = " + link + ">" + tag_word + "</a>" + " ";
  }
    return ret + "</div>"
});

Handlebars.registerHelper( "checkStatus", function(options) {
  console.log(this)
  if (this.accepted && this.completed === false)
  {
    return "<button class = 'lifecycle accepted bootans'>Accepted!</button>"
  }
  else if (this.accepted && this.completed)
  {
      return "<button class = 'lifecycle completed bootans'>Completed!</button>"
  }
  else if (this.accepted === false){
      return "<button class = 'lifecycle not_accepted bootans'>Accept?</button>"
  }
});
