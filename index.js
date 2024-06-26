// const { deepCopy } = require("jsprim");


const colorThief = new ColorThief();
var dropdown = document.getElementById('options');
var colors = [];
var selectedColor = "#0000ff";
var getFromURL = document.getElementById("fromURL");
const numberOfColors = 4;
var fromClipboard = document.getElementById("fromClipboard");
var paletteCopy=[];
var fromColor = document.getElementById("getFromColor");
var fromImage = document.getElementById("getFromImage");
var getFromClipboard = document.getElementById("getFromClipboard");
var fromURL = document.getElementById("getFromURL")

var colorPickerSection = document.getElementById('colorPickerSection');
var hexCodeSection = document.getElementById('hexCodeSection');
var useColorPickerBtn = document.getElementById('useColorPickerBtn');
var useHexCodeBtn = document.getElementById('useHexCodeBtn');

var imageFromUser = document.getElementById("imageFromUser");
var infoColors = document.getElementById("infoColor");
var colorMode = document.getElementById('colorMode');

var colorPicker = document.getElementById('colorPicker');

function emptyColors(){
    colors.splice(0, colors.length);
}

var fromHEXtoRGB = document.getElementById("hexToRgb");
var divHexRGB = document.getElementById("hexToRgbDiv");

fromHEXtoRGB.addEventListener("click", function(){
    emptyColors();
    document.getElementById("fromColor").style.display = "none";
    document.getElementById("fromImage").style.display = "none";
    fromClipboard.style.display = 'none';
    clipButton.style.display= 'none';
    divRGBtoHEX.style.display = 'none';
    divHexRGB.style.display = 'block';

});
function hexToRgb() {
    let hex = document.getElementById("hexInput").value;
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
      return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
      
    } : null;
  }
var circleRGB = document.getElementById("colorChosenRGB");

  function convertHex() {
    let hex = document.getElementById("hexInput").value;
    let rgb = hexToRgb(hex);
    if (rgb) {
      document.getElementById("showRGB").value = "RGB code: " + rgb.r + ", " + rgb.g + ", " + rgb.b;
      circleRGB.style.background = hex;
      
    } else {
      alert("Invalid HEX code");
    }
  }

//TOGGLE BUTTONS
function rgbToHex(r, g, b) {
    const componentToHex = (c) => {
        const hex = c.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };
    return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
}


fromColor.addEventListener("click",function(){
    emptyColors();
    document.getElementById("fromColor").style.display = "block";
    document.getElementById("fromImage").style.display = "none";
    fromClipboard.style.display = 'none';
    clipButton.style.display= 'none';
    divRGBtoHEX.style.display = 'none';
    divHexRGB.style.display = 'none';
    
});

fromImage.addEventListener("click", function(){
    emptyColors();
    document.getElementById("fromColor").style.display = "none";
    document.getElementById("fromImage").style.display = "block";
    fromClipboard.style.display = 'none';
    clipButton.style.display= 'none';
    divRGBtoHEX.style.display = 'none';
    divHexRGB.style.display = 'none';
});


var fromRGBtoHEX = document.getElementById("rgbToHex");

var divRGBtoHEX = document.getElementById("rgbToHexDiv");
var gridRGB = document.getElementById("redgreenblue");

fromRGBtoHEX.addEventListener("click", function(){
    emptyColors();
    document.getElementById("fromColor").style.display = "none";
    document.getElementById("fromImage").style.display = "none";
    fromClipboard.style.display = 'none';
    clipButton.style.display= 'none';
    divRGBtoHEX.style.display = 'block';
    gridRGB.style.display = 'inline-block';
    gridRGB.style.gap = '5px';
    gridRGB.style.gridTemplateColumns = 'auto auto auto';
    divHexRGB.style.display = 'none';
});

