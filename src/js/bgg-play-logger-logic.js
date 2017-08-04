var MAX_PLAYERS = 6;
var ADD_PLAYER_ID = 3;

$(document).ready(
		function() {
			// CONSTS
			var counter = ADD_PLAYER_ID;
			var date = new Date();
			var year = date.getFullYear();
			var month = date.getMonth() < 10 ? ('0' + (date.getMonth() + 1)) : (date.getMonth() + 1);
			var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
			$('#playDate').val(year + '-' + month + '-' + day);

			// LISTENERS
			jQuery('#addPlayerButton').click(
					function(event) {
						event.preventDefault();
						if (counter <= MAX_PLAYERS) {
							$('#playersTable tr:last').after(
									"<tr> " + "<td>Player " + counter + "</td>" + "<td><input type='text' name='players[" + counter + "][name]' value=''></td>" + "<td><input type='text' name='players[" + counter + "][username]' value=''></td>"
											+ "<td><input type='text' name='players[" + counter + "][score]' value=''></td>" + "<td><input type='checkbox' name='players[" + counter + "][win]' id='players[" + counter
											+ "][win]' value=1 ><label for='players[" + counter + "][win]'>Win</label></td>" + "<td><input type='checkbox' name='players[" + counter + "][new]' id='players[" + counter
											+ "][new]' value=1 ><label for='players[" + counter + "][new]'>New</label></td>" + "</tr> ");
							counter++;
						} else {
							alert("You cannot insert more than 6 players")
						}

					});
			$("#game-search").easyAutocomplete(options);
		});

function getGamesOnBGG(searchString) {
	searchString = searchString.split(' ').join('+');
	alert(searchString);
	jQuery.ajax({
		type : "get",
		url : "https://www.boardgamegeek.com/xmlapi2/search?query=" + searchString + "&type=boardgame",
		success : function(data) {
			
			return $.xml2json(data);
		},
		error : function() {
			console.log('error', arguments);
		}
	});
}

var options = {

	url : function(phrase) {
		return getGamesOnBGG(phrase);
	},

	getValue : "name",

	list : {
		match : {
			enabled : true
		}
	},
	
	requestDelay: 500,

	theme : "round"
};
