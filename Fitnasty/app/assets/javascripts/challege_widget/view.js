var ChallengeWidgetView = function(whereToShow, formattedObject){
  $(whereToShow).append(HandlebarsTemplates['Challenge_Widget/index'](formattedObject))
}