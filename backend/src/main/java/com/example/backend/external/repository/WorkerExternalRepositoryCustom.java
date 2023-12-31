package com.example.backend.external.repository;

import com.example.backend.external.dto.ExternalPageResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface WorkerExternalRepositoryCustom {
    Page<ExternalPageResponseDto> searchWorker(Pageable pageable);

}
