import React from "react";
import { getMergeSortAnimation } from '../SortingAlgorithms/MergeSort.js';
import { getBubbleSortAnimation } from "../SortingAlgorithms/BubbleSort.js";
import { getQuickSortAnimation } from "../SortingAlgorithms/QuickSort.js";
import { getHeapSortAnimation } from "../SortingAlgorithms/HeapSort.js";
import { getInsertionSortAnimation } from "../SortingAlgorithms/InsertionSort.js";
import './SortingVisualizer.css';

/** The number of bars this sorting visualizer will generate. */
//const NUMBER_OF_BARS = 100;

/** The default color of the bars. */
const DEFAULT_COLOR = 'cornflowerblue';

/** The color of the bars when its being compared. */
const COMPARE_COLOR = 'red';

/** The color of the bars when its at the correct postion. */
const CORRECT_COLOR = 'lime';

/** The default speed of the animation in millisecond. */
const DEFAULT_SPEED_MS = 20;

/** The default array size. */
const DEFAULT_ARRAY_SIZE = 50;

export default class SortingVisualizer extends React.Component {
  /**
   * Constructor.
   */
  constructor(props){
    super(props);
      this.state = {
        array: [],
        size: DEFAULT_ARRAY_SIZE,
        sortingSpeedMS: DEFAULT_SPEED_MS,
        isSorting: false,
      };

      this.handleArraySizeChange = this.handleArraySizeChange.bind(this);
      this.handleSpeedChange = this.handleSpeedChange.bind(this);
  }

  /**
   * Generate a new array when this compoent initialized.
   */
  componentDidMount(){
    this.resetArray();
  }

  /**
   * Generate a new array.
   */
  resetArray(){
    const array = [];
    for(let i = 0; i < this.state.size; i++){
      array.push(randomIntFromInterval(5, 500));
      }
    this.setState({array});
  }

  /**
   * Perform merge sort.
   */
  mergeSort() {
    // disable buttons
    this.turnButtons();
    const animations = getMergeSortAnimation(this.state.array);
    this.playSortingAnimation(animations);
  }

  /**
   * Perform bubble sort.
   */
  bubbleSort() {
    this.turnButtons();
    const animations = getBubbleSortAnimation(this.state.array);
    this.playSortingAnimation(animations);
  }

  /**
   * Perform quick sort.
   */
  quickSort() {
    this.turnButtons();
    const animations = getQuickSortAnimation(this.state.array);
    this.playSortingAnimation(animations);
  }

  /**
   * Perform heap sort.
   */
  heapSort() {
    this.turnButtons();
    const animations = getHeapSortAnimation(this.state.array);
    this.playSortingAnimation(animations);
  }

  /**
   * Perform insertion sort.
   */
  insertionSort() {
    this.turnButtons();
    const animations = getInsertionSortAnimation(this.state.array);
    this.playSortingAnimation(animations);
  }

  /**
   * Play sorting animation with given array by changing the color and height of the array bar.
   * 
   * Animation array format: 
   * [bar one index, bar one new height, bar two index, bar two new height, swap(boolean), color(String)]
   * 
   * @param {*} animations the animations array.
   */
  playSortingAnimation(animations) {
    for(let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const [barOneIdx, barOneNewHeight, barTwoIdx, barTwoNewHeight, isSwap, color] = animations[i];

      if (!isSwap && (color === 'default' || color === 'compare')) {
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        let newColor = COMPARE_COLOR;
        if (color === 'default') {
          newColor = DEFAULT_COLOR;
        }
        setTimeout(() => {
          barOneStyle.backgroundColor = newColor;
          barTwoStyle.backgroundColor = newColor;
        }, i * this.state.sortingSpeedMS);
      } else {
        if (isSwap) {
          setTimeout(() => {
            if (barOneNewHeight != null) {
              const barOneStyle = arrayBars[barOneIdx].style;
              barOneStyle.height = `${barOneNewHeight}px`;
            }
            if (barTwoNewHeight != null) {
              const barTwoStyle = arrayBars[barTwoIdx].style;
              barTwoStyle.height = `${barTwoNewHeight}px`;
            }
          }, i * this.state.sortingSpeedMS);
        }
      }
      // turn buttons back on
      if (i === animations.length - 1) {
        this.playCompleteAnimation(i * this.state.sortingSpeedMS);
        setTimeout(() => {
        this.turnButtons();
        }, i * this.state.sortingSpeedMS + 500);
      } 
    }
  }

