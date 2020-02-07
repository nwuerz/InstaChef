document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems, options);
  });

  // Or with jQuery

  $(document).ready(function(){
    $('select').formSelect();
  });


//   function startQuiz() {
//     var x = document.getElementById("beg");
//     var y = document.getElementById("question1")
//     if (x.style.display == "none") {
//         x.style.display = "block";
//         y.style.display = "none";
//     }
//     else {
//         x.style.display = "none";
//         y.style.display = "block";
//         setTime();
//     }
//   }