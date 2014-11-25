"use strict";

var tileOne = null;
var tileTwo = null;
var tilePictures = [];
var canFlip = true;
var time;
var pairsMatch = 0;
var wrong = 0;
var pairsLeft = 8;

$('#pairsMatch').text(pairsMatch);
$('#pairsLeft').text(pairsLeft);
$('#wrongGuesses').text(wrong);

for(var index = 1; index < 33; index++) {
	tilePictures.push("img/tile" + index + ".jpg");
}

tilePictures = _.shuffle(tilePictures).slice(0, 8);
tilePictures = tilePictures.concat(tilePictures);
tilePictures = _.shuffle(tilePictures);

$("#newGame").click(function() {
	window.location.reload();
});

var gameBoard = $('#gameboard');
for(var index = 0; index < 16; index++) {
	var newTile = $(document.createElement('img'));
	var image = tilePictures[index];
	newTile.attr('src', 'img/tile-back.png');
	newTile.data('index', index);
	newTile.data('image', image);
	gameBoard.append(newTile);
}

$(document).ready(function() {
	$("#gameboard").one('click', function() {
		var currentTime = _.now();
		time = window.setInterval(function(){
			$('#currentTime').html(Math.floor((_.now()-currentTime)/1000));
		}, 1000);
	});
});

$(document).ready(function() {
	$("#gameboard img").click(function() {
		if(canFlip) {
			$(this).attr('src', tilePictures[$(this).data('index')]);
			if(tileOne === null) {
				tileOne = $(this);
				if(tileOne.hasClass("flipped")) {
					tileOne = null;
				}
			} else {
				tileTwo = $(this);
				canFlip = false;
				if(tileTwo.hasClass("flipped") || tileOne.data('index') === tileTwo.data('index')) {
					tileTwo = null;
					canFlip = true;
				}
				if(tileOne.data('image') === tileTwo.data('image')) {
					pairsLeft--;
					pairsMatch++;
					tileOne.addClass("flipped");
					tileTwo.addClass("flipped");
					tileOne = null;
					tileTwo = null;
					canFlip = true;
				} else {
					wrong++;
					setTimeout(function() {
						tileOne.attr("src", "img/tile-back.png");
						tileTwo.attr("src", "img/tile-back.png");
						tileOne = null;
						tileTwo = null;
						canFlip = true;
					}, 1000);
				}
				$('#pairsMatch').text(pairsMatch);
				$('#pairsLeft').text(pairsLeft);
				$('#wrongGuesses').text(wrong);
			}
			if(pairsLeft === 0 && pairsMatch === 8) {
				clearInterval(time);
				$('#win').css('display', 'inline');
				$('#gameboard').css('display', 'none');
			}
		}
	});
});
