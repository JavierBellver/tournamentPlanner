module.exports = {
	API_URL : 'http://' + window.location.host + '/api/tournaments',
	getTournaments: function() {
		return fetch(this.API_URL)
			.then(function(response) {
				if (response.ok) {
					return response.json();
				}
			})
	},
	createTournament: function(tournament) {
		return fetch(this.API_URL, {
        	method: "POST", 
        	headers: { 
          		'Accept': 'application/json', 
          		'Content-Type': 'application/json', 
        	}, 
        	body: JSON.stringify(tournament)
      	})
		.then(function(response) {
			if (response.ok) {
				return response;
			}
		})
	},
	editTournament: function(tournament,id) {
		return fetch(this.API_URL+'/'+id, {
        	method: "PUT", 
        	headers: { 
          		'Accept': 'application/json', 
          		'Content-Type': 'application/json', 
        	}, 
        	body: JSON.stringify(tournament)
      	})
		.then(function(response) {
			return response;
		})
	},
	deleteTournament: function(id) {
		return fetch(this.API_URL+'/'+id, {
        	method: "DELETE", 
        	headers: { 
          		'Accept': 'application/json' 
        	}
      	})
		.then(function(response) {
			if (response.ok) {
				return response;
			}
		})
	}
}