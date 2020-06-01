import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeBCryptHash from '../providers/ProvideEncryptedPassword/fakes/FakeBCryptHash';
import CreateUserService from './CreateUserService';
import AuthenticateUserService from './AuthenticateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeBCryptHash: FakeBCryptHash;
let createUserService: CreateUserService;
let authenticateUserService: AuthenticateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeBCryptHash = new FakeBCryptHash();

    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeBCryptHash,
    );
    authenticateUserService = new AuthenticateUserService(
      fakeUsersRepository,
      fakeBCryptHash,
    );
  });
  it('should be able to autheticate', async () => {
    const user = await createUserService.execute({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
    });

    const response = await authenticateUserService.execute({
      email: 'johndoe@email.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not able to autheticate with non existing user', async () => {
    await expect(
      authenticateUserService.execute({
        email: 'johndoe@email.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to autheticate with wrong password', async () => {
    const authenticateUserService = new AuthenticateUserService(
      fakeUsersRepository,
      fakeBCryptHash,
    );

    await createUserService.execute({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
    });

    await expect(
      authenticateUserService.execute({
        email: 'johndoe@email.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
