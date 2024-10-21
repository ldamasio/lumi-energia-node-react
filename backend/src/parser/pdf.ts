import fs from 'fs';
import pdf from 'pdf-parse';
import path from 'path';
import axios from 'axios';

function formatValor(valor?: string | null): string {
  return valor?.replace(',', '.') || '';
}

async function enviarFaturaParaAPI(fatura: any) {
  try {
    const response = await axios.post('http://localhost:3000/faturas/', fatura);
    console.log('Fatura enviada com sucesso:', response.data);
  } catch (error) {
    if (error instanceof axios.AxiosError) {
      console.error('Erro de rede:', error);
    } else {
      console.error('Erro inesperado:', error);
    }
  }
}

async function processPDF(filePath: string): Promise<void> {
  try {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdf(dataBuffer);

    const fatura = extrairFatura(data.text);
    const energiaDados = extrairEnergiaDados(data.text);

    // Mapeando os dados para o formato da API
    const dadosParaApi = {
      empresa: fatura.empresa,
      nomeCliente: fatura.nomeCliente,
      numeroCliente: fatura.numeroCliente,
      instalacao: fatura.instalacao,
      mesReferencia: fatura.mesReferencia,
      vencimento: fatura.vencimento,
      valorAPagar: formatValor(fatura.valorAPagar),
      energiaEletricaQtd: formatValor(energiaDados.find(e => e.tipo === 'Energia Elétrica')?.quantidade),
      energiaEletricaValor: formatValor(energiaDados.find(e => e.tipo === 'Energia Elétrica')?.valor),
      energiaSCEESICMSQtd: formatValor(energiaDados.find(e => e.tipo === 'Energia SCEE s/ ICMS')?.quantidade),
      energiaSCEESICMSValor: formatValor(energiaDados.find(e => e.tipo === 'Energia SCEE s/ ICMS')?.valor),
      energiaCompensadaQtd: formatValor(energiaDados.find(e => e.tipo === 'Energia compensada GD I')?.quantidade),
      energiaCompensadaValor: formatValor(energiaDados.find(e => e.tipo === 'Energia compensada GD I')?.valor),
      cosipValor: formatValor(energiaDados.find(e => e.tipo === 'Contrib Ilum Publica Municipal')?.valor)
    };

    // Enviando os dados para a API
    await enviarFaturaParaAPI(dadosParaApi);

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

async function processAllPDFs(directory: string) {
  const files = await fs.promises.readdir(directory, { withFileTypes: true });

  for (const file of files) {
    const filePath = path.join(directory, file.name);

    if (file.isDirectory())  

 {
      // Se for um diretório, chama recursivamente a função para processar os arquivos dentro dele
      await processAllPDFs(filePath);
    } else if (path.extname(filePath) === '.pdf') {
      // Se for um arquivo PDF, processa o arquivo
      console.log(`Processando arquivo: ${filePath}`);
      await processPDF(filePath);
    }
  }
}

// Chamada da função para processar todos os PDFs a partir do diretório 'faturas'
processAllPDFs('./src/parser/faturas');

