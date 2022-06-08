/*
    Author: devCodeCamp
    Description: Most Wanted Starter Code
*/
//////////////////////////////////////////* Beginning Of Starter Code *//////////////////////////////////////////

"use strict";
//? Utilize the hotkey to hide block level comment documentation
////* Mac: Press "CMD"+"K" and then "CMD"+"/"
////* PC: Press "CTRL"+"K" and then "CTRL"+"/"

/**
 * This is the main logic function being called in index.html.
 * It operates as the entry point for our entire application and allows
 * our user to decide whether to search by name or by traits.
 * @param {Array} people        A collection of person objects.
 */
function app(people) {
    // promptFor() is a custom function defined below that helps us prompt and validate input more easily
    // Note that we are chaining the .toLowerCase() immediately after the promptFor returns its value
    let searchType = promptFor(
        "Do you know the name of the person you are looking for? Enter 'yes' or 'no'",
        yesNo
    ).toLowerCase();
    let searchResults;
    // Routes our application based on the user's input
    switch (searchType) {
        case "yes":
            searchResults = searchByName(people);
            break;
        case "no":
            //! TODO #4: Declare a searchByTraits (multiple traits) function //////////////////////////////////////////
                //! TODO #4a: Provide option to search for single or multiple //////////////////////////////////////////
            searchResults = searchByTraits(people);
            break;
        default:
            // Re-initializes the app() if neither case was hit above. This is an instance of recursion.
            app(people);
            break;
    }
    // Calls the mainMenu() only AFTER we find the SINGLE PERSON
    mainMenu(searchResults, people);
}
// End of app()

/**
 * After finding a single person, we pass in the entire person-object that we found,
 * as well as the entire original dataset of people. We need people in order to find
 * descendants and other information that the user may want.
 * @param {Object[]} person     A singular object inside of an array.
 * @param {Array} people        A collection of person objects.
 * @returns {String}            The valid string input retrieved from the user.
 */
function mainMenu(person, people) {
    // A check to verify a person was found via searchByName() or searchByTrait()
    if (!person[0]) {
        alert("Could not find that individual.");
        // Restarts app() from the very beginning
        return app(people);
    }
    let displayOption = prompt(
        `Found ${person[0].firstName} ${person[0].lastName}. Do you want to know their 'info', 'family', or 'descendants'?\nType the option you want or type 'restart' or 'quit'.`
    );
    // Routes our application based on the user's input
    switch (displayOption) {
        case "info":
            //! TODO #1: Utilize the displayPerson function //////////////////////////////////////////
            // HINT: Look for a person-object stringifier utility function to help
            let personInfo = displayPerson(person[0]);
            alert(personInfo);
            break;
        case "family":
            //! TODO #2: Declare a findPersonFamily function //////////////////////////////////////////
            // HINT: Look for a people-collection stringifier utility function to help
            let personFamily = findPersonFamily(person[0], people);
            alert(personFamily);
            break;
        case "descendants":
            //! TODO #3: Declare a findPersonDescendants function //////////////////////////////////////////
            // HINT: Review recursion lecture + demo for bonus user story
            let personDescendants = findPersonDescendants(person[0], people);
            alert(personDescendants);
            break;
        case "restart":
            // Restart app() from the very beginning
            app(people);
            break;
        case "quit":
        case "test":
            searchByWeight(people)
           break;
            // Stop application execution
            return;
        default:
            // Prompt user again. Another instance of recursion
            return mainMenu(person, people);
    }
}
// End of mainMenu()

/**
 * This function is used when searching the people collection by
 * a person-object's firstName and lastName properties.
 * @param {Array} people        A collection of person objects.
 * @returns {Array}             An array containing the person-object (or empty array if no match)
 */
function searchByName(people) {
    let firstName = promptFor("What is the person's first name?", chars);
    let lastName = promptFor("What is the person's last name?", chars);

    // The foundPerson value will be of type Array. Recall that .filter() ALWAYS returns an array.
    let foundPerson = people.filter(function (person) {
        if (person.firstName === firstName && person.lastName === lastName) {
            return true;
        }
    });
    return foundPerson;
}
// End of searchByName()

/**
 * This function will be useful for STRINGIFYING a collection of person-objects
 * first and last name properties in order to easily send the information
 * to the user in the form of an alert().
 * @param {Array} people        A collection of person objects.
 */
function displayPeople(people) {
    alert(
        people
            .map(function (person) {
                return `${person.firstName} ${person.lastName}`;
            })
            .join("\n")
    );
}
// End of displayPeople()

/**
 * This function will be useful for STRINGIFYING a person-object's properties
 * in order to easily send the information to the user in the form of an alert().
 * @param {Object} person       A singular object.
 */
