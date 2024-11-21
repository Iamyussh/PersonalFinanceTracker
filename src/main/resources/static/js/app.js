document.addEventListener('DOMContentLoaded', function () {
    const expenseForm = document.getElementById('expenseForm');
    let totalExpenses = 0;

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

        descriptionCell.textContent = expense.description;
        amountCell.textContent = expense.amount.toFixed(2);
        dateCell.textContent = expense.date;
        categoryCell.textContent = expense.category;

        totalExpenses += expense.amount;
        updateTotalExpenses();
    }

    function updateTotalExpenses() {
        const totalExpensesElement = document.getElementById('total-expenses');
        totalExpensesElement.textContent = `Total Expenses: $${totalExpenses.toFixed(2)}`;
    }

    loadExpenses();

    function loadExpenses() {
        const expenses = [
            { description: "Lunch", amount: 15.00, date: "2024-11-20", category: "Food" },
            { description: "Bus Ticket", amount: 2.50, date: "2024-11-21", category: "Transport" }
            // Add more sample expenses here or fetch from an API
        ];

        expenses.forEach(expense => addExpense(expense));
    }
});
