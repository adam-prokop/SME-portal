import asyncio
import os
from fastapi import FastAPI
from fastapi.responses import FileResponse
from pydantic import BaseModel
from preprocess import run_preprocessing
import sys
# import pandas as pd
# from catboost import CatBoostClassifier

app = FastAPI()

# ---------------------------------------------------------
# 1. INICIALIZACE MODELU
# ---------------------------------------------------------
# Zde si načteš svůj model. Běží to jen jednou při startu kontejneru.
# model = CatBoostClassifier()
# model.load_model("/app/data/precomputed/tvuj_model.cbm")

class VinRequest(BaseModel):
    vin: str

@app.post("/predict")
async def predict_risk(request: VinRequest):
    """
    Endpoint, který zavolá Next.js frontend po zadání VINu.
    """
    vin = request.vin
    # features = extract_features_from_parquet(vin)
    # prediction = model.predict(features)
    
    # Zde zatím natvrdo vracíme 3 pro demonstraci
    return {"vin": vin, "risk_class": 3}

@app.get("/graphs_json")
async def get_graphs_json():
    file_path = "/app/public/graphs/available_months.json"
    if os.path.exists(file_path):
        return FileResponse(file_path)
    return []

@app.get("/graphs_svg")
async def get_graphs_svg(file: str):
    if ".." in file or "/" in file:
        return {"error": "Neplatný název souboru"}
    file_path = f"/app/public/graphs/{file}"
    if os.path.exists(file_path):
        return FileResponse(file_path)
    return {"error": "Soubor nebyl nalezen"}

# ---------------------------------------------------------
# 2. PERIODICKÉ STAHOVÁNÍ DAT A GENEROVÁNÍ GRAFŮ
# ---------------------------------------------------------
async def update_data_and_generate_graphs():
    while True:
        print("Stahuji data z data.gov.cz do /app/data/parquets...")
        # run_preprocessing()
        # Spuštění preprocessingu ve zcela izolovaném procesu (neblokuje FastAPI, nezamrzá)
        process = await asyncio.create_subprocess_exec(
            sys.executable, "-c", "from preprocess import run_preprocessing; run_preprocessing()"
        )
        await process.wait()
        
        print("Generuji grafy z .parquet souborů...", flush=True)
        # Spuštění generování grafů v izolovaném procesu, aby nedošlo k zamrznutí FastAPI
        process_graphs = await asyncio.create_subprocess_exec(
            sys.executable, "-c", "from generate_graphs import generate_all_graphs; generate_all_graphs()"
        )
        await process_graphs.wait()
        
        print("Grafy uloženy. Uspávám na 24 hodin.", flush=True)
        await asyncio.sleep(86400)

@app.on_event("startup")
async def startup_event():
    # Při startu API serveru se automaticky nastartuje i smyčka pro update
    asyncio.create_task(update_data_and_generate_graphs())
