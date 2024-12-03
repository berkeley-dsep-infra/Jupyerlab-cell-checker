from ._version import __version__
    
def _jupyter_labextension_paths():
    return [{
        "src": "labextension",
        "dest": "jupyterlab-a11y-checker"
    }]
    
def _jupyter_server_extension_paths():
    return [{
        "module": "jupyterlab_a11y_checker"
    }]

def load_jupyter_server_extension(app):
    from .handlers import start_ollama
    start_ollama()