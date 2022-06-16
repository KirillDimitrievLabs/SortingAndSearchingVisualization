// Simple wait function
// the longer the array, the faster the animation
async function wait(arrayLength) {
    await new Promise((resolve) =>
        setTimeout(() => {
            resolve();
        }, 400 / arrayLength)
    );
}

function swapNums(tempArray, firstIndex, SecondIndex) {
    let temp = tempArray[firstIndex];
    tempArray[firstIndex] = tempArray[SecondIndex];
    tempArray[SecondIndex] = temp;
}

//swap inner values of html elems 
function swapElems(tempArray, firstIndex, SecondIndex) {
    let temp = tempArray[firstIndex].innerHTML;
    tempArray[firstIndex].innerHTML = tempArray[SecondIndex].innerHTML;
    tempArray[SecondIndex].innerHTML = temp;
}

//simple bubbleSort
async function bubbleSort(array) {
    //copy array
    let temp = array.slice();

    let htmlElemsArray = document.getElementsByClassName("array");

    for (let i = 0; i < temp.length - 1; i++) {
        for (let j = 0; j < temp.length - i - 1; j++) {
            // Color 2 neighbours with red
            htmlElemsArray[j].style.backgroundColor = "red";
            htmlElemsArray[j + 1].style.backgroundColor = "red";
            await wait(temp.length);
            if(temp[j] > temp[j+1]) {
                swapNums(temp, j, j+1);
                swapElems(htmlElemsArray, j,j+1);
            }
            await wait(temp.length);
            htmlElemsArray[j].style.backgroundColor = "cyan";
            htmlElemsArray[j + 1].style.backgroundColor = "cyan";
        }
    }
    return temp;
}


export function getSort(array){
    let tempArray = array.slice();
    tempArray = bubbleSort(tempArray);
    return tempArray;
}


