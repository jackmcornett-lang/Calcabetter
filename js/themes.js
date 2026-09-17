function toggleTheme(){


  document.body.classList.toggle("dark");



  let dark =
    document.body.classList.contains("dark");



  if(dark){

    localStorage.setItem(
      "theme",
      "dark"
    );

  }

  else{

    localStorage.setItem(
      "theme",
      "light"
    );

  }



  // redraw graph immediately after theme change

  setTimeout(function(){


    if(typeof drawGraph === "function"){

      drawGraph();

    }


  },100);


}








function loadTheme(){


  let saved =
    localStorage.getItem("theme");



  if(saved==="dark"){

    document.body.classList.add("dark");

  }


}








window.addEventListener(
  "load",
  function(){

    loadTheme();

  });
