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
const formData = document.querySelectorAll(".formData");
const modalBtnNone = document.querySelector('.close');
const submitBtn = document.querySelector('.btn-submit');
const last = document.getElementById("last");
const first = document.getElementById("first");
const quantity = document.getElementById("quantity");
const email = document.getElementById("email");
const form = document.getElementById('form');
const birthdate = document.getElementById('birthdate');
const checkboxObligatoire = document.getElementById('checkbox1');


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


// test avec une regex de email. Si email correspond a regex renvoi true, sinon false
function validateEmail(email) {
  
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}
function validateFirstLast(value) {
  
  return /^[a-z ,.'-]+$/i.test(value)
}
function validateDate(date){
  
  return /[0-9]{4}[-|\/]{1}[0-9]{2}[-|\/]{1}[0-9]{2}/.test(date);
};

let errors = {
  first: null,
  last: null, 
  birthdate: null,
  email: null,
  tournoi: null,
  location: null,
  conditions: null,
  newevents: null,

};
  // FAIRE UN TABLEAU DES NOMS DES PERSONNES INSCRITES 
  class Users {
    constructor (first, last, birthdate, email, quantity, location, newEvents){

      this.first = first;
      this.last = last;
      this.birthdate = birthdate;
      this.email = email;
      this.quantity = quantity;
      this.location = location;
      this.newEvents = newEvents;
    }
  }
// Tableau des utilisateurs
let users = [];
  // errors = {
  //   first: false pour valider formulaire
  //   last: false pour valider formulaire
  //   birthdate: false pour valider formulaire
  //   email: false pour valider formulaire
  //   tournoi: false pour valider formulaire
  //   location: false pour valider formulaire
  //   conditions: false pour valider formulaire
  //   newevents: peu importe si true ou false, valeur arbitraire a utiliser pour envoyer des news
form.addEventListener('submit', function(e){
  testCheckBoxLocation();
  if (errors.first || errors.last || errors.birthdate || errors.email || errors.tournoi || errors.location || errors.conditions){
    e.preventDefault();
  }else{
    users.push(new Users(first.value, last.value, birthdate.value, email.value, quantity.value, locationValue, errors.newevents)) 
  }

});
// TEST POUR PRENOM 
first
  .addEventListener("change", function(e) {
  if (/^[a-z ,.'-]+$/i.test(e.target.value)) {
    first.closest('.formData').removeAttribute('data-error-visible');
    first.closest('.formData').removeAttribute('data-error');
    errors.first= false;
  } else {
    errors.first= true;
    first.closest('.formData').setAttribute('data-error', `Le champ prénom a un minimum de 2 caractères / n'est pas vide.`);
    first.closest('.formData').setAttribute('data-error-visible', true);
  }
});
first.addEventListener ("input", function(e){
  if (first.value == ""){
    errors.first= true;
    first.closest('.formData').removeAttribute('data-error-visible');
    first.closest('.formData').removeAttribute('data-error');
  }
});

//TEST POUR LE NOM DE FAMILLE
last
  .addEventListener("change", function(e) {
  if (/^[a-z ,.'-]+$/i.test(e.target.value)) {
    last.closest('.formData').removeAttribute('data-error-visible');
    last.closest('.formData').removeAttribute('data-error');
    errors.last= false;
  } else {
    errors.last= true;
    last.closest('.formData').setAttribute('data-error', `Le champ Nom a un minimum de 2 caractères / n'est pas vide.`);
    last.closest('.formData').setAttribute('data-error-visible', true);
  }
});
last.addEventListener ("input", function(e){
  if (last.value == ""){
    last.closest('.formData').removeAttribute('data-error-visible');
    last.closest('.formData').removeAttribute('data-error');
  }
});
//
// TEST POUR EMAIL
email
  .addEventListener("change", function() {
    if (validateEmail(email.value)) {
      email.closest('.formData').removeAttribute('data-error-visible');
      email.closest('.formData').removeAttribute('data-error');
      errors.email= false;
    } else {
      errors.email= true;
      email.closest('.formData').setAttribute('data-error', `Adresse mail incorrecte`);
      email.closest('.formData').setAttribute('data-error-visible', true);
    }
});
email.addEventListener ("input", function(){
  if (email.value == ""){
    email.closest('.formData').removeAttribute('data-error-visible');
    email.closest('.formData').removeAttribute('data-error');
  }
});
//TEST DATE 
birthdate
  .addEventListener("change", function() {
  if (validateDate(birthdate.value)) {
    birthdate.closest('.formData').removeAttribute('data-error-visible');
    birthdate.closest('.formData').removeAttribute('data-error');
    errors.birthdate = false;
  } else {
    errors.birthdate = true;
    birthdate.closest('.formData').setAttribute('data-error', `Date de naissance invalide`);
    birthdate.closest('.formData').setAttribute('data-error-visible', true);
  }
});
// VALIDE LE NOMBRE DE TOURNOI DEJA PARTICIPE
quantity
  .addEventListener("change", function(e){
    if (!quantity.value || quantity.value > 99 || quantity.value < 0){
      quantity.closest('.formData').setAttribute('data-error', `Veuillez rentrer un chiffre entre 0 et 99`);
      quantity.closest('.formData').setAttribute('data-error-visible', true);
      errors.quantity = true;
    }else {
      errors.quantity = false;
      quantity.closest('.formData').removeAttribute('data-error');
      quantity.closest('.formData').removeAttribute('data-error-visible');
    }
});
// checkbox obligatoire enlevé si coché
checkboxObligatoire
  .addEventListener("change", function(e){
    if(checkboxObligatoire.checked){
      errors.conditions = false;
      checkboxObligatoire.closest('.formData').removeAttribute('data-error-visible');
      checkboxObligatoire.closest('.formData').removeAttribute('data-error');
    }else{
      errors.conditions = true;
      checkboxObligatoire.closest('.formData').setAttribute('data-error', `Vous devez acceptez les conditions générales d'utilisations`);
      checkboxObligatoire.closest('.formData').setAttribute('data-error-visible', true);
    }
});
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


const formLocation = document.getElementById('formLocation');
let locationValue;
let radioLocation = document.querySelectorAll('input[name="location"]');
// Fonction qui regarde si un button type radio est coché
// Si coché alors locationValue prend la valeur du champ coché
// Si rien n'est coché alors locationValue est undefined, renvoie false
//Si coché renvoi true, alors error.location prend la valeur inverse
// errors.location = fausse si quelque chose est coché, renvoi true si rien n'est coché.
// errors.location = false pour valider formulaire
  function testCheckBoxLocation(){
    for (let loc of radioLocation){
      if(loc.checked){
        locationValue = loc.value;
        errors.location = !(Boolean(locationValue));
        formLocation.removeAttribute('data-error-visible');
        formLocation.removeAttribute('data-error');
        alert(loc.value)
      }else {
        errors.location = !(Boolean(locationValue));
        formLocation.setAttribute('data-error', `Vous devez choisir une ville`);
        formLocation.setAttribute('data-error-visible', true);
      }
    }
  }
  


