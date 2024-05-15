package com.barutta02.FitnessApp.periodo_allenamento;

import com.barutta02.FitnessApp.allenamento.Allenamento;
import com.barutta02.FitnessApp.allenamento.AllenamentoRepository;
import com.barutta02.FitnessApp.allenamento.AllenamentoService;

import com.barutta02.FitnessApp.common.PageResponse;
import com.barutta02.FitnessApp.config.UserExtractor;
import com.barutta02.FitnessApp.exception.OperationNotPermittedException;
import com.barutta02.FitnessApp.exercise.Exercise;
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
public class PeriodoAllenamentoService {
        private final PeriodoAllenamentoRepository periodoAllenamentoRepo;
        private final AllenamentoService allenamentoService;
        private final PeriodoService periodoService;
        private final PeriodoAllenamentoMapper periodoAllenamentoMapper;
        private final UserExtractor userExtractor;

        public PeriodoAllenamentoResponse save(PeriodoAllenamentoRequest request, Authentication connectedUser) {
                User user = userExtractor.getUserFromAuthentication(connectedUser);
                Allenamento allenamento = allenamentoService
                .findByIdAndCreator_Username(request.id_allenamento(), user.getUsername()); //se non trova lancia   EntityNotFoundException
                Periodo periodo = periodoService.findByIdAndUsername(request.id_periodo(), user.getUsername());//se non trova lancia   EntityNotFoundException

                //codice da rimuovere se si vuole permettere la condivisione di allenamenti e periodi prossimamente
                if(allenamento.getCreator().getId() != user.getId() || periodo.getCreator().getId() != user.getId())
                        throw new OperationNotPermittedException("Non puoi creare un periodo allenamento per un allenamento o periodo di un altro utente");
                
                PeriodoAllenamento PeriodoAllenamento = periodoAllenamentoMapper.toPeriodoAllenamento(request,allenamento,periodo,
                                user);
                return periodoAllenamentoMapper.toPeriodoAllenamentoResponse(periodoAllenamentoRepo.save(PeriodoAllenamento));
        }

        public PageResponse<PeriodoAllenamentoResponse> findAllByPeriodo(int page, int size,
                        String periodo_nome,
                        Authentication connectedUser) {
                User user = userExtractor.getUserFromAuthentication(connectedUser);
                Pageable pageable = PageRequest.of(page, size, Sort.by("createdDate").descending());
                Page<PeriodoAllenamento> allenamenti_periodo = periodoAllenamentoRepo
                                .findByPeriodo_NameAndPeriodo_Creator_Username(pageable,periodo_nome,user.getUsername());
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

        public ArrayList<PeriodoAllenamentoResponse> findAllByPeriodoNoPagination(String periodo_nome,
                        Authentication connectedUser) {
                User user = userExtractor.getUserFromAuthentication(connectedUser);

                ArrayList<PeriodoAllenamento> lista_allenamenti = periodoAllenamentoRepo
                                .findByPeriodo_NameAndPeriodo_Creator_Username(periodo_nome, user.getUsername())
                                .orElseThrow(() -> new EntityNotFoundException(
                                                "Nessun periodo creato da te è stato trovato con nome:: "
                                                                + periodo_nome));
                return (ArrayList<PeriodoAllenamentoResponse>) lista_allenamenti.stream()
                                .map(periodoAllenamentoMapper::toPeriodoAllenamentoResponse)
                                .collect(Collectors.toCollection(ArrayList::new));
        }

        public void deletePeriodoAllenamento(Long periodo_allenamento_id, Authentication connectedUser) {
                User user = userExtractor.getUserFromAuthentication(connectedUser);
                this.periodoAllenamentoRepo.deleteByIdAndPeriodo_Creator_Username(periodo_allenamento_id, user.getUsername());
        }

        public void deleteByNameAndCreator_Username(String periodo_nome, String allenamento_creator_username) {
                periodoAllenamentoRepo.deleteByPeriodo_NameAndPeriodo_Creator_Username(periodo_nome,allenamento_creator_username);
        }

}
