module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Cria uma tabela chamada users.
    */
    return queryInterface.createTable('appointments', {
      /*
        Aqui são definidas todas as colunas da tabela criada
       */
      id: {
        type: Sequelize.INTEGER,
        /*
          Não permite que o valor da coluna seja null
         */
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      provider_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      canceled_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  /*
    Caso ocorra um rollback, será excluida a tabela users.
   */
  down: queryInterface => {
    return queryInterface.dropTable('appointments');
  },
};
