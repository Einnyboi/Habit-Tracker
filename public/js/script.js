// script.js

document.addEventListener('DOMContentLoaded', () => {
    const habitForm = document.getElementById('habitForm');
    const habitList = document.getElementById('habitList');

    // Function to fetch and display habits
    async function fetchHabits() {
        const response = await fetch('/auth/habits'); // Adjust the URL based on your routes
        const habits = await response.json();
        habitList.innerHTML = ''; // Clear the current list

        habits.forEach(habit => {
            const habitItem = document.createElement('div');
            habitItem.className = 'habit-item';
            habitItem.innerHTML = `
                <span class="habit-name">${habit.name}</span>
                <span class="habit-status">${habit.completed ? 'Completed' : 'Not Completed'}</span>
                <button onclick="markDone('${habit._id}')">Mark Done</button>
                <button onclick="deleteHabit('${habit._id}')">Delete</button>
            `;
            habitList.appendChild(habitItem);
        });
    }

    // Function to add a new habit
    habitForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Prevent the default form submission
        const habitName = document.getElementById('habitName').value;

        try {
            // Send a POST request to add the habit
            const response = await fetch('/auth/habits', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: habitName })
            });

            if (!response.ok) {
                throw new Error('Failed to add habit: ' + response.statusText);
            }

            // Fetch and display updated habits
            await fetchHabits();
            habitForm.reset(); // Reset the form
        } catch (error) {
            console.error('Error adding habit:', error); // Log the error
        }
    });

    // Function to mark a habit as done
    window.markDone = async (id) => {
        await fetch(`/auth/habits/${id}/done`, { method: 'POST' });
        fetchHabits(); // Refresh the habit list
    };

    // Function to delete a habit
    window.deleteHabit = async (id) => {
        await fetch(`/auth/habits/${id}`, { method: 'DELETE' });
        fetchHabits(); // Refresh the habit list
    };

    // Initial fetch of habits
    fetchHabits();
});
