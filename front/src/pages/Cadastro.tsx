import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Logo } from '@/components/ui/logo';
import { Eye, EyeOff, User, Mail, Lock, UserCheck } from 'lucide-react';
import api from '@/lib/api';

export default function Cadastro() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    tipoUsuario: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.senha !== formData.confirmarSenha) {
      alert('As senhas não coincidem!');
      return;
    }

    try {
      const response = await api.post('/usuarios', {
        nomeCompleto: formData.nome,
        email: formData.email,
        senha: formData.senha,
        tipo: formData.tipoUsuario, // já está como "CIDADAO", "ANALISTA", "ADMIN"
      });

      alert('Cadastro realizado com sucesso!');
      navigate('/login'); // redireciona para a página de login
    } catch (error) {
      alert('Erro ao cadastrar. Verifique os dados.');
      console.error('Erro ao cadastrar:', error);
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-primary/10 via-background to-success/5 flex items-center justify-center p-4'>
      <div className='w-full max-w-md space-y-8'>
        {/* Logo e Header */}
        <div className='text-center'>
          <Logo size='lg' className='justify-center' />
          <h1 className='mt-4 text-3xl font-bold text-foreground'>
            Criar Conta
          </h1>
          <p className='mt-2 text-muted-foreground'>
            Registre-se para começar a monitorar alertas de risco
          </p>
        </div>

        {/* Card de Cadastro */}
        <Card className='shadow-lg border-0 bg-card/50 backdrop-blur-sm'>
          <CardHeader>
            <CardTitle className='text-xl text-center'>Cadastrar</CardTitle>
            <CardDescription className='text-center'>
              Preencha os dados para criar sua conta
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className='space-y-4'>
              {/* Nome Completo */}
              <div className='space-y-2'>
                <Label htmlFor='nome'>Nome completo</Label>
                <div className='relative'>
                  <User className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
                  <Input
                    id='nome'
                    type='text'
                    placeholder='Seu nome completo'
                    value={formData.nome}
                    onChange={(e) => handleInputChange('nome', e.target.value)}
                    className='pl-10'
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className='space-y-2'>
                <Label htmlFor='email'>Email</Label>
                <div className='relative'>
                  <Mail className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
                  <Input
                    id='email'
                    type='email'
                    placeholder='seu@email.com'
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className='pl-10'
                    required
                  />
                </div>
              </div>

              {/* Tipo de Usuário */}
              <div className='space-y-2'>
                <Label htmlFor='tipoUsuario'>Tipo de usuário</Label>
                <div className='relative'>
                  <UserCheck className='absolute left-3 top-3 h-4 w-4 text-muted-foreground z-10' />
                  <Select
                    value={formData.tipoUsuario}
                    onValueChange={(value) =>
                      handleInputChange('tipoUsuario', value)
                    }
                  >
                    <SelectTrigger className='pl-10'>
                      <SelectValue placeholder='Selecione o tipo de usuário' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='CIDADAO'>Civil (Cidadão)</SelectItem>
                      <SelectItem value='ANALISTA'>
                        Analista (Defesa Civil)
                      </SelectItem>
                      <SelectItem value='ADMIN'>Administrador</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Senha */}
              <div className='space-y-2'>
                <Label htmlFor='senha'>Senha</Label>
                <div className='relative'>
                  <Lock className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
                  <Input
                    id='senha'
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Digite sua senha'
                    value={formData.senha}
                    onChange={(e) => handleInputChange('senha', e.target.value)}
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

              {/* Confirmar Senha */}
              <div className='space-y-2'>
                <Label htmlFor='confirmarSenha'>Confirmar senha</Label>
                <div className='relative'>
                  <Lock className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
                  <Input
                    id='confirmarSenha'
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder='Confirme sua senha'
                    value={formData.confirmarSenha}
                    onChange={(e) =>
                      handleInputChange('confirmarSenha', e.target.value)
                    }
                    className='pl-10 pr-10'
                    required
                  />
                  <button
                    type='button'
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className='absolute right-3 top-3 text-muted-foreground hover:text-foreground'
                  >
                    {showConfirmPassword ? (
                      <EyeOff className='h-4 w-4' />
                    ) : (
                      <Eye className='h-4 w-4' />
                    )}
                  </button>
                </div>
              </div>

              {/* Botão Cadastrar */}
              <Button type='submit' className='w-full' size='lg'>
                Cadastrar
              </Button>
            </form>

            {/* Link para Login */}
            <div className='mt-6 text-center'>
              <p className='text-sm text-muted-foreground'>
                Já tem conta?{' '}
                <Link
                  to='/login'
                  className='font-medium text-primary hover:text-primary-hover underline'
                >
                  Faça login
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
