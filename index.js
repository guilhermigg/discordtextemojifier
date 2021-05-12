// Arrays
const numbers = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
const special = ["#"," *", "?", ".", "$", "-", "!", "+"]
const specialEmoji = ["hash", "asterisk", "question", "black_small_square", "heavy_dollar_sign",
 "heavy_minus_sign", "exclamation", "heavy_plus_sign"]

// Textarea
const input = document.getElementById('input');
const output = document.getElementById('output');

// Length info element
const inputLengthElement = document.getElementById('input-length');
const outputLengthElement = document.getElementById('output-length');

// Remove accent
function normalizar(text) {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, "").trim();
}

// Update the length of the text
function updateLength(){
    inputLengthElement.textContent = "Tamanho: "+input.value.trim().length;
    outputLengthElement.textContent = "Tamanho: "+output.value.trim().length;
}

// This one is the main function of this website
// Replace letters by discord emojis
function emojify() {
    var text = input.value.toLowerCase();
    text = normalizar(text);
    
    var emojis = "";

    text.split('').forEach(char => {
        let emoji;

        if(char == " ") { //Check space
            emojis+="  ";
            return;

        } else if(special.indexOf(char)>-1) { // Check special
            let index = special.indexOf(char);
            emoji = specialEmoji[index];

        } else if(!isNaN(char)) { // Check number
            emoji = numbers[char];

        } else if(/[a-z]/g.test(char)) {
            emoji = `regional_indicator_${char}`;
        } else {
            return;
        }

        emojis += `:${emoji}: `;
    })

    output.value = emojis;
    updateLength();
}

// Copy the emojified text to your clipboard, wow
function copyToClipboard(){
    output.select();
    output.setSelectionRange(0, 99999); 
    
    document.execCommand("copy");
}
