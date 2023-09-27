// Fetch user information
const fetchUserData = async (callBack) => {
  const userResponse = await fetch('http://localhost:3000/user/1');
  const userJson = await userResponse.json();
  callBack(userJson);
};

const createUserDetailsHTML = (user) => {
  const userElement = document.createElement('div');
  userElement.innerHTML = `
    <div class="user-info">
      ${user.username}
      <div>Balance: ${user.balance}</div>
    </div>
  
    <div class="actions">
      <button class="add-income">Income</button>
      <button class="add-expense">Expense</button>
    </div>
    
    <div class="details">
      <div class="row">
        ${user.incomes.map((income) => (
          `
            <div class="incomes-box column">
              <div>${income.description}</div>
              <div>${income.amount}</div>
            </div>
          `)).join('')}
      </div>
      <div class="row">
        ${user.expenses.map((expense) => (
          `<div class="expenses-box column">
            <div>${expense.description}</div>
            <div>${expense.amount}</div>
          </div>`
        )).join('')}
      </div>
    </div>
  `;

  return userElement;
};

// Function to handle adding income or expense
const handleAddTransaction = (type, { amount, description }) => {
  fetch(`http://localhost:3000/${type}/1`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      categoryId: '1',
      description,
      amount
    }),
  }).then(() => {
    window.location.reload();
  });
};

document.addEventListener('DOMContentLoaded', () => {
  const glassBox = document.querySelector('.glassbox');

  fetchUserData((user) => {
    const userElement = createUserDetailsHTML(user);
    glassBox.appendChild(userElement);

    const addIncomeButton = document.querySelector('.add-income');
    const addExpenseButton = document.querySelector('.add-expense');

    addIncomeButton.addEventListener('click', () => {
      incomeModal.style.display = 'block';

      const closeIncomeModalButton = document.querySelector('.close-income');
      closeIncomeModalButton.addEventListener('click', () => {
        incomeModal.style.display = 'none';
      });

      const addIncomeButton = document.querySelector('.income-submit');

      addIncomeButton.addEventListener('click', () => {
        const amount = document.querySelector(".income-amount").value;
        const description = document.querySelector(".income-description").value || 'No name';

        handleAddTransaction('income', {
          amount: +amount,
          description: description
        });
      });

    });

    addExpenseButton.addEventListener('click', () => {
      expenseModal.style.display = 'block';

      const closeExpenseModalButton = document.querySelector('.close-expense');
      closeExpenseModalButton.addEventListener('click', (event) => {
        expenseModal.style.display = 'none';
      });

      const addExpenseButton = document.querySelector('.expense-submit');

      addExpenseButton.addEventListener('click', (event) => {
        const amount = document.querySelector(".expense-amount").value;
        const description = document.querySelector(".expense-description").value || 'No name';

        handleAddTransaction('expense', {
          amount: +amount,
          description: description
        });
      });
    });
  });
});