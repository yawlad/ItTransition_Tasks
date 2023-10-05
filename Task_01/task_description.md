# Task 1

## Problem Description

You need to write a JavaScript code that prints the longest common substring of the passed arguments, with a trailing newline. The code will run under Node.js, and the arguments will be passed via the command line (you should not read the standard input stream).

If the longest common superstring is empty (no arguments are passed or arguments have no common substrings), you should print a single newline.

If there are multiple valid solutions, you can print any one of them.

### Limits

- Single string length is less than or equal to 256 characters.
- Number of strings is less than or equal to 64.
- Strings contain only English letters and digits.
- Time limit per test is 5 seconds.

### Output Requirements

- The output should not contain any excess characters.
- The solution is accepted if all tests are passed.
- The result is calculated based on JavaScript file size (smaller is better).
- Avoid comments, long names, and unnecessary indents.

### Constraints

- You cannot use any external packages or imports.
- You cannot access the external world, e.g., read files, open network connections, etc.
- Your solution should be placed in a file named `lcs.js`.
- Use only command-line arguments (no `readline`, `process.stdin`, etc.; ONLY `process.argv`).
- When called without arguments, your script should not fail.
- Do not share a Dropbox file; instead, send a public link with the long hex identifier.
- If some tests fail, your grade is zero.

### Examples

```shell
node lcs.js ABCDEFZ WBCDXYZ
# Output: BCD

node lcs.js 132 12332 12312
# Output: 1

node lcs.js ABCDEFGH ABCDEFG ABCEDF ABCED
# Output: ABC

node lcs.js ABCDEFGH ABCDEFG ABCDEF ABCDE
# Output: ABCDE

node lcs.js ABCDEFGH ABCDEFG ABCDEF ABCDE EDCBA
# Output: A

node lcs.js ABCDEFGH ABCDEFG AxBCDEF ABCDxE EDCBCAABCD
# Output: BCD

node lcs.js ABCDEFGH 1234
# Output: 
# (Single newline, as no common substring is found)

node lcs.js ABCDEFGH
# Output: ABCDEFGH
