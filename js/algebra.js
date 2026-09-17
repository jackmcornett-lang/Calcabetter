function solveEquation(){

  let input =
    document.getElementById("equation").value
      .replace(/\s/g,"");


  let solution =
    document.getElementById("solution");



  try{


    if(!input.includes("=")){

      solution.innerHTML =
        "Add an equals sign.";

      return;

    }



    let sides =
      input.split("=");



    let left =
      sides[0];


    let right =
      sides[1];



    let steps = [];



    steps.push(
      input
    );





    // Distribution

    left =
      distribute(left);



    right =
      distribute(right);



    if(left !== sides[0]){

      steps.push(
        "Distribute:<br>"+left+"="+right
      );

    }





    // Move everything to left side

    let leftParts =
      simplifySide(left);



    let rightParts =
      simplifySide(right);




    let x =
      leftParts.x -
      rightParts.x;



    let number =
      rightParts.num -
      leftParts.num;






    if(rightParts.x !==0){

      steps.push(
        "Move variables to one side:"
      );


      steps.push(
        `${x}x = ${number}`
      );

    }






    if(leftParts.num !==0){

      steps.push(
        "Move constants:"
      );


      steps.push(
        `${x}x = ${number}`
      );

    }





    let answer =
      number / x;



    steps.push(
      `<strong>x = ${answer}</strong>`
    );




    solution.innerHTML =
      steps.join("<br><br>");



  }


  catch{


    solution.innerHTML =
      "I can't solve that equation yet.";

  }

}







function distribute(expression){


  return expression.replace(
    /(\d+)\(([^)]+)\)/g,
    function(match,num,inside){


      let parts =
        inside.split("+");


      return parts
        .map(x=>num+x)
        .join("+");


    });


}






function simplifySide(side){


  let x=0;

  let num=0;



  let terms =
    side.match(
      /[+-]?\d*x|[+-]?\d+/g
    );



  if(!terms)
    return {x:0,num:0};



  terms.forEach(term=>{


    if(term.includes("x")){


      let value =
        term.replace("x","");



      if(value==="")
        value=1;



      if(value==="-")
        value=-1;



      x += Number(value);


    }


    else{


      num += Number(term);


    }


  });



  return {
    x:x,
    num:num
  };

}
