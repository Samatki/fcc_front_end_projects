$(document).ready(function(){

 function randomColour(){
   var c1 = Math.floor(150-Math.random()*50);
   var c2 = Math.floor(100+Math.random()*150);
   var c3 = Math.floor(255-Math.random()*150);
   var cT = 'rgb('+c1+','+c2+','+c3+')';
  return cT;
 }   

function getNewQuote(textColor) {
var z = "";
  var x = Math.floor(Math.random()*10000);
	//https://crossorigin.me/
    var k = "https://crossorigin.me/http://api.forismatic.com/api/1.0/?method=getQuote&key="+x+"&format=json&lang=en";
    $.ajax({
	    headers: { 'Access-Control-Allow-Origin': * },
    type:'GET',	    
    url:k,    
    success: function(zar){
      if (zar.quoteAuthor == ''){
      $('#btn1i').html("<p id=\"qText\" style=\"color:"+textColor+"\">"+zar.quoteText+"</p><p id=\"qAuthor\" style=\"color:"+textColor+"\"> --- Unknown</p>");
              $("#tweetBtn").attr('href','https://twitter.com/intent/tweet?text='+zar.quoteText.substr(0,zar.quoteText.lastIndexOf(".") )+' - Unknown');
      }else{
      $('#btn1i').html("<p id=\"qText\" style=\"color:"+textColor+"\">"+zar.quoteText+"</p><p id=\"qAuthor\" style=\"color:"+textColor+"\"> --- "+zar.quoteAuthor+"</p>");
      $("#tweetBtn").attr('href','https://twitter.com/intent/tweet?text='+zar.quoteText.substr(0,zar.quoteText.lastIndexOf(".") )+' - '+zar.quoteAuthor);
       }
    z = zar.quoteAuthor;
    }
    });
};  
  
 function slideout(){  
  $('#quoteContainer').attr('class', 'btn1ZoomOut');
  }
  
function slidein() {
    $('#quoteContainer').attr('class', 'btn1ZoomIn');
 }  

 getNewQuote(); 
  
$('#btn3').click(function(){
  var cT2 = randomColour();
    
    $("body").animate({
      backgroundColor: cT2
    }, 1500);

	slideout();
	
 
setTimeout( function(){
	getNewQuote(cT2);
    slidein();
},740);
 
    $("button").animate({
      color: cT2
    }, 1500);

});

});
