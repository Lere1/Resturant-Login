// js to close banner

function closeButton() {
    var banner = document.getElementById("ad_container").style.display = "none";
      
       }




//js to show the banner after 5s

function showUp(){ 

setTimeout(showBanner, 3000);
}


function showBanner() {	               
    document.getElementById("ad_container").style.visibility = "visible";

}	



//js to desplay message for the zip code

function search() {
var text;
var zipcodes = document.getElementById("yourzip").value;

switch(zipcodes) {
case "31419":
text = "We've got your area covered!";
break;
case "31406":
text = "We've got your area covered!";
break;
case "31409":
text = "We've got your area covered!";
break;
case "31405":
text = "We've got your area covered!"; 
break;
default:
text = "Sorry, we haven't expanded to that area yet.";
}
document.getElementById("dummy").innerHTML = text;
}




//js to calculate food price

function getTotal() { 
// find food price
var subSum = 0;

var foodAmt = document.getElementsByClassName("food-price");
for(i=0; i<foodAmt.length; i++) {
if(foodAmt[i].checked) {
  subSum = Number(foodAmt[i].value);
 
}
}  

//find tip amount 

var foodAmt = document.getElementsByClassName("food-tip");	
for( i=0; i<foodAmt.length; i++) {
  if(foodAmt[i].checked && subSum>0) {
   subSum *= (1 + foodAmt[i].value/100);
  }
}	 
  
 subSum = subSum.toFixed(2);					

document.getElementById("total").innerHTML = subSum;

}
