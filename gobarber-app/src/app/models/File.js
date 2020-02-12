import Sequelize, { Model } from 'sequelize';

class File extends Model {
  static init(sequelize) {
    super.init(
      {
        /*
          name e path são os elementos necessário para
          serem armazenados no tabela files
        */
        name: Sequelize.STRING,
        path: Sequelize.STRING,
        /*
          Campo url, não existe na tabela
         */
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `${process.env.APP_URL}/files/${this.path}`;
          },
        },
      },
      {
        /*
          por default o segundo elemento deve ser o sequelize
         */
        sequelize,
      }
    );
    return this;
  }
}

export default File;
