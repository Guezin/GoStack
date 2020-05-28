import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeBCryptHash from '../providers/ProvideEncryptedPassword/fakes/FakeBCryptHash';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeBCryptHash = new FakeBCryptHash();

    const createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeBCryptHash,
    );

    const user = await createUserService.execute({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not allow creating a user with the same email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeBCryptHash = new FakeBCryptHash();

    const createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeBCryptHash,
    );

    await createUserService.execute({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
    });

    await expect(
      createUserService.execute({
        name: 'John Doe',
        email: 'johndoe@email.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
