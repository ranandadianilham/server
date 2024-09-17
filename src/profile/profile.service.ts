import { Get, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/auth/schema/user.schema';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel('user')
    private userModel: Model<User>,
  ) {}

  async findById(id: string): Promise<User> {
    const profile = await this.userModel.findById(id);
    if (!profile) {
      throw new NotFoundException('Profile not found.');
    }
    return profile;
  }
}
