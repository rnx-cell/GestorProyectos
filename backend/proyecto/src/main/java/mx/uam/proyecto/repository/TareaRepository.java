package mx.uam.proyecto.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import mx.uam.proyecto.model.entity.Tarea;

public interface TareaRepository extends JpaRepository<Tarea, Integer>{

}
