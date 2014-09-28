Handlebars.registerHelper('getuser', function(options) {
  return new Handlebars.SafeString(options.fn(options.data.root.users[$(options.data.root.challenges).index(this)]));
});