package br.com.geoalerta.geoalerta_api.model;

import br.com.geoalerta.geoalerta_api.enums.EtapaAnalise;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "analise_alerta")
public class AnaliseAlerta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nivelRisco;

    private String observacoes;

    private LocalDateTime dataAnalise;

    @Enumerated(EnumType.STRING)
    @Column(nullable = true)
    private EtapaAnalise etapa; // NOVO CAMPO

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "alerta_id", nullable = false)
    private Alerta alerta;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "analista_id", nullable = false)
    private Usuario analista;

    // Getters e Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNivelRisco() {
        return nivelRisco;
    }

    public void setNivelRisco(String nivelRisco) {
        this.nivelRisco = nivelRisco;
    }

    public String getObservacoes() {
        return observacoes;
    }

    public void setObservacoes(String observacoes) {
        this.observacoes = observacoes;
    }

    public LocalDateTime getDataAnalise() {
        return dataAnalise;
    }

    public void setDataAnalise(LocalDateTime dataAnalise) {
        this.dataAnalise = dataAnalise;
    }

    public EtapaAnalise getEtapa() {
        return etapa;
    }

    public void setEtapa(EtapaAnalise etapa) {
        this.etapa = etapa;
    }

    public Alerta getAlerta() {
        return alerta;
    }

    public void setAlerta(Alerta alerta) {
        this.alerta = alerta;
    }

    public Usuario getAnalista() {
        return analista;
    }

    public void setAnalista(Usuario analista) {
        this.analista = analista;
    }
}