  /**
   * Play sorting completion animation with given delay time.
   * @param {*} delay the delay time.
   */
  playCompleteAnimation(delay) {
    setTimeout(() => {
      const arrayBars = document.getElementsByClassName('array-bar');
      for(let i = 0; i < arrayBars.length; i++) {
        const style = arrayBars[i].style;
        style.backgroundColor = CORRECT_COLOR;
      }
    }, delay);
    setTimeout(() => {
      const arrayBars = document.getElementsByClassName('array-bar');
      for(let i = 0; i < arrayBars.length; i++) {
        const style = arrayBars[i].style;
        style.backgroundColor = DEFAULT_COLOR;
      }
    }, delay + 500);
  }

  /**
   * Updates the array size.
   * @param {*} e the event.
   */
  handleArraySizeChange(e) {
    this.setState({size: e.target.value});
    // we want to reset array after size is updated.
    setTimeout(() => {
      this.resetArray();
    }, 1);
  }

  /**
   * Updates the sorting speed.
   * @param {*} e the event.
   */
  handleSpeedChange(e) {
    let newSpeed = DEFAULT_SPEED_MS / e.target.value;
    this.setState({sortingSpeedMS: newSpeed});
  }

  render() {
    const {array} = this.state;

    return (
      <div>
        <h1 className='title'>Sorting Visualizer</h1>
        <div className='center-container'>  
          <div className="array-container">
            <div className="invicible-array-bar"></div>
            {array.map((value, idx) => (
              <div 
              className="array-bar" key={idx} 
              style={{backgroundColor: DEFAULT_COLOR, height: `${value}px`}}>
              </div>
            ))}

          </div>
          <div className="button-bar">
            <span className="text">Adjust Array Size: </span>
            <input className="slider" id="sizeSlider" type="range" min="5" max="100" step="1"
              defaultValue={DEFAULT_ARRAY_SIZE} 
              onChange={this.handleArraySizeChange}/>
            <span className="text">Adjust Sorting Speed: </span>
            <input className="slider" id="speedSlider" type="range" min="1" max="4" step="1"
              defaultValue="1" 
              onChange={this.handleSpeedChange} />
            <button className="button" disabled={false} onClick={() => this.resetArray()}>Generate New Array</button>
          </div>

          <div className="button-bar">
            <button className="button" disabled={false} onClick={() => this.mergeSort()}>Merge Sort</button>
            <button className="button" disabled={false} onClick={() => this.bubbleSort()}>Bubble Sort</button>
            <button className="button" disabled={false} onClick={() => this.quickSort()}>Quick Sort</button>
            <button className="button" disabled={false} onClick={() => this.heapSort()}>Heap Sort</button>
            <button className="button" disabled={false} onClick={() => this.insertionSort()}>Insertion Sort</button>
          </div>
          
          <span className="info">Array size: {this.state.size} &nbsp; &nbsp; Speed: x{20/this.state.sortingSpeedMS}</span>

        </div>
      </div>
    );
  }

  /**
   * Turn all button on or off.
   */
  turnButtons(){
      const buttons = document.getElementsByClassName('button');
      for(let i = 0; i < buttons.length; i++){
          buttons[i].disabled = !buttons[i].disabled;
      }
      const sliders = document.getElementsByClassName('slider');
      for(let i = 0; i < sliders.length; i++){
          sliders[i].disabled = !sliders[i].disabled;
      }
  }

  // NOTE: This method will only work if your sorting algorithms actually return
  // the sorted arrays; if they return the animations (as they currently do), then
  // this method will be broken.
  testSortingAlgorithms() {
    for (let i = 0; i < 100; i++) {
      const array = [];
      const length = randomIntFromInterval(1, 1000);
      for (let i = 0; i < length; i++) {
        array.push(randomIntFromInterval(-1000, 1000));
      }
      const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
      const sortedArray = getInsertionSortAnimation(array.slice());
      console.log(arraysAreEqual(javaScriptSortedArray, sortedArray));
    }
  }
}

/**
 * Genrenate a integer with given interval.
 * From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
 * 
 * @param {*} min minimum of the interval.
 * @param {*} max maximum of the interval.
 * @returns a random integer.
 */
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * Check if the given two arrays have the same values.
 * @param {*} arrayOne  the first array.
 * @param {*} arrayTwo  the second array.
 * @returns whether the given two arrays have the same values.
 */
function arraysAreEqual(arrayOne, arrayTwo) {
  if (arrayOne.length !== arrayTwo.length) return false;
    for (let i = 0; i < arrayOne.length; i++) {
      if (arrayOne[i] !== arrayTwo[i]) {
        return false;
      }
    }
  return true;
}