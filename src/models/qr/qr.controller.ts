import { Controller } from '@nestjs/common';
import { QrService } from './qr.service';

@Controller('user')
export class QrController {
  constructor(private readonly qrService: QrService) {}
}
