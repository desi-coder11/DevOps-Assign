// Get references to the form and formEditor elements
const jsonForm = document.getElementById('jsonForm');
const jsonOutputLevel2 = document.getElementById('jsonOutputLevel2');
const jsonOutputLevel3 = document.getElementById('jsonOutputLevel3');

// Function to handle form submission
function submitJsonForm(event) {
    event.preventDefault();

    // Get the JSON data from the textarea
    const jsonData = document.getElementById('jsonData').value;

    try {
        // Parse the JSON data into a JavaScript object
        


const keys = jsonData.match(/"([^"]+)":/g).map(match => match.slice(1, -2));
                const duplicateKeys = keys.filter((key, index) => keys.indexOf(key) !== index);

                 if (duplicateKeys.length > 0) {
                    // Display duplicate keys in JSON level 2
                    const level2ErrorMessage = 'Duplicate keys found in JSON level 2: ' + duplicateKeys.join(', ');
                    jsonOutputLevel2.innerHTML = `<p class="error-message">${level2ErrorMessage}</p>`;

                    // Display duplicate keys in JSON level 3
                    const level3ErrorMessage = 'Duplicate keys found in JSON level 3: ' + duplicateKeys.join(', ');
                    jsonOutputLevel3.innerHTML = `<p class="error-message">${level3ErrorMessage}</p>`;

                    return;
                }

        const jsonObject = JSON.parse(jsonData);

        // Level 2 JSON Output - Display as it is
        jsonOutputLevel2.textContent = JSON.stringify(jsonObject, null, 2);
        jsonOutputLevel2.innerHTML = '<pre class="successful-output">' + JSON.stringify(jsonObject, null, 2) + '</pre>';
        

        // Level 3 Editable JSON Output
        jsonOutputLevel3.innerHTML = '';
        for (const key in jsonObject) {
            if (jsonObject.hasOwnProperty(key)) {
                const divContainer = document.createElement('div');
                divContainer.className = 'form-row';

                const label = document.createElement('label');
                label.textContent = key;

                const input = document.createElement('input');
                input.type = 'text';
                input.value = jsonObject[key];
                input.name = key;

                divContainer.appendChild(label);
                divContainer.appendChild(input);
                jsonOutputLevel3.appendChild(divContainer);
            }
        }
    } catch (error) {
        // Handle JSON parsing errors here
        // console.error('Error parsing JSON:', error);
console.error("Error parsing JSON:", error.message);
        jsonOutputLevel2.innerHTML = '<p class="error-message">Invalid JSON data. Please enter valid JSON.</p>';
        jsonOutputLevel3.innerHTML = '<p class="error-message">Invalid JSON data. Please enter valid JSON.</p>';
    }
}