var userSelector;
var otherSelector;
var currSelector;
var xColor = $('#xButton').css('color');
var oColor = $('#oButton').css('color');
var resArray = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8]
];
var activeRow;
var activeCol;
var compMode = false;
var turnCount = 0;
var currPlayer;
var gameOver = false;

$(document).ready(function() {

  $('#opSwitchBack').click(function() {
    $('label[for="opponentSwitch"]').click();
  });

  $('label[for="opponentSwitch"]').click(function() {
    if (compMode) {
      compMode = false;
      $(this).animate({
        left: '+=100px'
      }, 200);

    } else {
      compMode = true;
      $(this).animate({
        left: '-=100px'
      }, 200);

    }
  });

  //////////////////// LOAD IN UP-FRONT DECISION /////////////////////// 
  $('#GSOverlay').animate({
    'top': '-500px'
  }, 500);

  //////////////////// SELECT PLAYER UNIT /////////////////////// 
  $('.iconSelector').click(function() {
    $('td').addClass('inputField');
    $('td').css('color', 'rgb(38, 38, 38)');
    userSelector = $(this).attr('data-symbol');
    if (userSelector == 'O') {
      otherSelector = 'X'
    } else {
      otherSelector = 'O'
    };
    currSelector = userSelector;
    if (compMode == true) {
      $('#turnNotifierO').css('display', 'none');
    }
    if (whoGoesFirst() == 'Player2') {
      currSelector = otherSelector;
      currPlayer = 'Player 2';
      $('#turnNotifierText').html(currPlayer + "'s Turn");
      if (compMode == true) {
        $('#gameScreen').css('display', 'block');
        compTurn();
        console.log(resArray);
        $('#gameScreen').css('display', 'none');
        currSelector = userSelector;
        currPlayer = 'Player 1';
        $('#turnNotifierText').html(currPlayer + "'s Turn");
        $('#turnNotifierI').html(currSelector);
        $('#turnNotifierI').css('color', eval(currSelector.toLowerCase() + 'Color'));
        turnCount++;
      } else {
        $('#gameScreen').css('display', 'none');
      }
    } else {
      currPlayer = 'Player 1';
      $('#turnNotifierText').html(currPlayer + "'s Turn");
      $('#gameScreen').css('display', 'none');
    }
    $('#GSOverlay').animate({
      'top': '-1500px'
    }, 500);
    $('#turnNotifierI').html(currSelector);
    $('#turnNotifierI').css('color', eval(currSelector.toLowerCase() + 'Color'));
  });

  //////////////////// SELECT BLOCK /////////////////////// 
  $('td').click(function() {
    if ($(this).hasClass('inputField')) {
      $(this).css('color', eval(currSelector.toLowerCase() + 'Color'));
      $(this).html(currSelector);
      activeCol = $(this).index();
      activeRow = $(this).parent().index();
      resArray[activeRow].splice(activeCol, 1, currSelector);

      /////////////////// FINAL STEP ///////////////////////      
      if (checkForWin()) {
        $('#GWOverlay').animate({
          'top': '-930px'
        }, 500);
        $('#gameScreen').css('display', 'block');
        $('#turnNotifierText').empty();
        $('#turnNotifierI').empty();

        if (compMode === true) {
            $('#GWOverlay').html('<h2>You (<span id="winnerType" style="color:'+ eval(currSelector.toLowerCase() + 'Color')+'">' + currSelector + '</span>) Win!</h2><br><button id="restartButton">Play Again?</button>');
          
        } else {
          $('#GWOverlay').html('<h1>' + currPlayer + '(<span id="winnerType" style="color:'+ eval(currSelector.toLowerCase() + 'Color')+'">' + currSelector + '</span>) Wins!</h1><br><button id="restartButton">Play Again?</button>');
        }
        gameOver = true;
      } else {
        turnCount++;
        if (turnCount == 9) {
          $('#GWOverlay').animate({
            'top': '-930px'
          }, 500);
          $('#gameScreen').css('display', 'block');
          $('#GWOverlay').html('<h1>Draw!</h1><br><button id="restartButton">Play Again?</button>');
          gameOver = true;
        }
      }
      //////////////////// SWITCH TO OTHER PLAYER ///////////////////////  
      if (gameOver == false) {
        if (currSelector == userSelector) {
          currSelector = otherSelector;
          currPlayer = 'Player 2';
          $('#turnNotifierText').html(currPlayer + "'s Turn");
          $('#turnNotifierI').html(currSelector);
          $('#turnNotifierI').css('color', eval(currSelector.toLowerCase() + 'Color'));
          if (compMode === true) {
            $('#gameScreen').css('display', 'block');
            compTurn();
            console.log(resArray);
            if (checkForWin()) {
              $('#GWOverlay').animate({
                'top': '-930px'
              }, 500);
              $('#gameScreen').css('display', 'block');
              $('#turnNotifierText').empty();
              $('#turnNotifierI').empty();
            $('#GWOverlay').html('<h2>Computer (<span id="winnerType" style="color:'+ eval(currSelector.toLowerCase() + 'Color')+'">' + currSelector + '</span>) Wins!</h2><br><button id="restartButton">Play Again?</button>');
              gameOver = true;
            } else {
              turnCount++;
              if (turnCount == 9) {
                $('#GWOverlay').animate({
                  'top': '-930px'
                }, 500);
                $('#gameScreen').css('display', 'block');
                $('#GWOverlay').html('<h3>Draw!</h3><br><button id="restartButton">Play Again?</button>');
                gameOver = true;
              }

              $('#gameScreen').css('display', 'none');
              currSelector = userSelector;
              currPlayer = 'Player 1';
              $('#turnNotifierText').html(currPlayer + "'s Turn");
              $('#turnNotifierI').html(currSelector);
              $('#turnNotifierI').css('color', eval(currSelector.toLowerCase() + 'Color'));

            }
          }
        } else {
          currSelector = userSelector;
          currPlayer = 'Player 1';
          $('#turnNotifierText').html(currPlayer + "'s Turn");
          $('#turnNotifierI').html(currSelector);
          $('#turnNotifierI').css('color', eval(currSelector.toLowerCase() + 'Color'));
        }
      }
    }
    /////////////////// MAKE UNCLICKABLE ///////////////////////  
    $(this).removeClass('inputField');

  });

  /////////////////// ESCAPE DOC READY ///////////////////////     
});

