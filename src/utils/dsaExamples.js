export const dsaExamples = {
  javascript: [
    // Arrays & Strings - Easy
    {
      title: "Two Sum",
      description: "Find two numbers in array that add up to target",
      difficulty: "Easy",
      category: "arrays",
      language: "javascript",
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      code: `function twoSum(nums, target) {
    var map = {};
    for (var i = 0; i < nums.length; i++) {
        var complement = target - nums[i];
        if (map[complement] !== undefined) {
            return [map[complement], i];
        }
        map[nums[i]] = i;
    }
    return [];
}

// Test case
console.log(twoSum([2, 7, 11, 15], 9)); // [0, 1]`
    },
    {
      title: "Valid Palindrome",
      description: "Check if string is a valid palindrome",
      difficulty: "Easy",
      category: "arrays",
      language: "javascript",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      code: `function isPalindrome(s) {
    var cleaned = s.toLowerCase().replace(/[^a-z0-9]/g, '');
    var left = 0;
    var right = cleaned.length - 1;
    
    while (left < right) {
        if (cleaned[left] !== cleaned[right]) {
            return false;
        }
        left++;
        right--;
    }
    return true;
}

console.log(isPalindrome("A man, a plan, a canal: Panama")); // true`
    },
    
    // Arrays & Strings - Medium
    {
      title: "Longest Substring Without Repeating Characters",
      description: "Find length of longest substring without repeating characters",
      difficulty: "Medium",
      category: "arrays",
      language: "javascript",
      timeComplexity: "O(n)",
      spaceComplexity: "O(min(m,n))",
      code: `function lengthOfLongestSubstring(s) {
    var charMap = {};
    var left = 0;
    var maxLength = 0;
    
    for (var right = 0; right < s.length; right++) {
        if (charMap[s[right]] >= left) {
            left = charMap[s[right]] + 1;
        }
        charMap[s[right]] = right;
        maxLength = Math.max(maxLength, right - left + 1);
    }
    
    return maxLength;
}

console.log(lengthOfLongestSubstring("abcabcbb")); // 3`
    },
    {
      title: "Group Anagrams",
      description: "Group strings that are anagrams of each other",
      difficulty: "Medium",
      category: "arrays",
      language: "javascript",
      timeComplexity: "O(n*k*log(k))",
      spaceComplexity: "O(n*k)",
      code: `function groupAnagrams(strs) {
    var map = {};
    
    for (var i = 0; i < strs.length; i++) {
        var sorted = strs[i].split('').sort().join('');
        if (!map[sorted]) {
            map[sorted] = [];
        }
        map[sorted].push(strs[i]);
    }
    
    return Object.values(map);
}

console.log(groupAnagrams(["eat","tea","tan","ate","nat","bat"]));`
    },

    // Linked Lists - Easy
    {
      title: "Reverse Linked List",
      description: "Reverse a singly linked list",
      difficulty: "Easy",
      category: "linkedlist",
      language: "javascript",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      code: `function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val);
    this.next = (next===undefined ? null : next);
}

function reverseList(head) {
    var prev = null;
    var current = head;
    
    while (current !== null) {
        var nextTemp = current.next;
        current.next = prev;
        prev = current;
        current = nextTemp;
    }
    
    return prev;
}

// Test with linked list: 1->2->3->4->5
var head = new ListNode(1, new ListNode(2, new ListNode(3)));
console.log(reverseList(head));`
    },

    // Trees - Easy
    {
      title: "Maximum Depth of Binary Tree",
      description: "Find the maximum depth of a binary tree",
      difficulty: "Easy",
      category: "trees",
      language: "javascript",
      timeComplexity: "O(n)",
      spaceComplexity: "O(h)",
      code: `function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val);
    this.left = (left===undefined ? null : left);
    this.right = (right===undefined ? null : right);
}

function maxDepth(root) {
    if (root === null) {
        return 0;
    }
    
    var leftDepth = maxDepth(root.left);
    var rightDepth = maxDepth(root.right);
    
    return Math.max(leftDepth, rightDepth) + 1;
}

// Test tree
var root = new TreeNode(3, new TreeNode(9), new TreeNode(20, new TreeNode(15), new TreeNode(7)));
console.log(maxDepth(root)); // 3`
    },

    // Sorting - Medium
    {
      title: "Merge Sort Implementation",
      description: "Implement merge sort algorithm",
      difficulty: "Medium",
      category: "sorting",
      language: "javascript",
      timeComplexity: "O(n log n)",
      spaceComplexity: "O(n)",
      code: `function mergeSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }
    
    var mid = Math.floor(arr.length / 2);
    var left = mergeSort(arr.slice(0, mid));
    var right = mergeSort(arr.slice(mid));
    
    return merge(left, right);
}

function merge(left, right) {
    var result = [];
    var i = 0, j = 0;
    
    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            result.push(left[i]);
            i++;
        } else {
            result.push(right[j]);
            j++;
        }
    }
    
    return result.concat(left.slice(i)).concat(right.slice(j));
}

console.log(mergeSort([64, 34, 25, 12, 22, 11, 90]));`
    },

    // Dynamic Programming - Medium
    {
      title: "Fibonacci with Memoization",
      description: "Optimize fibonacci using dynamic programming",
      difficulty: "Medium",
      category: "dp",
      language: "javascript",
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      code: `function fibonacci(n, memo = {}) {
    if (n in memo) {
        return memo[n];
    }
    
    if (n <= 1) {
        return n;
    }
    
    memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
    return memo[n];
}

// Bottom-up approach
function fibonacciDP(n) {
    if (n <= 1) return n;
    
    var dp = [0, 1];
    for (var i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    return dp[n];
}

console.log(fibonacci(10)); // 55
console.log(fibonacciDP(10)); // 55`
    },

    // Backtracking - Hard
    {
      title: "N-Queens Problem",
      description: "Place N queens on NxN chessboard so none attack each other",
      difficulty: "Hard",
      category: "backtracking",
      language: "javascript",
      timeComplexity: "O(N!)",
      spaceComplexity: "O(N²)",
      code: `function solveNQueens(n) {
    var result = [];
    var board = Array(n).fill().map(() => Array(n).fill('.'));
    
    function isValid(row, col) {
        // Check column
        for (var i = 0; i < row; i++) {
            if (board[i][col] === 'Q') return false;
        }
        
        // Check diagonal
        for (var i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
            if (board[i][j] === 'Q') return false;
        }
        
        for (var i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
            if (board[i][j] === 'Q') return false;
        }
        
        return true;
    }
    
    function backtrack(row) {
        if (row === n) {
            result.push(board.map(row => row.join('')));
            return;
        }
        
        for (var col = 0; col < n; col++) {
            if (isValid(row, col)) {
                board[row][col] = 'Q';
                backtrack(row + 1);
                board[row][col] = '.';
            }
        }
    }
    
    backtrack(0);
    return result;
}

console.log(solveNQueens(4));`
    }
  ],

  python: [
    // Arrays & Strings - Easy
    {
      title: "Two Sum",
      description: "Find two numbers in array that add up to target",
      difficulty: "Easy",
      category: "arrays",
      language: "python",
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      code: `def two_sum(nums, target):
    num_map = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in num_map:
            return [num_map[complement], i]
        num_map[num] = i
    return []

# Test case
print(two_sum([2, 7, 11, 15], 9))  # [0, 1]`
    },
    {
      title: "Valid Palindrome",
      description: "Check if string is a valid palindrome",
      difficulty: "Easy",
      category: "arrays",
      language: "python",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      code: `def is_palindrome(s):
    cleaned = ''.join(char.lower() for char in s if char.isalnum())
    left, right = 0, len(cleaned) - 1
    
    while left < right:
        if cleaned[left] != cleaned[right]:
            return False
        left += 1
        right -= 1
    
    return True

print(is_palindrome("A man, a plan, a canal: Panama"))  # True`
    },

    // Binary Search - Medium
    {
      title: "Binary Search Implementation",
      description: "Implement binary search algorithm",
      difficulty: "Medium",
      category: "sorting",
      language: "python",
      timeComplexity: "O(log n)",
      spaceComplexity: "O(1)",
      code: `def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = (left + right) // 2
        
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return -1

# Recursive version
def binary_search_recursive(arr, target, left=0, right=None):
    if right is None:
        right = len(arr) - 1
    
    if left > right:
        return -1
    
    mid = (left + right) // 2
    
    if arr[mid] == target:
        return mid
    elif arr[mid] < target:
        return binary_search_recursive(arr, target, mid + 1, right)
    else:
        return binary_search_recursive(arr, target, left, mid - 1)

arr = [1, 3, 5, 7, 9, 11, 13, 15]
print(binary_search(arr, 7))  # 3`
    },

    // Dynamic Programming - Hard
    {
      title: "Longest Common Subsequence",
      description: "Find length of longest common subsequence",
      difficulty: "Hard",
      category: "dp",
      language: "python",
      timeComplexity: "O(m*n)",
      spaceComplexity: "O(m*n)",
      code: `def longest_common_subsequence(text1, text2):
    m, n = len(text1), len(text2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if text1[i-1] == text2[j-1]:
                dp[i][j] = dp[i-1][j-1] + 1
            else:
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])
    
    return dp[m][n]

# Space optimized version
def lcs_optimized(text1, text2):
    m, n = len(text1), len(text2)
    prev = [0] * (n + 1)
    curr = [0] * (n + 1)
    
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if text1[i-1] == text2[j-1]:
                curr[j] = prev[j-1] + 1
            else:
                curr[j] = max(prev[j], curr[j-1])
        prev, curr = curr, prev
    
    return prev[n]

print(longest_common_subsequence("abcde", "ace"))  # 3`
    }
  ],

  java: [
    {
      title: "Two Sum",
      description: "Find two numbers in array that add up to target",
      difficulty: "Easy",
      category: "arrays",
      language: "java",
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      code: `import java.util.*;

public class Solution {
    public int[] twoSum(int[] nums, int target) {
        HashMap<Integer, Integer> map = new HashMap<>();
        
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[]{map.get(complement), i};
            }
            map.put(nums[i], i);
        }
        
        return new int[]{};
    }
    
    public static void main(String[] args) {
        Solution sol = new Solution();
        int[] result = sol.twoSum(new int[]{2, 7, 11, 15}, 9);
        System.out.println(Arrays.toString(result)); // [0, 1]
    }
}`
    },
    {
      title: "Quick Sort Implementation",
      description: "Implement quick sort algorithm",
      difficulty: "Medium",
      category: "sorting",
      language: "java",
      timeComplexity: "O(n log n)",
      spaceComplexity: "O(log n)",
      code: `public class QuickSort {
    public void quickSort(int[] arr, int low, int high) {
        if (low < high) {
            int pi = partition(arr, low, high);
            quickSort(arr, low, pi - 1);
            quickSort(arr, pi + 1, high);
        }
    }
    
    private int partition(int[] arr, int low, int high) {
        int pivot = arr[high];
        int i = low - 1;
        
        for (int j = low; j < high; j++) {
            if (arr[j] <= pivot) {
                i++;
                swap(arr, i, j);
            }
        }
        
        swap(arr, i + 1, high);
        return i + 1;
    }
    
    private void swap(int[] arr, int i, int j) {
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    
    public static void main(String[] args) {
        QuickSort qs = new QuickSort();
        int[] arr = {64, 34, 25, 12, 22, 11, 90};
        qs.quickSort(arr, 0, arr.length - 1);
        System.out.println(Arrays.toString(arr));
    }
}`
    }
  ],

  cpp: [
    {
      title: "Binary Tree Traversal",
      description: "Implement all three binary tree traversals",
      difficulty: "Medium",
      category: "trees",
      language: "cpp",
      timeComplexity: "O(n)",
      spaceComplexity: "O(h)",
      code: `#include <iostream>
#include <vector>
using namespace std;

struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

class Solution {
public:
    void inorderTraversal(TreeNode* root, vector<int>& result) {
        if (root == nullptr) return;
        
        inorderTraversal(root->left, result);
        result.push_back(root->val);
        inorderTraversal(root->right, result);
    }
    
    void preorderTraversal(TreeNode* root, vector<int>& result) {
        if (root == nullptr) return;
        
        result.push_back(root->val);
        preorderTraversal(root->left, result);
        preorderTraversal(root->right, result);
    }
    
    void postorderTraversal(TreeNode* root, vector<int>& result) {
        if (root == nullptr) return;
        
        postorderTraversal(root->left, result);
        postorderTraversal(root->right, result);
        result.push_back(root->val);
    }
};

int main() {
    TreeNode* root = new TreeNode(1);
    root->right = new TreeNode(2);
    root->right->left = new TreeNode(3);
    
    Solution sol;
    vector<int> inorder, preorder, postorder;
    
    sol.inorderTraversal(root, inorder);
    sol.preorderTraversal(root, preorder);
    sol.postorderTraversal(root, postorder);
    
    return 0;
}`
    }
  ],

  go: [
    {
      title: "Concurrent Prime Finder",
      description: "Find prime numbers using goroutines",
      difficulty: "Medium",
      category: "arrays",
      language: "go",
      timeComplexity: "O(n√n)",
      spaceComplexity: "O(1)",
      code: `package main

import (
    "fmt"
    "math"
    "sync"
)

func isPrime(n int) bool {
    if n < 2 {
        return false
    }
    for i := 2; i <= int(math.Sqrt(float64(n))); i++ {
        if n%i == 0 {
            return false
        }
    }
    return true
}

func findPrimes(start, end int, results chan<- int, wg *sync.WaitGroup) {
    defer wg.Done()
    
    for i := start; i <= end; i++ {
        if isPrime(i) {
            results <- i
        }
    }
}

func main() {
    const (
        start = 1
        end   = 100
        workers = 4
    )
    
    results := make(chan int, end-start+1)
    var wg sync.WaitGroup
    
    chunkSize := (end - start + 1) / workers
    
    for i := 0; i < workers; i++ {
        wg.Add(1)
        chunkStart := start + i*chunkSize
        chunkEnd := chunkStart + chunkSize - 1
        if i == workers-1 {
            chunkEnd = end
        }
        
        go findPrimes(chunkStart, chunkEnd, results, &wg)
    }
    
    go func() {
        wg.Wait()
        close(results)
    }()
    
    var primes []int
    for prime := range results {
        primes = append(primes, prime)
    }
    
    fmt.Printf("Found %d primes: %v\\n", len(primes), primes)
}`
    }
  ],

  rust: [
    {
      title: "Safe Binary Search",
      description: "Memory-safe binary search implementation",
      difficulty: "Medium",
      category: "sorting",
      language: "rust",
      timeComplexity: "O(log n)",
      spaceComplexity: "O(1)",
      code: `fn binary_search<T: Ord>(arr: &[T], target: &T) -> Option<usize> {
    let mut left = 0;
    let mut right = arr.len();
    
    while left < right {
        let mid = left + (right - left) / 2;
        
        match arr[mid].cmp(target) {
            std::cmp::Ordering::Equal => return Some(mid),
            std::cmp::Ordering::Less => left = mid + 1,
            std::cmp::Ordering::Greater => right = mid,
        }
    }
    
    None
}

fn binary_search_recursive<T: Ord>(
    arr: &[T], 
    target: &T, 
    left: usize, 
    right: usize
) -> Option<usize> {
    if left >= right {
        return None;
    }
    
    let mid = left + (right - left) / 2;
    
    match arr[mid].cmp(target) {
        std::cmp::Ordering::Equal => Some(mid),
        std::cmp::Ordering::Less => {
            binary_search_recursive(arr, target, mid + 1, right)
        }
        std::cmp::Ordering::Greater => {
            binary_search_recursive(arr, target, left, mid)
        }
    }
}

fn main() {
    let arr = vec![1, 3, 5, 7, 9, 11, 13, 15];
    
    match binary_search(&arr, &7) {
        Some(index) => println!("Found at index: {}", index),
        None => println!("Not found"),
    }
    
    match binary_search_recursive(&arr, &7, 0, arr.len()) {
        Some(index) => println!("Found at index: {}", index),
        None => println!("Not found"),
    }
}`
    }
  ]
};