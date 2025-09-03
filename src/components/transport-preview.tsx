import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface PreviewData {
  email?: string;
  setor?: string;
  contato?: string;
  nomeUsuario?: string;
  contatoUsuario?: string;
  cargoUsuario?: string;
  tipoChamado?: string;
  justificativa?: string;
  origem?: string;
  localPartida?: string;
  bairroOrigem?: string;
  cidadePartida?: string;
  destino?: string;
  dataInicial?: string;
  horaInicial?: string;
  dataRetorno?: string;
  horaRetorno?: string;
  tipoViagem?: string;
  quantidadePessoas?: number;
  nomesPassageiros?: string;
  informacoesComplementares?: string;
}

interface TransportPreviewProps {
  data: PreviewData;
  onClose: () => void;
  onConfirm: () => void;
}

export function TransportPreview({ data, onClose, onConfirm }: TransportPreviewProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="max-w-4xl max-h-[90vh] overflow-y-auto animate-scale-in shadow-glow">
        <CardHeader className="gradient-primary text-primary-foreground">
          <div className="flex items-center justify-between">
            <CardTitle>Preview da Solicitação</CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-primary-foreground hover:bg-primary-foreground/20"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="p-6 space-y-6">
          {/* Solicitante */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-primary">Informações do Solicitante</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <strong>E-mail:</strong> {data.email || 'Não informado'}
              </div>
              <div>
                <strong>Contato:</strong> {data.contato || 'Não informado'}
              </div>
              <div className="col-span-2">
                <strong>Setor:</strong> {data.setor || 'Não informado'}
              </div>
            </div>
          </div>

          {/* Usuário */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-primary">Usuário a ser Transportado</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <strong>Nome:</strong> {data.nomeUsuario || 'Não informado'}
              </div>
              <div>
                <strong>Contato:</strong> {data.contatoUsuario || 'Não informado'}
              </div>
              <div>
                <strong>Cargo:</strong> {data.cargoUsuario || 'Não informado'}
              </div>
              <div>
                <strong>Tipo de Chamado:</strong> {data.tipoChamado || 'Não informado'}
              </div>
              {data.justificativa && (
                <div className="col-span-2">
                  <strong>Justificativa:</strong> {data.justificativa}
                </div>
              )}
            </div>
          </div>

          {/* Viagem */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-primary">Dados da Viagem</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <strong>Origem:</strong> {data.origem || 'Não informado'}
              </div>
              <div>
                <strong>Local de Partida:</strong> {data.localPartida || 'Não informado'}
              </div>
              <div>
                <strong>Bairro:</strong> {data.bairroOrigem || 'Não informado'}
              </div>
              <div>
                <strong>Cidade de Partida:</strong> {data.cidadePartida || 'Não informado'}
              </div>
              <div>
                <strong>Destino:</strong> {data.destino || 'Não informado'}
              </div>
              <div>
                <strong>Data/Hora Inicial:</strong> {data.dataInicial && data.horaInicial ? `${data.dataInicial} às ${data.horaInicial}` : 'Não informado'}
              </div>
              <div>
                <strong>Data/Hora Retorno:</strong> {data.dataRetorno && data.horaRetorno ? `${data.dataRetorno} às ${data.horaRetorno}` : 'Não informado'}
              </div>
              <div>
                <strong>Tipo de Viagem:</strong> {data.tipoViagem || 'Não informado'}
              </div>
              <div>
                <strong>Quantidade de Pessoas:</strong> {data.quantidadePessoas || 'Não informado'}
              </div>
              {data.nomesPassageiros && (
                <div className="col-span-2">
                  <strong>Passageiros:</strong> {data.nomesPassageiros}
                </div>
              )}
              {data.informacoesComplementares && (
                <div className="col-span-2">
                  <strong>Informações Complementares:</strong> {data.informacoesComplementares}
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Button 
              onClick={onConfirm}
              className="gradient-primary hover:shadow-glow transition-smooth"
            >
              Confirmar e Enviar
            </Button>
            <Button 
              variant="outline" 
              onClick={onClose}
              className="transition-smooth hover:shadow-elegant"
            >
              Voltar para Edição
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}