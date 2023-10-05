import hashlib
import hmac
import random
import sys
import os
from prettytable import PrettyTable
from termcolor import colored


def clear_console():
    os.system('cls' if os.name == 'nt' else 'clear')


class ValidationResult:
    def __init__(self, result: bool, message: str):
        self.result = result
        self.message = message


class ValidationError(Exception):
    def __init__(self, message: str):
        super().__init__(message)
        self.name = "ValidationError"


class Game:
    def __init__(self, moves: list[str]):
        validation = self._validate_moves(moves)
        if not validation.result:
            raise ValidationError(
                colored(f"Invalid input: {validation.message} \n", "red") +
                colored(
                    "Example: Камень Ножницы Бумага ||| 1 2 3 4 5 6 7 8 9 ||| Rock Paper Scissors Lizard Spock", "red", attrs=["underline", "bold"])
            )
        self.moves = moves
        self.hmac_key = CryptoManager.generate_key()
        self.computer_move = self.moves[random.randint(0, len(self.moves) - 1)]
        self.hmac = CryptoManager.calculate_hmac(
            self.hmac_key, self.computer_move)

    def start_game(self):
        clear_console()
        MenuManager.print_menu(self.moves, self.hmac)
        player_move = self._make_player_move()
        print(colored(f"Your move: {player_move}", "green"))
        print(colored(f"Computer move: {self.computer_move}", "red"))
        result = RulesManager.determine_winner(
            self.computer_move, player_move, self.moves)
        print(result)
        print(f"HMAC key: {self.hmac_key.hex()}")

    def _validate_moves(self, moves: list[str]) -> ValidationResult:
        if len(moves) < 3:
            return ValidationResult(result=False, message="minimum number of arguments is 3")
        if len(moves) % 2 != 1:
            return ValidationResult(result=False, message="not even number of arguments")
        if len(set(moves)) != len(moves):
            return ValidationResult(result=False, message="arguments should not be repeated")
        return ValidationResult(result=True, message="")

    def _make_player_move(self):
        while True:

            move = input("Enter your move: ")
            if move == "?":
                clear_console()
                MenuManager.print_help(self.moves)
                MenuManager.print_menu(self.moves, self.hmac)
            elif move == "0":
                os._exit(1)
            elif move.isdigit() and int(move) >= 1 and int(move) <= len(self.moves):
                return self.moves[int(move)-1]
            else:
                clear_console()
                print(colored(
                    f"Invalid move: choose one proposed (from 0 to {str(len(self.moves))} or ?)", "red"))
                MenuManager.print_menu(self.moves, self.hmac)


class MenuManager:
    @staticmethod
    def print_menu(moves: list[str], hmac: str):
        print(f"HMAC: {hmac}")
        print("Available moves:")
        for move_id, move in enumerate(moves):
            print(f"{move_id + 1} - {move}")
        print("0 - exit")
        print("? - help")

    @staticmethod
    def print_help(moves: list[str]):
        table = PrettyTable()
        table.field_names = [colored(
            "PC", "red") + colored(" / ", "white") + colored("User", "green"), *map(lambda mv: colored(mv, "green"), moves)]
        for computer_move in moves:
            row = [colored(computer_move, "red")]
            for player_move in moves:
                row.append(RulesManager.determine_winner(
                    computer_move, player_move, moves))
            table.add_row(row)
        print(table)


class RulesManager:
    @staticmethod
    def determine_winner(computer_move: str, player_move: str, moves: list[str]):
        number_of_moves = len(moves)
        player_move_index = moves.index(computer_move)
        computer_move_index = moves.index(player_move)
        if computer_move == player_move:
            return colored("Draw", "white")
        lower_bound = (player_move_index + 1) % number_of_moves
        upper_bound = (player_move_index + number_of_moves //
                       2) % number_of_moves
        if (computer_move_index >= lower_bound and computer_move_index <= upper_bound) or (upper_bound < lower_bound and (computer_move_index >= lower_bound or computer_move_index <= upper_bound)):
            return colored("Win", "green")
        else:
            return colored("Lose", "red")


class CryptoManager:

    @staticmethod
    def generate_key():
        return os.urandom(32)

    @staticmethod
    def calculate_hmac(key, message):
        h = hmac.new(key, message.encode(), hashlib.sha256)
        return h.hexdigest()


try:
    clear_console()
    game = Game(sys.argv[1:])
    game.start_game()
except ValidationError as error:
    print(colored("\nValidation Error: \n", "red") + str(error))
