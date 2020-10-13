var EmailApp = {
	init: function() {
		this.loadEmails();
	},

	bindEvents: function() {
		$(".email-item").on("click.emailSelection", function(e) {
			document.querySelector(".list-view").style.display = "none";
			var selectedViewElem = document.querySelector(".selected-view")
			selectedViewElem.style.display = "block";

			selectedViewElem.querySelector(".subject-text").innerHTML = e.currentTarget.getAttribute("data-subject");
			selectedViewElem.querySelector(".from-friendly").innerHTML = e.currentTarget.getAttribute("data-from-friendly");
			selectedViewElem.querySelector(".from-email").innerHTML = "&lt;" + e.currentTarget.getAttribute("data-from") + "&gt;";
			selectedViewElem.querySelector(".email-body").innerHTML = e.currentTarget.getAttribute("data-body");
		})
	},

	loadEmails: function() {
		console.log(testEmailData);
		var emailListElem = document.querySelector(".list-view .email-list");

		testEmailData.list.forEach(function(email, i) {
			var templateSrc = document.getElementById("email-template").textContent;
			var template = Handlebars.compile(templateSrc);

			var html = template(email);

			emailListElem.innerHTML += html;
		});

		this.bindEvents();
	}
}

var testEmailData = {
  "list": [
		{
			"id": "00001",
      "to": "ianboyte@gmail.com",
			"to-friendly": "Ian Boyte",
			"from": "test@gmail.com",
			"from-friendly": "Test Jones",
      "timestamp": "12/12/2016 08:20:00",
      "subject": "Welcome to Test Mail",
			"body": "<p>this is test mail</p>",
			"attachments": []
    },
		{
			"id": "00002",
      "to": "ianboyte@gmail.com",
			"to-friendly": "Ian Boyte",
			"from": "daniel@gmail.com",
			"from-friendly": "Daniel",
      "timestamp": "12/13/2016 08:20:00",
      "subject": "Hi",
			"body": "<p>how are you doing today</p>",
			"attachments": []
    },
		{
			"id": "00003",
      "to": "ianboyte@gmail.com",
			"to-friendly": "Ian Boyte",
			"from": "test@gmail.com",
			"from-friendly": "Test Jones",
      "timestamp": "12/14/2016 08:20:00",
      "subject": "Lorem Ipsum",
			"body": "<p>Lorem all the ipsums<p>",
			"attachments": []
    },
		{
			"id": "00004",
			"to": "ianboyte@gmail.com",
			"to-friendly": "Ian Boyte",
      "from": "nigerianprince@gmail.com",
			"from-friendly": "Prince of Nigeria",
      "timestamp": "12/15/2016 08:20:00",
      "subject": "I have wondrfull offer!",
			"body": "<a href='http://www.google.com'>I have millions of american dollars ready to give to you!</a>",
			"attachments": []
    }
	]
}


EmailApp.init();
