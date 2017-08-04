var MAX_PLAYERS = 6;
var ADD_PLAYER_ID = 2;

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
			
			jQuery('#bgg-form').submit(
				function() {
				    var n = $("#game-search").val().split(" ");
				    var gameId = n[n.length - 1];
				    alert(gameId);
					$("#game-search").val(gameId);
				}	
			);

			$("#game-search").easyAutocomplete(options);
		});

var options = {

	url : function(phrase) {
		phrase = phrase.split(' ').join('+');
		return "https://www.boardgamegeek.com/xmlapi2/search?query=" + phrase + "&type=boardgame";
	},

	dataType : "xml",
	xmlElementName : "item",

	getValue : function(element) {
		return $(element).find("name").attr('value') + ' (' + $(element).find("yearpublished").attr('value') + ') - ' + $(element).attr('id');
	},

	list : {
		match : {
			enabled : true
		}
	}, 
	
	requestDelay: 1000
	
};