function copyColorToClip(selectedColor, showIn){
    var textInput = selectedColor;
    navigator.clipboard.writeText(textInput);

    showIn.value = 'Copied!';

    setTimeout(function() {
        showIn.value = selectedColor;
    }, 1000);
};

let colorChosenHEX = document.getElementById("colorChosenHEX");

function RGBtoHEX(){
    var red1 = document.getElementById("red1").value;
    var green1 = document.getElementById("green1").value;
    var blue1 = document.getElementById("blue1").value;
     
    if (red1 && green1 && blue1){
        var r = parseInt(red1);
        var g = parseInt(green1);
        var b = parseInt(blue1);

        var hexCODE = rgbToHex(r,g,b);
        let showHEX = document.getElementById("showHEX");
        colorChosenHEX.style.background = hexCODE;
        showHEX.value = hexCODE;
        
        colorChosenHEX.addEventListener("click", copyColorToClip(hexCODE, showHEX));
        
    }else{
        alert("Please insert all required colors.");
    }
    
};

//FROM IMAGE
imageFromUser.addEventListener('change', function(event) {
     // Clear the colors array before populating it with new colors
     emptyColors();
     var divOfDivs = document.getElementById("divOfDivs2");
     divOfDivs.replaceChildren();

    // Get the selected file from the input element
    const file = event.target.files[0];

   

    // Check if a file was selected
    if (file) {
        // Create a FileReader object
        const reader = new FileReader();

        // Set up the FileReader to read the selected file
        reader.readAsDataURL(file);

        // Define what to do when the FileReader has finished loading the file
        reader.onload = function() {
            // Create a new Image element
            const imageElement = document.getElementById("userImage");
            
            // Set the src attribute of the image element to the data URL of the selected file
            imageElement.onload = function() {
                imageElement.style.display = "flex";
                // Once the image has loaded, pass it to ColorThief to get the palette
                paletteCopy = colorThief.getPalette(imageElement, numberOfColors); // Get a palette of 4 colors
                
                // Copy the paletteCopy array to the colors array
                processColor(paletteCopy,numberOfColors,2);
                
            };
            
            imageElement.src = reader.result;
        };
    }
});


function processColor(paletteCopy,numberOfColors,divNum){
    emptyColors();
    for(let i=0;i<=numberOfColors;i++){
        let currentColor = paletteCopy[i];
        if(currentColor){
            var color = rgbToHex(currentColor[0],currentColor[1],currentColor[2]);
            colors.push(color);
            createDivs(color,divNum);
        };
    };
};


function createDivs(color,divNum){
    emptyColors();
    var divOfDivs;
    if(divNum === 2){
        divOfDivs = "divOfDivs2";
    }
    else if (divNum === 3){
        divOfDivs = "divOfDivs3";
        
    }
    var divID = document.getElementById(divOfDivs);
        
    const div = document.createElement('div');
    div.classList.add("colorDOD");
    div.textContent = color;

    

    div.addEventListener("click",function(){
        navigator.clipboard.writeText(color);

        div.textContent = 'Copied!';

        setTimeout(function() {
            div.textContent = color;
        }, 1000);

    });


    div.style.background = color;
    div.classList.add("colors");
    divID.appendChild(div);
    
};





//from CLIPBOARD


getFromClipboard.addEventListener("click", function(){
    emptyColors();
    document.getElementById("fromColor").style.display = "none";
    document.getElementById("fromImage").style.display = "none";
    fromClipboard.style.display = 'block';
    image.style.height = "350px";
    clipButton.style.display = "block";
    divRGBtoHEX.style.display = 'none';
    divHexRGB.style.display = 'none';
});


