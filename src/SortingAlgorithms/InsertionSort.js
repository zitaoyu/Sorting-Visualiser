/**
 * Perform insertion sort then return animation array.
 * @param {*} mainArray the main array.
 * @returns animation array.
 */
export function getInsertionSortAnimation(mainArray) {
  const animations = [];
  insertionSort(mainArray, animations);
  return animations;
}

/**
 * Perform insertion sort algorithm on the main array.
 * 
 * Animation array format: 
 * [bar one index, bar one new height, bar two index, bar two new height, swap(boolean), color(String)]
 * 
 * @param {*} mainArray the main array.
 * @param {*} animations the animation array.
 */
function insertionSort(mainArray, animations) {
  let i, j, current;

  for(i = 1; i < mainArray.length; i++) {
    j = i - 1;
    current = mainArray[i];

    animations.push([i, null, j, null, false, 'compare']);
    animations.push([i, null, j, null, false, 'default']);

    while(j >= 0 && mainArray[j] > current) {
      if (j < i - 1) {
        // if swap more than 2 times then add compare animation
        animations.push([j + 1, null, j, null, false, 'compare']);
        animations.push([j + 1, null, j, null, false, 'default']);
      }
      animations.push([j + 1, mainArray[j], j, current, true, null]);
      mainArray[j + 1] = mainArray[j];
      j--;
    }

    if (j === i - 1) {
      animations.push([i, null, j, null, false, null]);
    }
    mainArray[j + 1] = current;
  }
}