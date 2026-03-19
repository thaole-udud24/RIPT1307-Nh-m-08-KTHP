import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
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
export class AuthService {
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

  // ================================
  // UTILS
  // ================================
  private generateNumericCode(length = 4): string {
    const min = 10 ** (length - 1);
    const max = 10 ** length - 1;
    return crypto.randomInt(min, max).toString();
  }

  private generateRandomToken(): string {
    return crypto.randomBytes(64).toString('hex');
  }

  // ================================
  // REGISTER
  // ================================
  async register(dto: RegisterDto) {
    const email = dto.email.toLowerCase().trim();

    if (dto.password !== dto.confirmPassword) {
      throw new BadRequestException(
        'Mật khẩu xác nhận không khớp',
      );
    }

    const existing = await this.userModel
      .findOne({ email })
      .lean();

    if (existing) {
      throw new BadRequestException('Email đã tồn tại');
    }

    const user = await this.userModel.create({
      email,
      password: dto.password,
      isEmailVerified: false,
    });

    const code = this.generateNumericCode(6);

    await this.verifyModel.create({
      userId: user._id,
      code,
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
      throw new BadRequestException(
        'Mã xác thực không hợp lệ hoặc đã hết hạn',
      );
    }

    user.isEmailVerified = true;
    await user.save();

    token.used = true;
    await token.save();

    return {
      message: 'Xác thực email thành công',
    };
  }

  // ================================
  // LOGIN
  // ================================
  async login(dto: LoginDto) {
    const email = dto.email.toLowerCase().trim();

    const user = (await this.userModel
      .findOne({ email })
      .select('+password')
      .exec()) as UserDocument | null;

    if (!user) {
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
    }

    const accessToken = this.jwtService.sign(
      {
        sub: user._id,
        email: user.email,
        roles: user.roles,
      },
      { expiresIn: '15m' },
    );

    const refreshToken = this.generateRandomToken();

    await this.refreshModel.create({
      userId: user._id as Types.ObjectId,
      token: refreshToken,
      expiresAt: new Date(
        Date.now() + 30 * 24 * 60 * 60 * 1000,
      ), // 30 ngày
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

  // ================================
  // REFRESH TOKEN (ROTATION)
  // ================================
  async refresh(dto: RefreshTokenDto) {
    const stored = await this.refreshModel.findOne({
      token: dto.refreshToken,
      revoked: false,
      expiresAt: { $gt: new Date() },
    });

    if (!stored) {
      throw new UnauthorizedException(
        'Refresh token không hợp lệ',
      );
    }

    const user = await this.userModel.findById(
      stored.userId,
    );

    if (!user) {
      throw new UnauthorizedException();
    }

    // revoke old token
    stored.revoked = true;
    await stored.save();

    const newAccessToken = this.jwtService.sign(
      {
        sub: user._id,
        email: user.email,
        roles: user.roles,
      },
      { expiresIn: '15m' },
    );

    const newRefreshToken = this.generateRandomToken();

    await this.refreshModel.create({
      userId: user._id as Types.ObjectId,
      token: newRefreshToken,
      expiresAt: new Date(
        Date.now() + 30 * 24 * 60 * 60 * 1000,
      ),
      revoked: false,
    });

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  }

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
      };
    }

    const code = this.generateNumericCode(4);

    await this.resetModel.create({
      email,
      code,
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
    }

    const token = await this.resetModel.findOne({
      email: dto.email,
      code: dto.code,
      used: false,
      expiresAt: { $gt: new Date() },
    });

    if (!token) {
      throw new BadRequestException(
        'Mã đặt lại mật khẩu không hợp lệ hoặc đã hết hạn',
      );
    }

    const user = await this.userModel
      .findOne({ email: dto.email })
      .select('+password');

    if (!user) {
      throw new BadRequestException(
        'Email không tồn tại',
      );
    }

    user.password = dto.newPassword;
    await user.save();

    token.used = true;
    await token.save();

    // revoke all refresh tokens
    await this.refreshModel.updateMany(
      { userId: user._id },
      { revoked: true },
    );

    return {
      message:
        'Đặt lại mật khẩu thành công, vui lòng đăng nhập lại',
    };
  }
}