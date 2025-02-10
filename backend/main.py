from typing import Union

from fastapi import FastAPI
from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId

app = FastAPI()

MONGO_URL = "mongodb://root:example@website_mongo:27017/?authSource=admin"
client = AsyncIOMotorClient(MONGO_URL)
db = client.website  # database name
demo_collection = db.projects  # collection name

@app.get("/")
async def read_root():
    return {"Hello": "World"}

@app.get("/website_api/projects/")
async def get_items():
    items = await demo_collection.find().to_list(10)
    for item in items:
        item.pop("_id")
    return items 
