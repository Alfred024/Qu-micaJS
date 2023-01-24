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
    // {x: new Compound("Hidróxido de Magnesio","","Mg(OH)2")},
    // {x: new Compound("Hidróxido de Calcio","","Ca(OH)2")},
]

let sequence = "";
let compuestoRandom;
const elementosNum = document.querySelectorAll("#tablaPeriodica button").length;

for (let i = 0; i < elementosNum; i++) {
    document.querySelectorAll("#tablaPeriodica button")[i].addEventListener("click", function(){
        if(this.innerHTML.length === 1){
            sequence += this.innerHTML+" ,";
        }else{
            sequence += this.innerHTML+",";
        }

        const section = document.getElementById("viewSequence");
        const newElement = document.createElement("button");
        newElement.innerHTML = this.innerHTML;
        section.appendChild(newElement);
    });
}

// const sequenceLength = compunds[0].x.sequence.length;
//         let index = 3;
//         do{
//             if(this.innerHTML.length === 1){
//                 sequence += this.innerHTML+" ,";
//             }else{
//                 sequence += this.innerHTML+",";
//             }
//             index+=3;
//         }while(isCorrect(index) && (sequence.length < sequenceLength));

//         if(isCorrect(index-3)){
//             console.log("Sequence correct");
//         }else{
//             console.log("Mission falied");
//         }

async function randomCompound(){
    compuestoRandom = Math.floor(Math.random() * (compunds.length)+0);
    const divCreated = document.getElementById("compuestoRandom");
    divCreated.innerHTML = compunds[compuestoRandom].x.name;
}

async function isCorrect(actualIndex){
    let realSequenceAtIndex = compunds[compuestoRandom].x.sequence.substr(0, actualIndex);
    return realSequenceAtIndex === sequence;
}