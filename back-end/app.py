from transformers import AutoTokenizer, AutoModelForCausalLM, TFAutoModelForCausalLM
import torch


model = TFAutoModelForCausalLM.from_pretrained("./models/chatbot")
tokenizer = AutoTokenizer.from_pretrained("./models/chatbot")
# model.to("cuda")


test = "I have been having troubles sleeping"

input_ids = tokenizer.encode(test, return_tensors="tf")

# Generate text
generated_output = model.generate(
    input_ids,
    max_length=100,  # maximum length of the generated sequence
    num_beams=5,  # use beam search for more coherent outputs
    no_repeat_ngram_size=2,  # avoid repetition
    early_stopping=True,
)

# Decode and print the output
generated_text = tokenizer.decode(generated_output[0], skip_special_tokens=True)
print(generated_text)
