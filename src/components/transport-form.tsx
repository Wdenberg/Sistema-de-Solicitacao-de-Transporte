import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, Clock, Send, RotateCcw, Eye, FileText } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "@/hooks/use-toast";
import { TransportPreview } from "@/components/transport-preview";

// Lista completa de setores
const setores = [
  "BPE - BIBLIOTECA DO ESTADO",
  "CAC - COORDENAÇÃO DE AÇÕES CULTURAIS", 
  "CENSO - CONSELHO DE ALIMENTAÇÃO ESCOLAR DE PERNAMBUCO",
  "CENSO - COORDENAÇÃO ESTADUAL DO CENSO ESCOLAR DE PERNAMBUCO",
  "CORREGED - CORREGEDORIA",
  "CPL - COMISSÃO PERMANENTE DE LICITAÇÕES DE OBRAS DE ENGENHARIA",
  "CPM - CONSERVATÓRIO PERNAMBUCANO DE MÚSICA",
  "CEE - CONSELHO ESTADUAL DE EDUCAÇÃO",
  "FUNDEB - FUNDO DE MANUTENÇÃO E DESENVOLVIMENTO DA EDUCAÇÃO BÁSICA E DE VALORIZAÇÃO DOS PROFISSIONAIS DA EDUCAÇÃO",
  "GAB - GABINETE",
  "GAP - GERÊNCIA DE ADMINISTRAÇÃO DE PESSOAS",
  "SUED - SUPERINTENDÊNCIA DE ORGANIZAÇÃO DA REDE ESCOLAR",
  "GEAPE - GERÊNCIA DE AVALIAÇÃO DE MONITORAMENTO DAS POLÍTICAS EDUCACIONAIS",
  "GAPE - GERÊNCIA DE APOIO AOS PROJETOS EXECUTIVOS",
  "GCESP - GERÊNCIA DE CESSÃO E SELEÇÃO PESSOAL",
  "GCINC - GERÊNCIA DE CONTROLE INTERNO", 
  "GCOMP - GERÊNCIA DE COMPRAS",
  "GDGRE - GERÊNCIA DE DESENVOLVIMENTO DA GESTÃO REGIONAL",
  "GEAME - GERÊNCIA DE ANÁLISE DE MERCADO",
  "GEARE - GERÊNCIA ADMINISTRATIVA DA REDE ESCOLAR",
  "GECON - GERÊNCIA DE CONTABILIDADE",
  "GEEXD - GERÊNCIA DE EXECUÇÃO DA DESPESA",
  "GEIDH - GERÊNCIA DE POLÍTICAS EDUCACIONAIS DE EDUCAÇÃO INCLUSIVA, DIREITOS HUMANOS, DIVERSIDADE E CIDADANIA",
  "GEJAI - GERÊNCIA DE POLÍTICAS EDUCACIONAIS DE JOVENS, ADULTOS E IDOSOS",
  "GELOG - GERÊNCIA DE LOGÍSTICA",
  "GEMR - GERÊNCIA DE MODERNIZAÇÃO DA REDE",
  "GEMSE - GERÊNCIA DE SERVIÇOS EDUCACIONAIS",
  "GMAT - GERÊNCIA DE MATRÍCULA E REORDENAMENTO",
  "GOBRA - GERÊNCIA DE ORÇAMENTO DE ENGENHARIA",
  "GEPAF - GERÊNCIA DE POLÍTICAS EDUCACIONAIS DOS ANOS FINAIS DO ENSINO FUNDAMENTAL",
  "GEPEC - GERÊNCIA DE POLÍTICAS EDUCACIONAIS DA EDUCAÇÃO DO CAMPO",
  "GEPEM - GERÊNCIA DE POLÍTICAS EDUCACIONAIS DO ENSINO MÉDIO",
  "GEPLA - GERÊNCIA DE PLANEJAMENTO", 
  "GEPE - GERÊNCIA DE PROGRAMAS E PROJETOS ESPECIAIS",
  "GESAD - GERÊNCIA DE SERVIÇOS ADMINISTRATIVOS",
  "GETRAN - GERÊNCIA DE TRANSPORTE",
  "GGAE - GERÊNCIA GERAL DE ARQUITETURA E ENGENHARIA",
  "GGASJ - GERÊNCIA GERAL DE ASSUNTOS JURÍDICOS",
  "GGADM - GERÊNCIA GERAL DE ADMINISTRAÇÃO",
  "GGCF - GERÊNCIA GERAL DE CORREÇÃO DE FLUXO",
  "GGDP - GERÊNCIA GERAL DE DESENVOLVIMENTO DE PESSOAS",
  "GGEF - GERÊNCIA GERAL DO ENSINO MÉDIO E ANOS FINAIS DO ENSINO FUNDAMENTAL",
  "GGEIAI - GERÊNCIA GERAL DE EDUCAÇÃO INFANTIL E ANOS INICIAIS DO ENSINO FUNDAMENTAL",
  "GGEGP - GERÊNCIA GERAL DE GESTÃO DE PESSOAS",
  "GGTI - GERÊNCIA GERAL DE TECNOLOGIA DA INFORMAÇÃO E COMUNICAÇÃO",
  "GISA - GERÊNCIA DE INFORMAÇÕES E SISTEMAS APLICATIVOS",
  "GITI - GERÊNCIA DE INFRAESTRUTURA DE TECNOLOGIA DA INFORMAÇÃO",
  "GMRE - GERÊNCIA DE MONITORAMENTO DA REDE ESCOLAR",
  "GPCON - GERÊNCIA DE PRESTAÇÃO DE CONTAS",
  "GPPE - GERÊNCIA DE PROGRAMAS E PROJETOS DE REDE ESCOLAR",
  "GREE Afogados - GERÊNCIA REGIONAL DE EDUCAÇÃO SERTÃO DO ALTO PAJEÚ (Afogados da Ingazeira)",
  "GREE Araripina - GERÊNCIA REGIONAL DE EDUCAÇÃO SERTÃO DO ARARIPE",
  "GREE Arcoverde - GERÊNCIA REGIONAL DE EDUCAÇÃO SERTÃO DO MOXOTÓ IPANEMA (Arcoverde)",
  "GREE Caruaru - GERÊNCIA REGIONAL DE EDUCAÇÃO AGRESTE CENTRO NORTE (Caruaru)",
  "GREE Garanhuns - GERÊNCIA REGIONAL DE EDUCAÇÃO AGRESTE MERIDIONAL (Garanhuns)",
  "GREE Limoeiro - GERÊNCIA REGIONAL DE EDUCAÇÃO VALE DO CAPIBARIBE",
  "GREE Floresta - GERÊNCIA REGIONAL DE EDUCAÇÃO SERTÃO SUBMÉDIO SÃO FRANCISCO",
  "GREE Nossa Senhora - GERÊNCIA REGIONAL DE EDUCAÇÃO SERTÃO CENTRAL",
  "GREE Nazaré da Mata - GERÊNCIA REGIONAL DE EDUCAÇÃO MATA NORTE",
  "GREE Metro Norte - GERÊNCIA REGIONAL DE EDUCAÇÃO METROPOLITANA NORTE",
  "GREE Metro Sul - GERÊNCIA REGIONAL DE EDUCAÇÃO METROPOLITANA SUL",
  "GREE Palmares - GERÊNCIA REGIONAL DE EDUCAÇÃO MATA SUL",
  "GRE Petrolina - GERÊNCIA REGIONAL DE EDUCAÇÃO SERTÃO MÉDIO SÃO FRANCISCO",
  "GRE RN - GERÊNCIA REGIONAL DE EDUCAÇÃO RECIFE NORTE", 
  "GRE RS - GERÊNCIA REGIONAL DE EDUCAÇÃO RECIFE SUL",
  "GRE Salgueiro - GERÊNCIA REGIONAL DE EDUCAÇÃO SERTÃO CENTRAL",
  "GRE Vitória - GERÊNCIA REGIONAL DE EDUCAÇÃO MATA CENTRO",
  "GSTE - GERÊNCIA TÉCNICA DE SUPORTE E TECNOLOGIA",
  "GTCON - GERÊNCIA TÉCNICA DE CONTRATOS",
  "GTLIC - GERÊNCIA TÉCNICA DE LICITAÇÕES",
  "GTPAT - GERÊNCIA TÉCNICA DE PATRIMÔNIO",
  "Mãe Coruja/SES - PROGRAMA MÃE CORUJA / SECRETARIA DE SAÚDE",
  "NAS - NÚCLEO DE ATENÇÃO AO SERVIDOR",
  "NGR/SEPLAG - GERÊNCIA GERAL DE GESTÃO POR RESULTADOS NA EDUCAÇÃO",
  "Ouvidoria",
  "PGE - NÚCLEO PGE",
  "ProJovem - COORDENAÇÃO GERAL ESTADUAL PROJOVEM URBANO",
  "Quilombola - GERÊNCIA DE EDUCAÇÃO ESCOLAR QUILOMBOLA",
  "SEAF - SECRETARIA EXECUTIVA DE ADMINISTRAÇÃO E FINANÇAS",
  "SECO - SECRETARIA EXECUTIVA DE COORDENAÇÃO", 
  "SEDE - SECRETARIA EXECUTIVA DE DESENVOLVIMENTO DA EDUCAÇÃO",
  "SEGE - SECRETARIA EXECUTIVA DE GESTÃO DA REDE",
  "SEIP - SECRETARIA EXECUTIVA DE EDUCAÇÃO INTEGRAL E PROFISSIONAL",
  "SEPLAG - SECRETARIA DE PLANEJAMENTO E GESTÃO",
  "SESP - SECRETARIA EXECUTIVA DE ESPORTES",
  "SERH - SUPERINTENDÊNCIA DE ATENÇÃO AO SERVIDOR E RELAÇÕES DE TRABALHO",
  "SUCOM - SUPERINTENDÊNCIA DE COMUNICAÇÃO",
  "SUCOP - SUPERINTENDÊNCIA DE CONVÊNIOS E CAPTAÇÃO DE RECURSOS",
  "SUEAI - SUPERINTENDÊNCIA DE EDUCAÇÃO INFANTIL E ANOS FINAIS DO ENSINO FUNDAMENTAL",
  "SUEG - SUPERINTENDÊNCIA DE EDUCAÇÃO DE JOVENS E ADULTOS",
  "SUOBR - SUPERINTENDÊNCIA DE OBRAS DA REDE",
  "SUPAE - SUPERINTENDÊNCIA DE PROGRAMA DE ALIMENTAÇÃO ESCOLAR",
  "SUPIM - SUPERINTENDÊNCIA DE POLÍTICAS EDUCACIONAIS QUE AMPLIAM O MUNDO",
  "SUPIN - SUPERINTENDÊNCIA DE POLÍTICA EDUCACIONAL INDÍGENA",
  "SUPETI - SUPERINTENDÊNCIA DE POLÍTICAS EDUCACIONAIS DE FORMAÇÃO DE PROFESSORES E INOVAÇÃO PEDAGÓGICA",
  "SEAM - SECRETARIA EXECUTIVA DE ARTICULAÇÃO MUNICIPAL",
  "GTRAE - GERÊNCIA DE TRANSPORTE ESCOLAR",
  "GEI - GERÊNCIA DE POLÍTICAS EDUCACIONAIS DE EDUCAÇÃO INCLUSIVA",
  "GEEIN - GERÊNCIA DE EDUCAÇÃO ESCOLAR INDÍGENA",
  "SESP - SECRETARIA DE ESPORTE DE PERNAMBUCO"
];

