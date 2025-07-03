export const codeExamples = {
  javascript: [
    {
      title: "Fibonacci Function",
      description: "Classic recursive implementation with optimization opportunities",
      difficulty: "Beginner",
      language: "javascript",
      code: `function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// This could be optimized with memoization
console.log(fibonacci(10));`
    },
    {
      title: "Array Processing",
      description: "Common array operations with potential improvements",
      difficulty: "Intermediate",
      language: "javascript",
      code: `var users = [
  { name: "John", age: 25 },
  { name: "Jane", age: 30 },
  { name: "Bob", age: 35 }
];

function getAdultUsers(users) {
  var adults = [];
  for (var i = 0; i < users.length; i++) {
    if (users[i].age >= 18) {
      adults.push(users[i]);
    }
  }
  return adults;
}

console.log(getAdultUsers(users));`
    },
    {
      title: "Promise Chain",
      description: "Async operations that could use modern async/await",
      difficulty: "Advanced",
      language: "javascript",
      code: `function fetchUserData(userId) {
  return fetch('/api/users/' + userId)
    .then(function(response) {
      return response.json();
    })
    .then(function(user) {
      return fetch('/api/posts/' + user.id);
    })
    .then(function(response) {
      return response.json();
    })
    .catch(function(error) {
      console.log('Error:', error);
    });
}`
    }
  ],
  python: [
    {
      title: "List Comprehension",
      description: "Basic list processing with room for optimization",
      difficulty: "Beginner",
      language: "python",
      code: `numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

def get_even_squares(numbers):
    result = []
    for num in numbers:
        if num % 2 == 0:
            result.append(num ** 2)
    return result

print(get_even_squares(numbers))`
    },
    {
      title: "Exception Handling",
      description: "Error handling that could be more specific",
      difficulty: "Intermediate",
      language: "python",
      code: `def divide_numbers(a, b):
    try:
        result = a / b
        print(f"Result: {result}")
        return result
    except:
        print("An error occurred")
        return None

# Test the function
divide_numbers(10, 0)
divide_numbers(10, 2)`
    }
  ],
  typescript: [
    {
      title: "Type Safety Issues",
      description: "TypeScript code with potential type improvements",
      difficulty: "Intermediate",
      language: "typescript",
      code: `interface User {
  id: number;
  name: string;
  email?: string;
}

function processUser(user: any): any {
  if (user.name) {
    return {
      id: user.id,
      displayName: user.name.toUpperCase(),
      hasEmail: !!user.email
    };
  }
  return null;
}

const users: User[] = [
  { id: 1, name: "John" },
  { id: 2, name: "Jane", email: "jane@example.com" }
];

users.forEach(user => {
  console.log(processUser(user));
});`
    }
  ],
  java: [
    {
      title: "ArrayList Operations",
      description: "Java collection usage with potential optimizations",
      difficulty: "Beginner",
      language: "java",
      code: `import java.util.*;

public class UserManager {
    private ArrayList<String> users;
    
    public UserManager() {
        users = new ArrayList<String>();
    }
    
    public void addUser(String name) {
        if (name != null) {
            users.add(name);
        }
    }
    
    public String findUser(String name) {
        for (int i = 0; i < users.size(); i++) {
            if (users.get(i).equals(name)) {
                return users.get(i);
            }
        }
        return null;
    }
}`
    }
  ],
  cpp: [
    {
      title: "Memory Management",
      description: "C++ code with potential memory issues",
      difficulty: "Advanced",
      language: "cpp",
      code: `#include <iostream>
#include <vector>

class DataProcessor {
private:
    int* data;
    int size;
    
public:
    DataProcessor(int s) {
        size = s;
        data = new int[size];
    }
    
    void processData() {
        for (int i = 0; i < size; i++) {
            data[i] = i * 2;
        }
    }
    
    void printData() {
        for (int i = 0; i < size; i++) {
            std::cout << data[i] << " ";
        }
    }
};`
    }
  ],
  go: [
    {
      title: "Error Handling",
      description: "Go code with basic error handling patterns",
      difficulty: "Intermediate",
      language: "go",
      code: `package main

import (
    "fmt"
    "strconv"
)

func processNumbers(input []string) []int {
    var result []int
    
    for _, str := range input {
        num, err := strconv.Atoi(str)
        if err != nil {
            fmt.Println("Error converting:", str)
            continue
        }
        result = append(result, num*2)
    }
    
    return result
}

func main() {
    inputs := []string{"1", "2", "abc", "4"}
    numbers := processNumbers(inputs)
    fmt.Println(numbers)
}`
    }
  ],
  rust: [
    {
      title: "Ownership and Borrowing",
      description: "Rust code demonstrating ownership concepts",
      difficulty: "Advanced",
      language: "rust",
      code: `fn main() {
    let mut numbers = vec![1, 2, 3, 4, 5];
    
    let doubled = double_numbers(&mut numbers);
    println!("Original: {:?}", numbers);
    println!("Doubled: {:?}", doubled);
}

fn double_numbers(nums: &mut Vec<i32>) -> Vec<i32> {
    let mut result = Vec::new();
    
    for num in nums.iter() {
        result.push(num * 2);
    }
    
    result
}`
    }
  ]
};