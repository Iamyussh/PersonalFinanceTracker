document.addEventListener('DOMContentLoaded', function () {
    const expenseForm = document.getElementById('expenseForm');
    let totalExpenses = 0;
    let categoryTotals = {
        food: 0,
        transport: 0,
        entertainment: 0,
        // Add other categories as needed
    };

    if (expenseForm) {
        expenseForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const description = document.getElementById('description').value;
            const amount = parseFloat(document.getElementById('amount').value);
            const date = document.getElementById('date').value;
            const category = document.getElementById('category').value;

            const expense = {
                description: description,
                amount: amount,
                date: date,
                category: category
            };

            saveExpense(expense);
            addExpense(expense);
        });
    }

    function addExpense(expense) {
        const table = document.getElementById('expensesTable').getElementsByTagName('tbody')[0];

        const newRow = table.insertRow();
        const descriptionCell = newRow.insertCell(0);
        const amountCell = newRow.insertCell(1);
        const dateCell = newRow.insertCell(2);
        const categoryCell = newRow.insertCell(3);
        const deleteCell = newRow.insertCell(4); // Cell for the delete button

        descriptionCell.textContent = expense.description;
        amountCell.textContent = expense.amount.toFixed(2);
        dateCell.textContent = expense.date;
        categoryCell.textContent = expense.category;

        // Create the delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-btn');
        deleteButton.addEventListener('click', function () {
            deleteExpense(expense, newRow);
        });
        deleteCell.appendChild(deleteButton);

        totalExpenses += expense.amount;
        categoryTotals[expense.category] += expense.amount;

        updateTotalExpenses();
        updateCategoryTotals();
    }

    function updateTotalExpenses() {
        const totalExpensesElement = document.getElementById('total-expenses');
        totalExpensesElement.textContent = `Total Expenses: $${totalExpenses.toFixed(2)}`;
    }

    function updateCategoryTotals() {
        for (const category in categoryTotals) {
            const categoryTotalElement = document.getElementById(`${category}-total`);
            if (categoryTotalElement) {
                categoryTotalElement.textContent = `${capitalizeFirstLetter(category)}: $${categoryTotals[category].toFixed(2)}`;
            }
        }
    }

    function deleteExpense(expense, row) {
        // Remove the expense from localStorage
        let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
        expenses = expenses.filter(e => e !== expense);
        localStorage.setItem('expenses', JSON.stringify(expenses));

        // Remove the row from the table
        row.remove();

        // Update the totals after deletion
        totalExpenses -= expense.amount;
        categoryTotals[expense.category] -= expense.amount;

        updateTotalExpenses();
        updateCategoryTotals();
    }

    function saveExpense(expense) {
        const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
        expenses.push(expense);
        localStorage.setItem('expenses', JSON.stringify(expenses));
    }

    function loadExpenses() {
        const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
        expenses.forEach(expense => addExpense(expense));
    }

    loadExpenses();

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
});