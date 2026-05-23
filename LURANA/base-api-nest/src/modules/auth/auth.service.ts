import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
<<<<<<< HEAD
=======
  OnModuleInit,
>>>>>>> 45b5da6cbee2c367b805619f9783ea6b8b97f000
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';

import { User, UserDocument } from './schemas/user.schema';
import {
  EmailVerifyToken,
  EmailVerifyTokenDocument,
} from './schemas/email-verify-token.schema';
import {
  PasswordResetToken,
  PasswordResetTokenDocument,
} from './schemas/password-reset-token.schema';
import {
  RefreshToken,
  RefreshTokenDocument,
} from './schemas/refresh-token.schema';

import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Injectable()
<<<<<<< HEAD
export class AuthService {
=======
export class AuthService implements OnModuleInit {
>>>>>>> 45b5da6cbee2c367b805619f9783ea6b8b97f000
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,

    @InjectModel(EmailVerifyToken.name)
    private readonly verifyModel: Model<EmailVerifyTokenDocument>,

    @InjectModel(PasswordResetToken.name)
    private readonly resetModel: Model<PasswordResetTokenDocument>,

    @InjectModel(RefreshToken.name)
    private readonly refreshModel: Model<RefreshTokenDocument>,

    private readonly jwtService: JwtService,
  ) {}

<<<<<<< HEAD
  // ================================
  // UTILS
  // ================================
=======
  async onModuleInit() {
    await this.seedAdminAccount();
  }

  private async seedAdminAccount() {
    const adminEmail = 'admintholyy@luranashop.com';
    const adminPassword = 'Password123@';

    const existing = await this.userModel.findOne({ email: adminEmail });

    if (!existing) {
      await this.userModel.create({
        email: adminEmail,
        password: adminPassword,
        name: 'Super Admin',
        roles: ['ADMIN'],
        isEmailVerified: true,
      } as any);

      console.log('[SEED] Đã tạo tài khoản Admin mặc định: admintholyy@luranashop.com/ Password123@');
    }
  }

>>>>>>> 45b5da6cbee2c367b805619f9783ea6b8b97f000
  private generateNumericCode(length = 4): string {
    const min = 10 ** (length - 1);
    const max = 10 ** length - 1;
    return crypto.randomInt(min, max).toString();
  }

  private generateRandomToken(): string {
    return crypto.randomBytes(64).toString('hex');
  }

<<<<<<< HEAD
  // ================================
  // REGISTER
  // ================================
=======
>>>>>>> 45b5da6cbee2c367b805619f9783ea6b8b97f000
  async register(dto: RegisterDto) {
    const email = dto.email.toLowerCase().trim();

    if (dto.password !== dto.confirmPassword) {
<<<<<<< HEAD
      throw new BadRequestException(
        'Mật khẩu xác nhận không khớp',
      );
    }

    const existing = await this.userModel
      .findOne({ email })
      .lean();
=======
      throw new BadRequestException('Mật khẩu xác nhận không khớp');
    }

    const existing = await this.userModel.findOne({ email }).lean();
>>>>>>> 45b5da6cbee2c367b805619f9783ea6b8b97f000

    if (existing) {
      throw new BadRequestException('Email đã tồn tại');
    }

    const user = await this.userModel.create({
      email,
      password: dto.password,
<<<<<<< HEAD
      isEmailVerified: false,
    });
=======
      name: dto.name || 'New User',
      isEmailVerified: false,
      roles: ['USER'],
    } as any);
