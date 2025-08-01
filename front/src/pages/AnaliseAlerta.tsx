import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Calendar, User, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AnaliseAlerta = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  
  const [classificacao, setClassificacao] = useState("");
  const [observacoes, setObservacoes] = useState("");

  // Dados simulados do alerta
  const alerta = {
    id: id,
    imagem: "/placeholder.svg",
    cidadao: "Maria Silva",
    endereco: "Rua das Flores, 123 - Centro, São Paulo - SP",
    pontoReferencia: "Próximo ao mercado Municipal",
    descricao: "Buraco grande na via que está causando acidentes. A situação piorou após as chuvas da semana passada e vários carros já danificaram pneus neste local.",
    dataEnvio: "2024-01-15",
    status: "Pendente"
  };

  const handleConcluirAvaliacao = () => {
    if (!classificacao) {
      toast({
        title: "Erro",
        description: "Por favor, selecione a classificação de risco.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Avaliação concluída!",
      description: "O alerta foi analisado e classificado com sucesso.",
    });
    navigate("/painel-alertas");
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Baixo": return "bg-success text-success-foreground";
      case "Médio": return "bg-warning text-warning-foreground";
      case "Alto": return "bg-destructive text-destructive-foreground";
      case "Crítico": return "bg-red-600 text-white";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <Card className="mb-6 shadow-elegant">
          <CardHeader>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate("/painel-alertas")}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Voltar
              </Button>
              <CardTitle className="text-2xl text-primary">
                Análise Detalhada do Alerta #{alerta.id}
              </CardTitle>
              <Badge variant="destructive">
                {alerta.status}
              </Badge>
            </div>
          </CardHeader>
        </Card>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Coluna Esquerda - Informações do Alerta */}
          <div className="space-y-6">
            {/* Imagem */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Imagem do Local</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="w-full h-64 bg-muted rounded-lg overflow-hidden">
                  <img
                    src={alerta.imagem}
                    alt="Local do alerta"
                    className="w-full h-full object-cover"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Informações */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Informações do Alerta</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <User className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Cidadão</p>
                    <p className="text-muted-foreground">{alerta.cidadao}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Endereço</p>
                    <p className="text-muted-foreground">{alerta.endereco}</p>
                    {alerta.pontoReferencia && (
                      <p className="text-sm text-muted-foreground italic">
                        Referência: {alerta.pontoReferencia}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Data de Envio</p>
                    <p className="text-muted-foreground">
                      {new Date(alerta.dataEnvio).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FileText className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Descrição</p>
                    <p className="text-muted-foreground">{alerta.descricao}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Mapa Simulado */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Localização no Mapa</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="w-full h-48 bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <MapPin className="h-8 w-8 mx-auto mb-2" />
                    <p>Mapa interativo será implementado</p>
                    <p className="text-sm">Localização: {alerta.endereco}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Coluna Direita - Análise */}
          <div className="space-y-6">
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="text-lg text-primary">Avaliação de Risco</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Classificação de Risco */}
                <div className="space-y-2">
                  <Label htmlFor="classificacao">
                    Classificação de Risco <span className="text-destructive">*</span>
                  </Label>
                  <Select value={classificacao} onValueChange={setClassificacao}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o nível de risco" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Baixo">Baixo</SelectItem>
                      <SelectItem value="Médio">Médio</SelectItem>
                      <SelectItem value="Alto">Alto</SelectItem>
                      <SelectItem value="Crítico">Crítico</SelectItem>
                    </SelectContent>
                  </Select>
                  {classificacao && (
                    <Badge className={getRiskColor(classificacao)}>
                      Risco {classificacao}
                    </Badge>
                  )}
                </div>

                {/* Observações */}
                <div className="space-y-2">
                  <Label htmlFor="observacoes">Observações do Analista</Label>
                  <Textarea
                    id="observacoes"
                    value={observacoes}
                    onChange={(e) => setObservacoes(e.target.value)}
                    placeholder="Adicione suas observações sobre o risco analisado, recomendações de ação, prioridade de atendimento..."
                    rows={6}
                  />
                </div>

                {/* Botões de Ação */}
                <div className="space-y-3 pt-4">
                  <Button
                    onClick={handleConcluirAvaliacao}
                    className="w-full"
                    size="lg"
                  >
                    Concluir Avaliação
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => navigate("/painel-alertas")}
                    className="w-full"
                  >
                    Cancelar
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Informações Adicionais */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Diretrizes de Classificação</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex gap-2">
                  <Badge className="bg-success text-success-foreground">Baixo</Badge>
                  <span className="text-muted-foreground">Riscos menores, manutenção preventiva</span>
                </div>
                <div className="flex gap-2">
                  <Badge className="bg-warning text-warning-foreground">Médio</Badge>
                  <span className="text-muted-foreground">Requer atenção, prazo de 30 dias</span>
                </div>
                <div className="flex gap-2">
                  <Badge className="bg-destructive text-destructive-foreground">Alto</Badge>
                  <span className="text-muted-foreground">Ação urgente, prazo de 7 dias</span>
                </div>
                <div className="flex gap-2">
                  <Badge className="bg-red-600 text-white">Crítico</Badge>
                  <span className="text-muted-foreground">Emergência, ação imediata</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnaliseAlerta;