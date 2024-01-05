
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

    if (onlyNaturals && (t1 < t2) && ((op === '-') || (op === '/')))
        return `${t2} ${op} ${t1} = `;
    return `${t1} ${op} ${t2} = `;

}

const addToDiv = (mainDiv, opStr) => {
    let newHTML = `<li class="operation">${opStr}</li>`;
    mainDiv.append(newHTML);
}


$(document).ready(() => {
    const container = $("#operations-list");

    //first rendering
    for (let i = 0; i < config.numberOfOps; i++)
        addToDiv(container, createOperationString(config.minNum, config.maxNum, config.operators, config.onlyNaturals));
    
    // Generate new numbers
    // TODO: Extract the validation and validate maxNum and minNum better
    $("#btn-generate").on("click", () => {
        let operators = $("[name=chk-operators]:checked").map((i, e) => e.value).toArray();
        let numberOfOps = Number($("#txt-numofops").val());
        let minNum = Number($("#txt-minnum").val());
        let maxNum = Number($("#txt-maxnum").val());
        let onlyNaturals = $("#chk-onlynaturals:checked").length > 0;

        if (operators.length < 1) {
            alert('You need to choose some operators please');
            return;
        }
        if (numberOfOps > 1000) {
            alert('We would not recommend to generate such a number of operations.');
            return;
        }

        container.empty();
        for (let i = 0; i < numberOfOps; i++)
            addToDiv(container, createOperationString(minNum, maxNum, operators, onlyNaturals));
    });

    $("#btn-print").on("click", () => window.print());
});

