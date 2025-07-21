# utils/excel_parser.py
import pandas as pd
import numpy as np
from typing import List

def parse_excel(file_path: str) -> List[dict]:
    df = pd.read_excel(file_path)  # ✅ assign to df

    # Clean up data: replace NaN, inf, -inf with None for JSON compatibility
    df = df.replace([np.nan, np.inf, -np.inf], None)

    return df.to_dict(orient="records")
