# Streamlit Hello App

🌟 Welcome to the Streamlit Hello App! 🌟

Dive into our app, built with the power of Streamlit, and experience the magic of Hugging Face models in real-time! ✍️💡 Whether you're starting a sentence or finishing a thought, let our AI buddy help you out. 🤖💬 Happy exploring! 🚀

## Getting Started

To get the Streamlit app up and running:

1. Clone the repository:
   ```
   git clone <repository-url>
   cd streamlit-hello
   ```

2. Install the required Python packages:
   ```
   pip install -r requirements.txt
   ```

3. Set up your `HUGGINGFACE_TOKEN`:
   ```
   export HUGGINGFACE_TOKEN=your_huggingface_token
   ```

4. Run the Streamlit app:
   ```
   streamlit run hello.py
   ```

## Docker Deployment

The app can also be deployed using Docker:

1. Build the Docker image:
   ```
   docker build -t streamlit-hello .
   ```

2. Run the Docker container:
   ```
   docker run -p 8080:8080 streamlit-hello
   ```

Remember to pass the `HUGGINGFACE_TOKEN` as an environment variable when starting your Docker container.

## AWS CDK Deployment

This app can also be deployed on AWS using the AWS CDK. Refer to the `cdk-ecs` folder for the necessary configurations.

## License

This project is open-source and available under the [MIT License](LICENSE).
