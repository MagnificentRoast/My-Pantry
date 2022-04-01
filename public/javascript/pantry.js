
// Array to hold foods that are to be deleted
let checkedFoods = [];

// Logout button and handler

// Create food button handler
const addFoodBtnHandler = () => {

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
            setTimeout(function() {window.location.reload();}, 10);
        });
        // console.log(`Added ${newFoodSearch.value.trim()} to pantry`);
    });
}

// Assigns food IDs to an array on checkbox toggle
const toggleFood = (checkboxElement) => {

    // Get the neighboring <p> element's ID
    const foodID = checkboxElement.parentElement.children[0].getAttribute("id");

    // If that ID is not in the array, add it.
    if (!checkedFoods.includes(foodID)) {
        checkedFoods.push(foodID);
    }
    // Otherwise, remove it.
    else {
        checkedFoods = checkedFoods.filter(id => id !== foodID);
    }
}

// Delete food button: appears/highlights once any checkboxes are checked
const deleteFoodBtnHandler = () => {

    // Organize all <li> elements into an array for sorting/deletion
    let pantryFoods = document.getElementsByClassName("food-li");

    // Check each <p> tag's ID against those stored in checkedFoods global array
    for (let i = 0; i < pantryFoods.length; i++) {
        let foodID = pantryFoods[i].children[0].getAttribute("id");

        // If the ID is there, delete the <li> element entirely
        if (checkedFoods.includes(foodID)) {
            pantryFoods[i].remove();
            i--;
        }
    }
    // Reset the value of checkedFoods to be an empty array
    checkedFoods = [];
}

document.querySelector("#foods-list").addEventListener("click", event => {
    if (event.target.getAttribute("class") === "delete-checkbox") {
        toggleFood(event.target);
    }
})
document.querySelector("#addFoodBtn").addEventListener("click", addFoodBtnHandler);
document.querySelector("#deleteFoodBtn").addEventListener("click", deleteFoodBtnHandler);