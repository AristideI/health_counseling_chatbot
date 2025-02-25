from transformers import AutoTokenizer, AutoModelForCausalLM, TFAutoModelForCausalLM
from fastapi import FastAPI
import uvicorn

model = TFAutoModelForCausalLM.from_pretrained("./models/chatbot")
tokenizer = AutoTokenizer.from_pretrained("./models/chatbot")

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/chat")
def chat(query: str):
    input_ids = tokenizer.encode(query, return_tensors="tf")
    generated_output = model.generate(
        input_ids,
        max_length=100,  # maximum length of the generated sequence
        num_beams=5,  # use beam search for more coherent outputs
        no_repeat_ngram_size=2,  # avoid repetition
        early_stopping=True,
    )
    generated_text = tokenizer.decode(generated_output[0], skip_special_tokens=True)
    return {"response": generated_text}


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
