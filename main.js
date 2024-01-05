
// Change the config below to change the operations created

const config = {
    numberOfOps: 5, // number of exercises to generate
    maxNum: 100,  //maximum number to use in the exercises
    minNum: 1, //minimum number to use in the exercises
    operators: ["+", "-"], //which operations you want them to play with
    onlyNaturals: true //do you want to use N numbers as a result? 
}



const  randInt = (min, max) => Math.floor(Math.random() * max) + min; 

const createOperationString = (min, max, operators=[], onlyNaturals=true) => {
    const t1 = randInt(min, max);
    const t2 = randInt(min, max);
    const opId = randInt(0, operators.length);
    const op = operators[opId];

    if (onlyNaturals && (t1 < t2) && (op === '-'))
        return `${t2} ${op} ${t1} = `;
    return `${t1} ${op} ${t2} = `;

}

const addToDiv = (mainDiv, opStr) => {
    let newHTML = `<div class="operation">${opStr}</div>`;
    mainDiv.append(newHTML);
}


$(document).ready(() => {
    container = $("#operations-list");
    for (let i = 0; i < config.numberOfOps; i++)
        addToDiv(container, createOperationString(config.minNum, config.maxNum, config.operators, config.onlyNaturals));
});