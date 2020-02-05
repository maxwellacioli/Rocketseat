import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        /*
          Os campos que devem ser armazenados no banco de dados
         */
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        /*
          Uma vez que um elemento é marcado como Sequelize.VIRTUAL
          este não será armazenado no banco de dados
         */
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    /*
      Cria um hook para ser executado em algum momento no processo
      de salvar a informação no banco, neste caso, o atributo foi
      'beforeSave', mas poderia ser 'afterSave'
    */
    this.addHook('beforeSave', async user => {
      if (user.password) {
        /*
          Utiliza a biblioteca bcryptjs para encriptografar a senha
          com uma força de 8, quanto maior este valor, maior será o esforço
          para encriptar a senha, recomendado é 8.
         */
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  /*
    Faz o relacionamento entre a coluna 'avatar_id' da tabela files
    como chave estrangeira na tabela users.
    Foi utilizada a associação belongsTo porque a entidade source (File) é que
    contém a informação, neste caso deve ser utilizado belongsTo, caso a
    entidade que tivesse a informação fosse a entidade target, devemos utilizar
    a associação hasOne
  */

  /*
    o atribuito 'as' dá um apelido para o relacionamento entre as entidades
   */
  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' });
  }

  /*
    Faz a comparação se password (clear) é igual a password_hash (senha
      encriptografada)
  */
  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
