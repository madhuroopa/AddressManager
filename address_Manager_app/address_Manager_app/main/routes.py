from flask import Blueprint, render_template,jsonify

from address_Manager_app.extensions import mongodb
main =Blueprint('main',__name__)
 
 
@main.route('/')
def index():
    return render_template('index.html')

@main.route('/address_API/countries',methods=['GET'])
def get_Countries():
    countries_collection = mongodb.db.Countries
    print(countries_collection)
    countries = list(countries_collection.find({},{"_id":0}))
    
    return jsonify(countries)