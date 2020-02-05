import Sequelize from 'sequelize';
import User from '../app/models/User';
import File from '../app/models/File';
import Appointment from '../app/models/Appointment';
import databaseConfig from '../config/database';

/*
  Array com todos os models da aplicação
 */
const models = [User, File, Appointment];

class Database {
  constructor() {
    this.init();
  }

  /*
    Inicializa a conexão com o banco de dados
   */
  init() {
    this.connection = new Sequelize(databaseConfig);

    /*
      Para cada model indica qual é a conexão com o banco
     */
    models
      .map(model => model.init(this.connection))
      /*
        caso exista um método chamado associate, este deve conter
        todos os models da aplicação para fazer as respectivas relações
        entre entidades
       */
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
