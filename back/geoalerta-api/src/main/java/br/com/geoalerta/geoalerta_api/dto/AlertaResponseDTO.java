package br.com.geoalerta.geoalerta_api.dto;

import br.com.geoalerta.geoalerta_api.enums.NivelRisco;
import br.com.geoalerta.geoalerta_api.enums.StatusAlerta;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class AlertaResponseDTO {

    private Long id;
    private UsuarioResponseDTO usuario;
    private String urlImagem;
    private BigDecimal latitude;
    private BigDecimal longitude;
    private String endereco;
    private String referencia;
    private String descricao;
    private StatusAlerta status;
    private NivelRisco nivelRisco;
    private UsuarioResponseDTO analista;
    private String observacoes;
    private LocalDateTime dataEnvio;
    private BairroResponseDTO bairro;

    public AlertaResponseDTO() {}

    public AlertaResponseDTO(Long id, UsuarioResponseDTO usuario, String urlImagem, BigDecimal latitude, BigDecimal longitude,
                             String endereco, String referencia, String descricao, StatusAlerta status,
                             NivelRisco nivelRisco, UsuarioResponseDTO analista, String observacoes,
                             LocalDateTime dataEnvio, BairroResponseDTO bairro) {
        this.id = id;
        this.usuario = usuario;
        this.urlImagem = urlImagem;
        this.latitude = latitude;
        this.longitude = longitude;
        this.endereco = endereco;
        this.referencia = referencia;
        this.descricao = descricao;
        this.status = status;
        this.nivelRisco = nivelRisco;
        this.analista = analista;
        this.observacoes = observacoes;
        this.dataEnvio = dataEnvio;
        this.bairro = bairro;
    }

    // Getters e setters

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public UsuarioResponseDTO getUsuario() { return usuario; }
    public void setUsuario(UsuarioResponseDTO usuario) { this.usuario = usuario; }

    public String getUrlImagem() { return urlImagem; }
    public void setUrlImagem(String urlImagem) { this.urlImagem = urlImagem; }

    public BigDecimal getLatitude() { return latitude; }
    public void setLatitude(BigDecimal latitude) { this.latitude = latitude; }

    public BigDecimal getLongitude() { return longitude; }
    public void setLongitude(BigDecimal longitude) { this.longitude = longitude; }

    public String getEndereco() { return endereco; }
    public void setEndereco(String endereco) { this.endereco = endereco; }

    public String getReferencia() { return referencia; }
    public void setReferencia(String referencia) { this.referencia = referencia; }

    public String getDescricao() { return descricao; }
    public void setDescricao(String descricao) { this.descricao = descricao; }

    public StatusAlerta getStatus() { return status; }
    public void setStatus(StatusAlerta status) { this.status = status; }

    public NivelRisco getNivelRisco() { return nivelRisco; }
    public void setNivelRisco(NivelRisco nivelRisco) { this.nivelRisco = nivelRisco; }

    public UsuarioResponseDTO getAnalista() { return analista; }
    public void setAnalista(UsuarioResponseDTO analista) { this.analista = analista; }

    public String getObservacoes() { return observacoes; }
    public void setObservacoes(String observacoes) { this.observacoes = observacoes; }

    public LocalDateTime getDataEnvio() { return dataEnvio; }
    public void setDataEnvio(LocalDateTime dataEnvio) { this.dataEnvio = dataEnvio; }

    public BairroResponseDTO getBairro() { return bairro; }
    public void setBairro(BairroResponseDTO bairro) { this.bairro = bairro; }
}
