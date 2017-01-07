$('#weatherCircle').css('display','none');
$(document).ready(function(){

  function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('weatherCircle').innerHTML =
    h + ":" + m + ":" + s;
    var t = setTimeout(startTime, 500);
  console.log(t);
}
function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
} 
  
function pictureStyler(weatherID){

var ArrayIndex = 0;
var Array2Index = 0;
var picIndex = 1;

if (weatherID <300){
/* Thunderstorm */
ArrayIndex = 0;
picIndex = Math.floor((Math.random()*pictureLinkArray[ArrayIndex].noPictures)+1);
	$('#weatherCircle').css('background-image',"url('http://res.cloudinary.com/duv0xmpto/image/upload/v1/"+pictureLinkArray[ArrayIndex].pictureLabel+picIndex+"')");

	} else if (weatherID<400){
/* Drizzle */
ArrayIndex = 1;
picIndex = Math.floor((Math.random()*pictureLinkArray[ArrayIndex].noPictures)+1);
	$('#weatherCircle').css('background-image',"url('http://res.cloudinary.com/duv0xmpto/image/upload/v1/"+pictureLinkArray[ArrayIndex].pictureLabel+picIndex+"')");

	}else if (weatherID<500){
/* NOT USED */
console.log('Undefined weather ID')	
	
	}else if (weatherID<600){
/* Rain */
ArrayIndex = 2;
picIndex = Math.floor((Math.random()*pictureLinkArray[ArrayIndex].noPictures)+1);
	$('#weatherCircle').css('background-image',"url('http://res.cloudinary.com/duv0xmpto/image/upload/v1/"+pictureLinkArray[ArrayIndex].pictureLabel+picIndex+"')");

	}else if (weatherID<700){
/* Snow */
ArrayIndex = 3;
picIndex = Math.floor((Math.random()*pictureLinkArray[ArrayIndex].noPictures)+1);
	$('#weatherCircle').css('background-image',"url('http://res.cloudinary.com/duv0xmpto/image/upload/v1/"+pictureLinkArray[ArrayIndex].pictureLabel+picIndex+"')");

	}else if (weatherID<800){
/* Atmosphere */
ArrayIndex = 4;
Array2Index = 0;
if (weatherID<711){
Array2Index = 0;
}
else if (weatherID<721){
Array2Index = 1;
}

else if (weatherID<731){
Array2Index = 2;
}

else if (weatherID<741){
Array2Index = 3;
}

else if (weatherID<751){
Array2Index = 4;
}

else if (weatherID<761){
Array2Index = 5;
}

else if (weatherID<762){
Array2Index = 6;
}

else if (weatherID<771){
Array2Index = 7;
}
else if (weatherID<781){
Array2Index = 8;
}
else if (weatherID<800){
Array2Index = 9;
}

	$('#weatherCircle').css('background-image',"url('http://res.cloudinary.com/duv0xmpto/image/upload/v1/"+pictureLinkArray[ArrayIndex][Array2Index]+"')");

	}else if (weatherID===800){
/* Clear */
ArrayIndex = 5;
picIndex = Math.floor((Math.random()*pictureLinkArray[ArrayIndex].noPictures)+1);
	$('#weatherCircle').css('background-image',"url('http://res.cloudinary.com/duv0xmpto/image/upload/v1/"+pictureLinkArray[ArrayIndex].pictureLabel+picIndex+"')");

	}else if (weatherID<900){
/* Clouds */
ArrayIndex = 6;
picIndex = Math.floor((Math.random()*pictureLinkArray[ArrayIndex].noPictures)+1);
	$('#weatherCircle').css('background-image',"url('http://res.cloudinary.com/duv0xmpto/image/upload/v1/"+pictureLinkArray[ArrayIndex].pictureLabel+picIndex+"')");

	}else if (weatherID<907){
/* Extreme */
ArrayIndex = 9;

if (weatherID===900){
Array2Index = 0;
}
else if (weatherID===901){
Array2Index = 1;
}
else if (weatherID===902){
Array2Index = 2;
}
else if (weatherID===903){
Array2Index = 3;
}
else if (weatherID===904){
Array2Index = 4;
}
else if (weatherID===905){
Array2Index = 5;
}
else if (weatherID===906){
Array2Index = 6;
}

	$('#weatherCircle').css('background-image',"url('http://res.cloudinary.com/duv0xmpto/image/upload/v1/"+pictureLinkArray[ArrayIndex][Array2Index]+"')");

	}else if (weatherID<960){
/* Additional */
ArrayIndex = 7;
picIndex = Math.floor((Math.random()*pictureLinkArray[ArrayIndex].noPictures)+1);
	$('#weatherCircle').css('background-image',"url('http://res.cloudinary.com/duv0xmpto/image/upload/v1/"+pictureLinkArray[ArrayIndex].pictureLabel+picIndex+"')");

	}else if (weatherID<1000){
/* Additional */
ArrayIndex = 8;
picIndex = Math.floor((Math.random()*pictureLinkArray[ArrayIndex].noPictures)+1);
	$('#weatherCircle').css('background-image',"url('http://res.cloudinary.com/duv0xmpto/image/upload/v1/"+pictureLinkArray[ArrayIndex].pictureLabel+picIndex+"')");

} else {
console.log('Something went wrong - no weather ID returned')
}
}

  
var currentLat;
var currentLong;
var weatherUrl  = '';

function weatherData(){
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
    currentLat = position.coords.latitude;
    currentLong = position.coords.longitude;
  console.log(currentLat);
  console.log(currentLong);
    weatherUrl = "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat="+currentLat+"&lon="+currentLong +"&APPID=9d8e2673db802ae0bad8d0ae1e72e011";
console.log(weatherUrl);
  $.ajax({
    type:"GET",
  url : weatherUrl, 
           dataType : "jsonp",
   success: function(wD){
     if(wD.cod == 404){
      console.log('OpenWeather Server playing up again'); $('#locationTimeData').html('<p>Woops! Look like something went wrong, please try again Later!</p>');
       $('#weatherCircle').css('display','none');
     }else{
              $('#weatherCircle').css('display','');
  $('#locationTimeData').html('<p>'+wD.name+', '+wD.sys.country+'</p>');
$('#Inner').html('<p id="wCText">'+wD.weather[0].description+'<br><br>' +'<span id="Temp">'+(parseFloat(wD.main.temp)-273.15).toFixed(1)+'</span>'+'<span id="tempToggler"> &deg;C</span></p>');
   pictureStyler(wD.weather[0].id);
     }
   }
  })
  });
}
}
var tNum;
  
$(document).on('click', "#tempToggler", function (){
if ($("#tempToggler").html() == " °C" ){
  tNum = (parseFloat($("#Temp").html())*(9/5)+32).toFixed(1);
  $('#Temp').html(tNum);
  $("#tempToggler").html(" &deg;F")
} else {
    tNum = ((parseFloat($("#Temp").html())-32)*(5/9)).toFixed(1);
    $('#Temp').html(tNum);
  $("#tempToggler").html(" &deg;C")
}
                   });  

  weatherData();
  
  function updatePage(){
    weatherData();
  setTimeout(updatePage, 300000);
 
 }
   updatePage();
  
})
