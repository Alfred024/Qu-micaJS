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
let compuestoRandom = Math.floor(Math.random() * compunds.length-1);
const elementosNum = document.querySelectorAll("#tablaPeriodica button").length;

for (let i = 0; i < elementosNum; i++) {
    document.querySelectorAll("#tablaPeriodica button")[i].addEventListener("click", function(){
        elementPressed = this;
        getSequence(elementPressed);
    });
}

async function getSequence(element){

    const sequenceLength = compunds[compuestoRandom].x.sequence.length;
    let index = 3;
    do{
        if(element.innerHTML.length === 1){
            sequence += element.innerHTML+" ,";
        }else{
            sequence += element.innerHTML+",";
        }
        index+=3;
    }while(isCorrect(index) && (sequence.length < sequenceLength));

}

async function isCorrect(actualIndex){
    let realSequenceAtIndex = compunds[compuestoRandom].x.sequence.substr(0, actualIndex);
    return realSequenceAtIndex === sequence;
}