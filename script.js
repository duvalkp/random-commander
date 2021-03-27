var selection = new Array(false,false,false,false,false);
var colors = new Array('#fffbd5','#aae0fa','#cbc2bf','#f9aa8f','#9bd3ae');
var harsherColors = new Array('#ffeb33','#0ea5f1','#1f0a29','#f2460d','#7FFF00'); //used to be black -> #70625c
var onColorScreen = true;
var hasChosen = false;

function select(color) {
    let shadow = document.getElementById(`${color}`).getElementsByTagName('img')[0].style; //get the image under the clicked span

    if (document.getElementById('colorless').getElementsByTagName('img')[0].style.boxShadow) {document.getElementById('colorless').getElementsByTagName('img')[0].style.boxShadow = '';}

    if (selection[color]) { //if selection is true, set it to false and hide the shadow
        selection[color] = false;
        shadow.boxShadow = '';
    }
    else { //else set to true and show the shadow
        selection[color] = true;
        shadow.boxShadow = `0px 0px 30px 5px ${colors[color]}`;
    }

    updateColor();

    if (!selection.some(function isFalse(sel){return sel})){document.getElementById('colorless').getElementsByTagName('img')[0].style.boxShadow = `0px 0px 30px 5px #ccc2c0`;} //if no element in selection array is true, set box shadow on colorless
}

function colorlessButton() {
    let images = document.getElementsByTagName('img');
    for (const sel in selection) {
        selection[sel] = false;
    }

    for (i = 0; i < images.length; i++) {
        images[i].style.boxShadow = '';
    }

    document.getElementById('colorless').getElementsByTagName('img')[0].style.boxShadow = `0px 0px 30px 5px #ccc2c0`;
    updateColor();
}

function randomColors() {
    let numberOfColors = Math.floor(Math.random() * 6); //how many colors 0 to 5
    let pickedColors = [];

    if (numberOfColors == 0) { //colorless so just call the colorless function and exit
        colorlessButton();
        return
    }

    if (numberOfColors == 5) { //five color so select everything and exit
        select(0);
        select(1);
        select(2);
        select(3);
        select(4);
        return
    }

    while (numberOfColors != 0) {
        let sel = Math.floor(Math.random() * 5); //get one random color
        if (!pickedColors.includes(sel)) { //if its not already picked and in the array, put it in the array and decrememnt
            pickedColors.push(sel);
            numberOfColors--;
        }
    }

    for (color in pickedColors) { //select each color that was picked
        select(pickedColors[color]);
    }

}

//Changes the multi color name text display
function setGradient(combination) {
    let name = document.getElementById('name');
    let comboArray = combination.split('');
    let colorPos = new Array;


    for (x in comboArray) {
        if (comboArray[x] == 1) {colorPos.push(x)}
    }

    if (colorPos.length == 2) {
        name.style.backgroundImage = `linear-gradient(60deg,${harsherColors[colorPos[0]]} 50%,${harsherColors[colorPos[1]]} 60%)`;
        name.style.backgroundImage = `-webkit-linear-gradient(60deg,${harsherColors[colorPos[0]]} 50%,${harsherColors[colorPos[1]]} 60%)`;
        name.style.backgroundClip = `text`;
        name.style.color = `transparent`;
    }
    else if (colorPos.length == 3) {
        name.style.backgroundImage = `linear-gradient(to right,${harsherColors[colorPos[0]]} 30%,${harsherColors[colorPos[1]]},${harsherColors[colorPos[2]]})`;
        name.style.backgroundImage = `-webkit-linear-gradient(to right,${harsherColors[colorPos[0]]} 30%,${harsherColors[colorPos[1]]},${harsherColors[colorPos[2]]})`;
        name.style.backgroundClip = `text`;
        name.style.color = `transparent`;
    }
    else if (colorPos.length == 4) {
        name.style.backgroundImage = `linear-gradient(to right,${harsherColors[colorPos[0]]} 30%,${harsherColors[colorPos[1]]},${harsherColors[colorPos[2]]},${harsherColors[colorPos[3]]})`;
        name.style.backgroundImage = `-webkit-linear-gradient(to right,${harsherColors[colorPos[0]]} 30%,${harsherColors[colorPos[1]]},${harsherColors[colorPos[2]]},${harsherColors[colorPos[3]]})`;
        name.style.backgroundClip = `text`;
        name.style.color = `transparent`;
    }
    else {
        name.style.backgroundImage = `linear-gradient(to right,${harsherColors[colorPos[0]]},${harsherColors[colorPos[1]]} 30%,${harsherColors[colorPos[2]]} 70%,${harsherColors[colorPos[3]]} 80%,${harsherColors[colorPos[4]]})`;
        name.style.backgroundImage = `-webkit-linear-gradient(to right,${harsherColors[colorPos[0]]},${harsherColors[colorPos[1]]} 30%,${harsherColors[colorPos[2]]} 70%,${harsherColors[colorPos[3]]} 80%,${harsherColors[colorPos[4]]})`;
        name.style.backgroundClip = `text`;
        name.style.color = `transparent`;
    }

}

