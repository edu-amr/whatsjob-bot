import path from 'path';
import { Request, Response } from 'express';

export class RenderPages {
  home(req: Request, res: Response) {
    res.sendFile(path.resolve(__dirname, '..', '..', 'public', 'pages', 'index.html')); // Ajustado o caminho para servir o arquivo HTML
  }
}
