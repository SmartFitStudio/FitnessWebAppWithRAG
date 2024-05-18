package com.barutta02.FitnessApp.periodo;


import com.barutta02.FitnessApp.common.PageResponse;
import com.barutta02.FitnessApp.config.UserExtractor;
import com.barutta02.FitnessApp.exception.OperationNotPermittedException;
import com.barutta02.FitnessApp.periodo.DTO.PeriodoRequest;
import com.barutta02.FitnessApp.periodo.DTO.PeriodoResponse;

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

import java.util.List;
import java.util.Optional;



@Service
@RequiredArgsConstructor
@Slf4j
@Transactional //This annotation is used to indicate that the methods of this class are involved in a transaction, a transaction is a set of operations that must be executed in full or not at all.
public class PeriodoService {
    
        private final PeriodoRepository periodoRepository;
        private final PeriodoMapper periodoMapper;
        private final UserExtractor userExtractor;

    
        public PeriodoResponse save(PeriodoRequest request, Authentication connectedUser) {
                User user = userExtractor.getUserFromAuthentication(connectedUser);
                this.validatePeriodoRequest(request);
                
                Periodo periodo = periodoMapper.toPeriodo(request,user);
                Optional<Periodo> periodoAttivo = periodoRepository.findByCreatorAndAttivoIsTrue(user);
                if (request.attivo() && periodoAttivo.isPresent() && periodoAttivo.get().getId() != periodo.getId()){
                    throw new OperationNotPermittedException("Hai già un periodo attivo, devi prima completarlo o eliminarlo per crearne uno nuovo!");
                }
                return periodoMapper.toPeriodoResponse(periodoRepository.save(periodo));
        }
        
        private void validatePeriodoRequest(PeriodoRequest request){
            if (request.data_inizio().isAfter(request.data_fine())){
                throw new IllegalArgumentException("La data di inizio non può essere successiva alla data di fine");
            }
        }
    
        public PeriodoResponse findByAuthenticatedUserAndId(Long id_periodo, Authentication connectedUser) {
            User user = userExtractor.getUserFromAuthentication(connectedUser);
            return periodoRepository.findByIdAndCreator(id_periodo,user)
                    .map(periodoMapper::toPeriodoResponse)
                    .orElseThrow(() -> new EntityNotFoundException("Nessun periodo creato da te è stato trovato con id:: " + id_periodo));
        }

        /**
         * Find the active periodo for the authenticated user,
         * if it exists.
         * Null otherwise.
         * @param connectedUser
         * @return
         */
        public PeriodoResponse findAuthenticatedUserActivePeriodo(Authentication connectedUser) {
            User creator = userExtractor.getUserFromAuthentication(connectedUser);
            return periodoRepository.findByCreatorAndAttivoIsTrue(creator)
                    .map(periodoMapper::toPeriodoResponse)
                    .orElse(null);
        }

        /**
         * Disable the active periodo for the authenticated user.
         * @param connectedUser
         * @return
         */
        public PeriodoResponse disableAuthenticatedUserActivePeriodo(Authentication connectedUser) {
            User user = userExtractor.getUserFromAuthentication(connectedUser);
            Periodo periodo_attivo = periodoRepository.findByCreatorAndAttivoIsTrue(user)
                    .orElseThrow(() -> new EntityNotFoundException("Nessun periodo attivo trovato per l'utente:: " + user.getUsername()));
            periodo_attivo.setAttivo(false);
            return periodoMapper.toPeriodoResponse(periodoRepository.save(periodo_attivo));
        }

        public PageResponse<PeriodoResponse> findAllAuthenticatedUserPeriodo_paginated(int page, int size, Authentication connectedUser) {
            User user = userExtractor.getUserFromAuthentication(connectedUser);
            Pageable pageable = PageRequest.of(page, size, Sort.by("createdDate").descending());
            Page<Periodo> periodi = periodoRepository.findByCreator(pageable,user);
            List<PeriodoResponse> periodiResponse = periodi.stream()
                    .map(periodoMapper::toPeriodoResponse)
                    .toList();
            return new PageResponse<>(
                    periodiResponse,
                    periodi.getNumber(),
                    periodi.getSize(),
                    periodi.getTotalElements(),
                    periodi.getTotalPages(),
                    periodi.isFirst(),
                    periodi.isLast()
                );
        }


        public Periodo findByIdAndUser(Long id_periodo, User user) {
            return periodoRepository.findByIdAndCreator(id_periodo,user)
                    .orElseThrow(() -> new EntityNotFoundException("Nessun periodo creato da te è stato trovato con id:: " + id_periodo));
        }

        public void deletePeriodo(Long id, Authentication connectedUser) {
            User user = userExtractor.getUserFromAuthentication(connectedUser);
            periodoRepository.deleteByIdAndCreator(id, user);
        }

}
