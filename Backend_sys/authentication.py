from dotenv import load_dotenv
from datetime import datetime, timedelta, timezone
load_dotenv()

import os 
from supabase import create_client

url = os.environ.get("SUPABASE_URL")
key = os.environ.get("SUPABASE_KEY")
supabase = create_client(url, key)

email: str = "m.david@alustudent.com"
password: str = "stephencurqeh"	

#THIS IS USED TO SIGN UP WITH EMAIL
# try:
#     user = supabase.auth.sign_up({ "email": email, "password": password })
#     print(user)
# except Exception as e:
#     print(f"Error creating user: {e}")

#THIS IS USED TO SIGN IN WITH EMAIL
# new_auth = supabase.auth.sign_in_with_password({ "email": email, "password": password })
# print(new_auth)