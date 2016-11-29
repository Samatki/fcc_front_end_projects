var gameArray = [];
var playerLevel = 0;
var isDemoRunning = false;
var clickedArray = [];
var strictMode = false;
var winPoints = 20;
var gameStatus = 'off';

var audio1 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
var audio2 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
var audio3 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
var audio4 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');
var audio5 = new Audio('http://res.cloudinary.com/duv0xmpto/video/upload/v1477317284/error1_inyanu.mp3');

$(document).ready(function() {

    $('#onOffcheck').click(function() {
        if ($('#onOffcheck').is(":checked")) {
            $('#onOffLabel').html('ON');
            $('#level').html('--');
            setTimeout(function() {
                $('#level').css('color', 'black')
            }, 500);
            setTimeout(function() {
                $('#level').css('color', 'red')
            }, 1000);
            setTimeout(function() {
                $('#level').css('color', 'black')
            }, 1500);
            setTimeout(function() {
                $('#level').css('color', 'red');
                gameStatus = 'on';
            }, 2000);
        } else {
            gameStatus = 'off';
            $('#level').html('');
            clickedArray = [];
            gameArray = [];
            audio1.load();
            audio2.load();
            audio3.load();
            audio4.load();
            audio5.load();
            $('#onOffLabel').html('OFF');
            $('#strictLabel').css('background-color', '#b70000');
            strictMode = false;
        }
    });

    $('#strictCheck').click(function() {
        if (gameStatus == 'off') {} else {
            if (strictMode) {
                $('#strictLabel').css('background-color', '#b70000');
                strictMode = false;
            } else {
                $('#strictLabel').css('background-color', 'green');
                strictMode = true;
            };
        };
    });

    $('#gameStart').click(function() {
        if (isDemoRunning || gameStatus == 'off') {} else {
            playerLevel = 0;
            clickedArray = [];
            gameArrayMaker();
            $('#level').html(playerLevel + 1);

            var j = 0;
            //isDemoRunning isn't perfect - suggest putting shield over inputs
            blockIterate(j, playerLevel);
        }
    });

    $('.colourBox').click(function() {
        if (isDemoRunning || gameStatus == 'off') {} else {
            var clickedID = $(this).attr('id');
            var noise = 'audio' + clickedID.charAt(1) + '.load()';
            eval(noise);
            noise = 'audio' + clickedID.charAt(1) + '.play()';
            eval(noise);
            $(this).animate({
                opacity: 0.5
            }, 1000);
            setTimeout(function() {
                $('#' + clickedID).animate({
                    opacity: 1
                }, 1000)
            }, 1000);
            clickedArray.push(clickedID);
            if (checkerFunction(clickedArray)) {
                if (clickedArray.length - 1 == playerLevel) {
                    clickedArray = [];
                    playerLevel++;
                    if (playerLevel == winPoints) {
                            $('#level').html('WIN!')
                      setTimeout(function() {
                            $('#gameStart').click();    
                        }, 5000);
                    } else {
                        j = 0;
                        setTimeout(function() {
                            $('#level').html(playerLevel + 1)
                        }, 1000);
                        blockIterate(j, playerLevel);
                    }
                }
            } else if (strictMode === true) {
                $('#gameStart').click();
            } else {
                j = 0;
                blockIterate(j, playerLevel);
            }
        }
    });

});

function blockIterate(n, x) {
    if (gameStatus == 'off') {} else {
        isDemoRunning = true;
        var currElem = '#' + gameArray[n];
        console.log(currElem);

        if (n == 0) {
            setTimeout(function() {
                $(currElem).animate({
                    opacity: 0.5
                }, 1000);
                var noise = 'audio' + $(currElem).attr('id').charAt(1) + '.load()';
                eval(noise);
                noise = 'audio' + $(currElem).attr('id').charAt(1) + '.play()';
                eval(noise);
            }, 2000);
            setTimeout(function() {
                $(currElem).animate({
                    opacity: 1
                }, 1000)
            }, 3000);
            setTimeout(function() {
                if (n < x) {
                    blockIterate((n + 1), x)
                } else {
                    isDemoRunning = false
                }
            }, 4000);
        } else {
            $(currElem).animate({
                opacity: 0.5
            }, 1000);
            setTimeout(function() {
                $(currElem).animate({
                    opacity: 1
                }, 1000);
                var noise = 'audio' + $(currElem).attr('id').charAt(1) + '.play()';
                eval(noise);
            }, 1000);
            setTimeout(function() {
                if (n < x) {
                    blockIterate((n + 1), x)
                } else {
                    isDemoRunning = false
                }
            }, 2000)
        }
    }
}

function checkerFunction(ArrK) {
    if (ArrK[ArrK.length - 1] == gameArray[ArrK.length - 1]) {
        return true;
    } else {
        audio1.load();
        audio2.load();
        audio3.load();
        audio4.load();
        clickedArray = [];
        audio5.play();
        var levelHolder = $('#level').html();
        $('#level').html('!!');
      isDemoRunning = true;      
      setTimeout(function() {
                $('#level').css('color', 'black')
            }, 500);
            setTimeout(function() {
                $('#level').css('color', 'red')
            }, 1000);
            setTimeout(function() {
                $('#level').css('color', 'black')
            }, 1500);
            setTimeout(function() {
                $('#level').css('color', 'red');
                     $('#level').html(levelHolder);
              isDemoRunning = false;
            }, 2000);
        return false;

    }
}

function gameArrayMaker() {
    gameArray = [];
    for (var i = 0; i <= 99; i++) {
        gameArray.push('c' + (Math.floor(4 * Math.random() + 1)));
    }
    console.log(gameArray);
};