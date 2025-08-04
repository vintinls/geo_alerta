package br.com.geoalerta.geoalerta_api.repository;

import br.com.geoalerta.geoalerta_api.model.AnaliseAlerta;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AnaliseAlertaRepository extends JpaRepository<AnaliseAlerta, Long> {
    List<AnaliseAlerta> findByAlertaId(Long alertaId);
}
