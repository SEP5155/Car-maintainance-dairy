import sys
import os

sys.path.insert(0, '/var/www/html/car_app')

os.environ['FLASK_APP'] = 'app'

from app import app as application
