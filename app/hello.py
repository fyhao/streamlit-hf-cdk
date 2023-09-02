import streamlit as st
import requests
import os

BEARER_TOKEN = os.environ.get("HUGGINGFACE_TOKEN")
API_URL = "https://api-inference.huggingface.co/models/gpt2"
headers = {"Authorization": f"Bearer {BEARER_TOKEN}"}

def query(payload):
    response = requests.post(API_URL, headers=headers, json=payload)
    return response.json()

def process_with_LLM(input_text):
    # Sending the input_text to Hugging Face model for processing
    output = query({"inputs": input_text})
    # Extracting the 'generated_text' from the list and dictionary
    response = output[0]['generated_text']
    return response

# Streamlit app layout
st.title('Your Text Buddy 🐱‍🏍')

# Description
st.write('Hey there! ✨ Type in a sentence and let me help you complete it.')

# Input field
user_input = st.text_input('Start your sentence here...')

# Button to get completion
if st.button('Help Me Finish!'):
    llm_response = process_with_LLM(user_input)
    st.subheader('Here you go! 🌟')
    st.write(llm_response)
