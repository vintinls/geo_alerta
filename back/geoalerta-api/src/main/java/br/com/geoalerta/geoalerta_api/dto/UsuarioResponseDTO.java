package br.com.geoalerta.geoalerta_api.dto;

import java.time.LocalDateTime;

public class UsuarioResponseDTO {
    private Long id;
    private String nomeCompleto;
    private String email;
    private String tipo;
    private LocalDateTime dataCriacao;

    // Construtor
    public UsuarioResponseDTO(Long id, String nomeCompleto, String email, String tipo, LocalDateTime dataCriacao) {
        this.id = id;
        this.nomeCompleto = nomeCompleto;
        this.email = email;
        this.tipo = tipo;
        this.dataCriacao = dataCriacao;
    }

    // Getters
    public Long getId() { return id; }
    public String getNomeCompleto() { return nomeCompleto; }
    public String getEmail() { return email; }
    public String getTipo() { return tipo; }
    public LocalDateTime getDataCriacao() { return dataCriacao; }
}