//Adds to the number input
function changeNumber(type) {
    let numberBox = document.getElementById('number');
    let current = Number(numberBox.value);

    switch(type) {
        case 'up':
            // console.log(current);
            if (current > 0 && current != 6) {
                numberBox.value = current + 1;
                break;
            }
            else {break;}
            
        case 'down':
            if (current != 1) {
                numberBox.value = current - 1;
                break;
            }
            else {break;}
        }
}

function updateColor() {
    let name = document.getElementById('name');
    let combination = '';

    hasChosen = true;

    for (const bool in selection) {
            selection[bool] ? combination += '1' : combination += '0';
        }

    switch(combination) {
        case '00000':
            name.textContent = 'Colorless';
            name.style.color = '#ccc2c0';
            name.style.backgroundImage = ``;
            name.style.backgroundClip = ``;
            break;

        //One color commanders
        case '10000':
            name.textContent = 'Mono White';
            name.style.color = `${harsherColors[0]}`;
            name.style.backgroundImage = ``;
            name.style.backgroundClip = ``;
            break;
        
        case '01000':
            name.textContent = 'Mono Blue';
            name.style.color = `${harsherColors[1]}`;
            name.style.backgroundImage = ``;
            name.style.backgroundClip = ``;
            break;
            
        case '00100':
            name.textContent = 'Mono Black';
            name.style.color = `${harsherColors[2]}`;
            name.style.backgroundImage = ``;
            name.style.backgroundClip = ``;
            break;

        case '00010':
            name.textContent = 'Mono Red';
            name.style.color = `${harsherColors[3]}`;
            name.style.backgroundImage = ``;
            name.style.backgroundClip = ``;
            break;
            
        case '00001':
            name.textContent = 'Mono Green';
            name.style.color = `${harsherColors[4]}`;
            name.style.backgroundImage = ``;
            name.style.backgroundClip = ``;
            break;
 
        //Two colors
        case '11000':
            name.textContent = 'Azorius';
            setGradient(combination);
            break;

        case '10100':
            name.textContent = 'Orzhov';
            setGradient(combination);
            break;

        case '10010':
            name.textContent = 'Boros';
            setGradient(combination);
            break;

        case '10001':
            name.textContent = 'Selesnya';
            setGradient(combination);
            break;

        case '01100':
            name.textContent = 'Dimir';
            setGradient(combination);
            break;

        case '01010':
            name.textContent = 'Izzet';
            setGradient(combination);
            break;

        case '01001':
            name.textContent = 'Simic';
            setGradient(combination);
            break;

        case '00110':
            name.textContent = 'Rakdos';
            setGradient(combination);
            break;

        case '00101':
            name.textContent = 'Golgari';
            setGradient(combination);
            break;

        case '00011':
            name.textContent = 'Gruul';
            setGradient(combination);
            break;

        //Three colors
        case '11100':
            name.textContent = 'Esper';
            setGradient(combination);
            break;

        case '11010':
            name.textContent = 'Jeskai';
            setGradient(combination);
            break;

        case '11001':
            name.textContent = 'Bant';
            setGradient(combination);
            break;

        case '10110':
            name.textContent = 'Mardu';
            setGradient(combination);
            break;

        case '10101':
            name.textContent = 'Abzan';
            setGradient(combination);
            break;

        case '10011':
            name.textContent = 'Naya';
            setGradient(combination);
            break;

        case '01110':
            name.textContent = 'Grixis';
            setGradient(combination);
            break;

        case '01101':
            name.textContent = 'Sultai';
            setGradient(combination);
            break;

        case '01011':
            name.textContent = 'Temur';
            setGradient(combination);
            break;

        case '00111':
            name.textContent = 'Jund';
            setGradient(combination);
            break;

        //Four colors
        case '01111':
            name.textContent = 'Glint-Eye';
            setGradient(combination);
            break;

        case '10111':
            name.textContent = 'Dune-Brood';
            setGradient(combination);
            break;

        case '11011':
            name.textContent = 'Ink-Treader';
            setGradient(combination);
            break;

        case '11101':
            name.textContent = 'Witch-Maw';
            setGradient(combination);
            break;

        case '11110':
            name.textContent = 'Yore-Tiller';
            setGradient(combination);
            break;

        //five colors
        case '11111':
            name.textContent = 'Five color';
            setGradient(combination);
            break;

    }

}

