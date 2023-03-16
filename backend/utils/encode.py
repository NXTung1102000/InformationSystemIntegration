import random
import string


def encode(string):
    return string.encode("ascii")


def get_random_string(length=12):
    # choose from all lowercase letter
    letters = string.ascii_lowercase
    result_str = ''.join(random.choice(letters) for i in range(length))
    return result_str