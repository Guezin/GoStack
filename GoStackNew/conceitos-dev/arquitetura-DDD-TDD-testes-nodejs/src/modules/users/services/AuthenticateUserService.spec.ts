import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeBCryptHash from '../providers/ProvideEncryptedPassword/fakes/FakeBCryptHash';
import CreateUserService from './CreateUserService';
import AuthenticateUserService from './AuthenticateUserService';

describe('AuthenticateUser', () => {
  it('should be able to autheticate', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeBCryptHash = new FakeBCryptHash();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeBCryptHash,
    );
    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeBCryptHash,
    );

    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
    });

    const response = await authenticateUser.execute({
      email: 'johndoe@email.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not able to autheticate with non existing user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeBCryptHash = new FakeBCryptHash();

    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeBCryptHash,
    );

    await expect(
      authenticateUser.execute({
        email: 'johndoe@email.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to autheticate with wrong password', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeBCryptHash = new FakeBCryptHash();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeBCryptHash,
    );
    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeBCryptHash,
    );

    await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
    });

    await expect(
      authenticateUser.execute({
        email: 'johndoe@email.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
