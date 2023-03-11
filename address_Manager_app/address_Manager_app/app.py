from flask import Flask
##from main.routes import the main and register the blueprin in the app
#from .main.routes import main
#from address_Manager_app.main.routes import main
from .extensions import mongodb
from flask_swagger_ui import get_swaggerui_blueprint
from flask_caching import Cache
import io
from flask_cors import CORS
cache = Cache()
def create_app():
    #cache = Cache()
    from .main.routes import main
    app=Flask(__name__)
 
    CORS(app, resources={r"/*": {"origins": "*"}})
    SWAGGER_URL = '/api/docs'  # URL for exposing Swagger UI (without trailing '/')
    API_URL = '/static/swagger.json'
    swaggerui_blueprint = get_swaggerui_blueprint(
    SWAGGER_URL,  # Swagger UI static files will be mapped to '{SWAGGER_URL}/dist/'
    API_URL,
    config={  # Swagger UI config overrides
        'app_name': "address_Manager_app"
    },

)

    app.register_blueprint(swaggerui_blueprint)

     # Initialize cache
    app.config['CACHE_TYPE'] = 'simple' # use a simple cache
    
    cache.init_app(app)
    app.config['MONGO_URI']= "mongodb+srv://Madhu:1234@cluster0.yhb6mpn.mongodb.net/Address_Manager?retryWrites=true&w=majority"
    
    #app.config['MONGO_DBNAME']="Address_Manager"
    #app.config['CACHE_TYPE'] = 'simple' # use a simple cache
    #cache.init_app(app)
    mongodb.init_app(app)
    app.register_blueprint(main)
    return app

