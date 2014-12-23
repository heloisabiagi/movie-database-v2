MDB.addActor = (function() {

	function postActor(form) {
		var actor = {};
		var form = form;

		var formattedDate = form.find("#dateOfBirth").val().replace("-", ",");


		actor.name = form.find("#name").val();
		actor.dateOfBirth = new Date(formattedDate);
		actor.placeOfBirth = form.find("#placeOfBirth").val();
		actor.filmography = [];

		$(".filmography").each(function(){
			var movie = $(this).val();
			if(movie !== "") {
				actor.filmography.push(movie);
			}
		});

		var myData = JSON.stringify(actor);

		$.ajax({
			url: "/ws/actor",
			method: "POST",
			contentType: "application/json",
			dataType: "json",
			data: myData,
			success: function(xhr) {
				alert("Ator cadastrado com sucesso!");
				resetForm();
			}
		});

	}

	function resetForm() {
		var form = $("#actor-form");
		form.find("#name").val("");
		form.find("#dateOfBirth").val("");
		form.find("#placeOfBirth").val("");
		$(".filmography").val("");
	}

	function bindEvents() {
		$("#actor-form").on("submit", function(e){
			e.preventDefault();

			var form = $(this);
			postActor(form);
		});

	}

	return {
		init: function(){
			bindEvents();
		}
	}
})();

MDB.addActor.init();