from flask import Blueprint, render_template,jsonify, request

from address_Manager_app.extensions import mongodb
main =Blueprint('main',__name__)
 
 
@main.route('/')
def index():
    return render_template('index.html')

@main.route('/address_API/countries',methods=['GET'])
def get_Countries():
    print(mongodb.db.list_collections)
    countries_collection = mongodb.db.Countries
    print(countries_collection)
    countries = list(countries_collection.find({},{"_id":0}))
    
    return jsonify(countries)
@main.route('/address_API/search',methods=['GET'])
def get_address():
    filters = {}
    print("hello")
    #print(request.args.items())
    #for key, value in request.args.items():
    #    filters[key] = value
    for key in ['NUMBER', 'STREET', 'CITY', 'STATE', 'POSTCODE', 'COUNTRY']:
        value = request.args.get(key)
        if value:
            filters[key] = value
    address_collection=mongodb.db.address_collection
    print(filters)
    results = address_collection.find(filters)
    print(results)
    addresses = []
    for result in results:
        address = {
            "NUMBER":result.get("NUMBER"),
            "STREET": result.get("STREET"),
            "CITY": result.get("CITY"),
            "STATE": result.get("STATE"),
            "POSTCODE": result.get("POSTCODE"),
            "COUNTRY": result.get("COUNTRY")
        }
        addresses.append(address)
    print(addresses)
    return jsonify(addresses)
