package br.com.geoalerta.geoalerta_api.mapper;

import br.com.geoalerta.geoalerta_api.dto.AlertaResponseDTO;
import br.com.geoalerta.geoalerta_api.dto.BairroResponseDTO;
import br.com.geoalerta.geoalerta_api.dto.UsuarioResponseDTO;
import br.com.geoalerta.geoalerta_api.model.Alerta;
import br.com.geoalerta.geoalerta_api.model.Bairro;
import br.com.geoalerta.geoalerta_api.model.Usuario;

public class AlertaMapper {

    public static AlertaResponseDTO toDTO(Alerta alerta) {
        return new AlertaResponseDTO(
            alerta.getId(),
            toUsuarioDTO(alerta.getUsuario()),
            alerta.getUrlImagem(),
            alerta.getLatitude(),
            alerta.getLongitude(),
            alerta.getEndereco(),
            alerta.getReferencia(),
            alerta.getDescricao(),
            alerta.getStatus(),
            alerta.getNivelRisco(),
            toUsuarioDTO(alerta.getAnalista()),
            alerta.getObservacoes(),
            alerta.getDataEnvio(),
            toBairroDTO(alerta.getBairro())
        );
    }

    private static UsuarioResponseDTO toUsuarioDTO(Usuario usuario) {
        if (usuario == null) return null;

        return new UsuarioResponseDTO(
            usuario.getId(),
            usuario.getNomeCompleto(),
            usuario.getEmail(),
            usuario.getTipo(),
            usuario.getDataCriacao()
        );
    }

    private static BairroResponseDTO toBairroDTO(Bairro bairro) {
        if (bairro == null) return null;

        return new BairroResponseDTO(
            bairro.getId(),
            bairro.getNome(),
            bairro.getCidade(),
            bairro.getEstado()
        );
    }
}
