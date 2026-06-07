def ask_question(db, llm, question):
    docs = db.similarity_search(question, k=3)

    context = "\n".join([d.page_content for d in docs])

    prompt = f"""
You are a helpful assistant.

Context:
{context}

Question:
{question}

Answer clearly:
"""

    return llm.invoke(prompt).content