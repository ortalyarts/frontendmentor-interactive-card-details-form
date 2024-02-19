// Form validation
const btnSubmit = document.querySelector('#submit');

const inputName = document.querySelector('#name');
const inputNumber = document.querySelector('#number');
const inputMonth = document.querySelector('#month');
const inputYear = document.querySelector('#year');
const inputCvc = document.querySelector('#cvc');
const successMessage = document.querySelector('.success-message-container');
const mainHolder = document.querySelector('#form-holder');
const btnDismiss = document.querySelector('#btn-dismiss');

const previewName = document.querySelector('#preview-name');
const previewNumber = document.querySelector('#preview-number');
const previewMonth = document.querySelector('#preview-month');
const previewYear = document.querySelector('#preview-year');
const previewCvc = document.querySelector('#preview-cvc');

let userNumber;
let formattedNumber;

//Updating card text on typing
const updateCardValue = (field, text) => {
  field.innerText= text;
}
inputName.addEventListener('keyup', ()=>{
  updateCardValue(previewName, inputName.value);
});
inputNumber.addEventListener('keyup', ()=>{
  userNumber = inputNumber.value;
  //formatting number with space after each 4th character
  formattedNumber = userNumber.match(/.{1,4}/g).join(' ');
  updateCardValue(previewNumber, formattedNumber);
});
inputMonth.addEventListener('keyup', ()=>{
  updateCardValue(previewMonth, inputMonth.value);
});
inputYear.addEventListener('keyup', ()=>{
  updateCardValue(previewYear, inputYear.value);
});
inputCvc.addEventListener('keyup', ()=>{
  updateCardValue(previewCvc, inputCvc.value);
});


const showSuccessMessage = () =>{
  mainHolder.classList.add('hide');
  successMessage.classList.remove('hide');
  btnDismiss.focus(); // programmatic focus for Screen readers
}
btnDismiss.addEventListener('click', () =>{
  successMessage.classList.add('hide');
  mainHolder.classList.remove('hide');
  // clear all input fields
  inputName.value = '';
  inputNumber.value = '';
  inputMonth.value = '';
  inputYear.value = '';
  inputCvc.value = '';

  // clear all card fields
  previewName.innerText = 'Jane Appleseed';
  previewNumber.innerText = '0000 0000 0000 0000';
  previewMonth.innerText = '00';
  previewYear.innerText = '00';
  previewCvc.innerText = '000';
})

// flags
let isValidName;
let isValidNumber;
let isValidMonth;
let isValidYear;
let isValidCvc;

// Function validating the filds
function validate(inputId, inputType){
  let n = inputId; // get input id
  let nInvalidMessage = inputId.parentNode.querySelector('.invalid-message');

  function addError (errorText){
    nInvalidMessage.innerText = `${errorText}`;
    nInvalidMessage.classList.add('activeMessage');
    inputId.classList.add('input-invalid');
  }
  function removeError (){
    nInvalidMessage.classList.remove('activeMessage');
    inputId.classList.remove('input-invalid');
  }
   
  // Name validation
  if (inputType == "name"){
    if (inputId.value == "") {
      addError("Can't be blank");
      isValidName = false;
    } else{
      inputId.classList.remove('input-invalid');
      nInvalidMessage.classList.remove('activeMessage');
      isValidName = true;
    }
  }

  // Number validation 
  if (inputType == "number") {
    if (inputId.value == "") {
      addError("Can't be blank");
      isValidNumber = false;
    } else if (inputId.value.length < 2 || isNaN(inputId.value)) { 
      // change the length!!!
      addError('Wrong format, numbers only');
      isValidNumber = false;
    } else{
      removeError();
      isValidNumber = true;
    }
  }

  // Month validation 
  if (inputType == "month") {
    if (inputId.value == "") {
      addError("Can't be blank");
      isValidMonth = false;
      console.log('I added the error 1');
    } else if (inputId.value.length !== 2 || isNaN(inputId.value) || inputId.value <= 0 || inputId.value > 12) { 
      addError('Wrong format');
      isValidMonth = false;
      console.log('I added the error 2');
    } else{
      removeError();
      isValidMonth = true;
    }
  }
    // Year validation 
  else if (inputType == "year") {
    if (inputId.value == "") {
      addError("Can't be blank");
      isValidYear = false;
    } else if (inputId.value.length !== 2 || isNaN(inputId.value) || inputId.value < 0) { 
      addError('Wrong format');
      isValidYear = false;
    } else{
      removeError();
      isValidYear = true;
    }
  }
  // CVC validation 
  if (inputType == "cvc") {
    if (inputId.value == "") {
      addError("Can't be blank");
      isValidCvc = false;
    } else if (inputId.value.length < 3 || isNaN(inputId.value)) { 
      addError('Wrong format');
      isValidCvc = false;
    } else{
      removeError();
      isValidCvc = true;
    }
  }
}

btnSubmit.addEventListener('click', () =>{
  // Calling validation for all the fields

  validate(inputName, 'name');
  validate(inputNumber, 'number');
  validate(inputMonth, 'month');
  validate(inputYear, 'year');
  validate(inputCvc, 'cvc');

  // If all the fiealds are valid - show success message
  if(isValidName && isValidNumber && isValidMonth && isValidYear && isValidCvc){
    showSuccessMessage();
  }
})
