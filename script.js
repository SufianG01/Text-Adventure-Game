class Room {
    constructor(name) {
        this._name = name;
        this._description = "";
        this._linkedRooms = {};
        this._character = "";
    }

    get name() {
        return this._name;
    }

    get description() {
        return this._description;
    }

    get character() {
        return this._character
    }

    set name(value) {
        if (value.length < 4) {
            alert("Name is too short.");
            return;
        }
        this._name = value;
    }

    set description(value) {
        if (value.length < 4) {
            alert("description is too short.");
            return;
        }
        this._description = value;
    }

    set character(value) {
        this._character = value;
    }

    describe() {
        return "Checking around the " + this._name + " you can see " + this._description;
    }


    linkRoom(direction, roomToLink) {
        this._linkedRooms[direction] = roomToLink;
    }


    getDetails() {
        const entries = Object.entries(this._linkedRooms);
        let details = []
        for (const [direction, room] of entries) {
            let text = " The " + room._name + " is to the " + direction;
            details.push(text);
        }
        return details;
    }


    //method to move to a new room
    move(direction) {
        if (direction in this._linkedRooms) {
            return this._linkedRooms[direction];
        } else {
            alert("You can't go that way",);
            alert(this._name)
            return this;
        }
    }
}

class Item {
    constructor(name) {
        this._name = name,
            this._description = ""
    }

    set name(value) {
        if (value.length < 4) {
            alert("Name is too short.");
            return;
        }
        this._name = value;
    }

    set description(value) {
        if (value.length < 4) {
            alert("Decription is too short.");
            return;
        }
        this._name = value;
    }

    get name() {
        return this._name;
    }

    get description() {
        return this._description;
    }


    describe() {
        return "The " + this._name + " is " + this._description;
    }


}

class Character {
    constructor(name) {
        this._name = name,
            this._description = ""
        this._conversation = ""
    }
    set name(value) {
        if (value.length < 4) {
            alert("Name is too short.");
            return;
        }
        this._name = value;
    }

    set description(value) {
        if (value.length < 4) {
            alert("Decription is too short.");
            return;
        }
        this._description = value;
    }

    set conversation(value) {
        if (value.length < 4) {
            alert("conversation is too short.");
            return;
        }
        this._conversation = value;
    }
    get name() {
        return this._name;
    }

    get description() {
        return this._description;
    }

    get conversation() {
        return this._conversation;
    }

    describe() {
        return "You have met " + this._name + ", " + this._name + " is " + this._description;
    }


    converse() {
        return this._name + " says " + "'" + this._conversation + "'";
    }
}

class Enemy extends Character {
    constructor(name) {
        super(name);
        this._weakness = "";
    }

    set weakness(value) {
        if (value.length < 4) {
            alert("Decription is too short.");
            return;
        }
        this._weakness = value;
    }


    fight(item) {
        if (item = this_weakness) {
            return true;
        } else {
            return false;
        }
    }

}

//create the indiviual room objects and add their descriptions
const Bedroom = new Room("Bedroom");
Bedroom.description = " a messy and dark, with no natural light filtering in. You notice a bed in the center of the room, surrounded by piles of clothes and clutter.";
const Kitchen = new Room("Kitchen");
Kitchen.description = "  an empty, devoid of any appliances or furniture. You can't help but feel a little uneasy in this empty space.";
const livingroom = new Room("livingroom");
livingroom.description = "quite the opposite, with a large screen taking up one wall and a multitude of buttons on a nearby console. It feels like you could spend hours exploring all of the different options in this room.";
const Garage = new Room("Garage");
Garage.description = "a grand entrance Garage with large paintings around the walls";

//link the rooms together
Bedroom.linkRoom("south", Kitchen);
Bedroom.linkRoom("east", Garage);
Kitchen.linkRoom("north", Bedroom);
Kitchen.linkRoom("east", livingroom);
livingroom.linkRoom("west", Kitchen);
livingroom.linkRoom("north", Garage);
Garage.linkRoom("south", livingroom);
Garage.linkRoom("west", Bedroom);

// //add characters
// const Murderer = new Enemy("Murderer");
// Murderer.conversation = "grrr brains";
// Murderer.description = "a smelly Zombie";
// Murderer.pronoun = "he";
// Murderer.weakness = "cheese";


// // add characters to rooms
// Bedroom.character = Murderer;


function displayRoomInfo(room) {
    let occupantMsg = ""
    if (room.character === "") {
        occupantMsg = ""
    } else {
        occupantMsg = room.character.describe() + ". " + room.character.converse()
    }

    textContent = "<p>" + room.describe() + "</p>" + "<p>" +
        occupantMsg + "</p>" + "<p>" + room.getDetails() + "</p>";

    document.getElementById("textarea").innerHTML = textContent;
    document.getElementById("buttonarea").innerHTML = '><input type="text" id="usertext" />';
    document.getElementById("usertext").focus();
}


function startGame() {
    //set and display start room
    currentRoom = Bedroom
    displayRoomInfo(currentRoom);

    //

    //handle commands
    document.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            command = document.getElementById("usertext").value;
            const directions = ["north", "south", "east", "west"]
            if (directions.includes(command.toLowerCase())) {
                currentRoom = currentRoom.move(command)
                displayRoomInfo(currentRoom);
            } else {
                document.getElementById("usertext").value = ""
                alert("that is not a valid command please try again")
            }

        }
    });
}