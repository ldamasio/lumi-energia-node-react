import sequelize from '../database';
import { Sequelize } from 'sequelize';

describe('Database Connection', () => {
    beforeAll(async () => {
        try {
            await sequelize.authenticate();
        } catch (error) {
            throw new Error('Unable to connect to the database: ' + error);
        }
    });

    it('should connect to the database successfully', async () => {
        expect(sequelize).toBeInstanceOf(Sequelize);
    });

    afterAll(async () => {
        await sequelize.close();
    });
});
