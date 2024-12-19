from .handlers import setup_handlers
    
def _jupyter_labextension_paths():
    return [{
        "src": "labextension",
        "dest": "jupyterlab-a11y-checker"
    }]
    
# def _jupyter_server_extension_points():
#     return [{ "module": "jupyterlab_a11y_checker" }]

# def _load_jupyter_server_extension(server_app):
#     server_app.log.info("jupyterlab_a11y_checker server extension is being loaded.")
#     print("jupyterlab_a11y_checker server extension is being loaded.")
#     setup_handlers(server_app.web_app)
    
    
# load_jupyter_server_extension = _load_jupyter_server_extension