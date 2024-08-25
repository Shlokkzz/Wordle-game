import wordBank from './wordle-bank.txt'
export const boardDefault = [
    ["","","","",""],
    ["","","","",""],
    ["","","","",""],
    ["","","","",""],
    ["","","","",""],
    ["","","","",""],
]

export const generateWordSet = async ()=>{
    let wordSet;
    let todaysWord;
    let reswordArr;
    await fetch(wordBank)
    .then((response)=>response.text())
    .then((result)=>{
        const wordArr = result.split("\n");
        const sz=wordArr.length;
        for(let i=0;i<sz;i++){
            wordArr[i] = wordArr[i].substring(0,5);
        }

        // finding the word of the day
        todaysWord = wordArr[Math.floor(Math.random()*sz)]
        reswordArr=wordArr;
        wordSet=new Set(wordArr);
    })

    return {wordSet,todaysWord,reswordArr}
}