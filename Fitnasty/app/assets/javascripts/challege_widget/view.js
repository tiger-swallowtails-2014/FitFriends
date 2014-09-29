var ChallengeWidgetView = function(whereToShow, formattedObject){
	$(whereToShow).empty()
  $(whereToShow).append(HandlebarsTemplates['Challenge_Widget/index'](formattedObject))
}