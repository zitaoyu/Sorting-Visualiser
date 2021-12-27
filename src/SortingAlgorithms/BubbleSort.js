/**
 * Perform bubble sort then return animation array.
 * @param {*} mainArray the main array.
 * @returns animation array.
 */
export function getBubbleSortAnimation(mainArray) {
  const animations = [];
  bubbleSort(mainArray, animations);
  return animations;
}

/**
 * Perform bubble sort algorithm on the main array.
 * 
 * Animation array format: 
 * [bar one index, bar one new height, bar two index, bar two new height, swap(boolean), color(String)]
 * 
 * @param {*} mainArray the main array.
 * @param {*} animations the animation array.
 */
function bubbleSort(mainArray, animations) {
  let hasIterationSwap = false;
  let n = mainArray.length - 1;

  for(let i = 0; i < n; i++) {
    hasIterationSwap = false;
    for(let j = 0; j < n - i; j++) {
      let swap = false;

      animations.push([j, null, j + 1, null, swap, 'compare']);
      animations.push([j, null, j + 1, null, swap, 'default']);

      if (mainArray[j] > mainArray[j + 1]) {
        let temp = mainArray[j];
        mainArray[j] = mainArray[j + 1];
        mainArray[j + 1] = temp;
        hasIterationSwap = true;
        swap = true;
      }
      animations.push([j, mainArray[j], j + 1, mainArray[j + 1], swap, null]);

    }
    if (!hasIterationSwap) break;
  }
}