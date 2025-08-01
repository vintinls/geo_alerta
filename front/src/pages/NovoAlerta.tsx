import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { MapPin, Upload, Camera } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import NavbarCivil from '@/components/Navbar/NavbarCivil';

const NovoAlerta = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    imagem: null as File | null,
    endereco: '',
    pontoReferencia: '',
    descricao: '',
  });

  const [locationDetected, setLocationDetected] = useState(false);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData({ ...formData, imagem: file });
    }
  };

  const detectLocation = async () => {
    try {
      const position = await new Promise<GeolocationPosition>(
        (resolve, reject) =>
          navigator.geolocation.getCurrentPosition(resolve, reject)
      );

      const lat = position.coords.latitude.toString();
      const lon = position.coords.longitude.toString();

      setLatitude(lat);
      setLongitude(lon);
      setLocationDetected(true);

      toast({
        title: 'Localização detectada!',
        description: 'Latitude e longitude obtidas com sucesso.',
      });
    } catch (error) {
      console.error(error);
      toast({
        title: 'Erro ao detectar localização',
        description: 'Permita o acesso à localização ou tente novamente.',
        variant: 'destructive',
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.imagem) {
      toast({
        title: 'Erro',
        description: 'Por favor, adicione uma imagem do local.',
        variant: 'destructive',
      });
      return;
    }

    if (!latitude || !longitude) {
      toast({
        title: 'Erro',
        description: 'Por favor, detecte a localização antes de enviar.',
        variant: 'destructive',
      });
      return;
    }

    try {
      const usuarioStr = localStorage.getItem('usuario');
      if (!usuarioStr) throw new Error('Usuário não autenticado.');
      const usuario = JSON.parse(usuarioStr);
      const usuarioId = usuario.id;

      const formDataToSend = new FormData();
      formDataToSend.append('usuarioId', usuarioId);
      formDataToSend.append('imagem', formData.imagem);
      formDataToSend.append('descricao', formData.descricao);
      formDataToSend.append('endereco', formData.endereco);
      formDataToSend.append('referencia', formData.pontoReferencia);
      formDataToSend.append('latitude', latitude);
      formDataToSend.append('longitude', longitude);

      await axios.post('http://localhost:8080/alertas', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast({
        title: 'Alerta enviado!',
        description: 'Seu alerta foi registrado e será analisado em breve.',
      });

      navigate('/dashboard');
    } catch (error) {
      console.error(error);
      toast({
        title: 'Erro ao enviar alerta',
        description: 'Tente novamente mais tarde.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-background to-secondary/20 flex flex-col'>
      {/* Navbar reutilizada */}
      <NavbarCivil />

      <main className='flex-1 p-4'>
        <div className='max-w-2xl mx-auto'>
          <Card className='shadow-elegant'>
            <CardHeader className='text-center'>
              <CardTitle className='text-2xl text-primary flex items-center justify-center gap-2'>
                <Camera className='h-6 w-6' />
                Registrar Novo Alerta de Risco
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className='space-y-6'>
                {/* Upload de Imagem */}
                <div className='space-y-2'>
                  <Label>
                    Imagem do Local <span className='text-destructive'>*</span>
                  </Label>
                  <div className='border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors'>
                    <input
                      type='file'
                      accept='image/*'
                      onChange={handleImageUpload}
                      className='hidden'
                      id='image-upload'
                    />
                    <label htmlFor='image-upload' className='cursor-pointer'>
                      <Upload className='h-8 w-8 mx-auto mb-2 text-muted-foreground' />
                      <p className='text-sm text-muted-foreground'>
                        {formData.imagem
                          ? formData.imagem.name
                          : 'Clique para adicionar uma foto'}
                      </p>
                    </label>
                  </div>
                </div>

                {/* Localização */}
                <div className='space-y-4'>
                  <div className='flex gap-4'>
                    <Button
                      type='button'
                      variant='outline'
                      onClick={detectLocation}
                    >
                      <MapPin className='h-4 w-4' />
                      Detectar Localização
                    </Button>
                    {locationDetected && (
                      <span className='text-sm text-success flex items-center'>
                        ✓ Latitude/Longitude detectadas
                      </span>
                    )}
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='endereco'>Endereço</Label>
                    <Input
                      id='endereco'
                      value={formData.endereco}
                      onChange={(e) =>
                        setFormData({ ...formData, endereco: e.target.value })
                      }
                      placeholder='Digite o endereço manualmente'
                    />
                  </div>
                </div>

                {/* Ponto de Referência */}
                <div className='space-y-2'>
                  <Label htmlFor='referencia'>
                    Ponto de Referência (opcional)
                  </Label>
                  <Input
                    id='referencia'
                    value={formData.pontoReferencia}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        pontoReferencia: e.target.value,
                      })
                    }
                    placeholder='Ex: Próximo ao mercado, em frente à escola...'
                  />
                </div>

                {/* Descrição */}
                <div className='space-y-2'>
                  <Label htmlFor='descricao'>Descrição Adicional</Label>
                  <Textarea
                    id='descricao'
                    value={formData.descricao}
                    onChange={(e) =>
                      setFormData({ ...formData, descricao: e.target.value })
                    }
                    placeholder='Descreva o risco observado, como buracos, alagamentos, etc.'
                    rows={4}
                  />
                </div>

                {/* Botões */}
                <div className='flex gap-4 pt-4'>
                  <Button
                    type='button'
                    variant='outline'
                    onClick={() => navigate('/dashboard')}
                    className='flex-1'
                  >
                    Cancelar
                  </Button>
                  <Button type='submit' className='flex-1'>
                    Enviar Alerta
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default NovoAlerta;