//Pop the plus and minus spans from behind the commander counter
function moveSpinners() {
    let plus = document.getElementById('plus');
    let minus = document.getElementById('minus');

    plus.style.top = '-25px';
    minus.style.top = '30px';
    plus.style.zIndex = '3';
    minus.style.zIndex = '3';
}

//Hide the spans behind it again
function hideSpinners() {
    let plus = document.getElementById('plus');
    let minus = document.getElementById('minus');

    plus.style.top = '0px';
    minus.style.top = '0px';
    plus.style.zIndex = '0';
    minus.style.zIndex = '0';
}

// Getting cards from scryfall stuff
function getCommanders() {
    if (hasChosen == false) {
        // console.log('tried to show warning')
        showWarning();
        // setTimeout(showWarning, 4000);
    }
    else {
        document.getElementById('loadingCover').style.display = 'flex'; //show loading symbol
        document.getElementById('commanderButton').disabled = true; //disable the button so you can't hit it a bunch of times in a row
        let colors = "";
        let numOfCards = document.getElementById('number').value;
        document.getElementById("cardFlex").innerHTML = '';
        if (!selection.some(function isFalse(sel){return sel})) {colors='C'}
        else {
            // console.log(selection[0]);
            if(selection[0]){colors+='W'};
            if(selection[1]){colors+='U'};
            if(selection[2]){colors+='B'};
            if(selection[3]){colors+='R'};
            if(selection[4]){colors+='G'};
        };
        
        populateCards(numOfCards, `https://api.scryfall.com/cards/search?q=id%3D${colors}+legal%3Acommander+is%3Acommander`);
        // transitionScreen();
    }
}
        
async function grabCard(query) { //get the cards from scryfall

    const response = await fetch(query);
    const result = await response.json();

    return result;
}

