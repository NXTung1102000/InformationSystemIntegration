import random
import string
import base64


def encode(string):
    return base64.b64encode(string.encode("utf-8"))


def get_random_string(length=12):
    # choose from all lowercase letter
    letters = string.ascii_lowercase
    result_str = ''.join(random.choice(letters) for i in range(length))
    return result_str