/**
 * Perform merge sort then return animation array.
 * @param {*} mainArray the main array.
 * @returns animation array.
 */
export function getMergeSortAnimation(mainArray){
  const animations = [];
  if (mainArray.length <= 1) return mainArray;
  const tempArray = mainArray.slice();
  sort(mainArray, 0, mainArray.length - 1, tempArray, animations);
  return animations;
}

/**
 * Merge sort helper 1, divided main array into two small arrays and then merge them recurisvely.
 * @param {*} mainArray the main array.
 * @param {*} left the left index.
 * @param {*} right the right index.
 * @param {*} tempArray the dummy array.
 * @param {*} animations the animation array.
 */
function sort(mainArray, left, right, tempArray, animations){
  if(left < right){
    let middle = Math.floor((left + right) / 2);
    sort(tempArray, left, middle, mainArray, animations);
    sort(tempArray, middle + 1, right, mainArray, animations);
    merge(mainArray, left, middle, right, tempArray, animations);
  }
}

/**
 * Merge sort helper funtion 2, merge two arrays at the given indexs at the main array 
 * and add animation to the animation array.
 * 
 * Animation array format: 
 * [bar one index, bar one new height, bar two index, bar two new height, swap(boolean), color(String)]
 * 
 * @param {*} mainArray the main array.
 * @param {*} left left index.
 * @param {*} middle middle index.
 * @param {*} right right index.
 * @param {*} tempArray the dummy array.
 * @param {*} animations the animation array.
 */
function merge(mainArray, left, middle, right, tempArray, animations){
  let i = left;
  let j = middle + 1;
  let k = left;
  
  while(i <= middle && j <= right){
    animations.push([i, null, j, null, false, 'compare']);
    animations.push([i, null, j, null, false, 'default']);

    if(tempArray[i] <= tempArray[j]){
      animations.push([k, tempArray[i], null, null, true, null]);
      mainArray[k++] = tempArray[i++];
    } else {
      animations.push([k, tempArray[j], null, null, true, null]);
      mainArray[k++] = tempArray[j++];
    }
  }
  while(i <= middle) {
    animations.push([i, null, i, null, false, 'compare']);
    animations.push([i, null, i, null, false, 'default']);

    animations.push([k, tempArray[i], null, null, true, null]);
    mainArray[k++] = tempArray[i++];
  }
  while(j <= right) {
    animations.push([j, null, j, null, false, 'compare']);
    animations.push([j, null, j, null, false, 'default']);

    animations.push([k, tempArray[j], null, null, true, null])
    mainArray[k++] = tempArray[j++];
  }
}  