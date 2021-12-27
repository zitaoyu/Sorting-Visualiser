/**
 * Perform heap sort then return animation array.
 * @param {*} mainArray the main array.
 * @returns animation array.
 */
export function getHeapSortAnimation(mainArray) {
  const animations = [];
  heapSort(mainArray, animations);
  return animations;
}

/**
 * Perform heap sort algorithm on the main array.
 * 
 * Animation array format: 
 * [bar one index, bar one new height, bar two index, bar two new height, swap(boolean), color(String)]
 * 
 * @param {*} mainArray the main array.
 * @param {*} animations the animation array.
 */
function heapSort(mainArray, animations) {
  const n = mainArray.length;
  for(let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(mainArray, n, i, animations);
  }
  for(let i = n - 1; i > 0; i--) {
    const temp = mainArray[0];
    mainArray[0] = mainArray[i];
    mainArray[i] = temp;
    animations.push([0, null, i, null, false, 'compare']);
    animations.push([0, null, i, null, false, 'default']);
    animations.push([0, mainArray[0], i, mainArray[i], true, null]);
    
    heapify(mainArray, i, 0, animations);
  }
}

/**
 * Move the largest node to the root, if moved adjust the nodes below it.
 * @param {*} mainArray the main array.
 * @param {*} length the length of the array.
 * @param {*} index the index of the root.
 * @param {*} animations the animation array.
 */
function heapify(mainArray, length, index, animations) {
  let largestIndex = index;
  const leftNodeIndex  = 2 * index + 1;
  const rightNodeIndex = 2 * index + 2;

  if(leftNodeIndex < length && mainArray[leftNodeIndex] > mainArray[largestIndex]) {
    largestIndex = leftNodeIndex;
  }

  if(rightNodeIndex < length && mainArray[rightNodeIndex] > mainArray[largestIndex]) {
    largestIndex = rightNodeIndex;
  }

  if(largestIndex !== index) {
    animations.push([index, null, largestIndex, null, false, 'compare']);
    animations.push([index, null, largestIndex, null, false, 'default']);
    
    const temp = mainArray[index];
    mainArray[index] = mainArray[largestIndex];
    mainArray[largestIndex] = temp;

    animations.push([index, mainArray[index], largestIndex, mainArray[largestIndex], true, null]);
    heapify(mainArray, length, largestIndex, animations);
  }
}