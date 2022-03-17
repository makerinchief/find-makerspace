// Email JS functions
(function () { emailjs.init("user_zEaMjktSGuSK3vfKZTaF3"); })();

window.onload = function () {

  document.getElementById('contact-form').addEventListener('submit',
    function (event) {

      event.preventDefault();
      const formData = new FormData(event.target);

      if (formData.get('email') !== "") {
        // generate a five digit number for the contact_number variable
        // this.contact_number.value = Math.random() * 100000 | 0;
        emailjs.sendForm('match_game_service', 'match_game_template', this)
          .then(function () {
            console.log('SUCCESS!');
            closeContact();
            window.alert("Thank you for the message!");
          }, function (error) {
            console.log('FAILED...', error);
          });

      } else {
          console.log("no email");
    }
    }
  );

}
