// Function to calculate the minimum possible absolute difference
function minimumAbsoluteDifference(nums) {
    const n = nums.length / 2;
    let minDiff = Infinity;
  
    // Recursive function to generate all possible partitions
    function generatePartitions(index, arr1, arr2) {
      if (index === nums.length) {
        // Calculate the absolute difference between the sums
        const diff = Math.abs(arr1.reduce((a, b) => a + b, 0) - arr2.reduce((a, b) => a + b, 0));
        minDiff = Math.min(minDiff, diff);
        return;
      }
  
      // Place the current number in the first array if its length is less than n
      if (arr1.length < n) {
        arr1.push(nums[index]);
        generatePartitions(index + 1, arr1, arr2);
        arr1.pop();
      }
  
      // Place the current number in the second array if its length is less than n
      if (arr2.length < n) {
        arr2.push(nums[index]);
        generatePartitions(index + 1, arr1, arr2);
        arr2.pop();
      }
    }
  
    // Start generating partitions
    generatePartitions(0, [], []);
  
    return minDiff;
  }
  
  // Unit tests
  // Test case 1
  console.log(minimumAbsoluteDifference([3, 9, 7, 3])); // Output: 2

  // Test case 2
  console.log(minimumAbsoluteDifference([-36, 36])); // Output: 72

  // Test case 3
  console.log(minimumAbsoluteDifference([2, -1, 0, 4, -2, -9])); // Output: 0
  