package br.com.geoalerta.geoalerta_api.model;

import br.com.geoalerta.geoalerta_api.enums.NivelRisco;
import br.com.geoalerta.geoalerta_api.enums.StatusAlerta;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "alertas")
public class Alerta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false, fetch = FetchType.EAGER)
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    @Column(name = "url_imagem", nullable = false)
    private String urlImagem;

    @Column(nullable = false, precision = 9, scale = 6)
    private BigDecimal latitude;

    @Column(nullable = false, precision = 9, scale = 6)
    private BigDecimal longitude;

    @Column(nullable = false, length = 200)
    private String endereco;

    @Column(length = 200)
    private String referencia;

    @Column(columnDefinition = "TEXT")
    private String descricao;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private StatusAlerta status;

    @Enumerated(EnumType.STRING)
    @Column(name = "nivel_risco", length = 20)
    private NivelRisco nivelRisco;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "analista_id")
    private Usuario analista;

    @Column(columnDefinition = "TEXT")
    private String observacoes;

    @Column(name = "data_envio", nullable = false)
    private LocalDateTime dataEnvio;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "bairro_id")
    private Bairro bairro;

    @PrePersist
    public void prePersist() {
        if (dataEnvio == null) {
            dataEnvio = LocalDateTime.now();
        }
    }

    // Getters e Setters

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Usuario getUsuario() { return usuario; }
    public void setUsuario(Usuario usuario) { this.usuario = usuario; }

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

    public Usuario getAnalista() { return analista; }
    public void setAnalista(Usuario analista) { this.analista = analista; }

    public String getObservacoes() { return observacoes; }
    public void setObservacoes(String observacoes) { this.observacoes = observacoes; }

    public LocalDateTime getDataEnvio() { return dataEnvio; }
    public void setDataEnvio(LocalDateTime dataEnvio) { this.dataEnvio = dataEnvio; }

    public Bairro getBairro() { return bairro; }
    public void setBairro(Bairro bairro) { this.bairro = bairro; }
}
