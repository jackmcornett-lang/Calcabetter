let historyBox=
  document.getElementById("history");



let savedHistory=
  JSON.parse(
    localStorage.getItem("calcHistory")
  )||[];



function loadHistory(){

  historyBox.innerHTML="";


  savedHistory.forEach(item=>{

    historyBox.innerHTML +=
      `<p>${item}</p>`;

  });

}



function saveCalculation(problem,result){

  let text=
    `${problem} = ${result}`;


  savedHistory.unshift(text);


  localStorage.setItem(
    "calcHistory",
    JSON.stringify(savedHistory)
  );


  loadHistory();

}




function clearHistory(){

  savedHistory=[];

  localStorage.removeItem(
    "calcHistory"
  );

  loadHistory();

}




function searchHistory(){

  let search=
    document.getElementById("search")
      .value
      .toLowerCase();



  historyBox.innerHTML="";


  savedHistory

    .filter(x=>
      x.toLowerCase()
        .includes(search)
    )

    .forEach(x=>{

      historyBox.innerHTML+=
        `<p>${x}</p>`;

    });

}



loadHistory();
