from ._version import __version__
import os
import subprocess
    
def _jupyter_labextension_paths():
    return [{
        "src": "labextension",
        "dest": "jupyterlab-a11y-checker"
    }]
    
def _jupyter_server_extension_points():
    return [{ "module": "jupyterlab_a11y_checker" }]

def _load_jupyter_server_extension(server_app):
    server_app.log.info("jupyterlab_a11y_checker server extension is being loaded.")
    from .handlers import start_ollama
    start_ollama()
    
    
load_jupyter_server_extension = _load_jupyter_server_extension