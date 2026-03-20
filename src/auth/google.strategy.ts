import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { AuthService } from './auth.service.js';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    const clientID = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const callbackURL = process.env.GOOGLE_CALLBACK_URL;

    // Provide dummy values only to prevent startup crash if variables are missing
    // Actual Google login will fail if these are dummy, but app will boot
    super({
      clientID: clientID || 'missing-client-id',
      clientSecret: clientSecret || 'missing-client-secret',
      callbackURL: callbackURL || 'http://localhost:5000/auth/google/callback',
      scope: ['email', 'profile'],
    });

    if (!clientID || !clientSecret) {
      console.warn('WARNING: Google OAuth credentials missing. Google Login will not work.');
    }
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { name, emails, id } = profile;
    const user = {
      email: emails[0].value,
      name: `${name.givenName} ${name.familyName}`,
      googleId: id,
      accessToken,
    };
    done(null, user);
  }
}