var ClipboardUtils = new function() {
    
    var permissions = {
        'image/bmp': true,
        'image/gif': true,
        'image/png': true,
        'image/jpeg': true,
        'image/tiff': true
    };
    function getType(types) {
        for (var j = 0; j < types.length; ++j) {
            var type = types[j];
            if (permissions[type]) {
                return type;
            }
        }
        return null;
    }
    function getItem(items) {
        for (var i = 0; i < items.length; ++i) {
            var item = items[i];
            if(item) {
                var type = getType(item.types);
                if(type) {
                    return item.getType(type);
                }
            }
        }
        return null;
    }
    function readFile(file, callback) {
        if (window.FileReader) {
            var reader = new FileReader();
            reader.onload = function() {
                callback(reader.result, null);
            };
            reader.onerror = function() {
                callback(null, 'Incorrect file.');
            };
            reader.readAsDataURL(file);
        } else {
            callback(null, 'File API is not supported.');
        }
    }
    this.readImage = function(callback) {
        if (navigator.clipboard) {
            var promise = navigator.clipboard.read();
            promise
                .then(function(items) {
                    var promise = getItem(items);
                    if (promise == null) {
                        callback(null, null);
                          return;
                    }
                    promise
                          .then(function(result) {
                              readFile(result, callback);
                        })
                          .catch(function(error) {
                              callback(null, error || 'Clipboard reading error.');
                        });
                })
                .catch(function(error) {
                    callback(null, error || 'Clipboard reading error.');
                });
        } else {
            callback(null, 'Clipboard API is not supported.');
        }
    };
};

// Usage example:

var image = document.getElementById("image");
var clipButton = document.getElementById("clipButton");
var divOfDivs3 = document.getElementById("divOfDivs3");

function pasteImageBitmap() {
    divOfDivs3.replaceChildren();
    paletteCopy=[];
    ClipboardUtils.readImage(function(data, error) {
        if (error) {
            alert('No image displayed. First, copy it to clipboard.');
            return;
        }
        if (data) {
            image.src = data;
            paletteCopy = [];
            image.onload = function() {
                
                // Once the image has loaded, get the palette using ColorThief
                paletteCopy = colorThief.getPalette(image, numberOfColors);
                // Process the paletteCopy array
                processColor(paletteCopy, numberOfColors, 3);
                return;

            };

        }
        else{
            alert('No image displayed. First, copy it to clipboard.');
        }
    });
}

function menuColorSwitch(){
    if(colorMode.value === 'light'){
        getFromClipboard.classList.add('btn-outline-secondary');
        fromImage.classList.add('btn-outline-secondary');
        fromColor.classList.add('btn-outline-secondary');
        fromHEXtoRGB.classList.add('btn-outline-secondary');
        fromRGBtoHEX.classList.add('btn-outline-secondary')

        if(fromRGBtoHEX.classList.contains('btn-outline-light')){
            fromRGBtoHEX.classList.remove('btn-outline-light')
        }
        if(fromColor.classList.contains('btn-outline-light')){
            fromColor.classList.remove('btn-outline-light');
            
        }
        if(fromImage.classList.contains('btn-outline-light')){
            fromImage.classList.remove('btn-outline-light');
        
        }
        if(getFromClipboard.classList.contains('btn-outline-light')){
            getFromClipboard.classList.remove('btn-outline-light');
        }
        if(fromHEXtoRGB.classList.contains('btn-outline-light')){
            fromHEXtoRGB.classList.remove('btn-outline-light');
        }
        
    }
    else{ //class="btn btn-dark"
        fromImage.classList.add("btn-outline-light");
        fromColor.classList.add("btn-outline-light");
        getFromClipboard.classList.add("btn-outline-light");
        fromHEXtoRGB.classList.add("btn-outline-light");
        fromRGBtoHEX.classList.add("btn-outline-light");

        if(fromRGBtoHEX.classList.contains('btn-outline-secondary')){
            fromRGBtoHEX.classList.remove('btn-outline-secondary')
        }
        if(fromColor.classList.contains('btn-outline-secondary')){
            fromColor.classList.remove('btn-outline-secondary')
        }
        if(fromImage.classList.contains('btn-outline-secondary')){
            fromImage.classList.remove('btn-outline-secondary');
        }
        if(getFromClipboard.classList.contains('btn-outline-secondary')){
            getFromClipboard.classList.remove('btn-outline-secondary');
        }
        if(fromHEXtoRGB.classList.contains('btn-outline-secondary')){
            fromHEXtoRGB.classList.remove('btn-outline-secondary');
        }
    }
};

