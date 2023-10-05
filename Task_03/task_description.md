# Task 3

# Generalized Rock-Paper-Scissors Game

This script allows you to play a generalized rock-paper-scissors game with support for an arbitrary odd number of combinations. You can use any of the following languages: Java, C#, PHP, JavaScript, TypeScript, Ruby, or Python.

## Task Description

1. When launched with command line parameters, the script accepts an odd number (>= 3) of non-repeating strings as moves. If the arguments are incorrect, it displays an error message explaining what went wrong and provides an example of how to input the correct moves. All messages should be in English.

2. The victory condition is defined such that half of the next moves in the circle win, and half of the previous moves in the circle lose.

3. The script generates a cryptographically strong random key (e.g., using SecureRandom, RandomNumberGenerator) with a length of at least 256 bits. It computes its own move, calculates an HMAC (using SHA2 or SHA3) with the generated key from its own move, and displays the HMAC to the user.

4. After that, the user is presented with a "menu" showing available moves (e.g., 1 - Stone, 2 - Scissors, ..., 0 - Exit). The user makes their choice, and if the input is incorrect, the menu is displayed again.

5. The script then reveals who won, displays the computer's move, and shows the original key. The user can verify that the computer plays fairly and didn't change its move after the user's choice.

6. When the user selects the "help" option in the terminal, a table (ASCII-graphic) determining the winning moves is displayed. The table generation should be in a separate class, the definition of the "rules" of who wins should be in a separate class, and the key generation and HMAC functions should be in separate classes (at least 4 classes in total).

7. You should make maximum use of core class libraries and third-party libraries and avoid reinventing the wheel. The help should be formatted as an N + 1 by N + 1 table, where N is the number of moves determined by the arguments passed to the script. There should be a title for the rows and columns (containing the move titles), and cells should contain Win/Lose/Draw.

8. The number of moves can be arbitrary (odd and > 1) based on the parameters passed to the script. It should not be hardwired into the code.

### Example:

```shell
>java -jar game.jar rock Spock paper lizard scissors
HMAC: 9ED68097B2D5D9A968E85BD7094C75D00F96680DC43CDD6918168A8F50DE8507
Available moves:
1 - rock
2 - Spock
3 - paper
4 - lizard
5 - scissors
0 - exit
? - help
Enter your move: 3
Your move: paper
Computer move: rock
You win!
HMAC key: BD9BE48334BB9C5EC263953DA54727F707E95544739FCE7359C267E734E380A2