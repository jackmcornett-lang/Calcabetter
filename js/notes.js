let notes =
  document.getElementById("notes");





// Load saved notes

notes.value =
  localStorage.getItem("calcabetterNotes")
  || "";







// Save whenever you type

notes.addEventListener(
  "input",
  ()=>{


    localStorage.setItem(
      "calcabetterNotes",
      notes.value
    );


  });







function clearNotes(){


  notes.value="";


  localStorage.removeItem(
    "calcabetterNotes"
  );


}
