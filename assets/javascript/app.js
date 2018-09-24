var delay = 10000; //10 sec
var delayInSec = delay / 1000;
var timer;
var timeout;
var correct=0;
var incorrect=0;
var unanswered = myQuestions.length;

//When DOM is ready, hide page1 show page2 and display startTimer and questions block
$(document).ready(function() {

    $('.start-button').click(function(){
        $('.page1').hide();
        $('.page2').show();
        startTimer(delay);
    });


    var captureQuestions=''; //create variable to hold questions retrived from somewhere
    for(var i=0; i<myQuestions.length; i++){  //read through the myQuestions object using for loop
        var currentItem = myQuestions[i];  //set variable that holds the return values from myQuestions[i]
        captureQuestions += "<div class='question'>";
        captureQuestions += "<label>"+ currentItem.question +"</label><br>";
        captureQuestions += "<input type='hidden' class='answer' value='"+ currentItem.answer +"''>";
        captureQuestions += "<input type='radio' name='q-"+i+"' class='radiobtn' value='"+ currentItem.option1 +"'> "+ currentItem.option1 +"<br>";
        captureQuestions += "<input type='radio' name='q-"+i+"' class='radiobtn' value='"+ currentItem.option2 +"'> "+ currentItem.option2 +"<br>";
        captureQuestions += "<input type='radio' name='q-"+i+"' class='radiobtn' value='"+ currentItem.option3 +"'> "+ currentItem.option3 +"<br>";
        captureQuestions += "<input type='radio' name='q-"+i+"' class='radiobtn' value='"+ currentItem.option4 +"'> "+ currentItem.option4 +"<br>";
        captureQuestions += "</div>";
    }
    $('.questions').html(captureQuestions);

});


//set timer and display it
function startTimer(delay){ 
    timeout = setTimeout(displayResults, delay);
    timer = setInterval(updateTimer, 1000);
}

//update time counting down
function updateTimer(){
    delayInSec--;
    $("#timerDisplay").html(delayInSec);
}

// stops the game and display results
$('#submit').click(function(e){
    e.preventDefault();
    displayResults();
});

// close the quiz and display results. 
function displayResults () {
    clearTimeout(timeout);
    clearInterval(timer);
    $('.page2').hide();
    $('.page3').show();
    checkAnswers();
    $(".correct").html(correct);
    $(".incorrect").html(incorrect);
    $(".unanswered").html(unanswered);
}

// checking for answers and increment/decrement counters
function checkAnswers(){
    $('.question').each(function(){
        var correctAnswer = $(this).find('.answer').val();
        var options = $(this).find('.radiobtn');
        $(options).each(function(){
            if($(this).is(":checked")){
                unanswered--;
                if($(this).val()===correctAnswer){
                    correct++;
                }else{
                    incorrect++;
                }
            }
        });
    });
}