//COLOR MODE SWITCH
colorMode.addEventListener("change", function(){
    
    if(useColorPickerBtn.classList.contains('btn-primary')){
        colorPickerSwitch();
    }
    else{
        hexCodeSwitch();
    }

    switch(colorMode.value){
        case 'light':
            
            document.documentElement.classList.add("light");
            document.body.classList.add("light");
            document.documentElement.classList.remove("dark");
            document.body.classList.remove("dark");
            document.getElementById('colorInput').style.backgroundColor ='#FEFDED';
            document.getElementById('hexCode').style.backgroundColor ='#FEFDED';
            document.getElementById('head').style.color='#FA7070';
            document.getElementById('colorInput').style.color ='black';
            document.getElementById('hexCode').style.color ='black';
            menuColorSwitch()
            break;

            

        case 'dark':
            
            document.getElementById('head').style.color='#FEFDED';
            document.documentElement.classList.add("dark");
            document.body.classList.add("dark");
            document.documentElement.classList.remove("light");
            document.body.classList.remove("light");
            document.getElementById('colorInput').style.color ='white';
            document.getElementById('hexCode').style.color ='white';

            document.getElementById('hexCode').style.backgroundColor= '#16213E';
            document.getElementById('colorInput').style.backgroundColor= '#16213E';
            menuColorSwitch()
            break;
    }
});

// Event listener for "Use Color Picker" button
colorPicker.addEventListener("input", function() {
    selectedColor = colorPicker.value;
    var colorInput = document.getElementById('colorInput');
    colorInput.value = selectedColor;
    generateColors();
});

//FROM COLOR
function colorPickerSwitch(){
    useColorPickerBtn.classList.add('btn-primary');
    useHexCodeBtn.classList.remove('btn-primary');

    if(colorMode.value === 'light'){
        if(useColorPickerBtn.classList.contains('btn-outline-light')){
            useColorPickerBtn.classList.remove('btn-outline-light');
            
        }
        if(useHexCodeBtn.classList.contains('btn-outline-light')){
            useHexCodeBtn.classList.remove('btn-outline-light');
        }
        useHexCodeBtn.classList.add('btn-outline-secondary');
        useColorPickerBtn.classList.remove('btn-outline-secondary');
    }
    else{ //class="btn btn-dark"
        if(useColorPickerBtn.classList.contains('btn-outline-secondary')){
            useColorPickerBtn.classList.remove('btn-outline-secondary');
            
        }
        if(useColorPickerBtn.classList.contains('btn-outline-light')){
            useColorPickerBtn.classList.remove('btn-outline-light');
        }
        useHexCodeBtn.classList.add('btn-outline-light');
    }
}




//FROM COLOR
useColorPickerBtn.addEventListener('click', function() {
    colorPickerSection.style.display = 'flex';
    colorPickerSection.style.gap = '5px';
    colorPickerSection.style.justifyContent = 'flex-start';
    hexCodeSection.style.display = 'none';
    colorPickerSwitch();
    var colorPicker = document.getElementById('colorPicker');
    selectedColor = colorPicker.value;
    generateColors();
});

colorInput.addEventListener('click',function(){
    var textInput = selectedColor;
    copyColorToClip(textInput,colorInput);
});

document.getElementById('generate').addEventListener("click",function(){
    generateColors();
    var colorSquares = document.getElementsByClassName('colors');
    var colorStack = document.getElementById('colorsDiv');
    colorStack.style.display = 'grid';

    var buttons = document.querySelectorAll('.grid-element.btn.btn-outline-secondary');

    for (let i = 0; i < colors.length; i++) {
        if (buttons[i]) {
            buttons[i].textContent = colors[i] ;

        }
    }

    colorSquares[0].style.backgroundColor = colors[0];
    colorSquares[1].style.backgroundColor = colors[1];
    colorSquares[2].style.backgroundColor = colors[2];
});

