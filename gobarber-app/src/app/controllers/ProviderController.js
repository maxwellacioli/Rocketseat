import User from '../models/User';
import File from '../models/File';

class ProviderController {
  async index(req, res) {
    const providers = await User.findAll({
      /*
        Busca por todos os users cujo provider = true
       */
      where: { provider: true },
      /*
        Retorna apenas o conjunto de atributos definidos no array
       */
      attributes: ['id', 'name', 'email', 'avatar_id'],
      /*
        Inclui todos os relacionamentos que serão retornados junto com
        o objeto user
       */

      /*
        Foi inserido apenas File, porque inicialmente só existia
        um relacionamento entre File e User

        Primeiro código: include: [File]
      */

      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    return res.json(providers);
  }
}

/*
  exporta o ProviderController
 */
export default new ProviderController();
