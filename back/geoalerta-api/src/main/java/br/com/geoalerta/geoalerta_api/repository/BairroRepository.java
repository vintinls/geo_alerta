package br.com.geoalerta.geoalerta_api.repository;

import br.com.geoalerta.geoalerta_api.model.Bairro;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BairroRepository extends JpaRepository<Bairro, Long> {
}
