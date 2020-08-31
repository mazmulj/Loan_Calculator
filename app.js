// Calculate listener
document.querySelector('#loanForm').addEventListener('submit', function(e){
    // Show loader and hide results
    document.getElementById('results').style.display = 'none';
    document.getElementById('loading').style.display = 'block';
    setTimeout(calculate, 2000);

    e.preventDefault();
});


// Calculate function
function calculate(){
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

        // Show results and hide loader
        document.getElementById('results').style.display = 'block';
        document.getElementById('loading').style.display = 'none';
    }
    else{
        showError('Please check you inputs.');
    }
}

// Error
function showError(error){
    // Hide results and loader
    document.getElementById('results').style.display = 'none';
    document.getElementById('loading').style.display = 'none';

    // Create
    const errorDiv = document.createElement('div');

    // Add class
    errorDiv.className = 'alert alert-danger';

    // Create text node
    errorDiv.appendChild(document.createTextNode(error)); 

    // Insert errorDiv
    const card = document.querySelector('.card');  
    const heading = document.querySelector('.heading');
    card.insertBefore(errorDiv, heading);

    // Remove error message
    setTimeout(clearError, 3000);
}

// Clear error
function clearError(){
    document.querySelector('.alert').remove();
}