function displayPerson(person) {
    let personInfo = `First Name: ${person.firstName}\n`;
    personInfo += `Gender: ${person.lastName}\n`;
    personInfo += `Dob: ${person.dob}\n`;
    personInfo += `Height: ${person.height}\n`;
    personInfo += `Weight: ${person.weight}\n`;
    personInfo += `EyeColor: ${person.eyeColor}\n`;
    personInfo += `Occupation: ${person.occupation}\n`;
    

    //! TODO #1a: finish getting the rest of the information to display //////////////////////////////////////////
    alert(personInfo);
}
// End of displayPerson()

/**
 * This function's purpose is twofold:
 * First, to generate a prompt with the value passed in to the question parameter.
 * Second, to ensure the user input response has been validated.
 * @param {String} question     A string that will be passed into prompt().
 * @param {Function} valid      A callback function used to validate basic user input.
 * @returns {String}            The valid string input retrieved from the user.
 */
function promptFor(question, valid) {
    do {
        var response = prompt(question).trim();
    } while (!response || !valid(response));
    return response;
}
// End of promptFor()

/**
 * This helper function checks to see if the value passed into input is a "yes" or "no."
 * @param {String} input        A string that will be normalized via .toLowerCase().
 * @returns {Boolean}           The result of our condition evaluation.
 */
function yesNo(input) {
    return input.toLowerCase() === "yes" || input.toLowerCase() === "no";
}
// End of yesNo()

/**
 * This helper function operates as a default callback for promptFor's validation.
 * Feel free to modify this to suit your needs.
 * @param {String} input        A string.
 * @returns {Boolean}           Default validation -- no logic yet.
 */
function chars(input) {
    return true; // Default validation only
}
// End of chars()

//////////////////////////////////////////* End Of Starter Code *//////////////////////////////////////////
// Any additional functions can be written below this line 👇. Happy Coding! 😁
/**
 * 
 * @param {Array} people 
 * @returns{Array}
 */
function searchByTraits(people){
    let userInput = prompt("please enter what spicific train you would like to shearch by:\ngender\ndob\nheight\nweight\neyeColor\noccupation")
    let result;
    switch (userInput) {
        case "gender":
            result = searchByGender(people)
            
            break;
      
        case "dob":
            result = searchByDob(people)
            break;
    
        case "height":
            result = searchByHieght(people)
            break;
    
        case "weight":
            result = searchByWeight(people)
            break;
    
        case "eyeColor":
            result = searchByEyeColor(people)
            break;
    
        case "occupation":
            result = searchByOccupation(people)
            break;
        
        default:
             return searchByTraits(people)
             //break;
    }
    // let result = people.filter(
    //     function(person){
    //         return true;//if (userInput === )
    //     }

    // );
     return result;
}
/**
 * this takes in a collection of people objects
 * inside an srray and returns a collection of people objects
 * that mach the requested gender by user
 * @param {Array} people 
 */
function searchByGender(people){
    let userInput= prompt (" please select the gender to search by :\n male\n female")
    let result = people.filter(
        function(person){
            if( userInput=== person.gender){
                return true;
            }


        }
    );
    //console.log(result)
    return result;
}
function searchByDob(people){
    let userInput= prompt (" please select the DOB to search by :\n2/02/1987\n2/19/1970\n2/19/1966\n12/11/1961\n10/7/1953\n7/26/1959\n3/13/1963\n8/5/1967\n11/4/1970\n12/18/1969\n2/8/1972\n5/6/1937\n4/20/1939\n10/28/1948\n12/18/1952\n4/10/1940\n3/16/1938\n9/6/1945\n5/9/1951\n4/1/1947\n1/18/1949")
    let result = people.filter(
        function(person){
            if( userInput=== person.dob){
                return true;
            }


        }
    );
    //console.log(result)
    return result;
}
function searchByHeight(people){
    let userInput= prompt (" please select the height to search by :\n67\n70\n63\n71\n74\n61\n62\n58\n66\n76\n69\n59\n66\n72\n65")
    let result = people.filter(
        function(person){
            if( Number(userInput) === person.height){
                return true;
            }

        }
    );
    console.log(result)
    return result;
}
function searchByWeight(people){
    let userInput= prompt (" please select the weight to search by :\n100\n110\n241\n187\n249\n184\n112\n235\n156\n179\n118\n205\n199\n137\n170\n256\n207\n115\n250\n162\n175")
    let result = people.filter(
        function(person){
            if( Number(userInput) === person.weight){
                return true;
            }


        }
    );
    //console.log(result)
    return result;
}
function searchByEyeColor(people){
    let userInput= prompt (" please select the eye color to search by :\nblue\nbrown\ngreen\nhazel\nblack")
    let result = people.filter(
        function(person){
            if( userInput=== person.eyeColor){
                return true;
            }


        }
    );
    //console.log(result)
    return result;
}
function searchByOccupation(people){
    let userInput= prompt (" please select ther occupation to search by :\ndoctor\nassistant\npolitician\nnurse\nlandscaper\nprogrammer\narchitect\nstudent")
    let result = people.filter(
        function(person){
            if( userInput=== person.occupation){
                return true;
            }


        }
    );
    //console.log(result)
    return result;
}
