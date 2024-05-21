package com.barutta02.FitnessApp.progresso;


import com.barutta02.FitnessApp.common.PageResponse;
import com.barutta02.FitnessApp.common.Service_CRUD;
import com.barutta02.FitnessApp.config.UserExtractor;
import com.barutta02.FitnessApp.exception.OperationNotPermittedException;
import com.barutta02.FitnessApp.exercise.Exercise;
import com.barutta02.FitnessApp.exercise.DTO.ExerciseResponse;
import com.barutta02.FitnessApp.progresso.DTO.ProgressoRequest;
import com.barutta02.FitnessApp.progresso.DTO.ProgressoResponse;
import com.barutta02.FitnessApp.user.User;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
@Transactional
public class ProgressoService implements Service_CRUD<Progresso, Long, ProgressoRequest, ProgressoResponse>{

    private final ProgressoRepository progressoRepository;  
    private final ProgressoMapper progressoMapper;
    private final UserExtractor userExtractor;

    public ProgressoResponse save(ProgressoRequest request, Authentication connectedUser) {
        User user = userExtractor.getUserFromAuthentication(connectedUser);
        Progresso progresso = progressoMapper.toProgresso(request,user);
        return progressoMapper.toProgressoResponse(progressoRepository.save(progresso));
    }
    
    public ProgressoResponse getProgresso(Long progresso_id, Authentication connectedUser) {
        Progresso progresso = progressoRepository.findById(progresso_id)
            .orElseThrow(() -> new EntityNotFoundException("Nessun progresso trovato con ID: " + progresso_id));
        User user = userExtractor.getUserFromAuthentication(connectedUser);
        if(!Objects.equals(progresso.getCreator().getId(), user.getId())){
            throw new OperationNotPermittedException("Non puoi vedere un progresso che non hai creato tu");
        }
        return progressoMapper.toProgressoResponse(progresso);
    }

    public ArrayList<ProgressoResponse> getLastNProgressi(Integer N, Authentication connectedUser) {
        User user = userExtractor.getUserFromAuthentication(connectedUser);
        return progressoRepository.findByCreator_UsernameOrderByDataMisurazioneDesc(user.getUsername(), PageRequest.of(0, N))
            .orElseThrow(() -> new EntityNotFoundException("Nessun progresso creato da te è stato trovato"))
            .stream()
            .map(progressoMapper::toProgressoResponse)
            .collect(Collectors.toCollection(ArrayList::new));
    }

    public ArrayList<ProgressoResponse> getAllProgressi(Authentication connectedUser) {
        User user = userExtractor.getUserFromAuthentication(connectedUser);
        return progressoRepository.findByCreator_UsernameOrderByDataMisurazioneDesc(user.getUsername(), Pageable.unpaged()).orElseThrow(() -> new EntityNotFoundException(
            "Nessun progresso creato da te è stato trovato"))
            .stream()
            .map(progressoMapper::toProgressoResponse)
            .collect(Collectors.toCollection(ArrayList::new));
    }

    public PageResponse<ProgressoResponse> getAllProgressiPaginated(int page, int size,
    Authentication connectedUser) {
        User user = userExtractor.getUserFromAuthentication(connectedUser);
        Pageable pageable = PageRequest.of(page, size, Sort.by("dataMisurazione").descending());
        Page<Progresso> progressi = progressoRepository.findByCreator(pageable, user);
        List<ProgressoResponse> progressiResponses = progressi.stream()
                .map(progressoMapper::toProgressoResponse)
                .toList();
        return new PageResponse<>(
            progressiResponses,
            progressi.getNumber(),
            progressi.getSize(),
            progressi.getTotalElements(),
            progressi.getTotalPages(),
            progressi.isFirst(),
            progressi.isLast());
    }

    public void updateProgresso(Long progresso_id, ProgressoRequest request, Authentication connectedUser){
        Progresso progresso = progressoRepository.findById(progresso_id)
            .orElseThrow(() -> new EntityNotFoundException("Nessun progresso trovato con ID: " + progresso_id));
        User user = userExtractor.getUserFromAuthentication(connectedUser);
        if(!Objects.equals(progresso.getCreator().getId(), user.getId())){
            throw new OperationNotPermittedException("Non puoi modificare un progresso che non hai creato tu");
        }
        progresso.setDataMisurazione(request.dataMisurazione());
        progresso.setPesoKg(request.pesoKg());
        progresso.setAltezzaCm(request.altezzaCm());
        progresso.setPercentualeMassaGrassa(request.percentualeMassaGrassa());
        progresso.setPercentualeMassaMuscolare(request.percentualeMassaMuscolare());
        progresso.setNote(request.note());
    }

    public void deleteById(Long progresso_id, Authentication connectedUser) {
        Progresso progresso = progressoRepository.findById(progresso_id)
                .orElseThrow(() -> new EntityNotFoundException("Nessun progresso trovato con ID: " + progresso_id));
        User user = userExtractor.getUserFromAuthentication(connectedUser);
        if (!Objects.equals(progresso.getCreator().getId(), user.getId())) {
            throw new OperationNotPermittedException("Non puoi cancellare un progresso che non hai creato tu");
        }
        progressoRepository.delete(progresso);
    }
 
}
