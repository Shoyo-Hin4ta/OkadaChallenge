import pandas as pd
import asyncio
from decimal import Decimal
from app.models import Property, StatusEnum
from app.database import db

def parse_currency(value: str) -> Decimal:
    if pd.isna(value):
        return Decimal("0.00")
    return Decimal(str(value).replace("$", "").replace(",", "").strip())

async def seed_properties():
    df = pd.read_csv("sample_inventory.csv")

    properties = []

    for _, row in df.iterrows():
        try:
            property = Property(
                id=row["unique_id"],
                address=row["Property Address"],
                floor=str(row["Floor"]) if not pd.isna(row["Floor"]) else None,
                suite=str(row["Suite"]) if not pd.isna(row["Suite"]) else None,
                size=int(row["Size (SF)"]),
                rent=parse_currency(row["Rent/SF/Year"]),
                broker_name=row["Associate 1"],
                broker_email=row["BROKER Email ID"],
                broker_phone="N/A",
                annual_rent=parse_currency(row["Annual Rent"]),
                status=StatusEnum.available,
                landlord_name="Okada & Company",
                landlord_email="landlord@example.com"
            )

            data = property.dict()
            data["id"] = int(data["id"])
            data["rent"] = float(data["rent"])
            data["annual_rent"] = float(data["annual_rent"])
            data["status"] = data["status"].value

            properties.append(data)

        except Exception as e:
            print(f"Skipping row due to error: {e}")

    if properties:
        await db.properties.delete_many({})
        await db.properties.insert_many(properties)
        print(f"✅ Seeded {len(properties)} properties.")
    else:
        print("⚠️ No valid properties found.")

if __name__ == "__main__":
    asyncio.run(seed_properties())
