import csv
import requests
import base64


# print(base64.b64encode('admin'.encode("utf-8")))
print(base64.b64decode('UUtKTEhEMDI='))

print(base64.b64decode('VzJJVVFVNEI='))

print(base64.b64decode('MFA4TzlSTFk='))
print(base64.b64decode('Q0ExQzlQSFc='))


# import base64
# with open('data\Dataset1\Image\Brand\Acer.png', "rb") as img_file:
#     image = base64.b64encode(img_file.read())
# print(image)

# import smtplib
# from email.mime.text import MIMEText
# from email.mime.multipart import MIMEMultipart

# # Define sender and recipient email addresses
# sender = 'hometruong24@gmail.com'
# recipient = 'truong31200@gmail.com'

# # Create message object
# msg = MIMEMultipart()
# msg['From'] = sender
# msg['To'] = recipient
# msg['Subject'] = 'Test email'

# # Add message body
# body = 'This is a test email sent using Python!'
# msg.attach(MIMEText(body, 'plain'))

# # Connect to Gmail's SMTP server
# server = smtplib.SMTP('smtp.gmail.com', 587)
# server.starttls()

# # Login to Gmail
# username = 'hometruong24@gmail.com'
# password = 'agbsdfsd'
# server.login(username, password)

# # Send the message
# text = msg.as_string()
# server.sendmail(sender, recipient, text)

# # Close the connection
# server.quit()


# import smtplib

# sender = 'hometruong24@gmail.com'
# receivers = ['truong31200@gmail.com']

# message = """From: From Person <hometruong24@gmail.com>
# To: To Person <truong31200@gmail.com>
# Subject: SMTP e-mail test

# This is a test e-mail message.
# """

# smtpObj = smtplib.SMTP('localhost')
# smtpObj.sendmail(sender, receivers, message)         
# print( "Successfully sent email")