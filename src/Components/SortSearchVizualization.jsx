import React, {useEffect, useState} from 'react';
import { getSort } from './SortingVisualization/Sort';
import { getSearch } from './SearchingVisualization/Search.js';


function SortSearchVizualization() {

    const [numListToSort, setNumListToSort] = useState([]);

    const [isResetBtn, setIsResetBtn] = useState(false);

    const [arrayLength, setArrayLength] = useState(10);

    let isSearching = false;
    let isSorting = false;
    let canResetArray = true;

    // componentDidMount analogue
    // rerender if arrayLength has been changed
    useEffect(() => {
        resetArray();
    }, [arrayLength]);


    const arrayLengthInputTextArea = (
        <>
            <p>Array length</p>
            {/* if canResetArray is true set new array Length*/}
            <textarea placeholder = 'input array length' value={arrayLength} onChange={event => 
                {if(canResetArray) {setArrayLength(event.target.value)}}
            }/>
        </>
        
    )

    const sortButton = (
        <button className='btn' id='btn' onClick={() => sort()}>
            sort
        </button>
    );

    const resetButton = (
        <button className='btn' id='btn'  onClick={() => resetArray()}>
            reset
        </button>
    );

    // Mapped array elems collection 
    let htmlElementsCollection = numListToSort.map((num, index) => {
        return(
            <p className="array" onClick={() => {search(num)}} key={index} >
                {num}
            </p>
        )
    });

    function resetArray() {
        // Fill array with new random values if
        // not searching or sorting
        if(!isSearching || !isSorting) {
            let array= [];
            for (let i = 0; i < arrayLength; i++) {
                array.push(Math.floor(Math.random() * (99999 - 1 ) + 1));
            }
            setNumListToSort(array);
            //change reset button state to false
            setIsResetBtn(false);
        }
    }

    function sort() {
        // While function is running we cannot run it again
        // If not sorting, sort array
        if(!isSorting) {
            new Promise(async (resolve) => {
                // Change canResetArray to false 
                // to prevent resetting the array while the function is running
                canResetArray = false;
                // Change sorting state to true
                // to prevent a function from being called before it completes
                isSorting = true;
                setNumListToSort(await getSort(numListToSort).then((result)=> {
                    return result;
                }));
                // Change state of the reset button to true
                setIsResetBtn(true)
                resolve();
            }).then(() => {
                // Change isSorting and canResetArray to default values
                isSorting = false;
                canResetArray = true;
            });
        }
        
    }

    function search(num){
        // While function is running we cannot run it again
        // If not sorting and not searching, sort number
        if(isResetBtn && !isSearching){
            new Promise(async (resolve) => {
                // Change canResetArray to false 
                // to prevent resetting the array while the function is running
                canResetArray = false;
                // Change searching state to true
                // to prevent a function from being called before it completes
                isSearching = true;
                await getSearch(numListToSort, num);
                resolve();
            }).then(() => {
                // Change isSearching and canResetArray to default values
                isSearching = false;
                canResetArray = true;
            });
        }
    }

    return(
        <div className='App'>
            <div className='elemsCollection'>
                {htmlElementsCollection}
            </div>
            <div className='footer'>
                {isResetBtn ?  resetButton : sortButton}
                {arrayLengthInputTextArea}
            </div>
        </div>
    );
}

export default SortSearchVizualization;

    