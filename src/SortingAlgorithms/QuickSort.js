/**
 * Perform quick sort then return animation array.
 * @param {*} mainArray the main array.
 * @returns animation array.
 */
export function getQuickSortAnimation(mainArray) {
  const animations = [];
  quickSort(mainArray, 0, mainArray.length - 1, animations);
  return animations;
}

/**
 * Perform quick sort sort algorithm on the main array.
 * 
 * Animation array format: 
 * [bar one index, bar one new height, bar two index, bar two new height, swap(boolean), color(String)]
 * 
 * @param {*} mainArray the main array.
 * @param {*} animations the animation array.
 */
function quickSort(mainArray, left, right, animations) {
  if (left < right) {
    let p = partition(mainArray, left, right, animations);
    quickSort(mainArray, left, p - 1, animations);
    quickSort(mainArray, p + 1, right, animations);
  }
}

/**
 * Partition helper method for quick sort. Take the last element of the range as pivot element, then move
 * it to the correct index, then return that index.
 * 
 * @param {*} mainArray the main array.
 * @param {*} left left index.
 * @param {*} right right  index.
 * @param {*} animations the animations array.
 * @returns the index that pivot moved to.
 */
function partition(mainArray, left, right, animations) {
  let pivot = mainArray[right];
  let i = left;

  for (let j = left; j < right; j++) {
    // compare animations
    animations.push([i, null, j, null, false, 'compare']);
    animations.push([i, null, j, null, false, 'default']);

    if (mainArray[j] < pivot) {
      // swap mainArray[i] and mainArray[j]
      let temp = mainArray[i];
      mainArray[i] = mainArray[j];
      mainArray[j] = temp;
      if (i < j) {
        // swap animation
        animations.push([i, mainArray[i], j, mainArray[j], true, null]);
      } else {
        // no animation
        animations.push([i, null, j, null, false, null]);
      }
      i++;
    }else {
      // no animation
      animations.push([i, null, j, null, false, null]);
    }
  }
  if (i < right) {
    // compare and swap animations 
    animations.push([i, null, right, null, false, 'compare']);
    animations.push([i, null, right, null, false, 'default']);

    mainArray[right] = mainArray[i];
    mainArray[i]= pivot;
    animations.push([i, mainArray[i], right, mainArray[right], true, null]);
  }
  return i;
}