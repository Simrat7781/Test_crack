// Mock code execution service
// Replace with Spring Boot + Docker-based execution when backend is ready
//
// IMPORTANT: This service simulates code execution with pre-defined outputs.
// No actual code is compiled or executed in the browser.
// Real execution will happen server-side inside isolated Docker containers.

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const MOCK_RESULTS = {
  success: {
    status: 'Accepted',
    runtime: '12ms',
    memory: '5.2 MB',
    output: '5\n',
    testCases: [
      { id: 1, input: '[2, 7, 11, 15], target = 9', expected: '[0, 1]', actual: '[0, 1]', passed: true, runtime: '4ms' },
      { id: 2, input: '[3, 2, 4], target = 6', expected: '[1, 2]', actual: '[1, 2]', passed: true, runtime: '3ms' },
      { id: 3, input: '[3, 3], target = 6', expected: '[0, 1]', actual: '[0, 1]', passed: true, runtime: '2ms' },
    ],
  },
  partial: {
    status: 'Wrong Answer',
    runtime: '15ms',
    memory: '5.4 MB',
    output: '[0, 1]\n',
    testCases: [
      { id: 1, input: '[2, 7, 11, 15], target = 9', expected: '[0, 1]', actual: '[0, 1]', passed: true, runtime: '4ms' },
      { id: 2, input: '[3, 2, 4], target = 6', expected: '[1, 2]', actual: '[1, 2]', passed: true, runtime: '5ms' },
      { id: 3, input: '[3, 3], target = 6', expected: '[0, 1]', actual: '[0, 2]', passed: false, runtime: '3ms' },
    ],
  },
  compileError: {
    status: 'Compilation Error',
    runtime: null,
    memory: null,
    output: null,
    error: "Line 5: error: ';' expected\n    int result = solution(nums, target)\n                                       ^",
    testCases: [],
  },
  runtimeError: {
    status: 'Runtime Error',
    runtime: '8ms',
    memory: '5.1 MB',
    output: null,
    error: 'Exception in thread "main" java.lang.ArrayIndexOutOfBoundsException: Index 5 out of bounds for length 4',
    testCases: [],
  },
};

export const codeService = {
  async runCode(code, language, testCases) {
    await delay(1500 + Math.random() * 1000);

    // Simulate different outcomes based on code content
    if (!code || code.trim().length < 10) {
      return MOCK_RESULTS.compileError;
    }

    // Simple heuristic: if code has common mistakes, return error
    if (code.includes('//error')) {
      return MOCK_RESULTS.runtimeError;
    }

    return {
      ...MOCK_RESULTS.success,
      output: 'Sample output for test case\n',
      testCases: (testCases || MOCK_RESULTS.success.testCases).map((tc, i) => ({
        ...tc,
        id: i + 1,
        passed: true,
        runtime: `${2 + Math.floor(Math.random() * 8)}ms`,
      })),
    };
  },

  async submitCode(code, language, problemId) {
    await delay(2500 + Math.random() * 1500);

    if (!code || code.trim().length < 10) {
      return MOCK_RESULTS.compileError;
    }

    // Randomly decide between success and partial for demo
    const rand = Math.random();
    if (rand > 0.3) {
      return {
        ...MOCK_RESULTS.success,
        submissionId: `sub_${Date.now()}`,
        submittedAt: new Date().toISOString(),
        totalTestCases: 15,
        passedTestCases: 15,
      };
    } else {
      return {
        ...MOCK_RESULTS.partial,
        submissionId: `sub_${Date.now()}`,
        submittedAt: new Date().toISOString(),
        totalTestCases: 15,
        passedTestCases: 12,
      };
    }
  },

  getDefaultCode(language) {
    const templates = {
      cpp: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    vector<int> solve(vector<int>& nums, int target) {
        // Write your solution here
        
        return {};
    }
};

int main() {
    // Read input
    int n, target;
    cin >> n >> target;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    
    Solution sol;
    vector<int> result = sol.solve(nums, target);
    for (int x : result) cout << x << " ";
    return 0;
}`,
      java: `import java.util.*;

public class Solution {
    public int[] solve(int[] nums, int target) {
        // Write your solution here
        
        return new int[]{};
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int target = sc.nextInt();
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();
        
        Solution sol = new Solution();
        int[] result = sol.solve(nums, target);
        System.out.println(Arrays.toString(result));
    }
}`,
      python: `class Solution:
    def solve(self, nums: list, target: int) -> list:
        # Write your solution here
        
        return []

if __name__ == "__main__":
    n, target = map(int, input().split())
    nums = list(map(int, input().split()))
    
    sol = Solution()
    result = sol.solve(nums, target)
    print(result)`,
    };
    return templates[language] || templates.cpp;
  },

  getSupportedLanguages() {
    return [
      { id: 'cpp', name: 'C++ 17', monacoLang: 'cpp' },
      { id: 'java', name: 'Java 17', monacoLang: 'java' },
      { id: 'python', name: 'Python 3.11', monacoLang: 'python' },
    ];
  },
};
