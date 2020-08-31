// Calculate listener
document.getElementById('loanForm').addEventListener('submit', calculate);


// Calculate function
function calculate(e){
    console.log('calculating');
    // Constant UI variables
    const amountEl = document.getElementById('amount');
    const interestEl = document.getElementById('interest'); 
    const yearsEl = document.getElementById('years');
    const monthlyEl = document.getElementById('monthly-pay');
    const totalPayEl = document.getElementById('total-pay');
    const totalInterestEl = document.getElementById('total-interest');

    const principal = parseFloat(amountEl.value);
    const calculatedInt = parseFloat(interestEl.value) / 100 / 12;
    const calculatedPay = parseFloat(yearsEl.value) * 12;

    // Monthly payment
    const x = Math.pow(1 + calculatedInt, calculatedPay);
    const monthly = (principal * x * calculatedInt)/(x-1);

    if(isFinite(monthly)){
        monthlyEl.value = monthly.toFixed(2);
        totalPayEl.value = (monthly * calculatedPay).toFixed(2);
        totalInterestEl.value = ((monthly * calculatedPay)-principal).toFixed(2);
    }
    else{
        showError('Please check you inputs.');
    }

    e.preventDeafult();
}

// Error
function showError(error){
    // Create
    const errorDiv = document.createElement('div');
    const card = document.querySelector('.card'); 

    // Add class
    errorDiv.className = 'alert alert-danger';

    // Create text node
    errorDiv.appendChild(document.createTextNode(error)); 
}