function populateCards(numOfCards, query) {
    grabCard(query).then(
            function(cards) {
                let numOfCardsFromScryfall = cards.total_cards;
                let foundCommanders = new Array;
                console.log(cards);

                if (numOfCardsFromScryfall < numOfCards) {
                    console.log(`num of cards from scryfall less than number entered, setting number to ${numOfCardsFromScryfall}`);
                    numOfCards = numOfCardsFromScryfall;
                }

                while(numOfCards != 0) {
                    let randomNumber = Math.floor(Math.random() * numOfCardsFromScryfall);
                    let commander = cards.data[randomNumber];
                    if (!foundCommanders.includes(commander.id)) {
                        // console.log(commander);
                        if (commander.hasOwnProperty('card_faces')) {
                            if (commander.layout == 'flip') { //Card is two in one from kamigawa, should be rotated around on hover
                                createNewCardDiv([commander.image_uris.normal], commander.related_uris.edhrec, commander.name, false, true);
                            }
                            else { //Card is double sided, should flip over when hovered
                                createNewCardDiv([commander.card_faces[0].image_uris.normal, commander.card_faces[1].image_uris.normal], commander.related_uris.edhrec, commander.name, true, false);
                            }
                        }
                        else { //Normal card
                            createNewCardDiv([commander.image_uris.normal], commander.related_uris.edhrec, commander.name);
                        }
                        foundCommanders.push(commander.id);
                        numOfCards--;
                    }
                }
                document.getElementById('loadingCover').style.display = 'none';
                transitionScreen(); //Move the colors and card sections up
            }
        
        ).catch(function() {document.getElementById('loadingCover').style.display = 'none';document.getElementById('commanderButton').disabled=false;console.log('Something went wrong');alert("There was an error, Scryfall is most likely offline. Check their twitter to verify https://twitter.com/scryfall");});
}

function createNewCardDiv(images, link, name, isDouble = false, isFlip = false) {
    let cardFrame = document.createElement("div");
    let cardLink = document.createElement("a");
    let cardImg = document.createElement("img");

    if (isDouble) {
        let cardDoubleHolder = document.createElement("div");
        let cardImgFront = document.createElement("img");
        let cardImgBack = document.createElement("img");

        cardFrame.classList.add("cardholder");
        cardDoubleHolder.classList.add("doubleCard", "doubleHolder");
        cardImgFront.classList.add("card", "cardFront");
        cardImgBack.classList.add("card", "cardBack");
        cardLink.setAttribute("href", link);
        cardLink.setAttribute("title", name);
        cardImgFront.setAttribute("src", images[0]);
        cardImgBack.setAttribute("src", images[1]);

        cardLink.appendChild(cardImgFront);
        cardLink.appendChild(cardImgBack);
        cardDoubleHolder.appendChild(cardLink);
        cardFrame.appendChild(cardDoubleHolder);

        document.getElementById("cardFlex").appendChild(cardDoubleHolder);
    }

    else if (isFlip) {
        cardFrame.classList.add("cardholder", "flipCard");
        cardImg.classList.add("card");
        cardLink.setAttribute("href", link);
        cardLink.setAttribute("title", name);
        cardImg.setAttribute("src", images[0]);
    
        cardLink.appendChild(cardImg);
        cardFrame.appendChild(cardLink);
    
        document.getElementById("cardFlex").appendChild(cardFrame);
    }

    else {
        cardFrame.classList.add("cardholder");
        cardImg.classList.add("card");
        cardLink.setAttribute("href", link);
        cardLink.setAttribute("title", name);
        cardImg.setAttribute("src", images[0]);
    
        cardLink.appendChild(cardImg);
        cardFrame.appendChild(cardLink);
    
        document.getElementById("cardFlex").appendChild(cardFrame);
        document.getElementsByTagName('div')
    }

}

function transitionScreen() {
    let colorScreen = document.getElementById('colorsSection');
    let commanderScreen = document.getElementById('cardWrapper');

    if (onColorScreen) {
        // colorScreen.style.top = '-100%';
        colorScreen.style.transform = "translateY(-100vh)"
        // commanderScreen.style.top = '0';
        commanderScreen.style.transform = 'translateY(-95vh)';
        onColorScreen = false;
    }
    else {
        // commanderScreen.style.top = '200%';
        commanderScreen.style.transform = 'translateY(100vh)';
        // colorScreen.style.top = '0';
        colorScreen.style.transform = "translateY(0vh)"
        onColorScreen = true;
    }
}

function showWarning() {
    document.getElementById('name').style.color = '#b30000';
}

function preventColorOverlap() {
    if (!onColorScreen) {
        document.getElementById('colorsSection').style.top = '-100%';
    } 
}