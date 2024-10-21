-- CreateTable
CREATE TABLE "Fatura" (
    "id" SERIAL NOT NULL,
    "empresa" TEXT NOT NULL,
    "nomeCliente" TEXT NOT NULL,
    "numeroCliente" TEXT NOT NULL,
    "instalacao" TEXT NOT NULL,
    "mesReferencia" TEXT NOT NULL,
    "vencimento_data" TIMESTAMP(3) NOT NULL,
    "valorAPagar" DECIMAL(65,30) NOT NULL,
    "energiaEletricaQtd" DECIMAL(65,30) NOT NULL,
    "energiaEletricaValor" DECIMAL(65,30) NOT NULL,
    "energiaSCEESICMSQtd" DECIMAL(65,30) NOT NULL,
    "energiaSCEESICMSValor" DECIMAL(65,30) NOT NULL,
    "energiaCompensadaQtd" DECIMAL(65,30) NOT NULL,
    "energiaCompensadaValor" DECIMAL(65,30) NOT NULL,
    "cosipValor" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "Fatura_pkey" PRIMARY KEY ("id")
);
