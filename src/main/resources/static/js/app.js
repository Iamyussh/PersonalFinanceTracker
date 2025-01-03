document.addEventListener('DOMContentLoaded', function () {
    const expenseForm = document.getElementById('expenseForm');
    let totalExpenses = 0;
    const categoryTotals = {
        food: 0,
        bills: 0,
        transportation: 0,
        subscriptions: 0,
        shopping: 0,
        // Add other categories as needed
    };

    if (expenseForm) {
        expenseForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const description = document.getElementById('description').value;
            const amount = parseFloat(document.getElementById('amount').value);
            const date = document.getElementById('date').value;
            const category = document.getElementById('category').value.toLowerCase();

            const expense = {
                id: Date.now(), // Add a unique ID to each expense
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

        // Update category totals
        if (categoryTotals.hasOwnProperty(expense.category)) {
            categoryTotals[expense.category] += expense.amount;
        } else {
            categoryTotals[expense.category] = expense.amount;
        }

        // Update total expenses
        totalExpenses += expense.amount;

        // Display updated totals
        displayCategoryTotals();
        displayTotalExpenses();

        // Add the expense to the table
        const newRow = table.insertRow();
        newRow.innerHTML = `
            <td>${expense.description}</td>
            <td>${expense.amount.toFixed(2)}</td>
            <td>${formatDate(expense.date)}</td>
            <td>${expense.category}</td>
            <td><button class="delete-btn" data-id="${expense.id}">Delete</button></td>
        `;

        // Add event listener to the delete button
        newRow.querySelector('.delete-btn').addEventListener('click', function () {
            deleteExpense(expense.id, newRow);
        });
    }

    function deleteExpense(expenseId, row) {
        // Remove the expense from localStorage
        let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
        const expense = expenses.find(e => e.id === expenseId);
        expenses = expenses.filter(e => e.id !== expenseId);
        localStorage.setItem('expenses', JSON.stringify(expenses));

        // Remove the row from the table
        row.remove();

        // Update the total expenses and category totals
        if (expense) {
            categoryTotals[expense.category] -= expense.amount;
            totalExpenses -= expense.amount;
        }

        // Display updated totals
        displayCategoryTotals();
        displayTotalExpenses();
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

    function displayCategoryTotals() {
        for (const category in categoryTotals) {
            if (categoryTotals.hasOwnProperty(category)) {
                const categoryTotalElement = document.getElementById(`${category}-total`);
                if (categoryTotalElement) {
                    categoryTotalElement.textContent = `${capitalizeFirstLetter(category)}: $${categoryTotals[category].toFixed(2)}`;
                }
            }
        }
    }

    function displayTotalExpenses() {
        const totalExpensesElement = document.getElementById('total-expenses');
        totalExpensesElement.textContent = `Total Expenses: $${totalExpenses.toFixed(2)}`;
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function formatDate(dateString) {
        const date = new Date(dateString);
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const year = date.getFullYear();
        return `${month}-${day}-${year}`;
    }
});