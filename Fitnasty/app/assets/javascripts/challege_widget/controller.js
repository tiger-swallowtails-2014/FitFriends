function ChallengeWidget() {
  var self = this;
  this.whenDone = function(data) {
    ChallengeFactory.createChallenges(data)
    var formatted_data = {challenges: challengeHolder.challenges}
    ChallengeWidgetView('#challenges-container .challenges_river', formatted_data)
    self.bindListener();
    self.chartBuilder(challengeHolder.challenges)
  }

  this.bindListener = function(){
    $('.lifecycle').on('click', function(e){
      e.preventDefault();
      var self = this;
      var challenge_num = $(this).parent().attr('id')
      $.ajax({
        type: "POST",
        url: "/accept_challenge",
        data: {challenge_id: challenge_num}
      }).done(function(data){
        console.log($(self).text(data.texts))
        console.log($(self).attr('class', "lifecycle" + " " + data.answer))
      })
    })
  }

  this.chartBuilder = function(chartsToBuild) {
    for(var i = 0; i < chartsToBuild.length; i++){
      var ctx = $("#myChart" + "-" + chartsToBuild[i].id).get(0).getContext("2d");
      var chart_values = [
    {
        value: 1,
        color:"#4486f7",
        highlight: "#FF5A5E",
        label: "Accepted"
    },
    {
        value: 2,
        color: "#0aa25a",
        highlight: "#5AD3D1",
        label: "Completed"
    },
    {
        value: 7,
        color: "#d74136",
        highlight: "#FFC870",
        label: "Pending"
    }
]

  var options = {
      //Boolean - Whether we should show a stroke on each segment
      segmentShowStroke : true,
      //String - The colour of each segment stroke
      segmentStrokeColor : "#fff",
      //Number - The width of each segment stroke
      segmentStrokeWidth : 2,
      //Number - The percentage of the chart that we cut out of the middle
      percentageInnerCutout : 50, // This is 0 for Pie charts
      //Number - Amount of animation steps
      animationSteps : 100,
      //String - Animation easing effect
      animationEasing : "easeOutBounce",
      //Boolean - Whether we animate the rotation of the Doughnut
      animateRotate : true,
      //Boolean - Whether we animate scaling the Doughnut from the centre
      animateScale : false,
      //String - A legend template
      legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"
  }
    console.log(chartsToBuild[i].chart_stats.accepted)
        chart_values[0].value = chartsToBuild[i].chart_stats.accepted_number
        chart_values[1].value = chartsToBuild[i].chart_stats.completed_number
        chart_values[2].value = chartsToBuild[i].chart_stats.pending_number
        var myPieChart = new Chart(ctx).Pie(chart_values, options)
    }
  }
}

