import { config } from 'dotenv';

config();

describe('Variáveis de Ambiente', () => {
    it('Deve carregar todas as variáveis necessárias', () => {
        expect(process.env.DB_NAME).toBeDefined();
        expect(process.env.DB_USER).toBeDefined();
        expect(process.env.DB_PASS).toBeDefined();
        expect(process.env.DB_HOST).toBeDefined();
    });
});
