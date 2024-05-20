package com.barutta02.FitnessApp.allenamento_esercizio;

import com.barutta02.FitnessApp.allenamento.Allenamento;
import com.barutta02.FitnessApp.allenamento.AllenamentoRepository;
import com.barutta02.FitnessApp.allenamento.AllenamentoService;
import com.barutta02.FitnessApp.allenamento_esercizio.DTO.AllenamentoEsercizioRequest;
import com.barutta02.FitnessApp.allenamento_esercizio.DTO.AllenamentoEsercizioResponse;
import com.barutta02.FitnessApp.common.PageResponse;
import com.barutta02.FitnessApp.common.Service_CRUD;
import com.barutta02.FitnessApp.config.UserExtractor;
import com.barutta02.FitnessApp.exception.OperationNotPermittedException;
import com.barutta02.FitnessApp.exercise.Exercise;
import com.barutta02.FitnessApp.exercise.ExerciseService;
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

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class AllenamentoEsercizioService implements Service_CRUD<AllenamentoEsercizio, Long, AllenamentoEsercizioRequest, AllenamentoEsercizioResponse>{
        private final AllenamentoEsercizioRepository allenamentoEsercizioRepository;
        private final AllenamentoService allenamentoService;
        private final ExerciseService exerciseService;
        private final AllenamentoEsercizioMapper allenamentoEsercizioMapper;
        private final UserExtractor userExtractor;

        public AllenamentoEsercizioResponse save(AllenamentoEsercizioRequest request, Authentication connectedUser) {
                User user = userExtractor.getUserFromAuthentication(connectedUser);
                Allenamento allenamento = allenamentoService
                .findByIdAndCreator(request.id_allenamento(), user);
                Exercise exercise = exerciseService.findByIdAndCreatorOrDefault_creator(request.id_esercizio(), user);
                AllenamentoEsercizio allenamentoEsercizio = allenamentoEsercizioMapper.toAllenamentoEsercizio(request,allenamento,exercise,
                                user);
                AllenamentoEsercizio saved = allenamentoEsercizioRepository.save(allenamentoEsercizio);
                return allenamentoEsercizioMapper.toAllenamentoEsercizioResponse(saved);
        }

        public PageResponse<AllenamentoEsercizioResponse> findAllAuthUserAllenamentoEsercizioByAllenamentoId_paginated(int page, int size,
                        Long allenamento_id,
                        Authentication connectedUser) {
                User user = userExtractor.getUserFromAuthentication(connectedUser);
                Pageable pageable = PageRequest.of(page, size, Sort.by("createdDate").descending());
                Page<AllenamentoEsercizio> allenamentiEsercizi = allenamentoEsercizioRepository
                                .findByAllenamento_IdAndAllenamento_Creator(pageable,allenamento_id,user);
                List<AllenamentoEsercizioResponse> allenamentiEserciziResponse = allenamentiEsercizi.stream()
                                .map(allenamentoEsercizioMapper::toAllenamentoEsercizioResponse)
                                .toList();
                return new PageResponse<>(
                                allenamentiEserciziResponse,
                                allenamentiEsercizi.getNumber(),
                                allenamentiEsercizi.getSize(),
                                allenamentiEsercizi.getTotalElements(),
                                allenamentiEsercizi.getTotalPages(),
                                allenamentiEsercizi.isFirst(),
                                allenamentiEsercizi.isLast());
        }

        public ArrayList<AllenamentoEsercizioResponse> findAllAuthUserAllenamentoEsercizioByAllenamentoId_noPagination(Long allenamento_id,
                        Authentication connectedUser) {
                User user = userExtractor.getUserFromAuthentication(connectedUser);

                ArrayList<AllenamentoEsercizio> list_exercises = allenamentoEsercizioRepository
                                .findByAllenamento_IdAndAllenamento_Creator(allenamento_id, user)
                                .orElseThrow(() -> new EntityNotFoundException(
                                                "Nessun allenamento creato da te è stato trovato con ID:: "
                                                                + allenamento_id));
                return (ArrayList<AllenamentoEsercizioResponse>) list_exercises.stream()
                                .map(allenamentoEsercizioMapper::toAllenamentoEsercizioResponse)
                                .collect(Collectors.toCollection(ArrayList::new));
        }

        public void deleteById(Long id, Authentication connectedUser) {
                User user = userExtractor.getUserFromAuthentication(connectedUser);
                allenamentoEsercizioRepository.deleteByIdAndAllenamento_Creator(id, user);
        }

}
