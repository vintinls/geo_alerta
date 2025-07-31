package br.com.geoalerta.geoalerta_api.service;

import br.com.geoalerta.geoalerta_api.dto.AlertaResponseDTO;
import br.com.geoalerta.geoalerta_api.mapper.AlertaMapper;
import br.com.geoalerta.geoalerta_api.model.Alerta;
import br.com.geoalerta.geoalerta_api.repository.AlertaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AlertaService {

    @Autowired
    private AlertaRepository alertaRepository;

    public List<AlertaResponseDTO> listarTodos() {
        List<Alerta> alertas = alertaRepository.findAll();
        return alertas.stream()
                .map(AlertaMapper::toDTO)
                .collect(Collectors.toList());
    }

    public Optional<AlertaResponseDTO> buscarPorId(Long id) {
        return alertaRepository.findById(id)
                .map(AlertaMapper::toDTO);
    }

    public AlertaResponseDTO criar(Alerta alerta) {
        alerta.setDataEnvio(LocalDateTime.now()); // garante que o campo não será nulo
        Alerta salvo = alertaRepository.save(alerta);
        return AlertaMapper.toDTO(salvo);
    }

    public AlertaResponseDTO atualizar(Long id, Alerta alertaAtualizado) {
        Optional<Alerta> optional = alertaRepository.findById(id);
        if (optional.isPresent()) {
            Alerta alertaExistente = optional.get();

            alertaExistente.setUsuario(alertaAtualizado.getUsuario());
            alertaExistente.setUrlImagem(alertaAtualizado.getUrlImagem());
            alertaExistente.setLatitude(alertaAtualizado.getLatitude());
            alertaExistente.setLongitude(alertaAtualizado.getLongitude());
            alertaExistente.setEndereco(alertaAtualizado.getEndereco());
            alertaExistente.setReferencia(alertaAtualizado.getReferencia());
            alertaExistente.setDescricao(alertaAtualizado.getDescricao());
            alertaExistente.setStatus(alertaAtualizado.getStatus());
            alertaExistente.setNivelRisco(alertaAtualizado.getNivelRisco());
            alertaExistente.setAnalista(alertaAtualizado.getAnalista());
            alertaExistente.setObservacoes(alertaAtualizado.getObservacoes());
            alertaExistente.setDataEnvio(alertaAtualizado.getDataEnvio());
            alertaExistente.setBairro(alertaAtualizado.getBairro());

            Alerta atualizado = alertaRepository.save(alertaExistente);
            return AlertaMapper.toDTO(atualizado);
        } else {
            return null;
        }
    }

    public void deletar(Long id) {
        alertaRepository.deleteById(id);
    }
}
