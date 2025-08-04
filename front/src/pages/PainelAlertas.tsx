import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Search, Eye, AlertTriangle } from 'lucide-react';
import api from '@/lib/api';
import NavbarAnalista from '@/components/Navbar/NavbarAnalista';

interface Alerta {
  id: number;
  urlImagem: string;
  descricao: string;
  endereco: string;
  dataEnvio: string;
  status: string;
  usuario: {
    nomeCompleto: string;
  };
}

const PainelAlertas = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [alertas, setAlertas] = useState<Alerta[]>([]);

  useEffect(() => {
    const storedUser = localStorage.getItem('usuario');
    if (!storedUser) {
      navigate('/login');
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    if (parsedUser.tipo !== 'ANALISTA') {
      navigate('/notfound');
      return;
    }

    api
      .get('/alertas')
      .then((res) => setAlertas(res.data))
      .catch((err) => {
        console.error('Erro ao buscar alertas:', err);
        setAlertas([]);
      });
  }, [navigate]);

  const filteredAlertas = alertas.filter(
    (alerta) =>
      alerta.usuario.nomeCompleto
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      alerta.endereco.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pendentes = alertas.filter((a) => a.status === 'PENDENTE').length;

  return (
    <div className='min-h-screen bg-background'>
      <NavbarAnalista />

      <div className='max-w-7xl mx-auto px-4 py-6'>
        {/* Header */}
        <Card className='mb-6 shadow-elegant'>
          <CardHeader>
            <CardTitle className='text-2xl text-primary flex items-center gap-2'>
              <AlertTriangle className='h-6 w-6' />
              Painel de Análise de Riscos
            </CardTitle>
            <div className='flex items-center gap-4 text-sm text-muted-foreground'>
              <span>Total de alertas: {alertas.length}</span>
              <Badge variant='destructive' className='flex items-center gap-1'>
                {pendentes} Pendentes
              </Badge>
            </div>
          </CardHeader>
        </Card>

        {/* Filtros */}
        <Card className='mb-6'>
          <CardContent className='pt-6'>
            <div className='flex gap-4 items-center'>
              <div className='flex-1 relative'>
                <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground' />
                <Input
                  placeholder='Buscar por cidadão ou endereço...'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className='pl-10'
                />
              </div>
              <Button variant='outline'>Filtros</Button>
            </div>
          </CardContent>
        </Card>

        {/* Tabela de Alertas */}
        <Card className='shadow-elegant'>
          <CardContent className='p-0'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Imagem</TableHead>
                  <TableHead>Cidadão</TableHead>
                  <TableHead>Endereço</TableHead>
                  <TableHead>Data de Envio</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className='text-right'>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAlertas.map((alerta) => (
                  <TableRow key={alerta.id} className='hover:bg-muted/50'>
                    <TableCell>
                      <div className='w-16 h-16 bg-muted rounded-lg flex items-center justify-center overflow-hidden'>
                        <img
                          src={
                            alerta.urlImagem
                              ? `http://localhost:8080${alerta.urlImagem}`
                              : '/placeholder.svg'
                          }
                          alt='Alerta'
                          className='w-full h-full object-cover'
                        />
                      </div>
                    </TableCell>
                    <TableCell className='font-medium'>
                      {alerta.usuario.nomeCompleto}
                    </TableCell>
                    <TableCell>{alerta.endereco}</TableCell>
                    <TableCell>
                      {new Date(alerta.dataEnvio).toLocaleDateString('pt-BR')}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          alerta.status === 'PENDENTE'
                            ? 'destructive'
                            : 'default'
                        }
                      >
                        {alerta.status}
                      </Badge>
                    </TableCell>
                    <TableCell className='text-right'>
                      <Button
                        size='sm'
                        onClick={() => navigate(`/analise-alerta/${alerta.id}`)}
                        className='flex items-center gap-1'
                      >
                        <Eye className='h-4 w-4' />
                        Analisar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {filteredAlertas.length === 0 && (
          <div className='text-center py-8 text-muted-foreground'>
            Nenhum alerta encontrado com os filtros aplicados.
          </div>
        )}
      </div>
    </div>
  );
};

export default PainelAlertas;