var btnColor1 = document.getElementsByClassName('btnColor');
document.addEventListener('DOMContentLoaded', function() {
    var buttonColors = document.getElementsByClassName('btnColor');
    for(let i = 0; i < colors.length; i++) {
        buttonColors[i].addEventListener('click', function() {
            var copyText = colors[i];
            var buttonText = buttonColors[i].textContent.trim();
            // Copy the text inside the text field
            navigator.clipboard.writeText(copyText);
            buttonColors[i].textContent = 'Copied!';

            // Reset the button text after a brief delay
            setTimeout(function() {
                buttonColors[i].textContent = colors[i];
            }, 1000);
            });
        }});


        
function hexCodeSwitch(){
    useColorPickerBtn.classList.remove('btn-primary');
    useHexCodeBtn.classList.add('btn-primary');

    if(colorMode.value === 'light'){
        if(useHexCodeBtn.classList.contains('btn-outline-light')){
            useHexCodeBtn.classList.remove('btn-outline-light');
        }
        if(useColorPickerBtn.classList.contains('btn-outline-light')){
            useColorPickerBtn.classList.remove('btn-outline-light');
        }
        useColorPickerBtn.classList.add('btn-outline-secondary');
        useHexCodeBtn.classList.remove('btn-outline-secondary');
    }
    else{ //class="btn btn-dark"
        if(useHexCodeBtn.classList.contains('btn-outline-secondary')){
            useHexCodeBtn.classList.remove('btn-outline-secondary');
            
        }
        if(useHexCodeBtn.classList.contains('btn-outline-secondary')){
            useHexCodeBtn.classList.remove('btn-outline-secondary');
        }
        useColorPickerBtn.classList.add('btn-outline-light');
        useHexCodeBtn.classList.remove('btn-outline-light');
    }
};

// Event listener for "Use HEX Code" button
useHexCodeBtn.addEventListener('click', function() {


    hexCodeSwitch();
    // Set display and flex properties for the sections
    colorPickerSection.style.display = 'none'; // Hide color picker section
    hexCodeSection.style.display = 'flex'; // Ensure hex code section is displayed as flex
    
    // Adjust flex properties for the hex code section
    hexCodeSection.style.gap = '5px'; // Set gap between flex items
    hexCodeSection.style.justifyContent = 'flex-start'; // Align items to the start
});



function submitColor() {
    var colorInput = document.getElementById('hexCode').value.trim();
    var colorBox = document.getElementById('colorChosenInput');
    console.log(colorInput);
    // Check if the input is a valid hex color code
    if (/^#[0-9A-F]{6}$/i.test(colorInput)) {
        // Apply the color to the color box
        
        selectedColor = colorInput;
        colorBox.style.backgroundColor = colorInput;
        generateColors();
    } else {
        // Show an error message or handle invalid input
        alert("Please enter a valid hex color code.");
    }
}


getComplementaryColors(selectedColor);
dropdown.addEventListener("change", function() {
    generateColors();
});


function generateColors() {
    colors = [];
    switch (dropdown.value) {
        
        case 'Complementary':
            infoColors.textContent = "Complementary colors are hues that are directly opposite each other on the color wheel. They create vibrant contrast when used together, making each other appear more intense."
            getComplementaryColors(selectedColor);
            
            break;
        case 'Monochromatic':
            infoColors.textContent = "Monochrome colors are different shades and tints of a single hue. They vary only in brightness or saturation while maintaining the same base color."
            getMonochromaticColors(selectedColor);
            break;
        case 'Analogous':
            infoColors.textContent = "Analogous colors are hues that are adjacent to each other on the color wheel. They share a similar undertone and create harmonious color schemes when used together."
            getAnalogousColors(selectedColor);
            break;
        case 'Split-complementary':
            infoColors.textContent = "Split complementary colors are a combination of one base color and the two colors adjacent to its complement."
            getSplitComplementaryColors(selectedColor);
            break;
        

    }
}


