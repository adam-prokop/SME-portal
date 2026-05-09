import asyncio
import os
from fastapi import FastAPI
from pydantic import BaseModel
from preprocess import run_preprocessing
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

# ---------------------------------------------------------
# 2. PERIODICKÉ STAHOVÁNÍ DAT A GENEROVÁNÍ GRAFŮ
# ---------------------------------------------------------
async def update_data_and_generate_graphs():
    while True:
        print("Stahuji data z data.gov.cz do /app/data/parquets...")
        # Run heavy CPU/IO processing in a threadpool so it doesn't block the API
        await asyncio.to_thread(run_preprocessing)
        
        print("Generuji grafy z .parquet souborů...")
        # df = pd.read_parquet("/app/data/parquets/...")
        # nakreslis grafy a ulozis
        # plt.savefig("/app/public/graphs/pruchodnost.svg")
        
        print("Grafy uloženy. Uspávám na 24 hodin.")
        # Uspi úlohu na 24 hodin (86400 sekund)
        await asyncio.sleep(86400)

@app.on_event("startup")
async def startup_event():
    # Při startu API serveru se automaticky nastartuje i smyčka pro update
    asyncio.create_task(update_data_and_generate_graphs())
