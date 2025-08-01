import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/ui/logo';
import { Bell, User, LogOut } from 'lucide-react';

const NavbarCivil = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('usuario');
    navigate('/login');
  };

  const goToPerfil = () => {
    navigate('/perfil');
  };

  return (
    <header className='bg-white border-b border-border shadow-sm'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          <Logo size='sm' />

          <div className='flex items-center gap-4'>
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

export default NavbarCivil;
