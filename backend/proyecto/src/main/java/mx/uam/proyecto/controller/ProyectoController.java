package mx.uam.proyecto.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import mx.uam.proyecto.model.dto.ProyectoDTO;
import mx.uam.proyecto.service.ProyectoService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/proyectos")
@Tag(name ="Proyecto", description ="Operaciones CRUD para proyectos")
public class ProyectoController {

    @Autowired
    private ProyectoService proyectoService;

    @GetMapping
    @Operation(summary = "Obtener todos los proyectos", description = "Retorna una lista de todos los proyectos")
    public List<ProyectoDTO> getAll(){
        return proyectoService.findAll();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtener proyecto por ID", description = "Retorna un proyecto por su ID")
    public ResponseEntity<ProyectoDTO> getById(@Parameter(description = "ID del proyecto") @PathVariable Integer id){
        ProyectoDTO dto = proyectoService.findById(id);
        if (dto == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(dto);
    }
    
    @PostMapping
    @Operation(summary = "Crear proyecto", description="Crea un nuevo proyecto")
    public ResponseEntity<ProyectoDTO> create(@RequestBody ProyectoDTO dto) {
        ProyectoDTO created = proyectoService.create(dto);
        if (created == null){
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(created);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar proyecto", description="Actualiza un proyecto existente")
    public ResponseEntity<ProyectoDTO> update(@Parameter(description="ID del proyecto") @PathVariable Integer id, @RequestBody ProyectoDTO dto) {
        ProyectoDTO updated = proyectoService.update(id, dto);
        if(updated == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar proyecto", description="Elimina un proyecto por su ID")
    public ResponseEntity<Void> delete(@Parameter(description="ID del proyecto") @PathVariable Integer id){
        boolean deleted = proyectoService.delete(id);
        if(!deleted){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.noContent().build();
    }
}
