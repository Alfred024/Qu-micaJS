const Compound = class{
    constructor(name, sequence, representation){
        this.name = name;
        this.sequence = sequence;
        this.representation = representation;
    }
}
const compunds = [
    {x: new Compound("Agua destilada","H ,H ,O ,","H2O")},
    {x: new Compound("Cloruro de sodio","Na,Cl,","NaCl")},
    {x: new Compound("Ácido Clorhídrico","H ,Cl,","HCl")},
    {x: new Compound("Ácido sulfúrico","H ,H ,S ,O ,O ,O ,O ,","H2SO4")},
    {x: new Compound("Ácido nítrico","H ,N ,O ,O ,O ,","HNO3")},
    {x: new Compound("Álcohol Etílico","C ,H ,H ,H ,C ,H ,H ,O ,H ,","CH3CH2OH")},
    {x: new Compound("Metano","C ,H ,H ,H ,H ,","CH4")},
    {x: new Compound("Hidróxido de Sodio","Na,O ,H ,","NaOH")},
    {x: new Compound("Hidróxido de Potasio","K ,O ,H ,","KOH")},
    {x: new Compound("Gas propano","C ,C ,C ,H ,H ,H ,H ,H ,H ,H ,H ,","C3H8")},
    {x: new Compound("Ácido cítrico","C ,C ,C ,C ,C ,C ,H ,H ,H ,H ,H ,H ,H ,H ,O ,O ,O ,O ,O ,O ,O ,","C6H8O7")},
    {x: new Compound("Ácido fosfórico","H ,H ,H ,P ,O ,O ,O ,O ,","H3PO4")},
    {x: new Compound("Ácido sulfuroso","H ,H ,S ,O ,O ,O ,","H2SO3")},
    {x: new Compound("Hidróxido de Magnesio","Mg,O ,H ,O ,H ,","Mg(OH)2")},
    {x: new Compound("Hidróxido de Calcio","Ca,O ,H ,O ,H ,","Ca(OH)2")},
]

let sequence = "";
let index;
let started = false;
let repeated;
let compuestoRandom;
let compuestoRandomExplored = [];
const elementosNum = document.querySelectorAll("#tablaPeriodica button").length;

for (let i = 0; i < elementosNum; i++) {
    document.querySelectorAll("#tablaPeriodica button")[i].addEventListener("click", function(){
        if(this.innerHTML.length === 1){
            sequence += this.innerHTML+" ,";
        }else{
            sequence += this.innerHTML+",";
        }
        
        if(started){
            checkAnswer(index);
            createNewElement(this);
            if(started){
                if(index === compunds[compuestoRandom].x.sequence.length+3){
                    compuestoRandomExplored.push(compuestoRandom);
                    sequence = "";
                    const answer = document.getElementById("viewSequence");
                    answer.innerHTML = "";
                    creteNewTableRow();
                    randomCompound();
                }
            }else{
                const lastElementIndex = document.querySelectorAll("#viewSequence button").length-1;
                const elements = document.querySelectorAll("#viewSequence button");
                const lastElement = elements[lastElementIndex];
                lastElement.setAttribute("style","background-color: red;")
            }
        }
        // else{
        //     //Despliega info del elemento seleccionado (Nombre, número atómico, etc)
        //     console.log(this.value);
        // }
    });
}

async function randomCompound(){
    sequence = "";
    index = 3;
    do{
        compuestoRandom = Math.floor(Math.random() * (compunds.length)+0);
        indexRepeated(compuestoRandom)
    }while(repeated === true);

    const section = document.querySelector(".info");
    section.removeAttribute("hidden");
    const divCreated = document.getElementById("compuestoRandom");
    divCreated.innerHTML ="Seleccione los elementos para formar el compuesto: "+compunds[compuestoRandom].x.name;
    console.log("Secuencia solicitada: "+compunds[compuestoRandom].x.sequence);
    started = true;
}

async function checkAnswer(actualIndex){
    let realSequenceAtIndex = compunds[compuestoRandom].x.sequence.substr(0, actualIndex);

    if(realSequenceAtIndex === sequence){
        console.log("Vas bien");
        index += 3;
    }else{
        console.log("Perdiste");
        started = false;
        const btnRestart = document.getElementById("restartBtn");
        btnRestart.removeAttribute("hidden");
        // sequence = "";
        // const section = document.getElementById("viewSequence");
        // section.innerHTML="INCORRECTO";
        // index = 3;
    }
}

async function restart(){
    //Borrar los elementos que teníamos 
    sequence = "";
    index = 3;
    const btnRestart = document.getElementById("restartBtn");
    btnRestart.classList.add("hidden");
    const answerLayout = document.getElementById("viewSequence");
    answerLayout.innerHTML = "";
    //Borrar el último elemento agregado
}

async function indexRepeated(randomNum){
    repeated = false;
    let i = 0;
    while(!repeated && i < compuestoRandomExplored.length){
        if(compuestoRandomExplored[i] === randomNum){
            repeated = true;
        }
        i++;
    }
}

async function createNewElement(elementPressed){
    const answerLayout = document.getElementById("viewSequence");
    const newElement = document.createElement("button");
    newElement.innerHTML = elementPressed.innerHTML;
    answerLayout.appendChild(newElement);
}
async function creteNewTableRow(){
    const table = document.getElementById("tablaCompuestos");
    const newRow = document.createElement("tr");
    const nameCompuesto = document.createElement("th");
    nameCompuesto.innerHTML = compunds[compuestoRandom].x.name;
    const representacionCompuesto = document.createElement("th");
    representacionCompuesto.innerHTML = compunds[compuestoRandom].x.representation;
    newRow.appendChild(nameCompuesto);
    newRow.appendChild(representacionCompuesto);
    table.appendChild(newRow);
}