let display = document.getElementById("display");
let old = document.getElementById("old");

let memory = 0;





function append(value){


  if(display.value === "Error"){

    display.value = "";

  }



  if(display.value === "0"){

    display.value = "";

  }



  display.value += value;


}






function clearDisplay(){

  display.value = "0";

  old.innerHTML = "";

}







function backspace(){


  if(display.value === "Error"){

    display.value = "0";

    return;

  }



  display.value =
    display.value.slice(0,-1);



  if(display.value === ""){

    display.value = "0";

  }


}








function toggleSquare(){


  if(
    display.value === "0" ||
    display.value === "Error"
  ){

    return;

  }


  display.value += "²";


}








function squareRoot(){


  if(
    display.value === "0" ||
    display.value === "Error"
  ){

    return;

  }


  display.value =
    "√" + display.value;


}









function calculate(){


  try{


    let equation = display.value;


    let formatted = equation;



    // Square root

    formatted = formatted.replace(
      /√(\d+(\.\d+)?)/g,
      "Math.sqrt($1)"
    );



    // Squared

    formatted = formatted.replace(
      /(\d+(\.\d+)?)²/g,
      "($1*$1)"
    );



    let answer = Function(
      "return " + formatted
    )();



    old.innerHTML = equation;



    display.value =
      Number(answer.toFixed(10));



    if(typeof saveCalculation === "function"){


      saveCalculation(
        equation,
        display.value
      );


    }



  }


  catch(error){


    console.log(error);


    display.value = "Error";


  }


}









// MEMORY


function memoryClear(){

  memory = 0;

}




function memoryRecall(){

  append(memory);

}




function memoryAdd(){

  memory += Number(display.value);

}




function memorySubtract(){

  memory -= Number(display.value);

}









// KEYBOARD


document.addEventListener(
  "keydown",
  function(e){



    let calculator =
      document.getElementById("calculatorPage");



    // Only allow calculator keys on calculator tab

    if(
      calculator.style.display === "none"
    ){

      return;

    }






    if(
      "0123456789+-*/().%"
        .includes(e.key)
    ){

      append(e.key);

    }





    if(e.key === "Enter"){

      calculate();

    }





    if(e.key === "Backspace"){

      backspace();

    }





    if(e.key === "Escape"){

      clearDisplay();

    }



  });
