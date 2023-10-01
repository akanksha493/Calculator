
let array = {
    operand1:"",
    operand2:"",
    operator:"",
};
let initialOperand1 = true;
let initialOperand2 = true;
let tempOperand = "";


function operate(operand1, operand2, operator){
    if(operator === "+"){
        return operand1+operand2;
    }
    else if(operator === "-"){
        return operand1-operand2;
    }
    else if(operator === "*"){
        return operand1*operand2;
    }
    return operand1/operand2;
}
function disableDotOperator(){
    const dotOperator = document.querySelector("#decimal");
    if(tempOperand.includes(".")){
        dotOperator.disabled = true;
    }else{
        dotOperator.disabled = false;
    }
}
function restart(){
    window.location.reload();
}
function backspace(){
    const screen = document.querySelector("#display-screen");
    if(screen.textContent ==="Infinity"){
        screen.textContent = "0";
    }
    if(screen.textContent.length === 1 ){
        screen.textContent = "0";
        
    }else{
        screen.textContent = screen.textContent.slice(0,-1);
    }
    tempOperand = screen.textContent;
    //input operand 1
    if(array.operand2==="" && (array.operator==="=" || array.operator==="")){
        array.operand1 = Math.round(parseFloat(tempOperand)*100)/100;
    }
    else{
        array.operand2 = Math.round(parseFloat(tempOperand)*100)/100;
    }
    disableDotOperator();
    console.log(array);
}

function inputOperator(e){
    if(array.operand1!=="" && array.operand2!=="" && (array.operator!=="=" || array.operator!=="")){
        const screen = document.querySelector("#display-screen");
        const result = operate(array.operand1,array.operand2,array.operator);
        if(result === Infinity){
            // console.log("Can't Divide By Infinity");
            screen.textContent = result.toString();
            array.operand1 = result;
        }
        else{
            const roundedResult = Math.round(result*100)/100;
            screen.textContent = roundedResult.toString();
            array.operand1 = Math.round(parseFloat(screen.textContent)*100)/100;
        }
        array.operand2 = "";
        initialOperand2 = true;
    }
    array.operator = e.target.textContent;
    console.log(array);
}
function equalOperator(){
    if(array.operand1!=="" && array.operand2!=="" && array.operator!=="="){
        const screen = document.querySelector("#display-screen");
        const result = operate(array.operand1,array.operand2,array.operator);
        if(result === Infinity){
            // console.log("Can't Divide By Infinity");
            screen.textContent = result.toString();
            array.operand1 = result;
        }
        else{
            const roundedResult = Math.round(result*100)/100;
            screen.textContent = roundedResult.toString();
            array.operand1 = Math.round(parseFloat(screen.textContent)*100)/100;
        }
    }
    array.operand2 = "";
    array.operator = "=";
    initialOperand2 = true;
    console.log(array);
}

function inputOperand(e){
    const screen = document.querySelector("#display-screen");
    //input operand 1
    if(array.operand2==="" && (array.operator==="" || array.operator==="=")){
        if(initialOperand1){
            screen.textContent ="";
            initialOperand1 = false;
        }
        
        if(e.target.textContent==="." && !screen.textContent.includes(".")){
            screen.textContent +=e.target.textContent;
            tempOperand+=e.target.textContent;
            array.operand1 = Math.round(parseFloat(screen.textContent)*100)/100;
        }else{
            tempOperand+=e.target.textContent;
            array.operand1 = Math.round(parseFloat(tempOperand)*100)/100;
            screen.textContent = array.operand1.toString();
        }
    }
    //input operand 2
    else if(array.operand1 !=="" && array.operator!=="="){
        if(initialOperand2){
            initialOperand2 = false;
            tempOperand="";
            tempOperand+=e.target.textContent;
            array.operand2 = Math.round(parseFloat(tempOperand)*100)/100;
            screen.textContent = array.operand2.toString();
        }
        else{
            if(e.target.textContent==="." && !screen.textContent.includes(".")){
                screen.textContent = screen.textContent+e.target.textContent;
                tempOperand+=e.target.textContent;
                array.operand2 = Math.round(parseFloat(screen.textContent)*100)/100;
            }else{
                tempOperand+=e.target.textContent;
                array.operand2 = Math.round(parseFloat(tempOperand)*100)/100;
                screen.textContent = array.operand2.toString();
            }
        }
    }
    disableDotOperator();
    console.log(array);
}

function start(){
    const digit_bttns = document.querySelectorAll(".digit.bttn");
    digit_bttns.forEach((bttn)=>{
        bttn.addEventListener("click",inputOperand);
    });

    const op_bttns = document.querySelectorAll(".operator.bttn");
    op_bttns.forEach((bttn)=>{
        bttn.addEventListener("click",inputOperator);
    });

    const resultBttn = document.querySelector("#equal");
    resultBttn.addEventListener("click",equalOperator);

    const clearBttn = document.querySelector("#clear");
    clearBttn.addEventListener("click",restart);

    const backBttn = document.querySelector("#backspace");
    backBttn.addEventListener("click",backspace);
}

start();
