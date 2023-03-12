import json 
import requests
from repository import user_repo, product_repo, order_repo


file_path = 'F:/HUST/do_an_thiet_ke_HTTT/InformationSystemIntegration\data\Dataset1/Account.json'
file = open(file_path, 'r', encoding='utf-8')
data = json.load(file)

for i, item in enumerate(data):
    ## prepare data
    item['role'] = item['accounttype_id']
    first_name, last_name = item['name'].rsplit(' ', 1)
    item['first_name'] = first_name
    item['last_name'] = last_name
    item['created_date'] = '-'.join(item['created_date'].split('/')[::-1])
    
    # prefix = 'user'
    # rs = requests.post(f'http://localhost:5000/{prefix}', json=item)
    # print(rs.status_code)

print(i, item)
