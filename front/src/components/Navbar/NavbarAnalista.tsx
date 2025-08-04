import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/ui/logo';
import { Bell, User, LogOut, AlertTriangle } from 'lucide-react';

interface Usuario {
  id: number;
  nomeCompleto: string;
  email: string;
  tipo: string;
}

const NavbarAnalista = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('usuario');
    if (storedUser) {
      setUsuario(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('usuario');
    navigate('/login');
  };

  const goToPerfil = () => {
    navigate('/perfil');
  };

  const goToPainel = () => {
    navigate('/painel-alertas');
  };

  return (
    <header className='bg-white border-b border-border shadow-sm'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          <Logo size='xl' />

          <div className='flex items-center gap-4'>
            <Button variant='ghost' size='sm' onClick={goToPainel}>
              <AlertTriangle className='h-4 w-4 mr-2' />
              Painel
            </Button>

            <Button variant='ghost' size='sm'>
              <Bell className='h-4 w-4 mr-2' />
              Notificações
            </Button>

            <div className='flex items-center gap-2'>
              <Button variant='ghost' size='sm' onClick={goToPerfil}>
                <User className='h-4 w-4 mr-2' />
                Perfil
              </Button>

              <Button variant='ghost' size='sm' onClick={handleLogout}>
                <LogOut className='h-4 w-4 mr-2' />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavbarAnalista;
