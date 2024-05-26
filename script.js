

const depositAmountButton = document.getElementById("deposit-button");
const depositAmount =  document.getElementById('deposit-amount');
const amount = document.getElementById('amount');
const balanceValue = document.getElementById('balance-amount');
const expenseValue = document.getElementById('expenses-value');
let tempAmount = 0;
const errorMessage = document.getElementById('deposit-error')
depositAmountButton.addEventListener('click', ()=>{
    tempAmount = depositAmount.value;
    if(tempAmount === ''){
        errorMessage.classList.remove('hide');
        errorMessage.innerText = `Deposit value can't be empty...`;
    }else if(tempAmount <= 0 ){
        errorMessage.classList.remove('hide');
        errorMessage.innerText = `invalid deposit value...`
    }else{
        errorMessage.classList.add('hide');
        amount.innerText = tempAmount;
        balanceValue.innerText = tempAmount - expenseValue.innerText;
        depositAmount.value = "";
    }
});

const expenseAmountButton = document.getElementById('expense-amount-button');
const productTitle = document.getElementById('product-title');
const userAmount = document.getElementById('user-amount');
const productError = document.getElementById("product-title-error");

const modifyElement = (element, edit = false)=>{
    let currentBalance = balanceValue.innerText;
    let currentExpense = expenseValue.innerText;
    let parentDiv = element.parentElement;
    let parentAmount = parentDiv.querySelector(".amount").innerText;
    if(edit){
        let parentText = parentDiv.querySelector(".product").innerText;
        userAmount.value = parentAmount;
        productTitle.value = parentText;
    }
    
    balanceValue.innerText = parseInt(currentBalance) + parseInt(parentAmount);
    expenseValue.innerText = parseInt(currentExpense) - parseInt(parentAmount)
    parentDiv.remove();
}

const listCreator = (expenseName, expenseValue)=>{
    let subListContent = document.createElement("div");
    subListContent.classList.add('sublist-content', 'flex-space');
    subListContent.innerHTML = `<p class = "product">${expenseName}</p> <p class="amount">${expenseValue}</p>`;
    let editButton = document.createElement('button');
    editButton.classList.add('edit', 'fa-solid', 'fa-pen-to-square');
    editButton.style.fontSize = "1.2em";
    editButton.addEventListener('click', (e)=>{
        e.preventDefault();
        modifyElement(editButton, true);
    })

    let deleteButton = document.createElement('button');
    deleteButton.classList.add('delete', 'fa-solid', 'fa-trash-can');
    deleteButton.style.fontSize = "1.2em";
    deleteButton.addEventListener('click', (e)=>{
        e.preventDefault();
        modifyElement(deleteButton);
    })
    subListContent.appendChild(editButton)
    subListContent.appendChild(deleteButton);
    list.appendChild(subListContent);
}
expenseAmountButton.addEventListener('click', ()=>{
    if(!productTitle.value === '' || !userAmount.value){
        productError.classList.remove('hide');
        productError.innerText = "Expense value can't empty";
        return;
    }else if(productTitle.value.trim().length <= 0 || userAmount.value <= 0){
        productError.classList.remove('hide');
        productError.innerText = 'In-valid data';
        return;
    }
    let expenditure = parseInt(userAmount.value);
    let sum = parseInt(expenseValue.innerText) + expenditure;
    const totalBalance = tempAmount - sum;

    expenseValue.innerText = sum;
    balanceValue.innerText = totalBalance;
    listCreator(productTitle.value, userAmount.value)
    productTitle.value = "";
    userAmount.value = "";
});