from src.loader import load_pdf, load_excel
from src.chunk import split_docs
from src.vector_db import create_db, load_db
from src.model import get_llm
from src.rag import ask_question
import os

# 1. LOAD DATA
#pdf_docs = load_pdf(r"data/document.pdf")
excel_docs = load_excel(r"data/Products.xlsx")

docs = excel_docs

# 2. CHUNK
chunks = split_docs(docs)

# 3. CREATE VECTOR DB
if not os.path.exists("db"):
    db = create_db(chunks)
else:
    db = load_db()

# 4. LOAD LLM
llm = get_llm()

# 5. CHAT LOOP
print("Have a good day, how can I help you?\n")

while True:
    q = input("You: ")
    if q.lower() in ["exit", "quit", "bye"]:
        print("Bot: See you later, thanks for visiting!")
        break

    answer = ask_question(db, llm, q)
    print("Bot:", answer)