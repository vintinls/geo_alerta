package br.com.geoalerta.geoalerta_api.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.UUID;

@Service
public class FileStorageService {

    private final Path uploadDir = Paths.get("uploads");

    public String salvar(MultipartFile file) throws IOException {
        if (!Files.exists(uploadDir)) {
            Files.createDirectories(uploadDir);
        }

        String nomeUnico = UUID.randomUUID() + "-" + file.getOriginalFilename();
        Path destino = uploadDir.resolve(nomeUnico);
        Files.copy(file.getInputStream(), destino, StandardCopyOption.REPLACE_EXISTING);

        return "/uploads/" + nomeUnico;
    }
}
