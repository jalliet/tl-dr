from fastapi import FastAPI

app = FastAPI()

@app.get("/api/data")
async def get_data():
    # Logic to return data
    return {"data": "sample"}
