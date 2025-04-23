document.addEventListener('DOMContentLoaded', () => {
    const addHabitBtn = document.getElementById('submit-habit');
    const cancelBtn = document.getElementById('cancel-add');
    const showAddFormBtn = document.getElementById('show-add-form');
    const addHabitForm = document.getElementById('add-habit-form');
    const habitsContainer = document.getElementById('habits-container');

    // Initially hide the add habit form
    addHabitForm.style.display = 'none';

    showAddFormBtn.addEventListener('click', () => {
        addHabitForm.style.display = 'block';
        showAddFormBtn.style.display = 'none';
    });

    cancelBtn.addEventListener('click', () => {
        addHabitForm.style.display = 'none';
        showAddFormBtn.style.display = 'inline-block';
        document.getElementById('habit-name').value = '';
        document.getElementById('habit-frequency').value = 'daily';
        document.getElementById('habit-target').value = '1';
    });

    addHabitBtn.addEventListener('click', async (event) => {
        event.preventDefault();
        console.log('Add Habit button clicked');

        const habitName = document.getElementById('habit-name').value.trim();
        const habitCategory = document.getElementById('habit-frequency').value; // Changed to category to match backend
        const habitTarget = document.getElementById('habit-target').value;

        if (!habitName) {
            alert('Please enter a habit name!');
            return;
        }

        try {
            const response = await fetch('/habits', {  // POST URL corrected to '/habits'
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    name: habitName,
                    category: habitCategory,  // Use 'category' to match backend expectation
                    target: habitTarget
                })
            });

            if (!response.ok) throw new Error('Failed to add habit');

            // Clear form
            document.getElementById('habit-name').value = '';
            document.getElementById('habit-frequency').value = 'daily';
            document.getElementById('habit-target').value = '1';

            addHabitForm.style.display = 'none';
            showAddFormBtn.style.display = 'inline-block';

            await fetchHabits();
        } catch (error) {
            console.error('Error adding habit:', error);
        }
    });

    // Event delegation for habit actions
    habitsContainer.addEventListener('click', async (event) => {
        const target = event.target;

        if (target.classList.contains('mark-done-btn')) {
            const habitId = target.dataset.id;
            try {
                await fetch(`/habits/${habitId}/done`, { method: 'PUT', credentials: 'include' });
                target.classList.toggle('checked');
                await fetchHabits();
            } catch (err) {
                console.error('Failed to mark done:', err);
            }
        }

        if (target.classList.contains('delete-btn')) {
            const habitId = target.dataset.id;
            try {
                await fetch(`/habits/${habitId}`, { method: 'DELETE', credentials: 'include' });
                await fetchHabits();
            } catch (err) {
                console.error('Failed to delete habit:', err);
            }
        }
    });

    fetchHabits(); // Load existing habits on page load
});

// Fetch & render habits
async function fetchHabits() {
    try {
        const response = await fetch('/habits/api/habits', {
            credentials: 'include'
        });
        const habits = await response.json();
        const container = document.getElementById('habits-container');
        container.innerHTML = ''; // Clear before re-render

        if (habits.length === 0) {
            container.innerHTML = '<div class="empty-state">No habits yet. Add your first habit!</div>';
            return;
        }

        habits.forEach(habit => {
            const habitItem = document.createElement('div');
            habitItem.className = 'habit-card';

            habitItem.innerHTML = `
                <div class="habit-info">
                    <div class="habit-name">${habit.name}</div>
                    <div class="habit-stats">
                        <div class="habit-frequency">${habit.frequency || 'Uncategorized'}</div>
                        <div class="habit-count">${habit.current ? habit.current + ' done' : 'Not Completed'}</div>
                    </div>
                </div>
                <div class="habit-actions">
                    <button class="form-btn submit-btn mark-done-btn checkmark${habit.current > 0 ? ' checked' : ''}" data-id="${habit._id}">✓</button>
                    <button class="form-btn cancel-btn delete-btn" data-id="${habit._id}">×</button>
                </div>
            `;
            container.appendChild(habitItem);
        });

    } catch (err) {
        console.error('Failed to fetch habits:', err);
    }
}
