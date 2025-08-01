package br.com.geoalerta.geoalerta_api.service;

import br.com.geoalerta.geoalerta_api.model.Usuario;
import br.com.geoalerta.geoalerta_api.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public Usuario salvar(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    public List<Usuario> listarTodos() {
        return usuarioRepository.findAll();
    }

    public Optional<Usuario> buscarPorId(Long id) {
        return usuarioRepository.findById(id);
    }

    public Optional<Usuario> buscarPorEmail(String email) {
        return usuarioRepository.findByEmail(email);
    }

    public boolean emailExiste(String email) {
        return usuarioRepository.existsByEmail(email);
    }
    
    public Usuario login(String email, String senha) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findByEmail(email);

        if (usuarioOpt.isPresent()) {
            Usuario usuario = usuarioOpt.get();
            if (usuario.getSenha().equals(senha)) {
                return usuario;
            }
        }

        return null;
    }
    
    public Usuario atualizarUsuario(Long id, String novoNome, String novaSenha) {
        Optional<Usuario> optionalUsuario = usuarioRepository.findById(id);
        if (optionalUsuario.isPresent()) {
            Usuario usuario = optionalUsuario.get();
            usuario.setNomeCompleto(novoNome);
            if (novaSenha != null && !novaSenha.isEmpty()) {
                usuario.setSenha(novaSenha);
            }
            return usuarioRepository.save(usuario);
        }
        throw new RuntimeException("Usuário não encontrado");
    }


}
