# __import__('setuptools').setup()

from setuptools import setup, find_packages

setup(
    name="jupyterlab-a11y-checker",
    version="0.1.4-alpha-1",
    packages=find_packages(),
    install_requires=[
        'jupyterlab', 'requests'
    ],
    entry_points={
        'jupyter_server_extensions': [
            'jupyterlab_a11y_checker = jupyterlab_a11y_checker.load_jupyter_server_extension',
        ],
    },
    include_package_data=True,
)