const tiposChamado = [
  "Capacitação",
  "Entregas de Documentos",
  "Entrega de Materiais",
  "Extra Horário",
  "Fiscalização", 
  "Monitoramento",
  "Visita Técnica",
  "Reunião",
  "Serviços de Manutenção",
  "Outros(Citar na Justificativa)"
];

interface FormData {
  email: string;
  setor: string;
  contato: string;
  nomeUsuario: string;
  contatoUsuario: string;
  cargoUsuario: string;
  tipoChamado: string;
  justificativa: string;
  origem: string;
  localPartida: string;
  bairroOrigem: string;
  cidadePartida: string;
  cidadeOrigem: string;
  destino: string;
  dataInicial: string;
  horaInicial: string;
  dataRetorno: string;
  horaRetorno: string;
  tipoViagem: string;
  quantidadePessoas: number;
  nomesPassageiros: string;
  informacoesComplementares: string;
}

export function TransportForm() {
  const [openSections, setOpenSections] = useState({
    solicitante: true,
    usuario: false,
    viagem: false,
    protocolo: false
  });
  
  const [isAfterCutoff, setIsAfterCutoff] = useState(false);
  const [protocol, setProtocol] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [selectedSetor, setSelectedSetor] = useState("");
  const [selectedTipoChamado, setSelectedTipoChamado] = useState("");
  const [tipoViagem, setTipoViagem] = useState("");

  const { register, handleSubmit, reset, watch, setValue, getValues, formState: { errors } } = useForm<FormData>();

  // Watch form values for preview
  const watchedValues = watch();

  // Check if current time is after 4 PM
  useEffect(() => {
    const checkCutoffTime = () => {
      const now = new Date();
      const cutoff = new Date();
      cutoff.setHours(16, 0, 0, 0); // 4 PM
      setIsAfterCutoff(now > cutoff);
    };
    
    checkCutoffTime();
    const interval = setInterval(checkCutoffTime, 60000);
    
    return () => clearInterval(interval);
  }, []);

  // Generate protocol number
  const generateProtocol = () => {
    const randomNum = Math.floor(Math.random() * 90000) + 10000;
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    return `${randomNum}/${month}${year}`;
  };

  const onSubmit = (data: FormData) => {
    const newProtocol = generateProtocol();
    setProtocol(newProtocol);
    
    toast({
      title: "Solicitação enviada com sucesso!",
      description: `Protocolo: ${newProtocol}`,
    });
    
    // Aqui seria a integração com Google Sheets API
    console.log("Form data:", { ...data, protocol: newProtocol, setor: selectedSetor, tipoChamado: selectedTipoChamado, tipoViagem });
  };

  const handlePreview = () => {
    const formData = getValues();
    const previewData = {
      ...formData,
      setor: selectedSetor,
      tipoChamado: selectedTipoChamado,
      tipoViagem
    };
    setShowPreview(true);
  };

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-elegant animate-fade-in">
          <CardHeader className="gradient-primary text-primary-foreground">
            <CardTitle className="text-2xl font-bold text-center">
              Sistema de Solicitação de Transporte
            </CardTitle>
            <p className="text-center text-primary-foreground/90">
              Secretaria de Educação e Esportes de Pernambuco
            </p>
          </CardHeader>

          <CardContent className="p-6">
            {isAfterCutoff && (
              <Alert className="mb-6 border-destructive">
                <Clock className="h-4 w-4" />
                <AlertDescription className="text-destructive">
                  Atenção: Após às 16:00h o formulário não pode ser preenchido.
                </AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Seção Solicitante */}
              <Collapsible open={openSections.solicitante}>
                <CollapsibleTrigger
                  onClick={() => toggleSection('solicitante')}
                  className="flex items-center justify-between w-full p-4 bg-secondary rounded-lg transition-smooth hover:shadow-elegant"
                >
                  <h3 className="text-lg font-semibold">1. Informações do Solicitante</h3>
                  <ChevronDown className={`h-5 w-5 transition-transform ${openSections.solicitante ? 'rotate-180' : ''}`} />
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-4 space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="animate-field-focus">
                      <Label htmlFor="email">E-mail *</Label>
                      <Input
                        id="email"
                        type="email"
                        {...register("email", { required: "E-mail é obrigatório" })}
                        disabled={isAfterCutoff}
                        className="transition-smooth"
                      />
                      {errors.email && <span className="text-destructive text-sm">{errors.email.message}</span>}
                    </div>
                    
                    <div className="animate-field-focus">
                      <Label htmlFor="contato">WhatsApp ou Ramal *</Label>
                      <Input
                        id="contato"
                        {...register("contato", { required: "Contato é obrigatório" })}
                        disabled={isAfterCutoff}
                        className="transition-smooth"
                      />
                      {errors.contato && <span className="text-destructive text-sm">{errors.contato.message}</span>}
                    </div>
                  </div>

                  <div className="animate-field-focus">
                    <Label htmlFor="setor">Setor Solicitante *</Label>
                    <Select disabled={isAfterCutoff} value={selectedSetor} onValueChange={setSelectedSetor}>
                      <SelectTrigger className="transition-smooth">
                        <SelectValue placeholder="Selecione o setor" />
                      </SelectTrigger>
                      <SelectContent className="max-h-60 bg-background border">
                        {setores.map((setor, index) => (
                          <SelectItem key={index} value={setor}>
                            {setor}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CollapsibleContent>
              </Collapsible>

              {/* Seção Usuário */}
              <Collapsible open={openSections.usuario}>
                <CollapsibleTrigger
                  onClick={() => toggleSection('usuario')}
                  className="flex items-center justify-between w-full p-4 bg-secondary rounded-lg transition-smooth hover:shadow-elegant"
                >
                  <h3 className="text-lg font-semibold">2. Informações do Usuário a ser Transportado</h3>
                  <ChevronDown className={`h-5 w-5 transition-transform ${openSections.usuario ? 'rotate-180' : ''}`} />
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-4 space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="animate-field-focus">
                      <Label htmlFor="nomeUsuario">Nome do usuário *</Label>
                      <Input
                        id="nomeUsuario"
                        {...register("nomeUsuario", { required: "Nome é obrigatório" })}
                        disabled={isAfterCutoff}
                        className="transition-smooth"
                      />
                      {errors.nomeUsuario && <span className="text-destructive text-sm">{errors.nomeUsuario.message}</span>}
                    </div>
                    
                    <div className="animate-field-focus">
                      <Label htmlFor="contatoUsuario">Contato do usuário (WhatsApp)</Label>
                      <Input
                        id="contatoUsuario"
                        {...register("contatoUsuario")}
                        disabled={isAfterCutoff}
                        className="transition-smooth"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="animate-field-focus">
                      <Label htmlFor="cargoUsuario">Cargo do usuário</Label>
                      <Input
                        id="cargoUsuario"
                        {...register("cargoUsuario")}
                        disabled={isAfterCutoff}
                        className="transition-smooth"
                      />
                    </div>
                    
                    <div className="animate-field-focus">
                      <Label htmlFor="tipoChamado">Tipo de Chamado *</Label>
                      <Select disabled={isAfterCutoff} value={selectedTipoChamado} onValueChange={setSelectedTipoChamado}>
                        <SelectTrigger className="transition-smooth">
                          <SelectValue placeholder="Selecione o tipo" />
                        </SelectTrigger>
                        <SelectContent className="bg-background border">
                          {tiposChamado.map((tipo, index) => (
                            <SelectItem key={index} value={tipo}>
                              {tipo}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="animate-field-focus">
                    <Label htmlFor="justificativa">Justificativa detalhada</Label>
                    <Textarea
                      id="justificativa"
                      {...register("justificativa")}
                      disabled={isAfterCutoff}
                      className="transition-smooth min-h-[100px]"
                      placeholder="Descreva detalhadamente a justificativa para o transporte..."
                    />
                  </div>
                </CollapsibleContent>
              </Collapsible>

              {/* Seção Viagem */}
              <Collapsible open={openSections.viagem}>
                <CollapsibleTrigger
                  onClick={() => toggleSection('viagem')}
                  className="flex items-center justify-between w-full p-4 bg-secondary rounded-lg transition-smooth hover:shadow-elegant"
                >
                  <h3 className="text-lg font-semibold">3. Dados da Viagem</h3>
                  <ChevronDown className={`h-5 w-5 transition-transform ${openSections.viagem ? 'rotate-180' : ''}`} />
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-4 space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="animate-field-focus">
                      <Label htmlFor="origem">Origem da demanda</Label>
                      <Input
                        id="origem"
                        {...register("origem")}
                        disabled={isAfterCutoff}
                        className="transition-smooth"
                      />
                    </div>
                    
                    <div className="animate-field-focus">
                      <Label htmlFor="localPartida">Local de partida da demanda</Label>
                      <Input
                        id="localPartida"
                        {...register("localPartida")}
                        disabled={isAfterCutoff}
                        className="transition-smooth"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="animate-field-focus">
                      <Label htmlFor="bairroOrigem">Bairro da origem</Label>
                      <Input
                        id="bairroOrigem"
                        {...register("bairroOrigem")}
                        disabled={isAfterCutoff}
                        className="transition-smooth"
                      />
                    </div>
                    
                    <div className="animate-field-focus">
                      <Label htmlFor="cidadePartida">Cidade do local de partida</Label>
                      <Input
                        id="cidadePartida"
                        {...register("cidadePartida")}
                        disabled={isAfterCutoff}
                        className="transition-smooth"
                      />
                    </div>
                    
                    <div className="animate-field-focus">
                      <Label htmlFor="destino">Destino</Label>
                      <Input
                        id="destino"
                        {...register("destino")}
                        disabled={isAfterCutoff}
                        className="transition-smooth"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-4 gap-4">
                    <div className="animate-field-focus">
                      <Label htmlFor="dataInicial">Data inicial</Label>
                      <Input
                        id="dataInicial"
                        type="date"
                        {...register("dataInicial")}
                        disabled={isAfterCutoff}
                        className="transition-smooth"
                      />
                    </div>
                    
                    <div className="animate-field-focus">
                      <Label htmlFor="horaInicial">Hora inicial</Label>
                      <Input
                        id="horaInicial"
                        type="time"
                        {...register("horaInicial")}
                        disabled={isAfterCutoff}
                        className="transition-smooth"
                      />
                    </div>
                    
                    <div className="animate-field-focus">
                      <Label htmlFor="dataRetorno">Data de retorno</Label>
                      <Input
                        id="dataRetorno"
                        type="date"
                        {...register("dataRetorno")}
                        disabled={isAfterCutoff}
                        className="transition-smooth"
                      />
                    </div>
                    
                    <div className="animate-field-focus">
                      <Label htmlFor="horaRetorno">Hora de retorno</Label>
                      <Input
                        id="horaRetorno"
                        type="time"
                        {...register("horaRetorno")}
                        disabled={isAfterCutoff}
                        className="transition-smooth"
                      />
                    </div>
                  </div>

                  <div className="animate-field-focus">
                    <Label>Viagem de mais de um dia?</Label>
                    <RadioGroup
                      disabled={isAfterCutoff}
                      className="flex gap-6 mt-2"
                      value={tipoViagem}
                      onValueChange={setTipoViagem}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="bate-volta" id="bate-volta" />
                        <Label htmlFor="bate-volta">Bate e volta</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="pernoite" id="pernoite" />
                        <Label htmlFor="pernoite">Com pernoite</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="animate-field-focus">
                    <Label htmlFor="quantidadePessoas">Quantidade de pessoas transportadas</Label>
                    <Input
                      id="quantidadePessoas"
                      type="number"
                      min="1"
                      {...register("quantidadePessoas")}
                      disabled={isAfterCutoff}
                      className="transition-smooth"
                    />
                  </div>

                  <div className="animate-field-focus">
                    <Label htmlFor="nomesPassageiros">Nome(s) dos passageiros</Label>
                    <Textarea
                      id="nomesPassageiros"
                      {...register("nomesPassageiros")}
                      disabled={isAfterCutoff}
                      className="transition-smooth"
                      placeholder="Liste os nomes de todos os passageiros..."
                    />
                  </div>

                  <div className="animate-field-focus">
                    <Label htmlFor="informacoesComplementares">Informações complementares</Label>
                    <Textarea
                      id="informacoesComplementares"
                      {...register("informacoesComplementares")}
                      disabled={isAfterCutoff}
                      className="transition-smooth"
                      placeholder="Informações adicionais sobre a viagem..."
                    />
                  </div>
                </CollapsibleContent>
              </Collapsible>

              {/* Seção Protocolo */}
              <Collapsible open={openSections.protocolo}>
                <CollapsibleTrigger
                  onClick={() => toggleSection('protocolo')}
                  className="flex items-center justify-between w-full p-4 bg-secondary rounded-lg transition-smooth hover:shadow-elegant"
                >
                  <h3 className="text-lg font-semibold">4. Protocolo e Atendimento</h3>
                  <ChevronDown className={`h-5 w-5 transition-transform ${openSections.protocolo ? 'rotate-180' : ''}`} />
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-4 space-y-4">
                  {protocol ? (
                    <div className="p-4 bg-success/10 border border-success rounded-lg">
                      <div className="flex items-center gap-2 text-success">
                        <FileText className="h-5 w-5" />
                        <span className="font-semibold">Protocolo gerado: {protocol}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        Guarde este número para acompanhar sua solicitação
                      </p>
                    </div>
                  ) : (
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-muted-foreground">
                        O protocolo será gerado automaticamente após o envio da solicitação.
                      </p>
                    </div>
                  )}
                </CollapsibleContent>
              </Collapsible>

              <div className="flex gap-4 pt-6">
                <Button
                  type="submit"
                  disabled={isAfterCutoff}
                  className="gradient-primary hover:shadow-glow transition-smooth"
                >
                  <Send className="mr-2 h-4 w-4" />
                  Enviar Solicitação
                </Button>
                
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => reset()}
                  className="transition-smooth hover:shadow-elegant"
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Limpar Formulário
                </Button>
                
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handlePreview}
                  className="transition-smooth hover:shadow-elegant"
                >
                  <Eye className="mr-2 h-4 w-4" />
                  Visualizar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <TransportPreview
          data={{
            ...watchedValues,
            setor: selectedSetor,
            tipoChamado: selectedTipoChamado,
            tipoViagem
          }}
          onClose={() => setShowPreview(false)}
          onConfirm={() => {
            setShowPreview(false);
            handleSubmit(onSubmit)();
          }}
        />
      )}
    </div>
  );
}