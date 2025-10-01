from utils.dbutils import query_db
from utils.logutils import log_code_change

def answer_query(query, llm, embeddings, persist_dir):
    results = query_db(query, embeddings, persist_dir)
    context = "\n".join([r.page_content for r in results])
    prompt = f"Context:\n{context}\n\nQuestion: {query}\nAnswer:"
    return llm.invoke(prompt).content

def apply_code_change(query, llm, embeddings, persist_dir, code_dir):
    results = query_db(query, embeddings, persist_dir)
    context = "\n".join([r.page_content for r in results])
    prompt = f"""
    You are a coding assistant. Here is some code:\n{context}\n
    User request: {query}\n
    Provide the modified code ONLY.
    """
    response = llm.invoke(prompt).content
    fname = log_code_change(query, response, code_dir)
    return response, fname