function getMonochromaticColors(baseColor) {
    var baseColorObj = tinycolor(baseColor);

    // Generate monochromatic colors by adjusting brightness
    for (var i = 1; i <= 3; i++) {
        // Adjust brightness (alternating between darkening and lightening)
        var modifiedColor;
        if (i % 2 === 0) {
            modifiedColor = baseColorObj.darken(i * 10); // Increase the amount of darkness
        } else {
            modifiedColor = baseColorObj.lighten(i * 10); // Increase the amount of lightness
        }
        colors.push(modifiedColor.toHexString());
    }
};


function getAnalogousColors(baseColor) {
    var baseColorObj = tinycolor(baseColor);
    var hsl = baseColorObj.toHsl();
    var offset1 = 30;
    var offset2 = -30;
    var offset3 = 60;
    var analogousHue1 = (hsl.h + offset1) % 360;
    var analogousHue2 = (hsl.h + offset2) % 360;
    var analogousHue3 = (hsl.h + offset3) % 360;
    var analogousColor1 = tinycolor({ h: analogousHue1, s: hsl.s, l: hsl.l });
    var analogousColor2 = tinycolor({ h: analogousHue2, s: hsl.s, l: hsl.l });
    var analogousColor3 = tinycolor({ h: analogousHue3, s: hsl.s, l: hsl.l });
    colors.push(analogousColor1.toHexString());
    colors.push(analogousColor2.toHexString());
    colors.push(analogousColor3.toHexString());
};

function getComplementaryColors(baseColor) {
    var baseColorObj = tinycolor(baseColor);

    // Get the HSL representation of the base color
    var hsl = baseColorObj.toHsl();

    // Calculate the complementary hues
    var complementaryHue1 = (hsl.h + 180) % 360;
    var complementaryHue2 = (complementaryHue1 + 60) % 360;
    var complementaryHue3 = (complementaryHue1 - 60) % 360;

    // Create color objects with the complementary hues
    var complementaryColor1 = tinycolor({ h: complementaryHue1, s: hsl.s, l: hsl.l });
    var complementaryColor2 = tinycolor({ h: complementaryHue2, s: hsl.s, l: hsl.l });
    var complementaryColor3 = tinycolor({ h: complementaryHue3, s: hsl.s, l: hsl.l });

    // Push the complementary colors to the colors array
    colors.push(complementaryColor1.toHexString());
    colors.push(complementaryColor2.toHexString());
    colors.push(complementaryColor3.toHexString());
};

function getSplitComplementaryColors(baseColor) {
    var baseColorObj = tinycolor(baseColor);
    var hsl = baseColorObj.toHsl();
    var complementaryHue = (hsl.h + 180) % 360;
    var offset = 30;
    var splitComplementaryHue1 = (complementaryHue + offset) % 360;
    var splitComplementaryHue2 = (complementaryHue - offset) % 360;
    var splitComplementaryHue3 = (splitComplementaryColor1 - offset) % 360;
    var splitComplementaryColor1 = tinycolor({ h: splitComplementaryHue1, s: hsl.s, l: hsl.l });
    var splitComplementaryColor2 = tinycolor({ h: splitComplementaryHue2, s: hsl.s, l: hsl.l });
    var splitComplementaryColor3 = tinycolor({ h: splitComplementaryHue3, s: hsl.s, l: hsl.l });
    colors.push(splitComplementaryColor1.toHexString());
    colors.push(splitComplementaryColor3.toHexString());
    colors.push(splitComplementaryColor2.toHexString());
};

