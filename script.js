$(document).ready(function () { 

var proteinEl = $("proteinEl");
var veggiesEl = $("veggieEl");
var spicesEl = $("spicesEl");
var carbsEl = $("carbsEl");
var findEl = $("findEl");

// when user clicks findEl button, display the first three options
findEl.on("click", function() {
    var recipeURL = "http://www.recipepuppy.com/api/?i=" + proteinEl.val() + veggiesEl.val() + spicesEl.val() + carbsEl.val();
    $.ajax({
        url: recipeURL,
        method: 'GET',
      }).then(function(response) {
        console.log(response);
      });
// when user clicks next, display the next 3 options

// when the user selects an option, display
});









var imageScroll = $("#imageScroll");
    var pexelUrl = "https://cors-anywhere.herokuapp.com/https://api.pexels.com/v1/search?query=food&per_page=15&page=1"

    // https://cors-anywhere.herokuapp.com/https://api.pexels.com/v1/search?query=example+query&per_page=15&page=1

    $.ajax({
      url: pexelUrl,
      headers: {
        'Authorization': '563492ad6f917000010000012e154557ed544fe39097059286f8e737',
        'Content-Type': 'application/json'
      },
      method: 'GET'
    }).then(function (data) {
      console.log(data);
    })

});