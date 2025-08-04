import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
import { Logo } from '@/components/ui/logo';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import api from '@/lib/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await api.post('/usuarios/login', {
        email,
        senha: password,
      });

      const usuario = response.data;
      console.log('Usuário autenticado:', usuario);

      // Salva no localStorage
      localStorage.setItem('usuario', JSON.stringify(usuario));

      // Redireciona com base no tipo
      switch (usuario.tipo) {
        case 'CIDADAO':
          navigate('/dashboard');
          break;
        case 'ANALISTA':
          navigate('/painel-alertas');
          break;
        case 'ADMIN':
          navigate('/paineladmin');
          break;
        default:
          alert('Tipo de usuário inválido!');
      }
    } catch (error) {
      alert('Email ou senha inválidos.');
      console.error('Erro ao fazer login:', error);
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-primary/10 via-background to-success/5 flex items-center justify-center p-4'>
      <div className='w-full max-w-md space-y-8'>
        {/* Logo e Header */}
        <div className='text-center'>
          <Logo size='lg' className='justify-center' />
          <h1 className='mt-4 text-3xl font-bold text-foreground'>Bem-vindo</h1>
          <p className='mt-2 text-muted-foreground'>
            Acesse sua conta para monitorar alertas de risco
          </p>
        </div>

        {/* Card de Login */}
        <Card className='shadow-lg border-0 bg-card/50 backdrop-blur-sm'>
          <CardHeader>
            <CardTitle className='text-xl text-center'>Entrar</CardTitle>
            <CardDescription className='text-center'>
              Digite suas credenciais para acessar o sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className='space-y-4'>
              {/* Campo Email */}
              <div className='space-y-2'>
                <Label htmlFor='email'>Email</Label>
                <div className='relative'>
                  <Mail className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
                  <Input
                    id='email'
                    type='email'
                    placeholder='seu@email.com'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='pl-10'
                    required
                  />
                </div>
              </div>

              {/* Campo Senha */}
              <div className='space-y-2'>
                <Label htmlFor='password'>Senha</Label>
                <div className='relative'>
                  <Lock className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
                  <Input
                    id='password'
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Digite sua senha'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='pl-10 pr-10'
                    required
                  />
                  <button
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute right-3 top-3 text-muted-foreground hover:text-foreground'
                  >
                    {showPassword ? (
                      <EyeOff className='h-4 w-4' />
                    ) : (
                      <Eye className='h-4 w-4' />
                    )}
                  </button>
                </div>
              </div>

              {/* Botão Entrar */}
              <Button type='submit' className='w-full' size='lg'>
                Entrar
              </Button>
            </form>

            {/* Link para Cadastro */}
            <div className='mt-6 text-center'>
              <p className='text-sm text-muted-foreground'>
                Não tem conta?{' '}
                <Link
                  to='/cadastro'
                  className='font-medium text-primary hover:text-primary-hover underline'
                >
                  Cadastre-se
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className='text-center text-xs text-muted-foreground'>
          <p>Sistema de Monitoramento de Riscos</p>
          <p className='mt-1'>Defesa Civil & Cidadãos</p>
        </div>
      </div>
    </div>
  );
}
