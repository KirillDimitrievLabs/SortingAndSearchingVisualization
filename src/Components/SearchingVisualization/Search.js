// Simple wait function
// the longer the array, the faster the animation
async function wait(arrayLength) {
    await new Promise((resolve) =>
        setTimeout(() => {
            resolve();
        }, 1500 / arrayLength)
    );
}

function resetElems(elems) {
    for (let i = 0; i < elems.length; i++) {
        elems[i].style.backgroundColor = "cyan";
    }
}

function paintElem(elemsList, blockIndex, color) {
    elemsList[blockIndex].style.backgroundColor = color;
}

// BinarySearch
export async function getSearch(sortedArray, key) {
    let startIndex = 0;
    let endIndex = sortedArray.length - 1;

    let elems = document.getElementsByClassName("array");

    resetElems(elems);

    while (startIndex <= endIndex) {
        // Find and set new middleIndex
        let middleIndex = Math.floor((startIndex + endIndex) / 2);
        paintElem(elems, startIndex, "violet");
        paintElem(elems, endIndex, "violet");
        paintElem(elems, middleIndex, "red");
        await wait(sortedArray.length);

        // If middle elem equals desired number
        // paint it with green and
        // return index of the element
        if (sortedArray[middleIndex] === key) {
            paintElem(elems, middleIndex, "green");
            await wait(sortedArray.length);
            return middleIndex;
        // If middle elem bigger than desired number
        // paint old endIndex and middleIndex elems with default cyan color
        // then set new endIndex elem as (old middleIndex - 1)
        // and paint new endIndex elem with violet
        } else if (sortedArray[middleIndex] > key) {
            paintElem(elems, endIndex, "cyan");
            paintElem(elems, middleIndex, "cyan");
            endIndex = middleIndex - 1;
            paintElem(elems, endIndex, "violet");
            await wait(sortedArray.length);
        // If middle elem less than desired number
        // paint old startIndex and middleIndex elems with default cyan color
        // then set new startIndex elem as (old middleIndex - 1)
        // and paint new startIndex elem with violet
        } else {
            paintElem(elems, startIndex, "cyan");
            paintElem(elems, middleIndex, "cyan");

            startIndex = middleIndex + 1;
            paintElem(elems, startIndex, "violet");
            await wait(sortedArray.length);
        }
    }
    return -1;
}