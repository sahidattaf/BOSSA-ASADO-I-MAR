from fastapi import FastAPI
import openai
from dotenv import load_dotenv
import os

load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

app = FastAPI()

@app.get("/generate")
async def generate(prompt: str):
    response = openai.Completion.create(
        model="text-davinci-003",
        prompt=prompt,
        max_tokens=50,
    )
    return {"completion": response["choices"][0]["text"].strip()}

