import os
import subprocess

def start_ollama():
    print("Staring Ollama")
    try:
        # For Hub
        ollama_path = os.path.abspath("/shared/jupyterlab-a11y-checker/")
        
        # For Local Testing
        # ollama_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "../shared/ollama"))
        subprocess.Popen([ollama_path, "./ollama serve &"], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        print("Ollama started successfully.")
    except Exception as e:
        print(f"Error starting Ollama: {e}")

# def download_ollama():
#     """Download Ollama if not already present."""
#     # For Hub
#     # ollama_path = os.path.abspath("/shared/jupyterlab-a11y-checker/ollama")
#     # For local Testing
#     ollama_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "../shared/ollama"))

#     if not os.path.exists(ollama_path):

#         # For Hub (Linux)
#         # url = "https://github.com/ollama/ollama/releases/download/v0.3.6/ollama-linux-amd64"
        
#         # For Local Testing (macOS)
#         url = "https://github.com/ollama/ollama/releases/download/v0.3.6/ollama-darwin"
#         response = requests.get(url)
        
#         # Save the downloaded file as 'ollama'
#         with open(ollama_path, "wb") as file:
#             file.write(response.content)
        
#         # Make it executable
#         os.chmod(ollama_path, 0o755)
#         print("Ollama successfully downloaded.")
    
#     else:
#         print("Ollama already present.")