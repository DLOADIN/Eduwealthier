from dotenv import load_dotenv
from datetime import datetime, timedelta, timezone
load_dotenv()

import os 
from supabase import create_client


create_time = datetime.utcnow() - timedelta(hours=1)
url = os.environ.get("SUPABASE_URL")
key = os.environ.get("SUPABASE_KEY")
supabase = create_client(url, key)

# inserting_data = supabase.table("todos").insert({"created_at":str(create_time),"name":"Amabutho"}).execute()
# retrieving_data = supabase.table("todos").select("*").execute()
# updating_data = supabase.table("todos").update({"name":"Iyooha"}).eq("id",2).execute()	
deleting_data = supabase.table("todos").delete().eq("id",1).execute()


print(deleting_data)
# assert len(data.data) > 0