
// Change the config below to change the operations created
let defaultConfig = {
    numberOfOps: 5, // number of exercises to generate
    maxNum: 100,  //maximum number to use in the exercises
    minNum: 1, //minimum number to use in the exercises
    operators: ["+", "-"], //which operations you want them to play with
    onlyNaturals: true //do you want to use N numbers as a result? 
}

//does what it says on the tin: an int between min and max
const  randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min; 

//Saves the config to local storage
const saveConfig = (cfg) => localStorage.setItem('config', JSON.stringify(cfg));

//retrieves config from localstorage
const retrieveConfig = () => JSON.parse(localStorage.getItem("config")) || defaultConfig;

//generates the string of operations
const createOperationString = (min, max, operators=[], onlyNaturals=true) => {
    const t1 = randInt(min, max);
    const t2 = randInt(min, max);
    const opId = randInt(0, operators.length - 1);
    const op = operators[opId];

    if (onlyNaturals && (t1 < t2) && ((op === '-') || (op === '/')))
        return `${t2} ${op} ${t1} = `;
    return `${t1} ${op} ${t2} = `;

}

//appends the operations to the main div
const addToDiv = (mainDiv, opStr) => mainDiv.append(`<li class="operation">${opStr}</li>`);

//resets the form on load to match the saved config
const dinamicallyResetForm = (cfg) => {
    $("#txt-minnum").val(cfg.minNum);
    $("#txt-maxnum").val(cfg.maxNum);
    $("#txt-numofops").val(cfg.numberOfOps);
    $("[name=chk-operators]").each((id, el) => $(el).prop('checked', cfg.operators.includes($(el).data("op"))));
    let onlyNaturals = $("#chk-onlynaturals");
    onlyNaturals.prop('checked', cfg.onlyNaturals);
    
}

$(document).ready(() => {
    const container = $("#operations-list");
    const cfg = retrieveConfig();
    dinamicallyResetForm(cfg);

    //first rendering
    for (let i = 0; i < cfg.numberOfOps; i++)
        addToDiv(container, createOperationString(cfg.minNum, cfg.maxNum, cfg.operators, cfg.onlyNaturals));
    
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
        
        //save the config at every generation
        saveConfig({numberOfOps, maxNum, minNum, operators, onlyNaturals});
    });

    $("#btn-print").on("click", () => window.print());
});

