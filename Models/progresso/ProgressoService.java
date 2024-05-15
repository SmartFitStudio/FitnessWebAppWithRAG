package com.barutta02.FitnessApp.progresso;


import com.barutta02.FitnessApp.config.UserExtractor;
import com.barutta02.FitnessApp.exception.OperationNotPermittedException;
import com.barutta02.FitnessApp.progresso.DTO.ProgressoRequest;
import com.barutta02.FitnessApp.progresso.DTO.ProgressoResponse;
import com.barutta02.FitnessApp.user.User;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Objects;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class ProgressoService {

    private final ProgressoRepository progressoRepository;  
    private final ProgressoMapper progressoMapper;
    private final UserExtractor userExtractor;

    public ProgressoResponse save(ProgressoRequest request, Authentication connectedUser) {
        User user = userExtractor.getUserFromAuthentication(connectedUser);
        Progresso progresso = progressoMapper.toProgresso(request,user); //Convert the BookRequest object to a Book object
        return progressoMapper.toProgressoResponse(progressoRepository.save(progresso)); //Save the book in the database and return its ID
    }

    public ProgressoResponse findById(Long progresso_id) {
        return progressoRepository.findById(progresso_id)
                .map(progressoMapper::toProgressoResponse)
                .orElseThrow(() -> new EntityNotFoundException("No progresso found with ID:: " + progresso_id));
    }

    public ArrayList<ProgressoResponse> findAllprogresso(Authentication connectedUser) {
        User user = ((User) connectedUser.getPrincipal());
        ArrayList<Progresso> progressi = progressoRepository.findByCreator_Username(user.getUsername()).orElseThrow(() -> new EntityNotFoundException(
            "Nessun progresso creato da te è stato trovato"));
            return (ArrayList<ProgressoResponse>) progressi.stream()
            .map(progressoMapper::toProgressoResponse)
            .collect(Collectors.toCollection(ArrayList::new));
    }
 
    public void deleteprogresso(Long progresso_id, Authentication connectedUser) {
        Progresso progresso = progressoRepository.findById(progresso_id)
                .orElseThrow(() -> new EntityNotFoundException("No progresso found with ID:: " + progresso_id));
        User user = ((User) connectedUser.getPrincipal());
        if (!Objects.equals(progresso.getCreator().getId(), user.getId())) {
            throw new OperationNotPermittedException("You cannot delete an progresso you do not own");
        }
        progressoRepository.delete(progresso);
    }

    public Progresso findById(Long progresso_id, String creator_username) {
        Progresso progresso = progressoRepository.findById(progresso_id)
                .orElseThrow(() -> new EntityNotFoundException("No progresso found with ID dio bello:: " + progresso_id));
               if(progresso.getCreator()!=null && !progresso.getCreator().getUsername().equals(creator_username) ){
                   throw new OperationNotPermittedException("You cannot access an progresso you do not own");
               }
        return progresso;
    }

 
}
