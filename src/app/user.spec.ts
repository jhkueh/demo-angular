import { User } from './user';

describe('User', () => {
    it('should create an instance of User', () => {
        expect(new User(1, '', '')).toBeTruthy();
    });

    it('should accept values', () => {
        let user = new User(11, 'test@bot.com', '123456');

        expect(user.id).toEqual(11);
        expect(user.email).toEqual('test@bot.com');
        expect(user.password).toEqual('123456');
    });
})