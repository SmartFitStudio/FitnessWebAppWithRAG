package com.barutta02.FitnessApp.common;
import org.springframework.security.core.Authentication;

public interface Service_CRUD<Entity, EntityId, EntityRequest, EntityResponse> {
    public EntityResponse save (EntityRequest entity, Authentication auth);
    public void deleteById(EntityId id, Authentication auth);
}