function checkForWin() {
  for (var i = 0; i < 3; i++) {
    if (resArray[0][i] == resArray[1][i] && resArray[1][i] == resArray[2][i]) {
      return true;
    } else if (resArray[i][0] == resArray[i][1] && resArray[i][1] == resArray[i][2]) {
      return true;
    } else if (resArray[0][0] == resArray[1][1] && resArray[1][1] == resArray[2][2]) {
      return true;
    } else if (resArray[0][2] == resArray[1][1] && resArray[1][1] == resArray[2][0]) {
      return true;
    }
  }
}

function whoGoesFirst() {
  if (Math.random() > 0.5) {
    return 'Player1';
  } else {
    return 'Player2';
  }
}

function compTurn() {
  console.log(resArray);
  if (currSelector != otherSelector) {
    console.log('SOMETHING WENT WRONG')
    return false;
  }

  var regStr1 = '(' + currSelector + '\\d' + currSelector + ')|(\\d' + currSelector + currSelector + ')|(' + currSelector + currSelector + '\\d)';
  var regStr = new RegExp(regStr1);
  var diagStr1 = resArray[0][0] + resArray[1][1] + resArray[2][2];
  var diagStr2 = resArray[0][2] + resArray[1][1] + resArray[2][0];
  for (var i = 0; i < 3; i++) {
    if (regStr.test(resArray[i].join(''))) {
      var rowno = i + 1;
      var colno = resArray[i].findIndex(function(element) {
        if (/\d/.test(element)) {
          return true
        }
      }) + 1;
      console.log('tr:nth-child(' + rowno + ') td:nth-child(' + colno + ')');
      $('tr:nth-child(' + rowno + ') td:nth-child(' + colno + ')').html(currSelector);
      $('tr:nth-child(' + rowno + ') td:nth-child(' + colno + ')').animate({
        'color': eval(currSelector.toLowerCase() + 'Color')
      }, 500);
      $('tr:nth-child(' + rowno + ') td:nth-child(' + colno + ')').removeClass('inputField');
      console.log('R1');
      resArray[i].splice(colno - 1, 1, currSelector);
      return true;
    } else if (regStr.test(diagStr1)) {
      var posNo = diagStr1.search(/\d/);
      switch (posNo) {
        case 0:
          resArray[0].splice(0, 1, currSelector);
          $('tr:nth-child(1) td:nth-child(1)').html(currSelector);
          $('tr:nth-child(1) td:nth-child(1)').animate({
            'color': eval(currSelector.toLowerCase() + 'Color')
          }, 500);
          $('tr:nth-child(1) td:nth-child(1)').removeClass('inputField');
          return true;
          console.log('R1');
          break;
        case 1:
          resArray[1].splice(1, 1, currSelector);
          $('tr:nth-child(2) td:nth-child(2)').html(currSelector);
          $('tr:nth-child(2) td:nth-child(2)').animate({
            'color': eval(currSelector.toLowerCase() + 'Color')
          }, 500);
          $('tr:nth-child(2) td:nth-child(2)').removeClass('inputField');
          return true;
          console.log('R1');
          break;
        case 2:
          resArray[2].splice(2, 1, currSelector);
          $('tr:nth-child(3) td:nth-child(3)').html(currSelector);
          $('tr:nth-child(3) td:nth-child(3)').animate({
            'color': eval(currSelector.toLowerCase() + 'Color')
          }, 500);
          $('tr:nth-child(3) td:nth-child(3)').removeClass('inputField');
          return true;
          console.log('R1');
          break;
      }
    } else if (regStr.test(diagStr2)) {
      var posNo = diagStr2.search(/\d/);
      switch (posNo) {
        case 0:
          resArray[0].splice(2, 1, currSelector);
          $('tr:nth-child(1) td:nth-child(3)').html(currSelector);
          $('tr:nth-child(1) td:nth-child(3)').animate({
            'color': eval(currSelector.toLowerCase() + 'Color')
          }, 500);
          $('tr:nth-child(1) td:nth-child(3)').removeClass('inputField');
          return true;
          console.log('R1');
          break;
        case 1:
          resArray[1].splice(1, 1, currSelector);
          $('tr:nth-child(2) td:nth-child(2)').html(currSelector);
          $('tr:nth-child(2) td:nth-child(2)').animate({
            'color': eval(currSelector.toLowerCase() + 'Color')
          }, 500);
          $('tr:nth-child(2) td:nth-child(2)').removeClass('inputField');
          return true;
          console.log('R1');
          break;
        case 2:
          resArray[2].splice(0, 1, currSelector);
          $('tr:nth-child(3) td:nth-child(1)').html(currSelector);
          $('tr:nth-child(3) td:nth-child(1)').animate({
            'color': eval(currSelector.toLowerCase() + 'Color')
          }, 500);
          $('tr:nth-child(3) td:nth-child(1)').removeClass('inputField');
          return true;
          console.log('R1');
          break;
      }
    } else {
      var vertStrArr = [];
      for (var j = 0; j < 3; j++) {
        vertStrArr.push(resArray[j][i]);
      }
      if (regStr.test(vertStrArr.join(''))) {
        var colno = i + 1;
        var rowno = 1 + vertStrArr.findIndex(function(element) {
          if (/\d/.test(element)) {
            return true
          }
        });
        console.log('Col' + colno);
        console.log('Row' + rowno);
        $('tr:nth-child(' + rowno + ') td:nth-child(' + colno + ')').html(currSelector);
        $('tr:nth-child(' + rowno + ') td:nth-child(' + colno + ')').animate({
          'color': eval(currSelector.toLowerCase() + 'Color')
        }, 500);
        $('tr:nth-child(' + rowno + ') td:nth-child(' + colno + ')').removeClass('inputField');
        resArray[rowno - 1].splice(colno - 1, 1, currSelector);
        console.log('R1');
        return true;
      }
    }
  }
  ////////////////////// END RULE 1 ////////////////
  var regStr2 = '(' + userSelector + '\\d' + userSelector + ')|(\\d' + userSelector + userSelector + ')|(' + userSelector + userSelector + '\\d)';
  regStr = new RegExp(regStr2);
  for (var i = 0; i < 3; i++) {
    if (regStr.test(resArray[i].join(''))) {
      var rowno = i + 1;
      var colno = resArray[i].findIndex(function(element) {
        if (/\d/.test(element)) {
          return true
        }
      }) + 1;
      console.log('tr:nth-child(' + rowno + ') td:nth-child(' + colno + ')');
      $('tr:nth-child(' + rowno + ') td:nth-child(' + colno + ')').html(currSelector);
      $('tr:nth-child(' + rowno + ') td:nth-child(' + colno + ')').animate({
        'color': eval(currSelector.toLowerCase() + 'Color')
      }, 500);
      $('tr:nth-child(' + rowno + ') td:nth-child(' + colno + ')').removeClass('inputField');
      resArray[i].splice(colno - 1, 1, currSelector);
      console.log('R2');
      return true;
    } else if (regStr.test(diagStr1)) {
      var posNo = diagStr1.search(/\d/);
      switch (posNo) {
        case 0:
          resArray[0].splice(0, 1, currSelector);
          $('tr:nth-child(1) td:nth-child(1)').html(currSelector);
          $('tr:nth-child(1) td:nth-child(1)').animate({
            'color': eval(currSelector.toLowerCase() + 'Color')
          }, 500);
          $('tr:nth-child(1) td:nth-child(1)').removeClass('inputField');
          console.log('R2');
          return true;
          break;
        case 1:
          resArray[1].splice(1, 1, currSelector);
          $('tr:nth-child(2) td:nth-child(2)').html(currSelector);
          $('tr:nth-child(2) td:nth-child(2)').animate({
            'color': eval(currSelector.toLowerCase() + 'Color')
          }, 500);
          $('tr:nth-child(2) td:nth-child(2)').removeClass('inputField');
          console.log('R2');
          return true;
          break;
        case 2:
          resArray[2].splice(2, 1, currSelector);
          $('tr:nth-child(3) td:nth-child(3)').html(currSelector);
          $('tr:nth-child(3) td:nth-child(3)').animate({
            'color': eval(currSelector.toLowerCase() + 'Color')
          }, 500);
          $('tr:nth-child(3) td:nth-child(3)').removeClass('inputField');
          console.log('R2');
          return true;
          break;
      }
    } else if (regStr.test(diagStr2)) {
      var posNo = diagStr2.search(/\d/);
      switch (posNo) {
        case 0:
          resArray[0].splice(2, 1, currSelector);
          $('tr:nth-child(1) td:nth-child(3)').html(currSelector);
          $('tr:nth-child(1) td:nth-child(3)').animate({
            'color': eval(currSelector.toLowerCase() + 'Color')
          }, 500);
          $('tr:nth-child(1) td:nth-child(3)').removeClass('inputField');
          console.log('R2');
          return true;
          break;
        case 1:
          resArray[1].splice(1, 1, currSelector);
          $('tr:nth-child(2) td:nth-child(2)').html(currSelector);
          $('tr:nth-child(2) td:nth-child(2)').animate({
            'color': eval(currSelector.toLowerCase() + 'Color')
          }, 500);
          $('tr:nth-child(2) td:nth-child(2)').removeClass('inputField');
          console.log('R2');
          return true;
          break;
        case 2:
          resArray[2].splice(0, 1, currSelector);
          $('tr:nth-child(3) td:nth-child(1)').html(currSelector);
          $('tr:nth-child(3) td:nth-child(1)').animate({
            'color': eval(currSelector.toLowerCase() + 'Color')
          }, 500);
          $('tr:nth-child(3) td:nth-child(1)').removeClass('inputField');
          console.log('R2');
          return true;
          break;
      }
    } else {
      var vertStrArr = [];
      for (var j = 0; j < 3; j++) {
        vertStrArr.push(resArray[j][i]);
      }
      if (regStr.test(vertStrArr.join(''))) {
        var colno = i + 1;
        var rowno = 1 + vertStrArr.findIndex(function(element) {
          if (/\d/.test(element)) {
            return true
          }
        });
        $('tr:nth-child(' + rowno + ') td:nth-child(' + colno + ')').html(currSelector);
        $('tr:nth-child(' + rowno + ') td:nth-child(' + colno + ')').animate({
          'color': eval(currSelector.toLowerCase() + 'Color')
        }, 500);
        $('tr:nth-child(' + rowno + ') td:nth-child(' + colno + ')').removeClass('inputField');
        resArray[rowno - 1].splice(colno - 1, 1, currSelector);
        console.log('R2');
        return true;
      }
    }
  }
  ////////////////////// END RULE 2 ////////////////
  var regStr3 = '(' + '\\d' + '\\d' + currSelector + ')|(\\d' + currSelector + '\\d' + ')|(' + currSelector + '\\d' + '\\d)';
  regStr = new RegExp(regStr3);
  for (var i = 0; i < 9; i++) {
    var rowno = Math.floor(i / 3);
    var colno = i % 3;
    var vertStr = resArray[0][colno] + resArray[1][colno] + resArray[2][colno];
    if ((regStr.test(resArray[rowno].join('')) && regStr.test(vertStr)) || (regStr.test(resArray[rowno].join('')) && regStr.test(diagStr1)) || (regStr.test(resArray[rowno].join('')) && regStr.test(diagStr2)) || (regStr.test(vertStr) && regStr.test(diagStr1)) || (regStr.test(vertStr) && regStr.test(diagStr2))) {
      console.log('R3');
      $('tr:nth-child(' + (rowno + 1) + ') td:nth-child(' + (colno + 1) + ')').html(currSelector);
      $('tr:nth-child(' + (rowno + 1) + ') td:nth-child(' + (colno + 1) + ')').animate({
        'color': eval(currSelector.toLowerCase() + 'Color')
      }, 500);
      $('tr:nth-child(' + (rowno + 1) + ') td:nth-child(' + (colno + 1) + ')').removeClass('inputField');
      resArray[rowno].splice(colno, 1, currSelector);
      return true;
    }
  }
  ////////////////////// END RULE 3 ////////////////
  var regStr4 = '(' + '\\d' + '\\d' + userSelector + ')|(\\d' + userSelector + '\\d' + ')|(' + userSelector + '\\d' + '\\d)';
  regStr = new RegExp(regStr4);
  for (var i = 0; i < 9; i++) {
    var rowno = Math.floor(i / 3);
    var colno = i % 3;
    var vertStr = resArray[0][colno] + resArray[1][colno] + resArray[2][colno];
    if (/\d/.test(resArray[rowno][colno])) {
      if ((regStr.test(resArray[rowno].join('')) && regStr.test(vertStr)) || (regStr.test(resArray[rowno].join('')) && regStr.test(diagStr1)) || (regStr.test(resArray[rowno].join('')) && regStr.test(diagStr2)) || (regStr.test(vertStr) && regStr.test(diagStr1)) || (regStr.test(vertStr) && regStr.test(diagStr2))) {
        $('tr:nth-child(' + (rowno + 1) + ') td:nth-child(' + (colno + 1) + ')').html(currSelector);
        $('tr:nth-child(' + (rowno + 1) + ') td:nth-child(' + (colno + 1) + ')').animate({
          'color': eval(currSelector.toLowerCase() + 'Color')
        }, 500);
        $('tr:nth-child(' + (rowno + 1) + ') td:nth-child(' + (colno + 1) + ')').removeClass('inputField');
        resArray[rowno].splice(colno, 1, currSelector);
        console.log('R4');
        return true;
      }
    }
  }
  ////////////////////// END RULE 4 ////////////////
  if (/\d/.test(resArray[1][1])) {
    $('tr:nth-child(2) td:nth-child(2)').html(currSelector);
    $('tr:nth-child(2) td:nth-child(2)').animate({
      'color': eval(currSelector.toLowerCase() + 'Color')
    }, 500);
    $('tr:nth-child(2) td:nth-child(2)').removeClass('inputField');
    resArray[1].splice(1, 1, currSelector);
    console.log('R5');
    return true;
  }
  ////////////////////// END RULE 5 ////////////////
  if (checkCorners() === true) {
    console.log('R6');
    return true;
  }
  ////////////////////// END RULE 6 ////////////////
  if (emptyCorners() === true) {
    console.log('R7');
    return true;
  }
  ////////////////////// END RULE 7 //////////////// 
  if (emptySides() === true) {
    console.log('R8');
    return true;
  }
  ////////////////////// END RULE 8 ////////////////

  console.log('SOMETHING WENT WRONG');
  return false;

}

