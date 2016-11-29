$(document).ready(function(){
 
/* ------- Erase Text Button --------- */  
  
$('#searchTerm, #aa').hover(function(){
    $('#aa').css({'visibility':'visible'});
   },function(){
    $('#aa').css({'visibility':'hidden'});
  });

/* ------- Random Page --------- */  
  /*
$('#randomPage').click(function(){
   initialTransition();
    $('#resultContainer').animate({'opacity':'1'},2000);
}); 

/* ------- Search Button --------- */
 
$('#searchTerm').keypress(function(e) {
    if(e.which == 13) {
     $('#iSearch').click();
    }
});  
  
 $('#iSearch').click(function(){
   if ($('#searchTerm').val()==''){
     $('#resultContainer').css({'opacity':'0', 'display':'none'}); 
   } else{ 
   
     initialTransition();
      $('#resultContainer').css({'display':'block'})
     $('#resultContainer').animate({'opacity':'0'},500);  
   
   setTimeout(function(){
     $('#resultContainer').empty();    
     wikiSearch();  
   },500);
 
   setTimeout(function(){
  $('#resultContainer').animate({'opacity':'1'},500); 
   },1000);
   };
 }); 

/* ------- Loading Page --------- */


  
/*------*/  

});

/*-----------------------------------------------------*/

function wikiSearch(){
    
 var wikiURL = 'https://en.wikipedia.org/w/api.php?format=json&action=query&list=search&srlimit=30&srsearch='+$('#searchTerm').val()+'&utf8=&callback=JSON_CALLBACK';
  console.log(wikiURL);
  $.ajax({
    url:wikiURL,      
    dataType:'jsonp',
    success:function(result){
var resultsNo = result.query.search.length

      if(resultsNo==0){
         $('#resultContainer').append('<div style="text-align:center; margin:auto; background-color:white; height:30px; width:300px; border-radius:20px; transform:translate(0px,-15px); padding-top:10px;">No Results Found</div>');
      }else{
for (var i = 0;i<resultsNo;i++){
  $('#resultContainer').append('<div class="resultItem"><span class="rTitle">'+result.query.search[i].title+'</span><br><span class="rSnippet">'+result.query.search[i].snippet+'</span></div>')
}
      }
}
}); 
};  

function initialTransition() {
 $('#InitialScreen').animate({'top':'25px'},125);

       setTimeout(function(){   
       $('#InitialScreen').css('transform','translate(-505px,-40px)');   
$('#InitialScreen').animate({'border-top-left-radius':'0px', 'border-top-right-radius':'0px', 'width':'1000px'},100, 'linear');

$('#searchTerm').animate({'width':'824px'},100, 'linear'); 
$('#aa').css('left','800px'); 
$('#iButtons').animate({'width':'900px'},100,'linear');
$('#iButtons').css('transform','translate(-450px,0px)');     
       },125)      
  } 

function Test2(){
var zzz = $('#searchTerm').val();
  if (zzz===''){
    console.log('nothing here');
  }else{
  console.log(zzz);
  }
}

function Test3(){
  $('#searchTerm').val('');
}

var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.moveTo(0,0);
ctx.lineTo(12,12);
ctx.moveTo(12,0);
ctx.lineTo(0,12);
ctx.strokeStyle = 'grey';
ctx.lineWidth = 2;
ctx.stroke();


$( "body" ).on( "click", ".resultItem", function(){
  console.log($(this).text());
  var z = $('.rTitle',this).text();
  $('#pageLoader').css({'opacity':'1', 'display':'block'});
  $('#iframeExit').css({'opacity':'1', 'display':'block'});
  console.log('https://en.wikipedia.org/wiki/'+z)
$('#pageLoader').attr("src",'https://en.wikipedia.org/wiki/'+z)
$('*').not('#pageLoader, #iframeCross, #iframeExit, html, body, head').css('display','none');
} );


var c = document.getElementById("iframeCross");
var ctx = c.getContext("2d");
ctx.moveTo(0,0);
ctx.lineTo(50,50);
ctx.moveTo(50,0);
ctx.lineTo(0,50);
ctx.strokeStyle = 'grey';
ctx.lineWidth = 4;
ctx.stroke();

$( "body" ).on( "click", "#iframeCross", function(){
  $('#pageLoader').css({'opacity':'0', 'display':'none'});
  $('#iframeExit').css({'opacity':'0', 'display':'none'});
$('#pageLoader').attr("src",'');
$('*').not('#iframeExit, #pageLoader, html, body, head, link, script').css('display','block');
 $('#iSearch, #SearchBox, #aa, .resultItem').css('display','inline-block');
  $('span').css('display','inline-block')
});

$('#randomPage').click(function(){
  var z = 'https://en.wikipedia.org/wiki/Special:Random'
  $('#pageLoader').css({'opacity':'1', 'display':'block'});
  $('#iframeExit').css({'opacity':'1', 'display':'block'});
  console.log(z)
$('#pageLoader').attr("src",z)
$('*').not('#pageLoader, #iframeCross, #iframeExit, html, body, head').css('display','none');
});