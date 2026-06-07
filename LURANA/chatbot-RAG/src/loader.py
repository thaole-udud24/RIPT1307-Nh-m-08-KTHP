from langchain_community.document_loaders import PyPDFLoader
import pandas as pd
from langchain_core.documents import Document

def load_pdf(path):
    return PyPDFLoader(path).load()

def load_excel(path):
    df = pd.read_excel(path)

    docs = []
    for _, row in df.iterrows():
        docs.append(Document(
            page_content=str(row.to_dict())
        ))
    return docs