>>>>>>> 45b5da6cbee2c367b805619f9783ea6b8b97f000

    const code = this.generateNumericCode(6);

    await this.verifyModel.create({
      userId: user._id,
      code,
<<<<<<< HEAD
      expiresAt: new Date(
        Date.now() + 10 * 60 * 1000,
      ), // 10 phút
      used: false,
    });

    // TODO: Gửi mail verify tại đây

    return {
      message:
        'Tạo tài khoản thành công, vui lòng xác thực email',
    };
  }

  // ================================
  // VERIFY EMAIL
  // ================================
  async verifyEmail(dto: VerifyEmailDto) {
    const email = dto.email.toLowerCase().trim();

=======
      expiresAt: new Date(Date.now() + 10 * 60 * 1000),
      used: false,
    });

    return {
      message: 'Tạo tài khoản thành công, vui lòng xác thực email',
    };
  }

  async verifyEmail(dto: VerifyEmailDto) {
    const email = dto.email.toLowerCase().trim();
>>>>>>> 45b5da6cbee2c367b805619f9783ea6b8b97f000
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new BadRequestException('Email không tồn tại');
    }

    const token = await this.verifyModel.findOne({
      userId: user._id,
      code: dto.code,
      used: false,
      expiresAt: { $gt: new Date() },
    });

    if (!token) {
<<<<<<< HEAD
      throw new BadRequestException(
        'Mã xác thực không hợp lệ hoặc đã hết hạn',
      );
=======
      throw new BadRequestException('Mã xác thực không hợp lệ hoặc đã hết hạn');
>>>>>>> 45b5da6cbee2c367b805619f9783ea6b8b97f000
    }

    user.isEmailVerified = true;
    await user.save();

    token.used = true;
    await token.save();

    return {
      message: 'Xác thực email thành công',
    };
  }

<<<<<<< HEAD
  // ================================
  // LOGIN
  // ================================
=======
>>>>>>> 45b5da6cbee2c367b805619f9783ea6b8b97f000
  async login(dto: LoginDto) {
    const email = dto.email.toLowerCase().trim();

    const user = (await this.userModel
      .findOne({ email })
      .select('+password')
      .exec()) as UserDocument | null;

    if (!user) {
<<<<<<< HEAD
      throw new UnauthorizedException(
        'Email hoặc mật khẩu không đúng',
      );
    }

    const valid = await user.comparePassword(
      dto.password,
    );

    if (!valid) {
      throw new UnauthorizedException(
        'Email hoặc mật khẩu không đúng',
      );
    }

    if (!user.isEmailVerified) {
      throw new ForbiddenException(
        'Vui lòng xác thực email trước khi đăng nhập',
      );
=======
      throw new UnauthorizedException('Email hoặc mật khẩu không đúng');
    }

    const valid = await user.comparePassword(dto.password);

    if (!valid) {
      throw new UnauthorizedException('Email hoặc mật khẩu không đúng');
    }

    if (!user.isEmailVerified) {
      console.log('⚠️ DEV MODE: Bỏ qua kiểm tra verify email');
>>>>>>> 45b5da6cbee2c367b805619f9783ea6b8b97f000
    }

    const accessToken = this.jwtService.sign(
      {
        sub: user._id,
        email: user.email,
        roles: user.roles,
      },
<<<<<<< HEAD
      { expiresIn: '15m' },
=======
      { expiresIn: '1d' },
>>>>>>> 45b5da6cbee2c367b805619f9783ea6b8b97f000
    );

    const refreshToken = this.generateRandomToken();

    await this.refreshModel.create({
      userId: user._id as Types.ObjectId,
      token: refreshToken,
<<<<<<< HEAD
      expiresAt: new Date(
        Date.now() + 30 * 24 * 60 * 60 * 1000,
      ), // 30 ngày
=======
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
>>>>>>> 45b5da6cbee2c367b805619f9783ea6b8b97f000
      revoked: false,
    });

    return {
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        email: user.email,
        roles: user.roles,
      },
    };
  }

<<<<<<< HEAD
  // ================================
  // REFRESH TOKEN (ROTATION)
  // ================================
=======
>>>>>>> 45b5da6cbee2c367b805619f9783ea6b8b97f000
  async refresh(dto: RefreshTokenDto) {
    const stored = await this.refreshModel.findOne({
      token: dto.refreshToken,
      revoked: false,
      expiresAt: { $gt: new Date() },
    });

    if (!stored) {
<<<<<<< HEAD
      throw new UnauthorizedException(
        'Refresh token không hợp lệ',
      );
    }

    const user = await this.userModel.findById(
      stored.userId,
    );
=======
      throw new UnauthorizedException('Refresh token không hợp lệ');
    }

    const user = await this.userModel.findById(stored.userId);
>>>>>>> 45b5da6cbee2c367b805619f9783ea6b8b97f000

    if (!user) {
      throw new UnauthorizedException();
    }

<<<<<<< HEAD
    // revoke old token
