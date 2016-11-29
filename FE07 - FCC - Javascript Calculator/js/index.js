$(document).ready(function() {
    var topRow = [];
    var calcRow = [];
    var z = 0;
    var x = 0;

    $('.calcnumber, .calcfunc').click(function() {

        if (x == 1) {
            calcRow = [];
            x = 0;
        }

        var clElem = $(this);

        ///////////////// CLICK ANIMATION ////////////////////
        $(this).addClass('hoverC');
        setTimeout(function() {
            $(clElem).removeClass('hoverC');
        }, 100);

         ///////////////// CLEAR VALS ////////////////////       
        if ($(this).attr('id') === 'ClearEntry') {
            topRow = [];
        } else if ($(this).attr('id') === 'Reset') {
            topRow = [];
            calcRow = [];
          
        ///////////////// NUMBER TILES ENTRY ////////////////////          
        } else if (/[^+-\/=\*]/.test($(this).val())) {
          
        ///////////////// NE > AFTER EQUALS ////////////////////
            if (z == 1) {
                topRow = [];
                calcRow = [];
                z = 0;
            }
        ///////////////// NE > CHECK TOP ROW LENGTH ////////////////////          
            if (topRow.length == 10) {
                calcRow = [];
                topRow = [];
                x = 1;
            }  
        ///////////////// NE > CHECK DECIMALS + ZERO ////////////////////              
             else if (topRow.length == 0 && $(this).val() == 0) {
              
            } else if (topRow.length == 0 && $(this).val() == 'decpoint') {
                topRow.push('0');
                topRow.push('.');
            } else if (topRow.indexOf('.') == -1 && $(this).val() == 'decpoint') {
                topRow.push('.');
          
              
          ///////////////// NE > NUMBER ENTRY ////////////////////              
            } else if ($(this).val() !== 'decpoint') {
                topRow.push($(this).val());
            }
          
        ///////////////// FUNCTION ENTRY //////////////////// 
        } else if (/[+-\/\*]/.test($(this).val()) && topRow.join('') != 0) {
            if (z == 1) {
                calcRow = [];
                z = 0;
            }
            calcRow.push(topRow.join(''));
            calcRow.push($(this).val());
            topRow = [];
          
        } else if (/[+-]/.test($(this).val()) && calcRow.join('').length == 0) {
            if (z == 1) {
                calcRow = [];
                z = 0;
            }
            calcRow.push(topRow.join(''));
            calcRow.push($(this).val());
            topRow = [];
        }  
        ///////////////// EQUALS FUNC ////////////////////           
        else if (/[=]/.test($(this).val())) {
           
          if (topRow.join('') != 0 && z != 1) {
              var xx = topRow.join('');
              calcRow.push(xx);
            }
          
          if (eval(calcRow.join(''))>=10000000000 || eval(calcRow.join(''))<=-10000000000){
                   x = 1;
                   }
          
                  
          if (z == 1) {
            }  else if (/[+\-\/\*]/.test(calcRow[calcRow.length - 1])) {
                calcRow.pop();
                topRow = [];
                topRow.push(eval(calcRow.join('')).toString().substr(0,11));
                z = 1;
            } else {
                topRow = [];
                topRow.push(eval(calcRow.join('')).toString().substr(0,10));
                z = 1;
              }   
        }
      
        $('#resultbox').html(topRow.join(''));
        if (x == 1) {
            topRow = [];
            $('#resultbox').html(topRow.join(''));
            $('#formbox').html('ERROR: Too many digits');
        } else if (calcRow.join('').length > 29) {
            $('#formbox').html('...' + calcRow.join('').substr(-25));
        } else {
            $('#formbox').html(calcRow.join(''));
          }
      

        // Click Closer    
    });

    // Final Closer
});

//////////////// KEY LISTENER ////////////////////

document.addEventListener('keyup', function(event) {
    if (event.shiftKey === true && event.keyCode == 187) {
        $("button[value='+']").click();
    } else if (event.shiftKey === true && event.keyCode == 56) {
        $("button[value='*']").click();
    } else if (event.shiftKey === false) {

        switch (event.keyCode) {
            case 49:
            case 97:
                $("button[value='1']").click();
                break;
            case 50:
            case 98:
                $("button[value='2']").click();
                break;
            case 51:
            case 99:
                $("button[value='3']").click();
                break;
            case 52:
            case 100:
                $("button[value='4']").click();
                break;
            case 53:
            case 101:
                $("button[value='5']").click();
                break;
            case 54:
            case 102:
                $("button[value='6']").click();
                break;
            case 55:
            case 103:
                $("button[value='7']").click();
                break;
            case 56:
            case 104:
                $("button[value='8']").click();
                break;
            case 57:
            case 105:
                $("button[value='9']").click();
                break;
            case 48:
            case 96:
                $("button[value='0']").click();
                break;
            case 190:
            case 110:
                $("button[value='decpoint']").click();
                break;
            case 187:
            case 13:
                $("button[value='=']").click();
                break;
            case 107:
                $("button[value='+']").click();
                break;
            case 189:
            case 109:
                $("button[value='-']").click();
                break;
            case 191:
            case 111:
                $("button[value='/']").click();
                break;
            case 106:
                $("button[value='*']").click();
                break;
            case 46:
            case 8:
                $("#ClearEntry").click();
                break;
            default:
        }
    }
});