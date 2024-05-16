package com.barutta02.FitnessApp.progresso;


import com.barutta02.FitnessApp.config.UserExtractor;
import com.barutta02.FitnessApp.exception.OperationNotPermittedException;
import com.barutta02.FitnessApp.progresso.DTO.ProgressoRequest;
import com.barutta02.FitnessApp.progresso.DTO.ProgressoResponse;
import com.barutta02.FitnessApp.user.User;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Objects;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
@Transactional
public class ProgressoService {

    private final ProgressoRepository progressoRepository;  
    private final ProgressoMapper progressoMapper;
    private final UserExtractor userExtractor;

    public ProgressoResponse getProgresso(Long progresso_id, Authentication connectedUser) {
        Progresso progresso = progressoRepository.findById(progresso_id)
            .orElseThrow(() -> new EntityNotFoundException("Nessun progresso trovato con ID: " + progresso_id));
        User user = userExtractor.getUserFromAuthentication(connectedUser);
        if(!Objects.equals(progresso.getCreator().getId(), user.getId())){
            throw new OperationNotPermittedException("Non puoi vedere un progresso che non hai creato tu");
        }
        return progressoMapper.toProgressoResponse(progresso);
    }

    public ProgressoResponse addProgresso(ProgressoRequest request, Authentication connectedUser) {
        User user = userExtractor.getUserFromAuthentication(connectedUser);
        Progresso progresso = progressoMapper.toProgresso(request,user);
        return progressoMapper.toProgressoResponse(progressoRepository.save(progresso));
    }

    public void updateProgresso(ProgressoRequest request, Authentication connectedUser){
        User user = userExtractor.getUserFromAuthentication(connectedUser);
        Progresso progresso = progressoMapper.toProgresso(request,user);
        progressoMapper.toProgressoResponse(progressoRepository.save(progresso));
    }

    public void deleteProgresso(Long progresso_id, Authentication connectedUser) {
        Progresso progresso = progressoRepository.findById(progresso_id)
                .orElseThrow(() -> new EntityNotFoundException("Nessun progresso trovato con ID: " + progresso_id));
        User user = userExtractor.getUserFromAuthentication(connectedUser);
        if (!Objects.equals(progresso.getCreator().getId(), user.getId())) {
            throw new OperationNotPermittedException("Non puoi cancellare un progresso che non hai creato tu");
        }
        progressoRepository.delete(progresso);
    }

    public ArrayList<ProgressoResponse> findAllprogresso(Authentication connectedUser) {
        User user = ((User) connectedUser.getPrincipal());
        ArrayList<Progresso> progressi = progressoRepository.findByCreator_Username(user.getUsername()).orElseThrow(() -> new EntityNotFoundException(
            "Nessun progresso creato da te è stato trovato"));
            return (ArrayList<ProgressoResponse>) progressi.stream()
            .map(progressoMapper::toProgressoResponse)
            .collect(Collectors.toCollection(ArrayList::new));
    }
 
}
