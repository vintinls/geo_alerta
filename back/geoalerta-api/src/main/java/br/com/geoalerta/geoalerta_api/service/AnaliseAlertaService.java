package br.com.geoalerta.geoalerta_api.service;

import br.com.geoalerta.geoalerta_api.dto.AnaliseAlertaResponseDTO;
import br.com.geoalerta.geoalerta_api.enums.EtapaAnalise;
import br.com.geoalerta.geoalerta_api.enums.StatusAlerta;
import br.com.geoalerta.geoalerta_api.model.Alerta;
import br.com.geoalerta.geoalerta_api.model.AnaliseAlerta;
import br.com.geoalerta.geoalerta_api.model.Usuario;
import br.com.geoalerta.geoalerta_api.repository.AlertaRepository;
import br.com.geoalerta.geoalerta_api.repository.AnaliseAlertaRepository;
import br.com.geoalerta.geoalerta_api.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class AnaliseAlertaService {

    @Autowired
    private AnaliseAlertaRepository analiseRepository;

    @Autowired
    private AlertaRepository alertaRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    public AnaliseAlerta criar(Long alertaId, Long analistaId, String nivelRisco, String observacoes, EtapaAnalise etapa) {
        Alerta alerta = alertaRepository.findById(alertaId)
                .orElseThrow(() -> new RuntimeException("Alerta não encontrado"));

        Usuario analista = usuarioRepository.findById(analistaId)
                .orElseThrow(() -> new RuntimeException("Analista não encontrado"));

        AnaliseAlerta analise = new AnaliseAlerta();
        analise.setAlerta(alerta);
        analise.setAnalista(analista);
        analise.setNivelRisco(nivelRisco);
        analise.setObservacoes(observacoes);
        analise.setDataAnalise(LocalDateTime.now());
        analise.setEtapa(etapa); // novo campo

        return analiseRepository.save(analise);
    }

    public List<AnaliseAlertaResponseDTO> listarPorAlerta(Long alertaId) {
        List<AnaliseAlerta> lista = analiseRepository.findByAlertaId(alertaId);
        return lista.stream().map(analise -> new AnaliseAlertaResponseDTO(
                analise.getId(),
                analise.getNivelRisco(),
                analise.getObservacoes(),
                analise.getDataAnalise(),
                analise.getAnalista().getNomeCompleto(),
                analise.getEtapa() // novo campo
        )).toList();
    }

    public Optional<AnaliseAlerta> buscarPorId(Long id) {
        return analiseRepository.findById(id);
    }

    public Alerta atualizarStatus(Long id, String status) {
        Alerta alerta = alertaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Alerta não encontrado"));

        alerta.setStatus(StatusAlerta.valueOf(status.toUpperCase()));
        return alertaRepository.save(alerta);
    }
}
