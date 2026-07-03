//* Basically a bucket of items to draw.
class ItemsRemaining {
    //Useful for debugging.
    #remaining = 0;
    constructor () {
        this.gameItems = new Map();
    }
    
    //* TODO: Do I need these?
    
    //*
    getRemaining() {
        return this.#remaining;
    }
    // */
    
    listOfAll() {
        const listLength = itemsPulled.getRemaining();
        let message = 'You pulled ' + this.#remaining + ' items:\r\n';
        for (const value of this.gameItems.values()) {
            message += value + '\r\n';
        }
        return message;
    }
    
    
    
    /** Randomly selects an item from the map, removes it from the map, and returns it. */
    takeOne() {
        if(this.gameItems.size === 0) {
            return null;
        }
        const remainingItems = [...this.gameItems.keys()];
        const selectedIndex = remainingItems[Math.floor(Math.random() * remainingItems.length)];
        const selectedString = this.gameItems.get(selectedIndex);
        this.gameItems.delete(selectedIndex);
        //Debug and list remaning items
        this.#remaining--;
        console.log(`${this.#remaining} left.`);
        return {key: selectedIndex, value: selectedString};
    }
    
    addOne({key, value}) {
        if(this.gameItems.has(key) == false) {
            //Maybe I I need #
            this.#remaining++;
        }
        this.gameItems.set(key, value);
    }
    
    /** Loads the container of items from localStorage.*/
    loadItems() {
        let n = 1; //The loop runs from [1...count inclusive]
        let itemToAdd = localStorage.getItem(n);
        while(itemToAdd !== null) {
            //console.log(`Adding item ${n}: ${itemToAdd}`);
            this.gameItems.set(Number(n), itemToAdd);
            n++;
            itemToAdd = localStorage.getItem(n);
        }
        //n is 1 more than the number of items you have.
        this.#remaining = n-1;
    }
    
    resetItems() {
        this.gameItems.clear();
        this.#remaining = 0;
    }
}

function constructNewList() {
    const newList = new ItemsRemaining();
    return newList;
}