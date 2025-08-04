package br.com.geoalerta.geoalerta_api.service;

import br.com.geoalerta.geoalerta_api.dto.AlertaRequestDTO;
import br.com.geoalerta.geoalerta_api.dto.AlertaResponseDTO;
import br.com.geoalerta.geoalerta_api.dto.BairroResponseDTO;
import br.com.geoalerta.geoalerta_api.dto.UsuarioResponseDTO;
import br.com.geoalerta.geoalerta_api.enums.StatusAlerta;
import br.com.geoalerta.geoalerta_api.model.Alerta;
import br.com.geoalerta.geoalerta_api.model.Usuario;
import br.com.geoalerta.geoalerta_api.repository.AlertaRepository;
import br.com.geoalerta.geoalerta_api.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AlertaService {

    @Autowired
    private AlertaRepository alertaRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private FileStorageService fileStorageService;

    public List<AlertaResponseDTO> listarTodos() {
        return alertaRepository.findAll()
                .stream()
                .map(this::toResponseDTO)
                .collect(Collectors.toList());
    }

    public Optional<AlertaResponseDTO> buscarPorId(Long id) {
        return alertaRepository.findById(id)
                .map(this::toResponseDTO);
    }

    public AlertaResponseDTO criar(AlertaRequestDTO dto) {
        Usuario usuario = usuarioRepository.findById(dto.getUsuarioId())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        Alerta alerta = new Alerta();
        alerta.setUsuario(usuario);
        alerta.setUrlImagem(dto.getUrlImagem());
        alerta.setLatitude(dto.getLatitude());
        alerta.setLongitude(dto.getLongitude());
        alerta.setEndereco(dto.getEndereco());
        alerta.setReferencia(dto.getReferencia());
        alerta.setDescricao(dto.getDescricao());
        alerta.setStatus(StatusAlerta.PENDENTE);
        alerta.setDataEnvio(LocalDateTime.now());

        Alerta salvo = alertaRepository.save(alerta);
        return toResponseDTO(salvo);
    }

    // ✅ Novo método com upload de imagem
    public AlertaResponseDTO criarComImagem(Long usuarioId, String descricao, String endereco, String referencia,
                                            Double latitude, Double longitude, MultipartFile imagem) {
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        Alerta alerta = new Alerta();
        alerta.setUsuario(usuario);
        alerta.setDescricao(descricao);
        alerta.setEndereco(endereco);
        alerta.setReferencia(referencia);
        alerta.setLatitude(latitude != null ? new BigDecimal(latitude) : null);
        alerta.setLongitude(longitude != null ? new BigDecimal(longitude) : null);
        alerta.setDataEnvio(LocalDateTime.now());
        alerta.setStatus(StatusAlerta.PENDENTE);

        if (imagem != null && !imagem.isEmpty()) {
            try {
                String urlImagem = fileStorageService.salvar(imagem);
                alerta.setUrlImagem(urlImagem);
            } catch (IOException e) {
                throw new RuntimeException("Erro ao salvar imagem: " + e.getMessage());
            }
        }

        Alerta salvo = alertaRepository.save(alerta);
        return toResponseDTO(salvo);
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
            return toResponseDTO(atualizado);
        } else {
            return null;
        }
    }

    public void deletar(Long id) {
        alertaRepository.deleteById(id);
    }

    public List<AlertaResponseDTO> listarPorUsuario(Long usuarioId) {
        List<Alerta> alertas = alertaRepository.findByUsuarioId(usuarioId);
        return alertas.stream()
                .map(this::toResponseDTO)
                .collect(Collectors.toList());
    }

    private AlertaResponseDTO toResponseDTO(Alerta alerta) {
        return new AlertaResponseDTO(
                alerta.getId(),
                alerta.getUsuario() != null ? new UsuarioResponseDTO(
                        alerta.getUsuario().getId(),
                        alerta.getUsuario().getNomeCompleto(),
                        alerta.getUsuario().getEmail(),
                        alerta.getUsuario().getTipo(),
                        alerta.getUsuario().getDataCriacao()
                ) : null,
                alerta.getUrlImagem(),
                alerta.getLatitude(),
                alerta.getLongitude(),
                alerta.getEndereco(),
                alerta.getReferencia(),
                alerta.getDescricao(),
                alerta.getStatus(),
                alerta.getNivelRisco(),
                alerta.getAnalista() != null ? new UsuarioResponseDTO(
                        alerta.getAnalista().getId(),
                        alerta.getAnalista().getNomeCompleto(),
                        alerta.getAnalista().getEmail(),
                        alerta.getAnalista().getTipo(),
                        alerta.getAnalista().getDataCriacao()
                ) : null,
                alerta.getObservacoes(),
                alerta.getDataEnvio(),
                alerta.getBairro() != null ? new BairroResponseDTO(
                        alerta.getBairro().getId(),
                        alerta.getBairro().getNome(),
                        alerta.getBairro().getCidade(),
                        alerta.getBairro().getEstado()
                ) : null
        );
    }
}
