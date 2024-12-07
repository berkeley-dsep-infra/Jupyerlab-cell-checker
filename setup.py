# __import__('setuptools').setup()
from setuptools import setup, find_packages

setup(
    name="jupyterlab-a11y-checker",
    version="0.1.4-alpha-1",
    packages=find_packages(),
    install_requires=[
        'jupyterlab', 'requests'
    ],
    include_package_data=True,
    data_files=[
        (
            "etc/jupyter/jupyter_server_config.d",
            ["jupyter-config/jupyter_server_config.d/jupyterlab_a11y_checker.json"],
        ),
    ],
    # entry_points={
    #     'jupyter_server.extension': [
    #         'jupyterlab_a11y_checker = jupyterlab_a11y_checker'
    #     ]
    # },
)
