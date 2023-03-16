import csv
import requests


url = 'http://localhost:5000'
# file_csv = 'C:/users/ADMIN/Downloads/User_so2.csv'
file_csv = "C:/users/ADMIN/Downloads/Product3.csv"    
with open(file_csv, 'r') as file:
    file_csv = csv.reader(file)
    header = file_csv.__next__()
    for row in file_csv:
        data = dict(list(zip(header, row))[1:])
        data['brand'] = 'asus'
        rs = requests.post(url+ '/product', json=data)


