import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useToast } from "@/hooks/use-toast";
import { 
  Users, 
  Plus, 
  Edit, 
  Trash2, 
  BarChart3, 
  PieChart, 
  AlertTriangle,
  Home,
  FileText,
  LogOut,
  Search
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart as RechartsPieChart, Cell } from "recharts";
import { NavLink, useNavigate } from "react-router-dom";

const PainelAdmin = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  const usuarios = [
    { id: 1, nome: "João Silva", email: "joao@email.com", tipo: "Civil" },
    { id: 2, nome: "Maria Santos", email: "maria@email.com", tipo: "Analista" },
    { id: 3, nome: "Pedro Costa", email: "pedro@email.com", tipo: "Admin" },
    { id: 4, nome: "Ana Oliveira", email: "ana@email.com", tipo: "Civil" },
  ];

  const alertasPorRisco = [
    { risco: "Baixo", total: 15 },
    { risco: "Médio", total: 23 },
    { risco: "Alto", total: 8 },
    { risco: "Crítico", total: 3 }
  ];

  const alertasPorStatus = [
    { status: "Pendente", total: 32, color: "#f59e0b" },
    { status: "Analisado", total: 17, color: "#10b981" }
  ];

  const menuItems = [
    { title: "Dashboard", url: "/dashboard", icon: Home },
    { title: "Alertas", url: "/painel-alertas", icon: AlertTriangle },
    { title: "Usuários", url: "/painel-admin", icon: Users },
    { title: "Relatórios", url: "/relatorios", icon: FileText },
  ];

  const filteredUsuarios = usuarios.filter(user =>
    user.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteUser = (id: number) => {
    toast({
      title: "Usuário excluído",
      description: "O usuário foi removido do sistema."
    });
  };

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case "Admin": return "destructive";
      case "Analista": return "default";
      case "Civil": return "secondary";
      default: return "secondary";
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        {/* Sidebar */}
        <Sidebar className="w-64">
          <SidebarContent>
            <div className="p-4">
              <h2 className="text-lg font-semibold text-primary">Geo Alerta</h2>
              <p className="text-sm text-muted-foreground">Painel Admin</p>
            </div>
            
            <SidebarGroup>
              <SidebarGroupLabel>Menu Principal</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <NavLink 
                          to={item.url}
                          className={({ isActive }) =>
                            `flex items-center gap-2 ${isActive ? 'bg-primary text-primary-foreground' : ''}`
                          }
                        >
                          <item.icon className="h-4 w-4" />
                          {item.title}
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <div className="mt-auto p-4">
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => navigate("/login")}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sair
              </Button>
            </div>
          </SidebarContent>
        </Sidebar>

        {/* Main Content */}
        <main className="flex-1 bg-gradient-to-br from-blue-50 to-green-50">
          <header className="bg-white border-b p-4 flex items-center gap-4">
            <SidebarTrigger />
            <h1 className="text-2xl font-bold text-gray-900">Painel do Administrador</h1>
          </header>

          <div className="p-6 space-y-6">
            {/* Gerenciamento de Usuários */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Gerenciamento de Usuários
                </CardTitle>
                <CardDescription>
                  Gerencie os usuários do sistema
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar usuários..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Criar Novo Usuário
                  </Button>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>E-mail</TableHead>
                      <TableHead>Tipo de Usuário</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsuarios.map((usuario) => (
                      <TableRow key={usuario.id}>
                        <TableCell className="font-medium">{usuario.nome}</TableCell>
                        <TableCell>{usuario.email}</TableCell>
                        <TableCell>
                          <Badge variant={getTipoColor(usuario.tipo)}>
                            {usuario.tipo}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex gap-2 justify-end">
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleDeleteUser(usuario.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Estatísticas Gerais */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Alertas por Nível de Risco
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      total: {
                        label: "Total",
                        color: "hsl(var(--chart-1))",
                      },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={alertasPorRisco}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="risco" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="total" fill="hsl(var(--chart-1))" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5" />
                    Alertas por Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      pendente: {
                        label: "Pendente",
                        color: "#f59e0b",
                      },
                      analisado: {
                        label: "Analisado",
                        color: "#10b981",
                      },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <RechartsPieChart data={alertasPorStatus} cx="50%" cy="50%" outerRadius={80}>
                          {alertasPorStatus.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </RechartsPieChart>
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default PainelAdmin;