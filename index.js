const Compound = class{
    constructor(name, sequence, representation){
        this.name = name;
        this.sequence = sequence;
        this.representation = representation;
    }
}
const compunds = [
    {compound: new Compound("Agua destilada","H ,H ,O ,","H2O")},
    {compound: new Compound("Cloruro de sodio","Na,Cl,","NaCl")},
    {compound: new Compound("Ácido Clorhídrico","H ,Cl,","HCl")},
    {compound: new Compound("Ácido sulfúrico","H ,H ,S ,O ,O ,O ,O ,","H2SO4")},
    {compound: new Compound("Ácido nítrico","H ,N ,O ,O ,O ,","HNO3")},
    {compound: new Compound("Álcohol Etílico","C ,H ,H ,H ,C ,H ,H ,O ,H ,","CH3CH2OH")},
    {compound: new Compound("Metano","C ,H ,H ,H ,H ,","CH4")},
    {compound: new Compound("Hidróxido de Sodio","Na,O ,H ,","NaOH")},
    {compound: new Compound("Hidróxido de Potasio","K ,O ,H ,","KOH")},
    {compound: new Compound("Gas propano","C ,C ,C ,H ,H ,H ,H ,H ,H ,H ,H ,","C3H8")},
    {compound: new Compound("Ácido cítrico","C ,C ,C ,C ,C ,C ,H ,H ,H ,H ,H ,H ,H ,H ,O ,O ,O ,O ,O ,O ,O ,","C6H8O7")},
    {compound: new Compound("Ácido fosfórico","H ,H ,H ,P ,O ,O ,O ,O ,","H3PO4")},
    {compound: new Compound("Ácido sulfuroso","H ,H ,S ,O ,O ,O ,","H2SO3")},
    {compound: new Compound("Hidróxido de Magnesio","Mg,O ,H ,O ,H ,","Mg(OH)2")},
    {compound: new Compound("Hidróxido de Calcio","Ca,O ,H ,O ,H ,","Ca(OH)2")},
]

const Element = class{
    constructor(name, pa, pf, confElec){
        this.name = name;
        this.pa = pa;
        this.pf = pf;
        this.confElec = confElec;
    }
}

const elements = [
    {e: new Element("Hidrógeno", 1.008, " -259.1°C", "1s(1)")}
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
                if(index === compunds[compuestoRandom].compound.sequence.length+3){
                    compuestoRandomExplored.push(compuestoRandom);
                    sequence = "";
                    const answer = document.getElementById("viewSequence");
                    answer.innerHTML = "";
                    createBtnRestart();
                    creteNewTableRow();
                    randomCompound();
                }
            }else{
                const lastElementIndex = document.querySelectorAll("#viewSequence button").length-1;
                const elements = document.querySelectorAll("#viewSequence button");
                const lastElement = elements[lastElementIndex];
                lastElement.setAttribute("style","background-color: red;")
                //Aquí podemos eliminar el elemento incorrecto si así lo queremos
                lastElement.addEventListener('click', function () {
                    deleteLastElement(lastElement);
                });
            }
        }else{
            //Despliega info del elemento seleccionado (Nombre, número atómico, etc)
            console.log(this.value);
        }
    });
}

async function randomCompound(){
    restart();
    //document.getElementById("restartBtn").classList.add("hidden");
    document.getElementById("tablaCompuestos").removeAttribute("hidden");
    sequence = "";
    index = 3;
    do{
        compuestoRandom = Math.floor(Math.random() * (compunds.length)+0);
        indexRepeated(compuestoRandom)
    }while(repeated === true);

    const section = document.querySelector(".info");
    section.removeAttribute("hidden");
    const divCreated = document.getElementById("compuestoRandom");
    divCreated.innerHTML ="Seleccione los elementos para formar el compuesto: "+compunds[compuestoRandom].compound.name;
    console.log("Secuencia solicitada: "+compunds[compuestoRandom].compound.sequence);
    started = true;
}

async function checkAnswer(actualIndex){
    let realSequenceAtIndex = compunds[compuestoRandom].compound.sequence.substring(0, actualIndex);

    if(realSequenceAtIndex === sequence){
        index += 3;
    }else{
        started = false;
        // const btnRestart = document.getElementById("restartBtn");
        // btnRestart.removeAttribute("hidden");
    }
}

async function restart(){
    sequence = "";
    index = 3;
    started = true;
    const answerLayout = document.getElementById("viewSequence");
    answerLayout.innerHTML = "";
    createBtnRestart();
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
    //newElement.addEventListener('click', deleteLastElement());
}
async function deleteLastElement(lastElement){
    sequence = sequence.substring(0, index-3);
    lastElement.remove();
    started = true;
}
async function creteNewTableRow(){
    const table = document.getElementById("tablaCompuestos");
    const newRow = document.createElement("tr");
    const nameCompuesto = document.createElement("th");
    nameCompuesto.innerHTML = compunds[compuestoRandom].compound.name;
    const representacionCompuesto = document.createElement("th");
    representacionCompuesto.innerHTML = compunds[compuestoRandom].compound.representation;
    newRow.appendChild(nameCompuesto);
    newRow.appendChild(representacionCompuesto);
    table.appendChild(newRow);
}
async function createBtnRestart(){
    const answerLayout = document.getElementById("viewSequence");
    const newResBtn = document.createElement("button");
    newResBtn.setAttribute("id","restartBtn");
    newResBtn.setAttribute("onclick","restart()");
    newResBtn.innerHTML = "R";
    answerLayout.appendChild(newResBtn);
}