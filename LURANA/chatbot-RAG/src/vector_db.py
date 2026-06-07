from langchain_chroma import Chroma
from src.embedding import get_embeddings

DB_DIR = "db"

def create_db(docs):
    embeddings = get_embeddings()

    db = Chroma.from_documents(
        documents=docs,
        embedding=embeddings,
        persist_directory=DB_DIR
    )

    return db


def load_db():
    embeddings = get_embeddings()

    return Chroma(
        persist_directory=DB_DIR,
        embedding_function=embeddings
    )