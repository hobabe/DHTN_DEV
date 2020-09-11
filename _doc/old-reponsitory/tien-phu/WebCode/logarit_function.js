// JavaScript Document
function getBaseLog(x, y) {
  return Math.log(y) / Math.log(x);
}

alert("log2(5)= "+getBaseLog(2, 5)); 
alert("Now you can calculate yourself");
while(true){
var base = window.prompt("Please enter Log base: ");
var value=window.prompt("Please enter Value you want to calculate: ");
alert("log_" + base+"("+value+")="+getBaseLog(base,value));
}
