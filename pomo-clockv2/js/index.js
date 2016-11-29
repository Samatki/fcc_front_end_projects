$(document).ready(function(){
  var isTimerRunning = false;
  var timerTicker;
  var timerMins = 25;
  var currTimeTrack = 0;
  var breakMins = 5;
  var blockedHeight = 392;
  var currTime2 = 0;
  var m = 0;
  var noMinutes;
  var noSeconds;
  var arg1 = timerMins;
  var mode = 'T';
  var audioBreak = new Audio('http://res.cloudinary.com/duv0xmpto/video/upload/v1477162206/Robot_blip_2-Marianne_Gagnon-299056732_g1jgtk.mp3');
  var audioTimer = new Audio('http://res.cloudinary.com/duv0xmpto/video/upload/v1477162208/Robot_blip-Marianne_Gagnon-120342607_yvkgzp.mp3');
  
  
$('#progBar').css('height',blockedHeight + 'px');
   
/////////////// ADJUSTS TIMINGS ///////////////// 
  
$('#tButtonP').click(function(){
  if (isTimerRunning){}else{
  if (timerMins == 99){} else{
  timerMins = timerMins + 1;
  $('#tDuration').html(timerMins);
  $('#circleVals').html(timerMins);
  $('#progBar').css('height','392px');
  currTimeTrack = 0;
  arg1 = timerMins;
  mode = 'T';
  $('#tMode').html('Session');
  } } });

$('#tButtonM').click(function(){
  if (isTimerRunning){}else{
  if (timerMins == 1){} else{
  timerMins = timerMins - 1; 
  $('#tDuration').html(timerMins);
  $('#circleVals').html(timerMins);
  $('#progBar').css('height','392px');
  currTimeTrack = 0;
  arg1 = timerMins;
  mode = 'T';
  $('#tMode').html('Session');
  } } });

$('#bButtonP').click(function(){
  if (isTimerRunning){}else{
    if (breakMins == 99){} else{
  breakMins = breakMins + 1;
  $('#bDuration').html(breakMins);
   if (mode =='B'){
    $('#circleVals').html(breakMins);
  $('#progBar').css('height','0px');
  currTimeTrack = 0;
   }
    }
}});

$('#bButtonM').click(function(){
    if (isTimerRunning){}else{
  if (breakMins == 0){} else{
  breakMins = breakMins - 1; 
  $('#bDuration').html(breakMins);  
   if (mode =='B'){
    $('#circleVals').html(breakMins);
  $('#progBar').css('height','0px');
  currTimeTrack = 0;
   }
  }} });

  var call2;

$('#circleBackground').click(function(){timerFunc(arg1);
                if (isTimerRunning){$('.tButtons').animate({opacity:0.1},500)}
                else {$('.tButtons').animate({opacity:1},500)}
                                 });

  
  function timerFunc(t1){
   
  if(isTimerRunning){
      clearInterval(timerTicker)
      isTimerRunning = false;  
    $('#circleBackground').css('background-image','url(http://icons.iconarchive.com/icons/danieledesantis/audio-video-outline/512/play-icon.png)')
    //if (mode == 'B'){
     // t1 = breakMins;
     //mode = 'T';
     //currTimeTrack = 0;
    //}
  } else {
        $('#circleBackground').css('background-image','url(http://icons.iconarchive.com/icons/danieledesantis/audio-video-outline/512/pause-icon.png)')
     if (mode == 'B') t1 = breakMins;
     
    isTimerRunning = true;
    currTime2 = currTimeTrack;
    var baseTime = new Date().getTime();
  //  var timer = Math.round($('#circleVals').html());
 
    timerTicker = setInterval(function(){  
      var currTime = new Date().getTime();
      currTimeTrack =  currTime2 + Math.round((currTime-baseTime)/1000);
      
      noMinutes = Math.floor((t1*60-currTimeTrack)/60);
      noSeconds = ((t1*60-currTimeTrack)%60);
      
      if (noMinutes<10) noMinutes = '0' + noMinutes;
      if (noSeconds<10) noSeconds = '0' + noSeconds;
      
      $('#circleVals').html(noMinutes+':'+noSeconds);     
      if (mode=='B'){
      blockedHeight = 392*((currTimeTrack)/(t1*60)); 
    } else {
      blockedHeight = 392*((t1*60-currTimeTrack)/(t1*60));        
      }
      
      $('#progBar').css('height',blockedHeight + 'px'); 
      
      if (currTimeTrack>=t1*60){
        if (mode == 'T'){
        clearInterval(timerTicker);
        isTimerRunning = false;
        currTimeTrack = 0;
        mode = 'B';
        $('#tMode').html('Break');
        audio = new Audio('audio_file.mp3');
        audioTimer.play();
        timerFunc(breakMins);

  
        } else {
        clearInterval(timerTicker);
        isTimerRunning = false;
        currTimeTrack = 0;
        mode = 'T';
        $('#tMode').html('Session');
        audioBreak.play();
        timerFunc(timerMins); 


        }
        
       }
    },1000);
    
  }
}; 
 
  
  /////////////// END OF DOCUMENT READY ///////////////  
});