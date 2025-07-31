package br.com.geoalerta.geoalerta_api.controller;

import br.com.geoalerta.geoalerta_api.model.Bairro;
import br.com.geoalerta.geoalerta_api.service.BairroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bairros")
public class BairroController {

    @Autowired
    private BairroService bairroService;

    @GetMapping
    public List<Bairro> listarTodos() {
        return bairroService.listarTodos();
    }

    @PostMapping
    public Bairro criar(@RequestBody Bairro bairro) {
        return bairroService.criar(bairro);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Bairro> buscarPorId(@PathVariable Long id) {
        return bairroService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Bairro> atualizar(@PathVariable Long id, @RequestBody Bairro bairroAtualizado) {
        return bairroService.atualizar(id, bairroAtualizado)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        if (bairroService.deletar(id)) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
