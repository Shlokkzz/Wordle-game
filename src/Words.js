import wordBank from './wordle-bank.txt'
export const boardDefault = [
    ["","","","",""],
    ["","","","",""],
    ["","","","",""],
    ["","","","",""],
    ["","","","",""],
    ["","","","",""],
]

const generateWordSet = async ()=>{
    let wordSet;
    await fetch(wordBank)
    .then((response)=>response.text())
    .then((result)=>{
        const wordArr = result.split("\n");
        wordSet=new Set(wordArr);
    })
    return {wordSet}
}