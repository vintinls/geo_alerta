import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, AlertTriangle } from 'lucide-react';
import api from '@/lib/api';
import NavbarCivil from '@/components/Navbar/NavbarCivil';

interface Alerta {
  id: number;
  descricao: string;
  endereco: string;
  referencia: string;
  urlImagem: string;
  latitude: number;
  longitude: number;
  dataEnvio: string;
  status: string;
}

interface Usuario {
  id: number;
  nomeCompleto: string;
  email: string;
  tipo: string;
}

export default function Dashboard() {
  const [alertas, setAlertas] = useState<Alerta[]>([]);
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('usuario');
    if (!storedUser) {
      navigate('/login');
      return;
    }

    const parsedUser: Usuario = JSON.parse(storedUser);
    setUsuario(parsedUser);

    api
      .get(`/alertas/usuario/${parsedUser.id}`)
      .then((response) => setAlertas(response.data))
      .catch((error) => {
        console.error('Erro ao buscar alertas:', error);
        setAlertas([]);
      });
  }, [navigate]);

  const getStatusColor = (status: string) => {
    switch (status.toUpperCase()) {
      case 'PENDENTE':
        return 'warning';
      case 'AVALIADO':
        return 'success';
      default:
        return 'muted';
    }
  };

  return (
    <div className='min-h-screen bg-background'>
      {/* Navbar civil reaproveitada */}
      <NavbarCivil />

      {/* Conteúdo Principal */}
      <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {/* Boas-vindas */}
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-foreground mb-2'>
            Bem-vindo, {usuario?.nomeCompleto}!
          </h1>
          <p className='text-muted-foreground capitalize'>
            Você está logado como {usuario?.tipo.toLowerCase()}
          </p>
        </div>

        {/* Ação Principal */}
        <div className='mb-8'>
          <Card className='bg-gradient-to-r from-primary to-primary-hover text-primary-foreground'>
            <CardContent className='p-6'>
              <div className='flex items-center justify-between'>
                <div>
                  <h2 className='text-2xl font-bold mb-2'>
                    Registrar Novo Alerta
                  </h2>
                  <p className='opacity-90'>
                    Encontrou algo suspeito ou perigoso? Registre um alerta para
                    análise.
                  </p>
                </div>
                <Button
                  asChild
                  size='lg'
                  variant='secondary'
                  className='bg-white text-primary hover:bg-gray-100'
                >
                  <Link to='/novo-alerta'>
                    <Plus className='h-5 w-5 mr-2' />
                    Novo Alerta
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Seção Meus Alertas */}
        <div>
          <h2 className='text-2xl font-bold text-foreground mb-6'>
            Meus Alertas
          </h2>

          {alertas.length === 0 ? (
            <Card>
              <CardContent className='p-8 text-center'>
                <AlertTriangle className='h-12 w-12 text-muted-foreground mx-auto mb-4' />
                <h3 className='text-lg font-semibold mb-2'>
                  Nenhum alerta registrado
                </h3>
                <p className='text-muted-foreground mb-4'>
                  Você ainda não registrou nenhum alerta. Clique no botão acima
                  para começar.
                </p>
                <Button asChild>
                  <Link to='/novo-alerta'>
                    <Plus className='h-4 w-4 mr-2' />
                    Registrar Primeiro Alerta
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className='grid gap-4'>
              {alertas.map((alerta) => (
                <Card
                  key={alerta.id}
                  className='hover:shadow-md transition-shadow'
                >
                  <CardContent className='p-6 space-y-2'>
                    <div className='flex items-center gap-2 mb-2'>
                      <h3 className='font-semibold text-lg text-foreground'>
                        {alerta.descricao}
                      </h3>
                      <Badge variant={getStatusColor(alerta.status) as any}>
                        {alerta.status}
                      </Badge>
                    </div>

                    <p>
                      <strong>Referência:</strong> {alerta.referencia}
                    </p>
                    <p>
                      <strong>Endereço:</strong> {alerta.endereco}
                    </p>
                    <p>
                      <strong>Data de Envio:</strong>{' '}
                      {new Date(alerta.dataEnvio).toLocaleString('pt-BR')}
                    </p>
                    <p>
                      <strong>Latitude:</strong> {alerta.latitude}
                    </p>
                    <p>
                      <strong>Longitude:</strong> {alerta.longitude}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
