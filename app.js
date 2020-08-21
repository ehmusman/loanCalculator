document.getElementById('loan-form').addEventListener('submit', function(e){
  // hide results
  document.getElementById('result').style.display = 'none';


  // show loading image for one second
document.getElementById('loading').style.display = 'inline'

// hide the reset all buttons
 document.querySelector('div.reset').style.display = 'none'  
  // hide the reset all button
  setTimeout(calculateResults,1000)


  e.preventDefault()
});

// we will delay the result
function calculateResults(){
// console.log('calculating.....');

// UI variables
// amount variable
const amount = document.getElementById('amount');
// interest rate variable
const interest = document.getElementById('interest');
// years to pay
const years = document.getElementById('years');
// monthly payment
const monthlyPayment = document.getElementById('monthly-payment');
// total payment
const totalPayment = document.getElementById('total-payment');
// total interest
const totalInterest = document.getElementById('total-interest')

const principal = parseFloat(amount.value);
const calculatedInterest = parseFloat(interest.value)/100/12;
const calculatedPayments = parseFloat(years.value)*12;

// compute monthly payment
const x = Math.pow(1 + calculatedInterest , calculatedPayments);
const monthly = (principal*x*calculatedInterest)/(x-1);


// hide the loading image
document.getElementById('loading').style.display = 'none'


if (isFinite(monthly)){

// show results
document.getElementById('result').style.display = 'block';

// show the reset all button
document.querySelector('div.reset').style.display = 'block'

document.querySelector('div.reset input#resetAll').addEventListener('dblclick', resetAll);

  monthlyPayment.value = monthly.toFixed(2);
  totalPayment.value = (monthly*calculatedPayments).toFixed(2);
  totalInterest.value = ((monthly*calculatedPayments)-principal).toFixed(2);
}else {
showError('please check your numbers')
}

}
// // Reset All 

function resetAll (){
  document.getElementById('amount').value = '';
  document.getElementById('interest').value = '';
  document.getElementById('years').value = '';
  document.getElementById('result').style.display = 'none';
  document.querySelector('div.reset').style.display = 'none';
  document.getElementById('loading').style.display = 'none';
}

function showError(error){
  // hide results
  document.getElementById('result').style.display = 'none';
  // show loading image for one second
  document.getElementById('loading').style.display = 'none'
  

  // create an element div
  const errorDiv = document.createElement('div');
  // add class
  errorDiv.id = 'alert'
  // create text node
  errorDiv.appendChild(document.createTextNode(error));


  // get elements where we have to insert this newly created element
  const container = document.querySelector('.container')
  const heading = document.querySelector('#heading')


  // insert error above heading
  container.insertBefore(errorDiv,heading)

  // this error should be disapppear after some time
  // in JS windowObject we have an object setTimeOut
  // it has two parameters setTimeOut(function , miliseconds);

  
  // clear error after 2 or 3 seconds
  setTimeout(clearError , 2000);
  
  // show the loading image for 1 second and then disappear it
}
function clearError(){
  document.querySelector("#alert").remove();  
}
