import File from '../models/File';
import Courier from '../models/Courier';

class FileController {
  async store(req, res) {
    const { courierId } = req.params;

    const courier = await Courier.findByPk(courierId);

    if (!courier) {
      return res
        .status(400)
        .json({ error: `Does not exist a courier with id: ${courierId}` });
    }

    const { originalname: name, filename: path } = req.file;

    const file = await File.create({ name, path });

    courier.avatar_id = file.id;

    await courier.save(courier);

    return res.json(courier);
  }
}

export default new FileController();