function checkCorners() {
  var cArr0 = ['[0][0]', '[2][2]'];
  var cArr1 = ['[0][2]', '[2][0]'];
  var cArr2 = ['[2][0]', '[0][2]'];
  var cArr3 = ['[2][2]', '[0][0]'];

  var cornerArr = [];

  while (cornerArr.length < 4) {
    var cornerArrX = Math.floor(4 * Math.random());
    var cArrI = eval('cArr' + cornerArrX);
    if (cornerArr.indexOf(cArrI) == -1) {
      cornerArr.push(cArrI);
    }
  }
  for (var i = 0; i < cornerArr.length; i++) {
    if (eval('resArray' + cornerArr[i][0]) == userSelector && /\d/.test(eval('resArray' + cornerArr[i][1]))) {

      var colno = parseInt(cornerArr[i][1].substr(4, 1));
      var rowno = parseInt(cornerArr[i][1].substr(1, 1));

      $('tr:nth-child(' + (rowno + 1) + ') td:nth-child(' + (colno + 1) + ')').html(currSelector);
      $('tr:nth-child(' + (rowno + 1) + ') td:nth-child(' + (colno + 1) + ')').animate({
        'color': eval(currSelector.toLowerCase() + 'Color')
      }, 500);
      $('tr:nth-child(' + (rowno + 1) + ') td:nth-child(' + (colno + 1) + ')').removeClass('inputField');
      resArray[rowno].splice(colno, 1, currSelector);

      return true;
    }
  }
  return false;
}

