let timeLeft = 25 * 60;

let timerRunning = false;

let timerInterval = null;






function updateTimer(){


  let minutes =
    Math.floor(timeLeft / 60);



  let seconds =
    timeLeft % 60;



  document.getElementById("timer")
    .innerHTML =
    `${minutes}:${seconds
      .toString()
      .padStart(2,"0")}`;


}







function startTimer(){


  if(timerRunning)
    return;



  timerRunning = true;



  timerInterval =
    setInterval(()=>{


      timeLeft--;



      updateTimer();



      if(timeLeft <= 0){


        stopTimer();


        alert(
          "Timer finished!"
        );


      }


    },1000);



}







function stopTimer(){


  clearInterval(timerInterval);


  timerRunning=false;


}







function resetTimer(){


  stopTimer();



  let input =
    document.getElementById("timerInput");



  let minutes =
    Number(input.value);



  if(
    isNaN(minutes) ||
    minutes <= 0
  ){

    minutes = 25;

    input.value = 25;

  }



  timeLeft =
    minutes * 60;



  updateTimer();


}







document
  .getElementById("timerInput")
  .addEventListener(
    "change",
    function(){



      if(!timerRunning){



        let minutes =
          Number(this.value);



        if(
          !isNaN(minutes) &&
          minutes > 0
        ){


          timeLeft =
            minutes * 60;


          updateTimer();


        }



      }


    });






updateTimer();
