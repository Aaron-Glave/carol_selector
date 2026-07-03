function DebugLocalStorage(passedList) {
    setLocalStorage();
    console.log(localStorage);
    passedList.loadItems();
    console.log(passedList);
}

/** Imports the list of available items to the "inputItems" box.*/
function showLocalStorage() {
    //console.log("Showing local storage");
    
    let n = 1, listContents = "";
    while(true) {
        let item_in_list = localStorage.getItem(n);
        if(item_in_list === null) break;
        listContents += item_in_list + "\r\n";
        n++;
    }
    //At the end of loop, n is the number of the items in the list plus one.
    const title = "You have a list of " + String(n-1) + " items."
    //console.log(title);
    document.getElementById("inputItems").textContent = listContents + title;
}

/** Parses your "inputItems" element, adding lines to your localStorage*/
function setLocalStorage() {
    localStorage.clear();
    let itemCount = 0;
    const textArea = document.getElementById("inputItems");
    //console.log("Text area value:\n" + textArea.value);
    const lines = textArea.value;
    //alert(lines)
    lines.split(/\r?\n/).forEach((line) => {
        if(line.trim().length > 0) {
            itemCount++;
            localStorage.setItem(itemCount, line);
        }
    });
}

function starting_input() {
    //alert("Loaded");
    let n = 1, listContents = "";
    while(true) {
        let item_in_list = localStorage.getItem(n);
        if(item_in_list === null) break;
        listContents += item_in_list + "\n";
        n++;
    }
    document.getElementById("inputItems").value = listContents;
}

function hideSetup() {
    document.getElementById("setUp").style.display = "none";
}

/** Loads items into local storage and starts the game.
    @param {ItemsRemainig} itemsRemainig
//*/
function startGame(itemsRemainig, itemsPulled) {
    //console.log("Starting game.");
    itemsRemainig.resetItems();
    itemsPulled.resetItems();
    //itemsRemainig.loadItems();
    setLocalStorage(itemsRemainig);
    itemsRemainig.loadItems();
    //console.log(itemsRemainig);
    //Set up the entry screen so that it will properly display when you reset the game. Maybe we don't need to do that?
    //showLocalStorage(itemsRemaining);
    document.getElementById("setUp").style.display = "none";
    document.getElementById("playGame").style.display = "block";
}

function reset_pick(start_string, myItemsRemaining, itemsPulled) {
    //console.log(myItemsRemaining);
    hideListSoFar();
    document.getElementById("setUp").style.display = "block";
    document.getElementById("playGame").style.display = "none";
    document.getElementById("selectedItem").textContent = start_string;
    //console.log("Reset to "+start_string)
}

function isListSoFarVisible() {
    return document.getElementById("listSoFarContainer").style.display == "none";
}

function getListSoFarContainer() {
    return document.getElementById("listSoFarContainer");
}

function myPull(start_string, myItemsRemaining, itemsPulled) {
    const listSoFarContainer = getListSoFarContainer();
    if(listSoFarContainer.style.display === "block") {
        listSoFarContainer.style.display = "none";
    }
    
    const pulled_item = myItemsRemaining.takeOne();
    //console.log("Test returning complex item", pulled_item)
    if(pulled_item !== null) {
        document.getElementById("selectedItem").textContent = pulled_item.value;
        itemsPulled.addOne(pulled_item);
        //console.log(itemsPulled);
    } else {
        alert("You drew every item.\nHit OK to edit the list of items or restart the game.");
        reset_pick(start_string, myItemsRemaining, itemsPulled);
    }
}

/** Display a popup with all the items you've pulled. */
function showListSoFar(itemsPulled) {
    let itemList = itemsPulled.listOfAll();
    document.getElementById("listSoFar").textContent = itemList;
    getListSoFarContainer().style.display = "block";
}

function hideListSoFar() {
    getListSoFarContainer().style.display = "none";
}