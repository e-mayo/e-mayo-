
function toSpannedText(text, n) {
    var idx = 0;
    var spannedText = '';
    text_list = text.split(' ');
    for (const word of text_list) {
        idx = Math.floor(Math.random()*n)
        spannedText = `${spannedText} <span id=p${idx}> ${word} </span>`;
        idx++
    }
    return [spannedText, idx]
}

function shuffleArray(array) {
    for (let i = array.length  - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [array[i],array[j]] = [array[j],array[i]];
    }    
    return array
}

function changeTextOpaccity(text, opacity) {
    text.style.opacity = opacity
}

function sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve,milliseconds))   
}

function appearingParagraph1(paragraph,n=5,delay=100,deltaOp=3) {
    var text = paragraph.innerText;
    [spannedText, idx] = toSpannedText(text, n);
    paragraph.innerHTML = spannedText;
    (async()=>{
        for (var index = 0; index < n; index++) {
            var words = document.querySelectorAll(`#p${index}`);
            await sleep(1*delay);
            for (var op = 0; op <= 10; op = op + deltaOp) {
                await sleep(10*delay);
                for (const word of words) {  
                    word.style.color='black'
                    word.style.opacity = `${op/10}`;
                }
            }
        }
    })();
}    

function appearingParagraph(paragraph,n=5,delay=100,deltaOp=3) {
    var text = paragraph.innerText;
    [spannedText, idx] = toSpannedText(text, n);
    paragraph.innerHTML = spannedText;
    (async()=>{
        for (var op = 0; op <= 10; op = op + deltaOp) {
            indexList = [];
            for (var index = 0; index < n; index++) {
                indexList.push(index)
            }
            indexList = shuffleArray(indexList);
            await sleep(1*delay);
            for (const index of indexList) {
                var words = document.querySelectorAll(`#p${index}`);
                words= shuffleArray(words);
                for (const word of words) {  
                    await sleep(1*delay);
                    word.style.color='black';
                    word.style.opacity = `${op/10}`;
                }
            }
            console.log(`group:${index}, op:${words[0].style.opacity}`);
        }
    })();
}    
