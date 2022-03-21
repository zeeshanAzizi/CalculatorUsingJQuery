// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
$(document).ready(function(){  //when this page loads, run this jQuery code right away
  
  //Stores inputs from the user to calculate later
  var inputs = [""];  // empty quote needed in here to avoid validation errors
  var totalString;  //string to store current input string, that displays on the calculator
  
  
  //cannot allow entires that don't make sense, like 3.12.5, or  3 * / 2,  or  3 + - 2,
  //Operators array for validation without the .
  var operatorsBasic = ["+","-","/","*"];
  //operators array with the .  for validation
  var operatorsDot = ["."];
  //numbers for validation
  var nums = [0,1,2,3,4,5,6,7,8,9];
  
  function getValue(input){  //this updates everything
    if(operatorsDot.includes(inputs[inputs.length-1])===true && input === "."){  //includes() is built in to return true or false if something is present in a given item. inputs[inputs.length-1]) is the last value
      console.log("Error: Duplicate '.'"); //can't have 2 dots, last value being a dot and current input being a dot
    }
    else if(inputs.length === 1 && operatorsBasic.includes(input) === false){  //checks if on first entered value, and that first value needs to be a number or a dot or is invalid.
      inputs.push(input);   //if valid, add it to the array   
    }
    else if(operatorsBasic.includes(inputs[inputs.length-1])===false){  //if last entry is not also a basic operator? add it to the array
      inputs.push(input);
    }
    else if(nums.includes(Number(input))){ //Number() converts our string into a number, if it is true (no need to add === true)
      inputs.push(input);      
    }
    //at the end run the update() function
    update();  
  }
  
  function update ()  {//this displays the most recently inputed value onto the calculator display
    totalString = inputs.join("");
    $("#steps").html(totalString);
  }  
  
  function getTotal(){ //this does the calculation once the = is pressed
    totalString = inputs.join("");
    $("#steps").html(eval(totalString));  //eval()  is built in to evaluate / calculate the math FOR YOU, and returns a single number (the answer)
  }
  
  //to target the buttons that are clicked and have them each do something.
  $("a").on("click", function(){  //target anchor tag, a, when clicked, run a function
    
    if(this.id === "clearAll") {  //this.id is the id of the item that we clicked
      inputs=[""];  //reset our inputs array back to oriingal blank value
      update();  //call the update function to demonstrate that it is in fact empty
    } 
    
    else if(this.id === "clearLast"){
      inputs.pop();  //just pop off the last value (most recently entered input)
      update();
    }
    else if(this.id === "total"){
      getTotal();  //user pressed "=", so run the function that does the calculation with eval()
      //update();??
    }
    
    //if not one of the above, any other input is one of two categories of actions:
    else {  
      //check the last inputed value to see if it matches one of the operator symbols
      if(inputs[inputs.length-1].indexOf("+","-","/","*",".") ===-1){
        //if not present, call getValue function. This gets collects and stores if it is 0-9?
        getValue(this.id);         
      }
      else{
        getValue(this.id);  
        //don't get why this is the same
      }
    }
         
         
  });
});