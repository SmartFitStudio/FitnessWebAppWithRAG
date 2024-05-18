package com.barutta02.FitnessApp.periodo_allenamento;

import com.barutta02.FitnessApp.allenamento.Allenamento;
import com.barutta02.FitnessApp.allenamento.AllenamentoService;

import com.barutta02.FitnessApp.common.PageResponse;
import com.barutta02.FitnessApp.common.Service_CRUD;
import com.barutta02.FitnessApp.config.UserExtractor;
import com.barutta02.FitnessApp.exception.OperationNotPermittedException;
import com.barutta02.FitnessApp.periodo.Periodo;
import com.barutta02.FitnessApp.periodo.PeriodoService;
import com.barutta02.FitnessApp.periodo_allenamento.DTO.PeriodoAllenamentoRequest;
import com.barutta02.FitnessApp.periodo_allenamento.DTO.PeriodoAllenamentoResponse;
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
public class PeriodoAllenamentoService implements Service_CRUD<PeriodoAllenamento, Long, PeriodoAllenamentoRequest, PeriodoAllenamentoResponse>{
        private final PeriodoAllenamentoRepository periodoAllenamentoRepo;
        private final AllenamentoService allenamentoService;
        private final PeriodoService periodoService;
        private final PeriodoAllenamentoMapper periodoAllenamentoMapper;
        private final UserExtractor userExtractor;

        public PeriodoAllenamentoResponse save(PeriodoAllenamentoRequest request, Authentication connectedUser) {
                User user = userExtractor.getUserFromAuthentication(connectedUser);
                Allenamento allenamento = allenamentoService
                .findByIdAndCreator(request.id_allenamento(), user); //se non trova lancia   EntityNotFoundException
                Periodo periodo = periodoService.findByIdAndUser(request.id_periodo(), user);//se non trova lancia   EntityNotFoundException

                //codice da rimuovere se si vuole permettere la condivisione di allenamenti e periodi prossimamente
                if(allenamento.getCreator().getId() != user.getId() || periodo.getCreator().getId() != user.getId())
                        throw new OperationNotPermittedException("Non puoi creare un periodo allenamento per un allenamento o periodo di un altro utente");
                
                PeriodoAllenamento PeriodoAllenamento = periodoAllenamentoMapper.toPeriodoAllenamento(request,allenamento,periodo,
                                user);
                return periodoAllenamentoMapper.toPeriodoAllenamentoResponse(periodoAllenamentoRepo.save(PeriodoAllenamento));
        }

        public PageResponse<PeriodoAllenamentoResponse> findAllAuthUserPeriodoAllenamentoByPeriodoId_paginated(int page, int size,
                        Long periodo_id,
                        Authentication connectedUser) {
                User user = userExtractor.getUserFromAuthentication(connectedUser);
                Pageable pageable = PageRequest.of(page, size, Sort.by("createdDate").descending());
                Page<PeriodoAllenamento> allenamenti_periodo = periodoAllenamentoRepo
                                .findByPeriodo_IdAndPeriodo_Creator(pageable,periodo_id,user);
                List<PeriodoAllenamentoResponse> Allenamenti_periodo_response = allenamenti_periodo.stream()
                                .map(periodoAllenamentoMapper::toPeriodoAllenamentoResponse)
                                .toList();
                return new PageResponse<>(
                    Allenamenti_periodo_response,
                                allenamenti_periodo.getNumber(),
                                allenamenti_periodo.getSize(),
                                allenamenti_periodo.getTotalElements(),
                                allenamenti_periodo.getTotalPages(),
                                allenamenti_periodo.isFirst(),
                                allenamenti_periodo.isLast());
        }

        public ArrayList<PeriodoAllenamentoResponse> findAllAuthUserPeriodoAllenamentoByPeriodoId_noPagination(Long periodo_id,
                        Authentication connectedUser) {
                User user = userExtractor.getUserFromAuthentication(connectedUser);

                ArrayList<PeriodoAllenamento> lista_allenamenti = periodoAllenamentoRepo
                                .findByPeriodo_IdAndPeriodo_Creator(periodo_id, user)
                                .orElseThrow(() -> new EntityNotFoundException(
                                                "Nessun periodo creato da te è stato trovato con id:: "
                                                                + periodo_id));
                return (ArrayList<PeriodoAllenamentoResponse>) lista_allenamenti.stream()
                                .map(periodoAllenamentoMapper::toPeriodoAllenamentoResponse)
                                .collect(Collectors.toCollection(ArrayList::new));
        }

        public void deleteById(Long periodo_allenamento_id, Authentication connectedUser) {
                User user = userExtractor.getUserFromAuthentication(connectedUser);
                this.periodoAllenamentoRepo.deleteByIdAndPeriodo_Creator(periodo_allenamento_id, user);
        }


}
