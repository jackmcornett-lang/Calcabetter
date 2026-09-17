let canvas = document.getElementById("graphCanvas");
let ctx = canvas.getContext("2d");


const width = canvas.width;
const height = canvas.height;


let zoom = 35;


let offsetX = 0;
let offsetY = 0;


let dragging = false;


let lastMouseX = 0;
let lastMouseY = 0;





function isDarkMode(){

  return document.body.classList.contains("dark");

}






function drawGraph(){


  ctx.clearRect(
    0,
    0,
    width,
    height
  );


  drawGrid();



  let equation =
    document.getElementById("graphInput")
      .value
      .toLowerCase()
      .replace(/\s/g,"")
      .replace("y=","");



  if(equation!==""){


    try{


      equation =
        equation
          .replace(/(\d)(x)/g,"$1*x")
          .replace(/\^/g,"**");



      let func =
        Function(
          "x",
          "return "+equation
        );



      ctx.beginPath();



      let started=false;



      let startX =
        -(width/2+offsetX)/zoom;



      let endX =
        (width/2-offsetX)/zoom;



      let step =
        2/zoom;



      if(step < 0.005)

        step=0.005;



      if(step > 0.2)

        step=0.2;





      for(
        let x=startX;
        x<=endX;
        x+=step
      ){


        let y;



        try{

          y=func(x);

        }

        catch{

          continue;

        }



        if(!Number.isFinite(y))

          continue;



        let px =
          width/2+
          offsetX+
          x*zoom;



        let py =
          height/2+
          offsetY-
          y*zoom;





        if(!started){


          ctx.moveTo(
            px,
            py
          );


          started=true;


        }

        else{


          ctx.lineTo(
            px,
            py
          );


        }


      }



      ctx.strokeStyle="#5b8def";

      ctx.lineWidth=3;

      ctx.stroke();



    }


    catch(error){

      console.log(error);

    }


  }



  drawPoints();

}









function drawPoints(){


  let input =
    document.getElementById("pointInput");



  if(!input)

    return;



  let text =
    input.value;



  if(text.trim()==="")

    return;




  let points =
    text.match(
      /\((-?\d*\.?\d+),\s*(-?\d*\.?\d+)\)/g
    );



  if(!points)

    return;





  points.forEach(point=>{


    let values =
      point
        .replace(/[()]/g,"")
        .split(",");



    let x =
      Number(values[0]);



    let y =
      Number(values[1]);



    let px =
      width/2+
      offsetX+
      x*zoom;



    let py =
      height/2+
      offsetY-
      y*zoom;




    ctx.beginPath();


    ctx.fillStyle="#ff5555";


    ctx.arc(
      px,
      py,
      6,
      0,
      Math.PI*2
    );


    ctx.fill();





    ctx.fillStyle =
      isDarkMode()
        ? "#fff"
        : "#333";



    ctx.font="14px Arial";



    ctx.fillText(
      `(${x},${y})`,
      px+8,
      py-8
    );



  });


}









function drawGrid(){


  let grid =
    getGridSize();



  let gridSize =
    grid.size;



  let step =
    grid.step;



  let centerX =
    width/2+offsetX;



  let centerY =
    height/2+offsetY;



  let dark =
    isDarkMode();



  let gridColor =
    dark ? "#444" : "#dddddd";



  let axisColor =
    dark ? "#eeeeee" : "#333";



  let textColor =
    dark ? "#ffffff" : "#333";







  ctx.beginPath();



  for(
    let x=centerX;
    x<width;
    x+=gridSize
  ){


    ctx.moveTo(x,0);

    ctx.lineTo(x,height);


  }




  for(
    let x=centerX-gridSize;
    x>0;
    x-=gridSize
  ){


    ctx.moveTo(x,0);

    ctx.lineTo(x,height);


  }






  for(
    let y=centerY;
    y<height;
    y+=gridSize
  ){


    ctx.moveTo(0,y);

    ctx.lineTo(width,y);


  }





  for(
    let y=centerY-gridSize;
    y>0;
    y-=gridSize
  ){


    ctx.moveTo(0,y);

    ctx.lineTo(width,y);


  }





  ctx.strokeStyle=gridColor;

  ctx.lineWidth=1;

  ctx.stroke();







  ctx.beginPath();



  ctx.moveTo(centerX,0);

  ctx.lineTo(centerX,height);



  ctx.moveTo(0,centerY);

  ctx.lineTo(width,centerY);





  ctx.strokeStyle=axisColor;

  ctx.lineWidth=2;

  ctx.stroke();







  ctx.fillStyle=textColor;

  ctx.font="14px Arial";





  let leftValue =
    -(width/2+offsetX)/zoom;



  let rightValue =
    (width/2-offsetX)/zoom;



  let xStart =
    Math.ceil(leftValue/step)*step;





  for(
    let x=xStart;
    x<=rightValue;
    x+=step
  ){


    if(Math.abs(x)<step/10)

      continue;



    let px =
      width/2+
      offsetX+
      x*zoom;



    ctx.fillText(
      Number(x.toFixed(3)),
      px-10,
      centerY+18
    );


  }






  let bottomValue =
    -(height/2-offsetY)/zoom;



  let topValue =
    (height/2+offsetY)/zoom;




  let yStart =
    Math.ceil(bottomValue/step)*step;





  for(
    let y=yStart;
    y<=topValue;
    y+=step
  ){


    if(Math.abs(y)<step/10)

      continue;



    let py =
      height/2+
      offsetY-
      y*zoom;



    ctx.fillText(
      Number(y.toFixed(3)),
      centerX+8,
      py+5
    );


  }





  ctx.font="bold 16px Arial";



  ctx.fillText(
    "x",
    width-20,
    centerY-10
  );



  ctx.fillText(
    "y",
    centerX+10,
    20
  );


}









function getGridSize(){


  let pixels=zoom;

  let step=1;



  while(pixels>120){

    pixels/=2;

    step/=2;

  }



  while(pixels<60){

    pixels*=2;

    step*=2;

  }



  return{

    size:pixels,

    step:step

  };


}









function zoomIn(){

  zoom*=1.25;

  drawGraph();

}



function zoomOut(){

  zoom/=1.25;

  drawGraph();

}



function resetZoom(){

  zoom=35;

  offsetX=0;

  offsetY=0;

  drawGraph();

}









canvas.addEventListener(
  "wheel",
  function(event){


    event.preventDefault();



    if(event.deltaY<0){

      zoom*=1.15;

    }

    else{

      zoom/=1.15;

    }



    drawGraph();


  },
  {
    passive:false
  }

);









canvas.addEventListener(
  "mousedown",
  function(event){


    dragging=true;



    lastMouseX=event.clientX;

    lastMouseY=event.clientY;


  });









canvas.addEventListener(
  "mouseup",
  function(){

    dragging=false;

  });









canvas.addEventListener(
  "mouseleave",
  function(){

    dragging=false;

  });









canvas.addEventListener(
  "mousemove",
  function(event){



    if(!dragging)

      return;



    offsetX +=
      event.clientX-lastMouseX;



    offsetY +=
      event.clientY-lastMouseY;



    lastMouseX=event.clientX;

    lastMouseY=event.clientY;



    drawGraph();



  });
