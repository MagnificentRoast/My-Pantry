
// Array to hold foods that are to be deleted
let checkedFoods = [];
let user_id;

// Fetch to get the user ID based on username
fetch("/api/users").then(response => {
    return response.json();
})
.then(data => {

    // Split the string within the page's <h2> element to grab username
    let pageHeading = document.getElementById("pantry-title").textContent.split(" ");
    let username = pageHeading[0].split("'")[0];

    // filter the array of users to find the one whose username matches
    const user = data.filter(data => data.username === username);
    // Assign that user's ID to the global variable for use in displaying foods
    user_id = user[0].id;
});

// Create food button handler
const addFoodBtnHandler = () => {

    // Check whether the food input elements already exist, and only create if they do not
    if (!document.querySelector("#newFoodSearch")) {

        // Display a new text field that will use autocomplete
        const newFoodSearch = document.createElement("input");
        newFoodSearch.setAttribute("id", "newFoodSearch");
        newFoodSearch.setAttribute("placeholder", "Select A Food");
        newFoodSearch.classList = "rounded lg:mx-2 h-1/2 p-2";
        
    
        //To the right of that, display an "add" button
        const newFoodBtn = document.createElement("button");
        newFoodBtn.setAttribute("id", "newFoodBtn");
        newFoodBtn.textContent = "Add to Pantry";
        newFoodBtn.setAttribute("type", "submit");
        newFoodBtn.classList = "my-2 sm:mt-2 lg:mx-2 h-1/2 p-2 bg-orange-300 font-bold rounded";
    
        // Append both items to a new form element
        const newFoodForm = document.createElement("form");
        newFoodForm.setAttribute("id", "newFoodForm");
        newFoodForm.appendChild(newFoodSearch);
        newFoodForm.appendChild(newFoodBtn);
        newFoodForm.classList = "flex flex-col sm:mx-4 lg:mx-0 justify-center items-center md:block "
    
        // Append the form to the new-food-div element
        document.querySelector("#new-food-div").appendChild(newFoodForm);
    
        // Add listeners and handlers
        newFoodForm.addEventListener("submit", (event) => {
            event.preventDefault();
            let newFood = document.querySelector("#newFoodSearch").value.trim();
            if (!newFood || newFood === "") {
                console.log("No food entered.");
                return;
            }
            // Fetch request to create a new food and then add to pantry
            fetch('/api/foods', {
                method: 'post',
                body: JSON.stringify({
                    food_name: newFoodSearch.value.trim(),
                    user_id: user_id
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
        });
    }
    else {
        // Add transition effect to hide the new food input section
    }
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

    // Add conditional styling to the delete food button when boxes are/aren't checked.
    if (checkedFoods.length < 1) {
        document.querySelector("#deleteFoodBtn").classList.replace("bg-emerald-400", "bg-slate-200");
        document.querySelector("#deleteFoodBtn").classList.add("text-slate-400");
    }
    else {
        document.querySelector("#deleteFoodBtn").classList.replace("bg-slate-200", "bg-emerald-400");
        document.querySelector("#deleteFoodBtn").classList.remove("text-slate-400");
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
            // Perform a fetch delete request for that food as well
            fetch(`/api/foods/${foodID}`, {
                method: "delete"
            });
            
            i--;
        }
    }
    // Reset the value of checkedFoods to be an empty array
    checkedFoods = [];
}

document.addEventListener("click", event => {
    if (event.target.classList.contains("delete-checkbox")) {
        toggleFood(event.target);
    }
})
document.querySelector("#addFoodBtn").addEventListener("click", addFoodBtnHandler);
document.querySelector("#deleteFoodBtn").addEventListener("click", deleteFoodBtnHandler);