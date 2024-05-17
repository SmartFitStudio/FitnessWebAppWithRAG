package com.barutta02.FitnessApp.allenamento_esercizio;

import com.barutta02.FitnessApp.allenamento.Allenamento;
import com.barutta02.FitnessApp.allenamento.AllenamentoRepository;
import com.barutta02.FitnessApp.allenamento.AllenamentoService;
import com.barutta02.FitnessApp.allenamento_esercizio.DTO.AllenamentoEsercizioRequest;
import com.barutta02.FitnessApp.allenamento_esercizio.DTO.AllenamentoEsercizioResponse;
import com.barutta02.FitnessApp.common.PageResponse;
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
public class AllenamentoEsercizioService {
        private final AllenamentoEsercizioRepository allenamentoEsercizioRepository;
        private final AllenamentoService allenamentoService;
        private final ExerciseService exerciseService;
        private final AllenamentoEsercizioMapper allenamentoEsercizioMapper;
        private final UserExtractor userExtractor;

        public AllenamentoEsercizioResponse save(AllenamentoEsercizioRequest request, Authentication connectedUser) {
                User user = userExtractor.getUserFromAuthentication(connectedUser);
                Allenamento allenamento = allenamentoService
                .findByIdAndCreator_Username(request.id_allenamento(), user.getUsername());
                Exercise exercise = exerciseService.findById(request.id_esercizio(), user.getUsername());
                AllenamentoEsercizio allenamentoEsercizio = allenamentoEsercizioMapper.toAllenamentoEsercizio(request,allenamento,exercise,
                                user);
                AllenamentoEsercizio saved = allenamentoEsercizioRepository.save(allenamentoEsercizio);
                return allenamentoEsercizioMapper.toAllenamentoEsercizioResponse(saved);
        }

        public PageResponse<AllenamentoEsercizioResponse> findAllByAllenamento(int page, int size,
                        String allenamento_name,
                        Authentication connectedUser) {
                User user = userExtractor.getUserFromAuthentication(connectedUser);
                Pageable pageable = PageRequest.of(page, size, Sort.by("createdDate").descending());
                Page<AllenamentoEsercizio> allenamentiEsercizi = allenamentoEsercizioRepository
                                .findByAllenamento_NameAndAllenamento_Creator_Username(pageable,allenamento_name,user.getUsername());
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

        public ArrayList<AllenamentoEsercizioResponse> findAllByAllenamentoNoPagination(String allenamento_name,
                        Authentication connectedUser) {
                User user = userExtractor.getUserFromAuthentication(connectedUser);

                ArrayList<AllenamentoEsercizio> list_exercises = allenamentoEsercizioRepository
                                .findByAllenamento_NameAndAllenamento_Creator_Username(allenamento_name, user.getUsername())
                                .orElseThrow(() -> new EntityNotFoundException(
                                                "Nessun allenamento creato da te è stato trovato con nome:: "
                                                                + allenamento_name));
                return (ArrayList<AllenamentoEsercizioResponse>) list_exercises.stream()
                                .map(allenamentoEsercizioMapper::toAllenamentoEsercizioResponse)
                                .collect(Collectors.toCollection(ArrayList::new));
        }

        public void deleteAllenamentoEsercizio(Long id, Authentication connectedUser) {
                User user = userExtractor.getUserFromAuthentication(connectedUser);
                AllenamentoEsercizio allenamentoEsercizio = allenamentoEsercizioRepository.findById(id)
                                .orElseThrow(() -> new EntityNotFoundException("No allenamento esercizio found with ID:: " + id));
                if (!allenamentoEsercizio.getAllenamento().getCreator().getId().equals(user.getId())) {
                        throw new OperationNotPermittedException("Stai cercando di cancellare un allenamento esercizio che non hai creato tu!");
                }
                allenamentoEsercizioRepository.delete(allenamentoEsercizio);
        }

}
