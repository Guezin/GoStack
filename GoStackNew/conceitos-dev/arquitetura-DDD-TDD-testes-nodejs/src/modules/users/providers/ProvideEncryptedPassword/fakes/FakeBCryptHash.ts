import IProviderEncryptedPassword from '../models/IProviderEncryptedPassword';

class BCryptHash implements IProviderEncryptedPassword {
  public async generateHash(payload: string): Promise<string> {
    return payload;
  }

  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    return payload === hashed;
  }
}

export default BCryptHash;
