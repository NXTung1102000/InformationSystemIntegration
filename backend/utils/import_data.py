import json 
import requests
import mysql.connector

mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="root",
  database="ecomerce"
)


file_path = 'F:/HUST/do_an_thiet_ke_HTTT/InformationSystemIntegration\data\Dataset1/Account.json'
file = open(file_path, 'r', encoding='utf-8')
data = json.load(file)

val = []
for i, item in enumerate(data):
    ## prepare data
    # item['role'] = item['accounttype_id']
    # first_name, last_name = item['name'].rsplit(' ', 1)
    # item['first_name'] = first_name
    # item['last_name'] = last_name
    # item['created_date'] = '-'.join(item['created_date'].split('/')[::-1])
    
    # item['list_images'] = ','.join(item['list_images'])
    # item['specification'] = json.dumps(item['specification'])
    # data = [
    #         item['id'],
    #         item['name'],
    #         item['description'],
    #         item['detail'],
    #         item['specification'],
    #         item['price'],
    #         item['promotion_price'],
    #         item['image'],
    #         item['list_images'],
    #         item['product_category_id'],
    #         item['created_by'],
    #         item['created_date'],
    #         item['meta_keywords'],
    #         item['meta_descriptions'],
    #         item['meta_title'],
    #         item['warranty'],
    #         item['is_included_vat'],
    #         item['brand_id'],
    #         item['view_count'],
    #         item['quantity'],
    #         item['is_activated'],
    #         item['endpoint'],
    #         ]

    # data = [
    #     item['id'],
    #     item['account_id'],
    #     item['name'],
    #     item['phone'],
    #     item['address'],
    #     item['email'],
    #     item['order_state_id'],
    #     item['note'],
    #     item['created_date'],
    #     item['updated_state_by'],
    #     item['updated_state_date'],
    # ]


    # data = [
    #     item['id'],
    #     item['name'],
    #     item['detail'],
    #     item['voucher_type_id'],
    #     item['code'],
    #     item['image'],
    #     item['value'],
    #     item['threshold'],
    #     item['created_by'],
    #     item['created_date'],
    #     item['is_activated'],
    # ]

    # item['list_images'] = ','.join(item['list_images'])
    # data = [
    #     item['id'],
    #     item['account_id'],
    #     item['product_id'],
    #     item['star'],
    #     item['list_images'],
    #     item['content'],
    #     item['created_date'],
    # ]

    first_name, last_name = item['name'].rsplit(' ', 1)
    item['first_name'] = first_name
    item['last_name'] = last_name
    
    import string
    import random
    import base64
    
    N = 8
    pw = ''.join(random.choices(string.ascii_uppercase +
                                string.digits, k=N))
    item['password'] = base64.b64encode(pw.encode("utf-8"))
    item['score'] *= 10
    data = [
        item['id'],
        item['username'],
        item['password'],
        item['role'],
        item['name'],
        item['address'],
        item['phone'],
        item['email'],
        item['created_by'],
        item['created_date'],
        item['score'],
        item['is_activated'],
        item['first_name'],
        item['last_name'],
    ]
    val.append(data)

print(val[-1])
    


mycursor = mydb.cursor()

# sql = f"""INSERT INTO product (id, name, description, detail, specification, price, promotion_price, image, list_images, product_category_id, created_by, created_date, meta_keywords, meta_descriptions, meta_title, warranty, is_included_vat, brand_id, view_count, quantity, is_activated, endpoint) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"""
# sql = f"""INSERT INTO `order` (id, user_id, name, phone, address, email, order_state_id, note, created_date, updated_state_by, updated_state_date) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"""
# sql = f"""INSERT INTO `product_review` (id, user_id, product_id, star, list_images, content, created_date) VALUES (%s, %s, %s, %s, %s, %s, %s)"""
sql = f"""INSERT INTO `user` (id, username, password, role, name, address, phone, email, created_by, created_date, score, is_activated, first_name, last_name) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"""
mycursor.executemany(sql, val)
# mycursor.execute(sql, val[0])

# sql = """SELECT * FROM `order`"""
# mycursor.execute(sql)
# myresult = mycursor.fetchall()
# print(myresult)

mydb.commit()
