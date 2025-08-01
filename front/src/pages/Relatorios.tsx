import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { 
  FileText, 
  Calendar, 
  MapPin, 
  Filter,
  TrendingUp,
  BarChart3,
  Download
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

const Relatorios = () => {
  const [periodo, setPeriodo] = useState("30");
  const [tipoRisco, setTipoRisco] = useState("todos");
  const [localizacao, setLocalizacao] = useState("todas");

  const alertasTempoData = [
    { data: "Jan", alertas: 12 },
    { data: "Fev", alertas: 19 },
    { data: "Mar", alertas: 15 },
    { data: "Abr", alertas: 25 },
    { data: "Mai", alertas: 22 },
    { data: "Jun", alertas: 30 },
    { data: "Jul", alertas: 28 }
  ];

  const alertasPorBairro = [
    { bairro: "Centro", total: 45, criticos: 3, altos: 8, medios: 20, baixos: 14 },
    { bairro: "Vila Nova", total: 32, criticos: 1, altos: 5, medios: 15, baixos: 11 },
    { bairro: "Jardim das Flores", total: 28, criticos: 2, altos: 6, medios: 12, baixos: 8 },
    { bairro: "São Pedro", total: 23, criticos: 0, altos: 4, medios: 10, baixos: 9 },
    { bairro: "Industrial", total: 19, criticos: 1, altos: 3, medios: 8, baixos: 7 }
  ];

  const pontosNoMapa = [
    { id: 1, lat: -23.5505, lng: -46.6333, risco: "alto", descricao: "Deslizamento" },
    { id: 2, lat: -23.5489, lng: -46.6388, risco: "medio", descricao: "Alagamento" },
    { id: 3, lat: -23.5520, lng: -46.6290, risco: "critico", descricao: "Rachadura" },
    { id: 4, lat: -23.5475, lng: -46.6355, risco: "baixo", descricao: "Erosão" }
  ];

  const getRiscoColor = (risco: string) => {
    switch (risco) {
      case "critico": return "bg-red-500";
      case "alto": return "bg-orange-500";
      case "medio": return "bg-yellow-500";
      case "baixo": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const getRiscoBadge = (risco: string) => {
    switch (risco) {
      case "critico": return "destructive";
      case "alto": return "destructive";
      case "medio": return "secondary";
      case "baixo": return "default";
      default: return "secondary";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              <FileText className="h-8 w-8" />
              Relatórios de Alertas
            </h1>
            <p className="text-gray-600 mt-1">Análise detalhada de dados de risco urbano</p>
          </div>
          
          <Button className="self-start">
            <Download className="h-4 w-4 mr-2" />
            Exportar Relatório
          </Button>
        </div>

        {/* Filtros */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filtros de Análise
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Período
                </label>
                <Select value={periodo} onValueChange={setPeriodo}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">Últimos 7 dias</SelectItem>
                    <SelectItem value="30">Últimos 30 dias</SelectItem>
                    <SelectItem value="90">Últimos 3 meses</SelectItem>
                    <SelectItem value="todos">Todos os períodos</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Tipo de Risco</label>
                <Select value={tipoRisco} onValueChange={setTipoRisco}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos os tipos</SelectItem>
                    <SelectItem value="critico">Crítico</SelectItem>
                    <SelectItem value="alto">Alto</SelectItem>
                    <SelectItem value="medio">Médio</SelectItem>
                    <SelectItem value="baixo">Baixo</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Localização
                </label>
                <Select value={localizacao} onValueChange={setLocalizacao}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todas">Todas as regiões</SelectItem>
                    <SelectItem value="centro">Centro</SelectItem>
                    <SelectItem value="vila-nova">Vila Nova</SelectItem>
                    <SelectItem value="jardim">Jardim das Flores</SelectItem>
                    <SelectItem value="sao-pedro">São Pedro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Gráfico de Linha - Alertas ao Longo do Tempo */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Alertas ao Longo do Tempo
            </CardTitle>
            <CardDescription>
              Número de alertas enviados por período
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                alertas: {
                  label: "Alertas",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-[400px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={alertasTempoData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="data" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line 
                    type="monotone" 
                    dataKey="alertas" 
                    stroke="hsl(var(--chart-1))" 
                    strokeWidth={3}
                    dot={{ fill: "hsl(var(--chart-1))", strokeWidth: 2, r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Mapa Interativo Simulado */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Mapa de Alertas
              </CardTitle>
              <CardDescription>
                Distribuição geográfica dos alertas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-br from-blue-100 to-green-100 rounded-lg h-[400px] relative overflow-hidden">
                {/* Simulação de Mapa */}
                <div className="absolute inset-4 bg-white/50 rounded-lg p-4">
                  <div className="text-center text-gray-600 mb-4">
                    <MapPin className="h-8 w-8 mx-auto mb-2" />
                    <p className="font-medium">Mapa Interativo</p>
                    <p className="text-sm">Distribuição de alertas por GPS</p>
                  </div>
                  
                  {/* Pontos simulados no mapa */}
                  <div className="space-y-2">
                    {pontosNoMapa.map((ponto) => (
                      <div key={ponto.id} className="flex items-center gap-2 text-sm">
                        <div className={`w-3 h-3 rounded-full ${getRiscoColor(ponto.risco)}`}></div>
                        <span className="flex-1">{ponto.descricao}</span>
                        <Badge variant={getRiscoBadge(ponto.risco)} className="text-xs">
                          {ponto.risco}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Lista Resumo por Bairro */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Alertas por Bairro
              </CardTitle>
              <CardDescription>
                Resumo estatístico por região
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alertasPorBairro.map((bairro, index) => (
                  <div key={index} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg">{bairro.bairro}</h3>
                      <Badge variant="outline" className="text-lg font-bold">
                        {bairro.total}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-4 gap-2 text-sm">
                      <div className="text-center">
                        <div className="text-red-600 font-semibold">{bairro.criticos}</div>
                        <div className="text-gray-500">Críticos</div>
                      </div>
                      <div className="text-center">
                        <div className="text-orange-600 font-semibold">{bairro.altos}</div>
                        <div className="text-gray-500">Altos</div>
                      </div>
                      <div className="text-center">
                        <div className="text-yellow-600 font-semibold">{bairro.medios}</div>
                        <div className="text-gray-500">Médios</div>
                      </div>
                      <div className="text-center">
                        <div className="text-green-600 font-semibold">{bairro.baixos}</div>
                        <div className="text-gray-500">Baixos</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Relatorios;