from fastapi import APIRouter, HTTPException
from app.models import Property
from app.database import db
from bson import ObjectId

router = APIRouter()

@router.get("/")
async def get_properties():
    properties = []
    cursor = db.properties.find()  # Should be Motor's async cursor
    async for prop in cursor:
        prop["_id"] = str(prop["_id"])
        properties.append(prop)
    return properties

@router.post("/")
async def create_property(property: Property):
    data = property.dict()
    
    # Convert Decimal → float
    data["rent"] = float(data["rent"])
    data["annual_rent"] = float(data["annual_rent"])
    
    # Convert Enum → string
    data["status"] = data["status"].value

    result = await db.properties.insert_one(data)
    data["_id"] = str(result.inserted_id)
    return data

@router.put("/{id}")
async def update_property(id: str, property: Property):
    try:
        update_data = property.dict()

        # Convert unsafe types to MongoDB-safe types
        update_data["id"] = int(update_data["id"])
        update_data["rent"] = float(update_data["rent"])
        update_data["annual_rent"] = float(update_data["annual_rent"])
        update_data["status"] = update_data["status"].value

        result = await db.properties.update_one(
            {"_id": ObjectId(id)},
            {"$set": update_data}
        )

        if result.modified_count == 0:
            raise HTTPException(status_code=404, detail="Property not found")

        return {**update_data, "_id": id}

    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Update failed: {str(e)}")

@router.delete("/{id}")
async def delete_property(id: str):
    result = await db.properties.delete_one({"_id": ObjectId(id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Property not found")
    return {"message": "Deleted"}
