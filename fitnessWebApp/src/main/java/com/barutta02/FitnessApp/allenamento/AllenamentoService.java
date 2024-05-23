package com.barutta02.FitnessApp.allenamento;

import com.barutta02.FitnessApp.allenamento.DTO.AllenamentoRequest;
import com.barutta02.FitnessApp.allenamento.DTO.AllenamentoResponse;
import com.barutta02.FitnessApp.common.PageResponse;
import com.barutta02.FitnessApp.common.Service_CRUD;
import com.barutta02.FitnessApp.config.UserExtractor;

import com.barutta02.FitnessApp.user.User;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * The AllenamentoService class is responsible for handling operations related
 * to Allenamento objects.
 * It provides methods for saving, retrieving, and deleting Allenamento
 * instances.
 */
@Service
@RequiredArgsConstructor
@Slf4j
@Transactional // This annotation is used to indicate that the methods of this class are
               // involved in a transaction, a transaction is a set of operations that must be
               // executed in full or not at all.
public class AllenamentoService implements Service_CRUD<Allenamento, Long, AllenamentoRequest, AllenamentoResponse>{

        private final AllenamentoRepository allenamentoRepository;
        private final AllenamentoMapper allenamentoMapper;
        private final UserExtractor userExtractor;

        public AllenamentoResponse save(AllenamentoRequest request, Authentication connectedUser) {
                User user = this.userExtractor.getUserFromAuthentication(connectedUser);
                Allenamento allenamento = allenamentoMapper.toAllenamento(request, user);
                return allenamentoMapper.toAllenamentoResponse(allenamentoRepository.save(allenamento));
        }

        public AllenamentoResponse findByAuthUserAndAllenamentoId(Long allenamento_id, Authentication connectedUser) {
                User user = this.userExtractor.getUserFromAuthentication(connectedUser);
                return allenamentoRepository.findByIdAndCreator(allenamento_id, user)
                                .map(allenamentoMapper::toAllenamentoResponse)
                                .orElseThrow(() -> new EntityNotFoundException(
                                                "Nessun allenamento creato da te è stato trovato con id:: "
                                                                + allenamento_id));
        }

        public ArrayList<AllenamentoResponse> findAllAuthUserAllenamento_noPagination(Authentication connectedUser) {
                User user = this.userExtractor.getUserFromAuthentication(connectedUser);
                ArrayList<Allenamento> allenamenti = allenamentoRepository.findByCreator(user)
                                .orElseThrow(() -> new EntityNotFoundException(
                                                "Nessun allenamento creato da te è stato trovato"));
                ;
                return  allenamenti.stream()
                        .map(allenamentoMapper::toAllenamentoResponse)
                        .collect(Collectors.toCollection(ArrayList::new));
        }

        public PageResponse<AllenamentoResponse>  findAllAuthUserAllenamento_paginated(int page, int size,
                        Authentication connectedUser) {
                User user = this.userExtractor.getUserFromAuthentication(connectedUser);
                Pageable pageable = PageRequest.of(page, size, Sort.by("createdDate").descending());
                Page<Allenamento> allenamenti = allenamentoRepository.findByCreator(pageable, user);
                List<AllenamentoResponse> allenamentiResponse = allenamenti.stream()
                                .map(allenamentoMapper::toAllenamentoResponse)
                                .toList();
                return new PageResponse<>(
                                allenamentiResponse,
                                allenamenti.getNumber(),
                                allenamenti.getSize(),
                                allenamenti.getTotalElements(),
                                allenamenti.getTotalPages(),
                                allenamenti.isFirst(),
                                allenamenti.isLast());
        }

        public Allenamento findByIdAndCreator(Long allenamento_id, User creator) {
                return allenamentoRepository.findByIdAndCreator(allenamento_id, creator)
                                .orElseThrow(() -> new EntityNotFoundException(
                                                "Nessun allenamento creato da te è stato trovato con id:: "
                                                                + allenamento_id));
        }

        public void deleteById(Long allenamento_id, Authentication connectedUser) {
                User user = this.userExtractor.getUserFromAuthentication(connectedUser);
                allenamentoRepository.deleteByIdAndCreator(allenamento_id, user);
        }

}
