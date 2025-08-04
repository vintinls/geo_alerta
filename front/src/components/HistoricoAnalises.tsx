import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Analise {
  id: number;
  nivelRisco: string;
  observacoes: string;
  dataAnalise: string;
  analista: {
    nomeCompleto: string;
  };
  etapa: string; // NOVO
}

interface HistoricoAnalisesProps {
  analises: Analise[];
  getRiskColor: (risk: string) => string;
}

const HistoricoAnalises = ({
  analises,
  getRiskColor,
}: HistoricoAnalisesProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Histórico de Análises</CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        {analises.length === 0 ? (
          <p className='text-muted-foreground'>Nenhuma análise registrada.</p>
        ) : (
          analises.map((analise) => (
            <div key={analise.id} className='p-3 border rounded-lg space-y-1'>
              <p className='text-sm'>
                <strong>Data:</strong>{' '}
                {new Date(analise.dataAnalise).toLocaleString('pt-BR')}
              </p>
              <p className='text-sm'>
                <strong>Analista:</strong> {analise.analista?.nomeCompleto}
              </p>
              <p className='text-sm flex items-center gap-2'>
                <strong>Risco:</strong>{' '}
                <Badge className={getRiskColor(analise.nivelRisco)}>
                  {analise.nivelRisco}
                </Badge>
              </p>
              <p className='text-sm'>
                <strong>Etapa:</strong> {formatarEtapa(analise.etapa)}
              </p>
              <p className='text-sm'>
                <strong>Observações:</strong> {analise.observacoes}
              </p>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};

// Função para exibir etapa de forma mais amigável
const formatarEtapa = (etapa: string | undefined) => {
  switch (etapa) {
    case 'EM_PROCESSO_DE_VISITA':
      return 'Em processo de visita';
    case 'AGUARDANDO_NOVA_VISTORIA':
      return 'Aguardando nova vistoria';
    case 'CONCLUIDO':
      return 'Concluído';
    default:
      return '-';
  }
};

export default HistoricoAnalises;