function emptyCorners() {
  var cArr0 = ['[0][0]'];
  var cArr1 = ['[0][2]'];
  var cArr2 = ['[2][0]'];
  var cArr3 = ['[2][2]'];

  var cornerArr = [];

  while (cornerArr.length < 4) {
    var cornerArrX = Math.floor(4 * Math.random());
    var cArrI = eval('cArr' + cornerArrX);
    if (cornerArr.indexOf(cArrI) == -1) {
      cornerArr.push(cArrI);
    }
  }
  for (var i = 0; i < cornerArr.length; i++) {
    if (/\d/.test(eval('resArray' + cornerArr[i][0]))) {

      var colno = parseInt(cornerArr[i][0].substr(4, 1));
      var rowno = parseInt(cornerArr[i][0].substr(1, 1));

      $('tr:nth-child(' + (rowno + 1) + ') td:nth-child(' + (colno + 1) + ')').html(currSelector);
      $('tr:nth-child(' + (rowno + 1) + ') td:nth-child(' + (colno + 1) + ')').animate({
        'color': eval(currSelector.toLowerCase() + 'Color')
      }, 500);
      $('tr:nth-child(' + (rowno + 1) + ') td:nth-child(' + (colno + 1) + ')').removeClass('inputField');
      resArray[rowno].splice(colno, 1, currSelector);

      return true;
    }
  }
  return false;
}