=======
>>>>>>> 45b5da6cbee2c367b805619f9783ea6b8b97f000
    stored.revoked = true;
    await stored.save();

    const newAccessToken = this.jwtService.sign(
      {
        sub: user._id,
        email: user.email,
        roles: user.roles,
      },
<<<<<<< HEAD
      { expiresIn: '15m' },
=======
      { expiresIn: '1d' },
>>>>>>> 45b5da6cbee2c367b805619f9783ea6b8b97f000
    );

    const newRefreshToken = this.generateRandomToken();

    await this.refreshModel.create({
      userId: user._id as Types.ObjectId,
      token: newRefreshToken,
<<<<<<< HEAD
      expiresAt: new Date(
        Date.now() + 30 * 24 * 60 * 60 * 1000,
      ),
=======
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
>>>>>>> 45b5da6cbee2c367b805619f9783ea6b8b97f000
      revoked: false,
    });

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  }

<<<<<<< HEAD
  // ================================
  // FORGOT PASSWORD
  // ================================
  async forgotPassword(dto: ForgotPasswordDto) {
    const email = dto.email.toLowerCase().trim();

    const user = await this.userModel
      .findOne({ email })
      .lean();

    if (!user) {
      return {
        message:
          'Nếu email tồn tại, hệ thống đã gửi mã đặt lại mật khẩu',
=======
  async forgotPassword(dto: ForgotPasswordDto) {
    const email = dto.email.toLowerCase().trim();
    const user = await this.userModel.findOne({ email }).lean();

    if (!user) {
      return {
        message: 'Nếu email tồn tại, hệ thống đã gửi mã đặt lại mật khẩu',
>>>>>>> 45b5da6cbee2c367b805619f9783ea6b8b97f000
      };
    }

    const code = this.generateNumericCode(4);

    await this.resetModel.create({
      email,
      code,
<<<<<<< HEAD
      expiresAt: new Date(
        Date.now() + 2 * 60 * 1000,
      ), // 2 phút
      used: false,
    });

    // TODO: gửi email reset-code.hbs

    return {
      message:
        'Nếu email tồn tại, hệ thống đã gửi mã đặt lại mật khẩu',
    };
  }

  // ================================
  // RESET PASSWORD
  // ================================
  async resetPassword(dto: ResetPasswordDto) {
    if (dto.newPassword !== dto.confirmNewPassword) {
      throw new BadRequestException(
        'Mật khẩu xác nhận không khớp',
      );
=======
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
      used: false,
    });

    return {
      message: 'Nếu email tồn tại, hệ thống đã gửi mã đặt lại mật khẩu',
    };
  }

  async resetPassword(dto: ResetPasswordDto) {
    if (dto.newPassword !== dto.confirmNewPassword) {
      throw new BadRequestException('Mật khẩu xác nhận không khớp');
>>>>>>> 45b5da6cbee2c367b805619f9783ea6b8b97f000
    }

    const token = await this.resetModel.findOne({
      email: dto.email,
      code: dto.code,
      used: false,
      expiresAt: { $gt: new Date() },
    });

    if (!token) {
<<<<<<< HEAD
      throw new BadRequestException(
        'Mã đặt lại mật khẩu không hợp lệ hoặc đã hết hạn',
      );
=======
      throw new BadRequestException('Mã đặt lại mật khẩu không hợp lệ hoặc đã hết hạn');
>>>>>>> 45b5da6cbee2c367b805619f9783ea6b8b97f000
    }

    const user = await this.userModel
      .findOne({ email: dto.email })
      .select('+password');

    if (!user) {
<<<<<<< HEAD
      throw new BadRequestException(
        'Email không tồn tại',
      );
=======
      throw new BadRequestException('Email không tồn tại');
>>>>>>> 45b5da6cbee2c367b805619f9783ea6b8b97f000
    }

    user.password = dto.newPassword;
    await user.save();

    token.used = true;
    await token.save();

<<<<<<< HEAD
    // revoke all refresh tokens
=======
>>>>>>> 45b5da6cbee2c367b805619f9783ea6b8b97f000
    await this.refreshModel.updateMany(
      { userId: user._id },
      { revoked: true },
    );

    return {
<<<<<<< HEAD
      message:
        'Đặt lại mật khẩu thành công, vui lòng đăng nhập lại',
=======
      message: 'Đặt lại mật khẩu thành công, vui lòng đăng nhập lại',
>>>>>>> 45b5da6cbee2c367b805619f9783ea6b8b97f000
    };
  }
}