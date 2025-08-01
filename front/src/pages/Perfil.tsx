import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { User, Mail, Shield, Lock, LogOut, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '@/lib/api';
import NavbarCivil from '@/components/Navbar/NavbarCivil';

const Perfil = () => {
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmSenha, setConfirmSenha] = useState('');
  const [usuario, setUsuario] = useState<any>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem('usuario');
    if (!stored) return navigate('/login');

    const parsed = JSON.parse(stored);
    setUsuario(parsed);
    setNome(parsed.nomeCompleto);
  }, [navigate]);

  const handleSalvar = async () => {
    if (senha && senha !== confirmSenha) {
      toast({
        title: 'Erro',
        description: 'As senhas não coincidem',
        variant: 'destructive',
      });
      return;
    }

    try {
      const response = await api.put(`/usuarios/${usuario.id}`, {
        nomeCompleto: nome,
        senha: senha,
      });

      localStorage.setItem('usuario', JSON.stringify(response.data));
      setSenha('');
      setConfirmSenha('');

      toast({
        title: 'Sucesso',
        description: 'Perfil atualizado com sucesso!',
      });
    } catch (err) {
      toast({
        title: 'Erro',
        description: 'Não foi possível atualizar',
        variant: 'destructive',
      });
    }
  };

  const handleSair = () => {
    localStorage.removeItem('usuario');
    navigate('/login');
  };

  const handleVoltar = () => {
    navigate(-1);
  };

  const getInitials = (name: string) =>
    name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex flex-col'>
      <NavbarCivil />

      <div className='flex-1 p-4'>
        <div className='max-w-2xl mx-auto space-y-6'>
          <Button
            variant='ghost'
            className='mb-4 flex items-center gap-2 text-primary'
            onClick={handleVoltar}
          >
            <ArrowLeft className='h-4 w-4' />
            Voltar
          </Button>

          <div className='text-center mb-8'>
            <h1 className='text-3xl font-bold text-gray-900 mb-2'>
              Meu Perfil
            </h1>
            <p className='text-gray-600'>Gerencie suas informações pessoais</p>
          </div>

          <Card>
            <CardHeader className='text-center'>
              <div className='flex flex-col items-center space-y-4'>
                <Avatar className='h-24 w-24'>
                  <AvatarFallback className='text-lg font-semibold'>
                    {getInitials(nome)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className='text-2xl font-semibold'>{nome}</h2>
                  <p className='text-gray-600 flex items-center justify-center gap-2 mt-1'>
                    <Mail className='h-4 w-4' />
                    {usuario?.email}
                  </p>
                  <Badge variant='secondary' className='mt-2'>
                    <Shield className='h-3 w-3 mr-1' />
                    {usuario?.tipo}
                  </Badge>
                </div>
              </div>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <User className='h-5 w-5' />
                Editar Informações
              </CardTitle>
              <CardDescription>Atualize seus dados pessoais</CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='space-y-2'>
                <Label htmlFor='nome'>Nome Completo</Label>
                <Input
                  id='nome'
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder='Digite seu nome completo'
                />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='email'>E-mail</Label>
                <Input
                  id='email'
                  value={usuario?.email}
                  disabled
                  className='bg-gray-100'
                />
                <p className='text-sm text-gray-500'>
                  O e-mail não pode ser alterado
                </p>
              </div>

              <Separator />

              <div className='space-y-4'>
                <h3 className='text-lg font-medium flex items-center gap-2'>
                  <Lock className='h-4 w-4' />
                  Alterar Senha
                </h3>

                <div className='space-y-2'>
                  <Label htmlFor='senha'>Nova Senha</Label>
                  <Input
                    id='senha'
                    type='password'
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    placeholder='Digite sua nova senha'
                  />
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='confirmSenha'>Confirmar Nova Senha</Label>
                  <Input
                    id='confirmSenha'
                    type='password'
                    value={confirmSenha}
                    onChange={(e) => setConfirmSenha(e.target.value)}
                    placeholder='Confirme sua nova senha'
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className='flex flex-col sm:flex-row gap-4'>
            <Button onClick={handleSalvar} className='flex-1'>
              Salvar Alterações
            </Button>
            <Button
              variant='outline'
              onClick={handleSair}
              className='flex-1 text-red-600 border-red-200 hover:bg-red-50'
            >
              <LogOut className='h-4 w-4 mr-2' />
              Sair da Conta
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
