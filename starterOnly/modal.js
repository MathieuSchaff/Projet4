// Creer array, 
function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const modalBtnNone = document.querySelector('.close');
const last = document.getElementById("last");
const first = document.getElementById("first");
const quantity = document.getElementById("quantity");
const email = document.getElementById("email");
const form = document.getElementById('form');
const birthdate = document.getElementById('birthdate');
const checkboxObligatoire = document.getElementById('checkbox1');
const modalBody =document.querySelector('.modal-body');


// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}
// Je display none le formulaire lorsque je clique sur la croix
modalBtnNone.addEventListener('click', function(){
modalbg.style.display = "none";
});
// fermer la modale quand appui sur ESC
window.addEventListener('keydown', function(e){
  if(e.key === "Escape" || e.key =="esc"){
    modalbg.style.display = "none";
  }
});

// test avec une regex de email. Si email correspond a regex renvoi true, sinon false
function validateEmail(email) {
  
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}
// test d'un prénom ou nom de famille
function validateFirstLast(value) {
  return /^[a-z ,.'-]+$/i.test(value)
}
// test d'une date 
function validateDate(date){
  
  return /[0-9]{4}[-|\/]{1}[0-9]{2}[-|\/]{1}[0-9]{2}/.test(date);
};
// L'objet errors sera appelé pour la validation du formulaire
let errors = {
  first: null,
  last: null, 
  birthdate: null,
  email: null,
  tournoi: null,
  location: true,
  conditions: null,
  newevents: null,
};
// AU CHANGEMENT DE FOCUS, VA TESTER LA VALIDITE DES VALUE RENTRE
first.addEventListener("change", testFirst);
last.addEventListener("change", testLast);
email.addEventListener("change", testEmail); 
birthdate.addEventListener("change", testBirthdate);
quantity.addEventListener("change", testTournoi);
checkboxObligatoire.addEventListener("change", testCheckboxObligatoire);
// LES EVENT INPUT QUAND VALUE VIDE, enlève l'erreur
first.addEventListener ("input", function(){
  if (first.value == ""){
    errors.first= true;
    first.closest('.formData').removeAttribute('data-error-visible');
    first.closest('.formData').removeAttribute('data-error');
  }
});

last.addEventListener ("input", function(){
  if (last.value == ""){
    last.closest('.formData').removeAttribute('data-error-visible');
    last.closest('.formData').removeAttribute('data-error');
  }
});
email.addEventListener ("input", function(){
  if (email.value == ""){
    email.closest('.formData').removeAttribute('data-error-visible');
    email.closest('.formData').removeAttribute('data-error');
  }
});
// TEST LE PRENOM
function testFirst() {
  if (validateFirstLast(first.value)) {
    first.closest('.formData').removeAttribute('data-error-visible');
    first.closest('.formData').removeAttribute('data-error');
    errors.first= false;
  } else {
    errors.first= true;
    first.closest('.formData').setAttribute('data-error', `Le champ prénom a un minimum de 2 caractères / n'est pas vide.`);
    first.closest('.formData').setAttribute('data-error-visible', true);
  }
}


//TEST POUR LE NOM DE FAMILLE
  function testLast() {
  if (validateFirstLast(last.value)) {
    last.closest('.formData').removeAttribute('data-error-visible');
    last.closest('.formData').removeAttribute('data-error');
    errors.last= false;
  } else {
    errors.last= true;
    last.closest('.formData').setAttribute('data-error', `Le champ Nom a un minimum de 2 caractères / n'est pas vide.`);
    last.closest('.formData').setAttribute('data-error-visible', true);
  }
}


// TEST POUR EMAIL
function testEmail() {
    if (validateEmail(email.value)) {
      email.closest('.formData').removeAttribute('data-error-visible');
      email.closest('.formData').removeAttribute('data-error');
      errors.email= false;
    } else {
      errors.email= true;
      email.closest('.formData').setAttribute('data-error', `Adresse mail incorrecte`);
      email.closest('.formData').setAttribute('data-error-visible', true);
    }
}

//TEST DATE 
function testBirthdate() {
  if (validateDate(birthdate.value)) {
    birthdate.closest('.formData').removeAttribute('data-error-visible');
    birthdate.closest('.formData').removeAttribute('data-error');
    errors.birthdate = false;
  } else {
    errors.birthdate = true;
    birthdate.closest('.formData').setAttribute('data-error', `Date de naissance invalide`);
    birthdate.closest('.formData').setAttribute('data-error-visible', true);
  }
}


// VALIDE LE NOMBRE DE TOURNOI DEJA PARTICIPE
function testTournoi(){
    if (!quantity.value || quantity.value > 99 || quantity.value < 0){
      quantity.closest('.formData').setAttribute('data-error', `Veuillez rentrer un chiffre entre 0 et 99`);
      quantity.closest('.formData').setAttribute('data-error-visible', true);
      errors.quantity = true;
    }else {
      errors.quantity = false;
      quantity.closest('.formData').removeAttribute('data-error');
      quantity.closest('.formData').removeAttribute('data-error-visible');
    }
}


// checkbox obligatoire enlevé si coché
function testCheckboxObligatoire(){
    if(checkboxObligatoire.checked){
      errors.conditions = false;
      checkboxObligatoire.closest('.formData').removeAttribute('data-error-visible');
      checkboxObligatoire.closest('.formData').removeAttribute('data-error');
    }else{
      errors.conditions = true;
      checkboxObligatoire.closest('.formData').setAttribute('data-error', `Vous devez acceptez les conditions générales d'utilisations`);
      checkboxObligatoire.closest('.formData').setAttribute('data-error-visible', true);
    }
}

// Test si l'utilisateur souhaite être prévenu des prochains événements. 
// Si oui, alors errors.newevents passe à true, sinon false;
const newsEvent = document.getElementById('checkbox2');
newsEvent.addEventListener("change", function(){
  if(newsEvent.checked){
   errors.newevents = true;
  }
  else {
    errors.newevents = false;
  }
});

// Fonction qui regarde si un button type radio est coché
// Si coché alors locationValue prend la valeur du champ coché
// Si rien n'est coché alors locationValue est undefined, renvoie false
//Si coché renvoi true, alors error.location prend la valeur inverse
// errors.location = fausse si quelque chose est coché, renvoi true si rien n'est coché.
// errors.location = false pour valider formulaire
const formLocation = document.getElementById('formLocation');
let radioLocation = document.querySelectorAll('input[name="location"]');
  function testCheckBoxLocation(){
    for (let loc of radioLocation){
      if(loc.checked){
        errors.location = false;
        formLocation.removeAttribute('data-error-visible');
        formLocation.removeAttribute('data-error');
      }else {
        formLocation.setAttribute('data-error', `Vous devez choisir une ville`);
        formLocation.setAttribute('data-error-visible', true);
      }
    }
  }
// Submit du formulaire => va appeler toutes les fonction qui vont infirmer ou confirmer la value des input qui ont été rentré
//Chaque fonction qui teste les inputs , va modifier l'objet errors. 
// Si l'objet errors a une de ses clés qui a la valeur false alors le submit est empéché , si tous les input sont bons, alors un message est écrit pour confirmer la validation du formulaire
  form.addEventListener('submit', function(e){
    testCheckBoxLocation();
    testFirst();
    testLast();
    testEmail();
    testBirthdate();
    testTournoi();
    testCheckboxObligatoire();
    if (errors.first || errors.last || errors.birthdate || errors.email || errors.tournoi || errors.location || errors.conditions){
      e.preventDefault();
    }else {
      modalBody.innerHTML = `<div class="submitEnd"> Tank you for submitting your registration details</div>
      
      <div
      id="closeButton"
      class="btn-close">
      Close
    </div>
      
      `
      const closeButton = document.getElementById('closeButton');
      closeButton.addEventListener('click', function(){
        modalbg.style.display = "none";
        });
    }
  
  });
