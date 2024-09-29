import sys
import os

sys.path.insert(0, '/var/www/html')

os.environ['FLASK_APP'] = 'app'

from app import app as application
