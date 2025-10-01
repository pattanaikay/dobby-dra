"""
Model Testing Script
------------------
This script provides a simple way to test the Ollama language model integration.
It sends a test prompt to verify that the model is working correctly and
to understand the format of responses.
"""

from langchain_ollama import ChatOllama

# Initialize the language model
# Using deepseek-coder with temperature=0 for deterministic outputs
llm = ChatOllama(model="deepseek-coder-v2:16b", temperature=0)

# Define a test prompt that requests a common programming task
# This helps verify both code generation and language understanding
prompt = "Write a Python function to check if a number is prime."

# Send the prompt to the model and get the response
# Using invoke() which returns a complete response object
response = llm.invoke(prompt)

# Display the model's output with a visual separator
print("🔹 Model Output:")
print(response.content)
