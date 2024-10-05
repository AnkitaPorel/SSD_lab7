import { useState } from 'react';
import "../common.css";

function Todo() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [completionDate, setCompletionDate] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create a todo item object
        const todoItem = {
            title,
            description,
            completionDate,
        };

        // Alerting the entered details
        alert(`Title: ${title}\nDescription: ${description}\nCompletion Date: ${completionDate}`);

        try {
            // Sending the data to the backend
            const response = await fetch('/todo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(todoItem),
            });

            if (response.ok) {
                alert('Todo item created successfully!');
            } else {
                throw new Error('Failed to create Todo item.');
            }

        } catch (error) {
            console.error('Error:', error);
        }

        // Resetting the form fields
        setTitle("");
        setDescription("");
        setCompletionDate("");
    };

    const isDateValid = (date) => {
        const today = new Date();
        const selectedDate = new Date(date);
        return selectedDate >= today;
    };

    return (
        <div className="center-div">
            <h1 className='text-center'>Create To-Do Item</h1>
            <form className='form-group' onSubmit={handleSubmit}>
                <label className='m-2 form-label'>Title: </label>
                <br />
                <input
                    className='m-2 form-control'
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <br />
                <label className='m-2 form-label'>Description: </label>
                <br />
                <textarea
                    className='m-2 form-control'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <br />
                <label className='m-2 form-label'>Completion Date: </label>
                <br />
                <input
                    className='m-2 form-control'
                    type="date"
                    value={completionDate}
                    onChange={(e) => setCompletionDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    required
                />
                <br />
                <button
                    className='mt-4 btn btn-primary'
                    type="submit">
                    Create To-Do Item
                </button>
            </form>
        </div>
    );
}

export default Todo;