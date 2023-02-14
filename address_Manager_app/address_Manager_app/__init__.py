from flask import Flask
##from main.routes import the main and register the blueprin in the app
from .main.routes import main
from .extensions import mongodb
def create_app():
    app=Flask(__name__)
    app.config['MONGO_URI']= "mongodb+srv://Madhu:1234@cluster0.yhb6mpn.mongodb.net/Address_Manager?retryWrites=true&w=majority"
    #app.config['MONGO_DBNAME']="Address_Manager"
    mongodb.init_app(app)
    app.register_blueprint(main)
    return app