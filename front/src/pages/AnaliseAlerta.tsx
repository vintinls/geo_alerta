import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import api from '@/lib/api';
import HistoricoAnalises from '@/components/HistoricoAnalises';

interface Alerta {
  id: number;
  urlImagem: string;
  descricao: string;
  endereco: string;
  referencia: string;
  dataEnvio: string;
  status: string;
  latitude: number;
  longitude: number;
  usuario: {
    id: number;
    nomeCompleto: string;
  };
}

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

const AnaliseAlerta = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();

  const [alerta, setAlerta] = useState<Alerta | null>(null);
  const [classificacao, setClassificacao] = useState('');
  const [etapa, setEtapa] = useState(''); // NOVO
  const [observacoes, setObservacoes] = useState('');
  const [historicoAnalises, setHistoricoAnalises] = useState<Analise[]>([]);

  useEffect(() => {
    api
      .get(`/alertas/${id}`)
      .then((res) => setAlerta(res.data))
      .catch(() =>
        toast({
          title: 'Erro',
          description: 'Não foi possível carregar o alerta.',
          variant: 'destructive',
        })
      );

    api
      .get(`/analises/alerta/${id}`)
      .then((res) => setHistoricoAnalises(res.data))
      .catch(() =>
        toast({
          title: 'Erro',
          description: 'Não foi possível carregar o histórico.',
          variant: 'destructive',
        })
      );
  }, [id, toast]);

  const handleConcluirAvaliacao = async () => {
    if (!classificacao || !etapa) {
      toast({
        title: 'Erro',
        description: 'Selecione o nível de risco e a etapa.',
        variant: 'destructive',
      });
      return;
    }

    try {
      const storedUser = localStorage.getItem('usuario');
      if (!storedUser) throw new Error('Usuário não autenticado');
      const user = JSON.parse(storedUser);

      await api.post('/analises', {
        alertaId: Number(id),
        analistaId: user.id,
        nivelRisco: classificacao,
        observacoes: observacoes,
        etapa: etapa,
      });

      await api.put(`/analises/${id}/status`, {
        status: 'AVALIADO',
      });

      toast({
        title: 'Análise salva!',
        description: 'A nova avaliação foi registrada com sucesso.',
      });

      navigate('/painel-alertas');
    } catch (err) {
      console.error(err);
      toast({
        title: 'Erro ao concluir análise',
        description: 'Tente novamente.',
        variant: 'destructive',
      });
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Baixo':
        return 'bg-green-500 text-white';
      case 'Médio':
        return 'bg-yellow-500 text-white';
      case 'Alto':
        return 'bg-orange-500 text-white';
      case 'Crítico':
        return 'bg-red-600 text-white';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  if (!alerta) {
    return (
      <div className='p-6 text-center text-muted-foreground'>Carregando...</div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-background to-secondary/20 p-4'>
      <div className='max-w-6xl mx-auto'>
        <Card className='mb-6 shadow-elegant'>
          <CardHeader>
            <div className='flex items-center gap-4'>
              <Button
                variant='outline'
                size='sm'
                onClick={() => navigate('/painel-alertas')}
              >
                <ArrowLeft className='h-4 w-4' />
                Voltar
              </Button>
              <CardTitle className='text-2xl text-primary'>
                Análise Detalhada do Alerta #{alerta.id}
              </CardTitle>
              <Badge variant='destructive'>{alerta.status}</Badge>
            </div>
          </CardHeader>
        </Card>

        <div className='grid lg:grid-cols-2 gap-6'>
          {/* ESQUERDA */}
          <div className='space-y-6'>
            <Card>
              <CardHeader>
                <CardTitle>Imagem do Local</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='w-full h-64 bg-muted rounded-lg overflow-hidden'>
                  <img
                    src={
                      alerta.urlImagem
                        ? `http://localhost:8080${alerta.urlImagem}`
                        : '/placeholder.svg'
                    }
                    alt='Local do alerta'
                    className='w-full h-full object-cover'
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Informações do Alerta</CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <p>
                  <strong>Endereço:</strong> {alerta.endereco}
                </p>
                <p>
                  <strong>Referência:</strong> {alerta.referencia}
                </p>
                <p>
                  <strong>Data:</strong>{' '}
                  {new Date(alerta.dataEnvio).toLocaleDateString('pt-BR')}
                </p>
                <p>
                  <strong>Descrição:</strong> {alerta.descricao}
                </p>
                <p>
                  <strong>Cidadão:</strong> {alerta.usuario.nomeCompleto}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Localização</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Latitude: {alerta.latitude}</p>
                <p>Longitude: {alerta.longitude}</p>
              </CardContent>
            </Card>
          </div>

          {/* DIREITA */}
          <div className='space-y-6'>
            <Card>
              <CardHeader>
                <CardTitle>Nova Avaliação</CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <Label>Classificação de Risco</Label>
                <Select value={classificacao} onValueChange={setClassificacao}>
                  <SelectTrigger>
                    <SelectValue placeholder='Selecione' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='Baixo'>Baixo</SelectItem>
                    <SelectItem value='Médio'>Médio</SelectItem>
                    <SelectItem value='Alto'>Alto</SelectItem>
                    <SelectItem value='Crítico'>Crítico</SelectItem>
                  </SelectContent>
                </Select>

                <Label>Etapa da Análise</Label>
                <Select value={etapa} onValueChange={setEtapa}>
                  <SelectTrigger>
                    <SelectValue placeholder='Selecione a etapa' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='EM_ANALISE'>Em Análise</SelectItem>
                    <SelectItem value='EM_PROCESSO_DE_VISITA'>
                      Em processo de visita
                    </SelectItem>
                    <SelectItem value='AGUARDANDO_NOVA_VISTORIA'>
                      Aguardando nova vistoria
                    </SelectItem>
                    <SelectItem value='CONCLUIDO'>Concluído</SelectItem>
                  </SelectContent>
                </Select>

                <Label>Observações</Label>
                <Textarea
                  value={observacoes}
                  onChange={(e) => setObservacoes(e.target.value)}
                  placeholder='Ex: necessidade de visita técnica...'
                  rows={5}
                />

                <Button
                  onClick={handleConcluirAvaliacao}
                  className='w-full mt-4'
                >
                  Concluir Avaliação
                </Button>
              </CardContent>
            </Card>

            <HistoricoAnalises
              analises={historicoAnalises}
              getRiskColor={getRiskColor}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnaliseAlerta;
