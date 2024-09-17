import {
  Controller,
  Get,
  UseGuards,
  Request,
  Req,
  Injectable,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/schema/user.schema';
import { ProfileService } from './profile.service';
import { UserDto } from './dto/profile.dto';

@Controller('profile')
@UseGuards(AuthGuard('jwt'))
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  @UseGuards(AuthGuard()) // Protect the route
  async getProfile(@Req() req): Promise<User> {
    const userId = req.user._id;
    return await this.profileService.findById(userId);
  }
}
