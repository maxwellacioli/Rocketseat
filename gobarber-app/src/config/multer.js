import multer from 'multer';
import crypto from 'crypto';
import { extname, resolve } from 'path';

export default {
  /*
    storage é onde será armazenado o arquivo que será passado na requisição,
    neste exemplo o mesmo foi guardado no armazenamento local, porém este pode
    ser salvo numa CDN (content delivery network, ex.: amazon).
   */
  storage: multer.diskStorage({
    /*
      utiliza o método resolve para indicar o path onde será salvo o arquivo
     */
    destination: resolve(__dirname, '..', '..', 'temp', 'uploads'),
    /*
      Filename tem três parâmetros, onde o primeiro é a requisiçaõ, o segundo é
      file (este contém todas as informações do arquivo, ex.: nome, tamanho,
      extensão, etc.) e uma funçaõ de callback.
      Para criar o nome do arquivo, foi utilizada a função randombytes da lib
      crypto, esta gera um conjunto aleatório de 16 bytes, caso ocorra algum
      erro a funçaõ de callback o retorna. Se tudo ocorrer normalmente, callback
      retornará null como error, e o resultado será os bytes no formato hex
      seguido da extensão do arquivo.

      Exemplo: ABDF3FDF...345.png

     */
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, res) => {
        if (err) return cb(err);

        return cb(null, res.toString('hex') + extname(file.originalname));
      });
    },
  }),
};
