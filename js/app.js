// ===============================
// Calcabetter App Controls
// ===============================



function hideAllPages(){

  document.getElementById("calculatorPage").style.display = "none";

  document.getElementById("algebraPage").style.display = "none";

  document.getElementById("graphPage").style.display = "none";

}







function showCalculator(){

  hideAllPages();


  document.getElementById("calculatorPage").style.display = "block";


}








function showAlgebra(){

  hideAllPages();


  document.getElementById("algebraPage").style.display = "block";


}








function showGraph(){

  hideAllPages();


  document.getElementById("graphPage").style.display = "block";



  // Wait for canvas to become visible
  // then redraw graph

  setTimeout(function(){


    if(typeof drawGraph === "function"){

      drawGraph();

    }


  },100);


}








// ===============================
// Clock
// ===============================


function updateClock(){


  let now = new Date();


  let time =
    now.toLocaleTimeString(
      [],
      {
        hour:"2-digit",
        minute:"2-digit"
      }
    );


  let clock =
    document.getElementById("clock");



  if(clock){

    clock.innerText=time;

  }


}



setInterval(
  updateClock,
  1000
);


updateClock();








// ===============================
// Start Default Page
// ===============================


window.onload=function(){


  showCalculator();


};
