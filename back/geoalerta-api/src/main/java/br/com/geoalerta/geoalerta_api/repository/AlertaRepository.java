package br.com.geoalerta.geoalerta_api.repository;

import br.com.geoalerta.geoalerta_api.model.Alerta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AlertaRepository extends JpaRepository<Alerta, Long> {
    // Aqui podemos adicionar consultas personalizadas no futuro
}
