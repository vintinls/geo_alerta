package br.com.geoalerta.geoalerta_api.service;

import br.com.geoalerta.geoalerta_api.model.Bairro;
import br.com.geoalerta.geoalerta_api.repository.BairroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BairroService {

    @Autowired
    private BairroRepository bairroRepository;

    public List<Bairro> listarTodos() {
        return bairroRepository.findAll();
    }

    public Optional<Bairro> buscarPorId(Long id) {
        return bairroRepository.findById(id);
    }

    public Bairro criar(Bairro bairro) {
        return bairroRepository.save(bairro);
    }

    public Optional<Bairro> atualizar(Long id, Bairro atualizado) {
        return bairroRepository.findById(id).map(bairro -> {
            bairro.setNome(atualizado.getNome());
            bairro.setCidade(atualizado.getCidade());
            bairro.setEstado(atualizado.getEstado());
            return bairroRepository.save(bairro);
        });
    }

    public boolean deletar(Long id) {
        return bairroRepository.findById(id).map(bairro -> {
            bairroRepository.delete(bairro);
            return true;
        }).orElse(false);
    }
}
