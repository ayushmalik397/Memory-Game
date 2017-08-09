//Array containing the source of the hidden images
var pics = ["images/chrome.png", "images/chrome.png", "images/drive.png", "images/drive.png", "images/fb.png", "images/fb.png", "images/gmail.png", "images/gmail.png", "images/google.png", "images/google.png", "images/sc.png", "images/sc.png", "images/twit.png", "images/twit.png", "images/you.png", "images/you.png"];
//array containing the source of the images currently flipped
var picsflipped = [];
//array containing the id of the images currently flipped
var pic_count = [];
var moves = 0,
    pairs = 0,
    flip = 0;
//function to shuffle the hidden images
function shufflePics(pics) {
    for (var i = pics.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = pics[i];
        pics[i] = pics[j];
        pics[j] = temp;
    }
}
//function to append the images inside the game area
function backpics() {
    flip = 0;
    var box = ' ';
    for (var i = 0; i < pics.length; i++) {
        var box = box + '<div id="' + i + '" class="block"><img class="img-responsive image" src="images/1.jpg" onclick=flipBlock(' + i + ',\'' + pics[i] + '\')></div>';
    }
    document.getElementById('area').innerHTML = box;
};
//function which will be called on clicking the image and it will show the hidden image under it
function flipBlock(index, flipsource) {
    if (picsflipped.length < 2) {
        moves = moves + 1;
        if (moves == 1) {
          Timer();
        }
        if (moves <= 20) {
            var gstar = ' <i class="fa fa-star" aria-hidden="true"></i> <i class="fa fa-star" aria-hidden="true"></i> <i class="fa fa-star" aria-hidden="true"></i>';
        }
        else if (moves > 20 && moves <= 38) {
            var gstar = ' <i class="fa fa-star" aria-hidden="true"></i> <i class="fa fa-star" aria-hidden="true"></i>';
        }
        else{
            var gstar = ' <i class="fa fa-star" aria-hidden="true"></i>';
        }
        document.getElementById('rate').innerHTML = gstar;
        if (picsflipped.length <= 1) {
            document.getElementById(index).innerHTML = " ";
            document.getElementById(index).innerHTML = '<img class="img-responsive" src="' + flipsource + '">';
            picsflipped.push(flipsource);
            pic_count.push(index);
        }
        //condition if when 2 images are flipped
        if (picsflipped.length == 2) {
            $('#moves').text(moves / 2);
            function flipmatch() {
                //condition if when both the flipped image are same
                if (picsflipped[0] === picsflipped[1] && pic_count[0] != pic_count[1]) {
                    picsflipped = [];
                    pic_count = [];
                    pairs = pairs + 1;
                    //condition if all the images are matched
                    if (pairs == 8) {
                        var star = '';
                        var mov = moves / 2;
                        if (moves <= 20) {
                            var star = ' <i class="fa fa-star" aria-hidden="true"></i> <i class="fa fa-star" aria-hidden="true"></i> <i class="fa fa-star" aria-hidden="true"></i>';
                        }
                        else if (moves > 20 && moves <= 38) {
                            var star = ' <i class="fa fa-star" aria-hidden="true"></i> <i class="fa fa-star" aria-hidden="true"></i>';
                        }
                        else {
                            var star = ' <i class="fa fa-star" aria-hidden="true"></i>';
                        }
                        document.getElementById('stars').innerHTML = star;
                        document.getElementById('moves1').innerHTML = mov;
                        document.getElementById("sec1").innerHTML = pad(++sec % 60);
                        document.getElementById("min1").innerHTML = pad(parseInt(sec / 60, 10));
                        clearInterval(myTime);
                        //setTimeout function to open the popup modal
                        setTimeout(function() {
                            $('#winModal').show();
                        }, 100);
                    }
                }
                //else condition when both flipped images does'nt match
                else {
                    for (var i = 0; i < 2; i++) {
                        document.getElementById(pic_count[i]).innerHTML = " ";
                        document.getElementById(pic_count[i]).innerHTML = '<img class="img-responsive image" src="images/1.jpg" onclick=flipBlock(' + pic_count[i] + ',\'' + pics[pic_count[i]] + '\')>';
                    }
                    picsflipped = [];
                    pic_count = [];
                }
            }
            setTimeout(flipmatch, 500);
        }
    }
  }
    var sec = 0;
    //function to update the timer
    function pad(val) {
        return val > 9 ? val : "0" + val;
    }
    var Timer = function() {
    //setInterval function which will call the timer function after every sec on clicking the first
     myTime = setInterval(function() {
        var a = pad(++sec % 60);
        var b = pad(parseInt(sec / 60, 10));
        document.getElementById("sec").innerHTML = a;
        document.getElementById("min").innerHTML = b;
    }, 1000);
  };
