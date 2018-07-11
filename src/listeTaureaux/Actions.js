export const func1=()=>{
    // do stuff
}
var toto=[];
var test={
    toto:[],
    getAsText : function(fileToRead) {
        // console.log(fileToRead)
        var reader = new FileReader();
        // Read file into memory as UTF-8      
        reader.readAsText(fileToRead);
        // Handle errors load
        reader.onload = loadHandler;
        reader.onerror = errorHandler;
        console.log("1")
        return this;
    },
    getResultat: function(){
        // console.log(toto)
        console.log("3")
        return toto;
    }
          
}

export const getTableau = (fileToRead) =>{
    test.getAsText(fileToRead).getResultat();
    console.log("4")
    return toto;
}
// export const getAsText = (fileToRead) => {
//     // console.log(fileToRead)
//     var reader = new FileReader();
//     // Read file into memory as UTF-8      
//     reader.readAsText(fileToRead);
//     // Handle errors load
//     reader.onload = loadHandler;
//     reader.onerror = errorHandler;
//   }

  function loadHandler(event) {
    var csv = event.target.result;
    toto= processData(csv);
    console.log("5");
  }
  
  function processData(csv) {
    var allTextLines = csv.split(/\r\n|\n/);
    // alert(allTextLines)
    var lines = [];
    for (var i=0; i<allTextLines.length; i++) {
        var data = allTextLines[i].split(';');
            var tarr = [];
            for (var j=0; j<data.length; j++) {
                tarr.push(data[j]);
            }
            lines.push(tarr);
    }
    // console.log(lines[0]);
    return (lines[0]);
  }
  
  function errorHandler (evt) {
    if(evt.target.error.name == "NotReadableError") {
        alert("Canno't read file !");
    }
  }
  export const csvToArray= (csvString) => {
    // The array we're going to build
    var csvArray   = [];
    // Break it into rows to start
    var csvRows    = csvString.split(/\n/);
    // Take off the first line to get the headers, then split that into an array
    var csvHeaders = csvRows.shift().split(';');
  
    // Loop through remaining rows
    for(var rowIndex = 0; rowIndex < csvRows.length; ++rowIndex){
      var rowArray  = csvRows[rowIndex].split(';');
  
      // Create a new row object to store our data.
      var rowObject = csvArray[rowIndex] = {};
      
      // Then iterate through the remaining properties and use the headers as keys
      for(var propIndex = 0; propIndex < rowArray.length; ++propIndex){
        // Grab the value from the row array we're looping through...
        var propValue =   rowArray[propIndex].replace(/^"|"$/g,'');
        // ...also grab the relevant header (the RegExp in both of these removes quotes)
        var propLabel = csvHeaders[propIndex].replace(/^"|"$/g,'');;
  
        rowObject[propLabel] = propValue;
      }
    }
  
    return csvArray;
  }
  