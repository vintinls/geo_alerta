package br.com.geoalerta.geoalerta_api.controller;

import br.com.geoalerta.geoalerta_api.dto.AlertaResponseDTO;
import br.com.geoalerta.geoalerta_api.service.AlertaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/alertas")
public class AlertaController {

    @Autowired
    private AlertaService alertaService;

    @GetMapping
    public ResponseEntity<List<AlertaResponseDTO>> listarTodos() {
        List<AlertaResponseDTO> alertas = alertaService.listarTodos();
        return ResponseEntity.ok(alertas);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AlertaResponseDTO> buscarPorId(@PathVariable Long id) {
        return alertaService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/usuario/{id}")
    public ResponseEntity<List<AlertaResponseDTO>> listarPorUsuario(@PathVariable Long id) {
        List<AlertaResponseDTO> alertas = alertaService.listarPorUsuario(id);
        return ResponseEntity.ok(alertas);
    }

    @PostMapping(consumes = {"multipart/form-data"})
    public ResponseEntity<AlertaResponseDTO> criarComImagem(
            @RequestParam("usuarioId") Long usuarioId,
            @RequestParam("descricao") String descricao,
            @RequestParam("endereco") String endereco,
            @RequestParam("referencia") String referencia,
            @RequestParam("latitude") Double latitude,
            @RequestParam("longitude") Double longitude,
            @RequestParam("imagem") MultipartFile imagem
    ) {
        AlertaResponseDTO novoAlerta = alertaService.criarComImagem(
                usuarioId, descricao, endereco, referencia, latitude, longitude, imagem
        );
        return ResponseEntity.ok(novoAlerta);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AlertaResponseDTO> atualizar(
            @PathVariable Long id,
            @RequestBody br.com.geoalerta.geoalerta_api.model.Alerta alertaAtualizado
    ) {
        AlertaResponseDTO atualizado = alertaService.atualizar(id, alertaAtualizado);
        if (atualizado != null) {
            return ResponseEntity.ok(atualizado);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        alertaService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
