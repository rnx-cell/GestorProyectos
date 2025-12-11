package mx.uam.proyecto.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import mx.uam.proyecto.model.entity.Proyecto;

public interface ProyectoRepository extends JpaRepository<Proyecto, Integer> {

    @EntityGraph(attributePaths = "tareas")
    List<Proyecto> findAll();

    @EntityGraph(attributePaths = "tareas")
    Optional<Proyecto> findById(Integer id);
}
