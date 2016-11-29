$(document).ready(function() {
var xname;
  
    var twitchStreamer = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "starladder1"];
  
  
  for (var i = 0; i < twitchStreamer.length; i++) {
    twitchStreamer[i]=twitchStreamer[i].toLowerCase();

  }

  
 streamerGenerate();
  
  //setInterval(function(){streamerGenerate()},10000);
  
  function streamerGenerate(){
  $('#streamerArray').empty();
    for (var i = 0; i < twitchStreamer.length; i++) {

        $.ajax({
            url: 'https://api.twitch.tv/kraken/channels/' + twitchStreamer[i],
            headers: {
                'Client-ID': 'gn60so7aev63ylcwv48g30ibiwnkhea'
            },

            success: function(data) {

					xname = data.name;

              $.ajax({
            url: 'https://api.twitch.tv/kraken/streams/' + xname,
            headers: {
                'Client-ID': 'gn60so7aev63ylcwv48g30ibiwnkhea'
                    },
                    success: function(data2) {
					//console.log('!'+twitchStreamer[i]);
                         if (data2.stream === null) {
                    //        console.log('offline');
                    //      console.log(data2.name+'offline');
$('#streamerArray').append('<tr><td><a href="' + data.url + '" target="_blank"><img class="sLogo" src="' + data.logo + '"></a></td><td>' + data.name + '</td><td>' + data.game + '</td><td>' + data.followers + ' Followers</td><td class="delRow"><i class="delCross fa fa-times fa-1x" aria-hidden="true"></i></td><td><div  class="onlineStatus" style="background-color:red;">Offline</div></td></tr>');
                           
                        } else {

$('#streamerArray').append('<tr><td><a href="' + data.url + '" target="_blank"><img class="sLogo" src="' + data.logo + '"></a></td><td>' + data.name + '</td><td>' + data.game + '</td><td>' + data.followers + ' Followers</td><td class="delRow"><i class="delCross fa fa-times fa-1x" aria-hidden="true"></i></td><td><div  class="onlineStatus" style="background-color:green;">Online</div></td></tr>');
                        }

					}						
        });

                    }, 
			error: function() {
                console.log('Error2');
            }

            });
		
		
		};
  }

  $('#iSearch').click(function() {
     if ($('#streamerSearch').val() == '') {} else {
         var newStreamer = $('#streamerSearch').val().toLowerCase();
         for (var j = 0; j < twitchStreamer.length; j++) {
             if (twitchStreamer[j] == newStreamer) {var zz = 1}

         }
                  if(zz!=1){      
           twitchStreamer.push(newStreamer);
                                streamerGenerate();
                 $('#streamerSearch').val('');
                     }
     }
 });
  
$('body').on('click','.delCross',function(){

  var removeItem = $(this).closest('tr').find( "td" ).eq(1).html();
    twitchStreamer.splice( $.inArray(removeItem,twitchStreamer) ,1 );
  $(this).closest('tr').remove();  
});
 
    $('#streamerSearch').keyup(function(event) {
        $.ajax({
            url: 'https://api.twitch.tv/kraken/search/channels?q=' + $("#streamerSearch").val(),
            headers: {
                'Client-ID': 'gn60so7aev63ylcwv48g30ibiwnkhea'
            },
            success: function(data) {
                var availableTags = [];
                for (var b = 0; b < data.channels.length; b++) {


                    availableTags.push(data.channels[b].name);



                }

                $("#streamerSearch").autocomplete({
                    source: availableTags,
             
                });
            }
        })


    });

  
});