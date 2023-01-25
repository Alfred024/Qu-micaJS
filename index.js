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
let index = 3;
let started = false;
let compuestoRandom;
const elementosNum = document.querySelectorAll("#tablaPeriodica .parte1 button").length;

for (let i = 0; i < elementosNum; i++) {
    document.querySelectorAll("#tablaPeriodica .parte1 button")[i].addEventListener("click", function(){
        if(this.innerHTML.length === 1){
            sequence += this.innerHTML+" ,";
        }else{
            sequence += this.innerHTML+",";
        }
        
        if(this.innerHTML != "Generar compuesto aleatorio"){
            const section = document.getElementById("viewSequence");
            const newElement = document.createElement("button");
            newElement.innerHTML = this.innerHTML;
            section.appendChild(newElement);
        }

        if(started){
            checkAnswer(index);
            index+=3;
        }else{
            
        }
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
//         }while(checkAnswer(index) && (sequence.length < sequenceLength));

//         if(checkAnswer(index-3)){
//             console.log("Sequence correct");
//         }else{
//             console.log("Mission falied");
//         }

async function randomCompound(){
    const text = document.querySelector("#viewSequence p");
    text.removeAttribute("hidden");
    compuestoRandom = Math.floor(Math.random() * (compunds.length)+0);
    const divCreated = document.getElementById("compuestoRandom");
    divCreated.innerHTML ="Seleccione los elementos para formar el compuesto: "+compunds[compuestoRandom].x.name;
    //Tiene que limpiar el viewSequence con todos los elementos generados
    console.log("Secuencia solicitada: "+compunds[compuestoRandom].x.sequence);
    started = true;
}

async function checkAnswer(actualIndex){
    let realSequenceAtIndex = compunds[compuestoRandom].x.sequence.substr(0, actualIndex);

    if(realSequenceAtIndex === sequence){
        console.log("Vas bien");
        return true;
    }else{
        console.log("Perdiste");

        started = false;
        sequence = "";
        const section = document.getElementById("viewSequence");
        section.innerHTML="";
        index = 3;
        return false;
    }
}
