package br.com.geoalerta.geoalerta_api.controller;

import br.com.geoalerta.geoalerta_api.dto.AlertaResponseDTO;
import br.com.geoalerta.geoalerta_api.model.Alerta;
import br.com.geoalerta.geoalerta_api.service.AlertaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping
    public ResponseEntity<AlertaResponseDTO> criar(@RequestBody Alerta alerta) {
        AlertaResponseDTO novoAlerta = alertaService.criar(alerta);
        return ResponseEntity.ok(novoAlerta);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AlertaResponseDTO> atualizar(@PathVariable Long id, @RequestBody Alerta alertaAtualizado) {
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
