package com.barutta02.FitnessApp.allenamento;


import com.barutta02.FitnessApp.allenamento.DTO.AllenamentoRequest;
import com.barutta02.FitnessApp.allenamento.DTO.AllenamentoResponse;
import com.barutta02.FitnessApp.allenamento_esercizio.AllenamentoEsercizioRepository;
import com.barutta02.FitnessApp.allenamento_esercizio.DTO.AllenamentoEsercizioResponse;
import com.barutta02.FitnessApp.common.PageResponse;
import com.barutta02.FitnessApp.exception.OperationNotPermittedException;

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
import java.util.Objects;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
@Slf4j
@Transactional //This annotation is used to indicate that the methods of this class are involved in a transaction, a transaction is a set of operations that must be executed in full or not at all.
public class AllenamentoService {
    
        private final AllenamentoRepository allenamentoRepository;
        private final AllenamentoEsercizioRepository allenamentoEsercizioRepository;
        private final AllenamentoMapper allenamentoMapper;
    
        public AllenamentoResponse save(AllenamentoRequest request, Authentication connectedUser) {
            User user = this.getUserFromAuthentication(connectedUser);
            Allenamento allenamento = allenamentoMapper.toAllenamento(request,user); //Convert the BookRequest object to a Book object
            //TODO: assolutamente da sistemare
            if (request.id() != null) {
                allenamentoEsercizioRepository.deleteByAllenamento_IdAndAllenamento_Creator_Username(allenamento.getId(),user.getUsername()); //se sto eseugendo un update cancello tutti gli esercizi associati all'allenamento per poi aggiungerli nuovamente nel caso nell'update ce ne siano di rimossi
            }
            return allenamentoMapper.toAllenamentoResponse(allenamentoRepository.save(allenamento)); //Save the book in the database and return its ID
        }
    
        public AllenamentoResponse findByIdCreator(Long allenamento_id, Authentication connectedUser) {
            User user = this.getUserFromAuthentication(connectedUser);
            return allenamentoRepository.findByIdAndCreator_Username(allenamento_id,user.getUsername())
                    .map(allenamentoMapper::toAllenamentoResponse)
                    .orElseThrow(() -> new EntityNotFoundException("Nessun allenamento creato da te è stato trovato con id:: " + allenamento_id));
        }

        public ArrayList<AllenamentoResponse> findAllByCreator(Authentication connectedUser) {
            User user = this.getUserFromAuthentication(connectedUser);
            ArrayList<Allenamento> allenamenti = allenamentoRepository.findByCreator_Username(user.getUsername()).orElseThrow(() -> new EntityNotFoundException("Nessun allenamento creato da te è stato trovato"));;
            return (ArrayList<AllenamentoResponse>) allenamenti.stream()
                                .map(allenamentoMapper::toAllenamentoResponse)
                                .collect(Collectors.toCollection(ArrayList::new));
        }

        public PageResponse<AllenamentoResponse> findAllMyAllenamento(int page, int size, Authentication connectedUser) {
            User user = this.getUserFromAuthentication(connectedUser);
            Pageable pageable = PageRequest.of(page, size, Sort.by("createdDate").descending());
            Page<Allenamento> allenamenti = allenamentoRepository.findByCreator_Username(pageable,user.getUsername());
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
                    allenamenti.isLast()
                );
        }

        public void deleteAllenamento(String allenamento_name, Authentication connectedUser) {
            User user = this.getUserFromAuthentication(connectedUser);
            Allenamento allenamento = allenamentoRepository.findByNameAndCreator_Username(allenamento_name,user.getUsername())
                    .orElseThrow(() -> new EntityNotFoundException("Nessun allenamento creato da te è stato trovato con nome:: " + allenamento_name));
            if (!Objects.equals(allenamento.getCreator().getId(), user.getId())) {
                throw new OperationNotPermittedException("Stai cercando di cancellare un allenamento che non hai creato tu!");
            }
            allenamentoRepository.delete(allenamento);
        }

        public Allenamento findByNameAndCreator_Username(String allenamento_name, String creator_username) {
            return allenamentoRepository.findByNameAndCreator_Username(allenamento_name,creator_username)
                    .orElseThrow(() -> new EntityNotFoundException("Nessun allenamento creato da te è stato trovato con nome:: " + allenamento_name));
        }

        public Allenamento findByIdAndCreator_Username(Long allenamento_id, String creator_username) {
            return allenamentoRepository.findByIdAndCreator_Username(allenamento_id,creator_username)
                    .orElseThrow(() -> new EntityNotFoundException("Nessun allenamento creato da te è stato trovato con id:: " + allenamento_id));
        }

        private User getUserFromAuthentication(Authentication connectedUser) {
            return ((User) connectedUser.getPrincipal());
        }
}
