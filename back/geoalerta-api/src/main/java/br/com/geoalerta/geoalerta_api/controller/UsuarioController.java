package br.com.geoalerta.geoalerta_api.controller;

import br.com.geoalerta.geoalerta_api.dto.LoginRequestDTO;
import br.com.geoalerta.geoalerta_api.dto.UsuarioResponseDTO;
import br.com.geoalerta.geoalerta_api.model.Usuario;
import br.com.geoalerta.geoalerta_api.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping
    public ResponseEntity<Usuario> cadastrarUsuario(@RequestBody Usuario usuario) {
        if (usuarioService.emailExiste(usuario.getEmail())) {
            return ResponseEntity.badRequest().build();
        }
        Usuario novo = usuarioService.salvar(usuario);
        return ResponseEntity.ok(novo);
    }

    @GetMapping
    public ResponseEntity<List<Usuario>> listarUsuarios() {
        return ResponseEntity.ok(usuarioService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Usuario> buscarPorId(@PathVariable Long id) {
        Optional<Usuario> usuario = usuarioService.buscarPorId(id);
        return usuario.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<Usuario> buscarPorEmail(@PathVariable String email) {
        Optional<Usuario> usuario = usuarioService.buscarPorEmail(email);
        return usuario.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/login")
    public ResponseEntity<UsuarioResponseDTO> login(@RequestBody LoginRequestDTO loginDto) {
        Usuario usuario = usuarioService.login(loginDto.getEmail(), loginDto.getSenha());

        if (usuario == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        UsuarioResponseDTO response = new UsuarioResponseDTO(
            usuario.getId(),
            usuario.getNomeCompleto(),
            usuario.getEmail(),
            usuario.getTipo(),
            usuario.getDataCriacao()
        );

        return ResponseEntity.ok(response);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<UsuarioResponseDTO> atualizarUsuario(@PathVariable Long id, @RequestBody Usuario usuarioAtualizado) {
        try {
            Usuario atualizado = usuarioService.atualizarUsuario(id, usuarioAtualizado.getNomeCompleto(), usuarioAtualizado.getSenha());
            UsuarioResponseDTO dto = new UsuarioResponseDTO(
                atualizado.getId(),
                atualizado.getNomeCompleto(),
                atualizado.getEmail(),
                atualizado.getTipo(),
                atualizado.getDataCriacao()
            );
            return ResponseEntity.ok(dto);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

}
