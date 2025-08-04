package br.com.geoalerta.geoalerta_api.dto;

import br.com.geoalerta.geoalerta_api.enums.EtapaAnalise;

public class AnaliseAlertaRequestDTO {
    public Long alertaId;
    public Long analistaId;
    public String nivelRisco;
    public String observacoes;
    public EtapaAnalise etapa;
}
