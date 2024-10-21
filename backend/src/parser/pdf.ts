import fs from 'fs';
import pdf from 'pdf-parse';

async function processPDF(filePath: string): Promise<void> {
  try {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdf(dataBuffer);

    console.log(data.text);

    const fatura = extrairFatura(data.text);
    console.log('Dados da Fatura:', fatura);

    const energiaDados = extrairEnergiaDados(data.text);
    console.log('Dados de Energia Elétrica:', energiaDados);

  } catch (err) {
    console.error('Erro ao processar o PDF:', err);
  }
}

// Função para extrair informações adicionais como número do cliente, instalação, vencimento e valor a pagar
function extrairFatura(texto: string): { empresa: string | null, nomeCliente: string | null, numeroCliente: string | null, instalacao: string | null, mesReferencia: string | null, vencimento: string | null, valorAPagar: string | null } {
  const linhas = texto.split('\n');

  let empresa: string | null = null;
  let numeroCliente: string | null = null;
  let nomeCliente: string | null = null;
  let instalacao: string | null = null;
  let mesReferencia: string | null = null;
  let vencimento: string | null = null;
  let valorAPagar: string | null = null;

  for (let i = 0; i < linhas.length; i++) {
    if (linhas[i].includes('Nº DO CLIENTE')) {
      const partesClienteInstalacao = linhas[i + 1]?.trim().split(/\s+/);
      numeroCliente = partesClienteInstalacao[0] || null; // Captura o número do cliente
      instalacao = partesClienteInstalacao[1] || null; // Captura o número da instalação
    } else if (linhas[i].includes('Vencimento')) {
      // Aqui vamos capturar a data de vencimento e o valorAPagar.
      const partesVencimento = linhas[i + 1]?.trim().split(/\s+/);
      mesReferencia = partesVencimento[0] || null; // Captura a data de vencimento
      vencimento = partesVencimento[1] || null; // Captura a data de vencimento
      valorAPagar = partesVencimento[2] || null; // Captura o valor a pagar
    } else if (/(Janeiro|Fevereiro|Março|Abril|Maio|Junho|Julho|Agosto|Setembro|Outubro|Novembro|Dezembro)\//.test(linhas[i].trim())) {
      // A linha seguinte deve ser o nome do cliente
      nomeCliente = linhas[i + 1]?.trim() || null; // Captura o nome do cliente na linha seguinte
      if (nomeCliente) {
        nomeCliente = nomeCliente.replace(/\s*\d+$/, ''); // Remove números no final e espaços antes deles
      }
    } else if (linhas[i].includes('Fale com')) {
      // O nome da empresa é mencionado nesta linha
      const partes = linhas[i].split(' ');
      empresa = partes[2]; // Captura nome da empresa
    }

  }

  return { empresa, nomeCliente, numeroCliente, instalacao, mesReferencia, vencimento, valorAPagar }; // Retorna um objeto com as informações encontradas
}

// Função para extrair dados de energia elétrica
function extrairEnergiaDados(texto: string): Array<{ tipo: string, quantidade: string | null, valor: string | null }> {
  const linhas = texto.split('\n');
  const dadosEnergia: Array<{ tipo: string, quantidade: string | null, valor: string | null }> = [];

  // Tipos de energia que queremos extrair
  const tiposDeEnergia = [
    'Energia Elétrica',
    'Energia SCEE s/ ICMS',
    'Energia compensada GD I',
    'Contrib Ilum Publica Municipal'
  ];

  for (let i = 0; i < linhas.length; i++) {
    tiposDeEnergia.forEach(tipo => {
      if (linhas[i].startsWith(tipo)) { // Verifica se a linha começa com o tipo de energia
        // Capturar a linha e dividir por espaços
        const energiaLinha = linhas[i].trim();
        const partes = energiaLinha.split(/\s+/); // Divide por um ou mais espaços

        let quantidade: string | null = null;
        let valor: string | null = null;

        // Lógica para capturar quantidade e valor dependendo do tipo
        if (tipo === 'Contrib Ilum Publica Municipal') {
          valor = partes[partes.length - 1] || null; // Captura o valor (R$)
          quantidade = null; // Não existe quantidade para esta linha
        } else if (tipo === 'Energia SCEE s/ ICMS' || tipo === 'Energia compensada GD I') {
          quantidade = partes[4] || null; // Captura a quantidade (kWh)
          valor = partes[partes.length - 2] || null; // Captura o valor (R$)
        } else {
          quantidade = partes[2] || null; // Captura a quantidade (kWh)
          valor = partes[partes.length - 2] || null; // Captura o valor (R$)
        }

        // Adiciona os dados ao array
        dadosEnergia.push({ tipo, quantidade, valor });
      }
    });
  }

  return dadosEnergia; // Retorna um array com os dados encontrados
}


processPDF('./src/services/3001116735-01-2024.pdf');
