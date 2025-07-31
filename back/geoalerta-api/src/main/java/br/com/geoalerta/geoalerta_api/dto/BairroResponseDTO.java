package br.com.geoalerta.geoalerta_api.dto;

public class BairroResponseDTO {
    private Long id;
    private String nome;
    private String cidade;
    private String estado;

    public BairroResponseDTO(Long id, String nome, String cidade, String estado) {
        this.id = id;
        this.nome = nome;
        this.cidade = cidade;
        this.estado = estado;
    }

    public Long getId() { return id; }
    public String getNome() { return nome; }
    public String getCidade() { return cidade; }
    public String getEstado() { return estado; }
}
