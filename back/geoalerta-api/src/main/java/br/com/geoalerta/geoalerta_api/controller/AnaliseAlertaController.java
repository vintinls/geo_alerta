package br.com.geoalerta.geoalerta_api.controller;

import br.com.geoalerta.geoalerta_api.dto.AnaliseAlertaRequestDTO;
import br.com.geoalerta.geoalerta_api.dto.AnaliseAlertaResponseDTO;
import br.com.geoalerta.geoalerta_api.model.Alerta;
import br.com.geoalerta.geoalerta_api.model.AnaliseAlerta;
import br.com.geoalerta.geoalerta_api.service.AlertaService;
import br.com.geoalerta.geoalerta_api.service.AnaliseAlertaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/analises")
public class AnaliseAlertaController {

    @Autowired
    private AnaliseAlertaService analiseService;

    @Autowired
    private AlertaService alertaService;

    @PostMapping
    public ResponseEntity<AnaliseAlerta> criarAnalise(@RequestBody AnaliseAlertaRequestDTO dto) {
        AnaliseAlerta nova = analiseService.criar(
            dto.alertaId,
            dto.analistaId,
            dto.nivelRisco,
            dto.observacoes,
            dto.etapa // NOVO
        );
        return ResponseEntity.ok(nova);
    }

    @GetMapping("/alerta/{alertaId}")
    public ResponseEntity<List<AnaliseAlertaResponseDTO>> listarPorAlerta(@PathVariable Long alertaId) {
        return ResponseEntity.ok(analiseService.listarPorAlerta(alertaId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<AnaliseAlerta> buscarPorId(@PathVariable Long id) {
        return analiseService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Alerta> atualizarStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> body
    ) {
        String novoStatus = body.get("status");
        return ResponseEntity.ok(analiseService.atualizarStatus(id, novoStatus));
    }
}
