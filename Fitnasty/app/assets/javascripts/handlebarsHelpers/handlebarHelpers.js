Handlebars.registerHelper('getuser', function(options) {
  return new Handlebars.SafeString(options.fn(options.data.root.users[$(options.data.root.challenges).index(this)]));
});

Handlebars.registerHelper('tagsHelper', function(options){
    var ret = "<div class='tags'> Tags: "
  for(var i = 0; i < this.tags.length; i++) {
        var tag_word = this.tags[i].name
        var link = "/challenges/search/" + tag_word
        ret = ret + "<a href = " + link + ">" + tag_word + "</a>" + " ";
  }
    return ret + "</div>"
});

Handlebars.registerHelper( "checkStatus", function(options) {
  console.log(this)
  if (this.accepted && this.completed === false)
  {
    console.log(this.completed)
    return "<div class = 'lifecycle accepted'> </div> <div class = 'send_to_friend'> </div>"
  }
  else if (this.accepted && this.completed)
  {
      return "<div class = 'lifecycle completed'> </div> <div class = 'send_to_friend'> </div>"
  }
  else if (this.accepted === false){
      return "<div class = 'lifecycle not_accepted'> </div> <div class = 'send_to_friend'> </div>"
  }
});
