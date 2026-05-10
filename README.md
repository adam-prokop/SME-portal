# SME Portál

Analytický a informační web postavený nad otevřenými daty z Informačního systému technických prohlídek Ministerstva dopravy ČR (ISTP MDČR). Zaměřuje se na oblast Stanic měření emisí (SME).

Portál poskytuje interaktivní grafy agregující průchodnosti a emisní měření v čase, a zároveň obsahuje zabudovaný model strojového učení (CatBoost), který predikuje pravděpodobnost selhání vozidla při další kontrole.

## Prerekvizity

Pro běh projektu je vyžadováno nainstalované prostředí Docker:
- [Docker](https://docs.docker.com/engine/install/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Příprava před spuštěním

### 1. Model a předpočítaná data
Aby správně fungovala predikce (stránka Vozidla), je nutné do projektu vložit natrénovaný ML model a jeho metadata. Tyto soubory nejsou součástí repozitáře z důvodu jejich velikosti a procesu trénování.

Vložte následující 4 soubory do složky `data/precomputed/` v kořeni projektu:
- `model.bin` (Zkompilovaný CatBoost model)
- `features.json` (Seznam příznaků)
- `cat_features.json` (Seznam kategoriálních příznaků)
- `optimalizovane_prahy.csv` (Rozdělení do kategorií rizikovosti)

*Struktura po vložení by měla vypadat takto:*
```text
SME-portal/
└── data/
    └── precomputed/
        ├── cat_features.json
        ├── features.json
        ├── model.bin
        └── optimalizovane_prahy.csv
```

### 2. Konfigurace prostředí
Před spuštěním kontejnerů si vytvořte konfigurační soubor `.env`. K dispozici je vzor.

```bash
cp .env.example .env
```

V souboru `.env` si můžete upravit zejména port, na kterém portál poběží, a počet vláken pro prvotní stahování a parsování velkých datasetů z NKOD. V souboru .env si můžete upravit zejména port, na kterém portál poběží, počet vláken pro prvotní stahování a parsování velkých datasetů z NKOD, a také interval automatické aktualizace (UPDATE_INTERVAL_DAYS).

## Spuštění

Projekt spustíte pomocí Docker Compose.

```bash
docker-compose up --build -d
```

Webové rozhraní bude dostupné na adrese http://localhost:3000 (nebo na portu, který jste určili v `.env`).

### Jak probíhá start?
1. Nastartuje webový kontejner a backendový (FastAPI) kontejner.
2. Backendový kontejner si nejprve stáhne potřebná otevřená data a seznam stanic přes SPARQL.
3. Datové XML sady se paralerně rozparsují do formátu Parquet a vygenerují se SVG grafy.
4. Následně se načte ML model a sestaví se In-Memory index VIN kódů pro bleskové predikce.
5. Během tohoto procesu (který může trvat i desítky minut v závislosti na hardwaru) vrací backend na endpointu `/health` stav `503`, takže web zatím informuje, že se data připravují.

Tento proces se poté automaticky opakuje podle nastaveného intervalu, čímž jsou data na webu vždy aktuální.