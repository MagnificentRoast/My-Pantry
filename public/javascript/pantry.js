// selectors
const addFoodBtn = document.querySelector("#addFood");
const deleteFoodBtn = document.querySelector("#deleteFood");

// Logout button and handler

// Create food button handler
const addFoodBtnHandler = () => {
    console.log("Adding a new food.");

    // Display a new text field that will use autocomplete
    const newFoodSearch = document.createElement("input");
    newFoodSearch.setAttribute("id", "newFoodSearch");
    newFoodSearch.setAttribute("placeholder", "Select A Food");
    

    //To the right of that, display an "add" button
    const newFoodBtn = document.createElement("button");
    newFoodBtn.setAttribute("id", "newFoodBtn");
    newFoodBtn.textContent = "Add to Pantry";
    newFoodBtn.setAttribute("type", "submit");

    // Append both items to a new form element
    const newFoodForm = document.createElement("form");
    newFoodForm.setAttribute("id", "newFoodForm");
    newFoodForm.appendChild(newFoodSearch);
    newFoodForm.appendChild(newFoodBtn);

    document.querySelector("#pantry-buttons").appendChild(newFoodForm);

    // Add listeners and handlers
    newFoodForm.addEventListener("submit", (event) => {
        event.preventDefault();

        // Fetch request to create a new food and then add to pantry
        fetch('/api/foods', {
            method: 'post',
            body: JSON.stringify({
                food_name: newFoodSearch.value.trim(),
                pantry_id: 1
            }),
            headers: { 'Content-Type': 'application/json' }
            })
            .then(response => {
                if (response.ok) {
                console.log("Added food to pantry");
                console.log(response);
                } else {
                alert(response.statusText);
                }
            });
        // console.log(`Added ${newFoodSearch.value.trim()} to pantry`);
    });
}

// Delete food button: appears/highlights once any checkboxes are checked
const deleteFoodBtnHandler = () => {
    console.log("Deleting checked foods");
}


document.querySelector("#addFoodBtn").addEventListener("click", addFoodBtnHandler);
document.querySelector("#deleteFoodBtn").addEventListener("click", deleteFoodBtnHandler);