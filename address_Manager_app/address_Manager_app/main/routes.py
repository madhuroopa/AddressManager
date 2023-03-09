import json
import logging
from logging.handlers import RotatingFileHandler
from flask import Blueprint, render_template,jsonify, request, current_app

from address_Manager_app.extensions import mongodb
main =Blueprint('main',__name__)

log_handler = RotatingFileHandler('api.log', maxBytes=100000, backupCount=20)
log_handler.setLevel(logging.INFO)

@main.before_app_first_request
def setup_logging():
    current_app.logger.addHandler(log_handler)
    

@main.route('/')
def index():
    return render_template('index.html')


@main.before_request
def log_request_info():
    with current_app.app_context():
        current_app.logger.info('Request URL: %s', request.url)
        current_app.logger.info('Request method: %s', request.method)
        current_app.logger.info('Request data : %s', request.args)
        
@main.route('/address_API/search', methods=['GET'])
def search_address():
    print("hello")
    
    country_code =  json.loads(request.args.get('country_code'))
    recipient_name = request.args.get('recipient_name')
    street = request.args.get('street')
    city = request.args.get('city')
    state = request.args.get('state')
    postal_code = request.args.get('postal_code')
    print(country_code)
    filters = {'country_code': {'$in': country_code}}
    
    if recipient_name:
        filters['recipient_name'] = {'$regex': f'.*{recipient_name}.*', '$options': 'i'}
    if street:
        filters['street'] = {'$regex': f'.*{street}.*', '$options': 'i'}
    if city:
        filters['city'] = {'$regex': f'.*{city}.*', '$options': 'i'}
    if state:
        filters['state'] = {'$regex': f'.*{state}.*', '$options': 'i'}
    if postal_code:
        filters['postal_code'] = {'$regex': f'.*{postal_code}.*', '$options': 'i'}
    print(filters)
    addresses = list(mongodb.db.address_collection.find(filters))
    print(addresses)
    for address in addresses:
        address['_id'] = str(address['_id']) 
    if len(addresses) == 0:
        # return 404 Not Found status code and error message
        return jsonify({'error': 'No addresses found for the given criteria.'}), 404
    return jsonify(addresses),200
@main.route('/address_API/addressformat/<country_code>')
def get_address_format(country_code):
    
    addressformat = mongodb.db.address_formats.find_one({'country_code': country_code})
    print(f"hello{addressformat}")
    format=addressformat['address_format']
    print(format)
   
    return jsonify(format)

@main.after_request
def log_response_info(response):
    with current_app.app_context():
        current_app.logger.info('Response status: %s', response.status)
       # current_app.logger.info('Response headers: %s', response.headers)
        current_app.logger.info('Response data: %s', response.get_data())
    return response