function emptySides() {
  var cArr0 = ['[0][1]'];
  var cArr1 = ['[1][0]'];
  var cArr2 = ['[1][2]'];
  var cArr3 = ['[2][1]'];

  var cornerArr = [];

  while (cornerArr.length < 4) {
    var cornerArrX = Math.floor(4 * Math.random());
    var cArrI = eval('cArr' + cornerArrX);
    if (cornerArr.indexOf(cArrI) == -1) {
      cornerArr.push(cArrI);
    }
  }
  for (var i = 0; i < cornerArr.length; i++) {
    if (/\d/.test(eval('resArray' + cornerArr[i][0]))) {

      var colno = parseInt(cornerArr[i][0].substr(4, 1));
      var rowno = parseInt(cornerArr[i][0].substr(1, 1));

      $('tr:nth-child(' + (rowno + 1) + ') td:nth-child(' + (colno + 1) + ')').html(currSelector);
      $('tr:nth-child(' + (rowno + 1) + ') td:nth-child(' + (colno + 1) + ')').animate({
        'color': eval(currSelector.toLowerCase() + 'Color')
      }, 500);
      $('tr:nth-child(' + (rowno + 1) + ') td:nth-child(' + (colno + 1) + ')').removeClass('inputField');
      resArray[rowno].splice(colno, 1, currSelector);

      return true;
    }
  }
  return false;
}

$('body').on('click', '#restartButton', function() {
  $('td').html('');
  $('#gameScreen').css('display', 'block');
  turnCount = 0;
  gameOver = false;
  resArray = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8]
  ];
  console.log(resArray);
  $('button[data-symbol="' + userSelector.toUpperCase() + '"]').click();
  $('#GWOverlay').animate({
    'top': '-1500px'
  }, 500);

});

$(document).on({
  mouseenter: function() {
    $(this).html(currSelector);
    $(this).css({
      'color': eval(currSelector.toLowerCase() + 'Color')
    });
  },
  mouseleave: function() {
    $(this).html('');
    $(this).css('color', 'transparent');
  }
}, '.inputField');