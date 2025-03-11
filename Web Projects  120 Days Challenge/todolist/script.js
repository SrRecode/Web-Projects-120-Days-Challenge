// Get references to the input box and list container elements
const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');

// Function to add a new task to the list
function addTask(){
    // Check if the input box is empty
    if(inputBox.value === ''){
        alert('you must write something!'); // Alert the user if the input is empty
    }
    else{
        // Create a new list item and set its content to the input value
        let li = document.createElement('li');
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li); // Add the list item to the list container

        // Create a span element for the delete button and append it to the list item
        let span = document.createElement('span');
        span.innerHTML = '\u00d7'; // Unicode character for '×'
        li.appendChild(span);
    }
    inputBox.value = ''; // Clear the input box
    saveData(); // Save the updated list to local storage
}

// Event listener for handling clicks on the list container
listContainer.addEventListener('click', function(e){
    // Toggle the 'checked' class if a list item is clicked
    if (e.target.tagName === 'LI'){
        e.target.classList.toggle('checked');
    }
    // Remove the list item if the delete button (span) is clicked
    else if(e.target.tagName === 'SPAN'){
        e.target.parentElement.remove();
    }
    saveData(); // Save the updated list to local storage
}, false);

// Function to save the list data to local storage
function saveData(){
    localStorage.setItem('data', listContainer.innerHTML);
}

// Function to display the saved tasks from local storage
function showtask(){
    listContainer.innerHTML = localStorage.getItem('data');
}

// Display the saved tasks when the page loads
showtask();